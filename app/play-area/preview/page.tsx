import type { Metadata } from "next";
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

const NAV = ["Services", "Projects", "About", "Contact"];

const SERVICES = [
  { title: "Kitchens", body: "Layouts that work the way you cook, with custom cabinetry." },
  { title: "Bathrooms", body: "Walk-in showers, heated floors and lasting tile work." },
  { title: "Additions", body: "More room, designed to match the home you already love." },
];

/** Kitchen elevation as a fine gray line drawing, in place of a project photo. */
function KitchenDrawing() {
  return (
    <svg
      viewBox="0 0 520 400"
      className="h-full w-full"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="1.25"
      role="img"
      aria-label="Line drawing of a Northwind kitchen"
    >
      {/* upper cabinets */}
      <rect x="30" y="40" width="240" height="96" />
      <path d="M90 40v96M150 40v96M210 40v96M80 116v10M100 116v10M200 116v10M220 116v10" />
      {/* window */}
      <rect x="310" y="40" width="160" height="128" />
      <path d="M390 40v128M310 104h160" />
      {/* backsplash, counter, lower cabinets */}
      <path d="M0 230h520M0 244h520" />
      <rect x="0" y="244" width="520" height="100" />
      <path d="M86 244v100M172 244v100M258 244v100M344 244v100M430 244v100M60 262h12M146 262h12M232 262h12M318 262h12M404 262h12M490 262h12" />
      {/* faucet + plant */}
      <path d="M390 230v-24a10 10 0 0 1 20 0v4" />
      <path d="M444 230v-18h18v18M453 212c-8-12-6-22 0-28 6 6 8 16 0 28" />
      {/* island */}
      <path d="M120 290h300M132 290v84h276v-84M201 290v84M270 290v84M339 290v84" />
      {/* pendants */}
      <path d="M210 0v200M330 0v200M192 220a18 18 0 0 1 36 0zM312 220a18 18 0 0 1 36 0z" />
      {/* stools + floor */}
      <path d="M164 374h40M336 374h40M172 374v26M196 374v26M344 374v26M368 374v26M0 374h120M420 374h100" />
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
          <span className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#111827]">Northwind</span>
          <nav className="hidden gap-9 text-[13px] lg:flex" aria-label="Sample site">
            {NAV.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <span className="border border-[#D1D5DB] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.15em] text-[#374151]">
            Enquire
          </span>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-8 py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9CA3AF]">Design-build renovation · Portland</p>
            <h1 className="mt-6 text-[38px] font-light leading-[1.15] tracking-tight text-[#111827] sm:text-[48px]">
              Kitchens, baths and additions, built to last.
            </h1>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed">
              We design, permit and build home renovations from start to finish, with one project manager, a
              fixed-price quote and a 10-year warranty on our work.
            </p>
            <div className="mt-10 flex items-center gap-8 text-[12px] font-medium uppercase tracking-[0.15em]">
              <span className="border border-[#D1D5DB] px-5 py-3 text-[#374151]">Book a consultation</span>
              <span className="border-b border-[#D1D5DB] pb-1 text-[#6B7280]">View projects</span>
            </div>
          </div>

          <div className="hidden aspect-[52/40] border border-[#E5E7EB] p-6 lg:block">
            <KitchenDrawing />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 pb-16">
          <div className="grid gap-10 border-t border-[#E5E7EB] pt-10 sm:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={s.title}>
                <span className="text-[11px] tracking-[0.2em] text-[#9CA3AF]">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-[17px] font-normal text-[#111827]">{s.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-6xl px-8 py-6 text-[11px] tracking-[0.1em] text-[#9CA3AF]">
          © Northwind Homes · A sample website for Lumjha Play, not a real company.
        </div>
      </footer>

      {widget}
    </div>
  );
}
