import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import {
  AnimatePresence,
  frame,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const activeThumbnailZIndex = 2001;

type PublicMenuImageItem = {
  id: number | string;
  image_url: string;
  name: string;
};

type PublicMenuImageDialogIslandProps = {
  items: PublicMenuImageItem[];
};

type StoreItemImageButtonProps = {
  isSelected: boolean;
  item: PublicMenuImageItem;
  onSelectItem: (item: PublicMenuImageItem) => void;
  prefersReducedMotion: boolean | null;
};

const getPortalTargetId = (itemId: PublicMenuImageItem["id"]) =>
  `menu-item-image-trigger-${itemId}`;

function StoreItemImageButton({
  isSelected,
  item,
  onSelectItem,
  prefersReducedMotion,
}: StoreItemImageButtonProps) {
  const zIndex = useMotionValue(0);
  const layoutTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, bounce: 0.1, visualDuration: 0.3 };

  return (
    <motion.button
      type="button"
      onClick={() => {
        frame.postRender(() => {
          onSelectItem(item);
          zIndex.set(activeThumbnailZIndex);
        });
      }}
      className="group/image shrink-0 cursor-zoom-in focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 focus-visible:outline-none"
      style={{
        aspectRatio: "1 / 1",
        height: 64,
        opacity: isSelected ? 0 : 1,
        width: 64,
        zIndex,
      }}
      aria-haspopup="dialog"
      aria-label={`Open larger image for ${item.name}`}
    >
      <motion.div
        layoutId={`store-item-image-${item.id}`}
        className="h-full w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 12,
          height: "100%",
          width: "100%",
        }}
        transition={{ layout: layoutTransition }}
        onLayoutAnimationStart={() => zIndex.set(activeThumbnailZIndex)}
        onLayoutAnimationComplete={() => zIndex.set(0)}
      >
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.button>
  );
}

function ItemImageDialog({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: PublicMenuImageItem | null;
  setSelectedItem: (item: PublicMenuImageItem | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const layoutTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, bounce: 0.1, visualDuration: 0.125 };

  return (
    <Dialog.Root
      open={!!selectedItem}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedItem(null);
        }
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
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.16,
                }}
              />
            </Dialog.Overlay>
            <motion.div
              layoutRoot
              className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4"
            >
              <Dialog.Content forceMount asChild>
                <motion.div
                  className="relative my-auto w-full max-w-lg overflow-visible bg-transparent outline-none"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Dialog.Title className="sr-only">
                    {selectedItem.name} image
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Full-size item image.
                  </Dialog.Description>
                  <motion.div
                    layoutId={`store-item-image-${selectedItem.id}`}
                    className="h-full w-full overflow-hidden rounded-xl"
                    style={{
                      aspectRatio: "4 / 3",
                      borderRadius: 12,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                      height: "100%",
                      width: "100%",
                    }}
                    transition={{ layout: layoutTransition }}
                  >
                    <img
                      src={selectedItem.image_url}
                      alt={selectedItem.name}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <Dialog.Close asChild>
                    <motion.button
                      type="button"
                      className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/70 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-none"
                      aria-label="Close image"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: {
                          opacity: 0,
                          transition: {
                            duration: prefersReducedMotion ? 0.01 : 0,
                          },
                        },
                        visible: {
                          opacity: 1,
                          transition: {
                            duration: prefersReducedMotion ? 0.01 : 0.1,
                            delay: prefersReducedMotion ? 0 : 0.15,
                          },
                        },
                      }}
                    >
                      <X className="size-4" />
                    </motion.button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default function PublicMenuImageDialogIsland({
  items,
}: PublicMenuImageDialogIslandProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedItem, setSelectedItem] = useState<PublicMenuImageItem | null>(
    null,
  );
  const [isMounted, setIsMounted] = useState(false);
  const imageItems = useMemo(
    () => items.filter((item) => Boolean(item.image_url)),
    [items],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <LayoutGroup id="store-item-images">
      {isMounted &&
        imageItems.map((item) => {
          const target = document.getElementById(getPortalTargetId(item.id));

          if (!target) return null;

          return createPortal(
            <StoreItemImageButton
              isSelected={selectedItem?.id === item.id}
              item={item}
              onSelectItem={setSelectedItem}
              prefersReducedMotion={prefersReducedMotion}
            />,
            target,
            String(item.id),
          );
        })}

      <ItemImageDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </LayoutGroup>
  );
}
