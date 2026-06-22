"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingOrbProps {
  size: number;
  color: string;
  opacity?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

/**
 * Ambient decorative blob — an absolutely positioned SVG radial gradient that
 * drifts on a slow idle loop. Purely decorative: no pointer events, no select.
 */
export default function FloatingOrb({
  size,
  color,
  opacity = 0.15,
  top,
  left,
  right,
  bottom,
}: FloatingOrbProps) {
  const reduced = useReducedMotion();
  const id = `orb-${color.replace("#", "")}-${size}`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute select-none"
      style={{ width: size, height: size, top, left, right, bottom, opacity }}
      animate={
        reduced ? undefined : { scale: [1, 1.08, 1], x: [0, 12, 0], y: [0, -8, 0] }
      }
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <radialGradient id={id} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill={`url(#${id})`} />
      </svg>
    </motion.div>
  );
}
