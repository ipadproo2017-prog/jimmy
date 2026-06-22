"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur personnalisé "givré" : un point précis + un anneau qui suit avec
 * inertie. S'agrandit au survol des éléments interactifs.
 * Désactivé sur écrans tactiles / pointeurs grossiers et en reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      // Inertie sur l'anneau
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactiveSelector = 'a, button, [data-cursor="hover"], input, textarea';
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSelector)) ring.classList.add("cursor-grow");
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(interactiveSelector)) ring.classList.remove("cursor-grow");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-cyan-glow"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border border-glacier-300/60 transition-[width,height,opacity] duration-300"
        style={{ willChange: "transform" }}
      />
      <style>{`
        .cursor-ring.cursor-grow {
          width: 64px;
          height: 64px;
          background: rgba(95, 227, 255, 0.08);
          border-color: rgba(95, 227, 255, 0.5);
        }
      `}</style>
    </>
  );
}
