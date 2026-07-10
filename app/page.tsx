import { MobileCta, Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
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
    "AI automation",
    "LangChain",
    "n8n",
    "Retrieval-augmented generation",
    "Computer vision",
    "Next.js",
    "Full-stack development",
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

      <Nav />

      <main id="main">
        <Hero />
        <TrustStrip />
        <Work />
        <Capabilities />
        <About />
        <Contact />
      </main>

      <Footer />

      <MobileCta />
    </>
  );
}
