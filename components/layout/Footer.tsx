import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { categories } from "@/data/products";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, FacebookIcon } from "@/components/brand/icons";
import { PAYMENT_ICONS } from "@/components/brand/payments";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop All" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookies Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const orderLinks = [
  { href: "/cart", label: "View Cart" },
  { href: "/checkout", label: "Checkout" },
];

/**
 * Premium dark footer — brand column, link columns, accepted-payment badges,
 * and a copyright bar.
 */
export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-black text-white">
      {/* Brand-red accent seam at the top edge */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-signal/50 to-transparent" />

      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-350 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
              <span className="h-1 w-1 rounded-full bg-signal" />
              Newsletter
            </p>
            <h2 className="font-display text-4xl leading-none tracking-wide md:text-5xl">
              Join the drop list
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/55">
              Early access to new drops, restocks and members-only offers.
              No spam — just the good stuff.
            </p>
          </div>
          <div className="w-full lg:max-w-md lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto max-w-350 px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo className="h-12 md:h-14" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Bold, minimal streetwear. Small, considered drops built to last —
              for people who dress with intent.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialButton href={SITE.instagramUrl} label="Instagram">
                <InstagramIcon size={18} />
              </SocialButton>
              <SocialButton href={SITE.facebookUrl} label="Facebook">
                <FacebookIcon size={18} />
              </SocialButton>
            </div>
          </div>

          <FooterCol title="Collections">
            {categories.map((c) => (
              <FooterLink key={c.slug} href={`/category/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="The Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Pages">
            {legalLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Orders">
            {orderLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <a
              href={`mailto:${SITE.email}`}
              className="w-max text-sm text-white/55 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
          </FooterCol>
        </div>

        {/* Payment badges */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Secure payments accepted
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PAYMENT_ICONS.map((Icon, i) => (
              <Icon key={i} className="h-7 w-auto" />
            ))}
          </div>
        </div>
      </div>

      {/* Signature wordmark — oversized, subtle sign-off */}
      <div aria-hidden className="pointer-events-none select-none px-4 pt-2">
        <p className="text-center font-display text-[15vw] leading-[0.78] tracking-tight text-white/5 md:text-[13vw]">
          HOOKS
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-350 flex-col gap-3 px-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} HOOKS. All rights reserved.</p>
          <p className="tracking-wide">Secure checkout · Easy 7-day returns</p>
          <a
            href="#top"
            className="group flex items-center gap-1.5 uppercase tracking-widest transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp
              size={13}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="w-max text-sm text-white/55 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
    >
      {children}
    </a>
  );
}
