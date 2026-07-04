"use client";

import { create } from "zustand";

/** Which slide-in panel (if any) is currently open. Only one at a time. */
export type DrawerId = "menu" | "search" | "cart" | null;

type UIState = {
  drawer: DrawerId;
  open: (drawer: Exclude<DrawerId, null>) => void;
  close: () => void;
  toggle: (drawer: Exclude<DrawerId, null>) => void;
};

export const useUI = create<UIState>((set) => ({
  drawer: null,
  open: (drawer) => set({ drawer }),
  close: () => set({ drawer: null }),
  toggle: (drawer) =>
    set((state) => ({ drawer: state.drawer === drawer ? null : drawer })),
}));
