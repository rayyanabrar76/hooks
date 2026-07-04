/**
 * Catalogue domain types. Kept separate from the data so the same shapes can
 * be reused by components, the cart store, and (later) a CMS adapter.
 */

/** Union of every valid category slug — used to key products to a category. */
export type CategorySlug =
  | "wide-leg"
  | "boxy-shirts"
  | "polo-tees"
  | "half-sleeve"
  | "full-sleeve"
  | "eid-drops";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short editorial line shown on category cards / headers. */
  tagline: string;
  /** Hero image for the category card & listing header. */
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Price in whole INR rupees. */
  price: number;
  category: CategorySlug;
  /** At least two images — [0] is primary, [1] is the hover-swap. */
  images: string[];
  sizes: string[];
  description: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
};
