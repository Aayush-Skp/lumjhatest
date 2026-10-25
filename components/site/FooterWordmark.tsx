"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Giant outlined "Lumjha" for the bottom of the footer.
 *
 * A faint outline is always visible. Each time the wordmark scrolls into
 * view, a torch sweeps once from left to right revealing a brighter copy
 * (with "jha" in the brand blue); after that the torch follows the mouse.
 * Adapted from components/showcase/LumjhaSpotlight.tsx (kept intact for reuse).
 */

const WORDMARK =
  "block select-none whitespace-nowrap text-center font-extrabold pb-[0.08em] leading-[0.9] tracking-[-0.04em] text-transparent text-[min(24vw,22rem)] [-webkit-text-stroke-width:1px] sm:[-webkit-text-stroke-width:1.5px] lg:[-webkit-text-stroke-width:2px]";

const TORCH =
  "radial-gradient(circle 180px at var(--mx) var(--my), #000 0%, #000 35%, transparent 75%)";

const SWEEP_MS = 1800;

export default function FooterWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const sweepRef = useRef(0); // rAF id of a running sweep, 0 when idle
  const hoverRef = useRef(false);

  const place = (x: number, y: number) => {
    const spot = spotRef.current;
    if (!spot) return;
    spot.style.setProperty("--mx", `${x}px`);
    spot.style.setProperty("--my", `${y}px`);
  };

  const stopSweep = () => {
    cancelAnimationFrame(sweepRef.current);
    sweepRef.current = 0;
  };

  // Auto sweep on entering the viewport.
  useEffect(() => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sweep = () => {
      if (hoverRef.current || sweepRef.current) return;
      const { width, height } = root.getBoundingClientRect();
      const start = performance.now();
      spot.style.opacity = "1";
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / SWEEP_MS);
        const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; // easeInOutQuad
        // travel from just off the left edge to just off the right edge
        place(-0.1 * width + eased * 1.2 * width, height * 0.5);
        if (t < 1) {
          sweepRef.current = requestAnimationFrame(step);
        } else {
          sweepRef.current = 0;
          if (!hoverRef.current) spot.style.opacity = "0";
        }
      };
      sweepRef.current = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sweep();
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      stopSweep();
    };
  }, []);

  // Mouse only — touch screens just get the sweep.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;
    hoverRef.current = true;
    stopSweep(); // the visitor takes over mid-sweep
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    spot.style.opacity = "1";
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      place(x, y);
    });
  };

  const onLeave = () => {
    hoverRef.current = false;
    if (spotRef.current && !sweepRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="relative overflow-hidden"
    >
      {/* faint outline, always visible */}
      <span className={WORDMARK} style={{ WebkitTextStrokeColor: "color-mix(in srgb, var(--site-ink) 20%, transparent)" }}>
        Lumjha
      </span>

      {/* brighter copy revealed inside the torch */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          ["--mx" as string]: "50%",
          ["--my" as string]: "50%",
          WebkitMaskImage: TORCH,
          maskImage: TORCH,
        }}
      >
        <span
          className={WORDMARK}
          style={{
            WebkitTextStrokeColor: "color-mix(in srgb, var(--site-ink) 85%, transparent)",
            filter: "drop-shadow(0 0 10px rgba(82,125,255,0.35))",
          }}
        >
          Lum<span style={{ WebkitTextStrokeColor: "#527DFF" }}>jha</span>
        </span>
      </div>
    </div>
  );
}
