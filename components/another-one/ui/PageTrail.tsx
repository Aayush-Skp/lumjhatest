"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Decorative curve that threads vertically THROUGH the page content (behind the
 * sections), filling with the accent colour as you scroll. A bright "bulb"
 * rides the leading edge of the fill. Sits behind content (content is z-10).
 */
export function PageTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });
  const [bulb, setBulb] = useState<{ x: number; y: number } | null>(null);
  const progress = useScrollProgress();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Build a smooth sine wave (Catmull-Rom → cubic Bézier) that weaves down the
  // page, centred horizontally.
  const cx = w / 2;
  const amp = Math.min(w * 0.3, 260);
  const waves = Math.max(3, Math.round(h / 760));
  const steps = Math.max(60, Math.min(600, Math.round(h / 18)));

  let d = "";
  if (w > 0 && h > 0) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const f = i / steps;
      pts.push([cx + amp * Math.sin(f * waves * Math.PI * 2), f * h]);
    }
    d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : pts.length - 1];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
    }
  }

  // Position the leading-edge bulb along the actual curve geometry.
  useEffect(() => {
    const p = pathRef.current;
    if (!p || !(w > 0 && h > 0) || typeof p.getTotalLength !== "function") {
      setBulb(null);
      return;
    }
    const total = p.getTotalLength();
    const pt = p.getPointAtLength(Math.min(1, Math.max(0, progress)) * total);
    setBulb({ x: pt.x, y: pt.y });
  }, [progress, w, h, d]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {w > 0 && h > 0 && (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          className="absolute inset-0"
        >
          {/* Base curve */}
          <path
            ref={pathRef}
            d={d}
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeOpacity={0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Filled portion, revealed by scroll progress */}
          <path
            d={d}
            stroke="var(--color-accent)"
            strokeWidth={2.5}
            strokeOpacity={0.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={`${progress} ${1 - progress}`}
            style={{
              filter: "drop-shadow(0 0 6px var(--color-accent-glow))",
              transition: "stroke-dasharray 0.1s linear",
            }}
          />

          {/* Glowing bulb at the leading edge of the fill */}
          {bulb && progress > 0.001 && (
            <g style={{ transition: "transform 0.1s linear" }}>
              <circle
                cx={bulb.x}
                cy={bulb.y}
                r={14}
                fill="var(--color-accent)"
                opacity={0.22}
                style={{ filter: "blur(7px)" }}
              />
              <circle
                cx={bulb.x}
                cy={bulb.y}
                r={7}
                fill="var(--color-accent)"
                opacity={0.5}
                style={{ filter: "blur(2px)" }}
              />
              <circle
                cx={bulb.x}
                cy={bulb.y}
                r={3.5}
                fill="#ffffff"
                style={{ filter: "drop-shadow(0 0 8px var(--color-accent))" }}
              />
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
