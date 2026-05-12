import { useSyncExternalStore } from "react";
import { categorizedItems, type MenuCategory } from "@/constants";

type Listener = () => void;

type MenuPreviewStore = {
  state: MenuCategory[];
  listeners: Set<Listener>;
};

const globalMenuPreviewStore = globalThis as typeof globalThis & {
  __menuNookPreviewStore?: MenuPreviewStore;
};

const store =
  globalMenuPreviewStore.__menuNookPreviewStore ??
  (globalMenuPreviewStore.__menuNookPreviewStore = {
    state: categorizedItems,
    listeners: new Set<Listener>(),
  });

const emitChange = () => {
  for (const listener of store.listeners) {
    listener();
  }
};

export function getMenuPreviewState() {
  return store.state;
}

export function setMenuPreviewState(nextState: MenuCategory[]) {
  store.state = nextState;
  emitChange();
}

function subscribe(listener: Listener) {
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
}

const getServerSnapshot = getMenuPreviewState;

export function useMenuPreviewState() {
  return useSyncExternalStore(
    subscribe,
    getMenuPreviewState,
    getServerSnapshot,
  );
}
