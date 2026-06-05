"use client";

import { useState } from "react";
import { categorizedItems } from "@/constants";
import DevicePreviewFrame from "@/components/DevicePreviewFrame";
import MenuEditorPreview from "@/components/MenuEditorPreview";
import MenuPreviewScreen from "@/components/MenuPreviewScreen";

const headingStyle = { fontFamily: '"Playfair Display Variable", serif' };

export default function MenuPreviewExperience() {
  const [sections, setSections] = useState(() => categorizedItems);

  return (
    <>
      <section className="mx-auto my-28 max-w-lg space-y-6 px-6 text-center">
        <div className="space-y-2">
          <h2 className="text-lg font-bold" style={headingStyle}>
            Managing your menu should feel like this.
          </h2>
          <p>Prices, availability, order — change anything in a few taps.</p>
        </div>
        <DevicePreviewFrame>
          <MenuEditorPreview sections={sections} setSections={setSections} />
        </DevicePreviewFrame>
      </section>

      <section className="mx-auto my-28 max-w-lg space-y-6 px-6">
        <div className="text-center">
          <h2 className="text-lg font-bold" style={headingStyle}>
            Make it easy for customers to decide.
          </h2>
          <p>
            Give them a clean, mobile-ready menu with current items, prices,
            photos, and availability so they can see what looks good and know
            how to order.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuPreviewScreen menuSections={sections} />
        </DevicePreviewFrame>
      </section>
    </>
  );
}
