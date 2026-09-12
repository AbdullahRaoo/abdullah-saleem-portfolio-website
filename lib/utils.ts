import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn / 21st.dev class helper: join conditional classes (clsx)
 * and resolve Tailwind conflicts so the last utility wins (tailwind-merge).
 *
 * Existing components here use plain template strings and do not need this;
 * it is provided so any shadcn or 21st.dev component pasted into
 * components/ui/* resolves `@/lib/utils` and works without edits.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
