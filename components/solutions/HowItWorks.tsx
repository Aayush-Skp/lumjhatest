import type { ComponentType, SVGProps } from "react";
import { FolderOpen, BookOpen, Layers, Lightbulb, Rocket } from "lucide-react";
import SectionHeader from "@/components/another-one/ui/SectionHeader";
import Reveal from "@/components/another-one/ui/Reveal";
import StageRail from "@/components/another-one/ui/StageRail";

type Stage = {
  no: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const STAGES: Stage[] = [
  {
    no: "01",
    icon: FolderOpen,
    title: "Share your content",
    body: "Upload your FAQs, brochures, policies, or point us at your website. Whatever helps your customers — add it in.",
  },
  {
    no: "02",
    icon: BookOpen,
    title: "Lumjha reads everything",
    body: "We read through all your content so your agent understands your business inside and out — products, services, policies and all.",
  },
  {
    no: "03",
    icon: Layers,
    title: "Knowledge gets organised",
    body: "Your information is sorted by topic so answers are always pinpoint accurate, no matter what a customer asks.",
  },
  {
    no: "04",
    icon: Lightbulb,
    title: "Your agent truly learns",
    body: "Lumjha grasps the meaning behind your content — not just the words — so it can handle even unexpected questions with confidence.",
  },
  {
    no: "05",
    icon: Rocket,
    title: "Ready to help customers",
    body: "Your agent goes live across every channel. Customers get instant, helpful answers — any time, day or night.",
  },
];

export default function HowItWorks({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Getting Started"
          title={
            <>
              Up and running in{" "}
              <span className="text-[var(--color-accent)]">
                minutes, not months.
              </span>
            </>
          }
          body="No IT team needed. No complex setup. Just share your content and watch your agent come to life."
        />

        <StageRail
          direction="ltr"
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {STAGES.map(({ no, icon: Icon, title, body }, i) => (
            <Reveal
              key={no}
              delay={i * 0.06}
              data-rail-box=""
              className="group relative z-10 flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 font-mono text-[5rem] font-bold leading-none text-[var(--color-accent)] opacity-[0.08] transition-all duration-300 group-hover:opacity-20"
              >
                {no}
              </span>
              <span
                aria-hidden
                className="absolute left-0 top-0 h-1 w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"
              />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border-bright)] bg-[var(--color-bg-3)] text-[var(--color-accent)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="relative mt-4 font-display text-body-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="relative mt-2 font-body text-body-sm text-[var(--color-text-secondary)]">
                {body}
              </p>
            </Reveal>
          ))}
        </StageRail>

        <p className="mt-8 font-body text-body-sm text-[var(--color-text-muted)]">
          Works with your existing documents — PDFs, Word files, spreadsheets, websites, and more.
        </p>
      </div>
    </section>
  );
}
