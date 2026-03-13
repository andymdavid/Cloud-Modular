"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AdvantageCardProps {
  image: string;
  label: string;
  title: string;
  content: string[];
  isLight?: boolean;
}

export function AdvantageCard({ image, label, title, content, isLight = false }: AdvantageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const bgExpanded = isLight ? "#ffffff" : "#0f1111";
  const bgCollapsed = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
  const borderColor = isLight ? "border-black/10" : "border-white/5";
  const textPrimary = isLight ? "text-[#080a0a]" : "text-white";
  const textSecondary = isLight ? "text-[#080a0a]/60" : "text-[#8e939c]";
  const textMuted = isLight ? "text-[#080a0a]/60" : "text-white/60";
  const btnBorder = isLight ? "border-black/20" : "border-white/20";
  const btnBg = isLight ? "bg-black/10" : "bg-white/10";
  const btnHoverBg = isLight ? "group-hover:bg-black/30" : "group-hover:bg-white/30";
  const btnHoverBorder = isLight ? "group-hover:border-black/40" : "group-hover:border-white/40";

  return (
    <div
      className={cn("group relative min-w-[362px] max-w-[362px] h-[500px] rounded-[24px] border overflow-hidden cursor-pointer", borderColor)}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        backgroundColor: isExpanded ? bgExpanded : bgCollapsed,
      }}
    >
      {!isExpanded && (
        <>
          <Image
            src={image}
            alt={label}
            fill
            className={cn("object-cover transition-all duration-300", isLight ? "brightness-90 group-hover:brightness-100" : "brightness-50 group-hover:brightness-[0.65]")}
          />
          <div className={cn("absolute inset-0", isLight ? "bg-gradient-to-t from-white/80 via-white/20 to-transparent" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent")}></div>
        </>
      )}

      {isExpanded && (
        <div className="p-6 pt-8">
          <div className="space-y-2">
            {content.map((line, index) => (
              <p
                key={index}
                className={cn(
                  "hero-heading text-[17px] md:text-[21px]",
                  index === 0 ? textPrimary : textSecondary
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-xs font-medium uppercase tracking-wider", textMuted)}>
            {label}
          </p>
          <h3 className={cn("mt-1 text-lg font-semibold whitespace-nowrap", textPrimary)}>
            {title}
          </h3>
        </div>
        <button className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300", btnBorder, btnBg, btnHoverBg, btnHoverBorder, textPrimary)}>
          <span className="text-sm leading-none flex items-center justify-center">&gt;</span>
        </button>
      </div>
    </div>
  );
}
