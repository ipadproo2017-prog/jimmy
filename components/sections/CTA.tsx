"use client";

import { cta, brand } from "@/data/content";
import Reveal from "../Reveal";
import MagneticButton from "../MagneticButton";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 py-32 text-center md:px-12"
    >
      <Reveal as="span" className="eyebrow mb-8 block">
        {cta.eyebrow}
      </Reveal>

      <Reveal>
        <h2 className="mx-auto max-w-4xl font-display text-giant font-medium text-balance text-frost">
          {cta.title}
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <MagneticButton
          href={`mailto:${brand.email}`}
          strength={0.5}
          className="rounded-full bg-frost px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-void transition-colors hover:bg-cyan-glow"
        >
          {cta.button}
        </MagneticButton>
      </Reveal>

      <Reveal delay={0.3} as="p" className="mt-8 text-sm text-frost/40">
        ou écrivez-nous à{" "}
        <a
          href={`mailto:${brand.email}`}
          className="text-glacier-300 underline-offset-4 hover:underline"
        >
          {brand.email}
        </a>
      </Reveal>
    </section>
  );
}
