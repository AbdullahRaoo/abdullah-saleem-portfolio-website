import Image from "next/image";

import { site } from "@/lib/site";

/**
 * The CV half of the console: the real portrait with a single detection box.
 *
 * Deliberately minimal, one `person` box carrying the confidence and the name,
 * and nothing else. No face box, no telemetry chrome. The photo sits in a
 * fixed-aspect frame matching the asset (1000x1038) so the box, positioned in
 * percentages of that frame, tracks the subject at any panel size.
 *
 * The overlay elements start hidden (inline opacity) and are revealed by the
 * cinematic timeline in components/cinematic-hero.tsx. A <noscript> rule in the
 * root layout forces them visible if JS never runs.
 */

const GREEN = "#3ecf8e";

// Percentages of the image frame, tuned to the portrait.
const BOX = { x: 0.19, y: 0.05, w: 0.62, h: 0.93 };

export function DetectionHero() {
  return (
    <div className="cv-panel relative h-full min-h-[22rem] w-full overflow-hidden rounded-xl border border-line bg-surface">
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="relative h-full max-w-full [aspect-ratio:1000/1038]">
          <Image
            src={site.photo}
            alt={`${site.name}, ${site.role}`}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="cv-subject object-contain object-bottom"
          />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* One-shot scan sweep, played while the detection resolves. */}
            <div
              className="det-scan absolute inset-x-0 top-0 h-px"
              style={{ backgroundColor: GREEN, opacity: 0 }}
            />

            {/* The single detection box. */}
            <div
              className="det-box absolute rounded-[2px] border-2"
              style={{
                left: `${BOX.x * 100}%`,
                top: `${BOX.y * 100}%`,
                width: `${BOX.w * 100}%`,
                height: `${BOX.h * 100}%`,
                borderColor: GREEN,
                opacity: 0,
              }}
            >
              <span
                className="det-label absolute -top-[19px] left-[-2px] whitespace-nowrap px-2 py-1 text-[11px] font-semibold leading-none"
                style={{ backgroundColor: GREEN, color: "#08130d", opacity: 0 }}
              >
                person 0.98 · {site.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
