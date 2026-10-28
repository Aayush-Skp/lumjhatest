/* ============================================================
   Pricing plans — the four plan cards on /pricing. Plain data (no
   "use client") so both the site and the admin panel can import it;
   the admin panel can copy it into Supabase as its starting point.
   ============================================================ */

export type Billing = "monthly" | "annual";

export type Feature = { text: string; strong?: boolean; exclusive?: boolean };

export type Plan = {
  name: string;
  audience: string;
  /** Per-month price for each billing cycle. */
  price: Record<Billing, string>;
  detail: Record<Billing, string>;
  allowance: string;
  allowanceNote?: string;
  cta: string;
  /** CTA link; defaults to the app sign-in. */
  href?: string;
  featured?: boolean;
  /** "Everything in X, plus" line above the feature list. */
  includes?: string;
  features: Feature[];
  note: string;
};

// Annual = 10 × the monthly price ("2 months free"), except Growth ($99 vs $119)
// and Enterprise (annual contract only).
export const PLANS: Plan[] = [
  {
    name: "Starter",
    audience: "Solo businesses & consultants",
    price: { monthly: "$49", annual: "$41" },
    detail: { monthly: "Billed monthly", annual: "$490 billed yearly · save $98" },
    allowance: "500",
    cta: "Start 14-day trial",
    features: [
      { text: "1 AI agent" },
      { text: "Website widget" },
      { text: "All messaging channels: WhatsApp, Instagram, Messenger, Telegram, Viber* (1 account each)" },
      { text: "2,000 pages · monthly auto re-crawl" },
      { text: "15 Knowledge Documents (up to 5MB each)" },
      { text: "Full brand kit: voice, tone, messaging" },
      { text: "3 lead forms · full chat history · CSV export" },
      { text: "Google Calendar booking" },
      { text: "Human handoff inbox" },
      { text: "Detailed Reporting & Insights · top unanswered questions (weekly)" },
      { text: "Read-only MCP (leads, conversations, analytics)" },
    ],
    note: "Top-up: 250 conversations / $25 · auto, capped by you",
  },
  {
    name: "Growth",
    audience: "Growing SMBs, e-commerce, clinics",
    price: { monthly: "$119", annual: "$99" },
    detail: { monthly: "Billed monthly", annual: "$1,188 billed yearly · save $240" },
    allowance: "2,000",
    allowanceNote: "~$0.05 each",
    cta: "Start 14-day trial",
    featured: true,
    includes: "Everything in Starter, plus",
    features: [
      { text: "3 AI agents" },
      { text: "Up to 3 numbers/accounts per channel" },
      { text: "Up to 5,000 web pages · Bi-weekly auto re-crawl" },
      { text: "35 Knowledge Documents (up to 5MB each)" },
      { text: "Site Search included", strong: true, exclusive: true },
      { text: "Advanced Reporting & Insights · full gap suggestions + one-click “add answer”" },
      { text: "Unlimited forms · custom fields · CRM, webhooks, Shopify" },
      { text: "Custom guardrails, escalation rules, PII masking" },
      { text: "Remove Lumjha badge" },
      { text: "API (ingest + export) + full MCP" },
      { text: "Priority email/chat support" },
      { text: "Early access to new features & capabilities", strong: true },
    ],
    note: "Top-up: 500 conversations / $25 · Policy Vault +$49",
  },
  {
    name: "Pro",
    audience: "Multi-location, agencies, high volume",
    price: { monthly: "$249", annual: "$208" },
    detail: { monthly: "Billed monthly", annual: "$2,490 billed yearly · save $498" },
    allowance: "6,000",
    cta: "Start 14-day trial",
    includes: "Everything in Growth, plus",
    features: [
      { text: "10 AI agents" },
      { text: "Up to 10 numbers/accounts per channel" },
      { text: "Up to 10,000 web pages · weekly auto re-crawl" },
      { text: "100 Knowledge Documents (up to 6MB each)" },
      { text: "PIN-protected Policy Vault included", strong: true, exclusive: true },
      { text: "Advanced Reporting & Insights · cross-surface gaps (chat + search + vault), scheduled reports" },
      { text: "Per-location brand kits & lead routing" },
      { text: "Moderation log" },
      { text: "Higher API limits · bulk export · multi-agent MCP scopes" },
      { text: "Premium reasoning model (counts as 3 conversations)" },
      { text: "Onboarding call" },
      { text: "Early access to new features & capabilities", strong: true },
    ],
    note: "Top-up: 1,000 conversations / $45 · Agency Kit +$99",
  },
  {
    name: "Enterprise",
    audience: "Regulated & large organizations",
    price: { monthly: "$1,000", annual: "$1,000" },
    detail: { monthly: "Starting price · annual contract", annual: "Starting price · annual contract" },
    allowance: "Custom",
    allowanceNote: "committed volume",
    cta: "Talk to sales",
    href: "mailto:info@lumjha.ai?subject=Lumjha%20Enterprise",
    includes: "Everything in Pro, plus",
    features: [
      { text: "Committed conversation volume" },
      { text: "SSO-gated Policy Vault with audit log" },
      { text: "Full white-label" },
      { text: "Custom moderation policies" },
      { text: "Custom API/MCP limits with OAuth/SSO scopes" },
      { text: "BYO LLM key" },
      { text: "DPA" },
      { text: "Dedicated CSM and SLA", strong: true },
    ],
    note: "Start with a paid 30-day pilot, credited to your contract.",
  },
];
