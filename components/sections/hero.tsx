import { FlowGraph } from "@/components/flow-graph";
import { Button } from "@/components/ui/button";
import { mailto, site } from "@/lib/site";

/**
 * The hero copy is deliberately NOT animated.
 *
 * Framer Motion renders its `initial` state into the server HTML, so a staged
 * entrance would ship the <h1> at opacity:0. That headline is the LCP element:
 * fading it in means the largest paint waits on hydration, and it never appears
 * at all if JS fails. The copy is therefore present on first paint.
 *
 * The orchestrated load moment lives entirely in the graph, which is what the
 * brief actually asks for: nodes fade, wire draws, pulse starts. One moving
 * thing, and it is the signature.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Copy column */}
          <div>
            <p className="eyebrow">AI Engineer / Full-Stack Developer</p>

            <h1 className="font-display mt-6 text-[clamp(2.5rem,7.5vw,5rem)] leading-[1.04] text-text">
              I build AI systems that{" "}
              {/*
                The single hero highlight, and the only signal color on the page
                that is not a button. Uses signal-strong, not signal: brass text
                on a light background would fail contrast.
              */}
              <span className="text-signal-strong">do the work</span>.
            </h1>

            <p className="mt-7 max-w-xl text-muted">
              Chatbots that resolve real tickets, automations that run your back office, and
              full-stack apps with real intelligence underneath. Systems that ship, not demos.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href={mailto()}>{site.cta.label}</Button>
              <Button href="#work" variant="ghost">
                View work
              </Button>
            </div>

            {/*
              Stat strip sits directly under the CTA: proof exactly where the
              hesitation happens, before the visitor has scrolled anywhere.
            */}
            {/* Explicit leading everywhere: font swap must not change heights. */}
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-lg leading-tight text-text">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] uppercase leading-none tracking-[0.08em] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Signature column */}
          <div className="relative -mx-2 lg:mx-0">
            <FlowGraph className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
