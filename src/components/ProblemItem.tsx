import { useRef, useState } from "react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FilePenLineIcon } from "@/components/motion-icons/FilePenLineIcon";
import type { FilePenLineIconHandle } from "@/components/motion-icons/FilePenLineIcon";
import { HourglassIcon } from "@/components/motion-icons/HourglassIcon";
import type { HourglassIconHandle } from "@/components/motion-icons/HourglassIcon";
import { MessageCircleMoreIcon } from "@/components/motion-icons/MessageCircleMoreIcon";
import type { MessageCircleMoreIconHandle } from "@/components/motion-icons/MessageCircleMoreIcon";
import { ScanTextIcon } from "@/components/motion-icons/ScanTextIcon";
import type { ScanTextIconHandle } from "@/components/motion-icons/ScanTextIcon";

type IconName = "hourglass" | "message" | "file-pen" | "scan-text";

type AnimatableIconHandle =
  | HourglassIconHandle
  | MessageCircleMoreIconHandle
  | FilePenLineIconHandle
  | ScanTextIconHandle;

interface CapabilityItemProps {
  icon: IconName;
  text: string;
}

function CapabilityIcon({
  icon,
  iconRef,
}: {
  icon: IconName;
  iconRef: React.RefObject<AnimatableIconHandle | null>;
}) {
  switch (icon) {
    case "hourglass":
      return (
        <HourglassIcon ref={iconRef} className="text-foreground" size={16} />
      );
    case "message":
      return (
        <MessageCircleMoreIcon
          ref={iconRef}
          className="text-foreground"
          size={16}
        />
      );
    case "file-pen":
      return (
        <FilePenLineIcon ref={iconRef} className="text-foreground" size={16} />
      );
    case "scan-text":
      return (
        <ScanTextIcon ref={iconRef} className="text-foreground" size={16} />
      );
  }
}

export function ProblemItem({ icon, text }: CapabilityItemProps) {
  const iconRef = useRef<AnimatableIconHandle | null>(null);

  return (
    <li className="mb-2">
      <Item
        variant="outline"
        size="sm"
        className="bg-background"
        onPointerEnter={() => iconRef.current?.startAnimation()}
      >
        <ItemMedia>
          <CapabilityIcon icon={icon} iconRef={iconRef} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{text}</ItemTitle>
        </ItemContent>
      </Item>
    </li>
  );
}
