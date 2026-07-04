"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True only after the first client render. Use to gate rendering of values that
 * come from localStorage-persisted stores (e.g. the cart badge) so the
 * server-rendered markup matches the initial client render — avoids hydration
 * mismatches without disabling SSR for the whole tree.
 *
 * Implemented with useSyncExternalStore (server snapshot `false`, client
 * snapshot `true`) so there's no effect-driven cascading render.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true, // client
    () => false, // server
  );
}
