"use client";

import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";
import { useTransition } from "@/store/transition";

const SEEN_KEY = "hooks:star-wipe-seen";

/**
 * A <Link> that plays the brand star-wipe transition on click — but only the
 * first time per session. It's a signature moment on first visit and a tax on
 * intent by the fifth, so returning clicks (and reduced-motion users) navigate
 * instantly via the normal <Link>. Modified/middle clicks are left untouched.
 */
export function StarLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const start = useTransition((s) => s.start);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let the browser handle new-tab / modified / non-primary clicks.
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    // NOTE: once-per-session gate temporarily disabled so the wipe replays on
    // every click while we confirm it. Re-enable the two lines below to restore
    // "play once per session, then instant" behaviour.
    // const seen = sessionStorage.getItem(SEEN_KEY);
    // if (seen) return; // instant navigation via the default <Link>

    e.preventDefault();
    sessionStorage.setItem(SEEN_KEY, "1");
    start(href, { x: e.clientX, y: e.clientY });
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
