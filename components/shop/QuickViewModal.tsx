"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/data/types";
import { useQuickView } from "@/store/quickview";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Renders the Quick View modal for whatever product is set in the store. */
export function QuickViewModal() {
  const product = useQuickView((s) => s.product);
  const close = useQuickView((s) => s.close);

  return (
    <AnimatePresence>
      {product && (
        <ModalShell key={product.id} product={product} onClose={close} />
      )}
    </AnimatePresence>
  );
}

function ModalShell({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const add = useCart((s) => s.add);
  const openDrawer = useUI((s) => s.open);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const soldOut = !product.inStock;
  const mrp = product.price + 200;

  // ESC to close + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function handleAdd() {
    if (soldOut) return;
    if (!size) {
      setError(true);
      return;
    }
    add(product, size);
    setAdded(true);
    openDrawer("cart");
    window.setTimeout(onClose, 700);
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close quick view"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} quick view`}
        className="relative z-10 grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-hidden bg-ink shadow-2xl sm:grid-cols-2"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-ink/80 text-ash transition-colors hover:text-signal"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative aspect-4/5 bg-white sm:aspect-auto">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-ash">
              {product.isNew ? "New Arrival" : "Best Sellers"}
            </p>
            <h2 className="font-display text-3xl leading-none tracking-wide text-bone">
              {product.name}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-ash line-through">{formatINR(mrp)}</span>
              <span className="font-semibold text-bone">
                {formatINR(product.price)}
              </span>
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-ash">
            {product.description}
          </p>

          {/* Sizes */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-ash">
                Select size
              </span>
              {error && !size && (
                <span className="text-[11px] text-signal">Pick a size</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  aria-pressed={size === s}
                  className={cn(
                    "min-w-11 border px-3 py-2 text-sm transition-colors",
                    size === s
                      ? "border-bone bg-bone text-ink"
                      : "border-hairline text-bone hover:border-bone",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut}
              className={cn(
                "flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors",
                soldOut
                  ? "cursor-not-allowed bg-elevated text-ash"
                  : "bg-bone text-ink hover:bg-black",
              )}
            >
              {added ? (
                <>
                  <Check size={18} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  {soldOut ? "Sold out" : "Add to cart"}
                </>
              )}
            </button>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="flex items-center justify-center border border-hairline px-4 py-3 text-xs font-semibold uppercase tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
            >
              View full details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
