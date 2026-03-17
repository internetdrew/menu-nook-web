import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategory = {
  category: {
    name: string;
    description: string;
  };
  items: MenuItem[];
};

type ActiveMenuItem = MenuItem & {
  categoryName: string;
  categoryDescription: string;
};

const categorizedItems: MenuCategory[] = [
  {
    category: {
      name: "Small Plates",
      description:
        "A collection of seasonal compositions designed to open the meal with balance, texture, and brightness.",
    },
    items: [
      {
        name: "Heirloom Tomato Tartare",
        description:
          "Vine-ripened tomatoes, basil oil, shaved fennel, and sea salt on toasted sourdough.",
        price: "$14",
      },
      {
        name: "Seared Scallops",
        description:
          "Golden caramelized scallops, citrus emulsion, and tender young herbs.",
        price: "$18",
      },
      {
        name: "Truffle Mushroom Croquettes",
        description:
          "Crisp exterior, creamy woodland mushroom center, finished with aged pecorino.",
        price: "$16",
      },
    ],
  },
  {
    category: {
      name: "Entrees",
      description:
        "Thoughtfully sourced ingredients prepared with restraint and precision.",
    },
    items: [
      {
        name: "Roasted Duck Breast",
        description:
          "Slow-roasted duck, cherry gastrique, and charred broccolini.",
        price: "$32",
      },
      {
        name: "Wild Mushroom Risotto",
        description:
          "Arborio rice, forest mushrooms, white wine, and aged parmesan.",
        price: "$28",
      },
      {
        name: "Charred Wagyu Short Rib",
        description: "Tender wagyu, smoked jus, and creamy pomme puree.",
        price: "$38",
      },
    ],
  },
  {
    category: {
      name: "Desserts",
      description: "Elegant finishes crafted to linger.",
    },
    items: [
      {
        name: "Valrhona Chocolate Souffle",
        description: "Dark chocolate souffle with creme anglaise.",
        price: "$12",
      },
      {
        name: "Lavender Panna Cotta",
        description:
          "Silken cream infused with lavender, served with macerated berries.",
        price: "$10",
      },
    ],
  },
];

const morphLayoutTransition = {
  type: "spring" as const,
  stiffness: 460,
  damping: 38,
  mass: 0.72,
};

export default function DevicePreviewScreen() {
  const [activeItem, setActiveItem] = useState<ActiveMenuItem | null>(null);
  const dialogId = useId();

  const categoryNames = useMemo(
    () => categorizedItems.map((set) => set.category.name),
    [],
  );

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  return (
    <div className="relative h-full overflow-hidden bg-[#f4f4f0]">
      <div
        className={`h-full no-scrollbar ${activeItem ? "overflow-hidden touch-none" : "overflow-y-auto"}`}
      >
        <div className="mb-4 p-4 text-center">
          <h3 className="text-lg font-medium">Maison Ember</h3>
          <ul className="mt-1 flex items-center justify-center gap-3 text-[10px] opacity-60">
            {categoryNames.map((categoryName) => (
              <li key={categoryName}>{categoryName}</li>
            ))}
          </ul>
        </div>

        <div
          className="space-y-8 pb-4"
          aria-hidden={activeItem ? true : undefined}
        >
          {categorizedItems.map((set) => (
            <section key={set.category.name}>
              <div className="px-4">
                <span className="block text-xs font-medium">
                  {set.category.name}
                </span>
                <p className="text-[10px] leading-tight opacity-60">
                  {set.category.description}
                </p>
                <span className="my-1 mb-2 block h-px w-full border-b" />
              </div>

              <div className="space-y-3 px-4">
                {set.items.map((item) => {
                  const compositeItem: ActiveMenuItem = {
                    ...item,
                    categoryName: set.category.name,
                    categoryDescription: set.category.description,
                  };

                  const itemId = `${set.category.name}-${item.name}`;
                  const isSelected =
                    activeItem?.categoryName === set.category.name &&
                    activeItem.name === item.name;
                  const shouldShareLayout = !activeItem || isSelected;

                  return (
                    <motion.button
                      key={itemId}
                      type="button"
                      layoutId={
                        shouldShareLayout ? `menu-item-${itemId}` : undefined
                      }
                      transition={
                        shouldShareLayout
                          ? { layout: morphLayoutTransition }
                          : undefined
                      }
                      className="block w-full text-left cursor-pointer"
                      onClick={() => setActiveItem(compositeItem)}
                    >
                      <div>
                        <div className="mb-1 flex items-center justify-between gap-6">
                          {shouldShareLayout ? (
                            <motion.span
                              layoutId={`menu-item-name-${itemId}`}
                              transition={{ layout: morphLayoutTransition }}
                              className="text-xs"
                            >
                              {item.name}
                            </motion.span>
                          ) : (
                            <span className="text-xs">{item.name}</span>
                          )}
                          {shouldShareLayout ? (
                            <motion.span
                              layoutId={`menu-item-price-${itemId}`}
                              transition={{ layout: morphLayoutTransition }}
                              className="text-xs"
                            >
                              {item.price}
                            </motion.span>
                          ) : (
                            <span className="text-xs">{item.price}</span>
                          )}
                        </div>

                        {shouldShareLayout ? (
                          <motion.p
                            layoutId={`menu-item-description-${itemId}`}
                            transition={{ layout: morphLayoutTransition }}
                            className="max-w-3/4 text-[10px] leading-tight opacity-60"
                          >
                            {item.description}
                          </motion.p>
                        ) : (
                          <p className="max-w-3/4 text-[10px] leading-tight opacity-60">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu item details"
              className="absolute inset-0 z-10 bg-black/18 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => setActiveItem(null)}
            />

            <div className="pointer-events-none absolute inset-0 z-20 p-4">
              <motion.div
                layoutId={`menu-item-${activeItem.categoryName}-${activeItem.name}`}
                transition={{ layout: morphLayoutTransition }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogId}
                className="pointer-events-auto rounded-[1.4rem] border border-black/10 bg-[#fffdf7] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                      {activeItem.categoryName}
                    </p>
                    <motion.p
                      id={dialogId}
                      layoutId={`menu-item-name-${activeItem.categoryName}-${activeItem.name}`}
                      transition={{ layout: morphLayoutTransition }}
                      className="mt-2 text-base font-medium leading-tight"
                    >
                      {activeItem.name}
                    </motion.p>
                  </div>

                  <motion.span
                    layoutId={`menu-item-price-${activeItem.categoryName}-${activeItem.name}`}
                    transition={{ layout: morphLayoutTransition }}
                    className="rounded-full border border-black/10 bg-black px-3 py-1 text-[11px] font-medium text-white"
                  >
                    {activeItem.price}
                  </motion.span>
                </div>

                <motion.p
                  layoutId={`menu-item-description-${activeItem.categoryName}-${activeItem.name}`}
                  transition={{ layout: morphLayoutTransition }}
                  className="mt-3 text-xs leading-5 text-black/65"
                >
                  {activeItem.description}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18, delay: 0.04, ease: "easeOut" }}
                  className="mt-4 rounded-2xl border border-black/8 bg-white px-3 py-3 text-[11px] leading-5 text-black/65"
                >
                  {activeItem.categoryDescription}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, delay: 0.08, ease: "easeOut" }}
                  className="mt-4 grid grid-cols-2 gap-2 text-[11px]"
                >
                  <div className="rounded-2xl border border-black/8 bg-white px-3 py-2">
                    <p className="text-black/45">Kitchen note</p>
                    <p className="mt-1 font-medium text-black/80">
                      Served fresh to order
                    </p>
                  </div>
                  <div className="rounded-2xl border border-black/8 bg-white px-3 py-2">
                    <p className="text-black/45">Guest signal</p>
                    <p className="mt-1 font-medium text-black/80">
                      Tap, browse, decide fast
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
