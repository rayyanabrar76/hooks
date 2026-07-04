import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getCategoryBySlug,
  getRelatedProducts,
} from "@/data/products";
import { formatINR } from "@/lib/format";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeader } from "@/components/home/SectionHeader";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  const description = `${product.description.slice(0, 150)} — ${formatINR(
    product.price,
  )}.`;

  return {
    title: product.name,
    description,
    openGraph: {
      type: "website",
      title: `${product.name} · HOOKS`,
      description,
      // Dynamic OG image per product.
      images: [{ url: product.images[0], width: 1000, height: 1250 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · HOOKS`,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-350 px-4 pt-20 sm:px-6 md:pt-28">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-ash">
        <Link href="/shop" className="transition-colors hover:text-signal">
          Shop
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="transition-colors hover:text-signal"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-bone">{product.name}</span>
      </nav>

      {/* Main */}
      <div className="grid gap-8 lg:grid-cols-[55fr_45fr] lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-bone">
            {product.name}
          </h1>
          <div className="mt-4">
            <ProductPurchase product={product} categoryName={category?.name} />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeader
            eyebrow="Complete the fit"
            title="You may also like"
            href={category ? `/category/${category.slug}` : "/shop"}
          />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
