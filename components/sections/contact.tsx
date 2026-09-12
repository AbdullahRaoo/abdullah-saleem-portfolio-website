import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { site, socialLinks } from "@/lib/site";

/**
 * The conversion point. One clear ask, a short form, and the proof sitting
 * right beside it. Everything here reads as a sentence rather than a row of
 * shouty uppercase labels, which is what made this block feel generated.
 */
export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionWire label="Contact" />

      <Reveal>
        <div className="mt-10 grid gap-10 rounded-xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-12">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.7rem)] font-bold leading-tight text-text">
              Need software built, or a system that has to see?
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Tell me what you are trying to build, automate or detect. I will tell you honestly
              whether it is worth doing, and how I would take it from nothing to something your
              team runs every day.
            </p>

            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              {site.availability} {site.responseTime}
            </p>

            <p className="mt-6 text-[14px] leading-relaxed text-muted">
              Four years building full-stack software, three of them on computer vision, with
              systems running in production today.
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              {socialLinks().map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-muted transition-colors hover:text-text"
                  >
                    {link.label} <span aria-hidden="true">&#8599;</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
