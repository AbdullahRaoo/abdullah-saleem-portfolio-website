import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionWire } from "@/components/ui/section-wire";
import { site } from "@/lib/site";

/**
 * Short and credible. Enough to answer "who is this person and how do they
 * work", then out of the way. Anything longer competes with the case studies,
 * which are the actual argument.
 *
 * The portrait earns its place: hiring is a decision about a person, and a page
 * with no face on it asks for trust without offering any.
 */
export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-32">
      <SectionWire label="About" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Desktop only: on a phone the portrait already filled the first screen. */}
        <Reveal className="hidden lg:col-span-4 lg:block">
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg border border-line bg-surface lg:max-w-none">
            <Image
              src={site.photo}
              alt={`${site.name}, ${site.role}`}
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover object-bottom grayscale-[0.35] contrast-[1.05]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.5rem)] leading-tight text-text">
              I ship products, not demos.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-7 space-y-5 text-muted">
              <p>
                I am Abdullah Saleem, a full-stack developer with about four years of shipped work
                behind me. Most of what I build is the ordinary, load-bearing kind: admin platforms
                and ERP, B2B catalogs and quote flows, e-commerce, internal tools, and the
                automation that takes the retyping out of a team&rsquo;s week. Next.js, React and
                TypeScript on the front, Supabase, Postgres, Laravel and n8n behind it.
              </p>
              <p>
                For about three of those years the work has also been computer vision, and that is
                the part most developers do not do. Object detection and tracking that has to hold
                frame-rate on constrained hardware (YOLO, PyTorch, OpenCV, ONNX, Jetson and
                Raspberry Pi), from data and training through to Dockerized deployment.
              </p>
              <p>
                On MagicQC I put an end-to-end industrial CV system into production: garment
                measurement to 0.2 cm from a camera, with the desktop app operators use and the
                cloud platform managers report from. On a PPE monitoring system I built both halves
                again: per-worker hard-hat detection, and the multi-site dashboard a safety team
                runs it from. That pairing is the pattern. The model is rarely the deliverable, the
                product around it is.
              </p>
              <p className="text-text/90">
                What makes me useful: I can take something from a blank repository to a running
                product a team actually uses, and I am not stuck when the hard part turns out to be
                a camera.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
