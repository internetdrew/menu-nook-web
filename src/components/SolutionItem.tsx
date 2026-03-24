import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import {
  Eye,
  Pencil,
  QrCode,
  RefreshCw,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

type IconName = "pencil" | "qr-code" | "eye" | "refresh-cw";

interface CapabilityItemProps {
  icon: IconName;
  title: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  pencil: Pencil,
  "qr-code": QrCode,
  eye: Eye,
  "refresh-cw": RefreshCw,
};

export function SolutionItem({ icon, title }: CapabilityItemProps) {
  const Icon = iconMap[icon];

  return (
    <li className="mb-2">
      <Item variant="outline" size="sm" className="bg-background">
        <ItemMedia>
          <Icon className="text-foreground" size={16} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
      </Item>
    </li>
  );
}
