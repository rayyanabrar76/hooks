import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the HOOKS store.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro="By using the HOOKS store and placing an order, you agree to these terms. Please read them alongside our Privacy and Refund policies."
      sections={[
        {
          heading: "Orders",
          body: [
            "Adding items to your cart does not reserve stock. An order is confirmed only once we acknowledge it over WhatsApp and payment is arranged.",
            "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.",
          ],
        },
        {
          heading: "Products",
          body: [
            "We photograph products as accurately as possible, but colours may vary slightly by screen. Drops are limited and may sell out without restock.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The HOOKS name, wordmark, designs and site content are our property and may not be reproduced without permission.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "To the extent permitted by law, HOOKS is not liable for indirect or incidental damages arising from use of this site.",
          ],
        },
      ]}
    />
  );
}
