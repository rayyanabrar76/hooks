import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/data/products";
import type { CategorySlug } from "@/data/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductBrowser } from "@/components/shop/ProductBrowser";

type Params = { slug: string };

// Pre-render every category at build time.
export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };

  const title = `${category.name}`;
  const description = `${category.tagline} — shop the HOOKS ${category.name} collection.`;

  return {
    title,
    description,
    openGraph: {
      title: `${category.name} · HOOKS`,
      description,
      images: [{ url: category.image }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug as CategorySlug);

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={category.name}
        description={category.tagline}
      />
      <ProductBrowser products={products} />
    </>
  );
}
