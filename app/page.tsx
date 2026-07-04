import { Hero } from "@/components/home/Hero";

// Homepage is intentionally a single splash hero (per request). The other
// section components — FeaturedDrops, CategoryGrid, LookbookStrip, BrandStory,
// FooterCTA — still exist under components/home and can be re-added below
// <Hero /> to restore the full storefront home.
export default function Home() {
  return <Hero />;
}
