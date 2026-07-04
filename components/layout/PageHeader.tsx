/**
 * Standard page header for non-home routes. Includes the top padding needed to
 * clear the fixed navbar (h-14 / md:h-16), so pages using it don't slide under
 * the bar.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto max-w-350 px-4 pb-10 pt-24 sm:px-6 md:pt-32">
        {eyebrow && (
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ash">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-6xl tracking-wide text-bone sm:text-7xl md:text-8xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-sm text-ash">{description}</p>
        )}
      </div>
    </header>
  );
}
