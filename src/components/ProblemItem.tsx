import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import {
  BadgeDollarSign,
  FileText,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

type IconName = "badge-dollar-sign" | "file-text" | "smartphone" | "search";

interface CapabilityItemProps {
  icon: IconName;
  text: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  "badge-dollar-sign": BadgeDollarSign,
  "file-text": FileText,
  smartphone: Smartphone,
  search: Search,
};

export function ProblemItem({ icon, text }: CapabilityItemProps) {
  const Icon = iconMap[icon];

  return (
    <li className="mb-2">
      <Item variant="outline" size="sm" className="bg-background">
        <ItemMedia>
          <Icon className="text-foreground" size={16} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{text}</ItemTitle>
        </ItemContent>
      </Item>
    </li>
  );
}
