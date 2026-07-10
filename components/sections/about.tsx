import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { site } from "@/lib/site";

/**
 * Short and credible. Enough to answer "who is this person and how do they
 * work", then out of the way. Anything longer competes with the case studies,
 * which are the actual argument.
 *
 * The portrait earns its place: hiring a contractor is a decision about a
 * person, and a page with no face on it asks for trust without offering any.
 */
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionWire label="About" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg border border-line bg-surface lg:max-w-none">
            <Image
              src={site.photo}
              alt={`${site.name}, ${site.role}`}
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover grayscale-[0.35] contrast-[1.05]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.5rem)] leading-tight text-text">
              I ship systems, not demos.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-7 space-y-5 text-muted">
              <p>
                I am Abdullah Saleem, an AI engineer and full-stack developer. For four years I
                have built the unglamorous half of AI: the retries, the error handling, the human
                handover, the audit trail. That is the half that decides whether a system is still
                running six months later.
              </p>
              <p>
                My work splits cleanly. LLM reasoning goes where judgment is genuinely needed.
                Deterministic logic goes everywhere it has to be exact. A garment measured to 0.2 cm
                does not get an opinion from a language model, and a patient enquiry does not get
                routed by a regular expression.
              </p>
              <p>
                I have delivered 120+ projects for 80+ clients, and I am a Level 2 seller on Fiverr.
                Most of that work is quiet: automations that run in the background, pipelines nobody
                thinks about, dashboards a manager checks once a week. That is the point.
              </p>
              <p className="text-text/90">
                If an idea is not worth building, I will say so before you pay me to build it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
