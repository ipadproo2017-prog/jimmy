"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "@/lib/useScrollStore";

/**
 * Objet "signature" : un cristal de glace facetté en verre dépoli.
 * - tourne en continu
 * - réagit à la position de la souris (pointer)
 * - évolue selon la progression du scroll (échelle + rotation + déformation)
 */
export default function IceCrystal() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const progress = useScrollStore((s) => s.progress);

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;
    const p = progress.current; // 0 → 1 sur toute la page

    // Rotation continue + influence souris
    const { x, y } = state.pointer;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      y * 0.35 + p * Math.PI * 0.6,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      x * 0.25,
      0.04
    );

    // Le cristal se "rapproche" puis recule selon le scroll
    const scale = 1.6 + Math.sin(p * Math.PI) * 0.5;
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, scale, 0.06)
    );

    // Léger flottement vertical lié au scroll
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      -p * 1.2,
      0.05
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group} scale={1.6}>
        <mesh ref={mesh}>
          {/* Icosaèdre facetté, detail 0 = facettes nettes facon cristal taillé */}
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.4}
            roughness={0.12}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropy={0.4}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.15}
            color="#9FD4F0"
            attenuationColor="#4FA8D8"
            attenuationDistance={1.6}
          />
        </mesh>

        {/* Halo interne lumineux */}
        <mesh scale={0.45}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#5FE3FF" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}
