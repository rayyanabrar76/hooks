import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HOOKS collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="This policy explains what information HOOKS collects when you browse and order, how we use it, and the choices you have. Because orders are completed over WhatsApp, some details are handled by Meta under their own terms."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you place an order over WhatsApp, we receive the phone number, name and order details you share in that chat.",
            "We do not run our own payment gateway on this site and do not store card details here.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To process and fulfil your order, confirm sizing, arrange shipping, and provide support.",
            "To send occasional drop updates if you opt in to our newsletter. You can unsubscribe at any time.",
          ],
        },
        {
          heading: "Cookies & local storage",
          body: [
            "Your cart is stored in your browser's local storage so it persists between visits. It never leaves your device until you choose to check out.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request access to, correction of, or deletion of the personal data we hold about you by contacting us.",
          ],
        },
      ]}
    />
  );
}
