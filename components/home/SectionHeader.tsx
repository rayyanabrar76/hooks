import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared section header: small red eyebrow, big display title, optional link. */
export function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-ash">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-ash transition-colors hover:text-signal sm:inline-flex"
        >
          {linkLabel}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
