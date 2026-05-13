import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  compact?: boolean;
};

export default function BrandLogo({
  className,
  imageClassName,
  compact = false,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={compact ? "/yj-mark.svg" : "/yj-logo.svg"}
        alt="YJ Developers"
        width={compact ? 48 : 520}
        height={compact ? 48 : 180}
        priority={compact}
        className={cn(
          compact ? "h-10 w-10" : "h-12 w-auto",
          "shrink-0 object-contain",
          imageClassName
        )}
      />
    </span>
  );
}
