"use client";

import { motion } from "framer-motion";
import { Plug } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CHANNEL_ICON_MAP, type ChannelId } from "@/components/ui/ChannelIcons";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Channels() {
  return (
    <section
      id="channels"
      aria-labelledby="channels-title"
      className="relative py-16 md:py-24"
    >
      <Container className="flex flex-col items-center gap-12">
        <SectionHeader
          eyebrow={site.channels.eyebrow}
          title={
            <span id="channels-title">{site.channels.title}</span>
          }
          description={site.channels.description}
        />

        <p className="-mt-4 text-center font-display text-xl font-semibold tracking-tight text-gradient-brand sm:text-2xl">
          {site.channels.headline}
        </p>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-7"
        >
          {site.channels.list.map((ch) => {
            const Icon = CHANNEL_ICON_MAP[ch.id as ChannelId];
            return (
              <motion.div
                key={ch.id}
                variants={fadeUp}
                className="group relative flex aspect-square flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-stroke/10 bg-bg-3/60 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300/35 hover:bg-bg-3/80"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgb(var(--brand-400)/0.6), transparent)",
                  }}
                />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-brand-300/20 bg-brand-300/10 text-brand-300 transition-colors group-hover:text-brand-200">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="relative flex flex-col gap-0.5">
                  <span className="font-display text-sm font-semibold text-fg-high">
                    {ch.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fg-low">
                    {ch.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex items-center gap-2.5 rounded-full border border-stroke/15 bg-bg-2/60 px-4 py-2 text-xs text-fg-mid backdrop-blur-xl">
          <Plug className="h-3.5 w-3.5 text-brand-300" strokeWidth={1.8} />
          <span>{site.channels.footer}</span>
        </div>
      </Container>
    </section>
  );
}
