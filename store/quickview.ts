"use client";

import { create } from "zustand";
import type { Product } from "@/data/types";

/** Holds the product currently shown in the Quick View modal (null = closed). */
type QuickViewState = {
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
};

export const useQuickView = create<QuickViewState>((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}));
