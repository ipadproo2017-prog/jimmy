"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Stats from "@/components/sections/Stats";
import Ecosystem from "@/components/sections/Ecosystem";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { useInitScrollProgress } from "@/lib/useScrollStore";

// La 3D ne doit jamais être rendue côté serveur (accès à WebGL / window).
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export default function Home() {
  useInitScrollProgress();

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />

      {/* Décor 3D fixé en arrière-plan */}
      <Scene />

      <Navbar />

      <main className="relative">
        <Hero />
        <Manifesto />
        <Features />
        <Showcase />
        <Stats />
        <Ecosystem />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
