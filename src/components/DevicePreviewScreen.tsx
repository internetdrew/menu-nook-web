import { useMemo, useRef, useState } from "react";
import { categorizedItems } from "@/constants";
import { Dialog } from "radix-ui";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";

type Item = (typeof categorizedItems)[number]["items"][number];

export default function DevicePreviewScreen() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryNames = useMemo(
    () => categorizedItems.map((set) => set.category.name),
    [],
  );

  return (
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

        <div className="space-y-8 pb-4">
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
                    onSelect={() => setSelectedItem(item)}
                  />
                ))}
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

function ItemRow({ item, onSelect }: { item: Item; onSelect: () => void }) {
  return (
    <div className="cursor-pointer" onClick={onSelect}>
      <div
        className={`flex items-start ${item.outOfStock ? "opacity-60" : ""}`}
      >
        <motion.div
          layoutId={`item-image-${item.name}`}
          className="size-8 shrink-0 overflow-hidden"
          style={{ borderRadius: 8 }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="size-full object-cover"
          />
        </motion.div>

        <div className="ml-1 flex flex-1 flex-col">
          <div className="flex">
            <p className="mr-1 text-[10px] select-none">{item.name}</p>
            {(item.outOfStock || item.note) && (
              <span
                className={
                  item.outOfStock
                    ? "inline-flex items-center justify-center rounded-full border border-red-600/50 bg-red-500/5 px-1.5 py-px text-[8px] text-red-600/80"
                    : "inline-flex items-center justify-center rounded-full bg-neutral-200 px-1.5 py-px text-[8px]"
                }
              >
                {item.outOfStock ? "Out of stock" : item.note}
              </span>
            )}
          </div>

          <p className="text-[8px] leading-tight text-neutral-500">
            {item.tagline}
          </p>

          <span className="flex items-center gap-px text-[8px]">
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
          </span>
        </div>

        <div className="ml-auto flex flex-col">
          <span className="text-[10px]">{item.price}</span>
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
      {selectedItem && (
        <Dialog.Portal container={previewContainerRef.current} forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 grid place-items-center bg-black/30 p-4"
          >
            <Dialog.Content forceMount asChild>
              <motion.div
                className="bg-white overflow-hidden outline-none"
                style={{ borderRadius: 12 }}
              >
                {selectedItem.image && (
                  <motion.div
                    layoutId={`item-image-${selectedItem.name}`}
                    className="h-32 w-full shrink-0 overflow-hidden bg-red-50"
                    style={{ borderRadius: "12px 12px 0 0" }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="size-full object-cover"
                    />
                  </motion.div>
                )}

                <div className="flex gap-4 mx-3 mt-3">
                  <div className="flex-1">
                    {(selectedItem.outOfStock || selectedItem.note) && (
                      <span
                        className={
                          selectedItem.outOfStock
                            ? "inline-flex items-center mb-1 justify-center rounded-full border border-red-600/50 bg-red-500/5 px-1.5 py-px text-[10px] text-red-600/80"
                            : "inline-flex items-center justify-center rounded-full bg-neutral-200 px-2 py-px text-[10px]"
                        }
                      >
                        {selectedItem.outOfStock
                          ? "Out of stock"
                          : selectedItem.note}
                      </span>
                    )}
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

                    {selectedItem.tags.length > 0 && (
                      <ul
                        className="mt-1 flex flex-wrap gap-0.5"
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
                  <>
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
                          <span className="mt-0.5 text-sm font-medium text-[9px] text-neutral-900">
                            {detail.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};
