import { useMemo } from "react";
import { categorizedItems } from "@/constants";

export default function DevicePreviewScreen() {
  const categoryNames = useMemo(
    () => categorizedItems.map((set) => set.category.name),
    [],
  );

  return (
    <div className="relative h-full overflow-hidden bg-neutral-100">
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
                  <div key={`${set.category.name}-${item.name}`}>
                    <div
                      className={`flex items-start ${item.outOfStock ? "opacity-60" : undefined}`}
                    >
                      <div className="size-8 shrink-0 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="flex flex-col ml-1">
                        <div className="flex">
                          <p className="text-[10px] mr-1">{item.name}</p>
                          {item.outOfStock ? (
                            <span className="text-[8px]">Out of stock</span>
                          ) : item.note ? (
                            <span className="text-[8px] bg-neutral-200 rounded-sm inline-flex items-center justify-center px-1.5 py-0.5">
                              {item.note}
                            </span>
                          ) : null}
                        </div>
                        <span className="text-[8px] leading-tight text-black/62">
                          {item.description}
                        </span>
                      </div>
                      <div className="flex flex-col ml-auto">
                        <span className="text-[10px]">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
