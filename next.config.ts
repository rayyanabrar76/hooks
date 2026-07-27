import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Dev-only: allow the LAN address so phone/other-device testing can load
  // /_next assets. Without this, client JS is blocked and components that
  // wait for mount (e.g. ThemeToggle) never render.
  allowedDevOrigins: ["192.168.100.183"],
  experimental: {
    // Tree-shake icon/motion barrels so we only ship what we import.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Product/lookbook imagery is served from Unsplash. Add CMS hosts here
    // when the data layer moves to Sanity/Shopify.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
