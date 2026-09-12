/**
 * Turns the headshot SVG into the transparent WebP the detection hero uses.
 *
 *   node scripts/prepare-cv-photo.mjs
 *
 * Input:  assets/source/abdulllahimage.svg  (400x400 SVG wrapping a filtered PNG:
 *                                       subject on a teal disc, transparent corners)
 * Output: public/abdullah-cv.webp      (subject only, transparent, ~1000px wide)
 *
 * Why the work: the source is not a plain photo. It is grayscale PNGs recombined
 * through SVG feColorMatrix filters, so it has to be rasterized (filters and all)
 * before anything else. The corners are already transparent; only the teal disc
 * needs removing. An RGB chroma key fails here because the dark navy suit sits
 * close to teal in RGB space and gets punched full of holes, so we key in HSV
 * instead: teal is a narrow, highly-saturated hue band, while the suit is
 * low-saturation, so a hue+saturation gate removes the disc and spares the
 * subject. A small alpha erosion then wipes the thin, near-gray anti-aliased
 * ring left at the disc's edge (a band with transparency on both sides, so
 * erosion removes it without touching the solid subject).
 */
import { existsSync } from "node:fs";

import sharp from "sharp";

// Source lives outside public/ on purpose: it is a 3MB build input, and
// anything in public/ is served to visitors and shipped in every deploy.
const SRC = "assets/source/abdulllahimage.svg";
const OUT = "public/abdullah-cv.webp";

if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}. Nothing to do.`);
  process.exit(1);
}

function rgb2hsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  const d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = 60 * (((g - b) / d) % 6);
    else if (mx === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  return [h, mx ? d / mx : 0, mx];
}

/** Separable min-filter erosion of the alpha channel, radius r (pixels). */
function erodeAlpha(data, w, h, ch, r) {
  const a = new Uint8Array(w * h);
  for (let p = 0, i = 3; p < w * h; p++, i += ch) a[p] = data[i];
  const tmp = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 255;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        if (xx < 0 || xx >= w) continue;
        const v = a[y * w + xx];
        if (v < m) m = v;
      }
      tmp[y * w + x] = m;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let m = 255;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        if (yy < 0 || yy >= h) continue;
        const v = tmp[yy * w + x];
        if (v < m) m = v;
      }
      data[(y * w + x) * ch + 3] = m;
    }
  }
}

const { data, info } = await sharp(SRC, { density: 700 })
  .ensureAlpha()
  .resize(1200, 1200, { fit: "inside" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h, channels: ch } = info;

// Teal disc key: narrow cyan-blue hue, high saturation, mid value.
let cleared = 0;
for (let i = 0; i < data.length; i += ch) {
  if (data[i + 3] === 0) continue; // already-transparent corner
  const [hue, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
  const tealHue = hue >= 172 && hue <= 216;
  if (!tealHue || v < 0.1 || v > 0.8) continue;
  if (s >= 0.42) {
    data[i + 3] = 0;
    cleared++;
  } else if (s >= 0.3) {
    // Soft edge: ramp alpha down as saturation approaches the hard threshold.
    const t = (0.42 - s) / 0.12;
    data[i + 3] = Math.round(data[i + 3] * (1 - t));
  }
}

erodeAlpha(data, w, h, ch, 2);

await sharp(data, { raw: { width: w, height: h, channels: ch } })
  .trim({ threshold: 8 })
  .resize(1000, 1300, { fit: "inside" })
  .webp({ quality: 88 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(
  `cleared ${((cleared / (w * h)) * 100).toFixed(1)}% -> ${OUT} (${meta.width}x${meta.height})`
);
