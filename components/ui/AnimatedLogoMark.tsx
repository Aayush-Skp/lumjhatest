"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

/**
 * Looping Lumjha brand badge.
 *
 * Timeline (CYCLE = 9.5s):
 *   0.00s → 1.90s   Formation: halo scales/fades in, circle outline strokes in.
 *   1.90s → 2.70s   "Lumjha" wordmark fades in.
 *   2.70s → 6.00s   Hold — everything sits still (3.3s).
 *   6.00s → 6.85s   Circle + halo gently dissolve (Lumjha stays put).
 *   6.85s → 7.60s   Only "Lumjha" remains, then zooms outward (1 → 2.4).
 *   7.60s → 8.00s   "Lumjha" fades out while continuing to grow slightly.
 *   8.00s → 9.50s   ~1.5s blank beat, then the whole loop restarts.
 */
export function AnimatedLogoMark({ className }: Props) {
  const CYCLE = 9.5; // seconds per full loop

  // Shared ease used for formation + holds.
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
      </defs>

      {/* Circle outline — strokes in, holds, then fades out FIRST while the
          Lumjha wordmark is still fully formed. */}
      <motion.circle
        cx="130"
        cy="130"
        r="82"
        stroke="url(#alm-grad)"
        strokeWidth="4.5"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          willChange: "opacity, transform",
        }}
        initial={{ pathLength: 0, opacity: 0, scale: 1 }}
        animate={{
          pathLength: [0, 1, 1, 1, 1],
          opacity: [0, 1, 1, 1, 0],
          scale: [1, 1, 1, 1, 1.08],
        }}
        transition={{
          duration: CYCLE,
          times: [0.02, 0.2, 0.3, 0.63, 0.72],
          repeat: Infinity,
          ease,
        }}
      />

      {/* Lumjha wordmark — choreographed so:
            1) it fades in after the circle is drawn,
            2) it HOLDS while the circle + halo dissolve around it,
            3) then it ZOOMS outward (scale only, opacity stays 1),
            4) then it fades away at peak scale,
            5) a ~1.5s blank beat, then the whole cycle restarts. */}
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
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          willChange: "opacity, transform",
        }}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: [0, 0, 1, 1, 1, 0],
          scale: [1, 1, 1, 1, 2.4, 2.65],
        }}
        transition={{
          duration: CYCLE,
          // 0.00  →  idle invisible
          // 0.19  →  start fade-in (after circle is drawn)
          // 0.28  →  fully visible
          // 0.72  →  circle has dissolved; Lumjha still at scale 1
          // 0.80  →  zoom complete (scale 2.4), still fully opaque
          // 0.84  →  faded out; blank beat then loops
          times: [0, 0.19, 0.28, 0.72, 0.8, 0.84],
          // One ease curve per segment → entrance, hold, zoom, and dissolve
          // each feel intentional.
          ease: [
            "linear",
            [0.22, 1, 0.36, 1], // soft easeOut for the fade-in
            "linear",
            [0.3, 0, 0.2, 1], // smooth zoom-out
            [0.3, 0, 0.7, 1], // airy fade at peak scale
          ],
          repeat: Infinity,
        }}
      >
        Lumjha
      </motion.text>
    </svg>
  );
}
