import { CinematicHero } from "@/components/cinematic-hero";

/**
 * The opening: a full-screen cinematic sequence (see components/cinematic-hero).
 *
 * On desktop it ends with the portrait docked left and the dashboard on the
 * right. Phones get the portrait alone. There used to be a copy of the
 * dashboard stacked under the hero on phones; it was 569px of dense 11px
 * admin UI repeating the name, role and stats the Intro shows a moment later,
 * and it pushed the first readable sentence down to 1,381px. It is gone.
 */
export function Hero() {
  return <CinematicHero />;
}
