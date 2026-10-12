"use client";

import { useState } from "react";
import Image from "next/image";

/* ============================================================
   Lumjha — Figma-exact revamp (mobile-first responsive)
   Single self-contained page matching the provided Figma shot.
   ============================================================ */

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
];

/* ---------- tiny atoms ---------- */

function PillTab({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold leading-none ${
        active ? "bg-[#527DFF] text-white" : "text-gray-300"
      }`}
    >
      {label}
    </span>
  );
}

function BlueButton({
  children,
  outline,
  light,
  href = "https://app.lumjha.ai/login",
}: {
  children: React.ReactNode;
  outline?: boolean;
  light?: boolean;
  href?: string;
}) {
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
        className="inline-flex items-center gap-1.5 rounded-full border border-[#527DFF]/70 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#527DFF]/10"
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
      className="inline-flex items-center gap-1.5 rounded-full bg-[#527DFF] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_30px_-6px_rgba(82,125,255,0.7)] transition hover:bg-[#3E63F2]"
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

/* ---------- chat mockup cards (left column) ---------- */

function Bubble({ w = "w-11/12", lines = 3 }: { w?: string; lines?: number }) {
  return (
    <div className={`rounded-md border border-gray-200 bg-[#F4F6FA] p-2 ${w}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="mb-1 h-1.5 rounded bg-gray-300/70"
          style={{ width: `${92 - i * 14}%` }}
        />
      ))}
    </div>
  );
}

function ChatCard({
  title,
  accent = "#527DFF",
}: {
  title: string;
  accent?: string;
}) {
  return (
    <div className="w-full max-w-[320px] lg:max-w-[400px] rounded-2xl border-2 bg-white p-3 shadow-[0_20px_60px_-20px_rgba(82,125,255,0.45)]" style={{ borderColor: accent }}>
      <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-500">
          ⌕
        </span>
        <p className="text-[12px] font-bold" style={{ color: accent }}>
          {title}
        </p>
      </div>
      <div className="flex flex-col gap-2 py-3">
        <div className="flex justify-end">
          <Bubble w="w-1/2" lines={2} />
        </div>
        <Bubble w="w-11/12" lines={4} />
        <div className="flex justify-end">
          <Bubble w="w-2/3" lines={2} />
        </div>
        <Bubble w="w-10/12" lines={3} />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5">
        <span className="flex-1 text-[10px] text-gray-400">Ask anything…</span>
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white"
          style={{ background: accent }}
        >
          ➤
        </span>
      </div>
    </div>
  );
}

/* ---------- channel icons ---------- */

function ChannelIcon({ label, bg, glyph }: { label: string; bg: string; glyph: string }) {
  return (
    <div className="flex flex-col items-center gap-2" title={label}>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full text-[22px] shadow-lg md:h-14 md:w-14 md:text-[26px]"
        style={{ background: bg }}
      >
        {glyph}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

/* ---------- pricing data (from Figma) ---------- */

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

/* ---------- page ---------- */

export default function SolutionsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030816]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Lumjha logo"
              width={23}
              height={32}
              className="h-8 w-auto shrink-0 object-contain"
              priority
            />
            <span className="hidden flex-col leading-tight min-[420px]:flex">
              <span className="text-[11px] font-bold text-white">Knowledgebase,</span>
              <span className="text-[10px] text-gray-400">Activated Everywhere</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[12px] font-medium text-gray-300 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href="https://app.lumjha.ai/login" className="text-[12px] font-medium text-gray-200 hover:text-white">
              Log In
            </a>
            <a
              href="https://app.lumjha.ai/login"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#527DFF] px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-[#3E63F2]"
            >
              Start Free →
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-[#030816] px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-200"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-3">
                <a href="https://app.lumjha.ai/login" className="text-sm text-gray-200">
                  Log In
                </a>
                <a
                  href="https://app.lumjha.ai/login"
                  className="rounded-full bg-[#527DFF] px-4 py-1.5 text-sm font-semibold text-white"
                >
                  Start Free →
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="relative overflow-x-clip">
        {/* edge glows like Figma */}
        <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-[900px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 top-[1900px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/20 blur-[120px]" />

        {/* ================= HERO ================= */}
        <section className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-12 text-center sm:px-6 md:pt-20">
          <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-[56px]">
            Never Miss a Customer.
            <br />
            <span className="text-[#6E97FF]">Grow While You Sleep.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-relaxed text-gray-300 sm:text-sm md:text-[15px]">
            Lumjha answers your customers&apos; questions, captures sales leads, and books
            appointments around the clock, on platform(s) they already use, so you can
            focus on running your business.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <BlueButton>Get Started Free</BlueButton>
            <BlueButton outline>Book a Demo</BlueButton>
          </div>
        </section>

        {/* ================= ALL-IN-ONE PLATFORM ================= */}
        <section id="platform" className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
          <h2 className="pt-8 text-center text-lg font-extrabold tracking-wide sm:text-xl md:text-2xl">
            ALL-IN-ONE KNOWLEDGE PLATFORM
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <PillTab label="Chat Bot" active />
            <PillTab label="Site Search" />
            <PillTab label="Policy Vault" />
          </div>

          {/* Feature 1 */}
          <div id="features" className="grid items-center gap-8 py-12 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] md:gap-14">
            <div className="flex flex-col items-center">
              <ChatCard title="Lumjha - Chat Bot" />
              <span className="mt-3 text-[10px] tracking-[0.3em] text-gray-500">•••</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold leading-snug md:text-[32px]">
                Automate <Highlight>Customer Support</Highlight>
                <br />
                Across Every Channel.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-gray-300 md:mx-0 md:text-sm">
                Deliver instant, accurate answers across your website, messaging apps, and
                social platforms. Lumjha engages visitors, captures lead data naturally
                during chat, and schedules meetings directly into your calendar.
              </p>
              <div className="mt-5 flex justify-center md:justify-start">
                <BlueButton>Get Started Free</BlueButton>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid items-center gap-8 py-12 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] md:gap-14">
            <div className="flex flex-col items-center">
              <ChatCard title="Lumjha - Site Search" />
              <span className="mt-3 text-[10px] tracking-[0.3em] text-gray-500">•••</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold leading-snug md:text-[32px]">
                <Highlight>Search</Highlight>
                <br />
                That Actually Answers.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-gray-300 md:mx-0 md:text-sm">
                Upgrade site search with AI. Lumjha instantly scans your entire website and
                documentation to deliver precise, summarized answers directly to your
                visitors with sources attached.
              </p>
              <div className="mt-5 flex justify-center md:justify-start">
                <BlueButton>Get Started Free</BlueButton>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <PillTab label="Chat Bot" />
            <PillTab label="Site Search" />
            <PillTab label="Policy Vault" active />
          </div>

          {/* Feature 3 */}
          <div id="how" className="grid items-center gap-8 py-12 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] md:gap-14">
            <div className="flex flex-col items-center">
              <ChatCard title="Lumjha Agent - Chat Bot" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold leading-snug md:text-[32px]">
                Primary <Highlight>Source Quotes,</Highlight>
                <br />
                Delivered Exactly.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-gray-300 md:mx-0 md:text-sm">
                Upgrade site search with AI. Lumjha instantly scans your entire website and
                documentation to deliver precise, summarized answers directly to your
                visitors with sources attached.
              </p>
              <div className="mt-5 flex justify-center md:justify-start">
                <BlueButton>Get Started Free</BlueButton>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CHANNELS ================= */}
        <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-20">
          {/* faint wave line */}
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
            <ChannelIcon label="Google Calendar" bg="linear-gradient(135deg,#34A853,#FBBC05,#EA4335,#4285F4)" glyph="📅" />
            <ChannelIcon label="Slack" bg="#FFFFFF" glyph="🎨" />
            <ChannelIcon label="Discord" bg="#5865F2" glyph="🎮" />
            <ChannelIcon label="Telegram" bg="#229ED9" glyph="✈" />
            <ChannelIcon label="WhatsApp" bg="#25D366" glyph="✆" />
            <ChannelIcon label="Messenger" bg="linear-gradient(135deg,#A334FA,#FF3D77,#FF7A3D)" glyph="⚡" />
            <ChannelIcon label="Support agent" bg="#E8EEF7" glyph="👩‍💻" />
            <ChannelIcon label="Website" bg="#2E9BF0" glyph="🌐" />
          </div>
        </section>

        {/* ================= PRICING ================= */}
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
                className={`relative flex flex-col overflow-hidden rounded-2xl bg-white text-[#0B1526] ${
                  p.featured
                    ? "border-[3px] border-[#F2B90D] shadow-[0_20px_60px_-15px_rgba(242,185,13,0.5)]"
                    : "border border-[#D7E3F5]"
                }`}
              >
                {p.badge && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-[#F2B90D] px-3 py-0.5 text-[10px] font-bold text-[#3A2A00]">
                    {p.badge}
                  </span>
                )}
                <div className={`px-5 pb-4 pt-5 text-center ${p.badge ? "pt-7" : ""}`}>
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

        {/* ================= ADD-ONS ================= */}
        <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
          <h2 className="text-center text-xl font-extrabold text-[#5B8CFF] sm:text-2xl">
            Enhance Your Plan with Add-ons
          </h2>
          <p className="mt-2 text-center text-[12px] text-gray-300 sm:text-sm">
            Optional modules to give you more control, security, and flexibility.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: "⌕", title: "Site Search", price: "+$25/month" },
              { icon: "🛡", title: "Policy Vault", price: "+$25/month" },
              { icon: "📦", title: "Bundle (Both)", price: "+$45/month" },
            ].map((a) => (
              <div
                key={a.title}
                className="flex items-center gap-4 rounded-xl border border-[#B9CBF5] bg-white px-5 py-4 text-[#0B1526]"
              >
                <span className="text-2xl">{a.icon}</span>
                <span>
                  <span className="block text-[15px] font-extrabold">{a.title}</span>
                  <span className="block text-[12px] text-gray-500">{a.price}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
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

        {/* ================= FOOTER ================= */}
        <footer id="security" className="bg-black px-4 pb-8 pt-12 text-gray-400 sm:px-6">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Lumjha AI logo"
                  width={23}
                  height={32}
                  className="h-8 w-auto shrink-0 object-contain"
                />
                <span className="text-sm font-bold text-white">Lumjha AI</span>
              </div>
              <p className="mt-3 max-w-[220px] text-[12px] leading-relaxed">
                Lumjha is the no-code AI layer for modern customer engagement.
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <a href="#" aria-label="Facebook" className="hover:text-white">f</a>
                <a href="#" aria-label="Instagram" className="hover:text-white">◉</a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white">in</a>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white">Quick Links</p>
              <ul className="mt-3 space-y-2 text-[12px]">
                {["Platform", "Features", "How it works", "Pricing", "Security"].map((x) => (
                  <li key={x}><a href="#" className="hover:text-white">{x}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white">Platforms</p>
              <ul className="mt-3 space-y-2 text-[12px]">
                {["Chatbot", "Site Search", "Policy Vault", "Integrations"].map((x) => (
                  <li key={x}><a href="#" className="hover:text-white">{x}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white">Legal</p>
              <ul className="mt-3 space-y-2 text-[12px]">
                {["Privacy", "Terms", "Help"].map((x) => (
                  <li key={x}><a href="#" className="hover:text-white">{x}</a></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[12px] font-bold text-white">Newsletter</p>
              <input
                type="email"
                placeholder="backend@brjnole.dev"
                className="mt-3 w-full rounded-md border border-gray-700 bg-white px-3 py-2 text-[12px] text-black outline-none placeholder:text-gray-500"
              />
              <button className="mt-2 flex items-center gap-1.5 rounded-md bg-[#527DFF] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#3E63F2]">
                ✉ Subscribe
              </button>
            </div>
          </div>
          <p className="mt-10 text-center text-[11px] text-gray-500">
            © 2026 Lumjha. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
