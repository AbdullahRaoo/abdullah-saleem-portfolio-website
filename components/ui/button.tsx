import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Two button roles, and only two.
 *
 * `primary` is the reserved signal action. It is the only brass surface on the
 * site, and it always says the same thing and goes to the same place.
 * `ghost` is every secondary action: quiet, bordered, never brass. Keeping the
 * secondary quiet is what makes the primary loud.
 */

// `leading-none` pins the button height to its padding rather than to the
// font's metrics, so the swap from fallback to Martian Mono cannot resize the
// button and shove the page around. Web-font swap was the entire mobile CLS.
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[13px] font-semibold uppercase leading-none tracking-[0.08em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal";

const variants = {
  primary:
    "bg-signal text-signal-ink px-6 py-3.5 font-medium hover:bg-signal-hover active:bg-signal-active",
  ghost: "border border-line text-muted px-6 py-3.5 hover:border-muted hover:text-text",
} as const;

type Variant = keyof typeof variants;

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
};

export function Button({ href, variant = "primary", className = "", children, ...rest }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  // mailto:, tel: and external URLs must not go through the client router.
  const isInternal = href.startsWith("#") || href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
