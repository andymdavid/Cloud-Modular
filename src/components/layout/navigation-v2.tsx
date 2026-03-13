"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

interface NavigationV2Props {
  isLight?: boolean;
}

export function NavigationV2({ isLight = false }: NavigationV2Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const contactHref = "/partner-with-us#contact";

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  // Theme-aware colors
  const textColor = isLight ? "text-[#080a0a]" : "text-white";
  const textMuted = isLight ? "text-[#080a0a]/70" : "text-white/70";
  const textDisabled = isLight ? "text-[#080a0a]/40" : "text-white/40";
  const btnBg = isLight ? "bg-white/90" : "bg-white";
  const btnText = isLight ? "text-[#080a0a]" : "text-forest";
  const btnHover = isLight ? "hover:bg-white" : "hover:bg-warm-white";
  const hamburgerBg = isLight ? "bg-[#080a0a]" : "bg-white";

  // Glassmorphic nav styles
  const glassBg = isLight
    ? "bg-white/60"
    : "bg-[#0d1212]/75";
  const mobileBg = isLight
    ? "bg-white/80"
    : "bg-[#0d1212]/90";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Transparent header container */}
      <div className="pointer-events-auto py-4 px-4 sm:px-6">
        {/* Glassmorphic nav bar */}
        <div className={cn(
          "relative mx-auto flex h-14 max-w-5xl items-center px-5 border backdrop-blur-xl shadow-lg",
          glassBg,
          isLight ? "border-white/20" : "border-white/[0.04]"
        )}>
          {/* Left: Menu - 11px font */}
          <nav
            className={cn("hidden md:flex flex-1 items-center gap-6 text-[11px] font-medium", textMuted)}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isDisabled = link.label === "Projects" || link.label === "What We Do";

              if (isDisabled) {
                return (
                  <span
                    key={link.href}
                    className={cn(textDisabled, "cursor-not-allowed")}
                  >
                    {link.label}
                  </span>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors",
                    isActive(link.href)
                      ? textColor
                      : cn(textMuted, isLight ? "hover:text-[#080a0a]" : "hover:text-white"),
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center: Logo - scaled down 15% */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Cloud Modular"
              width={120}
              height={120}
              className={cn(isLight && "invert")}
            />
          </Link>

          {/* Right: CTA Button */}
          <div className="flex flex-1 items-center justify-end gap-4">
            {/* Button: 16px horizontal padding, 6px vertical padding, 11px font */}
            <Link
              href={contactHref}
              className={cn("hidden px-[16px] py-[6px] text-[11px] font-semibold transition md:inline-flex", btnBg, btnText, btnHover)}
            >
              Partner With Us
            </Link>
            <button
              type="button"
              className="md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex h-10 w-10 flex-col items-center justify-center gap-1.5">
                <span
                  className={cn(
                    "h-0.5 w-6 transition",
                    hamburgerBg,
                    open && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 transition",
                    hamburgerBg,
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-6 transition",
                    hamburgerBg,
                    open && "-translate-y-2 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      <div
        className={cn(
          "pointer-events-auto mx-4 sm:mx-6 backdrop-blur-xl md:hidden transition-all duration-300 overflow-hidden mt-2",
          mobileBg,
          open ? cn("max-h-96 px-5 pb-6 pt-4 shadow-lg", isLight ? "border border-white/20" : "border border-white/[0.04]") : "max-h-0",
        )}
      >
        <nav className={cn("space-y-4 text-base font-medium", textMuted)} aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isDisabled = link.label === "Projects" || link.label === "What We Do";

            if (isDisabled) {
              return (
                <span
                  key={link.href}
                  className={cn("block cursor-not-allowed", textDisabled)}
                >
                  {link.label}
                </span>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block",
                  isActive(link.href)
                    ? textColor
                    : cn(textMuted, isLight ? "hover:text-[#080a0a]" : "hover:text-white"),
                )}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={contactHref}
            className={cn("inline-flex w-full items-center justify-center px-6 py-3 text-center text-base font-semibold", btnBg, btnText)}
            onClick={closeMenu}
          >
            Partner With Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
