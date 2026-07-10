"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Theme switch. Deliberately quiet: it is not a primary action, so it never
 * wears the signal color. Icon-only, but 44x44 so it is a real tap target.
 *
 * The button renders a stable placeholder until mounted. The actual theme is
 * decided pre-paint by ThemeScript, and React has no way to know it during SSR,
 * so we avoid rendering a label that would contradict the DOM on hydration.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or storage disabled. The theme still applies for this page.
    }
    setTheme(next);
  }

  const label =
    theme === null
      ? "Switch theme"
      : theme === "light"
        ? "Switch to dark theme"
        : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-11 shrink-0 place-items-center rounded-md text-muted transition-colors hover:text-text"
    >
      {/* Sun and moon are both rendered; CSS picks one, so there is no swap on hydration. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {theme === "light" ? (
          // Moon: offered when the user is in light mode.
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        ) : (
          // Sun: offered when the user is in dark mode.
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
