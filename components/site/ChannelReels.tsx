import type { ComponentType, SVGProps } from "react";
import {
  WebsiteIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  GoogleCalendarIcon,
  ShopifyIcon,
} from "@/components/ui/ChannelIcons";

/* ---------- channel logos (same set as previous landing page) ---------- */

export const CHANNELS: {
  name: string;
  bg: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
    { name: "Website", bg: "#2E9BF0", Icon: WebsiteIcon },
    { name: "WhatsApp", bg: "#25D366", Icon: WhatsAppIcon },
    { name: "Instagram", bg: "#E1306C", Icon: InstagramIcon },
    { name: "Facebook", bg: "#1877F2", Icon: FacebookIcon },
    { name: "Telegram", bg: "#229ED9", Icon: TelegramIcon },
    { name: "Google Calendar", bg: "#4285F4", Icon: GoogleCalendarIcon },
    { name: "Shopify", bg: "#95BF47", Icon: ShopifyIcon },
  ];

type Channel = (typeof CHANNELS)[number];

/* Vertical "slot machine" reels, as on the previous landing page — rebuilt
   with plain CSS keyframes (no animation library). Each reel shows the
   channels in a different order, speed and direction; edge reels are dimmed
   so focus lands in the middle. */
const REEL_DURATIONS = [16, 23, 14, 20, 26, 18];
const REEL_OPACITY = [0.3, 0.6, 1, 1, 0.6, 0.3];
// odd counts have a single bright centre reel
const REEL_OPACITY_5 = [0.3, 0.6, 1, 0.6, 0.3];

function rotate<T>(arr: readonly T[], by: number): T[] {
  const k = ((by % arr.length) + arr.length) % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function ChannelTile({ channel }: { channel: Channel }) {
  const { Icon, bg } = channel;
  return (
    <div className="flex h-20 items-center justify-center sm:h-24 md:h-32">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface shadow-[0_12px_36px_rgba(0,0,0,0.2)] sm:h-16 sm:w-16 sm:rounded-2xl md:h-24 md:w-24">
        <Icon style={{ color: bg }} className="h-5 w-5 sm:h-8 sm:w-8 md:h-12 md:w-12" aria-hidden />
      </div>
    </div>
  );
}

function ChannelReel({ index, opacity, height }: { index: number; opacity: number; height: string }) {
  const order = rotate(CHANNELS, index * 2 + (index % 3));
  // Two copies so shifting by -50% loops seamlessly.
  const items = [...order, ...order];
  return (
    <div
      style={{ opacity }}
      className={`relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)] ${height}`}
    >
      <div
        className={`flex flex-col will-change-transform ${index % 2 === 0 ? "reel-up" : "reel-down"}`}
        style={{ animationDuration: `${REEL_DURATIONS[index]}s` }}
      >
        {items.map((c, i) => (
          <ChannelTile key={`${c.name}-${i}`} channel={c} />
        ))}
      </div>
    </div>
  );
}

/** Grid of reels. Home uses six; the Integration page's side panel uses five. */
export default function ChannelReels({
  count = 6,
  className = "",
  height = "h-[320px] sm:h-[380px] md:h-[460px]",
}: {
  count?: 5 | 6;
  className?: string;
  height?: string;
}) {
  const opacity = count === 5 ? REEL_OPACITY_5 : REEL_OPACITY;
  return (
    <div
      aria-hidden
      className={`grid gap-1.5 sm:gap-3 md:gap-4 ${count === 5 ? "grid-cols-5" : "grid-cols-6"} ${className}`}
    >
      {opacity.map((o, i) => (
        <ChannelReel key={i} index={i} opacity={o} height={height} />
      ))}
    </div>
  );
}
