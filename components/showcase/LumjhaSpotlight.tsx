"use client";

import { useRef } from "react";

/**
 * LumjhaSpotlight — preserved hover-torch wordmark.
 *
 * A giant outlined "Lumjha" sits faintly behind the panel; a bright glowing
 * copy is revealed only inside a circular torch that follows the cursor
 * (rAF-throttled, CSS mask). Zero dependencies — pure React + CSS.
 *
 * NOT wired into any route. Drop it anywhere when a footer/hero wants it:
 *
 *   import LumjhaSpotlight from "@/components/showcase/LumjhaSpotlight";
 *   <LumjhaSpotlight />
 */

const WORDMARK =
  "select-none whitespace-nowrap font-extrabold leading-none tracking-tight text-[clamp(4.5rem,19vw,15rem)]";

const TORCH =
  "radial-gradient(circle 200px at var(--mx) var(--my), #000 0%, #000 38%, transparent 72%)";

export default function LumjhaSpotlight() {
  const rootRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      spot.style.setProperty("--mx", `${x}px`);
      spot.style.setProperty("--my", `${y}px`);
    });
  };

  const setTorch = (on: boolean) => {
    const spot = spotRef.current;
    if (spot) spot.style.opacity = on ? "0.5" : "0";
  };

  return (
    <section
      ref={rootRef}
      onMouseMove={onMove}
      onMouseEnter={() => setTorch(true)}
      onMouseLeave={() => setTorch(false)}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden border-t border-white/10 bg-[#030816]"
    >
      {/* faint base wordmark, always visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className={`${WORDMARK} text-transparent opacity-[0.12]`}
          style={{ WebkitTextStroke: "2px #E8F4FF" }}
        >
          Lumjha
        </span>

        {/* bright copy revealed inside the cursor torch */}
        <div
          ref={spotRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300"
          style={{
            ["--mx" as string]: "50%",
            ["--my" as string]: "50%",
            WebkitMaskImage: TORCH,
            maskImage: TORCH,
          }}
        >
          <span
            className={`${WORDMARK} text-transparent`}
            style={{
              WebkitTextStroke: "2px #E8F4FF",
              filter:
                "drop-shadow(0 0 8px #527DFF) drop-shadow(0 0 24px rgba(82,125,255,0.4))",
            }}
          >
            Lum
            <span style={{ WebkitTextStroke: "2px #527DFF" }}>jha</span>
          </span>
        </div>
      </div>

      <p className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
        Showcase — hover to light up
      </p>
    </section>
  );
}
