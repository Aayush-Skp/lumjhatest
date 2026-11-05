import type { ReactNode, SVGProps } from "react";
import { SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";

/* ============================================================
   "Our Commitments" — glowing shield on the left, promise cards
   on the right (2 × 2 grid + one full-width card).
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
    <svg aria-hidden viewBox="0 0 320 380" className="h-auto w-full max-w-[300px]">
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
          <stop offset="0" stopColor="#527DFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#527DFF" stopOpacity="0" />
        </radialGradient>
        <filter id="cm-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* floor: pool of light + rings */}
      <ellipse cx="160" cy="330" rx="150" ry="40" fill="url(#cm-floor)" />
      <ellipse cx="160" cy="330" rx="140" ry="32" fill="none" stroke="#527DFF" strokeOpacity="0.35" />
      <ellipse cx="160" cy="330" rx="104" ry="22" fill="none" stroke="#7FA0FF" strokeOpacity="0.9" strokeWidth="2" filter="url(#cm-glow)" />

      {/* shield */}
      <g filter="url(#cm-glow)">
        <path d="M160 22 262 62v92c0 74-44 128-102 152C102 282 58 228 58 154V62z" fill="url(#cm-shield)" stroke="#8FB0FF" strokeWidth="4" strokeLinejoin="round" />
      </g>
      <path d="M160 44 242 76v78c0 62-36 108-82 129-46-21-82-67-82-129V76z" fill="url(#cm-inner)" stroke="#6E8BFF" strokeOpacity="0.6" strokeWidth="1.5" />

      {/* padlock */}
      <path d="M134 150v-16a26 26 0 0 1 52 0v16" fill="none" stroke="url(#cm-lock)" strokeWidth="11" strokeLinecap="round" />
      <rect x="116" y="146" width="88" height="70" rx="14" fill="url(#cm-lock)" />
      <circle cx="160" cy="174" r="9" fill="#1E3CC4" />
      <path d="M155 178h10l-2 20h-6z" fill="#1E3CC4" />
    </svg>
  );
}

function Card({ c, wide }: { c: (typeof COMMITMENTS)[number]; wide?: boolean }) {
  return (
    <li
      className={`flex items-start gap-4 rounded-2xl border border-[#527DFF]/30 bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-[#527DFF]/60 md:gap-5 md:p-6 light:border-card-ring light:bg-white ${wide ? "sm:col-span-2 sm:items-center" : ""}`}
    >
      <c.icon className="h-9 w-9 shrink-0 text-[#6E8BFF] md:h-10 md:w-10 light:text-[#3E63F2]" />
      <span className="min-w-0">
        <span className="block text-[16px] font-bold leading-snug text-ink md:text-[17px]">{c.title}</span>
        <span className="mt-1.5 block text-[14px] leading-relaxed text-muted">{c.body}</span>
      </span>
    </li>
  );
}

export default function Commitments() {
  const last = COMMITMENTS.length - 1;
  return (
    <section id="commitments" className={`relative mx-auto max-w-[1240px] px-4 sm:px-6 ${SECTION_Y}`}>
      <div className="text-center">
        <h2 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-[44px]">
          Our <span className="text-highlight">Commitments</span>
        </h2>
        <p className="mt-4 text-[15px] text-ink/85 sm:text-lg md:mt-5 md:text-xl">Transparency you can count on.</p>
        <span aria-hidden className="mx-auto mt-5 block h-0.5 w-12 rounded-full bg-[#527DFF]" />
      </div>

      <div className={`grid items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:gap-12 ${SECTION_HEAD_GAP}`}>
        <div className="mx-auto w-48 sm:w-60 lg:w-full">
          <ShieldArt />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {COMMITMENTS.map((c, i) => (
            <Card key={c.title} c={c} wide={i === last} />
          ))}
        </ul>
      </div>
    </section>
  );
}
