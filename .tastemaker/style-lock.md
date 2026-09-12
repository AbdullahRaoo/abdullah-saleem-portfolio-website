# Style lock: Abdullah Saleem portfolio

Established 2026-09-11 (tastemaker, cold start). Mood: technical. Direction: "vision console" — a dark-first instrument aesthetic (machine-vision / inspection), cool near-monochrome structure with one warm reserved signal. Runtime light + dark toggle, generated as a companion pair from the same seed.

## Direction contract
- Thesis: the site reads like the console of a deployed computer-vision system, precise, calm, instrument-grade, not a generic SaaS/dev template.
- First viewport: value prop + one primary action on the left, a live "inspection viewport" over the real portrait on the right.
- Risk dial: medium-high. Distinctive signal color and console framing, disciplined everywhere else.

## Color contract (generate_palette.py, mood=technical, seed=41)
Companion pair, same seed, both modes. The accent is the single reserved signal (CTAs, active detection, one hero highlight). Primary is structural (links, quiet fills). Never use accent as decoration.

### Dark (default)
- text `#e6f5fb` · bg `#080e11` · surface `#12191c` · border `#1e2528`
- primary `#0a80a2` · on-primary `#ffffff` · secondary `#093341`
- accent (signal) `#e77e4c`

Legal pairings (dark): text/bg 17.4, text/surface 15.9 (text-safe). accent/bg 6.92, accent/surface 6.34 (accent as large text/icon on dark = safe). **CTA = accent fill + bg-colored (`#080e11`) label** (bg×accent 6.92, text-safe). white-on-accent FAILS (2.81) — never white text on the orange. primary/on-primary 4.54 (white on primary ok). primary as text on dark is only UI-safe (4.07), so use primary for fills/borders, not body text.

### Light
- text `#111c21` · bg `#f1fbff` · surface `#e7f1f5` · border `#d6e0e4`
- primary `#017d9f` · on-primary `#ffffff` · secondary `#bbe6f8`
- accent (signal) `#ba5620` (burnt orange; generator solved it darker so it clears AA on light)

Legal pairings (light): text/bg 16.5, text/surface 15.1 (text-safe). accent/bg 4.50, accent/on-primary 4.73 (text-safe). **CTA (light) = accent fill + white label** (accent×on-primary 4.73). primary/on-primary 4.65.

Signal-as-text tokens per theme: dark uses accent `#e77e4c` directly for the one hero highlight word; light must use accent `#ba5620` (the brighter orange would fail on the light bg). Mirrors the previous build's signal/signal-strong split.

## Type
- Display / headings: **Archivo** (700/600). Sturdy grotesque, confident at large sizes.
- Body: **IBM Plex Sans** (400/500). Engineered, institutional, highly legible.
- Mono / data / labels / HUD: **IBM Plex Mono** (400/500). Purpose-built for the detection readouts, eyebrows, tags, code. Never set long body copy in mono.
- All Google Fonts, self-hosted via next/font, `display: "optional"` (guards the hero from font-swap CLS). Tight display line-height (~1.05), normal body measure.
- Deliberately NOT the previous Chivo / Libre Franklin / Martian Mono trio.

## Motion
- One orchestrated hero moment (viewport frames in, scan runs, telemetry starts), plus one reusable scroll reveal. GSAP optional; framer-motion already present is fine. Respect prefers-reduced-motion (settle to a static frame, no loops).

## Assets
- Portrait: `public/abdullah-cv.webp` (real headshot, transparent cutout, from `npm run photo:cv`). Reuse.
- Icons: IBM Plex Mono glyphs + inline SVG line icons at one stroke weight (no emoji). Fetch a consistent lucide/tabler set if icons are needed.
- Photography split: portfolio is portrait + project schematics + client screenshots; no stock photography needed.

## Signature (open competition, incumbent = old detection-box hero)
Winner to render: the "vision console" — evolves the detection hero and folds in the pipeline schematic. Portrait in an inspection viewport with segmentation edge, detection boxes (orange = active, muted = secondary), a scan sweep, a compact telemetry readout (FPS / latency / model), and a camera->model->tracking->output pipeline strip. One unified console instead of hero + separate schematics.

## Reference board (viewed via web search 2026-09-11)
- Field: ML/CV portfolios = dark/light + animated + benchmarks + architecture diagrams. Machine-vision HUD lane = dark, near-monochrome white/gray + one sharp signal, radar/detection-frame, clean not glitchy.
- Anti-references: cyberpunk-glitch HUD (costume-y), generic SaaS indigo/violet gradient, near-black + acid-green, cream + serif + terracotta.
