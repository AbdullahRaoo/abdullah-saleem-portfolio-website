/**
 * Single source of truth for identity, contact and social links.
 *
 * `email` routes through the custom domain. Set up the forwarding rule for
 * hi@abdullahsaleem.dev before launch, or swap this one line back to the
 * Gmail address. Every mailto: on the site reads from here.
 */
export const site = {
  name: "Abdullah Saleem",
  role: "Full-Stack Developer & Computer Vision Engineer",
  /**
   * The canonical host, and the one value that decides what goes in the
   * canonical tags, OG URLs, robots.txt and the sitemap.
   *
   * www, not the apex: the apex is configured in Vercel as a 308 redirect to
   * www, so pointing canonical at the apex would aim every canonical tag at a
   * URL that immediately redirects. If that redirect is ever reversed, this
   * line has to move with it.
   */
  url: "https://www.abdullahsaleem.dev",
  email: "hi@abdullahsaleem.dev",
  emailFallback: "abdullahsaleem75911@gmail.com",

  title: "Abdullah Saleem · Full-Stack Developer & Computer Vision Engineer",
  description:
    "I build the software a business runs on: ERP and admin platforms, B2B sites, storefronts and the automation between them. And when a product needs to see, I build the computer vision inside it, real-time detection that ships on real hardware.",

  /** The one primary action. Same label, same target, every time it appears. */
  cta: {
    label: "Get in touch",
    subject: "Let's talk",
  },

  /**
   * Portrait, used as the subject of the detection hero and in About. The cut-out
   * transparent WebP is generated from the source SVG by scripts/prepare-cv-photo.mjs
   * (`npm run photo:cv`).
   */
  photo: "/abdullah-cv.webp",

  /**
   * Optional CV/resume. Null hides every "Resume" link on the site (same pattern
   * as the optional social links). Drop a PDF in /public and set the path.
   * TODO(abdullah): add e.g. "/abdullah-saleem-cv.pdf".
   */
  resumeUrl: null as string | null,

  /**
   * Shown beside the contact CTA to reduce hesitation at the moment of action.
   * Only true statements belong here. Edit or empty these if they stop holding.
   */
  availability: "Open to full-stack and computer vision engineering roles (remote or Islamabad), and to select freelance work.",
  responseTime: "I usually reply within a day.",

  /**
   * Honest provenance for the client quotes. They were given for work delivered
   * through the agency, and the site says so rather than implying solo credit.
   */
  proofNote: "Client feedback on work I delivered, solo and with a team.",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "About", href: "/#about" },
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
