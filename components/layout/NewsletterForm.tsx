"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Newsletter capture for the (dark) footer — non-functional for now: logs the
 * email to the console and shows a thank-you. Swap the handler for a real
 * endpoint later.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("[newsletter] signup:", email);
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="text-sm text-white/80">
        You&apos;re on the list. Watch your inbox for the next drop.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-b border-white/25 transition-colors focus-within:border-white"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-1.5 pl-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
      >
        Subscribe
        <ArrowRight size={15} />
      </button>
    </form>
  );
}
