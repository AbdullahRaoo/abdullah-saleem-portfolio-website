import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/lib/projects";

/**
 * A project card. The whole card is one link to the case-study page, so the
 * click target is obvious and generous. The deeper problem/build/quote content
 * lives on that page rather than inside a disclosure here, which also keeps the
 * card free of nested interactive elements.
 */
export function ProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  /** 3 inside a section that already has its own h2; 2 on the archive index,
   *  where the cards sit directly under the page h1. */
  headingLevel?: 2 | 3;
}) {
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-strong"
    >
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-[12px] font-medium text-muted">
          <span>{project.discipline}</span>
          <span className="text-line" aria-hidden="true">
            /
          </span>
          <span>{project.year}</span>
        </div>

        <div>
          <Heading className="font-display text-2xl font-bold leading-tight text-text">
            {project.name}
          </Heading>
          <p className="mt-2 text-[15px] leading-relaxed text-text/90">{project.whatItIs}</p>
        </div>

        <div className="flex items-baseline gap-3 border-t border-line pt-4">
          <span className="font-display whitespace-nowrap text-2xl font-bold text-text">
            {project.metric.value}
          </span>
          <span className="text-[13px] font-medium leading-snug text-muted">
            {project.metric.label}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-[12px] font-medium leading-relaxed text-muted">
            {project.stack.slice(0, 4).join(" · ")}
          </p>
          <span className="shrink-0 text-[13px] font-semibold text-signal-strong">
            Case study{" "}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
