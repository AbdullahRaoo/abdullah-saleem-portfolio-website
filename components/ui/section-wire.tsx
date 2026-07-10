"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The wire motif, reused as a section divider. It draws left-to-right as you
 * scroll into a section, then a node settles onto it.
 *
 * Built from a scaled div rather than an SVG path so the node stays perfectly
 * round at any viewport width (a stretched viewBox would oval it). The node is
 * muted, never amber: dividers are structure, not action.
 */
export function SectionWire({ label }: { label?: string }) {
  const reduced = useReducedMotion();

  const line = (
    <div className="wire-rule h-px w-full origin-left" aria-hidden="true" />
  );

  return (
    <div className="relative flex items-center gap-4 py-2" aria-hidden="true">
      {reduced ? (
        line
      ) : (
        <motion.div
          data-reveal=""
          className="wire-rule h-px w-full origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      )}

      {label ? (
        <span className="eyebrow shrink-0 whitespace-nowrap">{label}</span>
      ) : null}

      {reduced ? (
        <span className="size-1.5 shrink-0 rounded-full bg-line" />
      ) : (
        <motion.span
          data-reveal=""
          className="size-1.5 shrink-0 rounded-full bg-line"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.75, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
