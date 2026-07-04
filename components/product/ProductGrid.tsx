import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

/**
 * Responsive product grid: 2 cols on mobile, 3 on tablet, 4 on desktop.
 * First `priorityCount` cards priority-load for a fast LCP above the fold.
 */
export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={i < priorityCount}
        />
      ))}
    </div>
  );
}
