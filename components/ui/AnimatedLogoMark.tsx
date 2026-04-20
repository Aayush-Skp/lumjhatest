"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

/**
 * Looping decorative "AI" brand badge.
 *
 * One cycle (~9s):
 *   1. A soft brand-halo scales/fades in behind the circle.
 *   2. The circle outline stroke-draws itself.
 *   3. "AI" fades in inside the circle.
 *   4. Everything holds for a beat, then gently fades out before the
 *      cycle restarts — giving an endless, breathing loop.
 */
export function AnimatedLogoMark({ className }: Props) {
  const CYCLE = 9; // seconds per full loop

  // Shared ease for a smooth, silky feel.
  const ease = [0.45, 0, 0.25, 1] as const;

  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      aria-hidden
      className={cn("select-none", className)}
    >
      <defs>
        <linearGradient id="alm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-200))" />
          <stop offset="55%" stopColor="rgb(var(--brand-300))" />
          <stop offset="100%" stopColor="rgb(var(--brand-500))" />
        </linearGradient>
        <filter
          id="alm-glow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Soft radial halo behind the AI badge */}
      <motion.circle
        cx="130"
        cy="130"
        r="110"
        fill="rgb(var(--brand-400) / 0.35)"
        filter="url(#alm-glow)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.4, 1, 1, 0.9],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.15, 0.82, 0.95],
          repeat: Infinity,
          ease,
        }}
      />

      {/* Circle outline */}
      <motion.circle
        cx="130"
        cy="130"
        r="82"
        stroke="url(#alm-grad)"
        strokeWidth="4.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0.02, 0.22, 0.82, 0.95],
          repeat: Infinity,
          ease,
        }}
      />

      {/* Lumjha wordmark — pure opacity fade (no y-attribute animation) to
          keep SVG text rendering stable across frames. */}
      <motion.text
        x="130"
        y="130"
        textAnchor="middle"
        dominantBaseline="central"
        fill="url(#alm-grad)"
        fontFamily="'Inter Tight', system-ui, sans-serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="-0.02em"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: CYCLE,
          times: [0, 0.18, 0.3, 0.82, 0.92],
          repeat: Infinity,
          ease,
        }}
      >
        Lumjha
      </motion.text>
    </svg>
  );
}
