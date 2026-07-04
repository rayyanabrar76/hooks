import { getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedDrops() {
  const featured = getFeaturedProducts();

  return (
    <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        eyebrow="Handpicked"
        title="Featured Drops"
        href="/shop"
      />
      <Reveal>
        <ProductGrid products={featured} />
      </Reveal>
    </section>
  );
}
