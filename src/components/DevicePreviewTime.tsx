"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const PLACEHOLDER_TIME = "-:--";
const timeTransition = { type: "spring", stiffness: 260, damping: 24 } as const;

const formatDeviceTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const displayHours = String(((hours + 11) % 12) + 1);
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${displayHours}:${minutes}`;
};

export default function DevicePreviewTime() {
  const [time, setTime] = useState(PLACEHOLDER_TIME);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setTime(formatDeviceTime());

    const now = new Date();
    const delayUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let intervalId = 0;

    const timeoutId = window.setTimeout(() => {
      setTime(formatDeviceTime());
      intervalId = window.setInterval(
        () => setTime(formatDeviceTime()),
        60_000,
      );
    }, delayUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span
      aria-live="off"
      className="inline-grid min-w-[4ch] select-none tracking-tight tabular-nums"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={time === PLACEHOLDER_TIME ? "placeholder" : "time"}
          className="col-start-1 row-start-1"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: "blur(3px)" }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, filter: "blur(3px)" }
          }
          transition={timeTransition}
        >
          {time}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
