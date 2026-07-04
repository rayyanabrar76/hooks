"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMounted } from "@/lib/useMounted";

/** Rows for the denim size chart (waist-based). */
const CHART = [
  { size: "W40 Regular Fit", waist: '40"', rise: '11"', thigh: '12.2"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W38 Regular Fit", waist: '38"', rise: '10"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W36 Regular Fit", waist: '36"', rise: '9.5"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W34 Regular Fit", waist: '34"', rise: '9.4"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W32 Regular Fit", waist: '32"', rise: '9.3"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W30 Regular Fit", waist: '30"', rise: '9.2"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
  { size: "W28 Regular Fit", waist: '28"', rise: '9"', thigh: '11"', inseam: '34"', outseam: '44"', hem: '11"' },
];

const COLS = ["Size", "Waist", "Rise", "Thighs", "Inseam Length", "Outseam Length", "Bottom Hem"];

export function SizeGuideModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const mounted = useMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 overflow-y-auto bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-ink px-4 py-4 sm:px-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-bone">
              Product Size Guide
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close size guide"
              className="grid size-9 place-items-center rounded-full bg-void text-ash transition-colors hover:text-signal"
            >
              <X size={20} />
            </button>
          </div>

          <motion.div
            className="mx-auto max-w-4xl px-4 py-12 sm:px-6"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <div className="text-center">
              <h3 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
                Size Guide
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ash">
                All clothing is in UK sizing, designed to fit the following body
                measurements. Garment measurements will vary depending on style.
              </p>
            </div>

            {/* Diagram */}
            <div className="mt-10 flex justify-center">
              <JeansDiagram />
            </div>

            {/* Table */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-sm">
                <thead>
                  <tr className="border-y border-hairline">
                    {COLS.map((c) => (
                      <th
                        key={c}
                        className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-bone"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CHART.map((r) => (
                    <tr key={r.size} className="border-b border-hairline">
                      <td className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-bone">
                        {r.size}
                      </td>
                      <td className="px-3 py-3 text-ash">{r.waist}</td>
                      <td className="px-3 py-3 text-ash">{r.rise}</td>
                      <td className="px-3 py-3 text-ash">{r.thigh}</td>
                      <td className="px-3 py-3 text-ash">{r.inseam}</td>
                      <td className="px-3 py-3 text-ash">{r.outseam}</td>
                      <td className="px-3 py-3 text-ash">{r.hem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-center text-xs text-ash">
              Measurements are a guide. If you&apos;re between sizes, size up for
              a looser fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/** Simple front-view denim diagram with labelled measurement guides. */
function JeansDiagram() {
  const amber = "#D99A1C";
  return (
    <svg
      viewBox="0 0 480 760"
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label="Jeans measurement diagram"
    >
      <defs>
        <marker
          id="sg-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="4"
          refY="4"
          orient="auto"
        >
          <path
            d="M1 1 L6 4 L1 7"
            fill="none"
            stroke={amber}
            strokeWidth={1.3}
          />
        </marker>
      </defs>

      {/* Jeans illustration */}
      <g
        stroke="#2b2b2b"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* long baggy body + legs */}
        <path
          strokeWidth={2.2}
          d="M138 86 C 126 320 118 540 124 700 L 214 700 C 220 540 224 400 232 290 L 248 290 C 256 400 260 540 266 700 L 356 700 C 362 540 354 320 342 86 Z"
        />
        {/* waistband */}
        <path
          strokeWidth={2.2}
          d="M138 86 C 138 66 146 60 162 60 L 318 60 C 334 60 342 66 342 86"
        />
        <path strokeWidth={1.5} d="M138 86 L 342 86" />
        {/* belt loops */}
        <path strokeWidth={1.5} d="M165 60 L 165 80" />
        <path strokeWidth={1.5} d="M205 60 L 205 80" />
        <path strokeWidth={1.5} d="M275 60 L 275 80" />
        <path strokeWidth={1.5} d="M315 60 L 315 80" />
        {/* button + center seam */}
        <circle cx={240} cy={106} r={5} strokeWidth={1.6} />
        <circle cx={240} cy={106} r={1.5} strokeWidth={1} />
        <path strokeWidth={1.5} d="M226 88 L 226 288" />
        {/* fly stitch */}
        <path
          strokeWidth={1.5}
          strokeDasharray="4 4"
          d="M240 112 C 258 150 258 232 246 288"
        />
        {/* front pockets */}
        <path strokeWidth={1.5} d="M156 92 C 188 132 210 156 226 202" />
        <path strokeWidth={1.5} d="M324 92 C 292 132 270 156 254 202" />
        {/* coin pocket */}
        <path strokeWidth={1.3} d="M256 138 l 22 0 l 0 22" />
        {/* whiskering near crotch */}
        <path strokeWidth={1.1} d="M206 256 q 22 -14 34 -6" />
        <path strokeWidth={1.1} d="M212 276 q 24 -10 30 -2" />
        <path strokeWidth={1.1} d="M256 264 q 12 -6 22 4" />
        <path strokeWidth={1.1} d="M254 284 q 14 -6 26 4" />
        {/* knee & lower creases */}
        <path strokeWidth={1.1} d="M124 452 q 44 22 96 6" />
        <path strokeWidth={1.1} d="M262 460 q 46 16 96 -4" />
        <path strokeWidth={1.1} d="M126 560 q 44 18 92 4" />
        <path strokeWidth={1.1} d="M266 566 q 46 14 92 -6" />
        {/* hem stitch */}
        <path strokeWidth={1.6} d="M124 682 L 214 682" />
        <path strokeWidth={1.6} d="M266 682 L 356 682" />
      </g>

      {/* Measurement guides (amber, dashed, arrowed) */}
      <g stroke={amber} strokeWidth={1.6} strokeDasharray="5 5" fill="none">
        <ellipse cx={240} cy={66} rx={104} ry={11} />
        <ellipse cx={172} cy={324} rx={52} ry={10} />
        <ellipse cx={310} cy={700} rx={56} ry={10} />
        <line
          x1={402}
          y1={86}
          x2={402}
          y2={700}
          markerStart="url(#sg-arrow)"
          markerEnd="url(#sg-arrow)"
        />
        <line
          x1={228}
          y1={108}
          x2={228}
          y2={288}
          markerStart="url(#sg-arrow)"
          markerEnd="url(#sg-arrow)"
        />
        <line
          x1={300}
          y1={292}
          x2={300}
          y2={700}
          markerStart="url(#sg-arrow)"
          markerEnd="url(#sg-arrow)"
        />
      </g>

      {/* Labels + leader lines */}
      <g
        fontFamily="Arial, sans-serif"
        fontSize={11}
        fontWeight={600}
        fill="#2b2b2b"
      >
        <text x={30} y={60}>TO FIT</text>
        <text x={30} y={74}>WAIST</text>
        <line x1={82} y1={66} x2={134} y2={66} stroke="#aaa" strokeWidth={1} />

        <text x={52} y={210}>RISE</text>
        <line x1={86} y1={206} x2={226} y2={206} stroke="#aaa" strokeWidth={1} />

        <text x={30} y={328}>THIGH</text>
        <line x1={80} y1={324} x2={120} y2={324} stroke="#aaa" strokeWidth={1} />

        <text x={420} y={318}>OUTSEAM</text>
        <text x={420} y={332}>LENGTH</text>
        <line x1={402} y1={324} x2={416} y2={324} stroke="#aaa" strokeWidth={1} />

        <text x={30} y={540}>INSEAM</text>
        <text x={30} y={554}>LENGTH</text>
        <line x1={82} y1={548} x2={300} y2={560} stroke="#aaa" strokeWidth={1} />

        <text x={420} y={696}>BOTTOM</text>
        <text x={420} y={710}>HEM</text>
        <line x1={366} y1={700} x2={416} y2={700} stroke="#aaa" strokeWidth={1} />
      </g>
    </svg>
  );
}
