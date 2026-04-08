import { useMemo, useRef, useState } from "react";
import { categorizedItems } from "@/constants";
import { Dialog } from "radix-ui";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Badge } from "./ui/badge";

type Item = (typeof categorizedItems)[number]["items"][number];

export default function DevicePreviewScreen() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryNames = useMemo(
    () => categorizedItems.map((set) => set.category.name),
    [],
  );

  return (
    <LayoutGroup id="menu-items">
      <div
        ref={previewContainerRef}
        className="relative h-full overflow-hidden bg-neutral-100"
      >
        <div className="device-preview-scroll h-full overflow-y-auto no-scrollbar">
          <div className="mb-4 p-4 text-center">
            <h3 className="text-lg font-medium">Maple Street Bakes</h3>
            <ul className="mt-1 flex items-center justify-center gap-3 text-[10px] opacity-60">
              {categoryNames.map((categoryName) => (
                <li key={categoryName}>{categoryName}</li>
              ))}
            </ul>
          </div>

          <motion.div layout className="space-y-8 pb-4">
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

                <div className="space-y-4 px-4">
                  {set.items.map((item) => (
                    <ItemRow
                      key={`${set.category.name}-${item.name}`}
                      item={item}
                      isSelected={selectedItem?.name === item.name}
                      onSelect={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </div>

        {selectedItem && (
          <ItemDetailsDialog
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            previewContainerRef={previewContainerRef}
          />
        )}
      </div>
    </LayoutGroup>
  );
}

function ItemRow({
  item,
  isSelected,
  onSelect,
}: {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      layout
      layoutId={`item-wrapper-${item.name}`}
      className="cursor-pointer"
      onClick={onSelect}
    >
      <motion.div
        layout
        className={`flex items-start ${item.outOfStock ? "opacity-60" : ""}`}
      >
        <div className="size-8 shrink-0 rounded-md overflow-hidden">
          <motion.img
            layoutId={`item-image-${item.name}`}
            src={item.image}
            alt={item.name}
            className="size-full object-cover"
            style={{ borderRadius: 8 }}
          />
        </div>

        <div className="ml-1 flex flex-1 flex-col">
          <div className="flex">
            <motion.p
              layoutId={`item-name-${item.name}`}
              className="mr-1 text-[10px] select-none"
            >
              {item.name}
            </motion.p>
            {(item.outOfStock || item.note) && (
              <motion.span
                layoutId={`item-tag-${item.name}`}
                className={
                  item.outOfStock
                    ? "inline-flex items-center justify-center rounded-full border border-red-600/50 bg-red-500/5 px-1.5 py-px text-[8px] text-red-600/80"
                    : "inline-flex items-center justify-center rounded-full bg-neutral-200 px-1.5 py-px text-[8px]"
                }
              >
                {item.outOfStock ? "Out of stock" : item.note}
              </motion.span>
            )}
          </div>

          <motion.p
            layoutId={`item-tagline-${item.name}`}
            className="text-[8px] leading-tight text-neutral-500"
          >
            {item.tagline}
          </motion.p>

          <motion.span
            animate={{ opacity: isSelected ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-px text-[8px]"
            style={{ pointerEvents: isSelected ? "none" : "auto" }}
            aria-hidden={isSelected}
          >
            View details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.span>
        </div>

        <div className="ml-auto flex flex-col">
          <motion.span
            layoutId={`item-price-${item.name}`}
            className="text-[10px]"
          >
            {item.price}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ItemDetailsDialog = ({
  selectedItem,
  setSelectedItem,
  previewContainerRef,
}: {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  previewContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Dialog.Root
      modal={false}
      open={!!selectedItem}
      onOpenChange={() => setSelectedItem(null)}
    >
      <AnimatePresence>
        {selectedItem && (
          <Dialog.Portal container={previewContainerRef.current} forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="absolute inset-0 z-50 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </Dialog.Overlay>

            <div className="absolute inset-0 z-50 grid place-items-center overflow-y-auto p-4">
              <Dialog.Content forceMount asChild>
                <motion.div
                  layout
                  key={selectedItem.name}
                  layoutId={`item-wrapper-${selectedItem.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.15 },
                  }}
                  style={{ borderRadius: 12 }}
                  className="device-preview-dialog-scroll my-auto h-auto max-h-full w-full max-w-lg overflow-y-hidden bg-white outline-none"
                >
                  {selectedItem.image && (
                    <motion.img
                      layoutId={`item-image-${selectedItem.name}`}
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="h-32 w-full shrink-0 bg-red-50 object-cover"
                      style={{ borderRadius: "12px 12px 0 0" }}
                    />
                  )}

                  <div className="flex gap-4 p-3">
                    <div className="flex-1">
                      {(selectedItem.outOfStock || selectedItem.note) && (
                        <motion.span
                          layoutId={`item-tag-${selectedItem.name}`}
                          className={
                            selectedItem.outOfStock
                              ? "inline-flex items-center mb-1 justify-center rounded-full border border-red-600/50 bg-red-500/5 px-1.5 py-px text-[10px] text-red-600/80"
                              : "inline-flex items-center justify-center rounded-full bg-neutral-200 px-2 py-px text-[10px]"
                          }
                        >
                          {selectedItem.outOfStock
                            ? "Out of stock"
                            : selectedItem.note}
                        </motion.span>
                      )}
                      <div className="flex justify-between gap-4">
                        <Dialog.Title asChild>
                          <motion.p
                            layoutId={`item-name-${selectedItem.name}`}
                            className="text-sm"
                          >
                            {selectedItem.name}
                          </motion.p>
                        </Dialog.Title>

                        <motion.span
                          layoutId={`item-price-${selectedItem.name}`}
                          className="text-xs text-neutral-700 tabular-nums"
                        >
                          {selectedItem.price}
                        </motion.span>
                      </div>

                      <motion.p
                        layoutId={`item-tagline-${selectedItem.name}`}
                        className="text-muted-foreground text-xs wrap-break-word"
                      >
                        {selectedItem.tagline}
                      </motion.p>

                      {selectedItem.tags.length > 0 && (
                        <ul
                          className="mt-2 flex flex-wrap gap-1.5"
                          aria-label="Item tags"
                        >
                          {selectedItem.tags.map((tag, index) => (
                            <li key={`${selectedItem.name}-${tag}-${index}`}>
                              <Badge className="rounded-full bg-neutral-200 px-2 py-px text-[10px] font-normal text-neutral-900 hover:bg-neutral-200">
                                {tag}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {selectedItem.description && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      >
                        <div className="via-border my-1 h-px bg-linear-to-r from-transparent to-transparent" />
                        <Dialog.Description asChild>
                          <motion.p className="my-3 px-3 text-xs wrap-break-word">
                            {selectedItem.description}
                          </motion.p>
                        </Dialog.Description>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {selectedItem.details &&
                      selectedItem.details.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                        >
                          <div className="via-border my-3 h-px bg-linear-to-r from-transparent to-transparent" />
                          <div className="mb-6 grid grid-cols-2 gap-1 px-3">
                            {selectedItem.details.map((detail, index) => (
                              <div
                                key={`${selectedItem.name}-${detail.key}-${index}`}
                                className="flex flex-col rounded-md border border-neutral-200 bg-neutral-200/30 p-2"
                              >
                                <span className="text-[8px] font-semibold text-neutral-500 uppercase">
                                  {detail.key}
                                </span>
                                <span className="mt-1 text-sm font-medium text-[9px] text-neutral-900">
                                  {detail.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
