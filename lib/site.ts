/**
 * Global site configuration — the one place to change brand-level constants.
 * The WhatsApp number is read from an env var so it can be swapped without a
 * code change; it falls back to a placeholder +91 line for local dev.
 */
export const SITE = {
  name: "HOOKS",
  // Used by metadataBase / OpenGraph — must be the real deployed origin so
  // og:image, canonical, sitemap etc. resolve to fetchable URLs. Prefers an
  // explicit override, then Vercel's production domain, then the live fallback.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://hooksin.vercel.app"),
  description:
    "HOOKS — bold, minimal streetwear. Wide-leg denim, boxy shirts, polos and drop-culture essentials.",
  instagram: "hooks.tlpb",
  instagramUrl: "https://instagram.com/hooks.tlpb",
  facebookUrl: "https://facebook.com/hooks.tlpb",
  email: "orders@hooks.example.com",
} as const;

/**
 * WhatsApp line for the order flow. Digits only, country code included, no
 * "+" or spaces (wa.me format). Set NEXT_PUBLIC_WHATSAPP_NUMBER to change.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000";

export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
