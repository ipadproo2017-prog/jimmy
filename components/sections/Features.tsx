"use client";

import { useRef, MouseEvent } from "react";
import { features } from "@/data/content";
import Reveal from "../Reveal";

/** Carte en verre dépoli avec léger tilt 3D au survol de la souris. */
function FeatureCard({
  index,
  title,
  body,
  tag,
}: {
  index: string;
  title: string;
  body: string;
  tag: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="hover"
      className="glass group relative flex min-h-[300px] flex-col justify-between rounded-3xl p-8 transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-glacier-300/30"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-sm text-glacier-300/70">{index}</span>
        <span className="rounded-full border border-glacier-300/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-frost/50">
          {tag}
        </span>
      </div>

      <div>
        <h3 className="mb-3 text-2xl font-medium text-frost md:text-3xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-frost/55">{body}</p>
      </div>

      {/* Lueur au survol */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-glow/10 to-transparent" />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow mb-4 block">Savoir-faire</span>
            <h2 className="font-display text-giant font-medium text-frost">
              What we build
            </h2>
          </div>
          <p className="max-w-sm text-frost/50">
            Quatre disciplines fusionnées en une seule promesse : des
            expériences taillées dans le détail.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.index} delay={i * 0.08}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
