"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode, TouchEvent } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import ChannelReels, { CHANNELS } from "@/components/site/ChannelReels";
import HeroOrbit from "@/components/site/HeroOrbit";
import FeatureMarquee from "@/components/site/FeatureMarquee";
import ContactDisclosure from "@/components/site/ContactDisclosure";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import BlueButton from "@/components/ui/BlueButton";
import Tilt from "@/components/ui/Tilt";

/* ============================================================
   Lumjha — main landing page (Figma design, mobile-first)
   ============================================================ */

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-[#527DFF] px-1.5 py-0.5 text-white box-decoration-clone">
      {children}
    </span>
  );
}

/* ---------- chat mockup cards ---------- */

/* Shared white frame + title bar for the product mockups */
function MockCard({
  title,
  header,
  accent = "#527DFF",
  children,
}: {
  title?: string;
  header?: ReactNode;
  accent?: string;
  children: ReactNode;
}) {
  return (
    // white glare would be invisible on a white card, so tilt only
    <Tilt className="w-full max-w-[340px] rounded-2xl sm:max-w-[360px] lg:max-w-[480px]" max={8} glare={false}>
    <div
      className="w-full rounded-2xl border-2 bg-white p-3.5 shadow-[0_24px_70px_-20px_rgba(82,125,255,0.5)] sm:p-4 lg:p-5"
      style={{ borderColor: accent }}
    >
      {header ?? (
        <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-[11px] text-gray-500">
            ⌕
          </span>
          <p className="text-[13px] font-bold lg:text-sm" style={{ color: accent }}>
            {title}
          </p>
        </div>
      )}
      {children}
    </div>
    </Tilt>
  );
}

function AgentAvatar({ size }: { size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-9 w-9 lg:h-10 lg:w-10" : "h-6 w-6 lg:h-7 lg:w-7";
  const img = size === "lg" ? "h-5 w-auto lg:h-6" : "h-3.5 w-auto lg:h-4";
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full border border-gray-200 bg-[#EEF3FF] ${box}`}>
      <Image src="/logo.png" alt="" width={405} height={564} className={img} />
    </span>
  );
}

/* Chat Bot mockup: a live-looking chat widget mid-conversation */
function ChatCard({
  question,
  status,
  accent = "#527DFF",
}: {
  question: string;
  status: string;
  accent?: string;
}) {
  return (
    <MockCard
      accent={accent}
      header={
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <AgentAvatar size="lg" />
          <div className="leading-tight">
            <p className="text-[13px] font-bold lg:text-[15px]" style={{ color: accent }}>
              Lumjha.AI
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-500 lg:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI Chat Agent
            </p>
          </div>
        </div>
      }
    >
      <div className="flex min-h-[248px] flex-col justify-end gap-3 py-4 text-[12px] leading-relaxed lg:min-h-[296px] lg:text-[13px]">
        {/* welcome */}
        <div className="flex items-end gap-2">
          <AgentAvatar size="sm" />
          <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-gray-200 bg-[#F4F6FA] px-3 py-2 text-gray-700">
            Welcome! You&apos;re connected with Lumjha support. How can we help today?
            Chat with us or book a free demo!
          </p>
        </div>
        {/* visitor */}
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md px-3 py-2 text-white" style={{ background: accent }}>
            {question}
          </p>
        </div>
        {/* agent typing */}
        <div className="flex items-end gap-2">
          <AgentAvatar size="sm" />
          <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-[#F4F6FA] px-3 py-2">
            <span className="flex gap-0.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="typing-dot h-1 w-1 rounded-full bg-gray-400"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </span>
            <span className="text-[11px] text-gray-400 lg:text-xs">{status}</span>
          </div>
        </div>
      </div>

      {/* composer */}
      <div className="flex items-center gap-2.5 rounded-xl border-2 py-2 pl-3.5 pr-2" style={{ borderColor: accent }}>
        <span className="caret-blink -mr-1.5 h-4 w-px shrink-0" style={{ background: accent }} aria-hidden />
        <span className="flex-1 truncate text-[12px] text-gray-400 lg:text-[13px]">Type a message…</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
          <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
        </svg>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF]" style={{ color: accent }}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </div>
      <p className="mt-2 text-center text-[9px] text-gray-400 lg:text-[10px]">
        Powered by <span className="font-semibold text-gray-500">Lumjha.ai</span>
      </p>
    </MockCard>
  );
}

function SkeletonLine({ width }: { width: string }) {
  return <div className="h-1.5 rounded bg-gray-300/70 lg:h-2" style={{ width }} />;
}

const SEARCH_RESULTS = [
  { page: "Contact Us", path: "/contact", lines: ["94%", "78%"] },
  { page: "Help Center", path: "/support", lines: ["88%", "64%"] },
];

/* Site Search mockup: a search box with its results dropdown */
function SearchCard({ title, accent = "#527DFF" }: { title: string; accent?: string }) {
  return (
    <MockCard title={title} accent={accent}>
      {/* search box */}
      <div className="mt-4 flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-2.5" style={{ borderColor: accent }}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <span className="truncate text-[12px] font-medium text-gray-800 lg:text-[13px]">
          How do I contact support?
        </span>
        <span className="caret-blink -ml-1.5 h-4 w-px shrink-0" style={{ background: accent }} aria-hidden />
      </div>

      {/* results dropdown */}
      <div className="mt-2.5 rounded-xl border border-gray-200 bg-[#F8FAFC] p-2.5 lg:p-3">
        <div className="flex items-center justify-between px-0.5 pb-2">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-gray-400">2 RESULTS</span>
          <span className="text-[13px] leading-none text-gray-400" aria-hidden>×</span>
        </div>
        <div className="flex flex-col gap-2">
          {SEARCH_RESULTS.map((r) => (
            <div key={r.path} className="rounded-lg border border-gray-200 bg-white p-2.5 lg:p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold lg:text-xs" style={{ color: accent }}>
                  {r.page}
                  <span className="font-normal text-gray-400">{r.path}</span>
                </span>
                <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                {r.lines.map((w, i) => (
                  <SkeletonLine key={i} width={w} />
                ))}
              </div>
              <div className="mt-2.5 flex justify-end border-t border-gray-100 pt-2">
                <span className="text-[10px] font-semibold lg:text-[11px]" style={{ color: accent }}>
                  Continue in chat →
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-lg border border-gray-200 bg-white py-1.5 text-center text-[10px] font-semibold text-gray-500 lg:text-[11px]">
          Load more
        </div>
      </div>
      <p className="mt-2 text-right text-[9px] text-gray-400 lg:text-[10px]">Powered by lumjha.ai</p>
    </MockCard>
  );
}

/* ---------- all-in-one platform tabs ---------- */

const PLATFORM_TABS: {
  id: string;
  label: string;
  card: ReactNode;
  heading: ReactNode;
  body: string;
}[] = [
    {
      id: "chatbot",
      label: "Chat Bot",
    card: <ChatCard question="What services do you offer?" status="Gathering information" />,
      heading: (
        <>
          Automate <Highlight>Customer Support</Highlight>
          <br />
          Across Every Channel.
        </>
      ),
      body: "Deliver instant, accurate answers across your website, messaging apps, and social platforms. Lumjha engages visitors, captures lead data naturally during chat, and schedules meetings directly into your calendar.",
    },
    {
      id: "site-search",
      label: "Site Search",
    card: <SearchCard title="Lumjha - Site Search" />,
      heading: (
        <>
          <Highlight>Search</Highlight>
          <br />
          That Actually Answers.
        </>
      ),
      body: "Upgrade site search with AI. Lumjha instantly scans your entire website and documentation to deliver precise, summarized answers directly to your visitors with sources attached.",
    },
    {
      id: "policy-vault",
      label: "Policy Vault",
    card: <ChatCard question="What is your refund policy?" status="Checking policies" />,
      heading: (
        <>
          Primary <Highlight>Source Quotes,</Highlight>
          <br />
          Delivered Exactly.
        </>
      ),
      body: "Upgrade site search with AI. Lumjha instantly scans your entire website and documentation to deliver precise, summarized answers directly to your visitors with sources attached.",
    },
  ];

/* How long each tab stays up before auto-advancing, and how long a tab
   the visitor picked themselves stays put before autoplay resumes. */
const TAB_INTERVAL_MS = 4000;
const TAB_MANUAL_HOLD_MS = 10000;

function PlatformTabs() {
  const [active, setActive] = useState(0);
  // `manual` holds the current tab for TAB_MANUAL_HOLD_MS; `cycle` restarts
  // the ring even when the visitor re-selects the tab that's already active.
  const [manual, setManual] = useState(false);
  const [cycle, setCycle] = useState(0);

  function select(i: number) {
    setActive(i);
    setManual(true);
    setCycle((c) => c + 1);
  }
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = PLATFORM_TABS.length;

  // Autoplay: the progress ring's CSS animation is the timer — when it
  // finishes, we advance — so the ring and the switch can never drift apart.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Measure the sliding pill so the ring traces its exact rounded outline.
  const pillRef = useRef<HTMLSpanElement>(null);
  const [pill, setPill] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setPill({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const autoplay = !reducedMotion;
  const RING = 1.5; // stroke width, px

  // Arrow-key navigation per the WAI-ARIA tabs pattern
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  // Horizontal swipe on the panels switches tabs on touch screens
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    select(dx < 0 ? Math.min(active + 1, count - 1) : Math.max(active - 1, 0));
  }

  return (
    <>
      <div className={`flex justify-center ${SECTION_HEAD_GAP}`}>
        <div
          role="tablist"
          aria-label="Lumjha products"
          onKeyDown={onKeyDown}
          className="relative grid w-full max-w-sm grid-cols-3 rounded-full border border-line bg-ink/[0.04] p-1 sm:w-auto sm:max-w-none"
        >
          {/* sliding active pill */}
          <span
            ref={pillRef}
            aria-hidden
            className="absolute inset-y-1 left-1 rounded-full bg-[#527DFF] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              width: `calc((100% - 0.5rem) / ${count})`,
              transform: `translateX(${active * 100}%)`,
            }}
          >
            {/* countdown ring: a thin line that traces the pill's outline */}
            {autoplay && pill.w > 0 && (
              <svg
                className="pointer-events-none absolute inset-0 overflow-visible"
                width={pill.w}
                height={pill.h}
              >
                <rect
                  key={`${active}-${cycle}`}
                  x={RING / 2}
                  y={RING / 2}
                  width={pill.w - RING}
                  height={pill.h - RING}
                  rx={(pill.h - RING) / 2}
                  pathLength={100}
                  fill="none"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={RING}
                  strokeLinecap="butt"
                  strokeDasharray="100 100"
                  className="tab-progress"
                  style={{
                    animationDuration: `${manual ? TAB_MANUAL_HOLD_MS : TAB_INTERVAL_MS}ms`,
                  }}
                  onAnimationEnd={() => {
                    setManual(false);
                    setActive((a) => (a + 1) % count);
                  }}
                />
              </svg>
            )}
          </span>
          {PLATFORM_TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              className={`relative z-10 whitespace-nowrap rounded-full px-2 py-2.5 text-[13px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527DFF] sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:text-[15px] ${active === i ? "text-white" : "text-subtle hover:text-ink"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* All panels share one grid cell, so the section keeps the tallest
          panel's height and switching tabs never shifts the page. */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="grid touch-pan-y pb-8 pt-10 md:pb-10 md:pt-14"
      >
        {PLATFORM_TABS.map((tab, i) => {
          const isActive = active === i;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`col-start-1 row-start-1 grid content-start items-center gap-8 md:content-center md:grid-cols-[minmax(0,400px)_1fr] md:gap-14 lg:grid-cols-[minmax(0,500px)_1fr] lg:gap-20 ${isActive ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
              <div
                className={`flex justify-center transition-all ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isActive
                    ? "translate-y-0 scale-100 opacity-100 delay-150 duration-700"
                    : "translate-y-4 scale-[0.97] opacity-0 duration-300"
                  }`}
              >
                {tab.card}
              </div>
              <div
                className={`text-center transition-all ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:text-left ${isActive
                    ? "translate-y-0 opacity-100 delay-250 duration-700"
                    : "translate-y-4 opacity-0 duration-300"
                  }`}
              >
                <h3 className="text-[24px] font-extrabold leading-[1.25] tracking-tight sm:text-3xl lg:text-[40px]">
                  {tab.heading}
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-5 md:mx-0 md:text-base lg:mt-6 lg:text-lg">
                  {tab.body}
                </p>
                <div className="mt-6 flex justify-center md:justify-start lg:mt-8">
                  <BlueButton large>Get Started Free</BlueButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* progress dots, also clickable (padded for a 24px touch target) */}
      <div className="flex justify-center">
        {PLATFORM_TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            aria-label={`Show ${tab.label}`}
            onClick={() => select(i)}
            className="group flex h-6 items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${active === i ? "w-6 bg-[#527DFF]" : "w-1.5 bg-ink/25 group-hover:bg-ink/50"
                }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

/* ---------- lead capture (conversion section) ---------- */

const LEAD_ICONS = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  tag: "M3 12V4h8l9 9-8 8-9-9Zm4.5-3.5h.01",
  source: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z",
  hash: "M5 9h14M5 15h14M10 4 8 20M16 4l-2 16",
} as const;

const LEADS: { name: string; email: string; interest: string; source: string; session: string }[] = [
  { name: "Jordan Lee", email: "jordan@acme.co", interest: "Gold plan", source: "WhatsApp", session: "sess_8f2a47b1c3e5a" },
  { name: "Sarah Chen", email: "sarah@venture.co", interest: "Platinum plan", source: "Website chat", session: "sess_a1b2c3d4e5f6g" },
];

function LeadCard({ lead }: { lead: (typeof LEADS)[number] }) {
  const rows: [keyof typeof LEAD_ICONS, string, string][] = [
    ["user", "Name", lead.name],
    ["mail", "Email", lead.email],
    ["tag", "Interest", lead.interest],
    ["source", "Source", lead.source],
    ["hash", "Session ID", lead.session],
  ];
  return (
    <Tilt className="w-full max-w-sm rounded-2xl" max={10}>
    <div className="rounded-2xl bg-[#506DFF] p-5 text-white shadow-[0_24px_60px_-20px_rgba(82,125,255,0.6)] sm:p-6">
      <div className="flex items-center justify-between border-b border-white/25 pb-3">
        <p className="text-[15px] font-bold">Lead Profile</p>
        <span className="rounded-full border border-white/80 px-2.5 py-0.5 text-[11px] font-semibold">Qualified</span>
      </div>
      <ul className="mt-4 space-y-3.5 text-[14px]">
        {rows.map(([icon, label, value]) => (
          <li key={label} className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/90" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={LEAD_ICONS[icon]} />
            </svg>
            <span className="truncate">
              <span className="text-white/75">{label}:</span> {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
    </Tilt>
  );
}

/* ---------- commitments ---------- */

const COMMITMENTS = [
  "We never look at your private business content without permission.",
  "We never share your data with other businesses.",
  "We never train AI on your content without your consent.",
  "We never expose your customers' conversations.",
  "Your content is never deleted. If you pause, your data is safely preserved.",
];

/* ---------- page ---------- */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[300px] rounded-full bg-glow/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-[900px] h-[500px] w-[300px] rounded-full bg-glow/25 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-[1900px] h-[500px] w-[300px] rounded-full bg-glow/20 blur-[120px]" />

        {/* HERO — owns the first viewport: 100svh minus the navbar (56px, 66px on desktop) */}
        <section className="relative isolate mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 pb-14 pt-12 text-center sm:px-6 md:pt-20 lg:pb-5">
          {/* soft oval of light behind the headline (Figma) — full-bleed past the container */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[min(1500px,130vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(82,125,255,0.24),transparent)] light:bg-[radial-gradient(closest-side,rgba(82,125,255,0.08),transparent)]" />
          <h1 className="max-w-5xl font-heading text-[clamp(2.25rem,4.5vw+1rem,4.75rem)] font-medium leading-[1.1] tracking-[-0.01em]">
            Never Miss a Customer.
            <br />
            <span className="text-highlight light:text-[#527DFF]">Grow While You Sleep.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[62rem] text-base leading-relaxed text-balance text-muted sm:text-lg md:mt-10 md:text-[22px] lg:text-2xl light:text-ink">
            Lumjha answers your customers&apos; questions, captures sales leads, and books
            appointments around the clock, on platform(s) they already use, so you can
            focus on running your business.
          </p>
          <ContactDisclosure
            variant="dark"
            label="Book a Demo"
            rowClassName="mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-10 md:mt-12"
            buttonClassName="inline-flex items-center justify-center rounded-full border-2 border-[#527DFF] px-7 py-3 text-[15px] font-semibold text-ink transition hover:bg-[#527DFF]/10 md:px-10 md:text-base"
          >
            <BlueButton large>Get Started Free</BlueButton>
          </ContactDisclosure>
          {/* your docs + website → the Lumjha core and its channels → a live answer */}
          <HeroOrbit className="mt-14 md:mt-20" />
        </section>
        <FeatureMarquee />

        {/* ALL-IN-ONE PLATFORM */}
        <section id="platform" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="All-in-One Knowledge Platform"
            subtitle="One knowledge base powering your chatbot, site search, and policy answers."
          />
          <PlatformTabs />
        </section>

        {/* CHANNELS */}
        <section id="channels" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="Be Wherever Your Customers Are"
            subtitle="Connect your central knowledge base directly to every major customer touchpoint in minutes."
          />
          <ul className="sr-only">
            {CHANNELS.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
          <ChannelReels className={`mx-auto max-w-5xl ${SECTION_HEAD_GAP}`} />
        </section>

        {/* CONVERSION */}
        <section id="leads" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="Where conversations meet conversion."
            subtitle="Lumjha captures lead details effortlessly within normal conversations, identifying intent without intrusive forms."
          />
          <div className={`flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10 ${SECTION_HEAD_GAP}`}>
            {LEADS.map((lead) => (
              <LeadCard key={lead.session} lead={lead} />
            ))}
          </div>
        </section>

        {/* COMMITMENTS */}
        <section id="commitments" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader title="Our Commitments" subtitle="Total transparency, absolute data security." />
          <ol className={`mx-auto max-w-3xl space-y-3 ${SECTION_HEAD_GAP}`}>
            {COMMITMENTS.map((c, i) => (
              <li key={c}>
                {/* wide, short rows → gentle angle so the far edge doesn't swing */}
                <Tilt className="flex items-stretch gap-3 rounded-lg" max={3} scale={1.01} glare={false}>
                <span className="flex w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[15px] font-bold text-[#3E63F2] ring-1 ring-card-ring">
                  {i + 1}.
                </span>
                <span className="flex-1 rounded-lg bg-white px-4 py-3 ring-1 ring-card-ring text-[14px] font-medium text-[#3E63F2] md:text-[15px]">
                  {c}
                </span>
                </Tilt>
              </li>
            ))}
          </ol>
        </section>

        <CtaPanel />

        <Footer />
      </main>
    </div>
  );
}
