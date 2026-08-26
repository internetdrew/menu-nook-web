import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuCategory, MenuItem } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "radix-ui";
import {
  AnimatePresence,
  frame,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ArrowUp, X } from "lucide-react";

const activeThumbnailZIndex = 2001;
const dialogEaseOut = [0.215, 0.61, 0.355, 1] as const;
const itemEaseOut = [0.25, 1, 0.5, 1] as const;
const menuToggleTransition = {
  duration: 0.18,
  ease: dialogEaseOut,
} as const;

type MenuPreviewScreenProps = {
  menuSections: MenuCategory[];
};

const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/['"']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function MenuPreviewScreen({
  menuSections,
}: MenuPreviewScreenProps) {
  const visibleMenuSections = useMemo(
    () =>
      menuSections
        .map((set) => ({
          ...set,
          items: set.items.filter((item) => !item.hidden),
        }))
        .filter((set) => set.items.length > 0),
    [menuSections],
  );
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const showScrollToTopRef = useRef(false);
  const hasCategoryMenu = visibleMenuSections.length > 1;

  useEffect(() => {
    if (!selectedItem) return;

    const currentItem = menuSections
      .flatMap((set) => set.items)
      .find((item) => item.id === selectedItem.id);

    if (!currentItem || currentItem.hidden) {
      setSelectedItem(null);
    }
  }, [menuSections, selectedItem]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrame: number | null = null;

    const updateScrollToTopVisibility = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const shouldShowScrollToTop = container.scrollTop > 72;

        if (showScrollToTopRef.current !== shouldShowScrollToTop) {
          showScrollToTopRef.current = shouldShowScrollToTop;
          setShowScrollToTop(shouldShowScrollToTop);
        }
      });
    };

    updateScrollToTopVisibility();
    container.addEventListener("scroll", updateScrollToTopVisibility, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", updateScrollToTopVisibility);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const selectCategory = (categoryName: string) => {
    setCategoryMenuOpen(false);
    const container = scrollContainerRef.current;
    const element = container?.querySelector<HTMLElement>(
      `#${createSlug(categoryName)}`,
    );

    element?.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <div
      ref={previewContainerRef}
      className="relative h-full overflow-hidden bg-white text-left text-neutral-950"
    >
      <div
        ref={scrollContainerRef}
        className="device-preview-scroll h-full overflow-y-auto no-scrollbar"
      >
        <div className="mx-auto mt-5 w-full max-w-xl px-3.5 pb-10">
          <nav className="mb-5 flex items-center justify-between gap-3">
            <h3 className="menu-header min-w-0 flex-1 truncate text-left text-base font-semibold">
              La Bodega
            </h3>
            {hasCategoryMenu && (
              <DropdownMenu
                open={categoryMenuOpen}
                onOpenChange={setCategoryMenuOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="shrink-0 text-neutral-700"
                    aria-label={
                      categoryMenuOpen
                        ? "Close category menu"
                        : "Open category menu"
                    }
                  >
                    <CategoryMenuIcon
                      isOpen={categoryMenuOpen}
                      reduceMotion={prefersReducedMotion}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  container={previewContainerRef.current}
                  className="z-60 min-w-36 text-neutral-950"
                  onCloseAutoFocus={(event) => event.preventDefault()}
                >
                  <DropdownMenuGroup>
                    {visibleMenuSections.map((set) => (
                      <DropdownMenuItem
                        key={set.id}
                        className="rounded-md text-[11px] font-[460]"
                        onSelect={() => selectCategory(set.category.name)}
                      >
                        {set.category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {visibleMenuSections.length === 0 ? (
            <p className="mt-16 text-center text-xs">
              No categories available.
            </p>
          ) : (
            visibleMenuSections.map((set) => (
              <section key={set.id} className="mt-10 first:mt-0">
                <h4
                  id={createSlug(set.category.name)}
                  className="menu-header scroll-mt-5 text-sm font-medium text-neutral-950"
                >
                  {set.category.name}
                </h4>
                <p className="text-xs leading-snug text-neutral-500">
                  {set.category.description}
                </p>

                <motion.ul layout className="mt-5 space-y-4">
                  <AnimatePresence initial={false}>
                    {set.items.map((item) => (
                      <motion.li
                        layout
                        key={item.id}
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
                        <PreviewItemRow
                          item={item}
                          isSelected={selectedItem?.id === item.id}
                          onSelectItem={setSelectedItem}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </section>
            ))
          )}

          <footer className="mt-8 pb-1 text-center text-[9px] text-neutral-400">
            Powered by{" "}
            <span className="font-medium text-neutral-500">MenuNook</span>
          </footer>
        </div>
      </div>

      <PreviewItemImageDialog
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        previewContainerRef={previewContainerRef}
      />

      <Button
        type="button"
        onClick={scrollToTop}
        size="xs"
        className={`absolute right-3 bottom-3 z-40 rounded-full text-[10px] shadow-lg motion-safe:transition-transform motion-safe:duration-300 ${
          showScrollToTop ? "translate-x-0" : "translate-x-32"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-3" />
        Back to top
      </Button>
    </div>
  );
}

const CategoryMenuIcon = ({
  isOpen,
  reduceMotion,
}: {
  isOpen: boolean;
  reduceMotion: boolean | null;
}) => {
  const transition = reduceMotion ? { duration: 0.01 } : menuToggleTransition;

  return (
    <span
      aria-hidden="true"
      className="relative block size-4"
      data-state={isOpen ? "open" : "closed"}
    >
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.5px] w-3 rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: isOpen ? "-50%" : "calc(-50% - 4px)",
          rotate: isOpen ? 45 : 0,
        }}
        transition={transition}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.5px] w-3 rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: "-50%",
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0.65 : 1,
        }}
        transition={transition}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 h-[1.5px] w-3 rounded-full bg-current"
        initial={false}
        animate={{
          x: "-50%",
          y: isOpen ? "-50%" : "calc(-50% + 4px)",
          rotate: isOpen ? -45 : 0,
        }}
        transition={transition}
      />
    </span>
  );
};

function PreviewItemRow({
  isSelected,
  item,
  onSelectItem,
  prefersReducedMotion,
}: {
  isSelected: boolean;
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  prefersReducedMotion: boolean | null;
}) {
  const zIndex = useMotionValue(0);
  const layoutTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, bounce: 0.1, visualDuration: 0.3 };

  return (
    <div className="border-b border-neutral-200/50 pb-4 last:border-b-0">
      <div className="block w-full rounded-md text-left">
        <div className="flex items-center justify-between gap-2">
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
              height: 48,
              opacity: isSelected ? 0 : 1,
              width: 48,
              zIndex,
            }}
            aria-haspopup="dialog"
            aria-label={`Open larger image for ${item.name}`}
          >
            <motion.div
              layoutId={`preview-store-item-image-${item.id}`}
              className="h-full w-full overflow-hidden rounded-lg"
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 10,
                height: "100%",
                width: "100%",
              }}
              transition={{ layout: layoutTransition }}
              onLayoutAnimationStart={() => zIndex.set(activeThumbnailZIndex)}
              onLayoutAnimationComplete={() => zIndex.set(0)}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.button>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-xs">
            <motion.h5 className="font-medium leading-snug wrap-break-word">
              {item.name}
            </motion.h5>
            <p className="text-muted-foreground line-clamp-3 max-w-sm text-[10px] leading-tight wrap-break-word">
              {item.description || item.tagline}
            </p>
          </div>

          <motion.span className="shrink-0 text-[10px] font-medium text-neutral-700 tabular-nums">
            {item.price}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function PreviewItemImageDialog({
  selectedItem,
  setSelectedItem,
  previewContainerRef,
}: {
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;
  previewContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const layoutTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, bounce: 0.1, visualDuration: 0.125 };

  return (
    <Dialog.Root
      modal={false}
      open={!!selectedItem}
      onOpenChange={(open) => {
        if (!open) setSelectedItem(null);
      }}
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
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.16 }}
              />
            </Dialog.Overlay>
            <motion.div
              layoutRoot
              className="absolute inset-0 z-50 grid place-items-center overflow-y-auto p-3"
            >
              <Dialog.Content forceMount asChild>
                <motion.div
                  className="relative my-auto w-full overflow-visible bg-transparent outline-none"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <Dialog.Title className="sr-only">
                    {selectedItem.name} image
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Full-size item image.
                  </Dialog.Description>
                  <motion.div
                    layoutId={`preview-store-item-image-${selectedItem.id}`}
                    className="h-full w-full overflow-hidden rounded-lg"
                    style={{
                      aspectRatio: "4 / 3",
                      borderRadius: 10,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                      height: "100%",
                      width: "100%",
                    }}
                    transition={{ layout: layoutTransition }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <Dialog.Close asChild>
                    <motion.button
                      type="button"
                      className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/70 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-none"
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
                      <X className="size-3.5" />
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
