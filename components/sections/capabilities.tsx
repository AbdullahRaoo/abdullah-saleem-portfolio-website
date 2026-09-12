import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { capabilities } from "@/lib/capabilities";

/**
 * Three parallel pipelines rather than a pill grid. Each lane runs top to
 * bottom on a wire, so the skills read as a system with flow and order.
 *
 * No amber here. Nothing in this section is an action, and spending the signal
 * color on a skill list is exactly how it stops meaning "click".
 */
export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-32"
    >
      <SectionWire label="Capabilities" />

      <Reveal>
        <h2 className="font-display mt-10 max-w-2xl text-[clamp(1.9rem,4vw,2.5rem)] leading-tight text-text">
          Three lanes, one pipeline.
        </h2>
        <p className="mt-5 max-w-xl text-muted">
          Most projects fail at the seams: between the product and the model, or between the
          software and the box it has to run on. I own the whole run, which is why nothing gets
          handed over half-finished.
        </p>
      </Reveal>

      {/*
        Three lanes, stepped down like a signal cascade rather than sitting in a
        dead-level row. Three identical cards in a straight line is the single
        most template-looking layout there is.
      */}
      <div className="mt-10 grid items-start gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
        {capabilities.map((lane, laneIndex) => (
          <Reveal
            key={lane.id}
            delay={laneIndex * 0.08}
            className={laneIndex === 1 ? "md:mt-10" : laneIndex === 2 ? "md:mt-20" : ""}
          >
            <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-display text-xl text-text">{lane.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{lane.summary}</p>

              <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:mt-8 md:block">
                {lane.nodes.map((node, i) => {
                  const isLast = i === lane.nodes.length - 1;
                  return (
                    <li key={node}>
                      <div className="flex items-center gap-3">
                        <span
                          className="size-2 shrink-0 rounded-full border border-line bg-ink"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-[13px] text-muted">{node}</span>
                      </div>
                      {!isLast ? (
                        <div className="ml-[3.5px] hidden h-5 w-px bg-line md:block" aria-hidden="true" />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
