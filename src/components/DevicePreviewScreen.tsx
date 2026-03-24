import { useMemo } from "react";
import { categorizedItems } from "@/constants";

export default function DevicePreviewScreen() {
  const categoryNames = useMemo(
    () => categorizedItems.map((set) => set.category.name),
    [],
  );

  return (
    <div className="relative h-full overflow-hidden bg-[#f4f4f0]">
      <div className="device-preview-scroll h-full overflow-y-auto no-scrollbar">
        <div className="mb-4 p-4 text-center">
          <h3 className="text-lg font-medium">Sunny Market Cafe</h3>
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

              <div className="space-y-3 px-4">
                {set.items.map((item) => (
                  <div key={`${set.category.name}-${item.name}`}>
                    <div className="mb-1 flex items-center justify-between gap-6">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{item.name}</span>
                        {item.note && (
                          <span className="inline-flex rounded-full bg-black/6 px-1.5 py-0.5 text-[8px] font-medium text-black/70">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <span className="text-xs">{item.price}</span>
                    </div>

                    <p className="max-w-3/4 text-[10px] leading-tight text-black/62">
                      {item.description}
                    </p>
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
