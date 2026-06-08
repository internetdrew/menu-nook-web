import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, ChevronRight, X } from "lucide-react";
import type { MenuItem, PublicMenu } from "@/lib/publicMenu";
import { createSlug } from "@/lib/publicMenu";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dialogEaseOut = [0.215, 0.61, 0.355, 1] as const;

type PublicMenuProps = {
  menu: PublicMenu;
};

export default function PublicMenu({ menu }: PublicMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const categoriesWithItems = useMemo(
    () =>
      menu.menu_categories.filter(
        (category) => category.items && category.items.length > 0,
      ),
    [menu.menu_categories],
  );

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollToTop(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const element = document.querySelector(window.location.hash);
    if (!element) return;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "start",
    });
  }, [prefersReducedMotion]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <div className="mx-auto mt-6 w-full max-w-xl flex-1 px-4 pb-20">
        {menu.business.image_url && (
          <img
            src={menu.business.image_url}
            alt={`${menu.business.name} logo`}
            decoding="async"
            className="mx-auto mb-4 size-20 rounded-full object-cover"
          />
        )}
        <h1 className="text-center text-lg font-semibold">
          {menu.business.name}
        </h1>
        <h2 className="text-center text-sm text-neutral-700">{menu.name}</h2>

        <nav
          ref={navRef}
          className="my-6 flex flex-wrap items-center justify-center gap-4 text-neutral-700"
          aria-label="Menu categories"
        >
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {categoriesWithItems.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${createSlug(category.name)}`}
                  className="hover:underline underline-offset-4 transition duration-150 decoration-neutral-600"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {categoriesWithItems.length === 0 ? (
          <p className="mt-16 text-center">No categories available.</p>
        ) : (
          categoriesWithItems.map((category) => (
            <section key={category.id} className="mt-16">
              <h3
                id={createSlug(category.name)}
                className="scroll-mt-20 text-sm font-medium"
              >
                {category.name}
              </h3>
              <p className="mb-4 border-b pb-3 text-xs text-neutral-700">
                {category.description}
              </p>

              <motion.ul layout className="space-y-6">
                {category.items.map((item) => (
                  <motion.li layout key={item.id}>
                    <MenuItemRow
                      item={item}
                      onSelect={() => setSelectedItem(item)}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          ))
        )}
      </div>

      <ItemDetailsDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      {showScrollToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full bg-neutral-950 text-white shadow-lg transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </div>
  );
}

function MenuItemRow({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: () => void;
}) {
  const shouldShowDetails = !!item.description || !!item.image_url;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!shouldShowDetails || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onSelect();
  };

  return (
    <div
      onClick={() => {
        if (shouldShowDetails) onSelect();
      }}
      onKeyDown={handleKeyDown}
      role={shouldShowDetails ? "button" : undefined}
      tabIndex={shouldShowDetails ? 0 : undefined}
      aria-label={
        shouldShowDetails ? `View details for ${item.name}` : undefined
      }
      className={`block w-full rounded-md text-left ${
        shouldShowDetails
          ? "group cursor-pointer transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 focus-visible:outline-none"
          : "cursor-default"
      }`}
    >
      <div className="flex gap-4">
        {item.image_url && (
          <motion.img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="size-16 shrink-0 object-cover"
            style={{ borderRadius: "12px" }}
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex justify-between gap-4 text-sm">
            <motion.h4 className="font-medium wrap-break-word">
              {item.name}
            </motion.h4>
            <div className="flex shrink-0 items-center gap-1">
              <motion.span className="text-xs text-neutral-700 tabular-nums">
                {priceFormatter.format(item.price)}
              </motion.span>
              {shouldShowDetails && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 text-neutral-400 transition-colors group-hover:text-neutral-700"
                />
              )}
            </div>
          </div>
          {(item.tagline || shouldShowDetails) && (
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {item.tagline && (
                <motion.p className="text-muted-foreground line-clamp-2 max-w-md text-xs wrap-break-word">
                  {item.tagline}
                </motion.p>
              )}
              {shouldShowDetails && (
                <span className="text-xs font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors group-hover:text-neutral-950 group-hover:decoration-neutral-500">
                  View details
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemDetailsDialog({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Dialog.Root
      open={!!selectedItem}
      onOpenChange={(open) => {
        if (!open) setSelectedItem(null);
      }}
    >
      <AnimatePresence>
        {selectedItem && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.16 }}
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-50 grid items-end overflow-y-auto sm:place-items-center sm:p-4">
              <Dialog.Content forceMount asChild>
                <motion.div
                  key={selectedItem.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10, scale: 0.99 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { duration: 0.22, ease: dialogEaseOut }
                  }
                  style={{ willChange: "transform, opacity" }}
                  className="max-h-[85dvh] w-full overflow-y-auto rounded-t-xl bg-white pb-6 shadow-xl outline-none sm:my-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-lg sm:rounded-xl"
                >
                  {selectedItem.image_url && (
                    <div className="bg-muted relative aspect-[4/3] max-h-[55dvh] w-full shrink-0 overflow-hidden rounded-t-xl">
                      <img
                        src={selectedItem.image_url}
                        alt={selectedItem.name}
                        decoding="async"
                        className="size-full object-cover"
                      />
                      <CloseButton image />
                    </div>
                  )}
                  <div className="relative flex gap-4 px-6 pt-6">
                    {!selectedItem.image_url && <CloseButton />}
                    <div className="min-w-0 flex-1 pr-10">
                      <div className="flex justify-between gap-4">
                        <Dialog.Title asChild>
                          <h4 className="font-medium wrap-break-word">
                            {selectedItem.name}
                          </h4>
                        </Dialog.Title>
                        <span className="shrink-0 text-sm text-neutral-700 tabular-nums">
                          {priceFormatter.format(selectedItem.price)}
                        </span>
                      </div>
                      {selectedItem.tagline && (
                        <p className="text-muted-foreground mt-1 text-sm wrap-break-word">
                          {selectedItem.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedItem.description ? (
                    <div className="pb-6">
                      <div className="via-border my-6 h-px bg-gradient-to-r from-transparent to-transparent" />
                      <Dialog.Description asChild>
                        <p className="px-6 text-sm wrap-break-word">
                          {selectedItem.description}
                        </p>
                      </Dialog.Description>
                    </div>
                  ) : (
                    <Dialog.Description className="sr-only">
                      Menu item details.
                    </Dialog.Description>
                  )}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function CloseButton({ image = false }: { image?: boolean }) {
  return (
    <Dialog.Close asChild>
      <button
        type="button"
        className={
          image
            ? "absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/70 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-none"
            : "absolute top-4 right-4 grid size-8 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
        }
        aria-label="Close item details"
      >
        <X className="size-4" />
      </button>
    </Dialog.Close>
  );
}
