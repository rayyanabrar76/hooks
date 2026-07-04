"use client";

import { MenuDrawer } from "@/components/drawers/MenuDrawer";
import { SearchDrawer } from "@/components/drawers/SearchDrawer";
import { CartDrawer } from "@/components/drawers/CartDrawer";

/** Mounts all three slide-in panels once at the app root. */
export function Drawers() {
  return (
    <>
      <MenuDrawer />
      <SearchDrawer />
      <CartDrawer />
    </>
  );
}
