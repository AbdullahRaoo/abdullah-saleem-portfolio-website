import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Mono, Hanken_Grotesk } from "next/font/google";

import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Type system: bulky but elegant.
 *
 * Bricolage Grotesque: a chunky, high-character display grotesque that carries
 * real weight at large sizes without reading clunky. It is the personality of
 * the site and deliberately not any of the template defaults (Inter, Geist,
 * Space Grotesque) or the two prior rejected stacks.
 * Hanken Grotesk: a clean, humanist body face, quiet next to the display.
 * DM Mono: reserved strictly for real data (HUD numbers, tags, counters), used
 * sparingly, never on eyebrows or labels, so the page stops feeling like a
 * terminal.
 *
 * `display: "optional"` so a late font swap can never re-wrap the headline and
 * shift layout (that was the whole of the earlier mobile CLS).
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "optional",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "optional",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "Full-Stack Developer",
    "Next.js developer",
    "React developer",
    "ERP development",
    "admin dashboard development",
    "Computer Vision Engineer",
    "real-time computer vision",
    "edge AI",
    "YOLO",
    "ONNX",
    "workflow automation",
    "Abdullah Saleem",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080E11" },
    { media: "(prefers-color-scheme: light)", color: "#F1FBFF" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ThemeScript writes data-theme onto <html> before React hydrates, so the
    // server markup will not match. That mismatch is intentional.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hanken.variable} ${dmMono.variable} ${bricolage.variable}`}
    >
      <head>
        <ThemeScript />
        {/*
          Scroll reveals render their `initial` state into the server HTML, so
          without JS everything below the hero would sit at opacity:0 forever.
          This restores it. Crawlers execute JS, but a failed bundle should not
          blank the page.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.ci-name,.ci-role,.ci-det,.ci-erp,.det-box,.det-label{opacity:1!important;visibility:visible!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-signal-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
