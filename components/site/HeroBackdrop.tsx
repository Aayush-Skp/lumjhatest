/**
 * Hero backdrop drawn in code (replaces the old backdrop PNG): glowing light
 * waves that dip in the middle, a soft blue band beneath them, and a few
 * sparkles. Glow comes from layered strokes + gradients rather than blur
 * filters, so it costs ~4 KB and paints cheaply at any resolution.
 *
 * `xMidYMax slice` behaves like object-fit: cover anchored to the bottom.
 */

// Wave curves in a 1600×900 canvas: high at the edges, low in the centre.
const WAVES = [
  { d: "M-60 430 C 280 470, 520 770, 820 800 S 1320 650, 1660 420", stroke: "url(#hb-wave-a)", w: 2 },
  { d: "M-60 540 C 320 560, 560 820, 860 840 S 1360 720, 1660 520", stroke: "url(#hb-wave-b)", w: 1.5 },
  { d: "M-60 620 C 260 600, 520 640, 760 720 S 1220 860, 1660 700", stroke: "url(#hb-wave-b)", w: 1.25 },
  { d: "M-60 700 C 300 680, 620 880, 920 880 S 1420 800, 1660 640", stroke: "url(#hb-wave-a)", w: 1 },
];

// [x, y, radius] — scattered mostly along the lower half, like the original art
const SPARKS: [number, number, number][] = [
  [150, 610, 2.5], [96, 700, 2], [210, 790, 1.5], [330, 860, 2], [420, 700, 1.5],
  [1180, 680, 1.5], [1300, 790, 2.5], [1420, 610, 2], [1505, 700, 2.5], [1560, 520, 2],
  [1240, 560, 1.5], [700, 640, 1.5], [980, 600, 1.5],
];

export default function HeroBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        {/* stroke colours: brand blue, brightening, with a violet kick on the right */}
        <linearGradient id="hb-wave-a" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3B6BFF" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#8FB0FF" />
          <stop offset="0.6" stopColor="#527DFF" />
          <stop offset="0.85" stopColor="#A77BFF" />
          <stop offset="1" stopColor="#527DFF" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="hb-wave-b" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#527DFF" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#6E97FF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7C6BFF" stopOpacity="0.7" />
        </linearGradient>

        {/* blue band under the main wave */}
        <linearGradient id="hb-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2F55FF" stopOpacity="0.08" />
          <stop offset="0.55" stopColor="#1F3BC4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#14248A" stopOpacity="0.16" />
        </linearGradient>
        {/* brighter pools of light at the two raised edges */}
        <radialGradient id="hb-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3D63FF" stopOpacity="0.1" />
          <stop offset="1" stopColor="#3D63FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hb-spark" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#B9CCFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#527DFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* band: area under the first wave, closed along the bottom */}
      <path d={`${WAVES[0].d} L1660 960 L-60 960 Z`} fill="url(#hb-band)" />
      <ellipse cx="140" cy="720" rx="520" ry="260" fill="url(#hb-pool)" />
      <ellipse cx="1480" cy="700" rx="520" ry="260" fill="url(#hb-pool)" />

      {/* waves: a faint narrow halo + thin core */}
      {WAVES.map((wave, i) => (
        <g key={i} fill="none" stroke={wave.stroke} strokeLinecap="round" opacity={0.8}>
          <path d={wave.d} strokeWidth={wave.w * 4} strokeOpacity={0.07} />
          <path d={wave.d} strokeWidth={wave.w} />
        </g>
      ))}

      {SPARKS.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r * 4} fill="url(#hb-spark)" opacity={0.15} />
          <circle cx={x} cy={y} r={r} fill="#C9D8FF" opacity={0.55} />
        </g>
      ))}
    </svg>
  );
}
