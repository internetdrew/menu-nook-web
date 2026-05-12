import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BellOff,
  CirclePlus,
  Ellipsis,
  SignalHigh,
  Square,
} from "lucide-react";

type DevicePreviewScreenProps = {
  children: ReactNode;
  className?: string;
};

export default function DevicePreviewScreen({
  children,
  className = "",
}: DevicePreviewScreenProps) {
  const time = useDeviceTime();

  return (
    <div
      className={`relative mx-auto flex h-160 w-xs flex-col overflow-hidden rounded-2xl border-[3px] border-black bg-[#f4f4f0] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className="flex h-6 items-center justify-between border-b bg-white px-3 font-mono text-[11px]">
        <div className="flex items-center gap-1">
          <span aria-live="off" className="tracking-tight select-none">
            {time}
          </span>
          <BellOff className="size-2.5 fill-black" />
        </div>
        <SignalHigh className="size-5" />
      </div>

      <div className="device-preview flex-1 overflow-hidden">{children}</div>

      <div className="flex items-center justify-around border-t bg-white py-3">
        <ArrowLeft className="size-4 text-neutral-500" />
        <ArrowRight className="size-4 text-neutral-500" />
        <CirclePlus className="size-4 text-neutral-500" />
        <Square className="size-4 text-neutral-500" />
        <Ellipsis className="size-4 text-neutral-500" />
      </div>
    </div>
  );
}

function useDeviceTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    let intervalId = 0;
    let timeoutId = 0;

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const displayHours = ((hours + 11) % 12) + 1;
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${displayHours}:${minutes}`);
    };

    updateTime();

    const now = new Date();
    const delayUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeoutId = window.setTimeout(() => {
      updateTime();
      intervalId = window.setInterval(updateTime, 60_000);
    }, delayUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}
