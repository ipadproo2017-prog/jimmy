"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/content";
import Reveal from "../Reveal";

/** Compteur animé qui s'incrémente une fois entré dans le viewport. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        if (reduced) {
          setDisplay(value);
          return;
        }

        const duration = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-glacier-300">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-glacier-700/20 px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-5xl font-semibold text-frost glow-text md:text-7xl">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="mt-3 max-w-[12ch] text-xs uppercase tracking-[0.2em] text-frost/45">
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
