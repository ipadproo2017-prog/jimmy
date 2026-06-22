"use client";

import { motion } from "framer-motion";
import { hero } from "@/data/content";
import MagneticButton from "../MagneticButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 2.5 },
  },
};

const line = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-20 pt-32 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="eyebrow mb-8"
      >
        {hero.eyebrow}
      </motion.div>

      {/* Titre choc, reveal ligne par ligne avec masque */}
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display text-mega font-semibold text-balance"
      >
        {hero.titleLines.map((l, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              variants={line}
              className={`block ${i === 1 ? "text-gradient" : "text-frost"}`}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="max-w-md text-base leading-relaxed text-frost/60 md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <MagneticButton
            href="#manifesto"
            className="group rounded-full border border-glacier-300/30 px-7 py-4 text-sm uppercase tracking-[0.2em] text-frost transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            {hero.cta}
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-frost/40">
          Scroll
        </span>
        <span className="h-10 w-px animate-pulse-glow bg-gradient-to-b from-cyan-glow to-transparent" />
      </motion.div>
    </section>
  );
}
