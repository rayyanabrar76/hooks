import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function BrandStory() {
  return (
    <section className="border-y border-hairline bg-void">
      <div className="mx-auto max-w-350 px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ash">
            The label
          </p>
          <p className="font-display text-3xl leading-[1.05] tracking-wide text-bone sm:text-5xl">
            HOOKS is built on drop culture — small, considered runs of bold,
            minimal streetwear made in India, for people who dress with intent.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-bone transition-colors hover:text-signal"
          >
            Our story
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
