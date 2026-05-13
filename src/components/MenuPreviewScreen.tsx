import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/constants";
import { useMenuPreviewState } from "@/lib/menuPreviewStore";
import { Dialog } from "radix-ui";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const dialogEaseOut = [0.215, 0.61, 0.355, 1] as const;
const itemEaseOut = [0.25, 1, 0.5, 1] as const;

export default function MenuPreviewScreen() {
  const menuSections = useMenuPreviewState();
  const visibleMenuSections = menuSections
    .map((set) => ({
      ...set,
      items: set.items.filter((item) => !item.hidden),
    }))
    .filter((set) => set.items.length > 0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const previewContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const currentItem = menuSections
      .flatMap((set) => set.items)
      .find((item) => item.id === selectedItem.id);

    if (!currentItem || currentItem.hidden) {
      setSelectedItem(null);
    }
  }, [menuSections, selectedItem]);

  return (
    <div
      ref={previewContainerRef}
      className="relative h-full overflow-hidden bg-white"
    >
      <div className="device-preview-scroll h-full overflow-y-auto no-scrollbar">
        <div className="mb-4 p-4 text-center">
          <h3 className="text-lg font-medium">Maple Street Bakes</h3>
          <ul className="mt-1 flex items-center justify-center gap-3 text-[10px] opacity-60">
            {visibleMenuSections.map((set) => (
              <li key={set.id}>{set.category.name}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-8 pb-4">
          {visibleMenuSections.map((set) => (
            <section key={set.id}>
              <div className="px-4">
                <span className="block text-xs font-medium">
                  {set.category.name}
                </span>
                <p className="text-[10px] leading-tight opacity-60">
                  {set.category.description}
                </p>
                <span className="my-1 mb-2 block h-px w-full border-b" />
              </div>

              <div className="space-y-4 px-4">
                <AnimatePresence initial={false}>
                  {set.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: -10 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.18,
                        ease: itemEaseOut,
                      }}
                    >
                      <ItemRow
                        item={item}
                        isActive={item.id === selectedItem?.id}
                        onSelect={() => setSelectedItem(item)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ItemDetailsDialog
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            previewContainerRef={previewContainerRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ItemRow({
  item,
  onSelect,
}: {
  item: MenuItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="cursor-pointer" onClick={onSelect}>
      <div className="flex items-center">
        <div
          className={`size-8 shrink-0 overflow-hidden ${
            item.isSoldOut ? "opacity-60 grayscale" : ""
          }`}
          style={{ borderRadius: 8 }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>

        <div className="ml-1 flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 items-center gap-1.5">
            <p
              className={`min-w-0 truncate text-[10px] select-none ${
                item.isSoldOut ? "text-neutral-500" : ""
              }`}
            >
              {item.name}
            </p>
            {item.isSoldOut && (
              <span className="inline-flex h-4 shrink-0 items-center justify-center rounded-full border border-red-200 bg-white px-1.5 text-[8px] font-medium leading-none text-red-600">
                Sold out
              </span>
            )}
          </div>

          <p
            className={`text-[8px] leading-tight ${
              item.isSoldOut ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {item.tagline}
          </p>
        </div>

        <div className="ml-auto flex w-14 shrink-0 flex-col items-end">
          <span
            className={`text-[10px] ${
              item.isSoldOut ? "text-neutral-500" : ""
            }`}
          >
            {item.price}
          </span>
        </div>
      </div>
    </div>
  );
}

const ItemDetailsDialog = ({
  selectedItem,
  setSelectedItem,
  previewContainerRef,
}: {
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
  previewContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Dialog.Root
      modal={false}
      open={!!selectedItem}
      onOpenChange={() => setSelectedItem(null)}
    >
      {selectedItem && (
        <Dialog.Portal container={previewContainerRef.current} forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0.01 } : { duration: 0.16 }
            }
            className="absolute inset-0 z-50 grid place-items-center bg-black/30 p-4"
          >
            <Dialog.Content forceMount asChild>
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, scale: 0.98 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 6, scale: 0.99 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.22, ease: dialogEaseOut }
                }
                className="w-[calc(100vw-4rem)] max-w-75 overflow-hidden bg-white outline-none"
                style={{ borderRadius: 12, willChange: "transform, opacity" }}
              >
                {selectedItem.image && (
                  <div
                    className="h-44 w-full shrink-0 overflow-hidden bg-red-50"
                    style={{ borderRadius: "12px 12px 0 0" }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="size-full object-cover"
                    />
                  </div>
                )}

                <div className="mx-3 mt-3 flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <Dialog.Title asChild>
                        <p className="text-xs">{selectedItem.name}</p>
                      </Dialog.Title>

                      <span className="text-xs text-neutral-700 tabular-nums">
                        {selectedItem.price}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-[10px] wrap-break-word">
                      {selectedItem.tagline}
                    </p>

                    {(selectedItem.isSoldOut ||
                      selectedItem.note ||
                      selectedItem.tags.length > 0) && (
                      <ul
                        className="mt-2 flex flex-wrap gap-1"
                        aria-label="Item tags"
                      >
                        {selectedItem.isSoldOut && (
                          <li>
                            <Badge
                              variant="outline"
                              className="h-5 rounded-full border-red-200 bg-white px-2 text-[10px] font-medium text-red-600"
                            >
                              Sold out
                            </Badge>
                          </li>
                        )}
                        {selectedItem.note && (
                          <li>
                            <Badge
                              variant="outline"
                              className="h-5 rounded-full border-neutral-300 bg-white px-2 text-[10px] font-medium text-neutral-700"
                            >
                              {selectedItem.note}
                            </Badge>
                          </li>
                        )}
                        {selectedItem.tags.map((tag, index) => (
                          <li key={`${selectedItem.name}-${tag}-${index}`}>
                            <Badge
                              variant="outline"
                              className="h-5 rounded-full border-neutral-300 bg-white px-2 text-[10px] font-medium text-neutral-700"
                            >
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {selectedItem.description && (
                  <div>
                    <div className="via-border my-3 h-px bg-linear-to-r from-transparent to-transparent" />
                    <Dialog.Description asChild>
                      <p className="my-1 px-3 text-[10px] wrap-break-word">
                        {selectedItem.description}
                      </p>
                    </Dialog.Description>
                  </div>
                )}

                {selectedItem.details && selectedItem.details.length > 0 && (
                  <div>
                    <div className="via-border my-3 h-px bg-linear-to-r from-transparent to-transparent" />
                    <ul className="mb-6 grid grid-cols-2 gap-1 px-3">
                      {selectedItem.details.map((detail, index) => (
                        <li
                          key={`${selectedItem.name}-${detail.key}-${index}`}
                          className="flex flex-col rounded-md border border-neutral-200 bg-neutral-200/30 p-1"
                        >
                          <span className="text-[8px] font-semibold text-neutral-500 uppercase">
                            {detail.key}
                          </span>
                          <span className="mt-0.5 text-[9px] font-medium text-neutral-900">
                            {detail.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};
