import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0B0D12";
const LINE = "#232A38";
const TEXT = "#ECEFF4";
const MUTED = "#8B94A6";
const SIGNAL = "#D2A24C";

/**
 * Share card. Same rules as the site: cool ink, one amber node, no decoration.
 * Built with inline styles because Satori (next/og) does not read the app's CSS.
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
          AI Engineer / Full-Stack Developer
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
            <span style={{ marginRight: 18 }}>I build AI systems that</span>
            <span style={{ color: SIGNAL }}>do the work.</span>
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
          <span>4+ yrs · 120+ projects · 80+ clients · Level 2 Fiverr</span>
        </div>
      </div>
    ),
    size
  );
}
