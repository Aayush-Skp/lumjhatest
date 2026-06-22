import type { ComponentType, SVGProps } from "react";
import { Lock, KeyRound, ShieldCheck, Database, X, Check } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import Reveal from "@/components/another-one/ui/Reveal";

type Control = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const CONTROLS: Control[] = [
  {
    icon: KeyRound,
    title: "Access Control",
    body: "Authenticated access on every protected route; role-based separation of users and admins.",
  },
  {
    icon: Lock,
    title: "Session Security",
    body: "Secure session tokens for chat; validation on every request.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled AI Behavior",
    body: "Guardrails against unsafe or off-topic output; tool use is scoped and auditable.",
  },
  {
    icon: Database,
    title: "Data Isolation",
    body: "Your knowledge base is yours alone — never shared across workspaces, never blended with another client's data.",
  },
];

const TRANSPARENCY: { text: string; positive?: boolean }[] = [
  { text: "We do NOT access private or restricted website data." },
  { text: "We do NOT use your data outside your workspace." },
  { text: "We do NOT train without your configured consent." },
  { text: "We do NOT expose your data to other clients." },
  {
    text: "We NEVER delete your data — when a plan lapses, access is locked, not erased.",
    positive: true,
  },
];

export default function Security({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>Security</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-display-lg text-[var(--color-text-primary)]">
          Your data, your control — always.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONTROLS.map(({ icon: Icon, title, body }, i) => (
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

        {/* Transparency */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-16">
          <Eyebrow>Transparency</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-display-md text-[var(--color-text-primary)]">
            Transparency, in plain language.
          </h2>

          <ul className="mt-8 flex flex-col gap-2">
            {TRANSPARENCY.map(({ text, positive }) => (
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
