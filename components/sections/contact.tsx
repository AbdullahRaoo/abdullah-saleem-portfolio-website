import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { mailto, site, socialLinks } from "@/lib/site";

/**
 * The conversion point. One primary action, stated plainly, with the proof
 * sitting right next to it and every secondary path kept quiet.
 *
 * Low friction: no form, no fields, no scheduling funnel. A mailto with the
 * subject prefilled is one click and lands in an inbox the visitor controls.
 */
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionWire label="Contact" />

      <Reveal>
        <div className="mt-10 rounded-lg border border-line bg-surface p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight text-text">
              Have a process you think AI could fix?
            </h2>

            <p className="mt-6 text-muted">
              Tell me what you are trying to automate or build. I will tell you honestly whether it
              is worth doing, and how I would approach it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={mailto()}>{site.cta.label}</Button>
              <a
                href={mailto()}
                className="font-mono text-[13px] text-muted transition-colors hover:text-text"
              >
                {site.email}
              </a>
            </div>

            {/*
              Availability and reply time sit exactly where hesitation happens.
              The status dot stays neutral: brass means "click", and a decorative
              live-status light would spend the signal color on nothing.
            */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.07em] text-muted">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-muted" aria-hidden="true" />
                {site.availability}
              </span>
              <span aria-hidden="true">·</span>
              <span>{site.responseTime}</span>
            </div>

            {/* Proof adjacent to the action, one last time. */}
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.07em] text-muted">
              Level 2 Fiverr seller · 80+ clients · 4+ years
            </p>
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {socialLinks().map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted transition-colors hover:text-text"
                  >
                    {link.label}{" "}
                    <span aria-hidden="true">&#8599;</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
