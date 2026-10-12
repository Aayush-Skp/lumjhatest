"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";

/**
 * Giant outlined "Lumjha" for the bottom of the footer.
 *
 * A faint outline is always visible; on desktop a soft torch follows the
 * cursor and reveals a brighter copy with "jha" in the brand blue. Adapted
 * from components/showcase/LumjhaSpotlight.tsx (kept intact for reuse).
 */

const WORDMARK =
  "block select-none whitespace-nowrap text-center font-extrabold pb-[0.08em] leading-[0.9] tracking-[-0.04em] text-transparent text-[min(24vw,22rem)] [-webkit-text-stroke-width:1px] sm:[-webkit-text-stroke-width:1.5px] lg:[-webkit-text-stroke-width:2px]";

const TORCH =
  "radial-gradient(circle 180px at var(--mx) var(--my), #000 0%, #000 35%, transparent 75%)";

export default function FooterWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  // Mouse only — on touch screens the outline simply stays static.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    spot.style.opacity = "1";
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      spot.style.setProperty("--mx", `${x}px`);
      spot.style.setProperty("--my", `${y}px`);
    });
  };

  const onLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
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
      <span className={WORDMARK} style={{ WebkitTextStrokeColor: "rgba(232,244,255,0.2)" }}>
        Lumjha
      </span>

      {/* brighter copy revealed inside the cursor torch */}
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
            WebkitTextStrokeColor: "rgba(232,244,255,0.85)",
            filter: "drop-shadow(0 0 10px rgba(82,125,255,0.35))",
          }}
        >
          Lum<span style={{ WebkitTextStrokeColor: "#527DFF" }}>jha</span>
        </span>
      </div>
    </div>
  );
}
