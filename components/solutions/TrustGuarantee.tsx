import type { ComponentType, SVGProps } from "react";
import { Lock, UserCheck, ShieldCheck, Folder, X, Check } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import SectionHeader from "@/components/another-one/ui/SectionHeader";
import Reveal from "@/components/another-one/ui/Reveal";

type Guarantee = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const GUARANTEES: Guarantee[] = [
  {
    icon: UserCheck,
    title: "Only You Can Access Your Account",
    body: "Your workspace is private. Nobody else — not even our team — can browse your content or your customers' conversations without your permission.",
  },
  {
    icon: Lock,
    title: "Every Conversation is Protected",
    body: "All chat sessions are encrypted and secured end-to-end. Your customers can message with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Your Agent Stays On Topic",
    body: "Lumjha only answers based on what you've shared. It won't go off-script, make things up, or discuss anything outside your business.",
  },
  {
    icon: Folder,
    title: "Your Data Belongs to You — Always",
    body: "Your content is never mixed with another business's data, never sold, and never used to train AI models without your explicit consent.",
  },
];

const COMMITMENTS: { text: string; positive?: boolean }[] = [
  { text: "We never look at your private business content without permission." },
  { text: "We never share your data with other businesses." },
  { text: "We never train AI on your content without your consent." },
  { text: "We never expose your customers' conversations." },
  {
    text: "Your content is never deleted — if you pause, your data is safely preserved.",
    positive: true,
  },
];

export default function TrustGuarantee({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Your Peace of Mind"
          title={
            <>
              Your business. Your data.{" "}
              <span className="text-[var(--color-accent)]">Your rules.</span>
            </>
          }
          body="We take privacy seriously — because your customers' trust is your most valuable asset. Here's exactly what we promise."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GUARANTEES.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 0.06}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-bright)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-body-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="mt-2 font-body text-body-sm text-[var(--color-text-secondary)]">
                {body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-16">
          <Eyebrow>Our Commitments</Eyebrow>
          <h2 className="mt-3 max-w-4xl font-display text-display-md text-[var(--color-text-primary)]">
            Plain language.{" "}
            <span className="text-[var(--color-accent)]">Real promises.</span>
          </h2>

          <ul className="mt-8 flex flex-col gap-2">
            {COMMITMENTS.map(({ text, positive }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-3 transition-colors hover:border-[var(--color-border-bright)]"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: positive
                      ? "color-mix(in srgb, var(--color-success) 18%, transparent)"
                      : "color-mix(in srgb, var(--color-error) 16%, transparent)",
                    color: positive
                      ? "var(--color-success)"
                      : "var(--color-error)",
                  }}
                >
                  {positive ? <Check size={14} /> : <X size={14} />}
                </span>
                <span className="font-body text-body-md text-[var(--color-text-secondary)]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
