import { Button } from "@/components/ui/button";
import { mailto, site, socialLinks } from "@/lib/site";

/**
 * The closing section: one more CTA, real navigation instead of a single row
 * of afterthought links, and a huge wordmark as a signature rather than
 * decoration.
 *
 * The big name is `aria-hidden` and purely visual, so it never needs the full
 * name the way the real h1 does: the first name alone reads better at this
 * size (the full name ran wide and looked cramped, and at 1440px+ it was
 * wide enough to clip its own first and last letters against the wrapper).
 * `clamp()` keeps one font-size formula honest at every width instead of
 * jumping between breakpoint values, and the container has no fixed height,
 * so the glyphs are never clipped top or bottom either. `overflow-hidden` on
 * the wrapper is a horizontal-only safety net, not load-bearing at any size
 * that has actually been measured. Never the reserved signal color: this is
 * texture, not an action.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const firstName = site.name.split(" ")[0];

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr] sm:gap-8">
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-text">
              {site.name}
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              Full-stack software a business runs on, and the computer vision inside it when a
              product needs to see.
            </p>
            <div className="mt-6">
              <Button href={mailto()}>{site.cta.label}</Button>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 flex flex-col gap-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-my-3 inline-block py-3 text-[14px] font-medium text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Connect</p>
            <ul className="mt-4 flex flex-col gap-3">
              {socialLinks().map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-3 inline-block py-3 text-[14px] font-medium text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Huge wordmark. Decorative and non-interactive: screen readers and
          search engines already have the full name from the h1 above it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-10 flex select-none justify-center overflow-hidden px-2 sm:mt-14"
      >
        <p className="font-display whitespace-nowrap text-center text-[clamp(3rem,18vw,13rem)] font-extrabold uppercase leading-none tracking-tighter text-text/[0.07]">
          {firstName}
        </p>
      </div>

      {/* Bottom padding clears the floating nav, which is fixed on all sizes. */}
      <div className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">
            &copy; {year} {site.name}
          </p>
          <a
            href="#top"
            className="-my-3 inline-block w-fit py-3 text-[13px] font-medium text-muted transition-colors hover:text-text"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
