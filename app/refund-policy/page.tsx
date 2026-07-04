import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Returns, exchanges and refunds at HOOKS.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="July 2026"
      intro="We want you in the right fit. If something isn't right, here's how returns, exchanges and refunds work. Arrange any return by messaging us on WhatsApp within the window below."
      sections={[
        {
          heading: "Returns & exchanges",
          body: [
            "You can request a return or size exchange within 7 days of delivery, provided the item is unworn, unwashed and has its tags intact.",
            "Limited Eid-drop and clearance pieces are eligible for exchange only, subject to availability.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Once we receive and inspect your return, approved refunds are issued to your original payment method within 5–7 business days.",
            "Shipping charges are non-refundable unless the item arrived faulty or incorrect.",
          ],
        },
        {
          heading: "Faulty or wrong items",
          body: [
            "If your order arrives damaged or incorrect, message us on WhatsApp with photos within 48 hours and we'll make it right at no cost to you.",
          ],
        },
        {
          heading: "How to start a return",
          body: [
            "Message us on WhatsApp with your order details and reason. We'll share the return address and next steps.",
          ],
        },
      ]}
    />
  );
}
