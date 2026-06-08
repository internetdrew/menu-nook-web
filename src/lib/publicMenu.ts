import { createClient } from "@supabase/supabase-js";

export type Business = {
  id: string;
  image_url: string | null;
  name: string;
  seo_description: string | null;
  seo_title: string | null;
};

export type MenuRecord = {
  business_id: string;
  created_at: string;
  id: string;
  name: string;
  slug: string | null;
};

export type MenuItem = {
  created_at: string;
  description: string | null;
  id: number;
  image_path: string | null;
  image_url: string | null;
  menu_category_id: number;
  menu_id: string;
  name: string;
  order_index: number;
  price: number;
  sort_index_id: number | null;
  tagline: string | null;
  updated_at: string;
};

export type MenuCategory = {
  created_at: string;
  description: string | null;
  id: number;
  items: MenuItem[];
  menu_id: string;
  name: string;
  order_index: number;
  sort_index_id: number;
};

export type PublicMenu = MenuRecord & {
  business: Business;
  menu_categories: MenuCategory[];
};

type Subscription = {
  current_period_end: string | null;
  status: string | null;
};

type ItemSortIndex = {
  id: number;
  order_index: number;
};

type MenuItemWithSortIndex = Omit<MenuItem, "order_index" | "sort_index_id"> & {
  sort_index: ItemSortIndex | ItemSortIndex[] | null;
};

type MenuCategoryWithItems = Omit<
  MenuCategory,
  "items" | "order_index" | "sort_index_id"
> & {
  items: MenuItemWithSortIndex[] | null;
};

type CategorySortRow = {
  id: number;
  order_index: number;
  category: MenuCategoryWithItems | MenuCategoryWithItems[] | null;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const supabaseUrl = import.meta.env.SUPABASE_URL;

const supabaseAdminKey = import.meta.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseAdminKey) {
  throw new Error("Missing Supabase environment variables for public menus.");
}

if (supabaseAdminKey.startsWith("sb_publi")) {
  throw new Error(
    "SUPABASE_SECRET_KEY must be a server-side Supabase secret/service-role key, not a publishable key.",
  );
}

const supabase = createClient(supabaseUrl, supabaseAdminKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const isUuid = (value: string) => UUID_REGEX.test(value);

export const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/['"']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export function isMenuSubscriptionActive(subscription: Subscription | null) {
  if (subscription?.status !== "active" || !subscription.current_period_end) {
    return false;
  }

  return new Date(subscription.current_period_end) > new Date();
}

export async function fetchSubscriptionForMenu(menuId: string) {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status,current_period_end")
    .eq("menu_id", menuId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch menu subscription: ${error.message}`);
  }

  return data as Subscription | null;
}

export async function fetchPublicMenu(menuRef: string) {
  const column = isUuid(menuRef) ? "id" : "slug";
  const { data: menu, error: menuError } = await supabase
    .from("menus")
    .select(
      `
      *,
      business:businesses(id,image_url,name,seo_description,seo_title)
    `,
    )
    .eq(column, menuRef)
    .maybeSingle();

  if (menuError) {
    throw new Error(`Failed to fetch menu: ${menuError.message}`);
  }

  if (!menu) {
    return null;
  }

  const { data: sortedCategories, error: categoryError } = await supabase
    .from("menu_category_sort_indexes")
    .select(
      `
      id,
      order_index,
      category:menu_categories(*,
        items:menu_category_items(
          *,
          sort_index:menu_category_item_sort_indexes(id, order_index)
        )
      )
    `,
    )
    .eq("menu_id", menu.id)
    .order("order_index", { ascending: true });

  if (categoryError) {
    throw new Error(
      `Failed to fetch menu category order: ${categoryError.message}`,
    );
  }

  const sortedCategoryRows = (sortedCategories ?? []) as CategorySortRow[];

  const menuCategories = sortedCategoryRows.flatMap((row) => {
    const category = Array.isArray(row.category)
      ? row.category[0]
      : row.category;
    if (!category) return [];

    const items =
      category?.items
        ?.map((item: MenuItemWithSortIndex) => {
          const { sort_index: sortIndex, ...rest } = item;
          const firstSortIndex = Array.isArray(sortIndex)
            ? sortIndex[0]
            : sortIndex;

          return {
            ...rest,
            order_index: firstSortIndex?.order_index ?? 0,
            sort_index_id: firstSortIndex?.id ?? null,
          };
        })
        .sort((a: MenuItem, b: MenuItem) => a.order_index - b.order_index) ??
      [];

    return [
      {
        ...category,
        order_index: row.order_index,
        sort_index_id: row.id,
        items,
      } satisfies MenuCategory,
    ];
  });

  return {
    ...(menu as MenuRecord & { business: Business }),
    menu_categories: menuCategories,
  } satisfies PublicMenu;
}
