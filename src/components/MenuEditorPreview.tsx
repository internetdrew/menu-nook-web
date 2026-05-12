"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { ChevronDown, Ellipsis, GripVertical, Plus } from "lucide-react";
import DevicePreviewScreen from "./DevicePreviewScreen";

const sections = [
  {
    name: "Mains",
    count: "2 items",
    items: [
      {
        name: "Fluffy Pancakes",
        description: "Maple syrup, butter",
        price: "$9",
      },
      {
        name: "Avocado Toast",
        description: "Sourdough, chili flakes",
        price: "$11",
      },
    ],
  },
  {
    name: "Drinks",
    count: "1 item",
    items: [
      {
        name: "Iced Latte",
        description: "Add description",
        price: "$5",
        isPlaceholder: true,
      },
    ],
  },
];

export default function MenuEditorPreview() {
  const [openSections, setOpenSections] = useState<string[]>(
    sections.map((section) => section.name),
  );

  return (
    <DevicePreviewScreen>
      <div className="device-preview-scroll h-full overflow-y-auto bg-white px-3 py-4 text-[#281513]">
        <MotionConfig
          transition={{ type: "spring", bounce: 0.18, visualDuration: 0.34 }}
        >
          <Accordion.Root
            type="multiple"
            value={openSections}
            onValueChange={setOpenSections}
            className="space-y-4"
          >
            {sections.map((section) => (
              <Accordion.Item
                key={section.name}
                value={section.name}
                className="overflow-hidden rounded-lg border border-[#e4d9ca] bg-[#fffdf8] shadow-[0_1px_0_rgba(40,21,19,0.04)]"
              >
                <Accordion.Header className="m-0 flex">
                  <Accordion.Trigger asChild>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.995 }}
                      className={`flex w-full items-center gap-1 p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                        openSections.includes(section.name)
                          ? "border-b border-[#ece3d8]"
                          : ""
                      }`}
                    >
                      <GripVertical className="size-4 shrink-0 text-[#b6aaa1]" />
                      <h3 className="min-w-0 text-sm font-semibold">
                        {section.name}
                      </h3>
                      <span className="ml-auto rounded-full bg-[#f4eee7] px-3 py-1 text-[10px] font-semibold text-[#78665e]">
                        {section.count}
                      </span>
                      <motion.span
                        animate={{
                          rotate: openSections.includes(section.name) ? 180 : 0,
                        }}
                        className="grid size-4 shrink-0 place-items-center text-[#78665e]"
                        style={{ willChange: "transform" }}
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                      <Ellipsis className="size-4 shrink-0 text-[#78665e]" />
                    </motion.button>
                  </Accordion.Trigger>
                </Accordion.Header>

                <AnimatePresence initial={false}>
                  {openSections.includes(section.name) && (
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
                          <div>
                            {section.items.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center gap-2 border-b border-[#ece3d8] p-2 py-2.5 text-xs font-medium"
                              >
                                <GripVertical className="size-3 shrink-0 text-[#c9bcb1]" />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-baseline gap-2">
                                    <h4 className="shrink-0">{item.name}</h4>
                                  </div>
                                  {/* <p
                                  className={`mt-1 text-base leading-tight ${
                                    item?.isPlaceholder
                                      ? "italic text-[#7d6b62]"
                                      : "text-[#7d6b62]"
                                  }`}
                                >
                                  {item.description}
                                </p> */}
                                </div>
                                <span className="shrink-0 text-right">
                                  {item.price}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-end p-2 text-pink-600">
                            <button className="inline-flex items-center gap-0.5 text-[11px] font-semibold">
                              <Plus className="size-3" />
                              Add item
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </Accordion.Content>
                  )}
                </AnimatePresence>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </MotionConfig>
      </div>
    </DevicePreviewScreen>
  );
}
