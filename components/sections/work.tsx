import Image from "next/image";

import { Schematic } from "@/components/schematic";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { selectedWork, type Project } from "@/lib/projects";
import { mailto, site } from "@/lib/site";
import { testimonialFor } from "@/lib/testimonials";

/**
 * Deliberate asymmetry: column spans and media side vary per card so the
 * section never settles into a grid rhythm. Pipeline projects get the narrower
 * media column, since a schematic needs less room than a screenshot.
 */
type Layout = { media: string; content: string; mediaFirst: boolean; offset: string };

const LAYOUTS: Layout[] = [
  { media: "lg:col-span-7", content: "lg:col-span-5", mediaFirst: false, offset: "" },
  { media: "lg:col-span-4", content: "lg:col-span-8", mediaFirst: true, offset: "lg:mt-16" },
  { media: "lg:col-span-6", content: "lg:col-span-6", mediaFirst: false, offset: "" },
  { media: "lg:col-span-4", content: "lg:col-span-8", mediaFirst: true, offset: "lg:mt-16" },
  { media: "lg:col-span-7", content: "lg:col-span-5", mediaFirst: false, offset: "" },
];

function CaseCard({ project, index }: { project: Project; index: number }) {
  const layout = LAYOUTS[index % LAYOUTS.length];
  const testimonial = testimonialFor(project.slug);

  return (
    <Reveal className={layout.offset}>
      <article className="group grid grid-cols-1 items-stretch gap-0 overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-signal/30 lg:grid-cols-12">
        {/* Media */}
        <div
          className={`${layout.media} ${
            layout.mediaFirst ? "lg:order-1" : "lg:order-2"
          } relative border-b border-line lg:border-b-0 ${
            layout.mediaFirst ? "lg:border-r" : "lg:border-l"
          }`}
        >
          {project.media.kind === "image" ? (
            /*
              The screenshot treatment is theme-driven (see --media-* in
              globals.css): the images are bright saturated light-mode UIs, and
              untreated they out-shout the CTA. `media-veil` is a flat floor
              rather than only a gradient, because one screenshot is full-colour
              illustration and a corner-to-corner gradient leaves its brightest
              region untouched. Everything lifts on hover.
            */
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:h-full">
              <Image
                src={project.media.src}
                alt={project.media.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={`media-img object-cover ${
                  project.media.focus === "center" ? "object-center" : "object-top"
                }`}
              />
              <div aria-hidden="true" className="media-veil pointer-events-none absolute inset-0" />
              <div aria-hidden="true" className="media-scrim pointer-events-none absolute inset-0" />
            </div>
          ) : (
            <Schematic steps={project.media.steps} caption={project.media.caption} />
          )}
        </div>

        {/* Content */}
        <div
          className={`${layout.content} ${
            layout.mediaFirst ? "lg:order-2" : "lg:order-1"
          } flex flex-col gap-6 p-6 sm:p-8 lg:p-10`}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            <span className="text-text">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            <span>{project.discipline}</span>
            <span className="ml-auto">{project.year}</span>
          </div>

          <div>
            <h3 className="font-display text-2xl text-text sm:text-3xl">{project.name}</h3>

            {/*
              The outcome, stated as a number, not an adjective. Stacks on
              mobile: Martian Mono is wide enough that "0.2 cm" beside its
              label breaks across lines at 360px.
            */}
            <p className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <span className="whitespace-nowrap font-mono text-2xl text-text sm:text-3xl">
                {project.metric.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted">
                {project.metric.label}
              </span>
            </p>
          </div>

          <dl className="space-y-5 text-[15px] leading-relaxed">
            <div>
              <dt className="eyebrow mb-1.5">Problem</dt>
              <dd className="text-muted">{project.problem}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1.5">What I built</dt>
              <dd className="text-text/90">{project.built}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1.5">Outcome</dt>
              <dd className="text-muted">{project.outcome}</dd>
            </div>
          </dl>

          {/*
            The client's own words, verbatim, attached to the claim they back up.
            Only three of the five cards carry one, which is the honest state of
            the evidence and incidentally keeps the section off a template grid.
          */}
          {testimonial ? (
            <figure className="border-l-2 border-signal/40 pl-4">
              <blockquote className="text-[15px] leading-relaxed text-text/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.07em] text-muted">
                {testimonial.author}, {testimonial.company}
              </figcaption>
            </figure>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            {/* Tech as a mono run, not a wall of pills. */}
            <p className="font-mono text-[11px] leading-relaxed text-muted">
              {project.stack.join(" · ")}
            </p>

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.07em] text-muted transition-colors hover:text-text"
              >
                Visit site{" "}
                <span aria-hidden="true" className="inline-block">
                  &#8599;
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionWire label="Selected work" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.9rem,4vw,2.5rem)] leading-tight text-text">
          Five systems that went into production and stayed there.
        </h2>
      </Reveal>

      <div className="mt-16 space-y-10 lg:space-y-16">
        {selectedWork.map((project, i) => (
          <CaseCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/*
        CTA repetition point two. Social proof sits immediately beside it,
        where the visitor has just finished evaluating the evidence.
      */}
      <Reveal>
        <div className="mt-20 flex flex-col items-center gap-5 text-center">
          <Button href={mailto()}>{site.cta.label}</Button>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-muted">
            Level 2 Fiverr seller · 80+ clients · 4+ years
          </p>
          <p className="max-w-md text-[13px] leading-relaxed text-muted/80">{site.proofNote}</p>
        </div>
      </Reveal>
    </section>
  );
}
