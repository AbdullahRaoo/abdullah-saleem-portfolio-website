import { Button } from "@/components/ui/button";
import { mailto, site, socialLinks } from "@/lib/site";

/**
 * Final CTA repetition. Everything here is quiet except the one amber button.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      {/* Bottom padding clears the mobile sticky CTA bar, which is fixed. */}
      <div className="mx-auto max-w-6xl px-5 pb-36 pt-14 sm:px-8 md:pb-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-text">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">
              AI systems, automations and full-stack platforms that run in production.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <Button href={mailto()}>{site.cta.label}</Button>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted transition-colors hover:text-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {socialLinks().map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted">
            &copy; {year} {site.name}
          </p>
          <p className="font-mono text-[11px] text-muted">
            Built with Next.js, deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
