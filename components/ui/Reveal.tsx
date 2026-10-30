"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Stagger in seconds. */
  delay?: number;
  className?: string;
}

/**
 * Scroll reveal: fade + 12px translate, 400ms ease-out, fires once.
 * Reduced-motion users get the content immediately, no transform.
 */
export function Reveal({ children, delay = 0, className }: RevealProps): JSX.Element {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  );
}
