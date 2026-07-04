import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "HOOKS is a drop-culture streetwear label — small, considered runs of bold, minimal essentials built to last.",
};

const values = [
  {
    title: "Drop culture",
    body: "Small, numbered runs over endless restocks. When a piece is gone, it's gone — and the next drop is already in the works.",
  },
  {
    title: "Made to last",
    body: "Cut and sewn with mills and makers we know by name. Heavyweight fabrics, honest construction, fair runs.",
  },
  {
    title: "Minimal, not boring",
    body: "Clean silhouettes with one loud detail. Confident type, generous space, and nothing you don't need.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The label"
        title="About HOOKS"
        description="Bold, minimal streetwear — built for the drop, made to last."
      />

      <div className="mx-auto max-w-350 px-4 py-14 sm:px-6">
        {/* Intro */}
        <Reveal className="max-w-2xl">
          <p className="font-display text-3xl leading-[1.1] tracking-wide text-bone sm:text-4xl">
            We started HOOKS with one idea: streetwear that feels considered,
            not chaotic.
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ash">
            <p>
              Every drop is a tight edit — wide-leg denim, boxy shirts, polos
              and heavyweight tees designed to layer together and outlast a
              season. No clutter, no filler, no fast-fashion churn.
            </p>
            <p>
              We obsess over the details that matter: fabric weight, the drape
              of a wide leg, the exact red on a label. Then we let the pieces
              — and the people wearing them — do the talking.
            </p>
          </div>
          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 bg-bone px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
          >
            Shop the drop
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        {/* Values */}
        <div className="mt-20 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="bg-ink p-8">
              <h2 className="font-display text-2xl tracking-wide text-bone">
                {v.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ash">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
