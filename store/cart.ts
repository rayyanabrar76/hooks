"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

/** A single cart line — a product in a specific size. */
export type CartItem = {
  /** Stable line key: `${slug}::${size}`. */
  key: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  qty: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  add: (product: Product, size: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const lineKey = (slug: string, size: string) => `${slug}::${size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (product, size, qty = 1) =>
        set((state) => {
          const key = lineKey(product.slug, size);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                key,
                slug: product.slug,
                name: product.name,
                price: product.price,
                size,
                qty,
                image: product.images[0],
              },
            ],
          };
        }),

      remove: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      setQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "hooks-cart",
      // Only persist the line items, not the action functions.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/* --- Derived selectors (call with the store) ----------------------- */

export const selectCount = (s: CartState) =>
  s.items.reduce((n, i) => n + i.qty, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.qty, 0);
