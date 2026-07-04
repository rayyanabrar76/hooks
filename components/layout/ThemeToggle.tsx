"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMounted } from "@/lib/useMounted";

/** Applies the theme to <html> and persists the choice. */
function applyTheme(dark: boolean) {
  const el = document.documentElement;
  el.classList.toggle("dark", dark);
  el.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    /* storage may be unavailable (private mode) — theme still applies */
  }
}

/**
 * Light/dark switch for the header. The initial theme is set pre-paint by the
 * inline script in the root layout; this just reflects and toggles it. Renders
 * a same-size placeholder until mounted to avoid a hydration mismatch.
 */
export function ThemeToggle() {
  const mounted = useMounted();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (!mounted) return <span className="h-6 w-11" aria-hidden />;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={() => {
        const next = !dark;
        applyTheme(next);
        setDark(next);
      }}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-hairline bg-void transition-colors before:absolute before:-inset-2 before:content-['']"
    >
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full bg-bone text-ink shadow-sm transition-transform duration-300 ease-out-brand",
          dark ? "translate-x-5.5" : "translate-x-0.5",
        )}
      >
        {dark ? <Moon size={11} /> : <Sun size={11} />}
      </span>
    </button>
  );
}
