"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The signature element: an idling automation pipeline.
 *
 * Geometry is authored against a fixed 560x400 viewBox so the wires and nodes
 * stay locked together at any render size. `MAIN_PATH` is an invisible spine
 * running input -> n8n -> agent -> CRM; the amber pulse rides it via SMIL
 * <animateMotion>, passing behind each node so it reads as a token moving
 * through the system rather than a dot orbiting a decoration.
 *
 * Amber appears here only on the active AI node and the pulse. Everything else
 * is line and muted, so the graph never competes with the CTA.
 */

type Role = "input" | "logic" | "ai" | "output";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  role: Role;
};

const NODE_W = 112;
const NODE_H = 44;

const NODES: Node[] = [
  { id: "webhook", x: 70, y: 90, label: "Webhook", role: "input" },
  { id: "whatsapp", x: 70, y: 300, label: "WhatsApp", role: "input" },
  { id: "n8n", x: 230, y: 195, label: "n8n", role: "logic" },
  { id: "agent", x: 390, y: 110, label: "Agent", role: "ai" },
  { id: "crm", x: 470, y: 310, label: "CRM", role: "output" },
];

/** Visible wires, drawn beneath the nodes. */
const EDGES = [
  "M126,90 C156,90 144,195 174,195",
  "M126,300 C156,300 144,195 174,195",
  "M286,195 C316,195 304,110 334,110",
  "M446,110 C500,140 470,220 470,288",
];

/** Invisible spine the pulse travels: input -> n8n -> agent -> CRM. */
const MAIN_PATH =
  "M126,90 C156,90 144,195 174,195 L286,195 C316,195 304,110 334,110 L446,110 C500,140 470,220 470,288";

/** Total wire-draw time, so the pulse can start the moment the system is "wired". */
const DRAW_DELAY = 0.25;
const DRAW_DURATION = 1.1;
const PULSE_BEGIN = DRAW_DELAY + DRAW_DURATION + EDGES.length * 0.12;

export function FlowGraph({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 560 400"
      fill="none"
      className={className}
      role="img"
      aria-label="An automation pipeline: a webhook and a WhatsApp message feed into an n8n workflow, which calls an AI agent, which writes the result to a CRM."
    >
      <defs>
        <filter id="fg-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="fg-node-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <path id="fg-spine" d={MAIN_PATH} />
      </defs>

      {/* Wires. They draw in, then hold. */}
      <g stroke="var(--color-line)" strokeWidth={1.25} strokeLinecap="round">
        {EDGES.map((d, i) =>
          reduced ? (
            <path key={d} d={d} opacity={0.85} />
          ) : (
            <motion.path
              key={d}
              d={d}
              opacity={0.85}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: DRAW_DURATION,
                delay: DRAW_DELAY + i * 0.12,
                ease: "easeInOut",
              }}
            />
          )
        )}
      </g>

      {/* Nodes. */}
      {NODES.map((node, i) => {
        const isAI = node.role === "ai";
        const x = node.x - NODE_W / 2;
        const y = node.y - NODE_H / 2;

        const content = (
          <>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill="var(--color-surface)"
              stroke={isAI ? "var(--color-signal)" : "var(--color-line)"}
              strokeWidth={isAI ? 1.5 : 1.25}
              opacity={isAI ? 1 : 0.95}
            />

            {/* Status dot: amber only on the active AI node. */}
            <circle
              cx={x + 14}
              cy={node.y}
              r={3}
              fill={isAI ? "var(--color-signal)" : "var(--color-muted)"}
              opacity={isAI ? 1 : 0.45}
              filter={isAI ? "url(#fg-node-glow)" : undefined}
            />

            <text
              x={x + 26}
              y={node.y + 4}
              className="font-mono"
              fontSize={12}
              fill={isAI ? "var(--color-text)" : "var(--color-muted)"}
            >
              {node.label}
            </text>
          </>
        );

        return reduced ? (
          <g key={node.id}>{content}</g>
        ) : (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
          >
            {content}
          </motion.g>
        );
      })}

      {/*
        The pulse. Under reduced motion it parks at the AI node as a static
        amber token: the system is shown live, just not moving.
      */}
      {reduced ? (
        <circle cx={390} cy={110} r={4} fill="var(--color-signal)" filter="url(#fg-glow)" />
      ) : (
        <circle r={4} fill="var(--color-signal)" filter="url(#fg-glow)" opacity={0}>
          <animateMotion
            dur="5.5s"
            begin={`${PULSE_BEGIN}s`}
            repeatCount="indefinite"
            rotate="auto"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="spline"
            keySplines="0.45 0 0.55 1"
          >
            <mpath href="#fg-spine" />
          </animateMotion>
          {/* Fade in on the first run, then hold visible for every loop after. */}
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.4s"
            begin={`${PULSE_BEGIN}s`}
            fill="freeze"
          />
        </circle>
      )}
    </svg>
  );
}
