"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Product image gallery: large main image with a thumbnail rail. First image
 * is priority-loaded (it's the PDP hero / LCP). Supports touch swipe on
 * mobile and hover arrow nav on desktop.
 */
export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = (i: number) => {
    setActive((i + images.length) % images.length);
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 40; // px swipe distance to trigger nav
    if (touchDeltaX.current > threshold) {
      prev();
    } else if (touchDeltaX.current < -threshold) {
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group/gallery relative aspect-4/5 w-full overflow-hidden bg-white"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain"
        />

        {images.length > 1 && (
          <>
          {/* Desktop hover arrows */}
<button
  type="button"
  onClick={prev}
  aria-label="Previous image"
  className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center text-black opacity-0 transition-all duration-300 ease-out-brand hover:opacity-100 group-hover/gallery:opacity-70 md:flex"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>
<button
  type="button"
  onClick={next}
  aria-label="Next image"
  className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center text-black opacity-0 transition-all duration-300 ease-out-brand hover:opacity-100 group-hover/gallery:opacity-70 md:flex"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
</button>

            {/* Mobile dot indicator */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === active ? "bg-signal" : "bg-neutral-300",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show view ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-4/5 w-20 shrink-0 overflow-hidden bg-white transition-opacity",
                i === active
                  ? "ring-2 ring-signal"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}