"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, selectSubtotal } from "@/store/cart";
import { useMounted } from "@/lib/useMounted";
import { formatINR } from "@/lib/format";

export function CartView() {
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart(selectSubtotal);

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="border-y border-hairline bg-void">
        <div className="mx-auto max-w-350 px-4 py-3 text-xs uppercase tracking-widest text-ash sm:px-6">
          <Link href="/" className="hover:text-signal">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone">Shopping Cart</span>
        </div>
      </div>

      <div className="mx-auto max-w-350 px-4 py-12 sm:px-6">
        <h1 className="mb-10 text-center font-display text-5xl tracking-wide text-bone sm:text-6xl">
          Shopping Cart
        </h1>

        {!mounted ? (
          <p className="py-16 text-center text-sm text-ash">Loading your cart…</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="font-display text-3xl tracking-wide text-bone">
              Your cart is empty
            </p>
            <Link
              href="/shop"
              className="mt-2 bg-bone px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
            >
              Shop the drop
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Line items */}
            <ul className="border-t border-hairline">
              <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.key}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 overflow-hidden border-b border-hairline py-6">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative size-28 shrink-0 overflow-hidden bg-white sm:size-32"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          className="block truncate text-sm font-semibold uppercase tracking-wide text-bone hover:text-signal"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-ash">
                          Size {item.size} · {formatINR(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="grid size-8 shrink-0 place-items-center border border-hairline text-ash transition-colors hover:border-signal hover:text-signal"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-hairline">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid size-9 place-items-center text-ash transition-colors hover:text-bone"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-9 text-center text-sm tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid size-9 place-items-center text-ash transition-colors hover:text-bone"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-bone">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
              </AnimatePresence>
            </ul>

            {/* Summary */}
            <aside className="h-max border border-hairline bg-void p-6">
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-ash">Subtotal</span>
                <span className="font-semibold text-bone">
                  {formatINR(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-hairline py-3 text-sm">
                <span className="text-ash">Shipping</span>
                <span className="font-medium text-bone">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-hairline py-3 text-base">
                <span className="font-semibold text-bone">Total</span>
                <span className="font-semibold text-bone">
                  {formatINR(subtotal)} + shipping
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-5 flex items-center justify-center bg-bone px-6 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 flex items-center justify-center text-xs uppercase tracking-widest text-ash transition-colors hover:text-signal"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
