import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  BatteryCharging,
  BellOff,
  CirclePlus,
  Ellipsis,
  SignalHigh,
  Square,
  Wifi,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { startDeviceClock, useDeviceClock } from "@/lib/deviceClockStore";

type DevicePreviewScreenProps = {
  children: ReactNode;
  className?: string;
};

export default function DevicePreviewScreen({
  children,
  className = "",
}: DevicePreviewScreenProps) {
  const hasAnimatedRealTime = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const time = useDeviceClock();
  const shouldAnimateTime =
    time !== "--:--" && !hasAnimatedRealTime.current && !shouldReduceMotion;

  useEffect(() => {
    startDeviceClock();
  }, []);

  useEffect(() => {
    if (time !== "--:--") {
      hasAnimatedRealTime.current = true;
    }
  }, [time]);

  return (
    <div
      className={`relative mx-auto flex h-160 w-86.25 flex-col overflow-hidden rounded-3xl border-[3px] border-black bg-[#f4f4f0] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className="flex h-8 items-center justify-between border-b bg-white px-3 font-mono text-[11.5px]">
        <div className="flex items-center gap-1">
          <motion.span
            key={shouldAnimateTime ? "real-time" : "device-time"}
            initial={shouldAnimateTime ? { opacity: 0, y: 2 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.215, 0.61, 0.355, 1] }}
            aria-live="off"
            className="inline-block min-w-[4ch] tracking-tight tabular-nums select-none"
          >
            {time}
          </motion.span>
          <BellOff className="size-2.5 fill-black" />
        </div>
        <div className="flex items-center gap-1.5">
          <SignalHigh className="size-4" />
          <Wifi className="size-3.5" />
          <BatteryCharging className="size-4 fill-green-400" />
        </div>
      </div>

      <div className="device-preview flex-1 overflow-hidden">{children}</div>

      <div className="flex items-center justify-around border-t bg-white py-3">
        <ArrowLeft className="size-5 text-neutral-500" />
        <ArrowRight className="size-5 text-neutral-500" />
        <CirclePlus className="size-5 text-neutral-500" />
        <Square className="size-5 text-neutral-500" />
        <Ellipsis className="size-5 text-neutral-500" />
      </div>
    </div>
  );
}
