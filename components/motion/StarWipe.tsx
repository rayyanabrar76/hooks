"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTransition } from "@/store/transition";

/** Base size (px) of the star box before it scales up to seal the screen. */
const STAR = 220;
/** Fraction of the box from centre to the star's concave (inner) vertices. */
const INNER_RATIO = 0.19;
const EASE = [0.16, 1, 0.3, 1] as const;

/** A filled 5-point star — the HOOKS mark doing the transition work. */
const STAR_PATH =
  "M50 0 L63 35 L100 35 L69 57 L82 92 L50 70 L18 92 L31 57 L0 35 L37 35 Z";

type Job = {
  href: string;
  origin: { x: number; y: number };
  cover: number;
};

/**
 * Persistent overlay that plays the signature "star wipe":
 *  1. a gradient-red star blooms from the click point and seals the viewport;
 *  2. the HOOKS wordmark rises on the seal — a branded beat while the
 *     destination paints behind it;
 *  3. the star retracts, unveiling the new page.
 * Mounted once in the root layout so it survives the route change it drives.
 */
export function StarWipe() {
  const router = useRouter();
  const pending = useTransition((s) => s.pending);
  const clear = useTransition((s) => s.clear);
  const [job, setJob] = useState<Job | null>(null);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");

  // Queue: turn a pending navigation into a job (computes the cover scale).
  useEffect(() => {
    if (!pending || job) return;
    const { href, origin } = pending;
    const dx = Math.max(origin.x, window.innerWidth - origin.x);
    const dy = Math.max(origin.y, window.innerHeight - origin.y);
    const maxDist = Math.hypot(dx, dy);
    const cover = (maxDist / (STAR * INNER_RATIO)) * 1.12;
    setPhase("cover");
    setJob({ href, origin, cover });
  }, [pending, job]);

  function onStarSettled() {
    if (!job) return;
    if (phase === "cover") {
      // Sealed: swap the page behind the seal, then hold the brand beat.
      router.push(job.href);
      window.setTimeout(() => setPhase("reveal"), 560);
    } else {
      // Star has retracted; the new page is revealed.
      setJob(null);
      clear();
    }
  }

  if (!job) return null;

  const sealed = phase === "cover";

  return (
    <div className="fixed inset-0 z-999 overflow-hidden" aria-hidden>
      {/* Red star seal */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: job.origin.x,
          top: job.origin.y,
          width: STAR,
          height: STAR,
        }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          initial={{ scale: 0, rotate: -40 }}
          animate={
            sealed ? { scale: job.cover, rotate: 8 } : { scale: 0, rotate: 74 }
          }
          transition={{ duration: sealed ? 0.6 : 0.55, ease: EASE }}
          onAnimationComplete={onStarSettled}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "center",
            willChange: "transform",
          }}
        >
          <defs>
            <linearGradient id="starwipe-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e5140d" />
              <stop offset="100%" stopColor="#9c0400" />
            </linearGradient>
          </defs>
          <path d={STAR_PATH} fill="url(#starwipe-fill)" />
        </motion.svg>
      </div>

      {/* Brand beat — the wordmark rises on the sealed screen */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={
          sealed
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: -14, scale: 1.04 }
        }
        transition={{
          duration: sealed ? 0.5 : 0.4,
          ease: EASE,
          delay: sealed ? 0.22 : 0,
        }}
      >
        <span className="select-none font-display text-[15vw] leading-none tracking-tight text-white/95 md:text-[8vw]">
          HOOKS
        </span>
      </motion.div>
    </div>
  );
}
