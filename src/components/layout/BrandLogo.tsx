"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/SiteContentProvider";

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
  const { content } = useSiteContent();
  const src = compact
    ? content.brand.mark || "/yj-mark.svg"
    : content.brand.logo || "/yj-logo.svg";
  const alt = content.brand.name || "YJ DEVELOPERS";
  const isExternal = /^https?:\/\//i.test(src) || src.startsWith("data:");

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {isExternal ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            compact ? "h-10 w-10" : "h-12 w-auto",
            "shrink-0 object-contain",
            imageClassName
          )}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={compact ? 48 : 520}
          height={compact ? 48 : 180}
          priority={compact}
          className={cn(
            compact ? "h-10 w-10" : "h-12 w-auto",
            "shrink-0 object-contain",
            imageClassName
          )}
        />
      )}
    </span>
  );
}
