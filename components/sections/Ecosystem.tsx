"use client";

import { ecosystem } from "@/data/content";
import Reveal from "../Reveal";

/** Grille bento responsive présentant l'écosystème de la marque. */
export default function Ecosystem() {
  return (
    <section id="ecosystem" className="relative px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16">
          <span className="eyebrow mb-4 block">{ecosystem.eyebrow}</span>
          <h2 className="font-display text-giant font-medium text-frost">
            {ecosystem.title}
          </h2>
        </Reveal>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-5 md:grid-cols-3">
          {ecosystem.cells.map((cell, i) => (
            <Reveal
              key={cell.title}
              delay={i * 0.07}
              className={cell.span}
            >
              <div
                data-cursor="hover"
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 transition-colors duration-300 ${
                  cell.accent
                    ? "bg-gradient-to-br from-glacier-700/50 to-glacier-900/40"
                    : "glass"
                } hover:border-glacier-300/40`}
              >
                {cell.accent && (
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-glow/20 blur-3xl" />
                )}
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-pulse-glow" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-frost/40">
                    Module
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-medium text-frost">
                    {cell.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-frost/55">
                    {cell.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
