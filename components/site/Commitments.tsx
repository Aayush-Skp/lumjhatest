import type { ReactNode, SVGProps } from "react";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";

/* ============================================================
   "Our Commitments" — bento grid: the glowing shield owns the centre
   tile, two promise cards either side, one full-width card below.
   ============================================================ */

function Outline({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {children}
    </svg>
  );
}

const LockIcon = (p: SVGProps<SVGSVGElement>) => (
  <Outline {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15" r="1.3" />
    <path d="M12 16.3v1.7" />
  </Outline>
);

const ShareIcon = (p: SVGProps<SVGSVGElement>) => (
  <Outline {...p}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
  </Outline>
);

const CapIcon = (p: SVGProps<SVGSVGElement>) => (
  <Outline {...p}>
    <path d="M2 9.5 12 5l10 4.5L12 14z" />
    <path d="M6 11.3v4.2c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.2" />
    <path d="M22 9.5v5" />
  </Outline>
);

const ChatIcon = (p: SVGProps<SVGSVGElement>) => (
  <Outline {...p}>
    <path d="M3 5.5A2 2 0 0 1 5 3.5h9a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2H8l-3.5 3v-3H5a2 2 0 0 1-2-2z" />
    <path d="M6.5 7.5h6M6.5 10h4" />
    <path d="M18.5 8.5H19a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-.5v3L15 18h-4a2 2 0 0 1-2-2v-.5" />
  </Outline>
);

const DatabaseShieldIcon = (p: SVGProps<SVGSVGElement>) => (
  <Outline {...p}>
    <ellipse cx="10" cy="5" rx="7" ry="2.5" />
    <path d="M3 5v12c0 1.4 3.1 2.5 7 2.5M17 5v5" />
    <path d="M3 11c0 1.4 3.1 2.5 7 2.5" />
    <path d="M17.5 12.5 14 14v2.6c0 2.2 1.5 3.7 3.5 4.4 2-.7 3.5-2.2 3.5-4.4V14z" />
    <path d="m16 16.8 1.1 1.1 2-2" />
  </Outline>
);

const COMMITMENTS = [
  { title: "Your content stays private", body: "We never access your private business content without permission.", icon: LockIcon },
  { title: "Your data stays yours", body: "We never share your data with other businesses.", icon: ShareIcon },
  { title: "Your content isn’t used for training", body: "We never train AI on your content without your consent.", icon: CapIcon },
  { title: "Customer conversations stay private", body: "We never expose your customers’ conversations.", icon: ChatIcon },
  { title: "Your data is preserved", body: "Pausing your account does not delete your content; your data is safely preserved.", icon: DatabaseShieldIcon },
];

/** Glowing shield + padlock standing on a ring of light (drawn in code). */
function ShieldArt() {
  return (
    <svg aria-hidden viewBox="0 0 320 380" className="mx-auto h-auto w-full max-w-[240px]">
      <defs>
        <linearGradient id="cm-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4F7BFF" />
          <stop offset="1" stopColor="#1D3FD8" />
        </linearGradient>
        <linearGradient id="cm-inner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3561F5" />
          <stop offset="0.5" stopColor="#2448E0" />
          <stop offset="0.5" stopColor="#1E3CC4" />
          <stop offset="1" stopColor="#1A33A8" />
        </linearGradient>
        <linearGradient id="cm-lock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6EDFF" />
          <stop offset="1" stopColor="#A9BFFF" />
        </linearGradient>
        <radialGradient id="cm-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#527DFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#527DFF" stopOpacity="0" />
        </radialGradient>
        <filter id="cm-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feComponentTransfer in="b" result="b">
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* floor: pool of light + rings */}
      <ellipse cx="160" cy="330" rx="150" ry="40" fill="url(#cm-floor)" />
      <ellipse cx="160" cy="330" rx="140" ry="32" fill="none" stroke="#527DFF" strokeOpacity="0.35" />
      <ellipse cx="160" cy="330" rx="104" ry="22" fill="none" stroke="#7FA0FF" strokeOpacity="0.7" strokeWidth="2" filter="url(#cm-glow)" />

      {/* shield + padlock, hovering gently above the ring */}
      <g className="float-soft">
        <g filter="url(#cm-glow)">
          <path d="M160 22 262 62v92c0 74-44 128-102 152C102 282 58 228 58 154V62z" fill="url(#cm-shield)" stroke="#8FB0FF" strokeWidth="4" strokeLinejoin="round" />
        </g>
        <path d="M160 44 242 76v78c0 62-36 108-82 129-46-21-82-67-82-129V76z" fill="url(#cm-inner)" stroke="#6E8BFF" strokeOpacity="0.6" strokeWidth="1.5" />
        <path d="M134 150v-16a26 26 0 0 1 52 0v16" fill="none" stroke="url(#cm-lock)" strokeWidth="11" strokeLinecap="round" />
        <rect x="116" y="146" width="88" height="70" rx="14" fill="url(#cm-lock)" />
        <circle cx="160" cy="174" r="9" fill="#1E3CC4" />
        <path d="M155 178h10l-2 20h-6z" fill="#1E3CC4" />
      </g>
    </svg>
  );
}

/* ---------- tiles ---------- */

/* Flat tiles in the site's own card language: solid surface, hairline edge.
   Light theme adds a soft lift so white cards separate from the page. */
const TILE =
  "relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_0_rgb(255_255_255/0.04)_inset,0_16px_32px_-18px_rgb(0_0_0/0.8)] light:border-card-ring light:bg-white light:shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-14px_rgb(15_23_42/0.18)]";

/* Hover: the tile rises a touch and its shadow deepens; its drawing grows (see ART_HOVER). */
const LIFT =
  "group transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-[#527DFF]/40 hover:shadow-[0_1px_0_rgb(255_255_255/0.05)_inset,0_24px_44px_-20px_rgb(0_0_0/0.9)] light:hover:shadow-[0_2px_4px_rgb(15_23_42/0.06),0_22px_40px_-18px_rgb(15_23_42/0.24)] motion-reduce:hover:translate-y-0";

/* The drawing slowly grows and lifts while its tile is hovered, and eases back. */
const ART_HOVER =
  "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100";

/* Each promise draws its own idea in the same thin blue line language. */
const ART = "text-[#527DFF] light:text-[#3E63F2]";

function Copy({ c }: { c: (typeof COMMITMENTS)[number] }) {
  return (
    <div className="relative">
      <h3 className="text-[15px] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[17px] md:text-[18px]">{c.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-[14px]">{c.body}</p>
    </div>
  );
}

/** Text on the left, the promise's drawing on the right, both vertically centred. */
function PromiseTile({ c, art, className }: { c: (typeof COMMITMENTS)[number]; art: ReactNode; className: string }) {
  return (
    <li className={`flex flex-col items-start gap-3 p-4 sm:gap-4 sm:p-5 md:p-6 desk:flex-row desk:items-center desk:justify-between desk:gap-5 ${TILE} ${LIFT} ${className}`}>
      <div className="min-w-0 flex-1">
        <Copy c={c} />
      </div>
      <div aria-hidden className={`order-first max-w-full shrink-0 origin-center sm:order-none [&>svg]:max-w-full ${ART_HOVER}`}>
        {art}
      </div>
    </li>
  );
}

/** Private: a lock inside a guarded perimeter; outside signals stop at the ring. */
function PerimeterArt() {
  return (
    <svg aria-hidden viewBox="0 0 240 170" className={`h-[72px] w-auto md:h-[100px] ${ART}`}>
      <circle cx="120" cy="85" r="78" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 6" strokeLinecap="round" className="cm-spin" />
      <circle cx="120" cy="85" r="58" fill="none" stroke="currentColor" strokeOpacity="0.3" className="cm-breathe" />
      <circle cx="120" cy="85" r="38" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.55" />
      {[[22, 40], [218, 52], [30, 132], [212, 128], [120, 4]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" fillOpacity="0.35" />
      ))}
      <rect x="92" y="57" width="56" height="56" rx="16" fill="currentColor" />
      <LockIcon x="101" y="66" width="38" height="38" className="text-white" strokeWidth={1.8} />
    </svg>
  );
}

/** Yours: your node sits inside its own boundary; other businesses stay outside it. */
function IsolationArt() {
  const outside = [[24, 22], [24, 98], [216, 22], [216, 98], [120, 112]];
  return (
    <svg aria-hidden viewBox="0 0 240 120" className={`h-[72px] w-auto md:h-[100px] ${ART}`}>
      {outside.map(([x, y]) => {
        const a = Math.atan2(60 - y, 120 - x);
        return (
          <g key={`${x}-${y}`}>
            <line x1={x} y1={y} x2={120 - Math.cos(a) * 44} y2={60 - Math.sin(a) * 44} stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 4" />
            <circle cx={x} cy={y} r="7" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          </g>
        );
      })}
      <circle cx="120" cy="60" r="36" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.7" strokeDasharray="4 4" className="cm-spin" />
      <circle cx="120" cy="60" r="16" fill="currentColor" className="cm-ripple" />
      <circle cx="120" cy="60" r="16" fill="currentColor" />
      <circle cx="120" cy="60" r="5" fill="white" />
    </svg>
  );
}

/** Not for training: a dot matrix of "model weights" your content never enters. */
function TrainingArt() {
  const cols = 12;
  const rows = 6;
  return (
    <svg aria-hidden viewBox="0 0 260 130" className={`h-[72px] w-auto md:h-[100px] ${ART}`}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const x = 20 + (i % cols) * 20;
        const y = 15 + Math.floor(i / cols) * 20;
        const twinkle = i % 7 === 3;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.6"
            fill="currentColor"
            fillOpacity={0.14 + ((i * 7) % 5) * 0.06}
            className={twinkle ? "cm-twinkle" : undefined}
            style={twinkle ? { animationDelay: `${(i % 5) * 0.7}s` } : undefined}
          />
        );
      })}
      <circle cx="130" cy="65" r="38" fill="rgb(8 14 32)" className="light:fill-white" stroke="currentColor" strokeWidth="2.5" />
      <path d="M103 92 157 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <CapIcon x="114" y="49" width="32" height="32" strokeWidth={1.6} />
    </svg>
  );
}

/** Conversations: chat bubbles whose content is sealed. */
function RedactedArt() {
  return (
    <svg aria-hidden viewBox="0 0 240 110" className={`h-[64px] w-auto md:h-[84px] ${ART}`}>
      <g className="cm-bob">
        <rect x="10" y="10" width="140" height="40" rx="14" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="26" y="24" width="64" height="5" rx="2.5" fill="currentColor" fillOpacity="0.55" />
        <rect x="26" y="34" width="96" height="5" rx="2.5" fill="currentColor" fillOpacity="0.3" />
      </g>
      <g className="cm-bob cm-bob-late">
        <rect x="90" y="60" width="140" height="40" rx="14" fill="currentColor" />
        <rect x="106" y="74" width="80" height="5" rx="2.5" fill="white" fillOpacity="0.7" />
        <rect x="106" y="84" width="54" height="5" rx="2.5" fill="white" fillOpacity="0.45" />
        <circle cx="206" cy="80" r="11" fill="white" />
        <LockIcon x="198" y="72" width="16" height="16" strokeWidth={2} />
      </g>
    </svg>
  );
}

/** Preserved: content layers stay stacked while the account is paused. */
function PreservedArt() {
  return (
    <div aria-hidden className="relative flex items-center gap-4">
      <div className="relative h-[78px] w-[124px] shrink-0">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ bottom: `${i * 15}px`, opacity: 0.45 + i * 0.25 }}
            className={`absolute left-0 h-[34px] w-full rounded-[11px] border border-[#527DFF]/60 bg-[#527DFF]/20 light:bg-[#527DFF]/12 ${i === 2 ? "cm-float" : ""}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 text-[12px] font-semibold">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-muted light:border-[#D7E3F5] light:bg-white">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor"><rect x="3.5" y="3" width="3" height="10" rx="1" /><rect x="9.5" y="3" width="3" height="10" rx="1" /></svg>
          Account paused
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#527DFF] px-2.5 py-1 text-white">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>
          Content preserved
        </span>
      </div>
    </div>
  );
}

export default function Commitments() {
  const [privateC, yours, training, convos, preserved] = COMMITMENTS;
  return (
    <section id="commitments" className={`relative mx-auto max-w-[1240px] px-4 sm:px-6 ${SECTION_Y}`}>
      <SectionHeader
        title={
          <>
            Our <span className="text-highlight">Commitments</span>
          </>
        }
        subtitle="Transparency you can count on."
      />

      {/* Phones: 2 columns (four promises 2×2, the preserved strip full width).
          Tablets: 3 columns (three promises, then one + the strip across two).
          From 1020px: 12 columns, two promises | shield | two promises, strip underneath.
          The shield only appears from 1020px. */}
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 desk:grid-cols-12 ${SECTION_HEAD_GAP}`}>
        <div className={`hidden items-center justify-center desk:col-span-2 desk:col-start-6 desk:row-span-2 desk:row-start-1 desk:flex desk:px-3 ${TILE}`}>
          <div className="w-full max-w-[140px]">
            <ShieldArt />
          </div>
        </div>

        <ul role="list" className="contents">
          <PromiseTile c={privateC} art={<PerimeterArt />} className="desk:col-span-5 desk:col-start-1 desk:row-start-1" />
          <PromiseTile c={yours} art={<IsolationArt />} className="desk:col-span-5 desk:col-start-8 desk:row-start-1" />
          <PromiseTile c={training} art={<TrainingArt />} className="desk:col-span-5 desk:col-start-1 desk:row-start-2" />
          <PromiseTile c={convos} art={<RedactedArt />} className="desk:col-span-5 desk:col-start-8 desk:row-start-2" />
          <PromiseTile c={preserved} art={<PreservedArt />} className="col-span-2 desk:col-span-12 desk:row-start-3 desk:px-8" />
        </ul>
      </div>
    </section>
  );
}
