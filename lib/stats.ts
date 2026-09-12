import { allWork } from "@/lib/projects";

/**
 * The stat strip under the hero and inside the console panel.
 *
 * Honest framing: ~4 years building software, ~3 of those focused on computer
 * vision. Full-stack leads because most of the shipped work is full-stack.
 *
 * The project count is read from the case studies rather than typed in, so it
 * cannot drift away from what the site actually shows.
 */
export const stats = [
  { value: "4+", label: "Yrs full-stack" },
  { value: "3+", label: "Yrs computer vision" },
  { value: String(allWork.length), label: "Projects shipped" },
  { value: "End to end", label: "Design to deploy" },
] as const;
