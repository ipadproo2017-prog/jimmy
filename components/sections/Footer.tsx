"use client";

import { footer, nav } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-glacier-700/20 px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Liens */}
          <div className="flex gap-16">
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-frost/40">
                {footer.columns[0].heading}
              </h3>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-frost/65 transition-colors hover:text-frost"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-frost/40">
                {footer.columns[1].heading}
              </h3>
              <ul className="space-y-2">
                {footer.columns[1].links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-frost/65 transition-colors hover:text-frost"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-frost/40">
            Studio créatif spécialisé dans les expériences WebGL & IA.
            Disponible partout — basé dans le froid.
          </p>
        </div>

        {/* Gros wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none text-center font-display font-semibold leading-none text-gradient"
          style={{ fontSize: "clamp(4rem, 22vw, 20rem)", letterSpacing: "-0.04em" }}
        >
          {footer.wordmark}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-glacier-700/20 pt-8 text-xs text-frost/35 md:flex-row">
          <span>{footer.legal}</span>
          <span>Made with ❄ — 60fps, accessible & responsive.</span>
        </div>
      </div>
    </footer>
  );
}
