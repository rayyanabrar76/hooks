import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { lookbook as looks } from "@/data/products";

/**
 * Editorial lookbook: a horizontal snap-scroll strip on mobile that expands
 * into a full row on larger screens. Images breathe on the dark ground.
 */
export function LookbookStrip() {
  return (
    <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader eyebrow="On the street" title="The Lookbook" />

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0">
        {looks.map((look) => (
          <figure
            key={look.src}
            className="group relative aspect-3/4 w-[72vw] shrink-0 snap-start overflow-hidden bg-elevated sm:w-auto"
          >
            <Image
              src={look.src}
              alt={look.label}
              fill
              sizes="(max-width: 640px) 72vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-void/70 to-transparent" />
            <figcaption className="absolute bottom-0 left-0 p-4 text-sm font-medium tracking-wide text-bone">
              {look.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
