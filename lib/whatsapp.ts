import { WHATSAPP_BASE } from "./site";
import { formatINR } from "./format";
import type { CartItem } from "@/store/cart";

/**
 * Build a wa.me deep link with a pre-filled order message. No payment
 * gateway — the order is completed in the WhatsApp chat.
 */
export function buildCartWhatsAppUrl(items: CartItem[]): string {
  const lines = items.map(
    (i) => `• ${i.name} (${i.size}) x${i.qty} — ${formatINR(i.price * i.qty)}`,
  );
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const message = [
    "Hi HOOKS! I'd like to order:",
    ...lines,
    "",
    `Total: ${formatINR(total)}`,
  ].join("\n");

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/** Single-item order link (the "Order on WhatsApp" fallback on PDP). */
export function buildProductWhatsAppUrl(args: {
  name: string;
  size?: string;
  price: number;
}): string {
  const sizePart = args.size ? ` (${args.size})` : "";
  const message = [
    "Hi HOOKS! I'm interested in:",
    `• ${args.name}${sizePart} — ${formatINR(args.price)}`,
  ].join("\n");

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

/** Generic enquiry link (contact page / floating button). */
export function buildEnquiryWhatsAppUrl(
  message = "Hi HOOKS! I have a question.",
): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
