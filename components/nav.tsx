"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { mailto, site } from "@/lib/site";

/**
 * Floating bottom navigation: a rounded, blurred bar near the bottom of the
 * viewport with a gap beneath it (floating, not glued to the edge).
 *
 * Two shapes. From `sm` up it is the full bar: monogram, section links, theme,
 * CTA. Below `sm` the section links do not fit (the full bar measured 439px in
 * a 375px screen and clipped on both sides), so they move into a menu sheet
 * that opens above the bar, and the bar keeps only what earns thumb space:
 * back-to-top, theme, menu, and the primary CTA at the far right.
 */

const MENU = [...site.nav, { label: "Contact", href: "/#contact" }];

export function FloatingNav() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShown(true), reduced ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  // Escape or a tap outside closes the sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3 transition-all duration-500 sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:px-4 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div ref={wrap} className="relative w-full max-w-md sm:w-auto sm:max-w-none">
        {/* Mobile menu sheet. `invisible` when closed so its links leave the tab order. */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 bottom-[calc(100%+0.5rem)] rounded-2xl border border-line bg-surface/95 p-2 shadow-[0_8px_30px_rgb(0_0_0/0.25)] backdrop-blur-md transition-[opacity,transform,visibility] duration-200 sm:hidden ${
            open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
          }`}
        >
          <ul>
            {MENU.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 text-[16px] font-medium text-text transition-colors active:bg-ink/40"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Primary"
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.25)] backdrop-blur-md"
        >
          <a
            href="#top"
            aria-label={`AS: ${site.name}, back to top`}
            className="grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold tracking-tight text-text sm:block sm:size-auto sm:pl-3 sm:pr-1"
          >
            AS
          </a>

          <ul className="hidden items-center sm:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-ink/40 hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span className="mx-1 hidden h-5 w-px shrink-0 bg-line sm:block" aria-hidden="true" />

          <span className="ml-auto flex items-center sm:ml-0">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 shrink-0 place-items-center rounded-full text-text sm:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </span>

          <Button
            href={mailto()}
            className="ml-1 shrink-0 px-4 text-[12px] sm:px-4 sm:py-2.5 sm:text-[11px]"
          >
            {site.cta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
