import type { Metadata } from "next";
import WidgetLoader from "@/components/site/WidgetLoader";
import { AGENT_SUBDOMAIN } from "@/lib/playground";

/**
 * A sample business website with the real Lumjha chat widget installed — the
 * page Lumjha Play frames so visitors see the widget as it sits on a site.
 *
 * `?agent=` picks the agent (a visitor's document agent); without it, the
 * shared demo agent. `?open=1` starts with the chat open. Hosts come from the
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

const SERVICES = [
  { title: "Kitchen & bath remodels", body: "Design, permits and build handled by one team, start to finish." },
  { title: "Home extensions", body: "Add space that feels like it was always part of your home." },
  { title: "Repairs & maintenance", body: "Fast, tidy fixes from tradespeople you’ll want back." },
];

const REVIEWS = [
  { quote: "On time, on budget, and they left the place cleaner than they found it.", name: "Priya S." },
  { quote: "The design team understood exactly what we wanted from the first visit.", name: "Daniel K." },
];

export default async function WebsitePreviewPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requested = typeof params.agent === "string" ? params.agent : "";
  const subdomain = AGENT_SUBDOMAIN.test(requested) ? requested : DEMO_AGENT;
  const open = params.open === "1";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 antialiased">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <span className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white">
              N
            </span>
            Northwind Homes
          </span>
          <nav className="hidden gap-6 text-sm text-slate-600 sm:flex" aria-label="Sample site">
            <span>Services</span>
            <span>Projects</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
          <span className="rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white">Get a quote</span>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Renovations · Since 2009</p>
            <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[40px]">
              Homes renovated with care, from first sketch to final coat.
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
              Kitchens, bathrooms and extensions across the city. Questions about pricing, timelines or
              permits? Ask our assistant any time — it’s in the corner of this page.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white">Book a consultation</span>
              <span className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800">See our work</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="text-xl font-bold text-slate-900">What we do</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-xl border border-slate-200 p-5">
                <div className="h-24 rounded-lg bg-gradient-to-br from-slate-100 to-emerald-100" aria-hidden />
                <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-5xl gap-4 px-5 py-12 sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <blockquote className="text-sm leading-relaxed text-slate-700">“{r.quote}”</blockquote>
                <figcaption className="mt-3 text-xs font-semibold text-slate-500">— {r.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-5 py-8 text-xs text-slate-500">
          © Northwind Homes · A sample website for Lumjha Play
        </div>
      </footer>

      <WidgetLoader subdomain={subdomain} appHost={APP_HOST} apiHost={API_HOST} chatApiHost={CHAT_API_HOST} open={open} />
    </div>
  );
}
