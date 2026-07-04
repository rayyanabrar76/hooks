import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How HOOKS uses cookies and local storage.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies Policy"
      updated="July 2026"
      intro="This policy explains how HOOKS uses cookies and browser storage to run the store and remember your cart."
      sections={[
        {
          heading: "What we use",
          body: [
            "Essential local storage keeps your cart on your device between visits. Nothing is shared until you choose to check out over WhatsApp.",
            "We do not run third-party advertising or tracking cookies on this site.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can clear your browser's storage at any time to reset your cart and preferences.",
          ],
        },
      ]}
    />
  );
}
