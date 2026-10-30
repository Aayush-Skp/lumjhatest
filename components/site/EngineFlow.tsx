import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
  InstagramIcon,
  MessengerIcon,
  ShopifyIcon,
  TelegramIcon,
  ViberIcon,
  WebsiteIcon,
  WhatsAppIcon,
} from "@/components/ui/ChannelIcons";

/* ============================================================
   One AI engine — your knowledge → one knowledge base → every
   channel, joined by flowing dashed lines (homepage hero). The
   data is shared with the pricing page's "Deploy One AI Engine".
   ============================================================ */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export function DocIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export const SOURCES: { title: string; body: string; icon: Icon }[] = [
  { title: "Your website", body: "Auto-crawl, or manual upload", icon: WebsiteIcon },
  { title: "PDFs & docs", body: "Menus, FAQs, catalogues, manuals", icon: DocIcon },
  { title: "Your policies", body: "Refunds, warranties, HR, coverage", icon: ShieldIcon },
];

export const ENGINE_CAPABILITIES = ["Chatbot", "Site Search", "Policy Vault", "Leads"];

export const DEPLOY_CHANNELS: { name: string; body: string; icon: Icon | "site-search"; color: string }[] = [
  { name: "Website chat", body: "answers · captures · books", icon: WebsiteIcon, color: "#527DFF" },
  { name: "Site Search", body: "instant on-site answers", icon: "site-search", color: "#527DFF" },
  { name: "WhatsApp", body: "answers · captures · books", icon: WhatsAppIcon, color: "#25D366" },
  { name: "Instagram", body: "answers · captures · books", icon: InstagramIcon, color: "#E4405F" },
  { name: "Messenger", body: "answers · captures · books", icon: MessengerIcon, color: "#0084FF" },
  { name: "Telegram", body: "answers · captures · books", icon: TelegramIcon, color: "#229ED9" },
  { name: "Viber", body: "answers · captures · books", icon: ViberIcon, color: "#7360F2" },
  { name: "Shopify", body: "answers · captures · books", icon: ShopifyIcon, color: "#95BF47" },
];

export function ChannelGlyph({ icon, className }: { icon: Icon | "site-search"; className: string }) {
  if (icon === "site-search") return <Image src="/assets/site-search.svg" alt="" width={22} height={22} className={className} />;
  const Glyph = icon;
  return <Glyph className={className} />;
}

/* Vertical centres (in % of the diagram's height) of the three sources and
   the four channel rows; they follow from the fixed heights below. */
const SOURCE_YS = [14.4, 50, 85.6];
const CHANNEL_YS = [11.4, 37.1, 62.9, 88.6];

const TILE =
  "border border-line bg-surface/70 backdrop-blur-md light:border-card-ring light:bg-white/90 light:shadow-[0_12px_30px_-22px_rgba(15,23,42,0.35)]";
const LABEL = "font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-subtle";

/** Curves from each left point to each right point (y in %), drawn edge to edge. */
function Connector({ left, right }: { left: number[]; right: number[] }) {
  const paths = left.flatMap((l) => right.map((r) => `M0 ${l} C55 ${l} 45 ${r} 100 ${r}`));
  return (
    <div aria-hidden className="relative h-full min-w-8 flex-1">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {paths.map((d) => (
          <g key={d} fill="none">
            <path d={d} stroke="#527DFF" strokeOpacity={0.18} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d={d} stroke="#527DFF" strokeOpacity={0.85} strokeWidth={1.5} vectorEffect="non-scaling-stroke" className="dash-flow" />
          </g>
        ))}
      </svg>
      {/* end caps: plain dots (an SVG circle would stretch with the box) */}
      {right.map((y) => (
        <span key={y} style={{ top: `${y}%` }} className="absolute right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#527DFF] shadow-[0_0_8px_#527DFF]" />
      ))}
    </div>
  );
}

function FlowDown() {
  return (
    <svg aria-hidden viewBox="0 0 2 28" className="h-7 w-0.5 overflow-visible">
      <line x1="1" y1="0" x2="1" y2="28" stroke="#527DFF" strokeWidth={1.5} className="dash-flow" />
    </svg>
  );
}

function EngineLogo({ size }: { size: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={`relative flex shrink-0 items-center justify-center ${lg ? "h-24 w-24" : "h-12 w-12"}`}>
      {/* slow orbit around the core */}
      <span aria-hidden className="absolute -inset-[7px] animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-white/45" />
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(11,21,38,0.45)]">
        <Image src="/logo.png" alt="" width={69} height={96} className={lg ? "h-[60px] w-auto" : "h-[30px] w-auto"} />
      </span>
    </span>
  );
}

export default function EngineFlow({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full text-left ${className}`}>
      {/* ---------- desktop: one row, lines flowing left to right ---------- */}
      {/* equal side columns keep the engine on the page's centre line (under the hero CTA) */}
      <div className="mx-auto hidden max-w-[1240px] lg:block">
        <div className="mb-3.5 grid grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_250px_minmax(0,1fr)]">
          <p className={`${LABEL} lg:text-[11.5px]`}>Your knowledge</p>
          <p className={`${LABEL} text-center lg:text-[11.5px]`}>One AI engine</p>
          <p className={`${LABEL} ml-auto w-[352px] lg:text-[11.5px] xl:w-[400px]`}>Every platform</p>
        </div>
        <div className="grid h-[264px] grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_250px_minmax(0,1fr)]">
          <div className="flex min-w-0">
            <ul className="flex w-[300px] shrink-0 flex-col justify-between xl:w-[310px]">
              {SOURCES.map((s) => (
                <li key={s.title} className={`flex h-[76px] items-center gap-3.5 rounded-2xl px-4 ${TILE}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#527DFF]/12 text-[#6E8BFF] light:text-[#3E63F2]">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-ink">{s.title}</span>
                    <span className="block truncate text-[12px] text-subtle">{s.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Connector left={SOURCE_YS} right={[50]} />
          </div>

          <div className="relative flex flex-col items-center justify-center rounded-[24px] bg-[#527DFF] px-4 text-center text-white shadow-[0_30px_70px_-24px_rgba(82,125,255,0.85)]">
            <EngineLogo size="lg" />
            <p className="mt-5 text-[18px] font-bold leading-tight">One knowledge base</p>
            <p className="mt-1 text-[12.5px] text-white/80">Trained once, always in sync</p>
            <ul className="mt-3.5 flex flex-wrap justify-center gap-1.5">
              {ENGINE_CAPABILITIES.map((c) => (
                <li key={c} className="rounded-full bg-white/95 px-2.5 py-0.5 text-[11.5px] font-semibold text-[#3E63F2]">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0">
            <Connector left={[50]} right={CHANNEL_YS} />
            <ul className="grid w-[352px] shrink-0 grid-cols-2 grid-rows-4 gap-2 xl:w-[400px]">
              {DEPLOY_CHANNELS.map((c) => (
                <li key={c.name} className={`flex items-center gap-3 rounded-xl px-3 ${TILE}`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white light:bg-[#F4F6FF]" style={{ color: c.color }}>
                    <ChannelGlyph icon={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="truncate text-[14.5px] font-semibold text-ink">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- phones + tablets: the same flow, top to bottom ---------- */}
      <div className="mx-auto flex max-w-md flex-col items-center lg:hidden">
        <ul className="flex flex-wrap justify-center gap-2">
          {SOURCES.map((s) => (
            <li key={s.title} className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 ${TILE}`}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#527DFF]/12 text-[#6E8BFF] light:text-[#3E63F2]">
                <s.icon className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-semibold text-ink">{s.title}</span>
            </li>
          ))}
        </ul>
        <FlowDown />
        <div className="flex w-full items-center gap-4 rounded-2xl bg-[#527DFF] px-5 py-4 text-white shadow-[0_24px_50px_-24px_rgba(82,125,255,0.85)]">
          <EngineLogo size="sm" />
          <span className="min-w-0 pl-1">
            <span className="block text-[15px] font-bold">One knowledge base</span>
            <span className="block text-[12px] text-white/80">{ENGINE_CAPABILITIES.join(" · ")}</span>
          </span>
        </div>
        <FlowDown />
        <ul className="grid w-full grid-cols-4 gap-2">
          {DEPLOY_CHANNELS.map((c) => (
            <li key={c.name} className={`flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 ${TILE}`}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white light:bg-[#F4F6FF]" style={{ color: c.color }}>
                <ChannelGlyph icon={c.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="w-full truncate text-center text-[10.5px] font-medium text-muted">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
