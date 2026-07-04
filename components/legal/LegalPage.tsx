import { PageHeader } from "@/components/layout/PageHeader";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared long-form layout for the legal pages. Copy is placeholder — swap the
 * `sections` passed in for reviewed policy text before launch.
 */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-xs uppercase tracking-[0.15em] text-ash">
          Last updated · {updated}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-bone/80">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl tracking-wide text-bone">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ash">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-hairline pt-6 text-xs text-ash">
          This is placeholder copy for scaffolding only and is not legal advice.
          Replace with policies reviewed for your jurisdiction before going live.
        </p>
      </article>
    </>
  );
}
