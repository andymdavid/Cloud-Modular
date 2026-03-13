"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Don't render global navigation on home-v2
  if (pathname?.startsWith("/home-v2")) {
    return null;
  }

  return <Navigation />;
}
