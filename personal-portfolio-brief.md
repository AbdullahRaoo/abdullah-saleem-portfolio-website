# Abdullah Saleem — Personal Portfolio: Design & Build Brief

A detailed spec for a distinctive, high-converting personal portfolio. This is the thinking and the decisions. The companion file `claude-code-prompt.md` is the paste-ready instruction for Claude Code on your PC.

---

## 1. OBJECTIVE & POSITIONING

Build a personal portfolio (separate from the croge agency site) that positions me, Abdullah Saleem, as an AI Engineer and Full-Stack Developer who builds AI systems that actually run in production, not demos.

- **Not** a generic "hi I'm a developer, here are some projects" template.
- The angle: **"I build AI systems that do the work."** Automations, agents, and pipelines, backed by full-stack delivery.
- Credibility anchors: 4+ years, 120+ projects, 80+ clients, Level 2 Fiverr seller.

## 2. AUDIENCE & THE PAGE'S ONE JOB

- **Primary audience:** serious clients (founders, B2B ops leads, agencies) deciding whether to hire me for AI automation or full-stack work.
- **Secondary:** technical recruiters.
- **One job:** in ~15 seconds, convince a high-intent visitor I build real working systems, then move them to contact me.
- Every section is measured against that job. If a section does not build trust or drive contact, cut it.

## 3. DESIGN DIRECTION (the concept)

Engineered, precise, and alive. The site should feel like looking at a well-built system: dark, calm, technical, with one warm signal color that guides every action. The hero opens on the most characteristic thing in my world, a live automation flow (input node to AI node to output node) with a pulse traveling the wire, echoing the LangChain and n8n pipelines I actually build. That living flow is the signature; everything else stays quiet and disciplined around it.

Deliberately avoided (current AI-portfolio clichés): cream background + high-contrast serif + terracotta; near-black + acid-green; newspaper hairline broadsheet. This direction is ink + reserved amber + a technical grotesk, which is a choice made for this subject.

## 4. COLOR SYSTEM (hex + role + why)

Reserve the single warm, high-arousal color for actions only. Everything else is cool and neutral so the eye is pulled to exactly what I want clicked. This is the core conversion mechanic.

| Token | Hex | Role | Rationale |
|---|---|---|---|
| `--ink` | `#0B0D12` | Page background | Deep near-black with a blue undertone. Reads premium, technical, trustworthy, not a flat pure black. |
| `--surface` | `#141821` | Cards, raised panels | Subtle lift from the base for depth. |
| `--line` | `#232A38` | Borders, wires, dividers | Quiet structure. |
| `--text` | `#ECEFF4` | Primary text | High legibility on ink. |
| `--muted` | `#8B94A6` | Secondary text, captions | Recedes; supports hierarchy. |
| `--signal` | `#F6B23C` | PRIMARY CTAs, active nodes, key highlight ONLY | Warm amber is high-arousal and action-driving. Because it is the only warm color on a cool page, it owns attention. Never use it for decoration. |
| `--signal-ink` | `#0B0D12` | Text on amber buttons | Dark text on amber for max contrast and salience. |

Optional accent for the graph wires only (kept cool so it recedes behind amber): `--wire: #4C6FFF` at low opacity. If it competes with amber, drop it and make wires `--line`.

**Rule:** amber appears in the hero highlight and on primary buttons. That is it. Spending boldness in one place is what makes it convert.

## 5. TYPOGRAPHY

Avoid the high-contrast serif display (an AI tell). Use a technical grotesk with character, a clean body, and a mono for labels and data, which grounds the type in my dev/terminal world.

- **Display (headlines):** Clash Display (Fontshare, free commercial). Confident, modern, geometric. Used with restraint at large sizes.
- **Body:** Inter (Google Fonts). Neutral, legible, professional.
- **Mono / utility (eyebrows, tags, stats, code snippets):** JetBrains Mono (Google Fonts). Encodes the engineering identity.

Alternate if Clash feels off: Bricolage Grotesque (Google Fonts) for display.

**Type scale (desktop):** hero headline ~64 to 80px / display / tight leading; section titles ~34 to 40px; body ~17px / 1.65; eyebrows and tags ~13px mono / uppercase / letter-spaced. Mobile scales down proportionally (hero ~40px).

## 6. LAYOUT & SECTIONS

Hero wireframe (desktop):

```
+---------------------------------------------------------------+
|  ABDULLAH SALEEM            work  capabilities  about  [Contact]|
|                                                               |
|  eyebrow: AI ENGINEER / FULL-STACK DEVELOPER                  |
|                                                               |
|  I build AI systems                  [ live flow canvas ]     |
|  that do the work.                   ( input )--o--( AI )     |
|                                            \         |        |
|  one-line subhead about outcomes.           `--o--( output )  |
|                                          pulse travels wire    |
|  [ Start a project ]  view work ->                            |
|                                                               |
|  --- 4+ YRS --- 120+ PROJECTS --- 80+ CLIENTS --- LVL 2 ---   |
+---------------------------------------------------------------+
```

Section order (each with its content source):

1. **Hero** with live flow signature + primary CTA + stat strip (mono). Content: written fresh (see copy below).
2. **Trust strip:** Fiverr Level 2, GitHub, LinkedIn, client count. Small, above the fold or right under hero.
3. **Selected Work** (3 to 5 case cards, asymmetric, not a plain grid). Each card: project name, one-line problem, what I built, outcome, tech tags (mono), links. **Source: extract from the croge repo at D:\work\react\croge** (RentMind, Hospital Santa Margarita, Fenix Brokers, AI SEO Engine, MagicQC, etc.). Reuse real descriptions and images.
4. **Capabilities** as three pipeline lanes: AI & Automation / Full-Stack / Cloud & Deployment. Echo the flow motif (nodes as skills).
5. **About** short and credible: who I am, how I work, the systems-that-ship philosophy.
6. **Contact CTA** strong, amber, low friction: a clear primary action (email or booking) + GitHub/LinkedIn/Fiverr/Upwork links.
7. **Footer:** repeat nav, socials, minimal.

## 7. SIGNATURE ELEMENT (the one memorable thing)

An ambient **automation flow / node graph**:
- In the hero: 3 to 5 nodes connected by wires, with a glowing amber pulse (a "token") traveling from an input node through an AI node to an output node, looping slowly.
- Reused subtly as section transitions: a thin wire that "draws" as you scroll into a section.
- In Capabilities: skills rendered as connected nodes rather than a flat list.
- Keep it calm. Slow, low-opacity, never distracting. It should feel like a system idling, not a screensaver.

## 8. MOTION PLAN (restrained)

- **Page load:** hero nodes fade in, wire draws, pulse starts. One orchestrated moment, not scattered effects.
- **Scroll:** work cards reveal on enter (subtle fade + 12px rise). Section wires draw in.
- **Hover:** work card lifts slightly, its wire/border picks up a faint amber edge. Buttons have a clean, fast state change.
- **Respect `prefers-reduced-motion`:** freeze the pulse, show the graph static, disable reveals. Non-negotiable.
- Caution: over-animation reads AI-generated. When unsure, do less.

## 9. CONVERSION & COLOR-PSYCHOLOGY PRINCIPLES (baked in)

- **One reserved action color.** Amber = "click here." Nothing else is amber. The eye always finds the CTA.
- **High-contrast CTAs.** Dark text on amber for maximum salience.
- **Multiple, consistent CTAs.** Hero, after Selected Work, sticky in nav, and footer. Same label and same action everywhere ("Start a project").
- **Social proof near actions.** Put Level 2 Fiverr, client count, and (later) review counts close to CTAs to reduce hesitation.
- **Trust early.** Stats and proof visible before the visitor has to scroll far.
- **Scannability.** Clear hierarchy, generous whitespace, short lines, mono labels to guide the eye.
- **Single primary action per screen.** Secondary actions (view work, GitHub) are visually quieter (ghost/text buttons), never amber.
- **Specific outcomes over adjectives.** "Auto-routes patient leads and books appointments" beats "innovative solutions."

## 10. TECH STACK & STRUCTURE

- **Framework:** Next.js 15 (App Router) + TypeScript. SSG for speed and SEO (matters for a portfolio).
- **Styling:** Tailwind CSS with the tokens above mapped to CSS variables.
- **Motion:** Framer Motion (motion) for reveals; a lightweight `<canvas>` or SVG for the node-graph pulse.
- **Deploy:** Vercel.
- **New location:** a fresh project, e.g. `D:\work\react\abdullah-portfolio` (do NOT modify the croge repo; only read from it for content).
- **SEO:** proper meta tags, Open Graph image, title "Abdullah Saleem — AI Engineer & Full-Stack Developer", semantic HTML, sitemap.

## 11. QUALITY & ACCESSIBILITY FLOOR (non-negotiable)

- Fully responsive down to 360px mobile.
- Visible keyboard focus states on all interactive elements.
- `prefers-reduced-motion` respected.
- Color contrast meets WCAG AA for text.
- Lighthouse: performance and accessibility 90+.
- No layout shift on load; images sized and lazy-loaded.

## 12. CONTENT EXTRACTION (from the existing repo)

All portfolio content already exists in `D:\work\react\croge`. Claude Code should read that repo and reuse it:
- Pull project data (names, descriptions, tech stacks, outcomes, images) for Selected Work.
- Reuse image assets where quality allows; copy them into the new project's public folder.
- Adapt copy from "we/our" (agency voice) to "I/my" (personal voice), since this is my personal portfolio.
- Do not copy the croge site's visual design; this is a new, distinct identity.

## 13. STARTER COPY (adapt, keep my no-em-dash rule)

- **Eyebrow:** AI ENGINEER / FULL-STACK DEVELOPER
- **Hero H1:** I build AI systems that do the work.
- **Hero subhead:** Chatbots that resolve real tickets, automations that run your back office, and full-stack apps with real intelligence underneath. 4+ years, 120+ projects shipped.
- **Primary CTA:** Start a project
- **Secondary:** View work
- **Stat strip:** 4+ YEARS · 120+ PROJECTS · 80+ CLIENTS · LEVEL 2 FIVERR
- **Contact heading:** Have a process you think AI could fix?
- **Contact sub:** Tell me what you are trying to automate or build. I will tell you honestly whether it is worth doing and how I would approach it.

## 14. ANTI-PATTERNS (do not do)

- No cream + serif + terracotta, no near-black + acid-green, no newspaper hairline look.
- No generic "big gradient number" hero as the main idea (the flow is the idea; stats are a supporting strip).
- No amber used decoratively.
- No stacked, scattered animations. One orchestrated hero moment plus quiet scroll reveals.
- No walls of skills as plain pill grids; use the pipeline/node treatment.
- No fake testimonials. If real ones exist in the croge repo, reuse them; otherwise omit.

## 15. BUILD ORDER

1. Scaffold Next.js + TS + Tailwind, map tokens to CSS variables, load the three fonts.
2. Read the croge repo, extract and adapt project + asset content into a local data file.
3. Build the hero with the static node graph first, then add the pulse animation.
4. Build Selected Work cards from the extracted data.
5. Capabilities, About, Contact, Footer.
6. Motion pass (reveals, hovers, reduced-motion).
7. Responsive pass (mobile first checks).
8. SEO + meta + OG image.
9. Self-critique against sections 9, 11, and 14. Remove one accessory. Deploy to Vercel.
