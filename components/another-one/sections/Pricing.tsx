import type { ComponentType, SVGProps } from "react";
import { Zap, Star, Crown, Sparkles, Check } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import Reveal from "@/components/another-one/ui/Reveal";

const LOGIN_URL = "https://app.lumjha.ai/login";

type Plan = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  price: string;
  per?: string;
  audience: string;
  features: string[];
  cta: string;
  color: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    icon: Zap,
    name: "Free",
    price: "$0",
    per: "/forever",
    audience: "Testing & demos",
    features: [
      "1 chatbot",
      "1 channel",
      "50 replies / month",
      "1 document",
      "Lead capture & pipeline",
      "Basic analytics",
    ],
    cta: "Start free",
    color: "#5EEAD4",
  },
  {
    icon: Star,
    name: "Gold",
    price: "$49",
    per: "/mo",
    audience: "SMBs & consultants",
    features: [
      "1 chatbot",
      "3 channels",
      "2,000 replies / month",
      "15 documents",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get started",
    color: "#FCD34D",
    popular: true,
  },
  {
    icon: Crown,
    name: "Platinum",
    price: "$89",
    per: "/mo",
    audience: "Agencies & multi-location",
    features: [
      "3 chatbots",
      "5 channels",
      "5,000 replies / month",
      "25 documents",
      "Add-ons across all agents",
      "Priority support",
    ],
    cta: "Get started",
    color: "#818CF8",
  },
  {
    icon: Sparkles,
    name: "Custom",
    price: "Let's talk",
    audience: "Enterprise & regulated",
    features: [
      "Custom chatbots",
      "Unlimited channels",
      "Custom replies & documents",
      "Add-on modules included",
      "Dedicated support + SLA",
    ],
    cta: "Talk to sales",
    color: "#94A3B8",
  },
];

const ADDONS = [
  { name: "Site Search", price: "+$15/mo", note: "" },
  { name: "Policy Vault", price: "+$15/mo", note: "" },
  { name: "Bundle (both)", price: "+$25/mo", note: "save $5/mo" },
];

function PlanCard({ plan }: { plan: Plan }) {
  const { icon: Icon, name, price, per, audience, features, cta, color, popular } =
    plan;
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border bg-[var(--color-bg-2)] p-6 transition-all duration-300 hover:-translate-y-1.5 ${
        popular ? "lg:scale-[1.04]" : ""
      }`}
      style={{
        borderColor: popular ? color : "var(--color-border)",
        boxShadow: popular
          ? `0 0 0 1px ${color}, 0 30px 80px -40px ${color}`
          : undefined,
      }}
    >
      {popular && (
        <span
          className="absolute -top-3 right-6 rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-[var(--color-text-inverse)]"
          style={{ background: color }}
        >
          Popular
        </span>
      )}

      <div className="flex items-center gap-2" style={{ color }}>
        <Icon className="h-5 w-5" aria-hidden />
        <span className="font-display text-body-lg font-semibold text-[var(--color-text-primary)]">
          {name}
        </span>
      </div>

      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-display-md text-[var(--color-text-primary)]">
          {price}
        </span>
        {per && (
          <span className="mb-1 font-body text-body-sm text-[var(--color-text-secondary)]">
            {per}
          </span>
        )}
      </div>

      <span className="mt-3 inline-flex w-fit rounded-md border border-[var(--color-border)] bg-[var(--color-bg-3)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-text-secondary)]">
        {audience}
      </span>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 font-body text-body-sm text-[var(--color-text-secondary)]"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color }}
              aria-hidden
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={LOGIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 font-body font-semibold text-body-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2"
        style={
          popular
            ? { background: color, color: "var(--color-text-inverse)" }
            : {
                border: "1px solid var(--color-border-bright)",
                color: "var(--color-text-primary)",
              }
        }
      >
        {cta}
      </a>
    </div>
  );
}

export default function Pricing({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-3 font-display text-display-lg text-[var(--color-text-primary)]">
          Start <span className="text-[var(--color-accent)]">free</span>. Scale
          without complexity.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-body-lg text-[var(--color-text-secondary)]">
          Every account starts with a 14-day trial of all three modules —
          Chatbot, Site Search, and Policy Vault — no credit card required.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="h-full">
            <PlanCard plan={p} />
          </Reveal>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <p className="mb-4 font-mono text-caption uppercase tracking-widest text-[var(--color-text-muted)]">
          Add-on modules · any paid plan
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ADDONS.map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] px-5 py-4 transition-colors hover:border-[var(--color-border-bright)]"
            >
              <div>
                <p className="font-body font-semibold text-body-md text-[var(--color-text-primary)]">
                  {a.name}
                </p>
                {a.note && (
                  <p className="font-mono text-[11px] text-[var(--color-accent)]">
                    {a.note}
                  </p>
                )}
              </div>
              <span className="font-display text-body-lg text-[var(--color-text-primary)]">
                {a.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 text-center font-body text-body-sm text-[var(--color-text-muted)]">
        Every plan includes SSL security, GDPR-ready data handling, your data
        never deleted, and cancel-anytime billing.
      </p>
    </section>
  );
}
