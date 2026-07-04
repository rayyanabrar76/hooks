"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "@/store/ui";
import { useCart, selectCount } from "@/store/cart";
import { useMounted } from "@/lib/useMounted";
import { cn } from "@/lib/cn";

/** Primary desktop quick-links; the full category tree lives in the menu drawer. */
const LINKS: { label: string; href: string }[] = [
  { label: "Shop", href: "/shop" },
  { label: "Denim", href: "/category/wide-leg" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative text-xs font-medium uppercase tracking-[0.16em] transition-colors",
        active ? "text-bone" : "text-ash hover:text-bone",
      )}
    >
      {label}
      {/* Animated underline — grows from the left on hover / when active. */}
      <span
        className={cn(
          "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-300 ease-out-brand",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

/**
 * Premium three-column header: menu + desktop quick-links (left), centred brand
 * logo, search + cart (right). Translucent frosted bar that gains a soft shadow
 * once the page is scrolled. Fixed to the top; its h-16/h-20 height is what each
 * page's top padding clears.
 */
export function Navbar() {
  const open = useUI((s) => s.open);
  const count = useCart(selectCount);
  const mounted = useMounted();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/shop" ? pathname.startsWith("/shop") : pathname === href;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-ink/80 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "border-hairline shadow-[0_2px_24px_rgba(10,10,10,0.06)]"
          : "border-hairline/60",
      )}
    >
      <nav className="grid h-16 grid-cols-3 items-center px-3 sm:px-5 md:h-20 md:px-6">
        {/* Left: menu + desktop links */}
        <div className="flex items-center justify-start gap-2 md:gap-7">
          <button
            type="button"
            onClick={() => open("menu")}
            aria-label="Open menu"
            className="-ml-1.5 grid size-10 place-items-center text-bone transition-colors hover:text-signal"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.label}
                href={l.href}
                label={l.label}
                active={isActive(l.href)}
              />
            ))}
          </div>
        </div>

        {/* Center: logo */}
        <div className="flex justify-center">
          <Logo className="h-10 md:h-14" />
        </div>

        {/* Right: theme toggle + search + cart */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <div className="mr-0.5 sm:mr-1">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => open("search")}
            aria-label="Search"
            className="grid size-10 place-items-center text-bone transition-colors hover:text-signal"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => open("cart")}
            aria-label={`Cart${mounted && count ? `, ${count} items` : ""}`}
            className="relative -mr-1.5 grid size-10 place-items-center text-bone transition-colors hover:text-signal"
          >
            <ShoppingCart size={21} strokeWidth={1.75} />
            {mounted && count > 0 && (
              <span className="absolute right-0 top-0.5 grid min-w-4 place-items-center rounded-full bg-signal px-1 text-[10px] font-bold leading-4 text-on-accent">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
