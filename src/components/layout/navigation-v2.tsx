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
    : "bg-[#1a1a1a]/70";
  const glassBorder = isLight
    ? "border-white/30"
    : "border-white/[0.08]";
  const mobileBg = isLight
    ? "bg-white/80"
    : "bg-[#1a1a1a]/90";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Transparent header container */}
      <div className="pointer-events-auto py-4 px-4 sm:px-6">
        {/* Glassmorphic nav bar */}
        <div className={cn(
          "mx-auto flex h-14 max-w-5xl items-center gap-4 px-5 rounded-full border backdrop-blur-xl shadow-lg",
          glassBg,
          glassBorder
        )}>
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Cloud Modular"
              width={140}
              height={140}
              className={cn(isLight && "invert")}
            />
          </Link>
          <nav
            className={cn("hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium", textMuted)}
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
          <div className="ml-auto flex items-center gap-4">
            <Link
              href={contactHref}
              className={cn("hidden rounded-full px-5 py-2 text-sm font-semibold transition md:inline-flex", btnBg, btnText, btnHover)}
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
          "pointer-events-auto mx-4 sm:mx-6 rounded-2xl backdrop-blur-xl md:hidden transition-all duration-300 overflow-hidden mt-2",
          mobileBg,
          glassBorder,
          open ? "max-h-96 px-5 pb-6 pt-4 border shadow-lg" : "max-h-0 border-transparent",
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
            className={cn("inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-center text-base font-semibold", btnBg, btnText)}
            onClick={closeMenu}
          >
            Partner With Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
