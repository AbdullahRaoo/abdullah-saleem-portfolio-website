"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { DetectionHero } from "@/components/detection-hero";
import { ErpDashboard } from "@/components/erp-dashboard";
import { site } from "@/lib/site";

/**
 * The full-screen cinematic opening. It plays itself, in order:
 *
 *   1. the name resolves out of a blur
 *   2. the designation wipes in beneath it
 *   3. the text recedes into the background (blurred, dimmed) and the portrait
 *      blooms into the centre of the screen
 *   4. a scan sweeps it and a single detection box locks onto the subject
 *   5. the whole detection panel docks to the left and shrinks
 *   6. the ERP dashboard slides in on the right
 *
 * It is automatic at a readable pace (about 7s), holding the name and
 * designation long enough to actually be read before the portrait takes over. Any scroll, click, tap or
 * keypress multiplies the timeline timeScale, so an impatient visitor
 * fast-forwards rather than being stuck. Page scroll is held only for the
 * duration of the sequence, with a failsafe that always releases it.
 *
 * On phones the sequence is shorter and gentler: there is no dashboard to dock
 * beside, so the name and designation stay crisp above the portrait instead of
 * receding behind it, a scroll cue sits under it, and page scroll is never
 * locked (a swipe that does nothing reads as a broken page on a phone).
 *
 * Under prefers-reduced-motion the settled composition renders immediately.
 *
 * The panels start hidden in CSS (not JS), so the settled state never flashes
 * on screen before the timeline takes over.
 */

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const detWrap = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const html = document.documentElement;
    let released = false;
    const releaseScroll = () => {
      if (released) return;
      released = true;
      html.style.overflow = "";
      setDone(true);
    };

    const cleanups: Array<() => void> = [];
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      // The settled composition, used for reduced motion.
      const settle = () => {
        gsap.set(
          [".ci-name", ".ci-role"],
          isDesktop
            ? { autoAlpha: 0.1, scale: 1.16, filter: "blur(16px)", clipPath: "none" }
            : { autoAlpha: 1, clipPath: "none" }
        );
        gsap.set(".ci-det", { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        gsap.set(".ci-erp", { autoAlpha: 1, x: 0, y: 0 });
        gsap.set([".det-box", ".det-label"], { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set(".det-scan", { autoAlpha: 0 });
      };

      if (reduced) {
        settle();
        releaseScroll();
        return;
      }

      // Measure the detection panel's docked position so the intro can centre it
      // with a transform. Transforms do not reflow, so this shifts no layout.
      let dx = 0;
      if (isDesktop && detWrap.current) {
        const r = detWrap.current.getBoundingClientRect();
        dx = window.innerWidth / 2 - (r.left + r.width / 2);
      }
      const introScale = isDesktop ? 1.28 : 1;

      if (isDesktop) html.style.overflow = "hidden";

      gsap.set(".ci-name", { autoAlpha: 0, y: 42, scale: 0.94, filter: "blur(18px)" });
      gsap.set(".ci-role", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".ci-det", { autoAlpha: 0, x: dx, scale: introScale * 0.84 });
      gsap.set(".ci-erp", { autoAlpha: 0, x: isDesktop ? 70 : 0, y: isDesktop ? 0 : 44 });

      const tl = gsap.timeline({ onComplete: releaseScroll });

      // 1 + 2: the identity
      tl.to(".ci-name", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "expo.out",
      })
        .to(".ci-role", { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut" }, "-=0.4")
        // On desktop the text is about to recede, so it needs a full read first.
        // On a phone it stays on screen, so a short beat is enough.
        .to({}, { duration: isDesktop ? 1.2 : 0.35 })
        .addLabel("bloom");

      // 3: on desktop the text recedes behind the portrait; on a phone it stays.
      if (isDesktop) {
        tl.to(
          [".ci-name", ".ci-role"],
          { autoAlpha: 0.1, scale: 1.16, filter: "blur(16px)", duration: 1.0, ease: "power2.inOut" },
          "bloom"
        );
      }

      tl.to(".ci-det", { autoAlpha: 1, scale: introScale, duration: 1.2, ease: "expo.out" }, "bloom+=0.1")
        // 4: the detection resolves. The line is 1px tall, so percentage
        // translation would barely move it; animating `top` sweeps the frame.
        .fromTo(
          ".det-scan",
          { top: "0%", autoAlpha: 0.9 },
          { top: "100%", autoAlpha: 0, duration: 0.75, ease: "none" },
          "-=0.4"
        )
        .to(
          ".det-box",
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)", startAt: { scale: 1.05 } },
          "-=0.25"
        )
        .to(
          ".det-label",
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", startAt: { y: 8 } },
          "-=0.15"
        );

      // 5 + 6: dock left, dashboard arrives. Desktop only: phones have no split.
      if (isDesktop) {
        tl.to({}, { duration: 0.55 })
          .to(".ci-det", { x: 0, scale: 1, duration: 1.1, ease: "power3.inOut" }, "dock")
          .to(".ci-erp", { autoAlpha: 1, x: 0, y: 0, duration: 0.95, ease: "expo.out" }, "dock+=0.4");
      }

      // Any intent to move on fast-forwards the sequence.
      let sped = false;
      const speedUp = () => {
        if (sped || tl.progress() >= 1) return;
        sped = true;
        gsap.to(tl, { timeScale: 5, duration: 0.35, ease: "power2.out" });
      };
      window.addEventListener("wheel", speedUp, { passive: true });
      window.addEventListener("touchstart", speedUp, { passive: true });
      window.addEventListener("pointerdown", speedUp, { passive: true });
      window.addEventListener("keydown", speedUp);
      cleanups.push(() => {
        window.removeEventListener("wheel", speedUp);
        window.removeEventListener("touchstart", speedUp);
        window.removeEventListener("pointerdown", speedUp);
        window.removeEventListener("keydown", speedUp);
      });

      // Failsafe: never leave the page locked, whatever happens to the timeline.
      const failsafe = window.setTimeout(releaseScroll, 10000);
      cleanups.push(() => window.clearTimeout(failsafe));
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] w-full flex-col items-center gap-4 overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:justify-center lg:gap-5 lg:pb-0 lg:pt-0"
    >
      {/* Identity. Desktop: leads the sequence, then sits behind as a ghost.
          Phone: stays in flow above the portrait, fully readable, so the first
          screen says who this is instead of showing an unexplained photo. */}
      <div className="pointer-events-none relative z-0 flex w-full flex-col items-center text-center lg:absolute lg:inset-0 lg:justify-center lg:px-4">
        <h1 className="ci-name font-display text-[clamp(2.4rem,12.5vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-text lg:text-[clamp(2.5rem,8vw,7rem)]">
          {site.name}
        </h1>
        <p className="ci-role font-display mt-2.5 max-w-[22rem] text-balance text-[clamp(1rem,4.4vw,2rem)] font-bold leading-snug tracking-tight text-signal-strong lg:mt-3 lg:max-w-none lg:text-[clamp(0.95rem,2.4vw,2rem)]">
          {site.role}
        </p>
      </div>

      {/* The console: portrait left, dashboard right, scroll cue in a reserved
          right rail. The rail is a flex sibling rather than an absolute overlay
          so it can never land on top of the dashboard at any width. On a phone
          the row is just the portrait, filling the space the text leaves. */}
      <div className="relative z-10 flex min-h-0 w-full max-w-[1400px] flex-1 items-stretch gap-3 lg:h-[66svh] lg:max-h-[700px] lg:flex-none">
        <div className="grid min-w-0 flex-1 grid-cols-1 items-stretch gap-4 lg:grid-cols-[38fr_62fr] lg:gap-5">
          <div ref={detWrap} className="ci-det min-h-0">
            <DetectionHero />
          </div>
          <div className="ci-erp hidden min-h-0 lg:block">
            <ErpDashboard />
          </div>
        </div>

        {/* Desktop scroll cue: vertically centred beside the dashboard. It
            breathes rather than sitting flat, so it reads as a prompt without
            competing with the sequence it follows. */}
        <div
          className={`pointer-events-none hidden w-9 shrink-0 items-center justify-center transition-opacity duration-700 lg:flex ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="ci-cue flex flex-col items-center gap-3 text-muted">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="relative block h-14 w-px overflow-hidden bg-line" aria-hidden="true">
              <span className="ci-scroll-dot absolute inset-x-0 top-0 block h-2.5 bg-signal" />
            </span>
          </span>
        </div>
      </div>

      {/* Phone scroll cue: centred under the portrait, clear of the floating nav
          (the section's bottom padding reserves that space). */}
      <div
        aria-hidden="true"
        className={`pointer-events-none flex shrink-0 justify-center transition-opacity duration-700 lg:hidden ${
          done ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="ci-cue flex flex-col items-center gap-2 text-muted">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em]">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="ci-scroll-dot absolute inset-x-0 top-0 block h-2.5 bg-signal" />
          </span>
        </span>
      </div>
    </section>
  );
}
