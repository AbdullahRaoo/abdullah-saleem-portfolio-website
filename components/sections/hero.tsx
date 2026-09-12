import { CinematicHero } from "@/components/cinematic-hero";
import { ErpDashboard } from "@/components/erp-dashboard";

/**
 * The opening: a full-screen cinematic sequence (see components/cinematic-hero).
 *
 * The sequence ends with the portrait docked left and the dashboard on the
 * right. That split needs width, so on small screens the hero carries the
 * portrait alone and the dashboard follows immediately beneath it.
 */
export function Hero() {
  return (
    <>
      <CinematicHero />

      <section className="px-5 pb-2 pt-4 lg:hidden" aria-label="Profile dashboard">
        <div className="min-h-[26rem]">
          <ErpDashboard />
        </div>
      </section>
    </>
  );
}
