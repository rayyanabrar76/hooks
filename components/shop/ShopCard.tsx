import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/types";
import { QuickViewButton } from "./QuickViewButton";

/** Rupee with two decimals, e.g. 1899 -> "₹1,899.00". */
function money(n: number): string {
  return `₹${n.toLocaleString("en-IN")}.00`;
}

/** Collection tag shown top-left on the card. */
function tagFor(p: Product): string {
  if (p.isNew) return "New Arrival";
  if (p.featured) return "Best Sellers";
  return "Classic Styles";
}

/**
 * Dense shop-grid card: full-bleed image with a collection tag, product name,
 * and a compare-at (MRP struck through) + sale price. Cards carry right/bottom
 * hairlines so the grid reads as clean separator lines.
 */
export function ShopCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const mrp = product.price + 200; // shown struck-through as the compare-at price
  const soldOut = !product.inStock;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-4/7 overflow-hidden bg-white">
        <span className="absolute left-2.5 top-2.5 z-10 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500">
          {tagFor(product)}
        </span>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-contain transition-transform duration-500 ease-out-brand group-hover:scale-[1.04]"
        />
        {soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-white/60 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Sold out
          </span>
        )}

        {/* Quick-view hover overlay: sizes + clickable trigger */}
        {!soldOut && <QuickViewButton product={product} />}
      </div>

      <div className="p-3">
        <h3 className="truncate text-xs font-semibold uppercase tracking-wide text-bone transition-colors group-hover:text-signal">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-ash line-through">{money(mrp)}</span>
          <span className="font-semibold text-bone">{money(product.price)}</span>
        </div>
      </div>
    </Link>
  );
}
