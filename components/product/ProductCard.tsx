import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/types";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  /** Passed to next/image `sizes` for correct responsive loading. */
  sizes?: string;
  /** Priority-load the first row of a grid (LCP). */
  priority?: boolean;
};

/**
 * Product tile: primary image with a hover-swap to the second shot, subtle
 * scale, name + price. Whole card is the link; chrome stays minimal so the
 * photography leads.
 */
export function ProductCard({
  product,
  sizes = "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
  priority = false,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  const soldOut = !product.inStock;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-white">
        {/* Primary */}
        <Image
          src={primary}
          alt={product.name}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-contain transition-all duration-500 ease-out-brand",
            "group-hover:scale-[1.04]",
            secondary && "group-hover:opacity-0",
          )}
        />
        {/* Hover-swap */}
        {secondary && (
          <Image
            src={secondary}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="pointer-events-none absolute left-0 top-0 flex flex-col items-start gap-1 p-3">
          {product.isNew && !soldOut && (
            <span className="bg-bone px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink">
              New
            </span>
          )}
          {soldOut && (
            <span className="bg-void/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-ash ring-1 ring-hairline">
              Sold out
            </span>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-3 pt-3">
        <h3 className="text-sm font-medium text-bone transition-colors group-hover:text-signal">
          {product.name}
        </h3>
        <span className="shrink-0 text-sm text-ash">
          {formatINR(product.price)}
        </span>
      </div>
    </Link>
  );
}
