import type { ComponentType, SVGProps } from "react";
import {
  MessageCircleHeart,
  RefreshCw,
  DollarSign,
  CalendarCheck,
  Eye,
  ShieldCheck,
} from "lucide-react";
import SectionHeader from "@/components/another-one/ui/SectionHeader";
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
    icon: MessageCircleHeart,
    title: "Always the Right Answer",
    body: "Your customers get accurate, helpful responses drawn from your own content — not guesswork or generic replies.",
    color: "#5EEAD4",
    span: "md:col-span-2",
    tint: true,
  },
  {
    icon: RefreshCw,
    title: "Remembers Every Conversation",
    body: "Customers never have to repeat themselves. Lumjha picks up right where they left off.",
    color: "#818CF8",
    span: "md:col-span-1",
  },
  {
    icon: DollarSign,
    title: "Turns Browsers into Buyers",
    body: "Collects contact details naturally during the chat — no pushy forms, just genuine conversation that converts.",
    color: "#5EEAD4",
    span: "md:col-span-1",
  },
  {
    icon: CalendarCheck,
    title: "Books Appointments for You",
    body: "Customers schedule directly into your calendar while chatting. No back-and-forth emails, no double bookings.",
    color: "#FCD34D",
    span: "md:col-span-2",
    tint: true,
  },
  {
    icon: Eye,
    title: "Shows You What Customers Want",
    body: "See exactly what your customers are asking, what's trending, and where conversations are turning into sales.",
    color: "#818CF8",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Says Exactly What You Mean",
    body: "Every response is checked word-for-word against your documents. Your brand, your voice — every single time.",
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

export default function ValuePillars({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="What You Get"
          title={
            <>
              Every enquiry becomes an{" "}
              <span className="text-[var(--color-accent)]">opportunity</span>.
            </>
          }
          body="Lumjha gives every customer the right answer at the right time — and quietly turns those conversations into leads, bookings, and revenue."
        />

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
