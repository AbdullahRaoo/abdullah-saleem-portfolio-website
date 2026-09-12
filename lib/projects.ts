import type { StaticImageData } from "next/image";

import afGestionesShot from "@/public/projects/af-gestiones/shot.webp";
import afnShot from "@/public/projects/animated-film-network/shot.webp";
import canastaShot from "@/public/projects/canasta-shop/shot.webp";
import desguacesShot from "@/public/projects/desguaces-el-sebadal/shot.webp";
import espShot from "@/public/projects/espconsultores/shot.webp";
import fenixAdmin from "@/public/projects/fenix-brokers/admin-panel.png";
import ferretiendaShot from "@/public/projects/ferretienda-perez/shot.webp";
import hsmWhatsapp from "@/public/projects/hsm-lead-routing/whatsapp.webp";
import libreriaShot from "@/public/projects/libreria-atlantic/shot.webp";
import magicqcDashboard from "@/public/projects/magicqc/qc-dashboard.png";
import nhShot from "@/public/projects/nh-podologo/shot.webp";
import ppeAnalytics from "@/public/projects/ppe-monitoring/analytics.webp";
import ppeDashboard from "@/public/projects/ppe-monitoring/dashboard.webp";
import ppeDetection from "@/public/projects/ppe-monitoring/detection.webp";
import ppeSiteFeed from "@/public/projects/ppe-monitoring/site-feed.webp";
import ppeSites from "@/public/projects/ppe-monitoring/sites.webp";
import palazzoShot from "@/public/projects/palazzo-del-benessere/shot.webp";
import transGaviasShot from "@/public/projects/trans-las-gavias/shot.webp";
import transportesShot from "@/public/projects/transportes-diego/shot.webp";
import uavGroundStation from "@/public/projects/uav-sar/ground-station.webp";
import uavMissionMap from "@/public/projects/uav-sar/mission-map.webp";
import uavSimulation from "@/public/projects/uav-sar/simulation.webp";
import uavTracking from "@/public/projects/uav-sar/tracking.webp";
import vanshirShot from "@/public/projects/vanshir/shot.webp";
import tryOnShot from "@/public/projects/virtual-try-on/try-on.webp";

/**
 * Case-study content.
 *
 * `FEATURED_ORDER` at the bottom of this file picks and orders the eight that
 * lead the home page. Everything here shows on /work, and every project has its
 * own detail page at /work/<slug>.
 *
 * Honesty rule: every headline metric is either a hard number or a truthful
 * qualitative label. Where a real number exists but is not in hand, the
 * headline stays qualitative and a TODO marks what to add. Nothing is invented.
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
      focus?: "top" | "center";
    }
  | { kind: "schematic"; steps: SchematicStep[]; caption: string };

/** An extra frame on the case-study page. Card media stays the single lead image. */
export type GalleryShot = {
  src: StaticImageData;
  alt: string;
  /** Says what the reader is looking at. Without it a screenshot is decoration. */
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  discipline: string;
  year: string;
  /** One plain-English line anyone can understand: what this project actually is. */
  whatItIs: string;
  metric: { value: string; label: string };
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  media: Media;
  /** Extra frames, shown only on the case-study page. */
  gallery?: GalleryShot[];
  href?: string;
  /** Draft entries are excluded everywhere until content lands. */
  draft?: boolean;
};

export const projects: Project[] = [
  // ---------------------------------------------------------------- featured
  {
    slug: "ppe-monitoring",
    name: "PPE Monitoring Vision System",
    discipline: "Computer Vision & Platform",
    year: "2026",
    whatItIs:
      "Site cameras that check every worker is wearing their hard hat and vest, and a dashboard where a safety team watches compliance across every site and gets alerted the moment someone is not.",
    // TODO(abdullah): swap for a hard number once a client clears it (sites
    // live, cameras running, detection accuracy on their footage). The figures
    // inside the dashboard screenshots are seeded demo data, not claims.
    metric: { value: "Multi-site", label: "live compliance monitoring" },
    problem:
      "PPE compliance on an industrial site is checked by a supervisor walking around with a clipboard. It is intermittent by definition, it produces no record worth auditing, and the violation nobody saw is the one that ends in an incident report.",
    built:
      "Two halves, both mine. The vision side detects people and classifies PPE per worker from the site camera feed, flagging Hardhat against No-Hardhat frame by frame. The platform side is the product around it: a Next.js dashboard with per-site compliance rates, weekly trends, a live monitoring wall, a violation log, and user management with roles, so a safety lead runs it without ever seeing a model.",
    outcome:
      "Compliance stops being a clipboard round and becomes a number the safety team can watch, per site, with every violation timestamped and logged instead of missed.",
    stack: ["YOLO", "PyTorch", "OpenCV", "Next.js", "TypeScript", "Recharts"],
    media: {
      kind: "image",
      src: ppeSiteFeed,
      alt: "A fixed site camera looking down a walkway, with three workers boxed in green and labelled Hardhat and one boxed in red and labelled No-Hardhat",
    },
    gallery: [
      {
        src: ppeDetection,
        alt: "Four workers at close range, three boxed in green and labelled Hardhat and the fourth boxed in red and labelled No-Hardhat while holding his helmet",
        caption:
          "Per-worker classification, not a single yes-or-no for the frame. The man holding his hard hat rather than wearing it is the case that matters.",
      },
      {
        src: ppeDashboard,
        alt: "PPE Monitor dashboard showing worker counts, compliance percentage, site performance bars, a weekly trend line and recent safety alerts",
        caption:
          "The overview a safety lead opens on: compliance by site, the weekly trend, and the alerts that came in today.",
      },
      {
        src: ppeSites,
        alt: "Site monitoring grid showing six sites, each with a live detection thumbnail, worker count, violation count and compliance bar",
        caption:
          "Every site as a live tile, each running the same detection. The numbers here are seeded demo data.",
      },
      {
        src: ppeAnalytics,
        alt: "PPE analytics page with compliance breakdowns and violation charts",
        caption: "The analytics layer: where violations cluster, by site and by equipment type.",
      },
    ],
  },
  {
    slug: "magicqc",
    name: "MagicQC",
    discipline: "Computer Vision",
    year: "2025",
    whatItIs:
      "A desktop app that measures garments from a camera to 0.2 cm, so quality control stops being slow, manual guesswork.",
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
    slug: "virtual-try-on",
    name: "Virtual Try-On",
    discipline: "Multimodal / VLM",
    year: "2024",
    whatItIs:
      "See how a garment actually looks on you before buying, rendered by a vision-language model that reasons about fit.",
    // TODO(abdullah): add a real metric (render time, or conversion lift if a
    // client shares it). The sample renders are real output from the system.
    metric: { value: "VLM", label: "vision-language try-on" },
    problem:
      "Shoppers cannot tell how a garment will actually sit on them from a product photo, and static size charts do not answer the question either.",
    built:
      "I built a virtual try-on system on vision-language models: it reads a person image and a target garment, reasons about fit and drape, and renders the garment onto the person rather than pasting a flat overlay.",
    outcome:
      "A working try-on pipeline that treats the garment as something to understand, not just composite, giving shoppers a realistic preview before they buy.",
    stack: ["Python", "PyTorch", "VLM", "Diffusion", "ONNX"],
    media: {
      kind: "image",
      src: tryOnShot,
      alt: "Virtual try-on result: the person on the left, the target striped shirt in the middle, and the rendered result on the right wearing it",
    },
  },
  {
    slug: "uav-sar",
    name: "UAV Search & Rescue",
    discipline: "Computer Vision",
    year: "2024",
    whatItIs:
      "A search-and-rescue drone that spots people from the air on its own, deciding on-board in real time instead of streaming to a server.",
    // TODO(abdullah): add the on-aircraft figure. The 81.8 FPS in the gallery is
    // the simulation run, so it is captioned as such rather than used as the headline.
    metric: { value: "Real-time", label: "detection on the edge" },
    problem:
      "Search-and-rescue from a drone needs detection that runs on the aircraft in real time. Streaming video to a server and waiting is not an option when the compute and the link are both constrained.",
    built:
      "I built the autonomy and vision stack: YOLOv8 detection exported to ONNX and run on edge GPUs, wired into a ROS 2 system for autonomous flight, with detections distributed across compute so the aircraft decides on-board.",
    outcome:
      "Real-time on-board detection and autonomous search behaviour, with the heavy compute handled at the edge instead of a round-trip to a base station.",
    stack: ["ROS 2", "YOLOv8", "ONNX", "PyTorch", "Edge GPU"],
    media: {
      kind: "image",
      src: uavTracking,
      alt: "The simulated terrain the drone is flying over, beside a MOT tracking window holding a lock on a person, with the detection log streaming underneath",
    },
    gallery: [
      {
        src: uavGroundStation,
        alt: "SkyResQ ground control station: a dark mission map with the search area plotted, a live camera feed inset, and the mission planner panel on the right",
        caption:
          "The mission planner an operator flies from: draw the search area, set altitude and speed, upload to the aircraft.",
      },
      {
        src: uavMissionMap,
        alt: "SkyResQ ground control station showing connection, GPS, orientation and telemetry panels beside the map",
        caption:
          "The ground control station I built for the operator: connection, GPS lock, orientation and live telemetry in one view.",
      },
      {
        src: uavSimulation,
        alt: "Gazebo simulation of a street scene beside a YOLO window detecting two people at 81.8 FPS",
        caption:
          "Detection running against the simulated flight before it ever touches an aircraft. Two people held at 81.8 FPS.",
      },
    ],
  },
  {
    slug: "fenix-brokers",
    name: "Fenix Brokers",
    discipline: "Full-Stack Systems",
    year: "2026",
    whatItIs:
      "A full B2B platform for a cosmetics broker: product catalog, quote requests, an admin panel and email campaigns, all in one place.",
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
    slug: "hsm-lead-routing",
    name: "Patient Lead Routing",
    discipline: "Automation & CRM",
    year: "2025",
    whatItIs:
      "Patient enquiries reaching a hospital group on WhatsApp, forms and calls, answered in Spanish by a bot and booked onto the calendar with no manual typing.",
    metric: { value: "Zero", label: "manual data entry" },
    // TODO(abdullah): confirm the country before launch. You said Spain, but the
    // chat screenshot names Hospital Santa Margarita at an address in San Luis
    // Rio Colorado, Sonora, which is Mexico. The copy stays country-neutral
    // until you confirm which is right.
    problem:
      "A hospital group was retyping every patient enquiry by hand. Enquiries arrived across WhatsApp, web forms and calls, admin staff moved them into the system one at a time, and a slow reply meant a booking calendar with gaps in it.",
    built:
      "I built an n8n pipeline that captures every inbound enquiry, qualifies it with an LLM, and writes it straight into GoHighLevel. A WhatsApp chatbot handles the first touch in real time, in the patient's own language, and books onto the calendar directly, with a handover to a human the moment a case looks clinical rather than administrative.",
    outcome:
      "Manual data entry is gone entirely, response times dropped sharply, and the booking calendar stays full without an administrator babysitting an inbox.",
    stack: ["n8n", "WhatsApp API", "GoHighLevel", "LLM routing", "Webhooks"],
    media: {
      kind: "image",
      src: hsmWhatsapp,
      alt: "A real WhatsApp conversation with the HSM bot in Spanish: a patient asks about gynecology, bone density scans, CT with contrast, the clinic location and a doctor's hours, and gets a direct answer to each with an offer to book",
    },
  },

  // ----------------------------------------------------------------- archive
  {
    slug: "seo-automation-engine",
    name: "SEO Automation Engine",
    discipline: "Automation",
    year: "2025",
    whatItIs:
      "A workflow that writes the meta tags, keywords and internal links for every new page automatically, and quietly keeps doing it.",
    metric: { value: "+45%", label: "organic traffic, no extra effort" },
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
    discipline: "Full-Stack Systems",
    year: "2025",
    whatItIs:
      "A daily animation news site, rebuilt with a fast modern front end over the publisher's existing backend.",
    metric: { value: "Daily", label: "publishing, no rebuild step" },
    problem:
      "A global animation news outlet published daily on a legacy PHP stack. The front end was slow to update, dated to read, and every change risked the editorial workflow.",
    built:
      "I layered a fast Vite and React front end cleanly over the existing PHP backend, leaving the editorial workflow untouched. No migration, no rewrite, no retraining the newsroom.",
    outcome:
      "Editors publish daily with no rebuild step, and readers get a fast, content-rich experience on every device.",
    stack: ["Vite", "React", "PHP", "REST"],
    media: {
      kind: "image",
      src: afnShot,
      alt: "Animated Film Network homepage showing a content-rich animation news layout",
    },
    href: "https://animatedfilmnetwork.com/",
  },
  {
    slug: "espconsultores",
    name: "ESPConsultores",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A bilingual site for a data-protection consultancy, explaining their GDPR services clearly enough to turn visitors into consultation requests.",
    metric: { value: "Bilingual", label: "GDPR-compliant enterprise site" },
    problem:
      "Their previous site did not reflect the professionalism clients expect from a data-protection firm, and it did not clearly explain their GDPR and LOPD services.",
    built:
      "I built a clean, trustworthy bilingual site that communicates their compliance services plainly and turns visitors into consultation requests, delivered on time and on budget.",
    outcome: "A credible presence for a compliance audience, with more consultation requests after launch.",
    stack: ["WordPress", "PHP", "MySQL"],
    media: {
      kind: "image",
      src: espShot,
      alt: "ESPConsultores homepage for a GDPR compliance consultancy",
    },
    href: "https://espconsultores.com/",
  },
  {
    slug: "palazzo-del-benessere",
    name: "Palazzo del Benessere",
    discipline: "E-commerce",
    year: "2024",
    whatItIs:
      "An online store for a wellness practice, selling products, courses and remote consultations to an international audience.",
    metric: { value: "3 in 1", label: "products, courses, consultations" },
    problem:
      "A holistic-wellness practice needed to translate itself into a calming online space that could sell products, courses and remote consultations internationally.",
    built:
      "I built a WooCommerce platform that sells products, courses and consultations, and explains their 6D Scan and remote services clearly.",
    outcome: "A calm, reassuring storefront with genuinely international reach.",
    stack: ["WordPress", "WooCommerce", "PHP"],
    media: {
      kind: "image",
      src: palazzoShot,
      alt: "Palazzo del Benessere wellness e-commerce homepage",
    },
    href: "https://palazzodelbenessere.com/",
  },
  {
    slug: "desguaces-el-sebadal",
    name: "Desguaces El Sebadal",
    discipline: "E-commerce",
    year: "2024",
    whatItIs:
      "A searchable used car-parts catalogue with a request system, so customers can find a part instead of phoning to ask.",
    metric: { value: "Searchable", label: "parts catalog + requests" },
    problem:
      "An auto-salvage business needed customers to find parts and services easily, and to handle part requests and vehicle deregistration enquiries online.",
    built:
      "I built a searchable used-parts catalog with an integrated request system and clear service information.",
    outcome: "More calls and foot traffic to the yard, with fewer repetitive phone enquiries.",
    stack: ["WordPress", "WooCommerce", "PHP"],
    media: {
      kind: "image",
      src: desguacesShot,
      alt: "Desguaces El Sebadal used auto parts catalog homepage",
    },
    href: "https://www.desguacesebadal.com/",
  },
  {
    slug: "canasta-shop",
    name: "Canasta Shop",
    discipline: "E-commerce",
    year: "2024",
    whatItIs:
      "A store for handmade Spanish espadrilles that tells the maker's story and ships across the EU.",
    metric: { value: "EU-wide", label: "shipping, sales up since launch" },
    problem:
      "A maker of traditional Spanish espadrilles wanted to reach a global audience while telling its story of craftsmanship and sustainable materials.",
    built:
      "I built an online store that leads with the story of how the shoes are made and sells across the European Union.",
    outcome: "Online sales grew significantly after launch, with the craft story doing the selling.",
    stack: ["HTML5", "Tailwind", "E-commerce"],
    media: {
      kind: "image",
      src: canastaShot,
      alt: "Canasta Shop handmade espadrilles online store",
    },
    href: "https://canastashop.es/inicio",
  },
  {
    slug: "libreria-atlantic",
    name: "Librería Atlántic",
    discipline: "E-commerce",
    year: "2024",
    whatItIs:
      "An online shop for a stationery and bookshop, opening a second sales channel for the back-to-school rush.",
    metric: { value: "New channel", label: "handles the seasonal peak" },
    problem:
      "A stationery and bookshop needed an online channel to showcase its range and reach more local customers, especially during the back-to-school rush.",
    built:
      "I built a functional, easy online store for their school, office and art supplies.",
    outcome: "A new local sales channel that absorbs the seasonal peak instead of buckling under it.",
    stack: ["HTML5", "Tailwind", "E-commerce"],
    media: {
      kind: "image",
      src: libreriaShot,
      alt: "Libreria Atlantic stationery and bookshop online store",
    },
    href: "https://libreriatlantic.es/inicio",
  },
  {
    slug: "ferretienda-perez",
    name: "Ferretienda Pérez",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A site for a construction-materials supplier, built to show an extensive catalogue and win commercial clients.",
    metric: { value: "24h", label: "delivery promise, front and centre" },
    problem:
      "A construction-materials supplier needed a modern site that showcased an extensive catalog and built trust with commercial clients.",
    built:
      "I built a fast, catalog-driven site that shows their materials and communicates quality and a 24-hour delivery promise.",
    outcome: "A central part of daily operations, and a steady source of new commercial clients.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: ferretiendaShot,
      alt: "Ferretienda Perez construction materials supplier homepage",
    },
    href: "https://ferretiendaperez.es/inicio",
  },
  {
    slug: "trans-las-gavias",
    name: "Trans Las Gavias",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A site for a construction and renovation firm, built to make homeowners confident enough to enquire about big jobs.",
    metric: { value: "More", label: "quality leads after launch" },
    problem:
      "A construction and renovation business needed a website that builds confidence with homeowners considering bigger projects.",
    built:
      "I built a clean, professional site that presents their services clearly, from roof repairs to full kitchen renovations.",
    outcome: "A strong increase in quality leads, from people who already trust the work before calling.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: transGaviasShot,
      alt: "Trans Las Gavias construction and renovation homepage",
    },
    href: "https://www.translasgavias.es/inicio",
  },
  {
    slug: "transportes-diego",
    name: "Transportes Diego Cárdenes",
    discipline: "Web Platform",
    year: "2024",
    whatItIs: "A site for a logistics company that makes its range of services easy to understand at a glance.",
    metric: { value: "Steady", label: "stream of new enquiries" },
    problem:
      "A logistics company needed a professional site that clearly communicated its range of services to potential clients.",
    built:
      "I delivered a fast, user-friendly site with a clean layout that makes the company's expertise easy to understand.",
    outcome: "A steady stream of new enquiries, and a presence that reads as reliable.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: transportesShot,
      alt: "Transportes Diego Cardenes logistics company homepage",
    },
    href: "https://transportesdiegocardenes.es/inicio",
  },
  {
    slug: "vanshir",
    name: "Vanshir",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A showcase for a bespoke wedding-dress atelier, built so the craft is the first thing you notice.",
    metric: { value: "Lift", label: "in enquiries and bookings" },
    problem:
      "VanShir's online presence did not do justice to their craft of custom wedding dresses and alterations.",
    built:
      "I built an elegant site that showcases their bespoke designs and makes it easy to browse and enquire.",
    outcome: "A noticeable lift in enquiries and bookings once the work was shown properly.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: vanshirShot,
      alt: "Vanshir bespoke wedding dress atelier homepage",
    },
    href: "https://vanshir.es/inicio",
  },
  {
    slug: "nh-podologo",
    name: "NH Podólogo",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A clean site for a podiatry clinic, built so patients can understand the services and book without friction.",
    metric: { value: "Clearer", label: "path from visit to booking" },
    problem:
      "A podiatry clinic needed a simple, trustworthy site that made it easy for patients to understand services and book appointments.",
    built:
      "I built a clean, responsive site with clear service presentation and prominent contact details.",
    outcome: "An easier clinic to find and book, and a stronger local presence.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: nhShot,
      alt: "NH Podologo podiatry clinic homepage",
    },
    href: "https://www.nhpodologo.es/",
  },
  {
    slug: "af-gestiones",
    name: "AF Gestiones",
    discipline: "Web Platform",
    year: "2024",
    whatItIs:
      "A straightforward site for a property-management firm, laying out services so owners can see the value quickly.",
    metric: { value: "Credibility", label: "in the local market" },
    problem:
      "A property-management firm needed a clean site that outlined services so owners could find them and understand their value.",
    built:
      "I built a straightforward, professional site that presents their property-management services clearly.",
    outcome: "Stronger credibility in the local market, and easier to find for owners in Canarias.",
    stack: ["HTML5", "Tailwind"],
    media: {
      kind: "image",
      src: afGestionesShot,
      alt: "AF Gestiones property management homepage",
    },
    href: "https://afgestiones.es/inicio",
  },

  /**
   * RentMind: named in an earlier brief but with no verified problem, build,
   * outcome or screenshot to draw on. Held as a draft (excluded everywhere)
   * rather than filled with invented copy.
   * TODO(abdullah): supply the details and a screenshot, then remove `draft`.
   */
  {
    slug: "rentmind",
    name: "RentMind",
    discipline: "AI",
    year: "TODO",
    whatItIs: "TODO",
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
        { label: "Model", role: "ai" },
        { label: "Output", role: "output" },
      ],
    },
    draft: true,
  },
];

/** Everything publishable, newest work first as authored. */
export const allWork = projects.filter((p) => !p.draft);

/** The six that lead the home page. */
/**
 * The lead order on the home page, curated rather than array order.
 *
 * Most of the shipped work is full-stack, so the front page opens on a platform
 * and alternates from there. Computer vision is the differentiator and stays
 * prominent, but it no longer implies the whole practice is cameras.
 */
const FEATURED_ORDER = [
  "fenix-brokers",
  "ppe-monitoring",
  "virtual-try-on",
  "animated-film-network",
  "magicqc",
  "hsm-lead-routing",
  "uav-sar",
  "palazzo-del-benessere",
] as const;

export const selectedWork = FEATURED_ORDER.map((slug) => {
  const project = allWork.find((p) => p.slug === slug);
  if (!project) throw new Error(`FEATURED_ORDER names a missing project: ${slug}`);
  return project;
});

export function getProject(slug: string) {
  return allWork.find((p) => p.slug === slug);
}
