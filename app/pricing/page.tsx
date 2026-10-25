import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import WaveLines from "@/components/site/WaveLines";
import PricingPlans, { Included } from "@/components/site/PricingPlans";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import Tilt from "@/components/ui/Tilt";
import {
  WebsiteIcon,
  WhatsAppIcon,
  InstagramIcon,
  MessengerIcon,
  TelegramIcon,
  ViberIcon,
  ShopifyIcon,
} from "@/components/ui/ChannelIcons";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Activate your business knowledge across customer channels with Lumjha AI. Start free, choose a plan that fits your conversation volume, and scale as your business grows.",
};

/* ============================================================
   Pricing — plans page (Figma design)
   ============================================================ */

/* ---------- deploy one AI engine ---------- */

const SOURCES = [
  { title: "Your website", body: "Auto-crawl, or manual upload" },
  { title: "PDFs & docs", body: "Menus, FAQs, catalogues, manuals" },
  { title: "Your policies", body: "Refunds, warranties, HR, coverage" },
];

const ENGINE_CAPABILITIES = ["Chatbot", "Site Search", "Policy Vault", "Leads"];

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const DEPLOY_CHANNELS: { name: string; body: string; icon: Icon | "site-search"; color: string }[] = [
  { name: "Website chat", body: "answers · captures · books", icon: WebsiteIcon, color: "#527DFF" },
  { name: "Site Search", body: "instant on-site answers", icon: "site-search", color: "#527DFF" },
  { name: "WhatsApp", body: "answers · captures · books", icon: WhatsAppIcon, color: "#25D366" },
  { name: "Instagram", body: "answers · captures · books", icon: InstagramIcon, color: "#E4405F" },
  { name: "Messenger", body: "answers · captures · books", icon: MessengerIcon, color: "#0084FF" },
  { name: "Telegram", body: "answers · captures · books", icon: TelegramIcon, color: "#229ED9" },
  { name: "Viber", body: "answers · captures · books", icon: ViberIcon, color: "#7360F2" },
  { name: "Shopify", body: "answers · captures · books", icon: ShopifyIcon, color: "#95BF47" },
];

function FlowArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 rotate-90 text-white/80 light:text-[#527DFF] lg:rotate-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- what counts as a conversation ---------- */

const RULES = [
  { title: "One thread with at least one AI reply = 1 conversation", body: "On any channel: website, WhatsApp, Instagram and the rest." },
  { title: "It stays one conversation until 24 hours of silence.", body: "The same as WhatsApp's 24-hour customer service window." },
  { title: "Fair use", body: "Very long threads (50+ AI replies) count as a second conversation." },
  { title: "Human-only threads are free.", body: "If your team answers without the AI, it doesn't count." },
];

type ChatLine = { from: "visitor" | "ai"; text: string } | { from: "gap"; text: string };

const EXAMPLE_CHAT: ChatLine[] = [
  { from: "visitor", text: "Do you do teeth whitening on Saturdays?" },
  { from: "ai", text: "Yes, Saturdays 9am–1pm. Want me to book a slot?" },
  { from: "visitor", text: "Yes please, next Saturday morning." },
  { from: "ai", text: "Done ✓ Saturday 10:30 is booked. What's the best email for the confirmation?" },
  { from: "gap", text: "· 4 hours later · same thread ·" },
  { from: "visitor", text: "Can I bring my daughter too?" },
  { from: "ai", text: "Of course. I've added a second slot at 10:30." },
];

/* white cards fading into a soft blue sheen, as in the Figma */
const SHEEN_CARD =
  "rounded-2xl bg-[linear-gradient(135deg,#FFFFFF_45%,#DDE7FF_100%)] text-[#0B1526] shadow-[0_24px_60px_-28px_rgba(82,125,255,0.6)] light:ring-1 light:ring-[#D7E3F5]";

/* ---------- never miss a lead ---------- */

const USAGE_ALERTS: { mark: string; text: string; cap?: boolean }[] = [
  { mark: "75%", text: "Email + in-app heads-up with a usage forecast." },
  { mark: "100%", text: "An automatic top-up pack is added, up to your spending cap. Upgrade in the same cycle and the top-ups are forgiven." },
  { mark: "90%", text: "Second alert, plus a one-click upgrade suggestion if it's cheaper than top-ups." },
  { mark: "Cap", text: "The agent switches to “leave your details” mode, so leads are still captured, never lost.", cap: true },
];

/* ---------- developers ---------- */

const CODE_SAMPLE: { comment: string; lines: { text: string; tone: "cmd" | "str" }[] }[] = [
  {
    comment: "# Ask your AI assistant about today's leads (Claude, ChatGPT, Cursor)",
    lines: [{ text: "> list_leads({ since: \"today\" })", tone: "cmd" }],
  },
  {
    comment: "# Teach your agent a new document via MCP (Growth and up)",
    lines: [
      { text: "> add_document_from_url({", tone: "cmd" },
      { text: "    url: \"https://yoursite.com/menu.pdf\" })", tone: "str" },
    ],
  },
  {
    comment: "# Export leads to any CRM",
    lines: [{ text: "> list_leads({ format: \"csv\" })  →  leads.csv", tone: "cmd" }],
  },
];

/* ---------- feature & pricing matrix ---------- */

const COMPETITORS = ["Chatbase", "SiteGPT", "DocsBot", "Tidio", "ChatBot.com"] as const;

/* Copied from the Figma matrix. Cell markers: "✓" = check (optionally
   followed by detail), "?" = unconfirmed (yellow), "" = blank cell.
   `strong` bolds the Lumjha cell. */
type MatrixRow = { capability: string; lumjha: string; strong?: boolean; competitors: [string, string, string, string, string] };

const MATRIX: MatrixRow[] = [
  { capability: "Entry paid price", lumjha: "$49", strong: true, competitors: ["$40", "$59", "$49", "~$29 + Lyro $32.50+", "$25/user"] },
  { capability: "Free plan", lumjha: "✓ 50 replies", competitors: ["", "", "✓", "✓", ""] },
  { capability: "Annual discount", lumjha: "? none shown", competitors: ["20%", "up to 40%", "~17%", "~17%", "~24%"] },
  { capability: "Knowledge limit at entry", lumjha: "1 doc (Free) / 15 docs", strong: true, competitors: ["40 MB", "1,000 pages", "5k pages", "—", "50 MB/file"] },
  { capability: "WhatsApp / IG / FB / Telegram", lumjha: "✓ (+ Viber per Terms)", competitors: ["partial", "WhatsApp $59 add-on", "✓ Personal+", "✓", "✓ WA/Messenger"] },
  { capability: "Lead capture in chat", lumjha: "✓ native, form-less", competitors: ["actions", "leads", "✓ forms", "Flows", "✓"] },
  { capability: "Calendar booking", lumjha: "✓ Google Calendar", competitors: ["via actions", "?", "✓ Calendly/Cal.com", "via Flows", "?"] },
  { capability: "AI site search", lumjha: "✓ +$25", competitors: ["", "", "", "", ""] },
  { capability: "Exact-quote policy answers", lumjha: "✓ Policy Vault + $25 (unique)", competitors: ["", "", "partial (citations)", "", ""] },
  { capability: "Human handoff/inbox", lumjha: "exists in code, not marketed", competitors: ["✓ helpdesk inbox", "✓ iOS app", "✓ escalation", "✓ core", "✓ core"] },
  { capability: "White-label", lumjha: "? not stated", competitors: ["$1,188/yr", "$59/mo", "Business $499", "Plus", "Enterprise"] },
  { capability: "SOC 2 / HIPAA", lumjha: "? none stated", competitors: ["SOC2 II, HIPAA", "HIPAA (Ent)", "SOC2 II", "SSO (Premium)", "SOC2 II"] },
  { capability: "Brand voice/tone customization", lumjha: "✓ built, unlisted (v2)", competitors: ["✓", "✓ appearance", "✓", "✓ comm. style", "✓ tone"] },
  { capability: "Access-restricted / PIN bot", lumjha: "✓ PIN Vault (v2)", competitors: ["n/v", "n/v", "✓ private bots ($49+)", "n/v", "n/v"] },
  { capability: "Knowledge-gap analytics", lumjha: "✓ built, unlisted (v2)", competitors: ["Pro ($400-500)", "Growth ($79/$129)", "Standard/Business ($149/$499)", "—", "chat topics (Growth)"] },
  { capability: "API (ingest/export)", lumjha: "✓ built, unlisted (v2)", competitors: ["Standard+", "Growth+", "✓ (tier n/v)", "OpenAPI (Plus)", "✓ all plans"] },
  { capability: "MCP server/connector", lumjha: "✓ built, unlisted (v2)", competitors: ["✓ (Sep 2026; tier n/v)", "✓ Growth+", "✓ Standard+ ($149)", "consumes MCP; Analytics MCP", "✓ all plans"] },
  { capability: "Overage policy", lumjha: "Throttle/upgrade prompt", competitors: ["Auto-recharge $40/1k", "$59/5k pack", "Hard stop or auto-add", "packs", "$0.99/res"] },
];

function MatrixCell({ value }: { value: string }) {
  if (!value) return null;
  const mark = value[0] === "✓" ? "check" : value[0] === "?" ? "unsure" : null;
  const text = mark ? value.slice(1).trim() : value;
  return (
    <span className="flex items-center gap-2">
      {mark === "check" && <Included className="text-white light:text-[#527DFF]" />}
      {mark === "unsure" && (
        <span aria-label="Not confirmed" className="shrink-0 font-bold text-[#FFD21B] light:text-[#B98A00]">?</span>
      )}
      {text && <span>{text}</span>}
    </span>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "What happens if I go over my conversations?",
    a: "Lumjha alerts you at 75% and 90% usage. At 100%, a top-up may be applied based on your plan and billing settings, subject to your spending cap. If the cap is reached, the agent can switch to collecting visitor details.",
  },
  {
    q: "Do I pay WhatsApp or Viber fees on top?",
    a: "Third-party messaging fees may apply separately from your Lumjha subscription, depending on the channel and its pricing terms.",
  },
  {
    q: "I’m on Gold or Platinum. What changes for me?",
    a: "Your available features, usage limits, and pricing may differ depending on your existing plan. Check your account or contact the Lumjha team to confirm your migration options.",
  },
  {
    q: "What’s the difference between the Lumjha Free plan and the 14-day trial?",
    a: "The Free plan provides ongoing access to its included features and limits. The proposed 14-day Growth trial offers temporary access to Growth plan features.",
  },
  {
    q: "Does Lumjha AI use my data to train AI models?",
    a: "Review Lumjha’s current privacy policy and data-processing terms for details on AI training, data handling, and information protection.",
  },
  {
    q: "How does Lumjha AI safety moderation work?",
    a: "Safety moderation depends on the safeguards and features available in your Lumjha setup. Refer to the product documentation for current details.",
  },
  {
    q: "How secure is Lumjha Policy Vault with PIN protection?",
    a: "Policy Vault offers restricted-access features. Consult Lumjha’s current security documentation for details about PIN protection and permissions.",
  },
  {
    q: "Which messaging channels are included in each Lumjha pricing plan?",
    a: "Supported channels and account limits vary by plan. Check the pricing comparison table for current allowances and integration availability.",
  },
  {
    q: "What is the difference between website pages and Knowledge Documents?",
    a: "Website pages are pages crawled from your website. Knowledge Documents are uploaded files or documents used to provide information to your AI agent.",
  },
  {
    q: "Can I upgrade or downgrade my Lumjha AI pricing plan anytime?",
    a: "Yes, plan changes can be made according to Lumjha’s billing terms. Check your account’s billing settings for available upgrade, downgrade, and billing-cycle options.",
  },
];

/* ---------- page ---------- */

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased light:bg-[#F5F7FC] light:text-[#0B1526]">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-56 h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -right-40 top-[700px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/25 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -left-40 top-[2300px] h-[600px] w-[400px] rounded-full bg-[#1B3AA0]/25 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -right-40 top-[3400px] h-[600px] w-[400px] rounded-full bg-[#1B3AA0]/20 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute left-1/2 top-[5200px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#1B3AA0]/20 blur-[140px] light:bg-[#527DFF]/10" />

        {/* HERO + PLANS */}
        <section id="plans" className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
          <div className="text-center">
            <h1 className="font-heading text-[clamp(2.25rem,4.5vw+1rem,4rem)] font-semibold leading-[1.15] tracking-tight text-balance">
              One Knowledge Base.
              <br />
              <span className="text-[#527DFF] light:text-[#3E63F2]">Smarter Conversations.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[1022px] text-[15px] leading-relaxed text-balance text-white/85 light:text-slate-600 sm:text-lg md:mt-6 md:text-xl">
              Activate your business knowledge across customer channels with Lumjha AI. Start free,
              choose a plan that fits your conversation volume, and scale as your business grows.
            </p>
          </div>
          <PricingPlans className={SECTION_HEAD_GAP} />
        </section>

        {/* DEPLOY ONE AI ENGINE — sources → one knowledge base → every channel */}
        <section id="engine" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader title="Deploy One AI Engine" subtitle="Connect your data to every platform." />
          <div className={`mx-auto flex max-w-[1160px] flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-6 ${SECTION_HEAD_GAP}`}>
            <ul className="flex w-full max-w-[320px] flex-col gap-3 lg:w-[250px]">
              {SOURCES.map((s) => (
                <li key={s.title} className="rounded-xl bg-[#527DFF] px-4 py-4 text-white shadow-[0_16px_40px_-20px_rgba(82,125,255,0.7)]">
                  <p className="text-[14px] font-semibold">{s.title}</p>
                  <p className="mt-1 text-[12px] text-white/80">{s.body}</p>
                </li>
              ))}
            </ul>

            <FlowArrow />

            <Tilt className="w-full max-w-[296px] rounded-[20px]" max={8}>
              <div className="flex aspect-square flex-col items-center justify-center rounded-[20px] bg-[#527DFF] px-5 text-center text-white shadow-[0_24px_60px_-20px_rgba(82,125,255,0.7)]">
                <span className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-white">
                  <Image src="/logo.png" alt="" width={69} height={96} className="h-[72px] w-auto" />
                </span>
                <p className="mt-4 text-[19px] font-bold">One knowledge base</p>
                <p className="mt-1 text-[12px] text-white/85">Trained once, always in sync</p>
                <ul className="mt-4 flex max-w-[200px] flex-wrap justify-center gap-2">
                  {ENGINE_CAPABILITIES.map((c) => (
                    <li key={c} className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#3E63F2]">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Tilt>

            <FlowArrow />

            <ul className="grid w-full max-w-[423px] grid-cols-2 gap-2">
              {DEPLOY_CHANNELS.map((c) => {
                const ChannelIcon = c.icon;
                return (
                  <li key={c.name} className="flex items-center gap-3 rounded-xl bg-[#527DFF] p-3 text-white shadow-[0_16px_40px_-20px_rgba(82,125,255,0.7)]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white" style={{ color: c.color }}>
                      {ChannelIcon === "site-search" ? (
                        <Image src="/assets/site-search.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
                      ) : (
                        <ChannelIcon className="h-5 w-5" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-semibold">{c.name}</span>
                      <span className="block truncate text-[10.5px] text-white/80">{c.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* WHAT COUNTS AS A CONVERSATION — rules + worked example, thin lines drifting behind */}
        <section id="conversations" className={`relative isolate mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]">
            <WaveLines />
          </div>
          <SectionHeader title="What counts as a conversation?" subtitle="Pay for conversations, not per message." />
          <div className={`mx-auto grid max-w-[1160px] grid-cols-1 items-start gap-6 lg:grid-cols-[589fr_534fr] lg:gap-10 ${SECTION_HEAD_GAP}`}>
            <Tilt className="rounded-2xl" max={4} scale={1.01} glare={false}>
              <div className={`${SHEEN_CARD} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-[#3E63F2] md:text-xl">Four simple rules</h3>
                <ol className="mt-5 space-y-4">
                  {RULES.map((r, i) => (
                    <li key={r.title} className="flex gap-3.5">
                      <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-md bg-[#3E63F2] text-[13px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-[#3E63F2]">{r.title}</span>
                        <span className="mt-0.5 block text-[13px] text-[#527DFF]">{r.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Tilt>

            <Tilt className="rounded-2xl" max={4} scale={1.01} glare={false}>
              <div className={`${SHEEN_CARD} p-6 md:p-7`}>
                <h3 className="text-lg font-bold text-[#3E63F2] md:text-xl">Example</h3>
                <ul className="mt-3 space-y-3 text-[13px] leading-snug">
                  {EXAMPLE_CHAT.map((line) =>
                    line.from === "gap" ? (
                      <li key={line.text} className="text-center font-mono text-[11px] text-slate-500">
                        {line.text}
                      </li>
                    ) : (
                      <li key={line.text} className={`flex ${line.from === "visitor" ? "justify-end" : "justify-start"}`}>
                        <span
                          className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-white ${
                            line.from === "visitor" ? "bg-[#2BB3F0]" : "bg-[#4D6280]"
                          }`}
                        >
                          {line.text}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-3 rounded-lg bg-[#1ED7A0] px-3.5 py-3 text-[13px] text-[#06281D]">
                  <strong>= 1 AI conversation</strong> · 1 lead captured · 2 bookings, regardless of length.
                </p>
              </div>
            </Tilt>
          </div>
        </section>

        {/* NEVER MISS A LEAD — usage alerts */}
        <section id="usage" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader title="Never Miss A Lead" subtitle="Smart cap protection keeps capturing details." />
          <ul className={`mx-auto grid max-w-[1160px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-9 md:gap-y-8 ${SECTION_HEAD_GAP}`}>
            {USAGE_ALERTS.map((u) => (
              <li key={u.mark}>
                {/* wide, short rows → gentle angle, as on the commitments list */}
                <Tilt className="rounded-lg" max={3} scale={1.01} glare={false}>
                  <div className="flex items-center gap-4 rounded-lg bg-[linear-gradient(90deg,#FFFFFF_35%,#DDE7FF_100%)] px-4 py-4 light:ring-1 light:ring-[#D7E3F5]">
                    <span
                      className={`flex h-[38px] w-16 shrink-0 items-center justify-center rounded-md text-[15px] font-bold ${
                        u.cap ? "bg-[#0E6B2C] text-[#7CF0A4]" : "bg-[#527DFF] text-white"
                      }`}
                    >
                      {u.mark}
                    </span>
                    <span className={`text-[13px] leading-snug md:text-[14px] ${u.cap ? "text-[#11692E]" : "text-[#3E63F2]"}`}>{u.text}</span>
                  </div>
                </Tilt>
              </li>
            ))}
          </ul>
        </section>

        {/* FOR DEVELOPERS & AGENCIES — API + MCP */}
        <section id="developers" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_422px] lg:gap-16">
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-[28px] font-bold uppercase leading-tight tracking-tight text-white light:text-[#0B1526] sm:text-4xl md:text-[44px]">
                For Developers &amp; Agencies
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85 light:text-slate-600 sm:text-lg md:mt-5 md:text-xl">
                Open by design: API + MCP
              </p>
            </div>
            <Tilt className="rounded-xl lg:mt-14" max={4} scale={1.01} glare={false}>
              <pre className="whitespace-pre-wrap break-words rounded-xl bg-white p-5 font-mono text-[12px] leading-[1.7] shadow-[0_24px_60px_-28px_rgba(82,125,255,0.6)] light:ring-1 light:ring-[#D7E3F5]">
                {CODE_SAMPLE.map((block, i) => (
                  <code key={block.comment} className={`block ${i > 0 ? "mt-3" : ""}`}>
                    <span className="block text-[#5B6FD8]">{block.comment}</span>
                    {block.lines.map((l) => (
                      <span key={l.text} className={`block ${l.tone === "cmd" ? "text-[#0EA5A4]" : "text-[#C99A06]"}`}>
                        {l.text}
                      </span>
                    ))}
                  </code>
                ))}
              </pre>
            </Tilt>
          </div>
        </section>

        {/* FEATURE & PRICING MATRIX */}
        <section id="compare" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader title="Feature & Pricing Matrix" subtitle="Lumjha vs. Competitors" />
          <div className={`mx-auto max-w-[1137px] overflow-x-auto rounded-xl border border-[#2D5BFF]/70 shadow-[0_24px_80px_-30px_rgba(45,91,255,0.7)] light:border-[#C9D8FF] ${SECTION_HEAD_GAP}`}>
            <table className="w-full min-w-[1000px] table-fixed border-collapse text-left text-[13.5px] leading-snug text-white/90 light:text-[#0B1526]">
              <thead>
                <tr className="bg-[#1A46DB] text-[15px] font-bold text-white">
                  <th scope="col" className="sticky left-0 z-10 w-[190px] bg-[#1A46DB] px-4 py-3">Capability</th>
                  <th scope="col" className="w-[170px] bg-[#2D63FF] px-4 py-3 text-center">Lumjha</th>
                  {COMPETITORS.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 text-center">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, i) => {
                  const rowBg = i % 2 === 0 ? "bg-[#0A1B47] light:bg-white" : "bg-[#0D2259] light:bg-[#F3F6FD]";
                  return (
                    <tr key={row.capability} className={`border-t border-[#2D5BFF]/25 light:border-[#E1E8F5] ${rowBg}`}>
                      <th scope="row" className={`sticky left-0 z-10 px-4 py-2.5 font-medium text-white/80 light:text-slate-600 ${rowBg}`}>
                        {row.capability}
                      </th>
                      <td className={`bg-[#12368F] px-4 py-2.5 text-white light:bg-[#E6EDFF] light:text-[#0B1526] ${row.strong ? "font-bold" : ""}`}>
                        <MatrixCell value={row.lumjha} />
                      </td>
                      {row.competitors.map((cell, j) => (
                        <td key={COMPETITORS[j]} className="px-4 py-2.5">
                          <MatrixCell value={cell} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about pricing." />
          <ol className={`mx-auto max-w-[1160px] border-t border-[#345071] light:border-[#D7E3F5] ${SECTION_HEAD_GAP}`}>
            {FAQS.map((f, i) => (
              <li key={f.q} className="flex gap-4 border-b border-[#345071] py-6 light:border-[#D7E3F5] md:gap-5 md:py-7">
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-[#527DFF] text-[11px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold leading-snug text-white light:text-[#0B1526] md:text-[19px]">{f.q}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/75 light:text-slate-600 md:text-[15px]">{f.a}</p>
                </div>
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
