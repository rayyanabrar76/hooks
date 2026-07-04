import type { MetadataRoute } from "next";
import { categories, getAllProducts } from "@/data/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
  ].map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    changeFrequency: "weekly" as const,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
