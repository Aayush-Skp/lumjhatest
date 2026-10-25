"use client";

import { useState } from "react";

/* ============================================================
   Pricing plans — billing switch + four plan cards (Figma "Pricing")
   ============================================================ */

type Billing = "monthly" | "annual";

type Feature = { text: string; strong?: boolean; exclusive?: boolean };

type Plan = {
  name: string;
  audience: string;
  /** Per-month price for each billing cycle (Free is $0 on both). */
  price: Record<Billing, string>;
  detail: Record<Billing, string>;
  allowance: string;
  allowanceNote?: string;
  cta: string;
  featured?: boolean;
  /** "Everything in X, plus" line above the feature list. */
  includes?: string;
  features: Feature[];
  note: string;
};

// Annual = 10 × the monthly price ("2 months free").
const PLANS: Plan[] = [
  {
    name: "Free",
    audience: "Trying Lumjha on your own site",
    price: { monthly: "$0", annual: "$0" },
    detail: { monthly: "Free forever", annual: "Free forever" },
    allowance: "50",
    cta: "Start free",
    features: [
      { text: "1 AI agent · 1 seat" },
      { text: "Website widget + 1 messaging channel" },
      { text: "Auto-crawl up to 50 pages" },
      { text: "2 Knowledge Documents (up to 3MB each)" },
      { text: "Logo + colors · baseline safety moderation" },
      { text: "1 lead form · view last 25 leads" },
      { text: "Basic Reporting" },
      { text: "“Powered by Lumjha” badge" },
    ],
    note: "At your limit: upgrade prompt. Your data is kept.",
  },
  {
    name: "Starter",
    audience: "Solo businesses & consultants",
    price: { monthly: "$49", annual: "$41" },
    detail: { monthly: "Billed monthly", annual: "$490 billed yearly · save $98" },
    allowance: "500",
    cta: "Start 14-day trial",
    includes: "Everything in Free, plus",
    features: [
      { text: "1 AI agent · 2 seats" },
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
    price: { monthly: "$99", annual: "$83" },
    detail: { monthly: "Billed monthly", annual: "$990 billed yearly · save $198" },
    allowance: "2,000",
    allowanceNote: "~$0.05 each",
    cta: "Start 14-day trial",
    featured: true,
    includes: "Everything in Starter, plus",
    features: [
      { text: "3 AI agents · 5 seats" },
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
      { text: "10 AI agents · 15 seats" },
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
];

/* Figma check-circle (public/assets/included.svg), used as a mask so it
   takes the text colour in both themes. */
export function Included({ className = "mt-[3px] text-[#E3EEFB] light:text-[#527DFF]" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`size-[14px] shrink-0 bg-current [mask:url(/assets/included.svg)_center/contain_no-repeat] ${className}`}
    />
  );
}

function BillingSwitch({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const option = (b: Billing) =>
    `flex h-[41px] items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-300 ${
      value === b
        ? "bg-[#5078FF] text-white"
        : "text-[#E3EEFB] hover:text-white light:text-[#0B1526] light:hover:text-[#3E63F2]"
    }`;
  return (
    <div
      role="group"
      aria-label="Billing cycle"
      className="mx-auto flex w-fit items-center gap-1 rounded-full border border-[#355379] bg-[#09172B] p-[5px] light:border-[#D7E3F5] light:bg-white"
    >
      <button type="button" aria-pressed={value === "monthly"} onClick={() => onChange("monthly")} className={`w-[92px] ${option("monthly")}`}>
        Monthly
      </button>
      <button type="button" aria-pressed={value === "annual"} onClick={() => onChange("annual")} className={`w-[183px] ${option("annual")}`}>
        Annual
        <span className="rounded-full bg-[#EAF3FF] px-1.5 py-[3px] text-[10px] font-bold leading-[1.4] text-[#3756AB]">2 months free</span>
      </button>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-[18px] bg-gradient-to-b px-5 pb-8 pt-6 text-[#E3EEFB] light:bg-none light:text-[#0B1526] ${
        plan.featured
          ? "border-2 border-[#5078FF] from-[#172A5D] to-[#0D1830] light:bg-[linear-gradient(180deg,#EEF3FF,#FFFFFF)] light:shadow-[0_24px_60px_-24px_rgba(82,125,255,0.45)]"
          : "border border-[#213653] from-[#101E3B] to-[#0C172D] light:border-[#D7E3F5] light:bg-white"
      }`}
    >
      {plan.featured && (
        <span className="absolute left-1/2 top-0 flex h-[25px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#5078FF] text-[12px] font-semibold text-white">
          ★ Most popular
        </span>
      )}

      <h3 className="text-[19px] font-bold leading-[1.4]">{plan.name}</h3>
      <p className="mt-0.5 min-h-10 text-[14px] leading-[1.4] light:text-slate-600">{plan.audience}</p>

      <p className="mt-2.5 whitespace-nowrap font-bold">
        <span className="text-[44px] leading-none">{plan.price[billing]}</span>
        <span className="text-[13px] font-normal"> /mo</span>
      </p>
      <p className="mt-2 text-[12px] leading-[1.4] light:text-slate-600">{plan.detail[billing]}</p>

      <div className="mt-4 flex flex-col gap-[3px] rounded-[11px] border border-[#35558C] bg-[#182E5A]/[0.53] px-3.5 py-2.5 leading-[1.4] light:border-[#C9D8FF] light:bg-[#EEF3FF]">
        <span className="text-[22px] font-bold">{plan.allowance}</span>
        <span className="text-[11px]">AI conversations / month{plan.allowanceNote && " ·"}</span>
        {plan.allowanceNote && <span className="text-[12px]">{plan.allowanceNote}</span>}
      </div>

      <a
        href="https://app.lumjha.ai/login"
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-[17px] flex h-[49px] items-center justify-center rounded-full border text-[14px] font-semibold transition ${
          plan.featured
            ? "border-[#5078FF] bg-[#5078FF] text-white shadow-[0_6px_26px_0_rgba(70,110,255,0.27)] hover:bg-[#3E63F2]"
            : "border-[#2C4D74] bg-[#0B172B] hover:border-[#5078FF] light:border-[#C9D8FF] light:bg-white light:text-[#3E63F2] light:hover:border-[#527DFF]"
        }`}
      >
        {plan.cta}
      </a>

      <div className="mt-5 flex flex-col gap-2.5">
        {plan.includes && (
          <p className="text-[11px] font-semibold uppercase leading-[1.4] light:text-slate-500">{plan.includes}</p>
        )}
        <ul className="flex flex-col gap-2.5">
          {plan.features.map((f) => (
            <li key={f.text}>
              <span className="flex gap-2.5">
                <Included />
                <span className={`text-[13.5px] leading-[1.45] ${f.strong ? "font-semibold" : ""}`}>{f.text}</span>
              </span>
              {f.exclusive && (
                <span className="ml-[27px] mt-0.5 inline-block rounded-[4px] bg-[#FFD21B] px-[5px] py-0.5 text-[10px] font-bold leading-[1.4] text-[#182031]">
                  ONLY ON LUMJHA
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* usage note pinned to the card's foot so all four line up */}
      <div className="mt-auto pt-10">
        <div className="h-px bg-[#345071] light:bg-[#D7E3F5]" />
        <p className="mt-3.5 text-[12px] leading-[1.4] light:text-slate-600">{plan.note}</p>
      </div>
    </div>
  );
}

export default function PricingPlans({ className = "" }: { className?: string }) {
  const [billing, setBilling] = useState<Billing>("annual");
  return (
    <div className={className}>
      <BillingSwitch value={billing} onChange={setBilling} />
      <ul className="mx-auto mt-9 grid max-w-[1160px] grid-cols-1 gap-x-[18px] gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {/* no Tilt here — the cards are too tall for the effect to read well */}
        {PLANS.map((p) => (
          <li key={p.name} className="flex">
            <PlanCard plan={p} billing={billing} />
          </li>
        ))}
      </ul>
    </div>
  );
}
