import type { SVGProps } from "react";

/**
 * Simplified but recognizable payment-brand marks, each drawn on a white card.
 * Rendered small in the footer's "accepted payments" row.
 */
type P = SVGProps<SVGSVGElement>;

const card = (
  <rect width="40" height="26" rx="4" fill="#fff" />
);

function Card({ children, label, ...props }: P & { label: string }) {
  return (
    <svg
      viewBox="0 0 40 26"
      role="img"
      aria-label={label}
      {...props}
    >
      {card}
      {children}
    </svg>
  );
}

export function Visa(props: P) {
  return (
    <Card label="Visa" {...props}>
      <text
        x="20"
        y="18"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={700}
        fontStyle="italic"
        fontSize="11"
        letterSpacing="0.5"
        fill="#1A1F71"
      >
        VISA
      </text>
    </Card>
  );
}

export function Mastercard(props: P) {
  return (
    <Card label="Mastercard" {...props}>
      <circle cx="16" cy="13" r="7" fill="#EB001B" />
      <circle cx="24" cy="13" r="7" fill="#F79E1B" fillOpacity="0.85" />
    </Card>
  );
}

export function Amex(props: P) {
  return (
    <Card label="American Express" {...props}>
      <rect width="40" height="26" rx="4" fill="#1F72CD" />
      <text
        x="20"
        y="16"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={800}
        fontSize="7.5"
        letterSpacing="0.5"
        fill="#fff"
      >
        AMEX
      </text>
    </Card>
  );
}

export function PayPal(props: P) {
  return (
    <Card label="PayPal" {...props}>
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize="9"
        fill="#003087"
      >
        Pay
        <tspan fill="#009CDE">Pal</tspan>
      </text>
    </Card>
  );
}

export function Maestro(props: P) {
  return (
    <Card label="Maestro" {...props}>
      <circle cx="16" cy="13" r="7" fill="#0099DF" />
      <circle cx="24" cy="13" r="7" fill="#ED0006" fillOpacity="0.85" />
    </Card>
  );
}

export function Discover(props: P) {
  return (
    <Card label="Discover" {...props}>
      <text
        x="17"
        y="16"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={700}
        fontSize="5.5"
        letterSpacing="0.2"
        fill="#20242A"
      >
        DISCOVER
      </text>
      <circle cx="33" cy="14" r="4" fill="#FF6000" />
    </Card>
  );
}

export function GooglePay(props: P) {
  return (
    <Card label="Google Pay" {...props}>
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={700}
        fontSize="9"
        fill="#5F6368"
      >
        <tspan fill="#4285F4">G</tspan> Pay
      </text>
    </Card>
  );
}

export function ApplePay(props: P) {
  return (
    <Card label="Apple Pay" {...props}>
      <g transform="translate(6 7) scale(0.5)" fill="#000">
        <path d="M17.05 12.04c-.02-2.6 2.13-3.85 2.23-3.91-1.22-1.78-3.11-2.02-3.78-2.05-1.61-.16-3.14.94-3.96.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.81 1.3 10.37.86 1.25 1.89 2.66 3.24 2.61 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.14-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.04-2.75-4.13zM14.53 4.7c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.59 3.04-1.46z" />
      </g>
      <text
        x="27"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight={600}
        fontSize="8.5"
        fill="#000"
      >
        Pay
      </text>
    </Card>
  );
}

export const PAYMENT_ICONS = [
  Visa,
  Mastercard,
  Amex,
  PayPal,
  Maestro,
  Discover,
  GooglePay,
  ApplePay,
];
