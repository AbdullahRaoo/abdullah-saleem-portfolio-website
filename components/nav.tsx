"use client";

import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { mailto, site, socialLinks } from "@/lib/site";

/**
 * Sticky nav.
 *
 * Desktop keeps the primary CTA in the bar, one click from any scroll position.
 * Mobile does not: at 360px a wordmark, a theme toggle, a menu button and a
 * full "Start a project" button cannot coexist without shrinking the CTA into a
 * poor tap target. Mobile gets the CTA as a sticky bottom bar instead, which is
 * a bigger target and sits under the thumb. See <MobileCta>.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu, which keyboard users will expect.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4"
      >
        <a
          href="#top"
          className="whitespace-nowrap font-mono text-[10px] uppercase leading-none tracking-[0.1em] text-text sm:text-xs"
        >
          Abdullah Saleem
        </a>

        <div className="flex items-center gap-1 sm:gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <div className="hidden md:block">
            <Button href={mailto()} className="px-5 py-3 text-[11px]">
              {site.cta.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 shrink-0 place-items-center rounded-md text-muted transition-colors hover:text-text md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-mono text-xs uppercase tracking-[0.08em] text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 border-t border-line px-4 py-2">
            {socialLinks().map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.07em] text-muted"
                >
                  {link.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Mobile-only sticky action bar. Most traffic is mobile, and on mobile the most
 * valuable band of pixels is the one under the thumb. Full-width brass button,
 * proof line directly above it.
 *
 * It stays hidden until the hero has scrolled away, otherwise the same button
 * appears twice on the first screen, which reads as clutter rather than as a
 * persistent action.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="px-4 py-3">
        <p className="mb-2 text-center font-mono text-[9px] uppercase tracking-[0.07em] text-muted">
          Level 2 Fiverr seller · 80+ clients
        </p>
        <Button href={mailto()} className="w-full py-4" tabIndex={visible ? undefined : -1}>
          {site.cta.label}
        </Button>
      </div>
    </div>
  );
}
