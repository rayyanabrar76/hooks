"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BadgeIndianRupee,
  Check,
  Minus,
  Plus,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import type { Product } from "@/data/types";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";
import { SizeGuideModal } from "./SizeGuideModal";

/**
 * Product buy box: badges, rating, compare-at + sale price with savings, size
 * guide, size chips, a quantity stepper, Add to bag / Buy now, a reassurance
 * strip and the details. Size is required before either action.
 */
export function ProductPurchase({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openDrawer = useUI((s) => s.open);
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const soldOut = !product.inStock;
  const mrp = product.price + 200;
  const savings = mrp - product.price;
  const percentOff = Math.round((savings / mrp) * 100);
  // Deterministic social proof so server and client markup agree (no Math.random).
  const reviewCount = 60 + (product.price % 140);

  function requireSize(): boolean {
    if (!size) {
      setError(true);
      return false;
    }
    return true;
  }

  function handleAdd() {
    if (soldOut || !requireSize() || !size) return;
    add(product, size, qty);
    setAdded(true);
    openDrawer("cart");
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    if (soldOut || !requireSize() || !size) return;
    add(product, size, qty);
    router.push("/checkout");
  }

  // Editorial selling points derived from the copy.
  const features = [
    "Premium heavyweight denim",
    "Relaxed wide-leg fit, clean high rise",
    "Hem built to stack over footwear",
  ];

  return (
    <div className="flex flex-col">
      {/* Badges */}
      {(product.isNew || product.featured) && (
        <div className="mb-3 flex flex-wrap gap-2">
          {product.isNew && (
            <span className="bg-bone px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
              New
            </span>
          )}
          {product.featured && (
            <span className="bg-signal px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-on-accent">
              Featured
            </span>
          )}
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={15} className="fill-current" />
          ))}
        </div>
        <span className="text-sm font-medium text-bone">4.9</span>
        <span className="text-sm text-ash">({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-2xl font-bold text-bone">
          {formatINR(product.price)}
        </span>
        <span className="text-base text-ash line-through">
          {formatINR(mrp)}
        </span>
        <span className="bg-signal/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-signal">
          Save {formatINR(savings)} · {percentOff}% off
        </span>
      </div>
      <p className="mt-1 text-xs text-ash">Inclusive of all taxes</p>

      {/* Category */}
      {categoryName && (
        <p className="mt-4 text-xs uppercase tracking-wide text-ash">
          Category:{" "}
          <span className="font-semibold text-bone">{categoryName}</span>
        </p>
      )}

      {/* Size guide */}
      <button
        type="button"
        onClick={() => setGuideOpen(true)}
        className="mt-5 flex w-max items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-signal"
      >
        <span className="grid size-7 place-items-center rounded bg-bone text-ink">
          <Ruler size={15} />
        </span>
        <span className="underline underline-offset-4">Size Guide</span>
      </button>

      {/* Size selector */}
      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-ash">
            Select size <span className="text-signal">*</span>
          </span>
          {error && !size && (
            <span className="text-xs text-signal">— pick a size</span>
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
                "grid h-11 min-w-11 place-items-center border px-3 text-sm font-medium uppercase tracking-wide transition-colors",
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

      {/* Quantity */}
      <div className="mt-8">
        <span className="text-xs uppercase tracking-widest text-ash">
          Quantity <span className="text-signal">*</span>
        </span>
        <div className="mt-3 inline-flex items-center border border-hairline">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid size-11 place-items-center text-bone transition-colors hover:bg-void disabled:cursor-not-allowed disabled:text-ash/40"
          >
            <Minus size={15} />
          </button>
          <span className="w-12 text-center text-sm font-semibold tabular-nums text-bone">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            disabled={qty >= 10}
            aria-label="Increase quantity"
            className="grid size-11 place-items-center text-bone transition-colors hover:bg-void disabled:cursor-not-allowed disabled:text-ash/40"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={cn(
            "flex items-center justify-center gap-2 px-5 py-4 text-xs font-semibold uppercase tracking-widest transition-colors",
            soldOut
              ? "cursor-not-allowed bg-elevated text-ash"
              : "border border-bone bg-ink text-bone hover:bg-bone hover:text-ink",
          )}
        >
          {added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>{soldOut ? "Sold Out" : "Add to Bag"}</>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={soldOut}
          className={cn(
            "flex items-center justify-center px-5 py-4 text-xs font-semibold uppercase tracking-widest transition-colors",
            soldOut
              ? "cursor-not-allowed bg-elevated text-ash"
              : "bg-bone text-ink hover:bg-signal hover:text-on-accent",
          )}
        >
          Buy Now
        </button>
      </div>

      {/* Continue shopping */}
      <Link
        href="/shop"
        className="mt-5 flex w-max items-center gap-2 text-xs font-semibold uppercase tracking-widest text-bone transition-colors hover:text-signal"
      >
        <RotateCcw size={14} />
        Continue Shopping
      </Link>

      {/* Reassurance strip */}
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-y border-hairline py-6 sm:grid-cols-2">
        {[
          { icon: Truck, title: "Free shipping", note: "On orders over ₹1,999" },
          { icon: RotateCcw, title: "7-day returns", note: "Easy, no-fuss exchange" },
          { icon: BadgeIndianRupee, title: "Cash on delivery", note: "Available across India" },
          { icon: ShieldCheck, title: "Secure checkout", note: "Encrypted payments" },
        ].map(({ icon: Icon, title, note }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon size={20} className="mt-0.5 shrink-0 text-bone" />
            <div>
              <p className="text-sm font-semibold text-bone">{title}</p>
              <p className="text-xs text-ash">{note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="mt-8">
        <h2 className="mb-3 text-xs uppercase tracking-widest text-ash">
          Details
        </h2>
        <p className="text-sm leading-relaxed text-bone/80">
          {product.description}
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-bone/80">
              <Check size={15} className="mt-0.5 shrink-0 text-signal" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
