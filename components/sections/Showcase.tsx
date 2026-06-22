"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showcase } from "@/data/content";

/**
 * Section "pinned" : le panneau de texte reste fixé pendant que l'on scrolle,
 * et les étapes du récit se succèdent (le cristal 3D en fond évolue en parallèle
 * via le store de scroll global). Pinning + crossfade géré par ScrollTrigger.
 */
export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const steps = gsap.utils.toArray<HTMLElement>(".showcase-step");
      const count = steps.length;

      // Épingle le panneau pendant toute la durée de la section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * count}`,
          pin: panel.current,
          scrub: 0.6,
        },
      });

      steps.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { opacity: 1, y: 0 });
        } else {
          tl.fromTo(
            step,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 },
            i
          );
        }
        if (i < count - 1) {
          tl.to(step, { opacity: 0, y: -40, duration: 0.5 }, i + 0.5);
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={root}
      className="relative"
      style={{ minHeight: "100vh" }}
    >
      <div
        ref={panel}
        className="flex min-h-[100svh] flex-col justify-center px-6 md:px-12"
      >
        <span className="eyebrow mb-6 block">{showcase.eyebrow}</span>
        <h2 className="mb-12 font-display text-giant font-medium text-gradient">
          {showcase.title}
        </h2>

        <div className="relative h-44 max-w-xl">
          {showcase.steps.map((s, i) => (
            <div
              key={i}
              className="showcase-step absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className="font-mono text-sm text-glacier-300/70">
                0{i + 1} / 0{showcase.steps.length}
              </span>
              <h3 className="mb-3 mt-2 text-3xl font-medium text-frost md:text-4xl">
                {s.title}
              </h3>
              <p className="text-lg leading-relaxed text-frost/55">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
