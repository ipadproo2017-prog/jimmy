"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brand, nav } from "@/data/content";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7 ${
          scrolled ? "glass-strong mx-4 md:mx-auto" : "bg-transparent"
        }`}
        aria-label="Navigation principale"
      >
        <a
          href="#top"
          className="text-lg font-semibold tracking-[0.2em] text-frost"
          aria-label={`${brand.name} — accueil`}
        >
          {brand.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm text-frost/70 transition-colors hover:text-frost"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-glow transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <MagneticButton
          href="#cta"
          className="hidden rounded-full border border-glacier-300/30 px-5 py-2 text-sm text-frost transition-colors hover:border-cyan-glow hover:text-cyan-glow md:inline-flex"
        >
          Contact
        </MagneticButton>

        {/* Burger mobile */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-frost transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-frost transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong mx-4 mt-2 flex flex-col gap-2 rounded-2xl p-4 md:hidden"
        >
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-frost/80 hover:bg-glacier-700/30 hover:text-frost"
              >
                {item.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  );
}
