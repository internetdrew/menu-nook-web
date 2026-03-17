import { useRef } from "react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { GaugeIcon, type GaugeIconHandle } from "./motion-icons/GaugeIcon";
import {
  MessageCircleCheckIcon,
  type MessageCircleCheckIconHandle,
} from "./motion-icons/MessageCircleCheckIcon";
import {
  ClipboardCheckIcon,
  type ClipboardCheckIconHandle,
} from "./motion-icons/ClipboardCheckIcon";
import {
  HandHelpingIcon,
  type HandHelpingIconHandle,
} from "./motion-icons/HandHelpingIcon";

type IconName = "gauge" | "message-check" | "clipboard-check" | "hand-helping";

type AnimatableIconHandle =
  | GaugeIconHandle
  | MessageCircleCheckIconHandle
  | ClipboardCheckIconHandle
  | HandHelpingIconHandle;

interface CapabilityItemProps {
  icon: IconName;
  title: string;
}

function CapabilityIcon({
  icon,
  iconRef,
}: {
  icon: IconName;
  iconRef: React.RefObject<AnimatableIconHandle | null>;
}) {
  switch (icon) {
    case "gauge":
      return <GaugeIcon ref={iconRef} className="text-foreground" size={16} />;
    case "message-check":
      return (
        <MessageCircleCheckIcon
          ref={iconRef}
          className="text-foreground"
          size={16}
        />
      );
    case "clipboard-check":
      return (
        <ClipboardCheckIcon
          ref={iconRef}
          className="text-foreground"
          size={16}
        />
      );

    case "hand-helping":
      return (
        <HandHelpingIcon ref={iconRef} className="text-foreground" size={16} />
      );
  }
}

export function SolutionItem({ icon, title }: CapabilityItemProps) {
  const iconRef = useRef<AnimatableIconHandle | null>(null);

  return (
    <li className="mb-2">
      <Item
        variant="outline"
        size="sm"
        className="bg-background"
        onPointerEnter={() => iconRef.current?.startAnimation()}
        onPointerLeave={() => {
          if (icon === "gauge") {
            iconRef.current?.stopAnimation();
          }
        }}
      >
        <ItemMedia>
          <CapabilityIcon icon={icon} iconRef={iconRef} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
      </Item>
    </li>
  );
}
