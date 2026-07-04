import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-350 flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-[28vw] leading-none tracking-wide text-bone sm:text-[12rem]">
        404
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-ash">
        This page slipped the drop
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-bone px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
        >
          Back home
        </Link>
        <Link
          href="/shop"
          className="border border-hairline px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
        >
          Shop the drop
        </Link>
      </div>
    </div>
  );
}
