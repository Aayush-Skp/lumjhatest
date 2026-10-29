import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import WaveLines from "@/components/site/WaveLines";
import PricingPlans, { Included } from "@/components/site/PricingPlans";
import PlanMatrix, { OnlyOnLumjha } from "@/components/site/PlanMatrix";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import { Faq } from "@/components/site/ProductSections";
import Tilt from "@/components/ui/Tilt";
import { listPlans } from "@/lib/admin/content";
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

/* ---------- shared card look ----------
   Dark: navy panels with a hairline edge (Figma). Light: white cards. */

const CARD =
  "rounded-2xl border border-[#1F3156] bg-[#0D1934] light:border-[#D7E3F5] light:bg-white light:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)]";
/* recessed panel inside a card (mock UIs) */
const INSET = "rounded-xl border border-[#2A3F6B] bg-[#081229] light:border-[#D7E3F5] light:bg-[#F5F8FE]";
const EYEBROW = "font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-[#6E8BFF] light:text-[#3E63F2]";
const MOCK_LABEL = "font-mono text-[9.5px] uppercase tracking-[0.06em] text-subtle";

/* ---------- what counts as a conversation ---------- */

const RULES = [
  { title: "One thread with at least one AI reply = 1 conversation.", body: "On any channel: website, WhatsApp, Instagram and the rest." },
  { title: "It stays one conversation until 24 hours of silence.", body: "The same as WhatsApp’s 24-hour customer-service window." },
  { title: "Fair use:", body: "more than 30 AI replies in one thread counts as a second conversation." },
  { title: "Human-only threads are free.", body: "If your team answers without the AI, it doesn’t count." },
];

type ChatLine = { from: "visitor" | "ai"; text: string } | { from: "gap"; text: string };

const EXAMPLE_CHAT: ChatLine[] = [
  { from: "visitor", text: "Do you do teeth whitening on Saturdays?" },
  { from: "ai", text: "Yes, Saturdays 9am–1pm. Want me to book a slot?" },
  { from: "visitor", text: "Yes please, this Saturday. I’m Maya." },
  { from: "ai", text: "Done ✓ Saturday 10:00 booked. What’s the best email for the confirmation?" },
  { from: "gap", text: "··· 3 hours later, same thread ···" },
  { from: "visitor", text: "Can I bring my daughter too?" },
  { from: "ai", text: "Of course. I’ve added a second slot at 10:30." },
];

/* ---------- every channel is just the start ---------- */

const TODAYS_LEADS = [
  { who: "Sam R. · booked Sat 10:00", channel: "WhatsApp" },
  { who: "Leo K. · asked for a quote", channel: "Instagram" },
  { who: "Ana P. · callback request", channel: "Website" },
];

const WEEKLY_GAPS = [
  { q: "“Do you ship to Canada?”", where: "chat · 14" },
  { q: "“gift card balance”", where: "search · 9" },
  { q: "“pet policy deposit”", where: "vault · 6" },
];

/* ---------- the essentials ---------- */

/* Line icons in the 24×24 Lucide style; each entry is one stroked path. */
const ESSENTIAL_ICONS = {
  sun: ["M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0", "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
    "m9 12 2 2 4-4",
  ],
  list: ["M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z", "M9 8h6M9 12h6M9 16h4"],
  chat: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6", "M14.5 4l-5 16"],
  share: [
    "M21 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0M21 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "m8.6 13.5 6.8 4M15.4 6.5l-6.8 4",
  ],
} as const;

const ESSENTIALS: { icon: keyof typeof ESSENTIAL_ICONS; title: string; body: string }[] = [
  {
    icon: "sun",
    title: "Live in minutes",
    body: "Paste your URL: Lumjha auto-crawls your site and builds the knowledge base. Add PDFs, DOCX, CSV, Google Drive or Shopify as Knowledge Documents.",
  },
  { icon: "shield", title: "Your brand, safely", body: "Your logo, colors, voice, tone and messaging, with chat safety moderation and controls always on." },
  { icon: "list", title: "Leads & bookings", body: "Form-less lead capture plus multiple forms, full chat history and Google Calendar booking." },
  { icon: "chat", title: "Human takeover, any channel", body: "Step into any conversation on the website, WhatsApp, Instagram, Messenger, Telegram or Viber from one inbox." },
  { icon: "code", title: "API", body: "Ingest sources and export leads, conversations and analytics programmatically." },
  { icon: "share", title: "MCP connector", body: "Connect ChatGPT, Claude and your own agents to Lumjha with scoped, read-only-by-default access." },
];

function EssentialIcon({ name }: { name: keyof typeof ESSENTIAL_ICONS }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ESSENTIAL_ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ---------- grow without jumping tiers ---------- */

const TOP_UPS = [
  { plan: "Starter", price: "$25", amount: "250 conversations" },
  { plan: "Growth", price: "$25", amount: "500 conversations" },
  { plan: "Pro", price: "$45", amount: "1,000 conversations" },
];

const ADD_ONS = [
  { price: "+$49", title: "Policy Vault (PIN-protected)", body: "Starter & Growth. Included on Pro." },
  { price: "+$25", title: "Site Search", body: "Starter only. Included on Growth and above." },
  { price: "$99", title: "Agency Kit (on Pro)", body: "Full white-label (widget, dashboard, custom domain), client sub-accounts, per-client usage reports, multi-client API/MCP keys." },
  { price: "$19", title: "Remove badge", body: "Remove “Powered by Lumjha” on Starter." },
  { price: "$15", title: "Extra agent", body: "Another AI agent for a new brand, site or location." },
  { price: "$10", title: "Extra seat", body: "Another teammate in your workspace." },
  { price: "$15", title: "Extra WhatsApp number / IG account", body: "Connect another number or account to your agent." },
  { price: "$19", title: "+5,000 web pages", body: "More crawl room for large sites, on any paid plan." },
];

/* ---------- never goes silent ---------- */

const USAGE_ALERTS: { mark: string; text: string; cap?: boolean }[] = [
  { mark: "75%", text: "Email + in-app heads-up with a usage forecast." },
  { mark: "90%", text: "Second alert, plus a one-click upgrade suggestion if it’s cheaper than top-ups." },
  { mark: "100%", text: "An automatic top-up pack is added, up to your spending cap. Upgrade in the same cycle and the top-ups are forgiven." },
  { mark: "Cap", text: "The agent switches to “leave your details” mode, so leads are still captured, never lost.", cap: true },
];

/* ---------- API + MCP ---------- */

const DEV_CHIPS = ["REST API", "MCP connector", "Webhooks", "OAuth scopes", "Vault over MCP (Pro)"];

/** Public developer docs — the button stays hidden until this is set. */
const DEVELOPER_DOCS_URL: string | null = null;

/* Each line is a list of [tone, text] segments. */
type Tone = "comment" | "cmd" | "str" | "plain";
const CODE: [Tone, string][][] = [
  [["comment", "# Ask your AI assistant about today’s leads (illustrative)"]],
  [["cmd", "mcp add lumjha "], ["str", "https://<your-lumjha-mcp-endpoint>"]],
  [],
  [["comment", "# Ingest a new source via API (illustrative)"]],
  [["cmd", "POST /v1/agents/{agent_id}/sources"]],
  [["plain", "{ "], ["str", "\"type\""], ["plain", ": "], ["str", "\"url\""], ["plain", ", "], ["str", "\"url\""], ["plain", ": "], ["str", "\"https://example.com/policies\""], ["plain", ","]],
  [["plain", "  "], ["str", "\"recrawl\""], ["plain", ": "], ["str", "\"weekly\""], ["plain", " }"]],
  [],
  [["comment", "# Export leads with chat history"]],
  [["cmd", "GET /v1/leads?include=conversations&since=2026-10-01"]],
];

const CODE_TONE: Record<Tone, string> = {
  comment: "text-[#6B7A99]",
  cmd: "text-[#7FA3FF]",
  str: "text-[#F2C94C]",
  plain: "text-[#C9D3E6]",
};

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

export default async function PricingPage() {
  // the admin panel's plans (Supabase), or the built-in ones when it has none
  const { plans } = await listPlans();
  return (
    <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">
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
          <PricingPlans plans={plans} className={SECTION_HEAD_GAP} />
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
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[10%] -z-10 h-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]">
            <WaveLines />
          </div>
          <SectionHeader
            title="What counts as a conversation?"
            subtitle={
              <>
                You pay for conversations your AI actually has, not for every message, and never for seats.{" "}
                Long, helpful chats that turn into leads don’t cost you extra.
              </>
            }
          />
          <div className={`mx-auto grid max-w-[1048px] grid-cols-1 gap-6 lg:grid-cols-2 ${SECTION_HEAD_GAP}`}>
            <div className={`${CARD} p-5 sm:p-6`}>
              <h3 className="text-lg font-bold text-ink">Four simple rules</h3>
              <ol className="mt-5 space-y-5">
                {RULES.map((r, i) => (
                  <li key={r.title} className="flex gap-3.5">
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border border-[#3A5795] bg-[#132550] text-[12px] font-semibold text-white light:border-transparent light:bg-[#3E63F2]">
                      {i + 1}
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-muted">
                      <strong className="font-semibold text-ink">{r.title}</strong> {r.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={`${CARD} p-5 sm:p-6`}>
              <h3 className="text-lg font-bold text-ink">Example</h3>
              <ul className="mt-4 space-y-3 text-[13px] leading-snug">
                {EXAMPLE_CHAT.map((line) =>
                  line.from === "gap" ? (
                    <li key={line.text} className="text-center font-mono text-[10.5px] text-subtle">
                      {line.text}
                    </li>
                  ) : (
                    <li key={line.text} className={`flex ${line.from === "visitor" ? "justify-end" : "justify-start"}`}>
                      <span
                        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 ${
                          line.from === "visitor"
                            ? "bg-[#1E3160] text-white light:bg-[#527DFF]"
                            : "border border-[#2A3F6B] bg-[#0A1530] text-ink light:border-[#D7E3F5] light:bg-[#F5F8FE]"
                        }`}
                      >
                        {line.text}
                      </span>
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-4 rounded-lg border border-[#2BD4A4] bg-[#0E2A33] px-3.5 py-3 text-[13px] text-ink/90 light:border-[#1ED7A0] light:bg-[#E7FBF4] light:text-[#06281D]">
                <strong className="font-semibold">= 1 AI conversation</strong> · 1 lead captured · 2 bookings. Illustrative example.
              </p>
            </div>
          </div>
        </section>

        {/* EVERY CHANNEL IS JUST THE START — what only Lumjha does */}
        <section id="features" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="Every channel is just the start."
            subtitle="Other tools put a chatbot on more apps. Lumjha puts the same brain everywhere: search, exact policy answers and lead capture included."
          />
          <div className={`mx-auto grid max-w-[1048px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ${SECTION_HEAD_GAP}`}>
            {/* 01 · site search */}
            <article className={`${CARD} flex flex-col p-5 sm:p-6`}>
              <p className={EYEBROW}>01 · Site search</p>
              <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink">
                Site search that actually answers. <OnlyOnLumjha />
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Turn your search box into instant, sourced answers, from the same knowledge base as your chat
                agent on every channel. No second tool, no second setup.
              </p>
              <div aria-hidden className={`${INSET} mt-5 space-y-2.5 p-3 text-[11.5px]`}>
                <div className="flex items-center gap-2 rounded-lg border border-[#3A5795] bg-[#0D1934] px-3 py-2 text-ink light:border-[#C9D8FF] light:bg-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-subtle" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  how do I reschedule
                </div>
                <div className="rounded-lg bg-[#16264D] px-3 py-2.5 leading-snug text-muted light:bg-[#EEF3FF]">
                  <strong className="font-semibold text-ink">Reschedule from your confirmation email</strong> or reply “reschedule” in chat.
                  <span className="mt-0.5 block text-[#6E97FF] light:text-[#3E63F2]">/help/bookings</span>
                </div>
                <div className="rounded-lg bg-[#111F40] px-3 py-2 text-muted light:bg-white light:ring-1 light:ring-[#D7E3F5]">
                  Continue on WhatsApp or chat →
                </div>
              </div>
              <div className="mt-auto pt-5">
                <p className="border-t border-[#1F3156] pt-4 text-[12px] leading-relaxed text-muted light:border-[#D7E3F5]">
                  Included on Growth, Pro &amp; Enterprise · +$25/mo on Starter
                </p>
              </div>
            </article>

            {/* 02 · policy vault */}
            <article className={`${CARD} flex flex-col p-5 sm:p-6`}>
              <p className={EYEBROW}>02 · Lumjha Vault</p>
              <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink">
                Exact policy quotes, on every channel. <OnlyOnLumjha />
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Refunds, warranties, coverage, HR: Lumjha answers with the exact clause and its source, never a
                paraphrase, on your site or in a DM. Lock it with a PIN for staff or partners.
              </p>
              <div aria-hidden className={`${INSET} mt-5 p-3 text-[11.5px]`}>
                <p className={MOCK_LABEL}>Staff vault · PIN required · illustrative</p>
                <div className="mt-2.5 flex gap-1.5">
                  {[0, 1, 2, 3].map((d) => (
                    <span key={d} className="flex h-6 w-6 items-center justify-center rounded-md border border-[#3A5795] bg-[#0D1934] light:border-[#C9D8FF] light:bg-white">
                      <span className="h-1 w-1 rounded-full bg-ink" />
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-ink">“What’s the return window for opened items?”</p>
                <blockquote className="mt-2.5 border-l-2 border-[#F2C94C] bg-[#2A2A1F] px-2.5 py-2 italic text-[#F2D27A] light:bg-[#FFF8E1] light:text-[#7A5B00]">
                  “Opened items may be returned within 14 days of delivery for store credit.”
                </blockquote>
                <p className="mt-2.5 font-mono text-[9.5px] uppercase text-[#6E97FF] light:text-[#3E63F2]">
                  Source: Returns-Policy-2026.pdf · §3.2
                </p>
              </div>
              <div className="mt-auto pt-5">
                <p className="border-t border-[#1F3156] pt-4 text-[12px] leading-relaxed text-muted light:border-[#D7E3F5]">
                  Included on Pro · +$49/mo on Starter &amp; Growth · SSO-gated on Enterprise
                </p>
              </div>
            </article>

            {/* 03 · leads everywhere */}
            <article className={`${CARD} flex flex-col p-5 sm:p-6 md:col-span-2 lg:col-span-1`}>
              <p className={EYEBROW}>03 · Leads everywhere</p>
              <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink">Leads captured on every channel.</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Conversations on WhatsApp, Instagram or your website become leads and bookings in one list, with
                the full chat history attached. No forms needed in DMs.
              </p>
              <div aria-hidden className={`${INSET} mt-5 p-3 text-[11.5px]`}>
                <p className={MOCK_LABEL}>Today’s leads · illustrative</p>
                <ul className="mt-1.5 divide-y divide-[#22365C] light:divide-[#E1E8F5]">
                  {TODAYS_LEADS.map((l) => (
                    <li key={l.who} className="flex items-center justify-between gap-3 py-2 text-ink">
                      <span className="min-w-0">{l.who}</span>
                      <span className="shrink-0 rounded bg-[#16264D] px-1.5 py-0.5 font-mono text-[9px] text-[#7FA3FF] light:bg-[#EEF3FF] light:text-[#3E63F2]">
                        {l.channel}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-5">
                <p className="border-t border-[#1F3156] pt-4 text-[12px] leading-relaxed text-muted light:border-[#D7E3F5]">
                  1 form on Free · 3 forms + export on Starter · unlimited + CRM on Growth
                </p>
              </div>
            </article>

            {/* plus · gap insights (full width) */}
            <article className={`${CARD} grid grid-cols-1 items-center gap-5 p-5 sm:p-6 md:col-span-2 lg:col-span-3 lg:grid-cols-[1fr_456px] lg:gap-10`}>
              <div>
                <p className={EYEBROW}>Plus · Gap insights</p>
                <h3 className="mt-3 text-[19px] font-bold leading-snug text-ink">Know what customers couldn’t find, on any channel.</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  Lumjha flags unanswered questions across chat, site search and policy lookups, and suggests the
                  answer to add. One click to fix. Top questions on Starter · full suggestions on Growth ·
                  cross-surface on Pro.
                </p>
              </div>
              <div aria-hidden className={`${INSET} p-3 text-[11.5px]`}>
                <p className={MOCK_LABEL}>This week’s gaps · illustrative</p>
                <ul className="mt-1.5">
                  {WEEKLY_GAPS.map((g) => (
                    <li key={g.q} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-1.5">
                      <span className="min-w-0 text-ink">{g.q}</span>
                      <span className="font-mono text-[10px] text-[#F2C94C] light:text-[#B7791F]">{g.where}</span>
                      <span className="rounded-full bg-[#527DFF] px-2.5 py-1 text-[10px] font-semibold text-white">Add answer</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* THE ESSENTIALS */}
        <section id="essentials" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <h2 className="text-center font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-ink sm:text-4xl md:text-[44px]">
            The essentials, done properly
          </h2>
          <ul className={`mx-auto grid max-w-[1048px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 ${SECTION_HEAD_GAP}`}>
            {ESSENTIALS.map((e) => (
              <li key={e.title} className={`${CARD} flex gap-4 p-5`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3A5795] bg-[#132550] text-[#9DB6FF] light:border-[#C9D8FF] light:bg-[#EEF3FF] light:text-[#3E63F2]">
                  <EssentialIcon name={e.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-ink">{e.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{e.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* EVERY FEATURE, EVERY PLAN */}
        <section id="plan-matrix" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <h2 className="text-center font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-ink sm:text-4xl md:text-[44px]">
            Every feature, every plan
          </h2>
          <PlanMatrix className={SECTION_HEAD_GAP} />
        </section>

        {/* GROW WITHOUT JUMPING TIERS — top-ups + add-ons */}
        <section id="add-ons" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="Grow without jumping tiers"
            subtitle="Add exactly what you need. Add-ons renew with your plan and can be removed any time."
          />
          <div className={`mx-auto max-w-[1040px] space-y-4 ${SECTION_HEAD_GAP}`}>
            <div className={`${CARD} grid grid-cols-1 items-center gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-8`}>
              <div>
                <h3 className="text-[19px] font-bold text-ink">Top-up packs</h3>
                <p className="mt-1 text-[13.5px] font-semibold text-ink">Extra AI conversations</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  Added automatically at your limit, up to the cap you set. If you upgrade in the same cycle,
                  top-ups are forgiven.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
                {TOP_UPS.map((t) => (
                  <li key={t.plan} className={`${INSET} px-3 py-4 text-center`}>
                    <p className="text-[11.5px] text-muted">{t.plan}</p>
                    <p className="mt-0.5 text-[20px] font-bold text-ink">{t.price}</p>
                    <p className="mt-0.5 text-[10.5px] text-muted">{t.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ADD_ONS.map((a) => (
                <li key={a.title} className={`${CARD} p-5`}>
                  <p className="font-bold text-ink">
                    <span className="text-[22px]">{a.price}</span>
                    <span className="text-[11px] font-normal text-muted">/mo</span>
                  </p>
                  <h3 className="mt-2 text-[13.5px] font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* NEVER GOES SILENT — usage alerts */}
        <section id="usage" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-balance text-ink sm:text-4xl">
                Your agent never goes silent at month-end.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted md:text-base lg:mx-0">
                Other tools stop answering when you hit a limit. Lumjha warns you early, tops up within the cap
                you set, and if you reach the cap, it still collects visitors’ details so you never lose a lead.
              </p>
            </div>
            <ol className="space-y-3">
              {USAGE_ALERTS.map((u) => (
                <li key={u.mark} className={`${CARD} flex items-center gap-4 rounded-xl px-4 py-3.5`}>
                  <span
                    className={`flex h-9 w-14 shrink-0 items-center justify-center rounded-md text-[14px] font-bold ${
                      u.cap
                        ? "bg-[#0F3B33] text-[#2EE6A6] light:bg-[#E7FBF4] light:text-[#0E8A5F]"
                        : "bg-[#1A2A52] text-white light:bg-[#EEF3FF] light:text-[#3E63F2]"
                    }`}
                  >
                    {u.mark}
                  </span>
                  <span className="text-[13px] leading-snug text-ink/90">{u.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* OPEN BY DESIGN — API + MCP */}
        <section id="developers" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-[#DDE6FF] light:text-[#0B1526] sm:text-4xl">
                Open by design: API + MCP
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted md:text-base lg:mx-0">
                Push sources in and pull leads, conversations and analytics out with the API. Connect ChatGPT,
                Claude, Cursor or your own agents through the Lumjha MCP connector, with OAuth scopes and
                read-only access by default.
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {DEV_CHIPS.map((c) => (
                  <li key={c} className="rounded-md border border-[#2A3F6B] bg-[#0D1934] px-2 py-1 font-mono text-[10.5px] text-ink light:border-[#C9D8FF] light:bg-white">
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
                Read-only MCP on Starter · Full API + MCP on Growth · Multi-agent scopes on Pro · Custom limits on Enterprise
              </p>
              {DEVELOPER_DOCS_URL && (
                <a
                  href={DEVELOPER_DOCS_URL}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2A3F6B] bg-[#0D1934] px-6 py-3 text-[13.5px] font-semibold text-ink transition hover:border-[#527DFF] light:border-[#C9D8FF] light:bg-white"
                >
                  Read the developer docs <span aria-hidden>→</span>
                </a>
              )}
            </div>
            {/* code stays dark in both themes */}
            <pre className="overflow-x-auto rounded-2xl border border-[#22365C] bg-[#050D20] p-5 font-mono text-[11.5px] leading-[1.7] shadow-[0_24px_60px_-30px_rgba(82,125,255,0.5)] light:border-transparent sm:p-6 lg:min-h-[260px]">
              <code>
                {CODE.map((line, i) => (
                  <span key={i} className="block min-h-[1.7em]">
                    {line.map(([tone, text], j) => (
                      <span key={j} className={CODE_TONE[tone]}>{text}</span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
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

        {/* TODO: social proof (customer logos, an approved testimonial, real compliance status) goes here once approved — never invented. */}

        {/* FAQ */}
        <Faq product="Lumjha Pricing" items={FAQS} />

        <CtaPanel />

        <Footer />
      </main>
    </div>
  );
}
