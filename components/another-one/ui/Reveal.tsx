"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
}

/**
 * Per-item scroll reveal — fades + lifts a single element when it enters the
 * viewport. Used to stagger cards within a grid (pass delay = index * step).
 * Respects prefers-reduced-motion. Extra props (e.g. data-* attributes) are
 * forwarded to the underlying element.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: RevealProps & HTMLMotionProps<"div">) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
