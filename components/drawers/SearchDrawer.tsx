"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Drawer } from "./Drawer";
import { useUI } from "@/store/ui";
import { searchProducts } from "@/data/products";
import { formatINR } from "@/lib/format";

export function SearchDrawer() {
  const drawer = useUI((s) => s.drawer);
  const close = useUI((s) => s.close);
  const [query, setQuery] = useState("");

  // Filter the in-memory catalogue on every keystroke — no network.
  const results = useMemo(() => searchProducts(query), [query]);
  const isOpen = drawer === "search";

  return (
    <Drawer id="search" title="Search" side="right">
      <div className="flex h-full flex-col">
        <div className="border-b border-hairline p-5">
          <div className="flex items-center gap-3 border border-hairline bg-elevated px-3 py-2.5 focus-within:border-signal">
            <Search size={18} className="shrink-0 text-ash" />
            {/* Autofocus only while open so it doesn't steal focus otherwise. */}
            {isOpen && (
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-transparent text-sm text-bone placeholder:text-ash focus:outline-none"
              />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {query.trim() === "" ? (
            <p className="text-sm text-ash">
              Try “denim”, “boxy”, “polo” or a category name.
            </p>
          ) : results.length === 0 ? (
            <p className="text-sm text-ash">
              No matches for “{query}”.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-hairline">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={close}
                    className="group flex items-center gap-4 py-3"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden bg-elevated">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-bone transition-colors group-hover:text-signal">
                        {p.name}
                      </p>
                      <p className="text-xs text-ash">{formatINR(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Drawer>
  );
}
