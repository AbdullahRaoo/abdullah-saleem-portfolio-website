import type { SchematicStep } from "@/lib/projects";

/**
 * Card visual for pipeline projects, which have no screenshot worth showing.
 * Renders the project's actual data flow as a vertical chain of nodes, reusing
 * the hero's wire language at card scale.
 *
 * The wire runs off both ends of the chain, so the pipeline reads as a segment
 * of something continuous rather than a list that happens to have dots.
 *
 * Static by design: the hero owns the one moving thing on the page. Amber marks
 * the AI step only, matching the hero's active-node rule.
 */
export function Schematic({ steps, caption }: { steps: SchematicStep[]; caption: string }) {
  return (
    <figure className="flex h-full min-h-[22rem] flex-col justify-center gap-6 p-6 sm:p-8">
      <div className="relative">
        {/* Lead-in wire: the flow arrives from somewhere. */}
        <div className="ml-[4.5px] h-8 w-px bg-gradient-to-b from-transparent to-line" aria-hidden="true" />

        <ol>
          {steps.map((step, i) => {
            const isAI = step.role === "ai";
            const isLast = i === steps.length - 1;

            return (
              <li key={step.label}>
                <div className="flex items-baseline gap-3">
                  <span
                    className={`size-2.5 shrink-0 translate-y-[-1px] rounded-full ${
                      isAI ? "bg-signal" : "bg-line"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`font-mono text-[13px] ${isAI ? "text-text" : "text-muted"}`}>
                    {step.label}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                    {step.role}
                  </span>
                </div>

                {!isLast ? (
                  <div className="ml-[4.5px] h-10 w-px bg-line" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Lead-out wire: and it goes somewhere. */}
        <div className="ml-[4.5px] h-8 w-px bg-gradient-to-b from-line to-transparent" aria-hidden="true" />
      </div>

      <figcaption className="border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
