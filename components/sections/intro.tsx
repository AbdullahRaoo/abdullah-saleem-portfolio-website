import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { mailto, site } from "@/lib/site";
import { stats } from "@/lib/stats";

/**
 * The introduction, deliberately placed after the console. The first viewport
 * is pure visual (detection + ERP); the words arrive once the visitor scrolls,
 * where they can be given room instead of competing with the panels. This holds
 * the page's h1 for SEO and structure.
 */
export function Intro() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="eyebrow">Full-Stack Developer &amp; Computer Vision Engineer</p>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.4rem,5.6vw,4.4rem)] font-extrabold leading-[1.0] tracking-tight text-text">
          I build the software a business{" "}
          <span className="text-signal-strong">actually runs on</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Admin platforms and ERP, B2B sites and storefronts, and the automation that removes the
          manual work between them. And when a product needs to see, I build the computer vision
          inside it: real-time detection that ships on real hardware, not a notebook.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={mailto()}>{site.cta.label}</Button>
          <Button href="#work" variant="ghost">
            View work
          </Button>
        </div>
      </Reveal>

      {/* Stat strip */}
      <Reveal delay={0.05}>
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display block text-3xl font-bold leading-none text-text">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[13px] font-medium uppercase tracking-[0.1em] text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
