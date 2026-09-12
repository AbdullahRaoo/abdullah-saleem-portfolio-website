# Abdullah Saleem, Personal Portfolio

A static Next.js 15 site positioning Abdullah Saleem as a **Full-Stack Developer and Computer Vision Engineer**. Full-stack leads because most of the shipped work is full-stack: admin platforms and ERP, B2B sites, storefronts and automation. Computer vision is the differentiator that sits alongside it, real-time detection deployed on real hardware, not the whole practice. Open to full-stack and CV roles, and select freelance.

The hero is the centrepiece: a cinematic, self-playing opening where the name resolves, a detection box locks onto a real photo of Abdullah, and an ERP dashboard slides in beside it. It is the argument, not decoration: the CV model and the system built around it, shown before a word is read.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # static export of every route
npm start            # serve the production build
```

Do not run `npm run build` while `npm run dev` is live. They share `.next/` and will corrupt each other's cache, which surfaces as phantom 400s on CSS chunks.

## Deploy to Vercel

Every page is prerendered; the only server route is `POST /api/contact`.

1. **Import**: [vercel.com/new](https://vercel.com/new), pick
   `AbdullahRaoo/abdullah-saleem-portfolio-website`. Framework detects as
   Next.js. Leave every build setting alone.
2. **Environment variables** (Project → Settings → Environment Variables),
   names in `.env.example`:
   - `RESEND_API_KEY` from [resend.com/api-keys](https://resend.com/api-keys).
     Until it is set the contact form returns a clear 503 and the UI falls back
     to the mailto link, so nothing is silently dropped, but nothing is
     delivered either.
   - `CONTACT_FROM` once a sender domain is verified on Resend. Without it the
     shared test sender is used, which tends to land in spam.

   Redeploy after adding either one.
3. **Domain** (Project → Settings → Domains): add `abdullahsaleem.dev`. Vercel
   prompts for `www.abdullahsaleem.dev` too, add both, and pick one as the
   redirect target. Vercel's own recommendation is `www` as the canonical host
   (an apex cannot be a CNAME, so `www` keeps their routing flexible); the apex
   is also fine. What matters is that `site.url` in `lib/site.ts` matches the
   one you pick, because it drives the canonical tags, OG URLs, `robots.txt`
   and the sitemap. It is set to `https://www.abdullahsaleem.dev`, matching the
   308 redirect configured in Vercel (apex → www). Reverse that redirect and
   this line has to move with it.

   Then set the records at name.com (**My Domains → abdullahsaleem.dev →
   Manage DNS Records**). Read the exact values off Vercel's domain card rather
   than copying them from here: the apex A record is usually `76.76.21.21`, but
   the `www` CNAME target is **per project** (something like
   `d1d4fc829fe7bc7c.vercel-dns-017.com`), not a shared hostname.

   | Type | Host | Answer |
   |---|---|---|
   | A | *(blank)* | the IP on Vercel's domain card |
   | CNAME | `www` | the per-project target on Vercel's domain card |

   **Delete the A record name.com ships by default first.** The apex currently
   points at `91.195.240.94`, a name.com parking page. Leaving it in place
   gives the apex two conflicting A records and Vercel will report an invalid
   configuration. Check that name.com URL forwarding is off for the apex too,
   since it overrides DNS.

CLI alternative: `npx vercel login`, then `npx vercel --prod` from the repo
root. Nothing in the build is Vercel-specific, so any Node host that runs
`next build` and `next start` works as well.

## Before you go live

A few things need you, not code.

| What | Where | Why |
|---|---|---|
| Email forwarding | `lib/site.ts` → `email` | The site mails `hi@abdullahsaleem.dev`. Set up the alias, or swap the line to `abdullahsaleem75911@gmail.com`. Until then the primary CTA goes nowhere. |
| Résumé PDF (optional) | `lib/site.ts` → `resumeUrl` | `null`, so every "Résumé" link stays hidden. Drop a PDF in `/public` and set the path; a Résumé button then appears next to the contact CTA. High value for hiring managers. |
| Upwork URL (optional) | `lib/site.ts` → `links.upwork` | `null`, so the link is filtered out rather than rendering dead. Set it and it appears in the trust strip, contact and footer. |
| Real CV project metrics | `lib/projects.ts` | PPE Monitoring, Virtual Try-On and UAV SAR ship with truthful qualitative headlines ("Multi-site", "Real-time") and `TODO` comments for the hard numbers. Add real figures when cleared to share. |

Also confirm these are true, since they sit next to the CTA: `availability` ("Open to full-stack and computer vision engineering roles (remote or Islamabad), and to select freelance work.") and `responseTime` ("I usually reply within a day.") in `lib/site.ts`.

### The hero photo

The detection hero and the About portrait both use `public/abdullah-cv.webp`, a transparent cut-out generated from the source headshot:

```bash
npm run photo:cv     # assets/source/abdulllahimage.svg  ->  public/abdullah-cv.webp
```

The source is not a plain photo: it is grayscale PNGs recombined through SVG `feColorMatrix` filters, so the script rasterizes it (filters and all), then keys out the teal disc in **HSV** (an RGB key punched holes in the navy suit, which sits close to teal in RGB space), despills the edge, and erodes a 2px alpha rim to remove the disc's anti-aliased ring. See `scripts/prepare-cv-photo.mjs`. To use a different source photo, replace the SVG (or adapt the script's input path) and re-run.

## Content

| File | Holds |
|---|---|
| `lib/site.ts` | Identity, links, email, `resumeUrl`, stats, CTA label, availability |
| `lib/projects.ts` | Six case studies (CV first), plus RentMind as an excluded draft |
| `lib/testimonials.ts` | Real client quotes, verbatim, keyed to the card they back |
| `lib/capabilities.ts` | The three pipeline lanes |

### Selected Work

The home page leads on eight, picked and ordered by `FEATURED_ORDER` at the bottom of `lib/projects.ts` rather than by array order: **Fenix Brokers** (full-stack B2B platform), **PPE Monitoring** (CV + dashboard), **Virtual Try-On** (VLM), **Animated Film Network** (full-stack), **MagicQC** (CV measurement), **Patient Lead Routing** (automation + CRM), **UAV Search & Rescue** (ROS 2 / edge), **Palazzo del Benessere** (e-commerce). A slug that names a missing project throws at build. Anything without a real screenshot falls back to a designed, labelled placeholder that renders its real pipeline (camera → model → logic → output).

Every headline metric is either a hard number or a truthful qualitative label. Where a real number exists but is not yet in hand, the headline stays qualitative and a `TODO` marks it. Nothing is invented. RentMind stays `draft: true` (excluded) for the same reason.

### Testimonials

Several source testimonials name the agency by brand. Rewriting a client's words would fabricate a quote, so those are excluded. The survivors already say "they" or "the team" and appear unedited, each attached to the case card whose metric it corroborates. `site.proofNote` discloses the work was delivered through the agency.

## shadcn / 21st.dev compatibility

The repo follows the shadcn structure so components from shadcn or 21st.dev paste in cleanly:

- `components/ui/*` is the alias target (`@/components/ui`). Keeping primitives there is what lets pasted components resolve their imports.
- `lib/utils.ts` exports `cn` (clsx + tailwind-merge), which nearly every such component imports.
- `components.json` is configured for Tailwind v4 (`"config": ""`, css-variables mode), so `npx shadcn@latest add <component>` works.

Note: the Spline "Interactive 3D" component from the original request was deliberately **not** used. A 3D robot is off-message for computer vision, that exact scene is a common template tell, and `@splinetool/runtime` (~1MB+ JS from an external origin) would break the Lighthouse scores. The bespoke detection hero (`components/detection-hero.tsx`) demonstrates the actual skill instead.

## Design notes

The identity is the **Vision Console** (generated fresh with tastemaker, technical mood, seed 41). Full detail in [DESIGN.md](DESIGN.md) and the contrast contract in `.tastemaker/style-lock.md`. The one rule everything serves: **exactly one warm colour on a cool page, spent on actions.**

- Cool teal-graphite structure (`primary #0a80a2`, `ink #080e11`) with one reserved warm signal: **orange** (`--signal`, `#e77e4c` dark / `#ba5620` light) for CTAs, the active detection box, and the single hero highlight word.
- `--signal-strong` is the warm *text* colour and flips to the darker burnt orange in light so the highlight word still clears WCAG AA. `--signal-ink` (the label on the orange fill) is near-black in dark, white in light.
- Light and dark are both first-class (`data-theme` on `<html>`, set before paint by `components/theme-script.tsx`, toggled from the nav). Client screenshots in Selected Work are darkened/drained in dark and drained/veiled in light via the `--media-*` tokens, so they never out-shout the CTA.

The hero is a **cinematic full-screen opening** (details in [DESIGN.md](DESIGN.md)): the name and designation resolve, the portrait blooms into the centre and a single detection box locks onto it, then it docks left and the ERP dashboard slides in on the right at a 38/62 split. It plays automatically in about 7s; any scroll, click or keypress fast-forwards it, and it is skipped on repeat visits in the same session and under `prefers-reduced-motion`. Selected Work (`components/sections/work.tsx`) leads each card with a plain "what it is" line and a full, uncropped visual, real screenshot or a labelled placeholder, with depth in a "How it works" disclosure.

Fonts are **Bricolage Grotesque** (display, bulky and characterful), **Hanken Grotesk** (body) and **DM Mono** (data only, kept off eyebrows/labels), chosen to avoid the template stacks. They load `display: "optional"`, so a font swap can never re-wrap the headline and shift layout.

Motion respects `prefers-reduced-motion` via a global rule that zeroes all animation and transition durations; the hero settles to a static split. The hero copy is static (never animated) so the `<h1>` paints immediately.

## Measured

Lighthouse against `npm start`:

| | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 | 0.002 |
| Mobile | 95 | 100 | 100 | 100 | 0 |

Mobile LCP is ~2.9s (the hero portrait, under Lighthouse's 4x CPU + slow-4G throttle; far faster on real networks). Contrast was verified computationally in both themes; the lowest ratio clears the 4.5:1 AA requirement. Anti-slop and motion scans (tastemaker) come back clean. No horizontal overflow at 360px.
