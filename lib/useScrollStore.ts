"use client";

import { useEffect, useRef } from "react";

/**
 * Store minimal (sans dépendance) qui expose la progression globale du scroll
 * (0 → 1) sous forme de ref mutable, lisible à 60 fps dans useFrame de R3F
 * sans déclencher de re-render React.
 */

type ProgressRef = { current: number };

// Singleton partagé entre le canvas 3D et le reste de l'app.
const sharedProgress: ProgressRef = { current: 0 };

let listening = false;

function ensureListener() {
  if (listening || typeof window === "undefined") return;
  listening = true;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sharedProgress.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/**
 * API façon "selector" pour rester proche d'un store classique.
 * Exemple : const progress = useScrollStore((s) => s.progress);
 */
export function useScrollStore<T>(selector: (s: { progress: ProgressRef }) => T): T {
  // Garantit que le listener est branché côté client.
  const inited = useRef(false);
  if (!inited.current) {
    ensureListener();
    inited.current = true;
  }
  return selector({ progress: sharedProgress });
}

/** Hook pratique pour brancher le listener au montage (ex: au niveau page). */
export function useInitScrollProgress() {
  useEffect(() => {
    ensureListener();
  }, []);
}

export { sharedProgress };
