/**
 * Real client testimonials, sourced from the croge repo (`lib/testimonials.ts`,
 * originally transcribed from testimonial.pdf).
 *
 * IMPORTANT, and the reason this file is short:
 *
 * These quotes were given to the agency. Several of them name "Croge" directly.
 * Rewriting a client's words to say "Abdullah" instead would be fabricating a
 * quote, so those are excluded outright rather than edited.
 *
 * What remains are the quotes whose original wording already refers to the
 * builder as "they" or "the team". They appear here verbatim, not one word
 * changed, attributed to the company that gave them. `site.proofNote` carries
 * the honest disclosure that this work was delivered through the agency.
 *
 * Each quote is keyed to the project slug whose metric it corroborates, so it
 * renders as evidence attached to a claim rather than as a floating carousel.
 */
export type Testimonial = {
  /** Matches a `Project.slug` in lib/projects.ts. */
  project: string;
  company: string;
  author: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    project: "magicqc",
    company: "MagicQC",
    author: "Founder",
    quote:
      "They didn't just build our website, they built our entire computer-vision size-measurement system from the ground up. Our manufacturing clients now measure garments in seconds with near-zero error. MagicQC wouldn't exist without them.",
  },
  {
    project: "hsm-lead-routing",
    company: "HSM Administration",
    author: "Management",
    quote:
      "Patient inquiries now route automatically through n8n and GoHighLevel, and our WhatsApp chatbot handles lead generation in real time. Manual data entry is gone and response times improved dramatically, a seamless AI-powered lead system that keeps our calendar full.",
  },
  {
    project: "seo-automation-engine",
    company: "Mattia Viotto",
    author: "Management",
    quote:
      "Our pages used to take hours of manual SEO work. Now the n8n automation handles meta tags, keywords and internal linking automatically. We've seen organic traffic grow 45% with zero extra effort, a reliable workflow that runs silently in the background.",
  },
];

export function testimonialFor(projectSlug: string): Testimonial | undefined {
  return testimonials.find((t) => t.project === projectSlug);
}
