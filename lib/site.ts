/**
 * Single source of truth for identity, contact and social links.
 *
 * `email` routes through the custom domain. Set up the forwarding rule for
 * hi@abdullahsaleem.dev before launch, or swap this one line back to the
 * Gmail address. Every mailto: on the site reads from here.
 */
export const site = {
  name: "Abdullah Saleem",
  role: "AI Engineer & Full-Stack Developer",
  url: "https://abdullahsaleem.dev",
  email: "hi@abdullahsaleem.dev",
  emailFallback: "abdullahsaleem75911@gmail.com",

  title: "Abdullah Saleem — AI Engineer & Full-Stack Developer",
  description:
    "I build AI systems that do the work: agents, automations and RAG chatbots, backed by full-stack delivery. 4+ years, 120+ projects shipped, 80+ clients.",

  /** The one primary action. Same label, same target, every time it appears. */
  cta: {
    label: "Start a project",
    subject: "Project enquiry",
  },

  /**
   * Portrait. Hiring an individual is a trust decision about a person, so the
   * face does more work here than any other single asset.
   *
   * Currently a labelled placeholder. To use the real headshot: save it as
   * public/abdullah-source.png, run `npm run photo` (chroma-keys the backdrop
   * out to transparency), then point this at "/abdullah.png".
   */
  photo: "/abdullah.jpg",

  /**
   * Shown beside the contact CTA to reduce hesitation at the moment of action.
   * Only true statements belong here. Edit or empty these if they stop holding.
   */
  availability: "Taking on new projects",
  responseTime: "Usually replies within a day",

  /**
   * Honest provenance for the client quotes. They were given for work delivered
   * through the agency, and the site says so rather than implying solo credit.
   */
  proofNote: "Client feedback on work I delivered, solo and through my agency, Croge.",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "About", href: "#about" },
  ],

  /**
   * `upwork` stays null until the profile URL is supplied. Every consumer
   * filters on href, so an unset link simply does not render rather than
   * shipping a dead anchor.
   */
  links: {
    github: "https://github.com/AbdullahRaoo",
    fiverr: "https://www.fiverr.com/abdullah_oar",
    linkedin: "https://www.linkedin.com/in/abdullah-saleem-r",
    upwork: null as string | null,
  },

  /** Mono stat strip under the hero. Proof before the visitor has to scroll. */
  stats: [
    { value: "4+", label: "Years" },
    { value: "120+", label: "Projects" },
    { value: "80+", label: "Clients" },
    { value: "Level 2", label: "Fiverr Seller" },
  ],
} as const;

export type SocialLink = { label: string; href: string; note?: string };

/** Social links, minus any that have no URL yet. */
export function socialLinks(): SocialLink[] {
  const { github, fiverr, linkedin, upwork } = site.links;
  const all: (SocialLink | null)[] = [
    { label: "Fiverr", href: fiverr, note: "Level 2 Seller" },
    { label: "GitHub", href: github },
    { label: "LinkedIn", href: linkedin },
    upwork ? { label: "Upwork", href: upwork } : null,
  ];
  return all.filter((l): l is SocialLink => l !== null);
}

/** Prefilled mailto for the primary action. Low friction: one click, subject set. */
export function mailto(subject: string = site.cta.subject): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
