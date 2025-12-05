"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const contactHref = "/partner-with-us#contact";

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <Image src="/Logo.png" alt="Cloud Modular" width={140} height={140} />
          </Link>
          <nav
            className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-white/70 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors",
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/60 hover:text-white",
              )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href={contactHref}
              className="hidden rounded-sm bg-white px-5 py-2 text-sm font-semibold text-forest transition hover:bg-warm-white md:inline-flex"
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
                    "h-0.5 w-7 bg-white transition",
                    open && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-7 bg-white transition",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-7 bg-white transition",
                    open && "-translate-y-2 -rotate-45",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-auto border-b border-white/5 bg-[#0a0a0a]/90 px-4 pb-6 pt-4 shadow-subtle backdrop-blur-md md:hidden",
          open ? "max-h-96" : "max-h-0 overflow-hidden",
        )}
      >
        <nav className="space-y-4 text-base font-medium text-white/80" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white",
              )}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="inline-flex w-full items-center justify-center rounded-sm bg-white px-6 py-3 text-center text-base font-semibold text-forest"
            onClick={closeMenu}
          >
            Partner With Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
