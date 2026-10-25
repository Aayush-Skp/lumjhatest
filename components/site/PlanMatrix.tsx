/* ============================================================
   "Every feature, every plan" — per-plan comparison table (Figma)
   ============================================================ */

const PLAN_COLUMNS = [
  { name: "Free", price: "$0" },
  { name: "Starter", price: "$41/mo annual" },
  { name: "Growth ★", price: "$83/mo annual", featured: true },
  { name: "Pro", price: "$208/mo annual" },
  { name: "Enterprise", price: "from ~$1,000/mo" },
] as const;

const FEATURED_COL = PLAN_COLUMNS.findIndex((c) => "featured" in c);

/* Cell markers: "✓" = check (optionally followed by detail), "–" = not
   included. `add()` marks a paid add-on (yellow), `inc()` a highlight that
   comes with the plan (green). */
type Cell = string | { text: string; tone: "addon" | "included" };
const add = (text: string): Cell => ({ text, tone: "addon" });
const inc = (text: string): Cell => ({ text, tone: "included" });

type Row = { feature: string; exclusive?: boolean; cells: [Cell, Cell, Cell, Cell, Cell] };

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Usage",
    rows: [
      { feature: "AI conversations / month", cells: ["50", "500", "2,000", "6,000", "Custom (committed)"] },
      { feature: "AI agents / seats", cells: ["1 / 1", "1 / 2", "3 / 5", "10 / 15", "Custom / SSO"] },
      { feature: "Top-up packs (auto, capped)", cells: ["Upgrade prompt", "250 / $25", "500 / $25", "1,000 / $45", "Committed rate"] },
    ],
  },
  {
    title: "Knowledge & setup",
    rows: [
      { feature: "Auto-crawl (web pages)", cells: ["50 pages", "2,000 pages", "Up to 5,000 web pages", "Up to 10,000 web pages", "Custom"] },
      { feature: "Knowledge Documents (uploads)", cells: ["2 (up to 3MB each)", "15 (up to 5MB each)", "35 (up to 5MB each)", "100 (up to 6MB each)", "Custom"] },
      { feature: "Auto re-crawl", cells: ["Manual", "Monthly", "Bi-weekly", "Weekly", "Real-time via API"] },
    ],
  },
  {
    title: "Channels",
    rows: [
      {
        feature: "Channels (website + WhatsApp, Instagram, Messenger, Telegram, Viber*)",
        cells: ["Website + 1 messaging", "All, 1 account each", "All, 3 per channel", "All, 10 per channel", "All + custom/API"],
      },
      { feature: "Human handoff inbox", cells: ["–", "✓", "✓", "✓ + assignment rules", "✓"] },
    ],
  },
  {
    title: "Brand & safety",
    rows: [
      { feature: "Brand kit (logo, colors, voice, tone, messaging)", cells: ["Logo + colors", "Full brand kit", "Full brand kit", "Per-agent / per-location kits", "Full white-label"] },
      { feature: "“Powered by Lumjha” badge", cells: ["Shown", add("Remove +$19"), inc("Removable"), inc("Removable"), inc("White-label")] },
      {
        feature: "Safety moderation",
        cells: ["Baseline (always on)", "+ blocked topics", "+ custom guardrails, escalation rules, PII masking", "+ moderation log", "+ audit export, custom policies"],
      },
    ],
  },
  {
    title: "Leads & bookings",
    rows: [
      { feature: "Lead forms & chat history", cells: ["1 form, last 25 leads", "3 forms, full history, CSV", "Unlimited forms, custom fields", "+ routing by location/agent", "Custom retention"] },
      { feature: "Google Calendar booking", cells: ["–", "✓", "✓", "✓", "✓"] },
      { feature: "CRM, webhooks, Shopify", cells: ["–", "–", "✓", "✓", "✓"] },
    ],
  },
  {
    title: "Insights",
    rows: [
      {
        feature: "Reporting & Insights",
        cells: ["Basic Reporting", "Detailed Reporting & Insights", inc("Advanced Reporting & Insights"), inc("Advanced Reporting & Insights"), inc("Advanced + custom/BI export")],
      },
      {
        feature: "Knowledge-gap analytics",
        cells: ["Basic counts", "Top unanswered questions", "Full gap suggestions + one-click fix, topics, cost-per-lead", "Cross-surface gaps, per-location, scheduled reports", "+ BI export"],
      },
    ],
  },
  {
    title: "Search & vault",
    rows: [
      { feature: "Site Search (same knowledge base)", exclusive: true, cells: ["–", add("+$25/mo"), inc("Included"), inc("Included"), inc("Included")] },
      {
        feature: "PIN-protected Policy Vault",
        exclusive: true,
        cells: ["–", add("+$49/mo"), add("+$49/mo"), inc("Included (multiple vaults, PIN rotation)"), inc("Included + SSO/magic-link, audit log")],
      },
    ],
  },
  {
    title: "Developers",
    rows: [
      { feature: "API (ingestion & export)", cells: ["–", "CSV export only", inc("Standard API"), "Higher limits, bulk export", "Custom limits, SLA"] },
      { feature: "MCP connector", cells: ["–", "Read-only", inc("Full read + write"), "Multi-agent scopes, Vault over MCP", "OAuth/SSO scopes + audit"] },
      { feature: "AI model", cells: ["Efficient default", "Efficient default", "Efficient default", "+ Premium reasoning (3× conversations)", "+ BYO LLM key"] },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "Support", cells: ["Community / email", "Email", "Priority email/chat", "Priority + onboarding call", "Dedicated CSM, SLA"] },
      { feature: "Early access to new features & capabilities", cells: ["–", "–", "✓", "✓", "On request"] },
    ],
  },
];

const GREEN = "text-[#34D399] light:text-[#0E9F6E]";
const YELLOW = "text-[#FFC53D] light:text-[#B7791F]";

export function OnlyOnLumjha() {
  return (
    <span className="inline-block whitespace-nowrap rounded-[4px] bg-[#FFD21B] px-[5px] py-0.5 text-[10px] font-bold leading-[1.4] text-[#182031]">
      ONLY ON LUMJHA
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 shrink-0 ${GREEN}`} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-label="Included">
      <path d="M5 12.5 10 17 19 7" />
    </svg>
  );
}

function MatrixCell({ cell }: { cell: Cell }) {
  if (typeof cell !== "string") {
    return <span className={`font-medium ${cell.tone === "addon" ? YELLOW : GREEN}`}>{cell.text}</span>;
  }
  if (cell === "–") return <span className="text-subtle" aria-label="Not included">–</span>;
  if (cell.startsWith("✓")) {
    const detail = cell.slice(1).trim();
    return (
      <span className="flex items-center gap-1.5">
        <Check />
        {detail && <span>{detail}</span>}
      </span>
    );
  }
  return <span>{cell}</span>;
}

/* growth column tint — carried down every row so it reads as one band */
const featuredBg = "bg-[#13214A] light:bg-[#EEF3FF]";

export default function PlanMatrix({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-[1040px] overflow-x-auto rounded-2xl border border-[#3B5BDB]/70 bg-[#0B1530] shadow-[0_24px_80px_-40px_rgba(82,125,255,0.6)] light:border-[#C9D8FF] light:bg-white">
        <table className="w-full min-w-[860px] border-collapse text-left text-[13px] leading-snug text-ink/90">
          <caption className="sr-only">Features included in each Lumjha plan</caption>
          <thead>
            <tr className="border-b border-[#2A3F6B] light:border-[#E1E8F5]">
              <th scope="col" className="sticky left-0 z-10 w-[150px] bg-[#0B1530] sm:w-[230px] px-4 py-4 align-top text-[13px] font-semibold light:bg-white">
                Feature
              </th>
              {PLAN_COLUMNS.map((c, i) => (
                <th
                  key={c.name}
                  scope="col"
                  className={`px-4 py-4 align-top ${i === FEATURED_COL ? "bg-[#5470FF] text-white" : ""}`}
                >
                  <span className="block text-[13px] font-semibold">{c.name}</span>
                  <span className={`mt-0.5 block text-[10.5px] font-normal ${i === FEATURED_COL ? "text-white/85" : "text-subtle"}`}>{c.price}</span>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map((g) => (
            <tbody key={g.title} className="border-b border-[#2A3F6B] last:border-b-0 light:border-[#E1E8F5]">
              <tr>
                <th
                  scope="colgroup"
                  colSpan={PLAN_COLUMNS.length + 1}
                  className="bg-[#0E1A3A] px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6E8BFF] light:bg-[#F5F8FE] light:text-[#3E63F2]"
                >
                  {g.title}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.feature} className="border-t border-[#1D2E52] light:border-[#EEF2F9]">
                  <th scope="row" className="sticky left-0 z-10 bg-[#0B1530] px-4 py-3 align-top font-normal light:bg-white">
                    {r.feature}
                    {r.exclusive && (
                      <span className="mt-1 block">
                        <OnlyOnLumjha />
                      </span>
                    )}
                  </th>
                  {r.cells.map((cell, i) => (
                    <td key={PLAN_COLUMNS[i].name} className={`px-4 py-3 align-top ${i === FEATURED_COL ? featuredBg : ""}`}>
                      <MatrixCell cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="mx-auto mt-5 flex max-w-[1040px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[12px] text-muted">
        <span className="flex items-center gap-1.5">
          <Check /> included
        </span>
        <span>
          <span className={YELLOW}>+$</span> paid add-on
        </span>
        <span className="flex flex-wrap items-center justify-center gap-2">
          <OnlyOnLumjha />
          no equivalent found in the RAG-chatbot plans we compared (public pricing pages, Oct 2026).
        </span>
      </p>
    </div>
  );
}
