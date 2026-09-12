import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FloatingNav } from "@/components/nav";
import { ProjectVisual } from "@/components/project-visual";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { allWork, getProject } from "@/lib/projects";
import { mailto, site } from "@/lib/site";
import { testimonialFor } from "@/lib/testimonials";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allWork.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} · ${site.name}`,
    description: project.whatItIs,
    alternates: { canonical: `${site.url}/work/${project.slug}` },
    openGraph: {
      title: `${project.name} · ${site.name}`,
      description: project.whatItIs,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <h2 className="eyebrow">{label}</h2>
      <p className="mt-3 text-[16px] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const testimonial = testimonialFor(project.slug);
  const others = allWork.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <FloatingNav />

      <main id="main" className="mx-auto max-w-4xl px-5 pb-24 pt-24 sm:px-8 sm:pt-28">
        <Link
          href="/work"
          className="text-[13px] font-semibold text-muted transition-colors hover:text-text"
        >
          <span aria-hidden="true">&larr;</span> All work
        </Link>

        <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-muted">
          <span>{project.discipline}</span>
          <span className="text-line" aria-hidden="true">
            /
          </span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display mt-3 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.03] tracking-tight text-text">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text/90">{project.whatItIs}</p>

        <div className="mt-9 overflow-hidden rounded-xl border border-line bg-surface">
          <ProjectVisual project={project} />
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 rounded-xl border border-line bg-surface px-6 py-5">
          <span className="font-display text-3xl font-bold text-text">{project.metric.value}</span>
          <span className="text-[15px] text-muted">{project.metric.label}</span>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          <Block label="The problem">{project.problem}</Block>
          <Block label="What I built">{project.built}</Block>
          <Block label="The outcome">{project.outcome}</Block>

          {project.gallery?.length ? (
            <div className="border-t border-line pt-6">
              <h2 className="eyebrow">Inside it</h2>
              <div className="mt-5 flex flex-col gap-8">
                {project.gallery.map((shot) => (
                  <figure key={shot.caption}>
                    <div className="overflow-hidden rounded-xl border border-line bg-ink">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        sizes="(min-width: 896px) 896px, 92vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}

          <div className="border-t border-line pt-6">
            <h2 className="eyebrow">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-surface px-2.5 py-1 text-[13px] font-medium text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {testimonial ? (
            <figure className="border-t border-line pt-6">
              <h2 className="eyebrow">What the client said</h2>
              <blockquote className="mt-3 border-l-2 border-primary/50 pl-4 text-[16px] leading-relaxed text-text/90">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-3 pl-4 text-[13px] text-muted">
                {testimonial.author}, {testimonial.company}
              </figcaption>
            </figure>
          ) : null}

          {project.href ? (
            <div className="border-t border-line pt-6">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-signal-strong underline underline-offset-4"
              >
                Visit the live site <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          ) : null}
        </div>

        {/* Next actions */}
        <div className="mt-16 rounded-xl border border-line bg-surface p-7 sm:p-9">
          <h2 className="font-display text-2xl font-bold text-text">
            Working on something like this?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Tell me what you are trying to build. I will tell you honestly whether it is worth doing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={mailto()}>{site.cta.label}</Button>
            <Button href="/work" variant="ghost">
              See all work
            </Button>
          </div>
        </div>

        {others.length > 0 ? (
          <div className="mt-16 border-t border-line pt-8">
            <h2 className="eyebrow">More work</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="group flex items-baseline justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3 transition-colors hover:border-primary/40"
                  >
                    <span className="font-display text-[17px] font-bold text-text">{p.name}</span>
                    <span className="shrink-0 text-[13px] text-muted">{p.discipline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
