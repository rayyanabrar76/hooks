import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { heroModel } from "@/data/products";
import { StarLink } from "@/components/motion/StarLink";

/**
 * Landing hero — an editorial streetwear splash on white:
 *  - a soft depth vignette + ground shadow so the figure sits in a space;
 *  - a thin inset frame and vertical edge labels (fashion-editorial furniture);
 *  - a giant gradient wordmark the figure appears to step out of;
 *  - a top kicker rail and refined side captions;
 *  - a solid, site-consistent CTA overlaid on the lower third.
 * Elements arrive with a staggered focus-in (see `hero-focus`/`hero-rise` in
 * globals.css). The model image is the LCP asset, so it's `priority`.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink sm:justify-end">
      {/* Depth: a barely-there vignette focuses the eye on the figure. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(72% 62% at 50% 40%, transparent 58%, rgba(10,10,10,0.055))",
        }}
      />

      {/* Ground shadow — anchors the cut-out so it isn't floating. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] left-1/2 z-0 h-14 w-72 -translate-x-1/2 sm:bottom-5"
        style={{
          background:
            "radial-gradient(closest-side, rgba(10,10,10,0.20), transparent)",
        }}
      />

      {/* Inset hairline frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-20 border border-hairline/80 sm:inset-5"
      />

      {/* Kicker rail */}
      <div className="absolute inset-x-0 top-0 z-20 flex animate-[hero-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-between px-6 pt-7 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ash sm:px-9 sm:pt-8">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          New Season
        </span>
        <span className="hidden sm:block">Streetwear</span>
        <span>Est. 2026</span>
      </div>

      {/* Vertical edge labels (wide screens only). */}
      <span className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rotate-180 animate-[hero-focus_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_both] text-[0.62rem] uppercase tracking-[0.35em] text-ash [writing-mode:vertical-rl] xl:block">
        Hooks&trade;
      </span>
      <span className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 animate-[hero-focus_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_both] text-[0.62rem] uppercase tracking-[0.35em] text-ash [writing-mode:vertical-rl] xl:block">
        Autumn &mdash; Winter
      </span>

      {/* Captions — parked in the outer white margins, clear of the figure */}
      <div className="absolute left-[8%] top-[35%] z-20 hidden max-w-40 animate-[hero-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_0.55s_both] text-right leading-snug lg:block">
        <span className="mb-2 ml-auto block h-px w-8 bg-hairline" />
        <p className="text-sm italic text-ash">&ldquo;Street to statement.&rdquo;</p>
      </div>
      <div className="absolute right-[8%] top-[35%] z-20 hidden animate-[hero-rise_0.7s_cubic-bezier(0.16,1,0.3,1)_0.65s_both] leading-snug lg:block">
        <span className="mb-2 block h-px w-8 bg-hairline" />
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-bone">
          Collection
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ash">
          Vol. 01 &mdash; 2026
        </p>
      </div>

      {/* Giant gradient wordmark the figure emerges from */}
      <h1
        aria-hidden
        className="pointer-events-none absolute bottom-[42%] left-1/2 z-0 -translate-x-1/2 animate-[hero-focus_1s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] select-none whitespace-nowrap bg-linear-to-b from-[#c40600] to-[#870400] bg-clip-text font-display text-[37vw] leading-[0.78] tracking-tight text-transparent sm:bottom-[30%] md:text-[27vw]"
      >
        HOOKS
      </h1>

      {/* Figure stage — anchored to the section baseline */}
      <div className="relative z-10 h-[64svh] w-full max-w-lg animate-[hero-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_0.2s_both] px-4 sm:h-[76svh]">
        <Image
          src={heroModel}
          alt="HOOKS — new season streetwear"
          fill
          priority
          sizes="(max-width: 768px) 92vw, 560px"
          className="object-contain object-bottom"
        />
      </div>

      {/* CTA — solid, matches the site button language; always visible.
          StarLink plays the brand star-wipe on the first shop click per session. */}
      <StarLink
        href="/shop"
        className="group absolute left-1/2 top-[60%] z-20 inline-flex -translate-x-1/2 -translate-y-1/2 animate-[hero-focus_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both] items-center gap-2 whitespace-nowrap bg-bone px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink shadow-xl shadow-black/15 transition-colors hover:bg-signal sm:top-auto sm:bottom-9 sm:translate-y-0 sm:px-8"
      >
        Shop the collection
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </StarLink>
    </section>
  );
}
