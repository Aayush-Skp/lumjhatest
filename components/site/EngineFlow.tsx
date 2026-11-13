import Image from "next/image";
import EngineGlobe from "./EngineGlobe";
import type { ComponentType, SVGProps } from "react";
import {
  DiscordIcon,
  InstagramIcon,
  MessengerIcon,
  ShopifyIcon,
  SlackIcon,
  TelegramIcon,
  WebsiteIcon,
  WhatsAppIcon,
} from "@/components/ui/ChannelIcons";

/* ============================================================
   One AI engine — your knowledge → one knowledge base → every
   channel, joined by flowing dashed lines (homepage hero).
   ============================================================ */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const MonoSlackIcon = (props: SVGProps<SVGSVGElement>) => <SlackIcon mono {...props} />;

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

export const DEPLOY_CHANNELS: { name: string; body: string; icon: Icon }[] = [
  { name: "Website chat", body: "Chat widget", icon: WebsiteIcon },
  { name: "Discord", body: "Community server", icon: DiscordIcon },
  { name: "WhatsApp", body: "Customer messages", icon: WhatsAppIcon },
  { name: "Instagram", body: "DMs & comments", icon: InstagramIcon },
  { name: "Messenger", body: "Page inbox", icon: MessengerIcon },
  { name: "Telegram", body: "Bots & groups", icon: TelegramIcon },
  { name: "Slack", body: "Team workspace", icon: MonoSlackIcon },
  { name: "Shopify", body: "Store assistant", icon: ShopifyIcon },
];

export function ChannelGlyph({ icon, className }: { icon: Icon; className: string }) {
  const Glyph = icon;
  return <Glyph className={className} />;
}

/* Vertical centres (in % of the diagram's height) of the three sources and
   the four channel rows; they follow from the fixed heights below. */
const SOURCE_YS = [14.4, 50, 85.6];
const CHANNEL_YS = [11.4, 37.1, 62.9, 88.6];

const TILE =
  "border border-line bg-surface/70 backdrop-blur-md light:border-card-ring light:bg-white/90";
/* desktop tiles lift slightly on hover and their icon well brightens */
const TILE_HOVER =
  "group transition-[transform,border-color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#527DFF]/45 motion-reduce:hover:translate-y-0";
const WELL_HOVER = "transition-colors duration-[350ms] ease-out group-hover:bg-[#527DFF]/25";

/* Each connector line flows at its own pace (multiples of FLOW_BASE) so
   the dashes never march in lockstep. */
const FLOW_PACE = [1, 1.17, 0.9, 1.31];
/* seconds per 20px of dash travel: ~12px/s, brisk enough to read as flowing */
const FLOW_BASE = 1.6;
const LABEL = "font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-subtle";

/** Curves from each left point to each right point (y in %), drawn edge to edge. */
function Connector({ left, right }: { left: number[]; right: number[] }) {
  const paths = left.flatMap((l) => right.map((r) => `M0 ${l} C55 ${l} 45 ${r} 100 ${r}`));
  return (
    <div aria-hidden className="relative h-full min-w-8 flex-1">
      {/* lines fade in from the left so they read as leaving the tiles */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ef-fade absolute inset-0 h-full w-full overflow-visible">
        {paths.map((d, i) => (
          <g key={d} fill="none">
            <path d={d} stroke="#527DFF" strokeOpacity={0.28} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              stroke="#527DFF"
              strokeOpacity={0.95}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="ef-flow"
              style={{ animationDuration: `${FLOW_BASE * FLOW_PACE[i % 4]}s` }}
            />
          </g>
        ))}
      </svg>
      {/* end caps: plain dots that pulse a soft ring in turn (an SVG circle would stretch with the box) */}
      {right.map((y, i) => (
        <span
          key={y}
          style={{ top: `${y}%`, animationDelay: `${i * 0.7}s` }}
          className="ef-cap absolute right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#527DFF]"
        />
      ))}
    </div>
  );
}

function FlowDown() {
  return (
    <svg aria-hidden viewBox="0 0 2 28" className="h-7 w-0.5 overflow-visible">
      <line x1="1" y1="0" x2="1" y2="28" stroke="#527DFF" strokeWidth={2} className="ef-flow" style={{ animationDuration: `${FLOW_BASE}s` }} />
    </svg>
  );
}

function EngineLogo({ size }: { size: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={`relative flex shrink-0 items-center justify-center ${lg ? "h-16 w-16" : "h-12 w-12"}`}>
      {/* slow orbit around the core */}
      <span aria-hidden className="absolute -inset-[7px] animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-[#7C9BFF]/50" />
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_0_0_6px_rgb(82_125_255/0.16),0_10px_30px_-6px_rgb(82_125_255/0.7)]">
        <Image src="/logo.png" alt="" width={69} height={96} className={lg ? "h-10 w-auto" : "h-[30px] w-auto"} />
      </span>
    </span>
  );
}

export default function EngineFlow({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full text-left ${className}`}>
      {/* ---------- desktop: one row, lines flowing left to right ---------- */}
      {/* equal side columns keep the engine on the page's centre line (under the hero CTA) */}
      <div className="mx-auto hidden max-w-[1240px] pb-14 lg:block">
        <div className="mb-3.5 grid grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_250px_minmax(0,1fr)]">
          <p className={`${LABEL} lg:text-[11.5px]`}>Your knowledge</p>
          <p className={`${LABEL} text-center lg:text-[11.5px]`}>One AI engine</p>
          <p className={`${LABEL} ml-auto w-[352px] lg:text-[11.5px] xl:w-[400px]`}>Every platform</p>
        </div>
        <div className="grid h-[264px] grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_250px_minmax(0,1fr)]">
          <div className="flex min-w-0">
            <ul className="flex w-[300px] shrink-0 flex-col justify-between xl:w-[310px]">
              {SOURCES.map((s) => (
                <li key={s.title} className={`flex h-[76px] items-center gap-3.5 rounded-2xl px-4 ${TILE} ${TILE_HOVER}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#527DFF]/12 text-[#6E8BFF] light:text-[#3E63F2] ${WELL_HOVER}`}>
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

          {/* the engine: a turning brain-globe (drag to spin), the logo at its centre,
              the modules pinned to its surface and its caption underneath */}
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[264px] w-[264px] -translate-x-1/2 -translate-y-1/2">
              <EngineGlobe size={264} labels={ENGINE_CAPABILITIES.filter((c) => c !== "Leads")} className="absolute inset-0" />
              {/* the logo sits dead centre; a small page-coloured halo quiets the mesh behind it */}
              <div className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center">
                <span aria-hidden className="absolute h-32 w-32 rounded-full bg-[radial-gradient(closest-side,var(--color-page)_55%,transparent)] opacity-90" />
                <EngineLogo size="lg" />
              </div>
              {/* caption under the globe */}
              <p className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
                <span className="block text-[16px] font-bold leading-tight tracking-[-0.01em] text-ink">One knowledge base</span>
                <span className="mt-1 block text-[11.5px] text-subtle">Trained once, always in sync</span>
              </p>
            </div>
          </div>

          <div className="flex min-w-0">
            <Connector left={[50]} right={CHANNEL_YS} />
            <ul className="grid w-[352px] shrink-0 grid-cols-2 grid-rows-4 gap-2 xl:w-[400px]">
              {DEPLOY_CHANNELS.map((c) => (
                <li key={c.name} className={`flex min-w-0 items-center gap-3 rounded-2xl px-3.5 ${TILE} ${TILE_HOVER}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#527DFF]/12 text-[#6E8BFF] light:text-[#3E63F2] ${WELL_HOVER}`}>
                    <ChannelGlyph icon={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14.5px] font-semibold text-ink">{c.name}</span>
                    <span className="block truncate text-[11.5px] text-subtle">{c.body}</span>
                  </span>
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
        {/* the same brain-globe as desktop, sized to the screen (264px max) */}
        <div className="relative my-2 aspect-square w-[min(264px,78vw)]">
          <EngineGlobe labels={ENGINE_CAPABILITIES.filter((c) => c !== "Leads")} className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center">
            <span aria-hidden className="absolute h-28 w-28 rounded-full bg-[radial-gradient(closest-side,var(--color-page)_55%,transparent)] opacity-90" />
            <EngineLogo size="sm" />
          </div>
        </div>
        <p className="text-center">
          <span className="block text-[15px] font-bold leading-tight text-ink">One knowledge base</span>
          <span className="mt-1 block text-[12px] text-subtle">Trained once, always in sync</span>
        </p>
        <FlowDown />
        <ul className="grid w-full grid-cols-4 gap-2">
          {DEPLOY_CHANNELS.map((c) => (
            <li key={c.name} className={`flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 ${TILE}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#527DFF]/12 text-[#6E8BFF] light:text-[#3E63F2]`}>
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
