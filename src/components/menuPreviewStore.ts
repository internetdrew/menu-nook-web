import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { categorizedItems, type MenuCategory } from "@/constants";

let currentSections = categorizedItems;
const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export function useMenuPreviewSections() {
  const [sections, setLocalSections] =
    useState<MenuCategory[]>(currentSections);

  useEffect(() => {
    setLocalSections(currentSections);

    return subscribe(() => {
      setLocalSections(currentSections);
    });
  }, []);

  const setSections = useCallback(
    (nextSections: SetStateAction<MenuCategory[]>) => {
      currentSections =
        typeof nextSections === "function"
          ? nextSections(currentSections)
          : nextSections;
      emitChange();
    },
    [],
  );

  return [sections, setSections] as const;
}
