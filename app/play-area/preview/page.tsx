import type { Metadata } from "next";
import Image from "next/image";
import WidgetLoader from "@/components/site/WidgetLoader";
import { AGENT_SUBDOMAIN, normalizeSiteUrl } from "@/lib/playground";

/**
 * A sample business website with the real Lumjha chat widget installed — the
 * page Lumjha Play frames so visitors see the widget as it sits on a site.
 *
 * `?agent=` picks the agent (a visitor's document agent); without it, the
 * shared demo agent. `?open=1` starts with the chat open. `?site=` shows a
 * visitor's own website (checked frameable by /api/playground/frame-check)
 * full-size instead of the sample, with the widget on top. Hosts come from the
 * server environment only, so the page can never be made to load a script
 * from anywhere else.
 */

export const metadata: Metadata = {
  title: "Website preview",
  robots: { index: false, follow: false },
};

const APP_HOST = (process.env.LUMJHA_APP_HOST || "https://app.lumjha.ai").replace(/\/$/, "");
const API_HOST = (process.env.LUMJHA_API_URL || "https://api.lumjha.ai").replace(/\/$/, "");
const CHAT_API_HOST = (process.env.LUMJHA_CHAT_API_URL || "https://chat-api.lumjha.ai").replace(/\/$/, "");
const DEMO_AGENT = process.env.LUMJHA_PLAY_DEMO_AGENT || "bedrocktest";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const NAV = ["AI Chat Agent", "Site Search", "Lumjha Vault", "Pricing"];

const CHANNELS = ["Website", "WhatsApp", "Instagram", "Messenger", "Telegram", "Slack"];

/** How Lumjha works, as a fine gray line drawing: sources → one knowledge base → channels. */
function FlowDrawing() {
  const sources = [
    { y: 55, label: "Web pages" },
    { y: 165, label: "Documents" },
    { y: 275, label: "Policies" },
  ];
  const outputs = CHANNELS.slice(0, 5).map((label, i) => ({ y: 60 + i * 60, label }));
  return (
    <svg
      viewBox="0 0 520 400"
      className="h-full w-full"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="1.25"
      role="img"
      aria-label="Line drawing: web pages, documents and policies feed one Lumjha AI knowledge base that answers on every channel"
    >
      {/* sources: a page with a folded corner and text lines */}
      {sources.map(({ y, label }) => (
        <g key={label}>
          <path d={`M30 ${y}h62l18 18v52h-80z M92 ${y}v18h18`} />
          <path d={`M42 ${y + 30}h50M42 ${y + 42}h56M42 ${y + 54}h38`} />
          <text x="70" y={y + 88} textAnchor="middle" fontSize="11" fill="#9CA3AF" stroke="none">
            {label}
          </text>
          <path d={`M110 ${y + 35}C160 ${y + 35} 160 200 204 200`} />
        </g>
      ))}

      {/* the one knowledge base */}
      <circle cx="260" cy="200" r="56" stroke="#527DFF" />
      <circle cx="260" cy="200" r="66" stroke="#527DFF" strokeOpacity="0.3" />
      <text x="260" y="196" textAnchor="middle" fontSize="15" fill="#111827" stroke="none">
        Lumjha AI
      </text>
      <text x="260" y="214" textAnchor="middle" fontSize="10" fill="#9CA3AF" stroke="none">
        Knowledge base
      </text>

      {/* channels it answers on */}
      {outputs.map(({ y, label }) => (
        <g key={label}>
          <path d={`M316 200C360 200 360 ${y + 18} 400 ${y + 18}`} />
          <rect x="400" y={y} width="100" height="36" rx="18" />
          <text x="450" y={y + 22} textAnchor="middle" fontSize="11" fill="#6B7280" stroke="none">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default async function WebsitePreviewPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requested = typeof params.agent === "string" ? params.agent : "";
  const subdomain = AGENT_SUBDOMAIN.test(requested) ? requested : DEMO_AGENT;
  const open = params.open === "1";
  const site = normalizeSiteUrl(typeof params.site === "string" ? params.site : null);
  const widget = <WidgetLoader subdomain={subdomain} appHost={APP_HOST} apiHost={API_HOST} chatApiHost={CHAT_API_HOST} open={open} />;

  if (site) {
    return (
      <div className="h-screen bg-white">
        <style>{"html,body{overflow:hidden}"}</style>
        {/* their site scrolls inside its own frame; no top navigation, so it can't take over the page */}
        <iframe
          src={site}
          title="Your website"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          className="block h-full w-full border-0"
        />
        {widget}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#6B7280] antialiased">
      {/* framed at a fixed height: the sample site never scrolls itself, so the
          wheel scrolls the Lumjha Play page around it (the chat panel still scrolls) */}
      <style>{"html,body{overflow:hidden}"}</style>

      <header className="border-b border-[#E5E7EB]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-5">
          <span className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={405} height={564} className="h-7 w-auto" priority />
            <span className="text-[15px] font-semibold tracking-tight text-[#111827]">Lumjha AI</span>
          </span>
          <nav className="hidden gap-9 text-[13px] md:flex" aria-label="Sample site">
            {NAV.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-8 py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9CA3AF]">No-code AI agents</p>
            <h1 className="mt-6 text-[38px] font-light leading-[1.15] tracking-tight text-[#111827] sm:text-[48px]">
              Never miss a customer. Grow while you sleep.
            </h1>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed">
              Lumjha AI learns your website, documents and policies, then answers customer questions, captures
              leads and books appointments around the clock, on the channels they already use.
            </p>
            <div className="mt-10 flex items-center gap-8 text-[12px] font-medium uppercase tracking-[0.15em]">
              <span className="rounded-full bg-[#527DFF] px-6 py-3 text-white">Start free</span>
              <span className="border-b border-[#D1D5DB] pb-1 text-[#6B7280]">See pricing</span>
            </div>
          </div>

          <div className="hidden aspect-[52/40] border border-[#E5E7EB] p-6 lg:block">
            <FlowDrawing />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 pb-16">
          <div className="border-t border-[#E5E7EB] pt-8">
            <p className="text-[14px] text-[#111827]">One knowledge base. Every channel.</p>
          </div>
        </section>
      </main>

      {widget}
    </div>
  );
}
