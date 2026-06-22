"use client";

import type { ComponentType, SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import {
  WebsiteIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  GoogleCalendarIcon,
  ShopifyIcon,
} from "@/components/ui/ChannelIcons";

type Channel = {
  name: string;
  color: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const CHANNELS: Channel[] = [
  { name: "Website", color: "var(--color-accent)", Icon: WebsiteIcon },
  { name: "WhatsApp", color: "#25D366", Icon: WhatsAppIcon },
  { name: "Instagram", color: "#E1306C", Icon: InstagramIcon },
  { name: "Facebook", color: "#1877F2", Icon: FacebookIcon },
  { name: "Telegram", color: "#229ED9", Icon: TelegramIcon },
  { name: "Google Calendar", color: "#4285F4", Icon: GoogleCalendarIcon },
  { name: "Shopify", color: "#95BF47", Icon: ShopifyIcon },
];

const REELS = 6;
const DURATIONS = [16, 23, 14, 20, 26, 18];

function rotate<T>(arr: T[], by: number): T[] {
  const n = arr.length;
  const k = ((by % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function ChannelTile({ channel }: { channel: Channel }) {
  const { Icon, color, name } = channel;
  return (
    <div className="flex h-24 items-center justify-center px-1 md:h-32">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] shadow-[0_12px_36px_rgba(0,0,0,0.4)] md:h-24 md:w-24"
        title={name}
      >
        <Icon style={{ color }} className="h-8 w-8 md:h-12 md:w-12" aria-hidden />
      </div>
    </div>
  );
}

function SlotReel({
  order,
  duration,
  direction,
  reduced,
}: {
  order: Channel[];
  duration: number;
  direction: "up" | "down";
  reduced: boolean | null;
}) {
  // Duplicate the list so a -50% / +50% shift loops seamlessly.
  const items = [...order, ...order];
  const anim =
    direction === "up" ? { y: ["0%", "-50%"] } : { y: ["-50%", "0%"] };

  return (
    <div className="relative h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_85%,transparent)] md:h-[460px]">
      <motion.div
        className="flex flex-col"
        animate={reduced ? undefined : anim}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {items.map((c, i) => (
          <ChannelTile key={`${c.name}-${i}`} channel={c} />
        ))}
      </motion.div>
    </div>
  );
}

export default function OmniChannel({ id }: { id?: string }) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className="a1-section a1-elevated overflow-hidden py-24 md:py-32"
    >
      {/* Description on top */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Omnichannel</Eyebrow>
        <h2 className="mt-3 font-display text-display-lg text-[var(--color-text-primary)]">
          Meet your customers wherever they already are.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-[var(--color-text-secondary)]">
          One agent, one knowledge base, every channel. Roll Lumjha out on your
          website, your socials, and your messaging apps — no separate bots, no
          duplicated content.
        </p>
      </div>

      {/* Slot-machine reels below */}
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-6 gap-1.5 px-6 md:gap-4">
        {Array.from({ length: REELS }).map((_, i) => (
          <SlotReel
            key={i}
            order={rotate(CHANNELS, i * 2 + (i % 3))}
            duration={DURATIONS[i]}
            direction={i % 2 === 0 ? "up" : "down"}
            reduced={reduced}
          />
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl px-6 text-center font-body text-body-sm text-[var(--color-text-muted)]">
        Plus custom integrations via webhooks and REST API.
      </p>
    </section>
  );
}
