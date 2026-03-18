import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";
import ModalItemDetails from "./ModalItemDetails";
import {
  categorizedItems,
  categoryArt,
  type ActiveMenuItem,
} from "@/constants";
import { X } from "lucide-react";

export const morphLayoutTransition = {
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
  const activeArt = activeItem ? categoryArt[activeItem.categoryName] : null;

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
        className={`device-preview-scroll h-full no-scrollbar ${activeItem ? "overflow-hidden touch-none" : "overflow-y-auto"}`}
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
                      className="block w-full cursor-pointer text-left"
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
                            className="max-w-3/4 text-[10px] leading-tight text-black/62"
                          >
                            {item.description}
                          </motion.p>
                        ) : (
                          <p className="max-w-3/4 text-[10px] leading-tight text-black/62">
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

            <div className="pointer-events-none absolute inset-0 z-20 p-4 select-none">
              <motion.div
                layoutId={`menu-item-${activeItem.categoryName}-${activeItem.name}`}
                transition={{ layout: morphLayoutTransition }}
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogId}
                className="pointer-events-auto flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_18px_48px_rgba(0,0,0,0.18)]"
              >
                <div
                  className={`relative min-h-[30%] overflow-hidden px-4 pb-4 pt-4 ${activeArt?.heroClass ?? "bg-[#d8ccbe]"} ${activeArt?.inkClass ?? "text-[#4f4338]"}`}
                >
                  <div className="flex items-start justify-end">
                    <motion.button
                      type="button"
                      aria-label={`Close details for ${activeItem.name}`}
                      onClick={() => setActiveItem(null)}
                      className="ml-auto rounded-full bg-white/55 p-0.5 text-black/72 backdrop-blur-sm active:scale-95"
                      layoutId={`menu-item-price-${activeItem.categoryName}-${activeItem.name}`}
                      transition={{ layout: morphLayoutTransition }}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>

                  {/* <div className="relative mt-4 h-full will-change-transform">
                    <div
                      className={`absolute left-1/2 top-5 h-28 w-30 -translate-x-1/2 rounded-full blur-2xl ${activeArt?.washClass ?? "bg-[#f4ede4]"}`}
                    />
                    <div className="absolute left-1/2 top-8 h-20 w-34 -translate-x-1/2 rounded-[999px] border border-white/55 bg-white/32 shadow-[0_16px_30px_rgba(255,255,255,0.24)_inset]" />
                    <div className="absolute left-1/2 top-[3.95rem] h-10 w-20 -translate-x-1/2 rounded-[999px] border border-black/8 bg-white/55" />
                    <div
                      className={`absolute left-1/2 top-[6.8rem] h-px w-28 -translate-x-1/2 ${activeArt?.lineClass ?? "bg-[#8d7661]/30"}`}
                    />
                  </div> */}
                </div>

                <ModalItemDetails activeItem={activeItem} dialogId={dialogId} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
