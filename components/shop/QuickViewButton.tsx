"use client";

import type { Product } from "@/data/types";
import { useQuickView } from "@/store/quickview";

/**
 * Hover overlay on a shop card: shows the product's sizes and a clickable
 * "Quick View" trigger. Only interactive while hovered; the click opens the
 * Quick View modal instead of navigating to the product page.
 */
export function QuickViewButton({ product }: { product: Product }) {
  const open = useQuickView((s) => s.open);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-white/85 px-2 py-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
      <div className="flex flex-wrap justify-center gap-1.5">
        {product.sizes.map((s) => (
          <span
            key={s}
            className="min-w-8 border border-black/15 px-2 py-1 text-center text-[10px] font-medium text-black"
          >
            {s}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          open(product);
        }}
        className="pointer-events-none text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:text-signal group-hover:pointer-events-auto"
      >
        Quick View
      </button>
    </div>
  );
}
