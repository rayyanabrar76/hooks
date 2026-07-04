import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export function CategoryGrid() {
  return (
    <section className="bg-void py-16 sm:py-20">
      <div className="mx-auto max-w-350 px-4 sm:px-6">
        <SectionHeader eyebrow="Find your fit" title="Shop by Category" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/category/${category.slug}`}
                className="group relative block aspect-3/4 overflow-hidden bg-elevated"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out-brand group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-void/80 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-bone sm:text-3xl">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-ash">{category.tagline}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-bone transition-colors group-hover:text-signal"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
