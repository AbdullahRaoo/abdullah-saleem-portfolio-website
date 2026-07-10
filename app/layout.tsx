import type { Metadata } from "next";
import { Chivo, Libre_Franklin, Martian_Mono } from "next/font/google";

import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Type system, chosen to avoid the Inter / JetBrains Mono / Clash Display stack
 * that reads instantly as a template.
 *
 * Chivo: a sturdy grotesque with real weight at display sizes.
 * Libre Franklin: an American gothic body face, journalistic and credible.
 * Martian Mono: the label voice. Wide and engineered, so it is used small and
 * with restrained tracking (its natural width does the work instead).
 *
 * `display: "optional"` rather than "swap", deliberately. With swap, the
 * headline and subhead re-wrap when the real faces arrive and shove the stat
 * strip down: that single reflow was the whole of the mobile CLS (0.115, over
 * the 0.1 budget). Optional keeps the ~100ms block window, uses the font when
 * it arrives in time (same-origin and preloaded, so nearly always), and
 * otherwise renders this page view in next/font's metric-matched fallback and
 * picks up the real face from cache on the next navigation. Zero shift, and no
 * invisible text.
 */
const chivo = Chivo({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-chivo",
  display: "optional",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-libre-franklin",
  display: "optional",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-martian-mono",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "AI automation",
    "n8n",
    "LangChain",
    "RAG chatbot",
    "Next.js developer",
    "computer vision",
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
    { media: "(prefers-color-scheme: dark)", color: "#0B0D12" },
    { media: "(prefers-color-scheme: light)", color: "#F5F6F8" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ThemeScript writes data-theme onto <html> before React hydrates, so the
    // server markup will not match. That mismatch is intentional.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${libreFranklin.variable} ${martianMono.variable} ${chivo.variable}`}
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
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
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
