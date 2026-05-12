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
  Ellipsis,
  GripVertical,
  Plus as PlusIcon,
} from "lucide-react";
import type { MenuCategory, MenuItem } from "@/constants";
import {
  setMenuPreviewState,
  useMenuPreviewState,
} from "@/lib/menuPreviewStore";
import DevicePreviewScreen from "./DevicePreviewScreen";

const accordionEaseOut = [0.215, 0.61, 0.355, 1] as const;

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
    <DevicePreviewScreen>
      <div className="device-preview-scroll no-scrollbar h-full overflow-y-auto bg-white px-3 py-4 text-[#281513]">
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
                  />
                ))}
              </Accordion.Root>
            </SortableContext>
          </DndContext>
        </MotionConfig>
      </div>
    </DevicePreviewScreen>
  );
}

function SortableSection({
  section,
  isOpen,
}: {
  section: MenuCategory;
  isOpen: boolean;
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
    transition,
    opacity: isDragging ? 0.62 : 1,
  };

  return (
    <Accordion.Item
      ref={setNodeRef}
      style={style}
      value={section.id}
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow"
    >
      <Accordion.Header className="m-0 flex">
        <Accordion.Trigger asChild>
          <motion.button
            type="button"
            whileTap={{ scale: 0.995 }}
            className={`flex w-full items-center gap-1 p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
              isOpen ? "border-b border-neutral-200/60" : ""
            }`}
          >
            <span
              className="cursor-grab touch-none active:cursor-grabbing"
              onClick={(event) => event.stopPropagation()}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="size-3.5 shrink-0 text-[#b6aaa1]" />
            </span>
            <h3 className="min-w-0 text-xs font-semibold">
              {section.category.name}
            </h3>
            <span className="ml-auto rounded-full bg-neutral-100 px-3 py-1 text-[9px] font-semibold text-neutral-700">
              {section.items.length}{" "}
              {section.items.length === 1 ? "item" : "items"}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.16, ease: accordionEaseOut }}
              className="grid size-3.5 shrink-0 place-items-center text-[#78665e]"
              style={{ willChange: "transform" }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
            {/* <Ellipsis className="size-3.5 shrink-0 text-[#78665e]" /> */}
          </motion.button>
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
                  maskImage:
                    "linear-gradient(to bottom, black 100%, transparent 100%)",
                },
                closed: {
                  height: 0,
                  maskImage:
                    "linear-gradient(to bottom, black 55%, transparent 100%)",
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
                        isLast={item.id === section.items.at(-1)?.id}
                      />
                    ))}
                  </div>
                </SortableContext>

                {/* <div className="flex items-center justify-end p-2 text-pink-600">
                  <button className="inline-flex items-center gap-0.5 text-[11px] font-semibold">
                    <PlusIcon className="size-3" />
                    Add item
                  </button>
                </div> */}
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
  isLast,
}: {
  item: MenuItem;
  categoryId: string;
  isLast: boolean;
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
    transition,
    opacity: isDragging ? 0.62 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex select-none items-center gap-1 p-2 py-2.5 text-xs font-medium ${
        isLast ? "" : "border-b border-[#ece3d8]"
      }`}
    >
      <button
        type="button"
        className="cursor-grab touch-none active:cursor-grabbing"
        aria-label={`Reorder ${item.name}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-3 shrink-0 text-[#c9bcb1]" />
      </button>
      <img
        src={item.image}
        alt={item.name}
        draggable={false}
        className="pointer-events-none size-8 shrink-0 rounded-md object-cover"
      />
      <div className="pointer-events-none min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h4 className="truncate">{item.name}</h4>
        </div>
        <p className="mt-0.5 truncate text-[9px] font-normal text-[#7d6b62]">
          {item.tagline || item.description}
        </p>
      </div>
      <span className="pointer-events-none shrink-0 text-right text-[10px]">
        {item.price}
      </span>
    </div>
  );
}
