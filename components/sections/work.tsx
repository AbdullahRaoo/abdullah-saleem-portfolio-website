import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { allWork, selectedWork } from "@/lib/projects";

/**
 * Selected Work: the six that lead, each opening its own case-study page. The
 * rest of the archive lives on /work.
 */
export function Work() {
  const rest = allWork.length - selectedWork.length;

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionWire label="Selected work" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-tight text-text">
          Software that went into production and stayed there.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {selectedWork.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <Button href="/work" variant="ghost">
            See all projects
          </Button>
          {rest > 0 ? (
            <p className="text-[14px] text-muted">
              {rest} more in the archive: e-commerce, business sites and internal platforms.
            </p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
