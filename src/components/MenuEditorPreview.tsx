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
  return (
    <DevicePreviewScreen>
      <div className="device-preview-scroll h-full overflow-y-auto bg-white px-3 py-4 text-[#281513]">
        <div className="space-y-4">
          {sections.map((section) => (
            <section
              key={section.name}
              className="overflow-hidden rounded-lg border border-[#e4d9ca] bg-[#fffdf8] shadow-[0_1px_0_rgba(40,21,19,0.04)]"
            >
              <div className="flex items-center gap-1 border-b border-[#ece3d8] p-2">
                <GripVertical className="size-4 shrink-0 text-[#b6aaa1]" />
                <h3 className="min-w-0 text-sm font-semibold">
                  {section.name}
                </h3>
                <span className="rounded-full ml-auto bg-[#f4eee7] px-3 py-1 text-[10px] font-semibold text-[#78665e]">
                  {section.count}
                </span>
                <ChevronDown className="size-4 shrink-0 text-[#78665e]" />
                <Ellipsis className="size-4 shrink-0 text-[#78665e]" />
              </div>

              <div>
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 font-medium border-b text-xs border-[#ece3d8] p-2 py-2.5"
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
                    <span className="shrink-0 text-right">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end p-2 text-pink-600">
                <button className="inline-flex items-center gap-0.5 text-[11px] font-semibold">
                  <Plus className="size-3" />
                  Add item
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </DevicePreviewScreen>
  );
}
