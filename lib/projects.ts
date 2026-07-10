import type { StaticImageData } from "next/image";

import afnHero from "@/public/projects/animated-film-network/hero-desktop.png";
import fenixAdmin from "@/public/projects/fenix-brokers/admin-panel.png";
import magicqcDashboard from "@/public/projects/magicqc/qc-dashboard.png";

/**
 * Case-study content, adapted from the croge agency repo into first person.
 * Every outcome here is real and traceable to a client testimonial or to the
 * shipped system itself. Nothing is invented.
 *
 * Projects whose visual is a `schematic` are pipelines, not pages: there is no
 * screenshot worth showing, so the card renders the actual data flow instead.
 * That is honest, and it doubles down on the site's node-graph motif.
 */

export type NodeRole = "input" | "logic" | "ai" | "output";

export type SchematicStep = {
  label: string;
  role: NodeRole;
};

export type Media =
  | {
      kind: "image";
      src: StaticImageData;
      alt: string;
      /** Crop anchor. Screenshots differ in where the useful content sits. */
      focus?: "top" | "center";
    }
  | { kind: "schematic"; steps: SchematicStep[]; caption: string };

export type Project = {
  slug: string;
  name: string;
  discipline: string;
  year: string;
  /** The headline number. Specific outcomes over adjectives. */
  metric: { value: string; label: string };
  problem: string;
  /** What I built. First person, concrete. */
  built: string;
  outcome: string;
  stack: string[];
  media: Media;
  href?: string;
  /** Draft entries are excluded from the rendered site until content lands. */
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "magicqc",
    name: "MagicQC",
    discipline: "Computer Vision",
    year: "2025",
    metric: { value: "0.2 cm", label: "measurement accuracy" },
    problem:
      "Garment QC was manual, slow and subjective. Two operators measuring the same piece disagreed, and managers had no objective record of where defects clustered.",
    built:
      "I built a desktop computer-vision app that measures garments to 0.2 cm, then bridged it to a cloud platform for brand, operator and purchase-order management. A separate analytics layer turns every inspection into pass/fail trends and compliance reporting.",
    outcome:
      "Manufacturers now measure garments in seconds with near-zero error, and QC managers get piece-level history instead of guesswork.",
    stack: ["OpenCV", "Python", "Laravel", "MySQL", "Windows EXE"],
    media: {
      kind: "image",
      src: magicqcDashboard,
      alt: "MagicQC quality-control dashboard showing garment measurement results and pass/fail rates",
    },
    href: "https://magicqc.online/",
  },
  {
    slug: "hsm-lead-routing",
    name: "Patient Lead Routing",
    discipline: "AI Automation",
    year: "2025",
    metric: { value: "Zero", label: "manual data entry" },
    problem:
      "A healthcare administration group was retyping every patient enquiry by hand. Leads arrived across WhatsApp, forms and calls, and slow replies meant a calendar with gaps in it.",
    built:
      "I built an n8n pipeline that captures every inbound enquiry, qualifies it with an LLM, and writes it straight into GoHighLevel. A WhatsApp chatbot handles first-touch lead generation in real time and books straight onto the calendar, with a human handover the moment a case looks clinical.",
    outcome:
      "Manual data entry is gone entirely, response times dropped sharply, and the booking calendar stays full without an administrator babysitting an inbox.",
    stack: ["n8n", "WhatsApp API", "GoHighLevel", "LLM routing", "Webhooks"],
    media: {
      kind: "schematic",
      caption: "Inbound enquiry to booked appointment, no human in the middle.",
      steps: [
        { label: "WhatsApp", role: "input" },
        { label: "n8n", role: "logic" },
        { label: "LLM qualify", role: "ai" },
        { label: "GoHighLevel", role: "output" },
      ],
    },
  },
  {
    slug: "fenix-brokers",
    name: "Fenix Brokers",
    discipline: "Full-Stack",
    year: "2026",
    metric: { value: "+50%", label: "client inquiries in 2 months" },
    problem:
      "A cosmetics broker needed far more than a brochure site. Products, quote requests, newsletters and user administration all lived in different places, or in nobody's hands at all.",
    built:
      "I shipped a full-stack B2B platform on Next.js and Supabase: a public catalog, an authenticated admin panel with role-based access, a media library, and a complete email-marketing suite with templates and open-rate tracking.",
    outcome:
      "Client inquiries rose 50% within two months of launch, and the team now runs catalog, quotes and campaigns from one authenticated place.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind", "Resend"],
    media: {
      kind: "image",
      src: fenixAdmin,
      alt: "Fenix Brokers authenticated admin dashboard showing product catalog management",
      focus: "center",
    },
    href: "https://fenix-brokers.vercel.app/",
  },
  {
    slug: "seo-automation-engine",
    name: "SEO Automation Engine",
    discipline: "AI Automation",
    year: "2025",
    metric: { value: "+45%", label: "organic traffic, zero extra effort" },
    problem:
      "Every new page cost hours of manual SEO: writing meta tags, picking keywords, wiring internal links. The work was repetitive, easy to get wrong, and always the first thing to slip.",
    built:
      "I built a self-hosted n8n workflow that watches for new content, generates meta tags and keyword sets with an LLM, proposes internal links against the existing sitemap, and publishes the result. Retries, error handling and an audit trail are built in, so a failed run is visible rather than silent.",
    outcome:
      "Organic traffic grew 45% with no additional effort from the team. The workflow runs silently in the background and has needed no babysitting.",
    stack: ["n8n", "LangChain", "OpenAI", "Vector search", "Docker"],
    media: {
      kind: "schematic",
      caption: "A workflow that runs silently, with retries and an audit trail.",
      steps: [
        { label: "New page", role: "input" },
        { label: "n8n trigger", role: "logic" },
        { label: "LLM meta + keywords", role: "ai" },
        { label: "Publish", role: "output" },
      ],
    },
  },
  {
    slug: "animated-film-network",
    name: "Animated Film Network",
    discipline: "Full-Stack",
    year: "2025",
    metric: { value: "Daily", label: "publishing, no rebuild" },
    problem:
      "A global animation news outlet published daily on a legacy PHP stack. The front end was slow to update, dated to read, and every change risked the editorial workflow.",
    built:
      "I layered a fast Vite and React front end cleanly over the existing PHP backend, leaving the editorial workflow untouched. No migration, no rewrite, no retraining the newsroom.",
    outcome:
      "Editors publish daily with no rebuild step, and readers get a fast, content-rich experience on every device.",
    stack: ["Vite", "React", "PHP", "REST"],
    media: {
      kind: "image",
      src: afnHero,
      alt: "Animated Film Network homepage showing a content-rich animation news layout",
    },
    href: "https://animatedfilmnetwork.com/",
  },

  /**
   * RentMind: named in the brief but absent from the croge repo, so there is no
   * verified problem, build detail, outcome or screenshot to draw on. Held as a
   * draft (excluded from render) rather than filled with invented copy.
   * TODO(abdullah): supply problem, what you built, a real outcome metric,
   * stack and a screenshot, then remove `draft`.
   */
  {
    slug: "rentmind",
    name: "RentMind",
    discipline: "AI Automation",
    year: "TODO",
    metric: { value: "TODO", label: "TODO" },
    problem: "TODO",
    built: "TODO",
    outcome: "TODO",
    stack: [],
    media: {
      kind: "schematic",
      caption: "TODO",
      steps: [
        { label: "Input", role: "input" },
        { label: "Agent", role: "ai" },
        { label: "Output", role: "output" },
      ],
    },
    draft: true,
  },
];

/** Only fully-sourced projects reach the page. */
export const selectedWork = projects.filter((p) => !p.draft);
