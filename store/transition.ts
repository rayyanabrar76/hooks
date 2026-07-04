"use client";

import { create } from "zustand";

/** Screen coordinate the star wipe should bloom from (the click point). */
export type Origin = { x: number; y: number };

type TransitionState = {
  /** A queued navigation to play the star wipe for, or null when idle. */
  pending: { href: string; origin: Origin } | null;
  /** Queue a star-wipe navigation. The <StarWipe/> overlay drives the rest. */
  start: (href: string, origin: Origin) => void;
  /** Clear the queue once the wipe (and navigation) have completed. */
  clear: () => void;
};

/**
 * Coordinates the brand "star wipe" page transition. A trigger (e.g. the hero
 * CTA) sets `pending`; the persistent <StarWipe/> overlay in the root layout
 * watches it, plays the cover → navigate → reveal sequence, then clears.
 */
export const useTransition = create<TransitionState>((set) => ({
  pending: null,
  start: (href, origin) => set({ pending: { href, origin } }),
  clear: () => set({ pending: null }),
}));
