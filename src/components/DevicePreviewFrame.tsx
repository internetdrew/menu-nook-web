"use client";

import type { ReactNode } from "react";
import DevicePreviewTime from "@/components/DevicePreviewTime";

type DevicePreviewFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function DevicePreviewFrame({
  children,
  className = "",
}: DevicePreviewFrameProps) {
  return (
    <div
      className={`relative mx-auto flex h-160 w-86.25 flex-col overflow-hidden rounded-3xl border-[3px] border-black bg-[#f4f4f0] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className="flex h-8 items-center justify-between border-b bg-white px-3 font-mono text-[11.5px]">
        <div className="flex items-center gap-1">
          <DevicePreviewTime />
          <svg
            aria-hidden="true"
            className="size-2.5 fill-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.27 5.27A2 2 0 0 1 12 4a6 6 0 0 1 6 6v3.5l1.7 2.55A1 1 0 0 1 18.87 17H17" />
            <path d="M6.33 8.33A5.98 5.98 0 0 0 6 10v3.5l-1.7 2.55A1 1 0 0 0 5.13 17H15" />
            <path d="M10 20a2 2 0 0 0 4 0" />
            <path d="m2 2 20 20" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 20h.01" />
            <path d="M7 20v-4" />
            <path d="M12 20v-8" />
            <path d="M17 20V8" />
            <path d="M22 4v16" />
          </svg>
          <svg
            aria-hidden="true"
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h.01" />
            <path d="M2 8.82a15 15 0 0 1 20 0" />
            <path d="M5 12.86a10 10 0 0 1 14 0" />
            <path d="M8.5 16.43a5 5 0 0 1 7 0" />
          </svg>
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className="stroke-green-500" d="m11 7-3 5h4l-3 5" />
            <path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" />
            <path d="M22 14v-4" />
            <path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" />
          </svg>
        </div>
      </div>

      <div className="device-preview flex-1 overflow-hidden">{children}</div>

      <div className="flex items-center justify-around border-t bg-white py-3">
        <svg
          aria-hidden="true"
          className="size-5 text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <svg
          aria-hidden="true"
          className="size-5 text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        <svg
          aria-hidden="true"
          className="size-5 text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
        <svg
          aria-hidden="true"
          className="size-5 text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
        <svg
          aria-hidden="true"
          className="size-5 text-neutral-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>
    </div>
  );
}
