"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Routes that render as a bare, full-bleed landing — no navbar/footer chrome.
const BARE_ROUTES = new Set(["/"]);

/** Site navbar, hidden on bare landing routes (e.g. the homepage splash). */
export function SiteHeader() {
  const pathname = usePathname();
  if (BARE_ROUTES.has(pathname)) return null;
  return <Navbar />;
}

/** Site footer, hidden on bare landing routes. */
export function SiteFooter() {
  const pathname = usePathname();
  if (BARE_ROUTES.has(pathname)) return null;
  return <Footer />;
}
