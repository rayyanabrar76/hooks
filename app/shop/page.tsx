import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { ProductBrowser } from "@/components/shop/ProductBrowser";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop the full HOOKS range — wide-leg denim, boxy shirts, polos, tees and the Eid capsule. Filter by category and sort by price or newest.",
  openGraph: {
    title: "Shop All · HOOKS",
    description: "The full HOOKS range — filter, sort, and find your fit.",
  },
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="pt-16 md:pt-20">
      {/* Minimal page label (navbar sits above via layout) */}
      <div className="px-4 pb-3 pt-6 sm:px-6">
        <h1 className="text-sm font-bold uppercase tracking-widest text-bone">
          Products
        </h1>
      </div>
      <ProductBrowser products={products} />
    </div>
  );
}
