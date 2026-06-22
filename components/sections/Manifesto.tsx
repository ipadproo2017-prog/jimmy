"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { manifesto } from "@/data/content";
import Reveal from "../Reveal";

/**
 * Manifeste : les lignes du grand texte se révèlent une à une au scroll
 * (passage de l'opacité faible → forte), façon "lecture guidée".
 */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-line");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative mx-auto max-w-6xl px-6 py-32 md:px-12 md:py-48"
    >
      <Reveal as="span" className="eyebrow mb-12 block">
        {manifesto.eyebrow}
      </Reveal>

      <h2 className="font-display text-giant font-medium">
        {manifesto.lines.map((l, i) => (
          <span key={i} className="manifesto-line block text-frost">
            {l}
          </span>
        ))}
      </h2>

      <Reveal
        as="p"
        className="ml-auto mt-16 max-w-xl text-lg leading-relaxed text-frost/55 md:text-xl"
      >
        {manifesto.paragraph}
      </Reveal>
    </section>
  );
}
