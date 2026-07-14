import { useState } from "react";
import { categorizedItems } from "@/constants";
import DevicePreviewFrame from "@/components/DevicePreviewFrame";
import MenuEditorPreview from "@/components/MenuEditorPreview";
import MenuPreviewScreen from "@/components/MenuPreviewScreen";

export default function MenuPreviewExperience() {
  const [sections, setSections] = useState(() => categorizedItems);

  return (
    <>
      <section className="mx-auto my-28 max-w-xl space-y-6 px-6 text-center">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold leading-snug">
            Your menu is easy to change when business changes.
          </h2>
          <p className="text-[15px] font-medium text-neutral-600">
            Reorder categories, update prices, and mark items sold out in a few
            taps.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuEditorPreview sections={sections} setSections={setSections} />
        </DevicePreviewFrame>
      </section>

      <section className="mx-auto my-28 max-w-xl space-y-6 px-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold leading-snug">
            Customers always see the right menu.
          </h2>
          <p className="text-[15px] font-medium text-neutral-600">
            Give them a place to see what's available, what it costs, and how to
            order.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuPreviewScreen menuSections={sections} />
        </DevicePreviewFrame>
      </section>
    </>
  );
}
