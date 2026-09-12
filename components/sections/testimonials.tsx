import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

/**
 * Real client quotes, given their own section rather than buried inside a card
 * disclosure where nobody finds them. Third-party proof is one of the highest
 * value things on a hire-me page, so it gets room.
 *
 * These are verbatim. Quotes that named the agency by brand are excluded rather
 * than reworded, and `site.proofNote` discloses the agency context.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24"
    >
      <SectionWire label="Client feedback" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-tight text-text">
          What the people who paid for it said.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.project} delay={i * 0.06}>
            <figure className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
              <span
                aria-hidden="true"
                className="font-display text-4xl font-extrabold leading-none text-line"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-text/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block text-[14px] font-semibold text-text">{t.company}</span>
                <span className="mt-0.5 block text-[13px] text-muted">{t.author}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-muted">{site.proofNote}</p>
      </Reveal>
    </section>
  );
}
