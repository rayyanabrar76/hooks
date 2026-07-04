import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

// Intrinsic size of /public/logo-hd.png (hi-res, trimmed to content bounds).
const LOGO_WIDTH = 1251;
const LOGO_HEIGHT = 588;

/**
 * Brand wordmark — the real HOOKS logo (PNG) at /public/logo-hd.png.
 * It's a raster, so it can look slightly soft at large sizes; swap in a vector
 * `logo.svg` from the client for a razor-sharp mark. Pass a Tailwind height
 * utility via `className` (e.g. "h-14 md:h-20"); width scales automatically.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HOOKS — home"
      className={cn(
        "inline-flex w-auto items-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/logo-hd.png"
        alt="HOOKS"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        quality={100}
        // Serve the original PNG (no re-encode/upscale) so it's as crisp as possible.
        unoptimized
        className="h-full w-auto"
      />
    </Link>
  );
}
