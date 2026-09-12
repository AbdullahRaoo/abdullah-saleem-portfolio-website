# Design system: Vision Console

The visual identity for this portfolio, generated fresh (tastemaker, technical mood, seed 41) and mapped to Tailwind v4 `@theme` tokens in `app/globals.css`. The full contrast contract and legal pairings live in `.tastemaker/style-lock.md`.

## Concept

A dark-first **instrument aesthetic**: the site reads like the console of a deployed computer-vision system. Cool teal-graphite structure, near-monochrome, with exactly one warm reserved signal (orange). On an otherwise cool page the only warm thing owns the eye, which is the conversion mechanic. Grounded in the machine-vision HUD reference lane (dark, sharp signal, detection frame, clean not glitchy), deliberately away from generic SaaS blue and the near-black + acid-green cliche.

## Color (verified WCAG AA, both themes)

Companion light/dark pair from one seed. `--signal` is the reserved warm fill; `--signal-strong` is the warm text color (the one hero highlight word); `--primary` is the cool structural color.

| Token | Dark | Light |
|---|---|---|
| ink (bg) | `#080e11` | `#f1fbff` |
| surface | `#12191c` | `#e7f1f5` |
| line (border) | `#1e2528` | `#d6e0e4` |
| text | `#e6f5fb` | `#111c21` |
| muted | `#8fa3ab` (7.4:1) | `#4d626b` (6.1:1) |
| primary | `#0a80a2` | `#017d9f` |
| signal (fill) | `#e77e4c` | `#ba5620` |
| signal-ink (label on fill) | `#080e11` | `#ffffff` |
| signal-strong (text) | `#e77e4c` (6.9:1) | `#ba5620` (4.5:1) |

Rules that matter: the CTA is `signal` fill with `signal-ink` label (never white-on-orange in dark). `signal-strong` flips to the darker burnt orange in light so the highlight word still clears AA. `primary` is for fills/borders and links, not body text (it is UI-safe, not text-safe, on the ground).

## Type: bulky but elegant

- Display: **Bricolage Grotesque** (600/700/800). Chunky, high-character grotesque with weight at large sizes without reading clunky. Carries the whole personality.
- Body: **Hanken Grotesk** (400/500/600). Clean humanist body, quiet beside the display.
- Mono / data: **DM Mono** (400/500). Reserved strictly for real data (HUD numbers, tags, counters), used sparingly, deliberately kept off eyebrows and labels so the page stops feeling like a terminal.
- `next/font`, `display: "optional"` (guards against font-swap CLS). Not the earlier Archivo / IBM Plex or Chivo / Libre Franklin / Martian Mono stacks.

## The hero: a cinematic full-screen opening

`components/cinematic-hero.tsx`, driven by a GSAP timeline. It plays itself, in order:

1. the name resolves out of a blur
2. the designation ("Computer Vision & Full-Stack Engineer") wipes in beneath it, and holds long enough to actually be read
3. the text recedes into the background (blurred, dimmed) while the portrait blooms into the centre of the screen
4. a scan sweeps it and a single detection box locks on, labelled `person 0.98 · Abdullah Saleem`
5. the portrait docks to the left and shrinks
6. the ERP dashboard slides in on the right

About 7s end to end. Any scroll, click, tap or keypress multiplies the timeline's timeScale by 5, so an impatient visitor fast-forwards instead of being stuck. Page scroll is held for the duration only, released on completion with a 10s failsafe. The sequence is skipped (settled state rendered immediately) on a repeat visit in the same session and under `prefers-reduced-motion`.

The resting split is **38 / 62**: the portrait is the smaller panel, the dashboard the larger one, so the systems half carries the weight.

- **Left, the CV model** (`components/detection-hero.tsx`): the real portrait with exactly one detection box, deliberately no face box, no telemetry chrome. The photo sits in a fixed-aspect frame matching the asset, so the box, positioned in percentages of that frame, tracks the subject at any size.
- **Right, the full-stack system** (`components/erp-dashboard.tsx`): a real admin console, window chrome, a left sidebar, record header, stat tiles, module meters and a throughput chart, all fed from `lib/site` + `lib/capabilities`.

The final grid is reserved from first paint and the whole sequence is transform + opacity only, so it shifts no layout (CLS 0). The introduction copy (headline, CTA, stats) lives in `components/sections/intro.tsx`, below the fold, appearing on scroll.

**Floating nav** (`components/nav.tsx`): a rounded, blurred bar centered near the bottom with a gap beneath it, carrying the section links, theme toggle, and the permanent CTA.

## Selected Work: clarity first

`components/sections/work.tsx` + `components/project-visual.tsx`. Rebuilt so a stranger understands each project instantly: a dominant visual on top (real screenshot where available, a designed labelled placeholder, showing the real pipeline, everywhere else), then one plain-English "what it is" line, the outcome metric, and the deeper problem/build/quote tucked into a "How it works" disclosure. Two-column grid.

## Motion

The hero entrance plus one reusable scroll reveal. A global `prefers-reduced-motion` rule in `globals.css` zeroes all animation/transition durations. Passes tastemaker's `audit_motion.py` (0 HIGH).

## Measured

Lighthouse against `npm start`: Desktop 100 / 100 / 100 / 100 (CLS 0.002). Mobile 95 / 100 / 100 / 100 (CLS 0.005; LCP ~2.9s, the portrait under slow-4G throttle). Anti-slop and motion scans clean.
