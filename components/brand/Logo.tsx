import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

// Intrinsic size of /public/newlogo-mark.png (trimmed to content bounds).
const LOGO_WIDTH = 735;
const LOGO_HEIGHT = 173;

/**
 * Brand wordmark — the real HOOKS logo (PNG) at /public/newlogo-mark.png.
 * It's a raster, so it can look slightly soft at large sizes; swap in a vector
 * `logo.svg` from the client for a razor-sharp mark. Pass a Tailwind height
 * utility via `className` (e.g. "h-14 md:h-20"); width scales automatically.
 *
 * The artwork is black-on-transparent, so it needs inverting on dark ground.
 * `brand-mark` handles that automatically for the site's dark theme; pass
 * `onDark` for surfaces that are dark in *both* themes (e.g. the footer).
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
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
        src="/newlogo-mark.png"
        alt="HOOKS"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        // Serve the original PNG (no re-encode/upscale) so it's as crisp as
        // possible. This also makes `quality` a no-op, so it isn't set.
        unoptimized
        className={cn("h-full w-auto", onDark ? "invert" : "brand-mark")}
      />
    </Link>
  );
}
