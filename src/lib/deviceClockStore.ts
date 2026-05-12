import { useSyncExternalStore } from "react";

type Listener = () => void;

type DeviceClockStore = {
  intervalId: number;
  isRunning: boolean;
  listeners: Set<Listener>;
  timeoutId: number;
  time: string;
};

const globalDeviceClockStore = globalThis as typeof globalThis & {
  __menuNookDeviceClockStore?: DeviceClockStore;
};

const store =
  globalDeviceClockStore.__menuNookDeviceClockStore ??
  (globalDeviceClockStore.__menuNookDeviceClockStore = {
    intervalId: 0,
    isRunning: false,
    listeners: new Set<Listener>(),
    timeoutId: 0,
    time: "00:00",
  });

const formatDeviceTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const displayHours = String(((hours + 11) % 12) + 1).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${displayHours}:${minutes}`;
};

const emitChange = () => {
  for (const listener of store.listeners) {
    listener();
  }
};

function updateDeviceTime() {
  store.time = formatDeviceTime();
  emitChange();
}

export function startDeviceClock() {
  if (store.isRunning) return;

  store.isRunning = true;
  updateDeviceTime();

  const now = new Date();
  const delayUntilNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  store.timeoutId = window.setTimeout(() => {
    updateDeviceTime();
    store.intervalId = window.setInterval(updateDeviceTime, 60_000);
  }, delayUntilNextMinute);
}

function getDeviceTimeSnapshot() {
  return store.time;
}

function subscribe(listener: Listener) {
  store.listeners.add(listener);

  return () => {
    store.listeners.delete(listener);
  };
}

const getServerSnapshot = getDeviceTimeSnapshot;

export function useDeviceClock() {
  return useSyncExternalStore(
    subscribe,
    getDeviceTimeSnapshot,
    getServerSnapshot,
  );
}
