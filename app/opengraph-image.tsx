import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#080E11";
const LINE = "#1E2528";
const TEXT = "#E6F5FB";
const MUTED = "#8FA3AB";
const SIGNAL = "#E77E4C";

/**
 * Share card. Same rules as the site: cool teal-graphite ground, one warm
 * signal node, no decoration. Built with inline styles because Satori
 * (next/og) does not read the app's CSS.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Full-Stack Developer / Computer Vision Engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              lineHeight: 1.1,
              color: TEXT,
              letterSpacing: -2,
            }}
          >
            <span style={{ marginRight: 18 }}>I build the software a business</span>
            <span style={{ color: SIGNAL }}>actually runs on.</span>
          </div>

          {/* The node motif, flattened to a single wire. */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 56 }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: LINE }} />
            <div style={{ display: "flex", width: 120, height: 1, background: LINE }} />
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: SIGNAL }} />
            <div style={{ display: "flex", width: 120, height: 1, background: LINE }} />
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: LINE }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 22,
            color: MUTED,
          }}
        >
          <span style={{ color: TEXT, letterSpacing: 3 }}>ABDULLAH SALEEM</span>
          <span>Real-time · Edge · YOLO / ONNX · 3+ yrs CV, 4+ yrs full-stack</span>
        </div>
      </div>
    ),
    size
  );
}
