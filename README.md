# Abdullah Saleem — Personal Portfolio

A static Next.js 15 site positioning Abdullah Saleem as an AI engineer and full-stack developer who ships systems that run in production.

Separate from the croge agency site. Content was extracted from that repo and rewritten from agency voice ("we") into first person ("I"). The croge repo was read only, never modified.

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

The site is fully static (`○ (Static) prerendered as static content` for every route), so there is nothing to configure.

```bash
npm i -g vercel
vercel               # preview
vercel --prod        # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js; no build settings, no env vars.

After the first deploy:

1. Add `abdullahsaleem.dev` under **Project → Settings → Domains**.
2. `lib/site.ts` sets `url: "https://abdullahsaleem.dev"`. It feeds the canonical tag, Open Graph URL, sitemap and JSON-LD, so update it if the domain changes.

## Before you go live

Three things need you, not code.

| What | Where | Why |
|---|---|---|
| Email forwarding | `lib/site.ts` → `email` | The site mails `hi@abdullahsaleem.dev`. Set up the alias, or swap the line to `abdullahsaleem75911@gmail.com`. Until then the primary CTA goes nowhere. |
| Your photo | `public/abdullah.jpg` | Currently a placeholder that literally says "replace with photo". See below. |
| Upwork URL | `lib/site.ts` → `links.upwork` | It is `null`, so the link is filtered out everywhere rather than rendering dead. Set it and it appears in the trust strip, contact and footer. |

Also confirm these are still true, since they sit next to the CTA: `availability` ("Taking on new projects") and `responseTime` ("Usually replies within a day") in `lib/site.ts`.

### Adding your photo

```bash
# save the headshot as public/abdullah-source.png first
npm run photo
```

This chroma-keys the flat backdrop to transparency, despills the edges so no colour fringe survives around the hair, trims and resizes to 900x1125. Tune with `--tolerance` and `--feather` if the cut is too tight or too loose:

```bash
npm run photo -- --tolerance 70 --feather 40
```

Then set `photo: "/abdullah.png"` in `lib/site.ts`.

## Content

| File | Holds |
|---|---|
| `lib/site.ts` | Identity, links, email, stats, CTA label, availability |
| `lib/projects.ts` | The five case studies, plus RentMind as an excluded draft |
| `lib/testimonials.ts` | Three real client quotes, verbatim |
| `lib/capabilities.ts` | The three pipeline lanes |

### RentMind

`lib/projects.ts` carries a RentMind entry with `draft: true`, which excludes it from the page. The brief named it, but nothing about it exists in the croge repo, so there was no verified problem, build detail, outcome or screenshot to draw on and none was invented. Fill in the `TODO` fields and delete `draft` to publish it.

### Testimonials

Several croge testimonials name the agency by brand. Rewriting a client's words to say "Abdullah" would fabricate a quote, so those are excluded. The three that survive already say "they" or "the team" and appear here unedited, each attached to the case card whose metric it corroborates. `site.proofNote` discloses that the work was delivered through the agency.

## Design notes

The one rule everything else serves: **exactly one warm colour on a cool page, spent only on actions.**

- `--signal` (brass `#D2A24C`) is a *fill*: primary buttons, the active AI node in the graph. Never decorative.
- `--signal-strong` is a *text* colour, and it differs by theme. Brass text on a near-white background is about 2.1:1 and fails WCAG AA outright, so light mode darkens it to a deep bronze (`#7A5312`, 6.3:1) while the button fill stays brass.
- Client screenshots are bright, saturated light-mode UIs, and one is full-colour illustration. Untreated they out-shout the CTA and break the whole mechanic. The `--media-*` tokens darken and drain them in dark mode, and drain and veil them in light. Everything lifts on hover.

The signature element is the hero's automation flow graph: a webhook and a WhatsApp message feed an n8n workflow, which calls an AI agent, which writes to a CRM, with a brass pulse riding the wire. The motif repeats as section dividers, as the capability lanes, and as the schematic on the two pipeline case cards that have no screenshot worth showing.

Fonts are Chivo, Libre Franklin and Martian Mono. They are loaded `display: "optional"`, not `"swap"`: swapping re-wrapped the headline and shoved the stat strip down, which was the entire mobile CLS (0.115, over the 0.1 budget).

Motion is one orchestrated moment (the graph wiring itself, then pulsing) plus a single scroll reveal reused everywhere. The hero copy is deliberately *not* animated, because Framer Motion renders its initial state into the server HTML and that would ship the `<h1>` at `opacity:0`. `prefers-reduced-motion` freezes the pulse, holds the graph static and disables reveals.

## Measured

Lighthouse against `npm start`, both presets:

| | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| Mobile | 100 | 100 | 100 | 100 | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0 |

Contrast was verified computationally in both themes, not by eye. Lowest ratio anywhere is 5.51:1 against a 4.5:1 requirement. No horizontal overflow at 360px.
