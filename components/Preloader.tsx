"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/data/content";

/**
 * Préloader cinématique : compteur 0 → 100 %, barre de givre, puis reveal
 * par un rideau qui se lève. Bloque le scroll tant qu'il est actif.
 */
export default function Preloader({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 400 : 1900;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-out cubic, avec quelques paliers pour un rendu "mécanique"
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("lenis-stopped");
          onDone?.();
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-void"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-8 px-8">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl font-light tracking-[0.25em] text-frost md:text-4xl"
            >
              {brand.name}
            </motion.span>

            {/* Barre de progression givrée */}
            <div className="relative h-px w-56 overflow-hidden bg-glacier-700/40 md:w-72">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-glacier-300 to-cyan-glow"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-mono text-xs tracking-widest text-glacier-300/80 tabular-nums">
              {String(progress).padStart(3, "0")} %
            </span>
          </div>

          <span className="absolute bottom-8 text-[10px] uppercase tracking-[0.4em] text-glacier-500/60">
            {brand.tagline}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
