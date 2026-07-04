"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import type { CategorySlug, Product } from "@/data/types";
import { categories } from "@/data/products";
import { ShopCard } from "./ShopCard";
import { QuickViewModal } from "./QuickViewModal";
import { cn } from "@/lib/cn";

const PER_PAGE = 30;

/**
 * Product listing with a Filter panel (category groups + counts), client-side
 * category filtering, and numbered pagination. The panel drops down from the
 * sticky bar, closes on selection or an outside click, and the bar hides on
 * scroll-down.
 */
export function ProductBrowser({ products }: { products: Product[] }) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => Number(b.featured) - Number(a.featured)),
    [products],
  );

  const [active, setActive] = useState<CategorySlug | "all">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [barHidden, setBarHidden] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const filterRef = useRef<HTMLDivElement>(null);

  // Hide the Filter bar when scrolling down, reveal it when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last && y > 240) setBarHidden(true);
      else if (y < last) setBarHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel on a click / touch outside it.
  useEffect(() => {
    if (!filterOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [filterOpen]);

  // Categories that actually have products in this set, with counts.
  const groups = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          count: sorted.filter((p) => p.category === c.slug).length,
        }))
        .filter((c) => c.count > 0),
    [sorted],
  );

  const visible = useMemo(
    () => (active === "all" ? sorted : sorted.filter((p) => p.category === active)),
    [sorted, active],
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const paged = visible.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function selectCategory(slug: CategorySlug | "all") {
    setActive(slug);
    setPage(1);
    setFilterOpen(false); // close the panel on any selection
  }

  function goTo(p: number) {
    setPage(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleGroup(slug: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div>
      {/* Sticky bar + attached dropdown panel. Hides on scroll-down unless the
          filter panel is open. */}
      <div
        ref={filterRef}
        className={cn(
          "sticky top-16 z-30 transition-transform duration-300 md:top-20",
          barHidden && !filterOpen && "translate-y-[-130%]",
        )}
      >
        {/* Count + Filter bar */}
        <div className="flex items-center justify-between border-y border-hairline bg-ink px-4 py-3 sm:px-6">
          <span className="text-xs uppercase tracking-widest text-ash">
            {visible.length} {visible.length === 1 ? "Item" : "Items"}
          </span>
          <button
            type="button"
            onClick={() => {
              setFilterOpen((o) => !o);
              setBarHidden(false);
            }}
            aria-expanded={filterOpen}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-bone transition-colors hover:text-signal"
          >
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>

        {/* Filter panel (drops down from the bar, animated) */}
        <AnimatePresence initial={false}>
          {filterOpen && (
            <motion.div
              key="filter-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-hairline bg-ink shadow-lg shadow-black/10"
            >
              <div className="px-4 py-6 sm:px-6">
                <button
                  type="button"
                  onClick={() => selectCategory("all")}
                  className={cn(
                    "mb-5 text-xs font-semibold uppercase tracking-widest transition-colors",
                    active === "all" ? "text-signal" : "text-ash hover:text-bone",
                  )}
                >
                  All Products ({sorted.length})
                </button>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
                  {groups.map((g) => {
                    const isOpen = !collapsed.has(g.slug);
                    return (
                      <div key={g.slug}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(g.slug)}
                          className="flex w-full items-center justify-between border-b border-hairline pb-2 text-left text-sm font-semibold uppercase tracking-wide text-bone"
                        >
                          {g.name}
                          <ChevronDown
                            size={15}
                            className={cn(
                              "shrink-0 text-ash transition-transform",
                              !isOpen && "-rotate-90",
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() => selectCategory(g.slug)}
                                className={cn(
                                  "mt-2 flex w-full items-center justify-between text-left text-xs transition-colors",
                                  active === g.slug
                                    ? "text-signal"
                                    : "text-ash hover:text-bone",
                                )}
                              >
                                <span>All {g.name}</span>
                                <span>{g.count}</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {paged.map((p, i) => (
          <ShopCard key={p.id} product={p} priority={i < 6} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-14 flex items-center justify-center gap-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === current ? "page" : undefined}
              className={cn(
                "grid size-11 place-items-center border text-sm transition-colors",
                p === current
                  ? "border-bone bg-bone text-ink"
                  : "border-hairline text-bone hover:border-bone",
              )}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(Math.min(current + 1, totalPages))}
            disabled={current === totalPages}
            aria-label="Next page"
            className="grid size-11 place-items-center border border-hairline text-bone transition-colors hover:border-bone disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}

      <QuickViewModal />
    </div>
  );
}
