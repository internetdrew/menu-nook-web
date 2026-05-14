"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import {
  ChevronDown,
  EditIcon,
  Ellipsis,
  Eye,
  EyeOff,
  GripVertical,
  Trash2,
} from "lucide-react";
import type { MenuCategory, MenuItem } from "@/constants";
import {
  setMenuPreviewState,
  useMenuPreviewState,
} from "@/lib/menuPreviewStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

const accordionEaseOut = [0.215, 0.61, 0.355, 1] as const;
const sortableTransition =
  "transform 250ms cubic-bezier(0.25, 1, 0.5, 1), opacity 180ms ease-out";

const collisionDetection: CollisionDetection = (args) => {
  const activeType = args.active.data.current?.type;
  const activeCategoryId = args.active.data.current?.categoryId;

  return closestCenter({
    ...args,
    droppableContainers: args.droppableContainers.filter((container) => {
      const data = container.data.current;

      if (activeType === "category") {
        return data?.type === "category";
      }

      if (activeType === "item") {
        return data?.type === "item" && data?.categoryId === activeCategoryId;
      }

      return true;
    }),
  });
};

export default function MenuEditorPreview() {
  const sections = useMenuPreviewState();
  const [openSections, setOpenSections] = useState<string[]>(
    sections.map((section) => section.id),
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleToggleItemHidden = (categoryId: string, itemId: string) => {
    setMenuPreviewState(
      sections.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, hidden: !item.hidden } : item,
              ),
            }
          : section,
      ),
    );
  };

  const handleToggleItemSoldOut = (categoryId: string, itemId: string) => {
    setMenuPreviewState(
      sections.map((section) =>
        section.id === categoryId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? { ...item, isSoldOut: !item.isSoldOut }
                  : item,
              ),
            }
          : section,
      ),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeData = active.data.current;

    if (activeData?.type === "category") {
      const oldIndex = sections.findIndex(
        (section) => section.id === active.id,
      );
      const newIndex = sections.findIndex((section) => section.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      setMenuPreviewState(arrayMove(sections, oldIndex, newIndex));
      return;
    }

    if (activeData?.type === "item") {
      const categoryId = activeData.categoryId;
      const section = sections.find((section) => section.id === categoryId);

      if (!section) return;

      const oldIndex = section.items.findIndex((item) => item.id === active.id);
      const newIndex = section.items.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      setMenuPreviewState(
        sections.map((currentSection) =>
          currentSection.id === categoryId
            ? {
                ...currentSection,
                items: arrayMove(currentSection.items, oldIndex, newIndex),
              }
            : currentSection,
        ),
      );
    }
  };

  return (
    <div className="device-preview-scroll no-scrollbar h-full overflow-y-auto bg-neutral-50 px-3 py-4 text-[#281513]">
      <MotionConfig transition={{ duration: 0.24, ease: accordionEaseOut }}>
        <DndContext
          id="menu-editor-preview"
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <Accordion.Root
              type="multiple"
              value={openSections}
              onValueChange={setOpenSections}
              className="space-y-4"
            >
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  isOpen={openSections.includes(section.id)}
                  onToggleItemHidden={handleToggleItemHidden}
                  onToggleItemSoldOut={handleToggleItemSoldOut}
                />
              ))}
            </Accordion.Root>
          </SortableContext>
        </DndContext>
      </MotionConfig>
    </div>
  );
}

function SortableSection({
  section,
  isOpen,
  onToggleItemHidden,
  onToggleItemSoldOut,
}: {
  section: MenuCategory;
  isOpen: boolean;
  onToggleItemHidden: (categoryId: string, itemId: string) => void;
  onToggleItemSoldOut: (categoryId: string, itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id, data: { type: "category" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? transition : (transition ?? sortableTransition),
    boxShadow: isDragging
      ? "0 10px 28px rgba(40, 21, 19, 0.16)"
      : "0 1px 3px rgba(40, 21, 19, 0.08)",
    opacity: isDragging ? 0.9 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 20 : 0,
  };

  return (
    <Accordion.Item
      ref={setNodeRef}
      style={style}
      value={section.id}
      className={`overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors ${
        isDragging ? "border-neutral-300" : ""
      }`}
    >
      <Accordion.Header
        className={`m-0 flex items-center ${
          isOpen ? "border-b border-neutral-200/60" : ""
        }`}
      >
        <div
          className="flex min-w-0 flex-1 cursor-grab touch-none items-center gap-2 p-2.5 pr-1 text-left active:cursor-grabbing group"
          {...attributes}
          {...listeners}
          aria-label={`Reorder ${section.category.name}`}
        >
          <span className="grid size-3.5 shrink-0 place-items-center">
            <GripVertical className="size-3.5 shrink-0 text-[#b6aaa1] transition-colors duration-150 group-hover:text-[#907f75]" />
          </span>
          <div className="min-w-0 flex flex-1 items-center select-none">
            <h3 className="inline text-xs font-semibold">
              {section.category.name}
            </h3>
            <span className="ml-1.5 text-[9px] font-medium text-[#8d7f78]">
              {section.items.length}{" "}
              {section.items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
        <Accordion.Trigger asChild>
          <button
            type="button"
            className="grid size-9 shrink-0 place-items-center text-[#78665e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            aria-label={`${isOpen ? "Collapse" : "Expand"} ${
              section.category.name
            }`}
          >
            <motion.span
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.16, ease: accordionEaseOut }}
              className="grid size-4 origin-center place-items-center"
              style={{ transformOrigin: "50% 50%", willChange: "transform" }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </button>
        </Accordion.Trigger>
      </Accordion.Header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Accordion.Content forceMount asChild>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  height: "auto",
                },
                closed: {
                  height: 0,
                },
              }}
              className="overflow-hidden"
            >
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -4 },
                }}
              >
                <SortableContext
                  items={section.items.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div>
                    {section.items.map((item) => (
                      <SortableMenuItem
                        key={item.id}
                        item={item}
                        categoryId={section.id}
                        onToggleHidden={onToggleItemHidden}
                        onToggleSoldOut={onToggleItemSoldOut}
                      />
                    ))}
                  </div>
                </SortableContext>
              </motion.div>
            </motion.div>
          </Accordion.Content>
        )}
      </AnimatePresence>
    </Accordion.Item>
  );
}

function SortableMenuItem({
  item,
  categoryId,
  onToggleHidden,
  onToggleSoldOut,
}: {
  item: MenuItem;
  categoryId: string;
  onToggleHidden: (categoryId: string, itemId: string) => void;
  onToggleSoldOut: (categoryId: string, itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: "item", categoryId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? transition : (transition ?? sortableTransition),
    boxShadow: isDragging
      ? "0 7px 20px rgba(40, 21, 19, 0.15)"
      : "0 0 0 rgba(40, 21, 19, 0)",
    opacity: isDragging ? 0.94 : item.hidden ? 0.55 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex select-none items-center bg-white p-2 py-2.5 text-[11px] font-medium transition-colors ${isDragging ? "rounded-md" : ""}`}
    >
      <div
        className="-my-2 -ml-2 flex min-w-0 flex-1 cursor-grab touch-none items-center py-2 active:cursor-grabbing group"
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${item.name}`}
      >
        <span
          className="grid size-8 shrink-0 place-items-center"
          aria-hidden="true"
        >
          <GripVertical className="size-3 shrink-0 text-neutral-400/70 transition-colors duration-150 group-hover:text-neutral-500" />
        </span>
        <img
          src={item.image}
          alt={item.name}
          draggable={false}
          className={`pointer-events-none size-8 shrink-0 rounded-md object-cover ${
            item.isSoldOut ? "grayscale" : ""
          }`}
        />
        <div className="pointer-events-none ml-1 min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <h4 className="min-w-0 truncate">{item.name}</h4>
            {item.isSoldOut && (
              <span className="inline-flex h-4 shrink-0 items-center rounded-full border border-red-200 bg-red-50 px-1.5 text-[8px] font-semibold leading-none text-red-700">
                Sold out
              </span>
            )}
          </div>
          <p
            className={`truncate text-[9px] font-normal ${
              item.isSoldOut ? "text-[#9a8b84]" : "text-[#7d6b62]"
            }`}
          >
            {item.tagline || item.description}
          </p>
        </div>
        <span
          className={`pointer-events-none ml-3 mr-2 w-12 shrink-0 text-right text-[10px] ${
            item.isSoldOut ? "text-[#8f817b]" : ""
          }`}
        >
          {item.price}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1"
            aria-label={`Open actions for ${item.name}`}
          >
            <Ellipsis className="size-3.5 text-neutral-400/70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-xs" disabled>
              <EditIcon className="size-3" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onSelect={() => onToggleHidden(categoryId, item.id)}
            >
              {item.hidden ? (
                <Eye className="size-3" />
              ) : (
                <EyeOff className="size-3" />
              )}
              {item.hidden ? "Show on menu" : "Hide from menu"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex min-w-40 items-center justify-between gap-5 text-xs"
              onSelect={(event) => {
                event.preventDefault();
                onToggleSoldOut(categoryId, item.id);
              }}
            >
              <span>Sold out</span>
              <Switch
                size="sm"
                checked={!!item.isSoldOut}
                aria-label={`Mark ${item.name} as sold out`}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
                onCheckedChange={() => onToggleSoldOut(categoryId, item.id)}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled
              variant="destructive"
              className="text-xs"
            >
              <Trash2 className="size-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
