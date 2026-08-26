import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/supabase";
import { createSlug } from "@/lib/createSlug";

export { createSlug };

type StoreMenuCategory = Tables<"store_menu_categories">;
type StoreMenuCategoryItem = Tables<"store_menu_category_items">;

export type PublicMenuRecord = {
  created_at: string;
  id: string;
  image_url: string | null;
  is_published: boolean;
  name: string;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
};

export type MenuItem = StoreMenuCategoryItem & {
  order_index: number;
  price: number;
  sort_index_id: number | null;
};

export type MenuCategory = StoreMenuCategory & {
  items: MenuItem[];
  order_index: number;
  sort_index_id: number;
};

export type PublicMenu = PublicMenuRecord & {
  menu_categories: MenuCategory[];
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

const supabase = createClient<Database>(supabaseUrl, supabaseAdminKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const isUuid = (value: string) => UUID_REGEX.test(value);

export async function fetchPublicMenu(menuRef: string) {
  const column = isUuid(menuRef) ? "id" : "menu_slug";
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("*")
    .eq(column, menuRef)
    .maybeSingle();

  if (storeError) {
    throw new Error(`Failed to fetch store menu: ${storeError.message}`);
  }

  if (!store) {
    return null;
  }

  const { data: sortedCategories, error: categoryError } = await supabase
    .from("store_menu_category_sort_indexes")
    .select(
      `
      id,
      order_index,
      category:store_menu_categories(*,
        items:store_menu_category_items(
          *,
          sort_index:store_menu_category_item_sort_indexes!smcis_item_id_fkey(id, order_index)
        )
      )
    `,
    )
    .eq("store_id", store.id)
    .order("order_index", { ascending: true });

  if (categoryError) {
    throw new Error(
      `Failed to fetch store menu category order: ${categoryError.message}`,
    );
  }

  const sortedCategoryRows = (sortedCategories ??
    []) as unknown as CategorySortRow[];

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
    created_at: store.created_at,
    id: store.id,
    image_url: store.image_url,
    is_published: store.is_published,
    name: store.name,
    seo_description: store.menu_seo_description,
    seo_title: store.menu_seo_title,
    slug: store.menu_slug,
    menu_categories: menuCategories,
  } satisfies PublicMenu;
}
