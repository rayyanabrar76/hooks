import { buildEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/brand/icons";

/**
 * Floating WhatsApp CTA present on every page. Sits below the drawer layer
 * (z-40) so an open drawer covers it.
 */
export function WhatsAppButton() {
  return (
    <a
      href={buildEnquiryWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HOOKS on WhatsApp"
      className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-bone text-ink shadow-lg shadow-black/25 transition-transform hover:scale-105 hover:bg-black"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
