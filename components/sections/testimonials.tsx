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
      className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionWire label="Client feedback" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.8rem,3.6vw,2.4rem)] font-bold leading-tight text-text">
          What the people who paid for it said.
        </h2>
      </Reveal>

      <Reveal>
        <ul
          aria-label="Client quotes"
          className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {testimonials.map((t) => (
            <li key={t.project} className="flex w-[85%] shrink-0 snap-start md:w-auto">
            <figure className="flex h-full w-full flex-col rounded-xl border border-line bg-surface p-6">
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
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-muted">{site.proofNote}</p>
      </Reveal>
    </section>
  );
}
