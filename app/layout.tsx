import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteHeader, SiteFooter } from "@/components/layout/Chrome";
import { Drawers } from "@/components/layout/Drawers";
import { StarWipe } from "@/components/motion/StarWipe";

// Condensed grotesque display face for big, confident headings.
const display = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Neutral body sans.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Streetwear`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "HOOKS",
    "streetwear",
    "wide leg denim",
    "boxy shirts",
    "polo tees",
    "streetwear drops",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Streetwear`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Streetwear`,
    description: SITE.description,
  },
};

// Runs before paint to apply the saved (or system) theme, avoiding a flash of
// the wrong colours. Kept as a tiny inline string in <body>'s first position.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-ink text-bone antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Drawers />
        <StarWipe />
      </body>
    </html>
  );
}
