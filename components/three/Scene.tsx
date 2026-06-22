"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import IceCrystal from "./IceCrystal";

/**
 * Canvas 3D plein écran, fixé en arrière-plan derrière le contenu.
 * - lazy-mount (rien tant que le composant n'est pas monté côté client)
 * - DPR adaptatif pour préserver les fps
 * - post-processing bloom + vignette pour l'ambiance cinématique
 * - sur mobile / reduced-motion : remplacé par un fallback CSS léger
 */
export default function Scene() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallOrWeak =
      window.innerWidth < 768 ||
      navigator.hardwareConcurrency <= 4 ||
      // @ts-expect-error deviceMemory n'est pas typé partout
      (navigator.deviceMemory && navigator.deviceMemory < 4);

    setEnable3D(!reduced && !smallOrWeak);
  }, []);

  if (!enable3D) {
    // Fallback léger : halo glacial animé en CSS (aucune charge GPU 3D)
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-void"
      >
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glacier-500/30 blur-[120px] animate-pulse-glow" />
        <div className="absolute left-1/2 top-1/2 h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/20 blur-[80px]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={["#050507"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#9FD4F0" />
        <pointLight position={[-5, -3, 2]} intensity={2} color="#5FE3FF" />

        <Suspense fallback={null}>
          <IceCrystal />
          <Environment preset="night" />
          <Preload all />
        </Suspense>

        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
