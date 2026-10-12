"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, KeyboardEvent, ReactNode, SVGProps, TouchEvent } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import {
  WebsiteIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  GoogleCalendarIcon,
  ShopifyIcon,
} from "@/components/ui/ChannelIcons";

/* ============================================================
   Lumjha — main landing page (Figma design, mobile-first)
   ============================================================ */

function BlueButton({
  children,
  outline,
  light,
  large,
  href = "https://app.lumjha.ai/login",
}: {
  children: React.ReactNode;
  outline?: boolean;
  light?: boolean;
  large?: boolean;
  href?: string;
}) {
  const size = large
    ? "justify-center gap-2 px-7 py-3.5 text-[15px] md:px-8 md:text-base"
    : "gap-1.5 px-5 py-2 text-[13px]";
  if (light) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[#3E63F2] transition hover:brightness-95"
      >
        {children}
      </a>
    );
  }
  if (outline) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center rounded-full border border-[#527DFF]/70 font-semibold ${size} text-white transition hover:bg-[#527DFF]/10`}
      >
        {children} <span aria-hidden>→</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full bg-[#527DFF] font-semibold text-white shadow-[0_8px_30px_-6px_rgba(82,125,255,0.7)] transition hover:bg-[#3E63F2] ${size}`}
    >
      {children} <span aria-hidden>→</span>
    </a>
  );
}

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
    <div
      className="w-full max-w-[340px] rounded-2xl border-2 bg-white p-3.5 shadow-[0_24px_70px_-20px_rgba(82,125,255,0.5)] sm:max-w-[360px] sm:p-4 lg:max-w-[480px] lg:p-5"
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
      <div id="features" className="mt-5 flex justify-center md:mt-8">
        <div
          role="tablist"
          aria-label="Lumjha products"
          onKeyDown={onKeyDown}
          className="relative grid w-full max-w-sm grid-cols-3 rounded-full border border-white/10 bg-white/[0.04] p-1 sm:w-auto sm:max-w-none"
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
              className={`relative z-10 whitespace-nowrap rounded-full px-2 py-2.5 text-[13px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527DFF] sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:text-[15px] ${active === i ? "text-white" : "text-gray-400 hover:text-white"
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
        id="how"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="grid touch-pan-y py-10 md:py-20"
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
                <h3 className="text-[26px] font-extrabold leading-[1.25] tracking-tight sm:text-4xl lg:text-5xl">
                  {tab.heading}
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-300 sm:mt-5 md:mx-0 md:text-base lg:mt-6 lg:text-lg">
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
      <div className="-mt-4 flex justify-center pb-6 md:-mt-10">
        {PLATFORM_TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            aria-label={`Show ${tab.label}`}
            onClick={() => select(i)}
            className="group flex h-6 items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${active === i ? "w-6 bg-[#527DFF]" : "w-1.5 bg-white/25 group-hover:bg-white/50"
                }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

/* ---------- channel logos (same set as previous landing page) ---------- */

const CHANNELS: {
  name: string;
  bg: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
    { name: "Website", bg: "#2E9BF0", Icon: WebsiteIcon },
    { name: "WhatsApp", bg: "#25D366", Icon: WhatsAppIcon },
    { name: "Instagram", bg: "#E1306C", Icon: InstagramIcon },
    { name: "Facebook", bg: "#1877F2", Icon: FacebookIcon },
    { name: "Telegram", bg: "#229ED9", Icon: TelegramIcon },
    { name: "Google Calendar", bg: "#4285F4", Icon: GoogleCalendarIcon },
    { name: "Shopify", bg: "#95BF47", Icon: ShopifyIcon },
  ];

function ChannelIcon({
  name,
  bg,
  Icon,
}: {
  name: string;
  bg: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="flex flex-col items-center gap-2" title={name}>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg md:h-14 md:w-14"
        style={{ background: bg }}
      >
        <Icon className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
      </div>
      <span className="sr-only">{name}</span>
    </div>
  );
}

/* ---------- pricing (from Figma) ---------- */

const PLANS = [
  {
    name: "Free",
    sub: "Testing & demos",
    price: "$0",
    per: "/mon",
    cta: "Start Free",
    featured: false,
    features: [
      "1 AI Chat bot",
      "1 Integration Channel",
      "50 Replies / Month",
      "1 Document",
      "Lead capture & pipeline",
      "Basic Analytics",
    ],
  },
  {
    name: "Gold",
    sub: "SMBs & consultants",
    price: "$49",
    per: "/mon",
    cta: "Get Started",
    featured: true,
    badge: "Most Popular",
    features: [
      "1 AI Chatbot",
      "3 Integration Channel",
      "2,000 Replies / Month",
      "15 Knowledge Documents",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Platinum",
    sub: "Agencies & multi-location",
    price: "$89",
    per: "/mon",
    cta: "Get Started",
    featured: false,
    features: [
      "3 AI Chatbots",
      "5 Integration Channels",
      "5,000 Replies / Month",
      "25 Knowledge Documents",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Custom",
    sub: "Enterprise & regulated",
    price: "Let's Talk",
    per: "",
    cta: "Talk to Sales",
    featured: false,
    features: [
      "Custom AI Chatbots",
      "Unlimited Integration Channels",
      "Custom Replies & Documents",
      "25 Knowledge Documents",
      "Add-on modules Included",
      "Dedicated Support + SLA",
    ],
  },
];

const ADDONS = [
  { src: "/assets/site-search.svg", alt: "Site Search icon", title: "Site Search", price: "+$25/month" },
  { src: "/assets/policy-vault.svg", alt: "Policy Vault icon", title: "Policy Vault", price: "+$25/month" },
  { src: "/assets/bundle.svg", alt: "Bundle icon", title: "Bundle (Both)", price: "+$45/month" },
];

/* ---------- page ---------- */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-[900px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-[1900px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/20 blur-[120px]" />

        {/* HERO — owns the first viewport: 100svh minus the 3.5rem navbar */}
        <section className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-12 text-center sm:px-6 md:py-20">
          <h1 className="max-w-5xl text-[clamp(2.25rem,6vw+1rem,5.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Never Miss a Customer.
            <br />
            <span className="text-[#6E97FF]">Grow While You Sleep.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[42rem] text-base leading-relaxed text-balance text-gray-300 sm:text-lg md:mt-8 md:text-xl">
            Lumjha answers your customers&apos; questions, captures sales leads, and books
            appointments around the clock, on platform(s) they already use, so you can
            focus on running your business.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10">
            <BlueButton large>Get Started Free</BlueButton>
            <BlueButton large outline>Book a Demo</BlueButton>
          </div>
        </section>

        {/* ALL-IN-ONE PLATFORM */}
        <section id="platform" className="relative mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 md:pt-20">
          <h2 className="text-center text-xl font-extrabold tracking-wide text-balance sm:text-3xl md:text-4xl">
            ALL-IN-ONE KNOWLEDGE PLATFORM
          </h2>
          <PlatformTabs />
        </section>

        {/* CHANNELS */}
        <section id="channels" className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-20">
          <svg className="pointer-events-none absolute left-0 right-0 top-8 h-24 w-full opacity-30" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
            <path d="M0 50 C 200 10, 400 90, 600 50 S 1000 10, 1200 50" stroke="#2B3B66" strokeWidth="1.5" />
          </svg>
          <h2 className="text-center text-xl font-extrabold text-[#5B8CFF] sm:text-2xl md:text-[28px]">
            Be Wherever Your Customers Are
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[12px] text-gray-300 sm:text-sm">
            Connect your central knowledge base directly to every major customer touchpoint in minutes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-10">
            {CHANNELS.map((c) => (
              <ChannelIcon key={c.name} name={c.name} bg={c.bg} Icon={c.Icon} />
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-6">
          <h2 className="text-center text-xl font-extrabold text-[#5B8CFF] sm:text-2xl md:text-[28px]">
            Plans for Every Stage of Growth.
          </h2>
          <p className="mt-2 text-center text-[12px] text-gray-300 sm:text-sm">
            Start free to explore, or pick a plan tailored to your team&apos;s support volume.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col overflow-hidden rounded-2xl bg-white text-[#0B1526] ${p.featured
                    ? "border-[3px] border-[#F2B90D] shadow-[0_20px_60px_-15px_rgba(242,185,13,0.5)]"
                    : "border border-[#D7E3F5]"
                  }`}
              >
                {"badge" in p && p.badge && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-[#F2B90D] px-3 py-0.5 text-[10px] font-bold text-[#3A2A00]">
                    {p.badge}
                  </span>
                )}
                <div className={`px-5 pb-4 pt-5 text-center ${p.featured ? "pt-7" : ""}`}>
                  <p className="text-lg font-extrabold">{p.name}</p>
                  <p className="text-[11px] text-gray-500">{p.sub}</p>
                  <p className="mt-2 text-2xl font-extrabold">
                    {p.price}
                    {p.per && <span className="text-[11px] font-medium text-gray-500">{p.per}</span>}
                  </p>
                </div>
                <div className="mx-4 border-t border-gray-200" />
                <ul className="flex-1 space-y-2 px-5 py-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-gray-700">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-400 text-[9px]">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="bg-[#DCE7FF] px-5 py-4">
                  <a
                    href="https://app.lumjha.ai/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md bg-[#527DFF] py-2 text-center text-[13px] font-bold text-white hover:bg-[#3E63F2]"
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADD-ONS */}
        <section id="security" className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
          <h2 className="text-center text-xl font-extrabold text-[#5B8CFF] sm:text-2xl">
            Enhance Your Plan with Add-ons
          </h2>
          <p className="mt-2 text-center text-[12px] text-gray-300 sm:text-sm">
            Optional modules to give you more control, security, and flexibility.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ADDONS.map((a) => (
              <div
                key={a.title}
                className="flex items-center gap-4 rounded-xl border border-[#B9CBF5] bg-white px-5 py-4 text-[#0B1526]"
              >
                <Image src={a.src} alt={a.alt} width={32} height={32} className="h-8 w-8 shrink-0" />
                <span>
                  <span className="block text-[15px] font-extrabold">{a.title}</span>
                  <span className="block text-[12px] text-gray-500">{a.price}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#EDF1F6] px-4 py-10 sm:px-6 md:py-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="rounded-2xl bg-[#506DFF] px-6 py-10 text-center shadow-xl md:py-14">
              <h2 className="mx-auto max-w-3xl text-xl font-extrabold text-white sm:text-2xl md:text-[28px]">
                Ready to Scale Your Customer Experience?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[12px] leading-relaxed text-white/85 sm:text-sm">
                Deliver instant, personalized answers across web, messaging, and social apps
                without increasing your team&apos;s workload.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <BlueButton light>Start Free Trial</BlueButton>
                <a
                  href="https://app.lumjha.ai/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/80 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-white/10"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
