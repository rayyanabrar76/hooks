import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/** Big closing call-to-action band that sits just above the site footer. */
export function FooterCTA() {
  return (
    <section className="mx-auto max-w-350 px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="flex flex-col items-start gap-6">
        <h2 className="font-display text-[16vw] leading-[0.85] tracking-wide text-bone sm:text-[10vw] lg:text-[9rem]">
          Don&apos;t sleep
          <br />
          on the drop.
        </h2>
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 bg-bone px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
        >
          Shop everything
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </section>
  );
}
