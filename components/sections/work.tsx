import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { allWork, selectedWork } from "@/lib/projects";

/**
 * Selected Work: the featured case studies, each opening its own page. The
 * rest of the archive lives on /work.
 *
 * Below `md` the cards become a native scroll-snap row instead of a stack.
 * Stacked, eight cards were 5,185px of phone scrolling before the visitor
 * reached anything else. Each card is 85% wide so the next one visibly peeks
 * in, which is the swipe affordance, backed by a one-line hint. There is no
 * JS carousel: it is overflow + snap, so momentum, accessibility and keyboard
 * focus (tabbing to a card scrolls it into view) all come from the browser.
 */
export function Work() {
  const rest = allWork.length - selectedWork.length;

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-28">
      <SectionWire label="Selected work" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-tight text-text">
          Software that went into production and stayed there.
        </h2>
      </Reveal>

      <p className="mt-3 text-[14px] text-muted md:hidden">
        {selectedWork.length} projects. Swipe to browse.
      </p>

      <Reveal>
        <ul
          aria-label="Selected projects"
          className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {selectedWork.map((project) => (
            <li key={project.slug} className="flex w-[85%] shrink-0 snap-start md:w-auto">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-14">
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
