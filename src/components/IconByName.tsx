import {
  Briefcase,
  Building,
  Dumbbell,
  Globe,
  GraduationCap,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Search,
  Server,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stethoscope,
  Store,
  Utensils,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/lib/siteContent";

const iconMap = {
  monitor: Monitor,
  smartphone: Smartphone,
  globe: Globe,
  zap: Zap,
  search: Search,
  server: Server,
  palette: Palette,
  megaphone: Megaphone,
  penTool: PenTool,
  utensils: Utensils,
  dumbbell: Dumbbell,
  stethoscope: Stethoscope,
  store: Store,
  building: Building,
  shoppingBag: ShoppingBag,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  sparkles: Sparkles,
} satisfies Record<IconName, ComponentType<{ size?: number; className?: string }>>;

export default function IconByName({
  name,
  size = 24,
}: {
  name: IconName;
  size?: number;
}) {
  const Icon = iconMap[name];
  return <Icon size={size} />;
}
