import Image from "next/image";
import type { CSSProperties, ReactNode, SVGProps } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  MessengerIcon,
  TelegramIcon,
  WebsiteIcon,
  WhatsAppIcon,
} from "@/components/ui/ChannelIcons";
import { DocIcon, ShieldIcon } from "./EngineFlow";

/* ============================================================
   Integration page diagram (Figma): upload your docs + website →
   the Lumjha core, orbited by every channel → a live chat answer.
   Desktop runs left to right with the orbit on the page's centre
   line; phones + tablets stack the same flow top to bottom.
   Set --orbit-bg to the page colour behind it (default bg-page).
   ============================================================ */

type Glyph = (props: SVGProps<SVGSVGElement>) => ReactNode;

/* ---------- glyphs not in ChannelIcons ---------- */

function CloudUploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M8.6 17.5H6.4a4.4 4.4 0 0 1-.5-8.77 6.4 6.4 0 0 1 12.3.86 4.1 4.1 0 0 1-.6 7.91h-2.2" />
      <path d="M12 21.5v-10M8.7 14.6 12 11.3l3.3 3.3" className="upload-arrow" />
    </svg>
  );
}

function SlackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="#E01E5A" d="M5.04 15.17a2.53 2.53 0 0 1-2.52 2.52A2.53 2.53 0 0 1 0 15.17a2.53 2.53 0 0 1 2.52-2.52h2.52zm1.27 0a2.53 2.53 0 0 1 2.52-2.52 2.53 2.53 0 0 1 2.52 2.52v6.31A2.53 2.53 0 0 1 8.83 24a2.53 2.53 0 0 1-2.52-2.52z" />
      <path fill="#36C5F0" d="M8.83 5.04a2.53 2.53 0 0 1-2.52-2.52A2.53 2.53 0 0 1 8.83 0a2.53 2.53 0 0 1 2.52 2.52v2.52zm0 1.27a2.53 2.53 0 0 1 2.52 2.52 2.53 2.53 0 0 1-2.52 2.52H2.52A2.53 2.53 0 0 1 0 8.83a2.53 2.53 0 0 1 2.52-2.52z" />
      <path fill="#2EB67D" d="M18.96 8.83a2.53 2.53 0 0 1 2.52-2.52A2.53 2.53 0 0 1 24 8.83a2.53 2.53 0 0 1-2.52 2.52h-2.52zm-1.27 0a2.53 2.53 0 0 1-2.52 2.52 2.53 2.53 0 0 1-2.52-2.52V2.52A2.53 2.53 0 0 1 15.17 0a2.53 2.53 0 0 1 2.52 2.52z" />
      <path fill="#ECB22E" d="M15.17 18.96a2.53 2.53 0 0 1 2.52 2.52A2.53 2.53 0 0 1 15.17 24a2.53 2.53 0 0 1-2.52-2.52v-2.52zm0-1.27a2.53 2.53 0 0 1-2.52-2.52 2.53 2.53 0 0 1 2.52-2.52h6.31A2.53 2.53 0 0 1 24 15.17a2.53 2.53 0 0 1-2.52 2.52z" />
    </svg>
  );
}

function ApiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <text x="12" y="13.9" textAnchor="middle" fontSize="5.4" fontWeight="700" fill="currentColor" stroke="none">
        API
      </text>
    </svg>
  );
}

/** Model Context Protocol mark: three interlocking strokes. */
function McpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="m3 11.5 8.2-8.2a2.8 2.8 0 0 1 4 4L9 13.5" />
      <path d="m9.1 13.4 6.2-6.2a2.8 2.8 0 0 1 4 4l-7.5 7.5a1 1 0 0 0 0 1.4l1.5 1.5" />
      <path d="M13.2 5.3 7 11.5a2.8 2.8 0 0 0 4 4l6.2-6.2" />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.4 3.6a1 1 0 0 0-1.36 1.2L5.3 12l-2.26 7.2a1 1 0 0 0 1.36 1.2l16-7.5a1 1 0 0 0 0-1.8zM6.9 13h5.6a1 1 0 0 0 0-2H6.9" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5.5 19.2a6.8 6.8 0 0 1 13 0 9 9 0 0 1-13 0" />
    </svg>
  );
}

/* ---------- the orbit ---------- */

/* Outer ring ~410px on desktop (Figma: 520 of a 1467px-wide diagram). */
const ORBIT_SIZE = "h-[min(300px,74vw)] w-[min(300px,74vw)] lg:h-[340px] lg:w-[340px] xl:h-[410px] xl:w-[410px]";
const TILE_SIZE = "h-8 w-8 lg:h-9 lg:w-9 xl:h-11 xl:w-11";

/** A channel badge: brand-coloured disc with a white glyph, or a glyph on a white disc. */
function Badge({ icon: Icon, className, glyph = "h-[56%] w-[56%]" }: { icon: Glyph; className: string; glyph?: string }) {
  return (
    <span className={`flex h-full w-full items-center justify-center rounded-full shadow-[0_6px_16px_-6px_rgba(15,23,42,0.45)] ${className}`}>
      <Icon className={glyph} />
    </span>
  );
}

/* Badge on the page colour (--orbit-bg), so the ring line stops behind the bare glyph. */
const BARE = "bg-[var(--orbit-bg,var(--site-page))] shadow-none!";

type RingItem = { angle: number; label?: string; badge?: ReactNode };

/* Angles in degrees, clockwise from 3 o'clock — read off the Figma frame. */
const OUTER: RingItem[] = [
  { angle: -93, label: "Website", badge: <Badge icon={WebsiteIcon} className="bg-[#3D8BEB] text-white" /> },
  {
    angle: -47,
    label: "Messenger",
    badge: <Badge icon={MessengerIcon} className="bg-[linear-gradient(45deg,#0099FF,#A033FF_60%,#FF5C87)] text-white" />,
  },
  { angle: -3, label: "Facebook", badge: <Badge icon={FacebookIcon} className="bg-white text-[#1877F2]" glyph="h-[88%] w-[88%]" /> },
  { angle: 25 },
  { angle: 55, label: "Telegram", badge: <Badge icon={TelegramIcon} className="bg-[#2AABEE] text-white" glyph="-ml-[6%] h-[54%] w-[54%]" /> },
  {
    angle: 115,
    label: "Instagram",
    badge: <Badge icon={InstagramIcon} className="bg-[radial-gradient(circle_at_30%_107%,#FDF497_0%,#FD5949_45%,#D6249F_60%,#285AEB_90%)] text-white" />,
  },
  { angle: 158, label: "WhatsApp", badge: <Badge icon={WhatsAppIcon} className="bg-[#25D366] text-white" glyph="h-[54%] w-[54%]" /> },
  { angle: 198 },
  { angle: 215, label: "Slack", badge: <Badge icon={SlackIcon} className="bg-white" glyph="h-[48%] w-[48%]" /> },
];

const INNER: RingItem[] = [
  { angle: -127, label: "API", badge: <Badge icon={ApiIcon} className={`${BARE} text-[#7C5CFF] light:text-[#6D4AFF]`} glyph="h-[92%] w-[92%]" /> },
  { angle: -84 },
  { angle: 68, label: "MCP", badge: <Badge icon={McpIcon} className={`${BARE} text-ink`} glyph="h-[72%] w-[72%]" /> },
  { angle: 109 },
];

const RING_LINE = "border-2 border-[#527DFF]/35 light:border-[#C6D0EC]";

/**
 * A ring that turns slowly while its badges counter-turn, so every logo
 * stays upright. Items sit on the circle by angle (percent positions).
 */
function Ring({ items, duration, reverse, className }: { items: RingItem[]; duration: string; reverse?: boolean; className: string }) {
  const [turn, counter] = reverse ? ["orbit-counter", "orbit-spin"] : ["orbit-spin", "orbit-counter"];
  return (
    <div className={`${turn} absolute rounded-full ${RING_LINE} ${className}`} style={{ "--orbit-dur": duration } as CSSProperties}>
      {items.map(({ angle, label, badge }) => {
        const rad = (angle * Math.PI) / 180;
        const pos = { left: `${(50 + 50 * Math.cos(rad)).toFixed(3)}%`, top: `${(50 + 50 * Math.sin(rad)).toFixed(3)}%` };
        return (
          <span key={angle} style={pos} className="absolute -translate-x-1/2 -translate-y-1/2">
            {badge ? (
              <span className={`${counter} block ${TILE_SIZE}`} title={label}>
                {badge}
              </span>
            ) : (
              <span className="block h-2.5 w-2.5 rounded-full bg-[#7F95D1] ring-2 ring-[var(--orbit-bg,var(--site-page))] xl:h-3.5 xl:w-3.5 light:bg-[#7D8DB5]" />
            )}
          </span>
        );
      })}
    </div>
  );
}

function Orbit() {
  return (
    <div className={`relative z-10 my-6 shrink-0 lg:my-0 ${ORBIT_SIZE}`}>
      <ul className="sr-only">
        {[...OUTER, ...INNER].map((i) => i.label && <li key={i.angle}>{i.label}</li>)}
      </ul>
      {/* soft halo behind the core */}
      <div aria-hidden className="absolute inset-[18%] rounded-full bg-[#527DFF]/25 blur-3xl light:bg-[#527DFF]/10" />
      <Ring items={OUTER} duration="90s" className="inset-0" />
      <Ring items={INNER} duration="70s" reverse className="inset-[12.5%]" />
      {/* the Lumjha core */}
      <div className="absolute inset-[31%] flex items-center justify-center rounded-full bg-white shadow-[0_0_0_6px_rgba(82,125,255,0.12),0_0_60px_-4px_rgba(82,125,255,0.7)] light:shadow-[0_18px_30px_-10px_rgba(15,23,42,0.45)]">
        <Image src="/logo.png" alt="Lumjha AI" width={405} height={564} priority className="h-[52%] w-auto" />
      </div>
    </div>
  );
}

/* ---------- connectors ---------- */

const LINE = "stroke-[#527DFF]/45 light:stroke-[#B9C5E8]";

/** A faint line with a bright pulse travelling along it now and then. */
function FlowPath({ d, gradient }: { d: string; gradient?: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      {gradient ? (
        <>
          <path d={d} stroke={gradient} strokeWidth={7} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
          <path d={d} stroke={gradient} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </>
      ) : (
        <path d={d} className={LINE} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      )}
      <path d={d} stroke="#527DFF" strokeWidth={2.5} vectorEffect="non-scaling-stroke" className="flow-pulse" />
    </g>
  );
}

/** Upload box → orbit: horizontal on desktop, vertical when stacked. */
function FeedLine() {
  return (
    <>
      <svg aria-hidden viewBox="0 0 100 2" preserveAspectRatio="none" className="hidden h-0.5 min-w-10 flex-1 overflow-visible lg:block">
        <FlowPath d="M0 1H100" />
      </svg>
      <svg aria-hidden viewBox="0 0 2 100" preserveAspectRatio="none" className="mt-5 h-10 w-0.5 overflow-visible lg:hidden">
        <FlowPath d="M1 0V100" />
      </svg>
    </>
  );
}

/** Orbit → chat: two glowing curves leave the ring and meet at the widget. */
function Funnel() {
  // the curves leave the ring ±13.5% of its height off-centre (Figma)
  return (
    <>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="-ml-2 hidden h-[340px] min-w-12 flex-1 overflow-visible lg:block xl:h-[410px]">
        <defs>
          <linearGradient id="hero-funnel-x" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8EA4EE" />
            <stop offset="1" stopColor="#5EE0F0" />
          </linearGradient>
        </defs>
        <FlowPath d="M0 36.5C38 37.5 62 50 100 50" gradient="url(#hero-funnel-x)" />
        <FlowPath d="M0 63.5C38 62.5 62 50 100 50" gradient="url(#hero-funnel-x)" />
      </svg>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="-mt-2 h-14 w-[min(300px,74vw)] overflow-visible lg:hidden">
        <defs>
          <linearGradient id="hero-funnel-y" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8EA4EE" />
            <stop offset="1" stopColor="#5EE0F0" />
          </linearGradient>
        </defs>
        <FlowPath d="M36.5 0C37.5 38 50 62 50 100" gradient="url(#hero-funnel-y)" />
        <FlowPath d="M63.5 0C62.5 38 50 62 50 100" gradient="url(#hero-funnel-y)" />
      </svg>
    </>
  );
}

/* ---------- sources + chat ---------- */

/**
 * Upload box with the two sources: beside it when stacked, hanging below it on
 * desktop. Each source flies into the box in turn (--fly-x/--fly-y = distance
 * from its centre to the box's) and the box glows as it lands.
 */
function Sources() {
  const source = "upload-fly h-9 w-9 shrink-0 text-ink lg:absolute lg:left-1/2 lg:h-[34px] lg:w-[34px] lg:-translate-x-1/2 lg:[--fly-x:0px] xl:h-10 xl:w-10";
  return (
    <div className="relative flex shrink-0 items-center gap-6 lg:block">
      <DocIcon
        className={`${source} [--fly-x:126px] lg:top-[calc(100%+44px)] lg:[--fly-y:-123px] xl:top-[calc(100%+57px)] xl:[--fly-y:-155px]`}
        strokeWidth={1.3}
      />
      <div className="upload-receive relative z-10 flex h-[112px] w-[168px] items-center justify-center rounded-2xl border-[3px] border-[#527DFF]/40 bg-surface/80 backdrop-blur-sm lg:h-[124px] lg:w-[190px] xl:h-[156px] xl:w-[240px] light:border-[#B9C6E8] light:bg-[#EEF2FB]">
        <CloudUploadIcon className="h-[62%] w-auto text-ink" />
        <span className="sr-only">Upload your documents and website</span>
      </div>
      {/* follows the document in, a second behind */}
      <WebsiteIcon
        className={`${source} [--fly-delay:1s] [--fly-x:-126px] lg:top-[calc(100%+118px)] lg:[--fly-y:-197px] xl:top-[calc(100%+150px)] xl:[--fly-y:-248px]`}
        strokeWidth={1.3}
      />
    </div>
  );
}

const SOURCE_CHIPS: { label: string; icon: Glyph; color: string }[] = [
  { label: "Website", icon: WebsiteIcon, color: "text-[#3D8BEB]" },
  { label: "Policy doc", icon: DocIcon, color: "text-[#7C5CFF]" },
  { label: "Policies", icon: ShieldIcon, color: "text-[#22A060]" },
];

function ChatAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF] ring-1 ring-[#527DFF]/20">
      <Image src="/logo.png" alt="" width={405} height={564} className="h-4 w-auto" />
    </span>
  );
}

const BUBBLE = "rounded-xl bg-white/[0.07] px-3 py-2 light:bg-[#EDF1F8]";

/** The widget mid-answer, citing where the answer came from. */
function ChatWidget() {
  return (
    <div className="relative z-10 w-full max-w-[320px] shrink-0 rounded-2xl border-2 border-[#527DFF]/30 bg-surface/85 p-3 text-left shadow-[0_24px_60px_-28px_rgba(82,125,255,0.6)] backdrop-blur lg:w-[244px] xl:w-[284px] light:border-[#D9E1F2] light:bg-[#F8FAFD] light:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.35)]">
      <div className="flex items-center gap-2 border-b border-line pb-2.5">
        <ChatAvatar />
        <p className="text-[12px] font-semibold text-ink">Lumjha AI</p>
        <p className="flex items-center gap-1 text-[9.5px] font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Online
        </p>
        <span aria-hidden className="ml-auto pr-1 text-[13px] font-bold leading-none tracking-[0.1em] text-subtle">
          ···
        </span>
      </div>

      <div className="flex min-h-[150px] flex-col gap-3 pt-3 lg:min-h-[208px] text-[11px] leading-relaxed text-ink xl:min-h-[232px] xl:text-[11.5px]">
        <div className="flex items-center justify-end gap-2">
          <p className={BUBBLE}>What is your return policy?</p>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF] text-[#3E63F2] ring-1 ring-[#527DFF]/30">
            <UserIcon className="h-5 w-5" />
          </span>
        </div>
        <div className="flex items-start gap-2">
          <ChatAvatar />
          <div className="min-w-0">
            <p className={BUBBLE}>
              You can return products within 30 days of purchase. Items must be unused and in
              original condition.
            </p>
            <ul className="mt-2 flex flex-wrap gap-1">
              {SOURCE_CHIPS.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-1 rounded-full border border-line bg-white/[0.04] px-1.5 py-0.5 text-[8.5px] text-muted light:border-[#E1E7F2] light:bg-white"
                >
                  <c.icon className={`h-3 w-3 ${c.color}`} />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center rounded-full border border-line py-1 pl-3.5 pr-1 light:border-[#DCE3F0] light:bg-white">
        <span className="flex-1 text-[10.5px] text-subtle">Ask anything...</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2F6BFF] text-white">
          <SendIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

export default function HeroOrbit({ className = "" }: { className?: string }) {
  return (
    // equal side columns keep the orbit on the page's centre line (under the CTAs)
    <div className={`mx-auto flex w-full max-w-[1200px] flex-col items-center lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:pb-14 xl:pb-[76px] ${className}`}>
      <div className="flex flex-col items-center lg:flex-row">
        <Sources />
        <FeedLine />
      </div>
      <Orbit />
      <div className="flex w-full flex-col items-center lg:flex-row">
        <Funnel />
        <ChatWidget />
      </div>
    </div>
  );
}
