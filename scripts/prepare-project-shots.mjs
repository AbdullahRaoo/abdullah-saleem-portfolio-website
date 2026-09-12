/**
 * Turns the raw screenshots Abdullah supplied into sized, optimized WebP for
 * the project cards and case-study pages.
 *
 * Two things here are deliberate rather than incidental:
 *  - The virtual try-on frame is cropped to the bare person/garment/result
 *    triptych. The source carries a "CROGE Engineering Studio" watermark band,
 *    which is the agency's mark, not his, and reads as someone else's work on a
 *    personal portfolio.
 *  - Everything is capped at 1600px wide. The sources are up to 3.7MB PNGs and
 *    the cards render at ~600px, so shipping them raw would cost the LCP budget
 *    for nothing.
 *
 * Run: npm run shots
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const DL = "C:/Users/abdul/Downloads";
const PPE = `${DL}/PPE-Monitoring-Vision-System`;
const CROGE = "D:/work/react/croge/public/projects";
const OUT = "public/projects";

/** [source, destination, options] */
const JOBS = [
  // PPE Monitoring Vision System. site-1 leads: it reads as an actual fixed
  // site camera looking down a walkway, which is what the product is, where
  // site-2 reads as four people posing for a photo.
  [`${PPE}/site-1.png`, "ppe-monitoring/site-feed.webp", { width: 1600 }],
  [`${PPE}/site-2.png`, "ppe-monitoring/detection.webp", { width: 1600 }],
  [
    `${PPE}/screencapture-ppe-monitoring-dashboard-vercel-app-2026-07-22-06_57_13.png`,
    "ppe-monitoring/dashboard.webp",
    { width: 1600 },
  ],
  [
    `${PPE}/screencapture-ppe-monitoring-dashboard-vercel-app-sites-2026-07-22-06_57_02.png`,
    "ppe-monitoring/sites.webp",
    { width: 1600 },
  ],
  [
    `${PPE}/screencapture-ppe-monitoring-dashboard-vercel-app-analytics-2026-07-22-06_57_26.png`,
    "ppe-monitoring/analytics.webp",
    { width: 1600 },
  ],

  // UAV search and rescue (SkyResQ)
  [`${DL}/Picture6.png`, "uav-sar/ground-station.webp", { width: 1600 }],
  [`${DL}/Picture5.png`, "uav-sar/mission-map.webp", { width: 1600 }],
  [`${DL}/Picture4.png`, "uav-sar/simulation.webp", { width: 1600 }],
  [`${DL}/Picture1.png`, "uav-sar/tracking.webp", { width: 1600 }],

  // Patient lead routing (HSM). Crop the "Type a message" composer off the
  // bottom: it is chrome, not the product, and it costs vertical room in a
  // 16:10 card. Everything above it is the bot's real conversation.
  [
    `${DL}/HSM-whatsapp-chat.png`,
    "hsm-lead-routing/whatsapp.webp",
    { crop: { left: 0, top: 0, width: 1277, height: 880 }, width: 1277 },
  ],

  // Virtual try-on: crop the agency watermark band off the bottom and the
  // letterbox off the top, leaving only the person / garment / result panels.
  [
    `${CROGE}/ai-virtual-try-on/gallery-1.jpeg`,
    "virtual-try-on/try-on.webp",
    { crop: { left: 0, top: 138, width: 1200, height: 528 }, width: 1200 },
  ],
];

async function run() {
  for (const [src, rel, opts] of JOBS) {
    const dest = path.join(OUT, rel);
    await mkdir(path.dirname(dest), { recursive: true });

    let img = sharp(src);
    if (opts.crop) img = img.extract(opts.crop);

    const info = await img
      .resize({ width: opts.width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);

    console.log(`${rel.padEnd(38)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
