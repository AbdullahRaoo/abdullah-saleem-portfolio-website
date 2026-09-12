"use client";

import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { mailto, site } from "@/lib/site";

/**
 * Floating bottom navigation: a single rounded, blurred bar centered near the
 * bottom of the viewport with a gap beneath it (floating, not glued to the
 * edge). It replaces a top nav entirely, keeping the hero a clean slate.
 *
 * It fades/slides up shortly after load so it does not compete with the hero's
 * orchestrated entrance. The primary CTA lives here permanently, so the action
 * is one thumb-reach away at any scroll position.
 */
export function FloatingNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShown(true), reduced ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 transition-all duration-500 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.25)] backdrop-blur-md"
      >
        <a
          href="#top"
          className="hidden shrink-0 pl-3 pr-1 font-display text-sm font-bold tracking-tight text-text sm:block"
        >
          AS
        </a>

        <ul className="flex items-center">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-ink/40 hover:text-text sm:px-4"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="mx-1 h-5 w-px shrink-0 bg-line" aria-hidden="true" />

        <ThemeToggle />

        <Button href={mailto()} className="ml-1 shrink-0 px-4 py-2.5 text-[11px]">
          {site.cta.label}
        </Button>
      </nav>
    </div>
  );
}
