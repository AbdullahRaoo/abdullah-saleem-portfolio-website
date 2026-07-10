"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The single scroll-reveal used across the page: fade plus a 12px rise, once.
 * One reveal, applied consistently, reads as intent. Several different reveals
 * read as an effects demo.
 *
 * Under reduced motion this renders a plain wrapper, so content is present and
 * final on first paint rather than animating to a resting state.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      // `data-reveal` is the hook the <noscript> rule in layout.tsx targets, so
      // this content is not stranded at opacity:0 when JS never runs.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
