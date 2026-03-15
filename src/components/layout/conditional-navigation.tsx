"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Don't render global navigation on the v2 homepage or its working route.
  if (pathname === "/" || pathname?.startsWith("/home-v2")) {
    return null;
  }

  return <Navigation />;
}
