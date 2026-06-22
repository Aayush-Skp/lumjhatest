import type { ComponentType, SVGProps } from "react";
import {
  Target,
  MessagesSquare,
  TrendingUp,
  CalendarCheck,
  BarChart3,
  BadgeCheck,
} from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import Reveal from "@/components/another-one/ui/Reveal";

type Pillar = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  color: string;
  span: string;
  tint?: boolean;
};

const PILLARS: Pillar[] = [
  {
    icon: Target,
    title: "Accurate AI Responses",
    body: "Precise answers generated from your uploaded documents and website — never generic.",
    color: "#5EEAD4",
    span: "md:col-span-2",
    tint: true,
  },
  {
    icon: MessagesSquare,
    title: "Conversation Continuity",
    body: "Sessions persist, context carries, every reply remembers the last.",
    color: "#818CF8",
    span: "md:col-span-1",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation & Conversion",
    body: "Structured lead capture baked into the chat — turn conversations into pipeline.",
    color: "#5EEAD4",
    span: "md:col-span-1",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    body: "The agent checks availability and books straight into your Google Calendar.",
    color: "#FCD34D",
    span: "md:col-span-2",
    tint: true,
  },
  {
    icon: BarChart3,
    title: "Performance Insights",
    body: "Track usage, message counts, lead status, sentiment and intent — all on the dashboard.",
    color: "#818CF8",
    span: "md:col-span-2",
  },
  {
    icon: BadgeCheck,
    title: "Verbatim Verification",
    body: "With Policy Vault, every quoted phrase is checked word-for-word against the source; unverified answers are flagged.",
    color: "#34D399",
    span: "md:col-span-1",
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { icon: Icon, title, body, color, tint } = pillar;
  return (
    <div
      className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-bright)]"
      style={
        tint
          ? { background: `color-mix(in srgb, ${color} 7%, var(--color-bg-2))` }
          : undefined
      }
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: color }}
      />
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
        style={{
          borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
          background: `color-mix(in srgb, ${color} 14%, transparent)`,
          color,
        }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="relative mt-5 font-display text-display-md text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="relative mt-2 max-w-md font-body text-body-md text-[var(--color-text-secondary)]">
        {body}
      </p>
    </div>
  );
}

export default function Features({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>Core Pillars</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-display-lg text-[var(--color-text-primary)]">
          Everything a modern AI agent should already do.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className={p.span}>
              <PillarCard pillar={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
