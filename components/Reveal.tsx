"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wrapper de reveal "à l'entrée dans le viewport" (masque + translation).
 * S'appuie sur framer-motion whileInView ; dégrade proprement en reduced-motion
 * (framer-motion respecte le réglage système via les transitions courtes du CSS).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
