import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your billing details to place your HOOKS order.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
