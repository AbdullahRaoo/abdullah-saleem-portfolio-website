import type { Metadata } from "next";
import Link from "next/link";

import { FloatingNav } from "@/components/nav";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { allWork } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work · ${site.name}`,
  description:
    "Every project: full-stack platforms, business sites and e-commerce, automation, and the computer vision systems, from internal tooling to industrial inspection.",
  alternates: { canonical: `${site.url}/work` },
};

export default function WorkIndexPage() {
  return (
    <>
      <FloatingNav />

      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 sm:pt-28">
        {/* Header is static, not revealed: a framer-motion `initial` state
            ships opacity 0 into the server HTML and pushed LCP past 3s here. */}
        <Link
          href="/"
          className="text-[13px] font-semibold text-muted transition-colors hover:text-text"
        >
          <span aria-hidden="true">&larr;</span> Back home
        </Link>

        <h1 className="font-display mt-6 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-text">
          Everything I have shipped.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Platforms, business sites and storefronts, the automation between them, and the computer
          vision systems. {allWork.length} projects, each with what it is, what it took and what it
          changed.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allWork.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} headingLevel={2} />
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
