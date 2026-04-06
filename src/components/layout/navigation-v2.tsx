"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/content/site";
import { partnerWithUsMailto } from "@/content/site";
import { cn } from "@/lib/utils";

interface NavigationV2Props {
  isLight?: boolean;
}

export function NavigationV2({ isLight = false }: NavigationV2Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const contactHref = partnerWithUsMailto;

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  // Theme-aware colors
  const textColor = isLight ? "text-[#080a0a]" : "text-white";
  const textMuted = isLight ? "text-[#080a0a]/70" : "text-white/70";
  const textDisabled = isLight ? "text-[#080a0a]/40" : "text-white/40";
  const btnBg = isLight ? "bg-white/90" : "bg-white";
  const btnText = isLight ? "text-[#080a0a]" : "text-forest";
  const btnHover = isLight ? "hover:bg-white" : "hover:bg-[#0d1212] hover:text-white";
  const hamburgerBg = isLight ? "bg-[#080a0a]" : "bg-white";

  // Glassmorphic nav styles
  const glassBg = isLight
    ? "bg-white/60"
    : "bg-[#0d1212]/75";
  const mobileBg = isLight
    ? "bg-white/80"
    : "bg-[#0d1212]/90";
  const mobileOverlayBg = isLight
    ? "bg-[rgba(247,248,248,0.96)]"
    : "bg-[rgba(1,1,1,0.96)]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Transparent header container */}
      <div className="pointer-events-auto py-4 px-4 sm:px-6">
        {/* Glassmorphic nav bar */}
        <div className={cn(
          "relative isolate mx-auto flex h-[44px] max-w-5xl items-center overflow-hidden rounded-[2px] pl-5 pr-[8px]",
        )}>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 border backdrop-blur-xl",
              glassBg,
              isLight ? "border-white/20" : "border-white/[0.04]"
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              isLight ? "bg-white/8" : "bg-[#0b0f0f]/45"
            )}
            aria-hidden
          />
          {/* Left: Menu - 11px font */}
          <nav
            className={cn("relative z-10 hidden flex-1 items-center gap-6 text-[11px] font-medium md:flex", textMuted)}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
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

          {/* Center: Logo - scaled down 25% total */}
          <Link href="/" className="absolute left-1/2 z-10 flex shrink-0 -translate-x-1/2 items-center" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Cloud Modular"
              width={108}
              height={108}
              className={cn(isLight && "invert")}
            />
          </Link>

          {/* Right: CTA Button */}
          <div className="relative z-10 flex flex-1 items-center justify-end gap-4">
            {/* Button: 16px horizontal padding, 6px vertical padding, 11px font, 2px radius */}
            <Link
              href={contactHref}
              className={cn("hidden px-[16px] py-[6px] text-[11px] font-semibold rounded-[2px] transition md:inline-flex", btnBg, btnText, btnHover)}
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
          "pointer-events-auto fixed inset-0 md:hidden transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className={cn("absolute inset-0 backdrop-blur-xl", mobileOverlayBg)} />
        <div className="relative flex h-full flex-col p-4 sm:p-6">
          <nav
            className={cn(
              "flex flex-1 flex-col rounded-[2px] border p-6 text-[16px] font-medium",
              mobileBg,
              isLight ? "border-white/20" : "border-white/[0.04]",
            )}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
                <Image
                  src="/logo.png"
                  alt="Cloud Modular"
                  width={108}
                  height={108}
                  className={cn("h-auto w-[108px]", isLight && "invert")}
                />
              </Link>
              <button
                type="button"
                className={cn("flex h-10 w-10 items-center justify-center", textColor)}
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <span className="sr-only">Close</span>
                <span className="absolute h-0.5 w-8 rotate-45 bg-current" />
                <span className="absolute h-0.5 w-8 -rotate-45 bg-current" />
              </button>
            </div>
            <div className="space-y-8 pt-10">
              {navLinks.map((link) => {
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
            </div>
            <div className="mt-auto pt-8">
              <Link
                href={contactHref}
                className={cn(
                  "inline-flex h-[30px] w-full items-center justify-center rounded-[2px] px-[16px] py-[6px] text-center text-[11px] font-semibold transition",
                  btnBg,
                  btnText,
                  btnHover,
                )}
                onClick={closeMenu}
              >
                Partner With Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
