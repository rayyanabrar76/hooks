"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Drawer } from "./Drawer";
import { useUI } from "@/store/ui";
import { useCart, selectSubtotal } from "@/store/cart";
import { formatINR } from "@/lib/format";

export function CartDrawer() {
  const close = useUI((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart(selectSubtotal);

  const isEmpty = items.length === 0;

  const footer = isEmpty ? null : (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-ash">Subtotal</span>
        <span className="font-medium text-bone">{formatINR(subtotal)}</span>
      </div>
      <p className="text-xs text-ash">
        Shipping calculated at checkout.
      </p>
      <Link
        href="/checkout"
        onClick={close}
        className="flex items-center justify-center bg-bone px-5 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/cart"
        onClick={close}
        className="flex items-center justify-center border border-hairline px-5 py-3 text-xs font-semibold uppercase tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
      >
        View Cart
      </Link>
    </div>
  );

  return (
    <Drawer id="cart" title="Cart" side="right" footer={footer}>
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-3xl tracking-wide text-bone">
            Your cart is empty
          </p>
          <p className="text-sm text-ash">Nothing here yet — go find your fit.</p>
          <Link
            href="/shop"
            onClick={close}
            className="mt-2 border border-hairline px-5 py-2.5 text-sm text-bone transition-colors hover:border-signal hover:text-signal"
          >
            Shop the drop
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col px-5">
          <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 overflow-hidden border-b border-hairline py-4">
              <Link
                href={`/product/${item.slug}`}
                onClick={close}
                className="relative size-24 shrink-0 overflow-hidden bg-elevated"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={close}
                      className="block truncate text-sm text-bone hover:text-signal"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-ash">Size {item.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.key)}
                    aria-label={`Remove ${item.name}`}
                    className="text-ash transition-colors hover:text-signal"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty stepper */}
                  <div className="flex items-center border border-hairline">
                    <button
                      type="button"
                      onClick={() => setQty(item.key, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="grid size-8 place-items-center text-ash transition-colors hover:text-bone"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(item.key, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="grid size-8 place-items-center text-ash transition-colors hover:text-bone"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-sm text-bone">
                    {formatINR(item.price * item.qty)}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      )}
    </Drawer>
  );
}
