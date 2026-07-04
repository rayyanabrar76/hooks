"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { useCart, selectSubtotal } from "@/store/cart";
import { useMounted } from "@/lib/useMounted";
import { formatINR } from "@/lib/format";
import { INDIAN_STATES, SHIPPING_FEE } from "@/lib/states";

type Form = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  mobile: string;
  altMobile: string;
  notes: string;
};

const EMPTY: Form = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
  mobile: "",
  altMobile: "",
  notes: "",
};

export function CheckoutView() {
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);

  const [form, setForm] = useState<Form>(EMPTY);
  const [placed, setPlaced] = useState<string | null>(null);

  const set =
    (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const total = subtotal + (items.length ? SHIPPING_FEE : 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend — log the order and confirm. Order ref from time.
    const ref = `HK${Date.now().toString().slice(-8)}`;
    console.log("[checkout] order", ref, { form, items, total });
    clear();
    setPlaced(ref);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="border-y border-hairline bg-void">
        <div className="mx-auto max-w-350 px-4 py-3 text-xs uppercase tracking-widest text-ash sm:px-6">
          <Link href="/" className="hover:text-signal">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-bone">Checkout</span>
        </div>
      </div>

      <div className="mx-auto max-w-350 px-4 py-12 sm:px-6">
        <h1 className="mb-10 text-center font-display text-5xl tracking-wide text-bone sm:text-6xl">
          Checkout
        </h1>

        {placed ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-bone text-ink">
              <Check size={28} />
            </span>
            <h2 className="font-display text-4xl tracking-wide text-bone">
              Order placed
            </h2>
            <p className="text-sm text-ash">
              Thanks{form.firstName ? `, ${form.firstName}` : ""}! Your order{" "}
              <span className="text-bone">{placed}</span> is confirmed. We&apos;ll
              reach out with shipping details shortly.
            </p>
            <Link
              href="/shop"
              className="mt-2 bg-bone px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
            >
              Continue shopping
            </Link>
          </div>
        ) : mounted && items.length === 0 ? (
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
          <form
            onSubmit={handleSubmit}
            className="grid gap-12 lg:grid-cols-[1fr_380px]"
          >
            {/* Billing details */}
            <div>
              <h2 className="mb-6 text-xl font-bold uppercase tracking-wide text-bone">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="First name" required>
                  <input {...input} value={form.firstName} onChange={set("firstName")} placeholder="First Name" required />
                </Field>
                <Field label="Last name">
                  <input {...input} value={form.lastName} onChange={set("lastName")} placeholder="Last Name" />
                </Field>
                <Field label="Address 1" required className="sm:col-span-2">
                  <input {...input} value={form.address1} onChange={set("address1")} placeholder="Address Line 1" required />
                </Field>
                <Field label="Address 2" className="sm:col-span-2">
                  <input {...input} value={form.address2} onChange={set("address2")} placeholder="Address Line 2" />
                </Field>
                <Field label="City" required>
                  <input {...input} value={form.city} onChange={set("city")} placeholder="City" required />
                </Field>
                <Field label="District">
                  <input {...input} value={form.district} onChange={set("district")} placeholder="District" />
                </Field>
                <Field label="State / Province" required>
                  <div className="relative">
                    <select
                      value={form.state}
                      onChange={set("state")}
                      required
                      className={`${input.className} appearance-none pr-9`}
                    >
                      <option value="" disabled>
                        Select state
                      </option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          India - {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ash"
                    />
                  </div>
                </Field>
                <Field label="Pincode" required>
                  <input {...input} value={form.pincode} onChange={set("pincode")} placeholder="Pincode" inputMode="numeric" required />
                </Field>
                <Field label="Mobile" required>
                  <input {...input} value={form.mobile} onChange={set("mobile")} placeholder="Mobile" inputMode="tel" required />
                </Field>
                <Field label="Alternate mobile">
                  <input {...input} value={form.altMobile} onChange={set("altMobile")} placeholder="Alternate Mobile" inputMode="tel" />
                </Field>
                <Field label="Notes" className="sm:col-span-2">
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    placeholder="Notes"
                    rows={3}
                    className={input.className}
                  />
                </Field>
              </div>
            </div>

            {/* Order summary */}
            <aside className="h-max">
              <h2 className="mb-5 font-display text-2xl tracking-wide text-bone">
                Order Items ({items.length})
              </h2>
              <ul className="flex flex-col gap-4 border-y border-hairline py-5">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold uppercase tracking-wide text-bone">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-ash">
                        Size {item.size} · Qty {item.qty}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-bone">
                      {formatINR(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border border-hairline bg-void p-5">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row label="Shipping" value={formatINR(SHIPPING_FEE)} />
                <div className="mt-2 flex items-center justify-between border-t border-hairline pt-3 text-base">
                  <span className="font-semibold text-bone">Total</span>
                  <span className="font-semibold text-bone">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center bg-bone px-6 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-black"
              >
                Place Order
              </button>
              <Link
                href="/cart"
                className="mt-3 flex items-center justify-center text-xs uppercase tracking-widest text-ash transition-colors hover:text-signal"
              >
                Back to cart
              </Link>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

// Shared input styling.
const input = {
  className:
    "w-full border border-hairline bg-ink px-3 py-2.5 text-sm text-bone placeholder:text-ash focus:border-bone focus:outline-none",
};

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs text-ash">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ash">{label}</span>
      <span className="font-medium text-bone">{value}</span>
    </div>
  );
}
