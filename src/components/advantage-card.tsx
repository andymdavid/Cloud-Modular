import Image from "next/image";
import { cn } from "@/lib/utils";

interface AdvantageCardProps {
  image: string;
  label: string;
  title: string;
  content: string[];
  isLight?: boolean;
  compact?: boolean;
  cornerRadius?: string;
  imageClassName?: string;
  overlayClassName?: string;
  disableHover?: boolean;
  footerClassName?: string;
  hideAction?: boolean;
}

export function AdvantageCard({
  image,
  label,
  title,
  content,
  isLight = false,
  compact = false,
  cornerRadius,
  imageClassName,
  overlayClassName,
  disableHover = false,
  footerClassName,
  hideAction = false,
}: AdvantageCardProps) {
  const bgCollapsed = isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
  const borderColor = isLight ? "border-black/10" : "border-white/5";
  const textPrimary = isLight ? "text-[#080a0a]" : "text-white";
  const textSecondary = isLight ? "text-[#080a0a]/60" : "text-[#8e939c]";
  const btnBorder = isLight ? "border-black/20" : "border-white/20";
  const btnBg = isLight ? "bg-black/10" : "bg-white/10";
  const btnHoverBg = isLight ? "group-hover:bg-black/30" : "group-hover:bg-white/30";
  const btnHoverBorder = isLight ? "group-hover:border-black/40" : "group-hover:border-white/40";

  const cardWidth = compact ? "min-w-[262px] max-w-[262px]" : "min-w-[362px] max-w-[362px]";
  const cardHeight = compact ? "h-[361px]" : "h-[500px]";
  const cardRadius = cornerRadius ?? (compact ? "rounded-[3px]" : "rounded-[24px]");

  return (
    <div
      className={cn("group relative border overflow-hidden", disableHover ? "cursor-default" : "cursor-pointer", cardWidth, cardHeight, cardRadius, borderColor)}
      style={{
        backgroundColor: bgCollapsed,
      }}
    >
      <Image
        src={image}
        alt={label}
        fill
        className={cn(
          "object-cover transition-all duration-300",
          isLight
            ? disableHover
              ? "brightness-90"
              : "brightness-90 group-hover:brightness-100"
            : disableHover
              ? "brightness-50"
              : "brightness-50 group-hover:brightness-[0.65]",
          imageClassName
        )}
      />
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          !disableHover && "group-hover:opacity-0",
          isLight ? "bg-gradient-to-t from-white/80 via-white/20 to-transparent" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
          overlayClassName
        )}
      ></div>

      <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300", !disableHover && "group-hover:opacity-100", isLight ? "bg-white" : "bg-[#0f1111]")}>
        <div className={cn(compact ? "p-5 pt-6" : "p-6 pt-8")}>
          <div className="space-y-2">
            {content.map((line, index) => (
              <p
                key={index}
                className={cn(
                  compact ? "font-sans text-[12px] leading-[17px] md:text-[13px] md:leading-[18px]" : "hero-heading text-[17px] md:text-[21px]",
                  index === 0 ? textPrimary : textSecondary
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {!hideAction && (
        <button
          className={cn(
            "absolute right-5 top-5 z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300",
            !disableHover && "group-hover:opacity-0",
            compact ? "right-4 top-4" : "right-5 top-5",
            btnBorder,
            btnBg,
            btnHoverBg,
            btnHoverBorder,
            textPrimary
          )}
        >
          <span className="text-sm leading-none flex items-center justify-center">&gt;</span>
        </button>
      )}

      <div className={cn("absolute bottom-0 left-0 right-0 z-10", compact ? "p-5" : "p-6", footerClassName)}>
        <h3 className={cn(compact ? "mt-1 text-base font-semibold whitespace-nowrap" : "mt-1 text-lg font-semibold whitespace-nowrap", textPrimary)}>
          {title}
        </h3>
      </div>
    </div>
  );
}
