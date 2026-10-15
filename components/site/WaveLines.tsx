/**
 * Quiet section backdrop: a few thin light lines drifting across, the
 * pared-down sibling of HeroBackdrop. `preserveAspectRatio="none"` stretches
 * the curves to any section size while `non-scaling-stroke` keeps them hairline.
 */

// Curves in a 1600×400 canvas; each line fades in and out at the edges.
const LINES = [
  { d: "M-20 70 C 300 40, 520 230, 820 235 S 1300 110, 1620 170", opacity: 0.55, w: 1.25 },
  { d: "M-20 140 C 280 120, 560 310, 860 305 S 1340 190, 1620 250", opacity: 0.35, w: 1 },
  { d: "M-20 320 C 400 270, 700 370, 1000 335 S 1400 270, 1620 310", opacity: 0.25, w: 1 },
];

export default function WaveLines() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1600 400" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wl-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#527DFF" stopOpacity="0" />
          <stop offset="0.25" stopColor="#527DFF" />
          <stop offset="0.6" stopColor="#8FB0FF" />
          <stop offset="0.85" stopColor="#7C6BFF" />
          <stop offset="1" stopColor="#527DFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {LINES.map((line) => (
        <path
          key={line.d}
          d={line.d}
          fill="none"
          stroke="url(#wl-stroke)"
          strokeWidth={line.w}
          strokeOpacity={line.opacity}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
