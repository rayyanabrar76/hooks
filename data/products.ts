import type { Category, CategorySlug, Product } from "./types";

/* ------------------------------------------------------------------ *
 * HOOKS catalogue — single source of truth.                          *
 *                                                                    *
 * This is the ONLY place product data lives. To move to a CMS        *
 * (Sanity / Shopify) later, replace the arrays below with a fetch    *
 * that returns the same Category[] / Product[] shapes — every        *
 * component reads through the selector helpers at the bottom.        *
 *                                                                    *
 * Product imagery is your own local photography in /public           *
 * (p1.jpg … p10.jpg). Drop more files in and extend the P array +    *
 * per-product `images` to grow the gallery.                          *
 * ------------------------------------------------------------------ */

/** Local product photos in /public. Add more files and list them here. */
const P = [
  "/p1.jpg",
  "/p2.jpg",
  "/p3.jpg",
  "/p4.jpg",
  "/p5.jpg",
  "/p6.jpg",
  "/p7.jpg",
  "/p8.jpg",
  "/p9.jpg",
  "/p10.jpg",
];

/** The nth product gallery: two distinct local images (primary + hover-swap). */
const pair = (n: number): string[] => [
  P[n % P.length],
  P[(n + 5) % P.length],
];

/** Editorial imagery still served from Unsplash (host allowlisted). */
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    slug: "wide-leg",
    name: "Wide Leg",
    tagline: "Denim & pants with room to move",
    image: P[0],
  },
  {
    slug: "boxy-shirts",
    name: "Boxy Shirts",
    tagline: "Structured, cropped, unbothered",
    image: P[1],
  },
  {
    slug: "polo-tees",
    name: "Polo Tees",
    tagline: "Knit collars, clean lines",
    image: P[5],
  },
  {
    slug: "half-sleeve",
    name: "Half Sleeve",
    tagline: "Everyday heavyweight tees",
    image: P[6],
  },
  {
    slug: "full-sleeve",
    name: "Full Sleeve",
    tagline: "Layer-ready shirts & overshirts",
    image: P[2],
  },
  {
    slug: "eid-drops",
    name: "Eid Drops",
    tagline: "Limited festive capsule",
    image: P[9],
  },
];

/**
 * Full-body hero model shot, standing on a seamless light-studio backdrop.
 * `heroModelBg` is the sampled backdrop colour — set the hero section to it so
 * the photo blends into the page and the model reads as "no background".
 * Swap this URL for your own cut-out model photo for an exact on-brand match.
 */
export const heroModel = "/model3-fit.png";
export const heroModelBg = "#ffffff";

/** Lookbook / editorial imagery. */
export const heroImage = P[0];
export const aboutImage = img("1507003211169-0a1dd7228f2d", 1400);
export const lookbook = [
  { src: P[1], label: "The Denim Edit" },
  { src: P[4], label: "Boxy & Layered" },
  { src: P[7], label: "Festive Capsule" },
  { src: P[9], label: "Everyday Heavyweight" },
];

const TOP_SIZES = ["S", "M", "L", "XL", "XXL"];
const WAIST_SIZES = ["28", "30", "32", "34", "36"];

/* --- Generated catalogue --------------------------------------------- *
 * 50 denim products cycling the local product photos. Names/slugs are    *
 * unique; categories, prices and flags are assigned deterministically so *
 * the catalogue is stable across builds.                                 *
 * -------------------------------------------------------------------- */

const PRODUCT_NAMES = [
  "Rust Eze Denim", "Shadow Drift Denim", "Dagger Fade Jean", "Copper Stitch Denim",
  "Reaper Light Jean", "Phantom Blue Denim", "Midnight Raw Denim", "Stone Wash Wide",
  "Acid Burst Jean", "Vapor Baggy Denim", "Ghost Fade Jean", "Onyx Carpenter Pant",
  "Cobalt Flare Denim", "Ember Wash Jean", "Slate Wide Trouser", "Frost Bite Denim",
  "Nomad Cargo Denim", "Rogue Raw Jean", "Drift Loose Denim", "Vortex Baggy Jean",
  "Static Fade Denim", "Tundra Wide Pant", "Cipher Stone Jean", "Havoc Denim",
  "Riot Wash Jean", "Eclipse Wide Denim", "Titan Baggy Jean", "Venom Fade Denim",
  "Blaze Raw Jean", "Cinder Cargo Pant", "Wraith Wide Denim", "Specter Jean",
  "Dune Wash Denim", "Ashen Baggy Jean", "Kilo Carpenter Denim", "Delta Fade Jean",
  "Sable Wide Pant", "Vandal Denim", "Rebel Raw Jean", "Maverick Wash Denim",
  "Crux Baggy Jean", "Zephyr Wide Denim", "Halcyon Jean", "Ironclad Denim",
  "Nova Fade Jean", "Pulse Wide Pant", "Quartz Wash Denim", "Ronin Baggy Jean",
  "Saber Raw Denim", "Vertex Wide Jean",
];

const CATS: CategorySlug[] = [
  "wide-leg", "boxy-shirts", "polo-tees", "half-sleeve", "full-sleeve", "eid-drops",
];

// Price ladders per category (all whole rupees, ending in 90).
const PRICES: Record<CategorySlug, number[]> = {
  "wide-leg": [1990, 2290, 2490, 2790, 2990, 3190, 3490],
  "boxy-shirts": [1590, 1790, 1990, 2190, 2490],
  "polo-tees": [990, 1190, 1290, 1390, 1490],
  "half-sleeve": [990, 1090, 1190, 1290, 1490],
  "full-sleeve": [1590, 1790, 1990, 2190, 2490],
  "eid-drops": [1990, 2490, 2990, 3290, 3490],
};

const DESCRIPTIONS = [
  "in premium heavyweight denim — a relaxed wide leg, clean high rise and a hem built to stack over chunky footwear.",
  "— garment-washed for a broken-in hand and cut loose through the leg. A statement bottom to build the fit around.",
  ": raw, rigid denim that wears in with you. Honest fades, bold silhouette, drop-culture ready.",
  "— light stone wash, baggy from hip to hem. Limited run — once it's gone, it's gone.",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const products: Product[] = PRODUCT_NAMES.map((name, i) => {
  const category = CATS[i % CATS.length];
  const useWaist = category === "wide-leg" || category === "eid-drops";
  return {
    id: `hk-${String(i + 1).padStart(2, "0")}`,
    slug: slugify(name),
    name,
    price: PRICES[category][i % PRICES[category].length],
    category,
    images: pair(i),
    sizes: useWaist ? WAIST_SIZES : TOP_SIZES,
    description: `${name} ${DESCRIPTIONS[i % DESCRIPTIONS.length]}`,
    inStock: i % 13 !== 7, // a few sold out
    featured: i % 4 === 0,
    isNew: i % 5 === 0,
  };
});

/* ----------------------------- Selectors ---------------------------- *
 * Read the catalogue through these so a future CMS swap only touches   *
 * the data above, not every component.                                 *
 * ------------------------------------------------------------------- */

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

/** Related products: same category, excluding the current slug. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

/** Client-side search over name + description + category name. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const categoryName = getCategoryBySlug(p.category)?.name ?? "";
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      categoryName.toLowerCase().includes(q)
    );
  });
}
