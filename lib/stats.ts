import { allWork } from "@/lib/projects";

/**
 * The stat strip under the hero and inside the console panel.
 *
 * Honest framing: ~4 years building software, ~3 of those focused on computer
 * vision. Full-stack leads because most of the shipped work is full-stack.
 *
 * The 120+ is Abdullah's career total across solo and agency work. The site
 * documents a subset of those as case studies, so `documentedWork` is exported
 * separately and /work says plainly that it is a selection. The two numbers
 * sitting near each other should never read as a contradiction.
 */
export const stats = [
  { value: "4+", label: "Yrs full-stack" },
  { value: "3+", label: "Yrs computer vision" },
  { value: "120+", label: "Projects shipped" },
  { value: "End to end", label: "Design to deploy" },
] as const;

/** How many are written up here. Read from the case studies, never typed in. */
export const documentedWork = allWork.length;
