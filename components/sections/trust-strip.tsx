import { socialLinks } from "@/lib/site";

/**
 * Trust sits directly under the hero, before the visitor has to scroll far.
 * Not a repeat of the stat strip: this is where a skeptical buyer goes to
 * verify the claim independently.
 */
export function TrustStrip() {
  return (
    <section aria-label="Profiles and proof" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
      <div className="flex flex-col gap-5 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          80+ clients since 2021. Verify me anywhere:
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {socialLinks().map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-muted transition-colors hover:text-text"
              >
                <span className="text-text group-hover:text-text">{link.label}</span>
                {link.note ? <span className="normal-case tracking-normal">{link.note}</span> : null}
                <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
