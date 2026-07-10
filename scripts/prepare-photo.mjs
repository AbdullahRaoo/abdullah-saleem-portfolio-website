/**
 * Turns the raw headshot into a transparent PNG the site can theme.
 *
 *   node scripts/prepare-photo.mjs [--tolerance 60] [--feather 34]
 *
 * Input:  public/abdullah-source.(png|jpg)
 * Output: public/abdullah.png   (transparent background, 900x1125)
 *
 * The source is a portrait sitting on a flat teal disc with white corners.
 * Both are flat colours, so a distance-based chroma key removes them cleanly.
 * Rather than a hard cutoff (which leaves a jagged, aliased edge) the alpha
 * ramps between `tolerance` and `tolerance + feather`, and partially
 * transparent pixels get despilled so no teal fringe survives around the hair
 * and shoulders.
 *
 * Both background colours are detected from the image rather than hard-coded:
 * corners give the outer colour, and a ring sampled just inside the disc edge
 * gives the disc colour. So this keeps working if the photo is re-exported.
 */
import { existsSync } from "node:fs";

import sharp from "sharp";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(process.argv[i + 1]);
};

const TOLERANCE = arg("tolerance", 60); // fully transparent within this distance
const FEATHER = arg("feather", 34); // ramp width above the tolerance

const SRC = ["public/abdullah-source.png", "public/abdullah-source.jpg"].find((p) => existsSync(p));

if (!SRC) {
  console.error(
    "No source photo found.\n" +
      "Save the headshot as public/abdullah-source.png (or .jpg) and run this again."
  );
  process.exit(1);
}

const dist = (r1, g1, b1, r2, g2, b2) =>
  Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);

/** Median colour of a set of [r,g,b] samples, per channel. Robust to outliers. */
function medianColor(samples) {
  const at = (c) => {
    const v = samples.map((s) => s[c]).sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)];
  };
  return [at(0), at(1), at(2)];
}

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels } = info;
const px = (x, y) => {
  const i = (y * w + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
};

// Outer colour: the four corners.
const cornerSamples = [];
for (let dy = 0; dy < 12; dy++) {
  for (let dx = 0; dx < 12; dx++) {
    cornerSamples.push(px(dx, dy), px(w - 1 - dx, dy), px(dx, h - 1 - dy), px(w - 1 - dx, h - 1 - dy));
  }
}
const outer = medianColor(cornerSamples);

// Disc colour: a ring just inside the circle edge, skipping the lower arc where
// the subject's shoulders reach the boundary.
const cx = w / 2;
const cy = h / 2;
const radius = Math.min(w, h) * 0.46;
const ringSamples = [];
for (let deg = 200; deg <= 340; deg += 2) {
  const rad = (deg * Math.PI) / 180;
  const x = Math.round(cx + radius * Math.cos(rad));
  const y = Math.round(cy + radius * Math.sin(rad));
  if (x >= 0 && x < w && y >= 0 && y < h) ringSamples.push(px(x, y));
}
const disc = medianColor(ringSamples);

const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
console.log(`source      ${SRC} (${w}x${h})`);
console.log(`outer bg    ${hex(outer)}`);
console.log(`disc bg     ${hex(disc)}`);

if (dist(...outer, ...disc) < 30) {
  console.warn("Warning: the two detected backgrounds are nearly identical. Check the source.");
}

let cleared = 0;
let feathered = 0;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const d = Math.min(dist(r, g, b, ...outer), dist(r, g, b, ...disc));

  if (d <= TOLERANCE) {
    data[i + 3] = 0;
    cleared++;
  } else if (d <= TOLERANCE + FEATHER) {
    const t = (d - TOLERANCE) / FEATHER; // 0 -> transparent, 1 -> opaque
    data[i + 3] = Math.round(255 * t);

    // Despill: pull the edge pixel away from the disc colour it is blended with,
    // proportional to how transparent it is. Without this, hair keeps a teal rim.
    data[i] = Math.max(0, Math.min(255, Math.round(r + (r - disc[0]) * (1 - t) * 0.5)));
    data[i + 1] = Math.max(0, Math.min(255, Math.round(g + (g - disc[1]) * (1 - t) * 0.5)));
    data[i + 2] = Math.max(0, Math.min(255, Math.round(b + (b - disc[2]) * (1 - t) * 0.5)));
    feathered++;
  }
}

const total = w * h;
console.log(
  `cleared     ${((cleared / total) * 100).toFixed(1)}% of pixels, ${feathered} feathered`
);

if (cleared / total < 0.05) {
  console.warn("Warning: almost nothing was removed. Try a higher --tolerance.");
} else if (cleared / total > 0.85) {
  console.warn("Warning: almost everything was removed. Try a lower --tolerance.");
}

await sharp(data, { raw: { width: w, height: h, channels } })
  .trim() // drop the now-transparent margin so the subject fills the frame
  .resize(900, 1125, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/abdullah.png");

console.log("wrote       public/abdullah.png");
console.log("\nNow set `photo: \"/abdullah.png\"` in lib/site.ts.");
