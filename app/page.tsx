import { FloatingNav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Work } from "@/components/sections/work";
import { site, socialLinks } from "@/lib/site";

/** Person schema so search engines resolve the identity, not just the keywords. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  description: site.description,
  sameAs: socialLinks().map((l) => l.href),
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "React",
    "TypeScript",
    "ERP and admin platforms",
    "E-commerce",
    "Workflow automation",
    "Computer vision",
    "Real-time object detection",
    "YOLO",
    "PyTorch",
    "ONNX",
    "Edge AI",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled object. No user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <FloatingNav />

      <main id="main">
        <Hero />
        <Intro />
        <TrustStrip />
        <Work />
        <Testimonials />
        <Capabilities />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
