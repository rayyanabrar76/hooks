"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Drawer } from "./Drawer";
import { useUI } from "@/store/ui";
import { SITE } from "@/lib/site";
import { InstagramIcon, FacebookIcon } from "@/components/brand/icons";

type SubLink = { label: string; href: string };
type MenuItem = { label: string; href?: string; children?: SubLink[] };

/**
 * Menu structure mirrors a classic streetwear storefront. Category rows are
 * expandable (+); leaf rows link straight out. Destinations map to real routes.
 */
const MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop Products", href: "/shop" },
  {
    label: "Oversized Jeans",
    children: [
      { label: "Wide Leg", href: "/category/wide-leg" },
      { label: "Shop all jeans", href: "/shop" },
    ],
  },
  {
    label: "Oversized Shirts",
    children: [
      { label: "Boxy Shirts", href: "/category/boxy-shirts" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    label: "Oversized T Shirt",
    children: [
      { label: "Half Sleeve", href: "/category/half-sleeve" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    label: "Regular Jeans",
    children: [{ label: "Shop all", href: "/shop" }],
  },
  { label: "Regular Shirts", href: "/category/full-sleeve" },
  {
    label: "Regular T Shirt",
    children: [
      { label: "Polo Tees", href: "/category/polo-tees" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    label: "Shoes",
    children: [{ label: "Coming soon", href: "/shop" }],
  },
  { label: "About HOOKS", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function MenuDrawer() {
  const close = useUI((s) => s.close);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Drawer id="menu" title="Menu" side="left">
      <div className="flex min-h-full flex-col">
        <nav className="flex flex-col">
        {MENU.map((item) => {
          const isOpen = expanded === item.label;

          if (item.children) {
            return (
              <div key={item.label} className="border-b border-hairline">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-5 py-3 text-xs font-medium uppercase tracking-wide text-bone transition-colors hover:text-signal"
                >
                  {item.label}
                  <span className="grid size-5 place-items-center rounded-full border border-hairline text-ash">
                    {isOpen ? <Minus size={11} /> : <Plus size={11} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col pb-2">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            onClick={close}
                            className="px-8 py-2 text-[11px] uppercase tracking-wide text-ash transition-colors hover:text-signal"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <div key={item.label} className="border-b border-hairline">
              <Link
                href={item.href ?? "/"}
                onClick={close}
                className="block px-5 py-3 text-xs font-medium uppercase tracking-wide text-bone transition-colors hover:text-signal"
              >
                {item.label}
              </Link>
            </div>
          );
        })}
        </nav>

        {/* Socials — pushed to the bottom with a gap above */}
        <div className="mt-auto flex items-center gap-5 px-5 pb-8 pt-16">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-bone transition-colors hover:text-signal"
          >
            <InstagramIcon size={22} />
          </a>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-bone transition-colors hover:text-signal"
          >
            <FacebookIcon size={22} />
          </a>
        </div>
      </div>
    </Drawer>
  );
}
