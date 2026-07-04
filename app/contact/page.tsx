import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/site";
import { InstagramIcon, FacebookIcon } from "@/components/brand/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with HOOKS — DM us on Instagram, find us on Facebook, or drop us an email.",
};

export default function ContactPage() {
  const channels = [
    {
      label: "Instagram",
      value: `@${SITE.instagram}`,
      href: SITE.instagramUrl,
      icon: <InstagramIcon size={22} />,
      external: true,
    },
    {
      label: "Facebook",
      value: "Follow the drops",
      href: SITE.facebookUrl,
      icon: <FacebookIcon size={22} />,
      external: true,
    },
    {
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: <Mail size={22} />,
      external: false,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        description="Questions about sizing, orders or a drop? Reach us on any channel below."
      />

      <div className="mx-auto max-w-350 px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-4 border border-hairline p-6 transition-colors hover:border-signal"
            >
              <span className="text-bone transition-colors group-hover:text-signal">
                {c.icon}
              </span>
              <div>
                <p className="font-display text-2xl tracking-wide text-bone">
                  {c.label}
                </p>
                <p className="mt-1 text-sm text-ash">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 max-w-xl border-t border-hairline pt-8">
          <h2 className="font-display text-3xl tracking-wide text-bone">
            How ordering works
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ash">
            <li>
              <span className="text-bone">1.</span> Add your pieces to the cart
              and open your bag.
            </li>
            <li>
              <span className="text-bone">2.</span> Hit checkout and fill in your
              billing &amp; shipping details.
            </li>
            <li>
              <span className="text-bone">3.</span> Place your order — we confirm
              it and get your drop moving.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
