"use client";

import type { ComponentType, SVGProps } from "react";
import { TrendingUp, MessageCircle, Smile, Flame } from "lucide-react";
import SectionHeader from "@/components/another-one/ui/SectionHeader";
import AnimatedCounter from "@/components/another-one/ui/AnimatedCounter";
import Reveal from "@/components/another-one/ui/Reveal";

type Stat = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  bars: number[];
};

const STATS: Stat[] = [
  {
    icon: TrendingUp,
    prefix: "+",
    value: 28,
    suffix: "%",
    label: "More interest today",
    color: "#5EEAD4",
    bars: [30, 45, 40, 60, 55, 80, 95],
  },
  {
    icon: MessageCircle,
    value: 142,
    label: "Topics customers asked about",
    color: "#818CF8",
    bars: [50, 35, 60, 45, 70, 65, 90],
  },
  {
    icon: Smile,
    value: 100,
    suffix: "%",
    label: "Happy customer interactions",
    color: "#34D399",
    bars: [40, 55, 50, 65, 75, 70, 88],
  },
  {
    icon: Flame,
    value: 38,
    suffix: " hot",
    label: "Ready-to-buy signals",
    color: "#FCD34D",
    bars: [20, 35, 30, 50, 45, 60, 75],
  },
];

export default function InsightsDashboard({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Business Insights"
          title={
            <>
              Know exactly what your{" "}
              <span className="text-[var(--color-accent)]">
                customers want.
              </span>
            </>
          }
          body="See at a glance what topics are trending, how customers feel, and which conversations are heating up into sales. Use it to improve your content, sharpen your offer, and serve customers better."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, prefix, value, suffix, label, color, bars }, i) => (
            <Reveal
              key={label}
              delay={i * 0.06}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-bright)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color,
                    background: `color-mix(in srgb, ${color} 14%, transparent)`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex h-10 items-end gap-1">
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full transition-all duration-500"
                      style={{
                        height: `${b}%`,
                        background: color,
                        opacity: 0.35 + (i / bars.length) * 0.65,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 font-display text-display-md" style={{ color }}>
                {prefix}
                <AnimatedCounter value={value} suffix={suffix ?? ""} />
              </p>
              <p className="mt-1 font-body text-body-sm text-[var(--color-text-secondary)]">
                {label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
