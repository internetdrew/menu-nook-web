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
            Your menu shouldn't be another project.
          </h2>
          <p>
            Make quick changes without turning updates into another task to
            manage.
          </p>
        </div>
        <DevicePreviewFrame>
          <MenuEditorPreview sections={sections} setSections={setSections} />
        </DevicePreviewFrame>
      </section>

      <section className="mx-auto my-28 max-w-lg space-y-6 px-6">
        <div className="text-center">
          <h2 className="text-lg font-bold" style={headingStyle}>
            What your customers see
          </h2>
          <p>A polished mobile menu that reflects your latest updates.</p>
        </div>
        <DevicePreviewFrame>
          <MenuPreviewScreen menuSections={sections} />
        </DevicePreviewFrame>
      </section>
    </>
  );
}
