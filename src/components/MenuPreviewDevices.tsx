import DevicePreviewFrame from "@/components/DevicePreviewFrame";
import MenuEditorPreview from "@/components/MenuEditorPreview";
import MenuPreviewScreen from "@/components/MenuPreviewScreen";
import { useMenuPreviewSections } from "@/components/menuPreviewStore";

export function MenuEditorPreviewDevice() {
  const [sections, setSections] = useMenuPreviewSections();

  return (
    <DevicePreviewFrame>
      <MenuEditorPreview sections={sections} setSections={setSections} />
    </DevicePreviewFrame>
  );
}

export function MenuCustomerPreviewDevice() {
  const [sections] = useMenuPreviewSections();

  return (
    <DevicePreviewFrame>
      <MenuPreviewScreen menuSections={sections} />
    </DevicePreviewFrame>
  );
}
