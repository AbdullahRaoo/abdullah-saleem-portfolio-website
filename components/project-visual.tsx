import Image from "next/image";

import type { Project } from "@/lib/projects";

/**
 * The visual on top of a project card.
 *
 * Real screenshots are shown in full (object-contain on an ink field) rather
 * than cropped, so nothing important is cut off the sides. Projects without a
 * real asset get a designed, labelled placeholder that still shows the real
 * pipeline, so a missing image reads as intentional and can be swapped in later.
 */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.media.kind === "image") {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-ink">
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes="(min-width: 768px) 46vw, 92vw"
          className="media-img object-contain p-2"
        />
      </div>
    );
  }

  const steps = project.media.steps;
  return (
    <div className="cv-panel relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border-b border-line p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-line bg-ink/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted backdrop-blur-sm">
          Preview pending
        </span>
        <span className="font-display text-4xl font-extrabold text-line" aria-hidden="true">
          {project.name.charAt(0)}
        </span>
      </div>

      {/* The real pipeline, rendered as the placeholder's content. */}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <span
              className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${
                step.role === "ai"
                  ? "border-primary/50 text-text [box-shadow:inset_2px_0_0_var(--color-primary)]"
                  : "border-line text-muted"
              }`}
            >
              {step.label}
            </span>
            {i < steps.length - 1 ? (
              <span className="h-px w-3 bg-line" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
