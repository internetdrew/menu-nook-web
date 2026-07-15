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
            Keep your menu current while you focus on your business.
          </h2>
          <p className="text-[15px] font-medium text-neutral-600">
            Update prices, availability, and categories in seconds. Your
            customers always see the latest version without creating a new menu
            or replacing your QR code.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuEditorPreview sections={sections} setSections={setSections} />
        </DevicePreviewFrame>
      </section>

      <section className="mx-auto my-28 max-w-xl space-y-6 px-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold leading-snug">
            Give customers one reliable place to find your menu.
          </h2>
          <p className="text-[15px] font-medium text-neutral-600">
            Whether they scan your QR code or tap your link, they'll always see
            what's available, what it costs, and how to order.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuPreviewScreen menuSections={sections} />
        </DevicePreviewFrame>
      </section>
    </>
  );
}
