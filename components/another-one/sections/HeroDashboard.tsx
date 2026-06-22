"use client";

import type { ComponentType, SVGProps } from "react";
import {
  Bot,
  LayoutGrid,
  Database,
  Cable,
  FileText,
  Code2,
  Settings,
  BarChart3,
  MessageSquare,
  Search,
  Users,
  UserPlus,
  Percent,
  ArrowUpRight,
  Calendar,
  RefreshCw,
} from "lucide-react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const TABS: { label: string; icon: Icon; active?: boolean }[] = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Knowledge Base", icon: Database },
  { label: "Integrations", icon: Cable },
  { label: "Forms", icon: FileText },
  { label: "Embed", icon: Code2 },
  { label: "Settings", icon: Settings },
  { label: "Analytics", icon: BarChart3, active: true },
];

const STATS: {
  icon: Icon;
  label: string;
  value: string;
  sub: string;
  trend: string;
  color: string;
}[] = [
  { icon: MessageSquare, label: "Total Messages", value: "1,248", sub: "+312 this week", trend: "100%", color: "var(--color-accent)" },
  { icon: Users, label: "Active Users", value: "486", sub: "+58 this week", trend: "12%", color: "var(--color-indigo)" },
  { icon: UserPlus, label: "Leads Collected", value: "38", sub: "+9 this week", trend: "24%", color: "var(--color-amber)" },
  { icon: Percent, label: "Conversion Rate", value: "7.8%", sub: "38 of 486 sessions", trend: "3%", color: "var(--color-success)" },
];

// Activity — this week vs prior (heights are % of the chart area).
const ACTIVITY: { group: string; prior: number; current: number }[] = [
  { group: "Messages", prior: 58, current: 92 },
  { group: "Users", prior: 40, current: 66 },
  { group: "Leads", prior: 22, current: 40 },
];

const TRAFFIC: { name: string; pct: number; color: string }[] = [
  { name: "Web", pct: 64, color: "var(--color-accent)" },
  { name: "WhatsApp", pct: 22, color: "var(--color-indigo)" },
  { name: "Instagram", pct: 14, color: "var(--color-amber)" },
];

// Site Search analytics.
const SEARCH_STATS: { label: string; value: string; color: string }[] = [
  { label: "Searches", value: "642", color: "var(--color-indigo)" },
  { label: "Answer rate", value: "96%", color: "var(--color-success)" },
  { label: "Zero-result", value: "4%", color: "var(--color-amber)" },
];

const TOP_QUERIES: { q: string; count: number; pct: number }[] = [
  { q: "refund policy", count: 128, pct: 100 },
  { q: "express shipping rates", count: 94, pct: 73 },
  { q: "international delivery", count: 61, pct: 48 },
  { q: "warranty claim", count: 37, pct: 29 },
];

// Agent analytics — quality summary for the assistant itself.
const AGENT_METRICS: { label: string; value: string; pct: number; color: string }[] = [
  { label: "Grounded answers", value: "99%", pct: 99, color: "var(--color-accent)" },
  { label: "Avg. response", value: "1.2s", pct: 82, color: "var(--color-indigo)" },
  { label: "Resolution rate", value: "94%", pct: 94, color: "var(--color-success)" },
  { label: "Positive sentiment", value: "91%", pct: 91, color: "var(--color-amber)" },
];

// Build the conic-gradient for the traffic donut.
const donut = (() => {
  let acc = 0;
  const stops = TRAFFIC.map((t) => {
    const from = acc;
    acc += t.pct;
    return `${t.color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
})();

/**
 * Hero preview — a mock of the Lumjha agent analytics dashboard (stat cards,
 * activity vs prior chart, traffic-by-platform donut, plus emphasised Site
 * Search analytics and Agent analytics). Framed so the centre reads clearly
 * while the edges dissolve and the right side blurs progressively, as if the
 * panel continues off-canvas.
 */
export default function HeroDashboard() {
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-2)]"
        style={{ boxShadow: "0 30px 90px rgba(0,0,0,0.55)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 font-mono text-[11px] text-[var(--color-text-muted)]">
            app.lumjha.ai/agents/analytics
          </span>
        </div>

        {/* App top bar */}
        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-2">
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--color-text-inverse)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent), var(--color-indigo))",
              }}
            >
              <Bot className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-display text-body-sm font-bold text-[var(--color-text-primary)]">
              Acme Business
            </span>
          </div>
          <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-secondary)]">
            Owner
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto border-b border-[var(--color-border)] px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(({ label, icon: Icon, active }) => (
            <span
              key={label}
              className="relative flex shrink-0 items-center gap-1.5 py-1 font-body text-body-sm font-medium"
              style={{
                color: active
                  ? "var(--color-text-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
              {active && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[var(--color-accent)]" />
              )}
            </span>
          ))}
        </div>

        {/* Analytics header */}
        <div className="flex items-center justify-between gap-3 bg-[var(--color-bg)] px-4 pt-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-display text-body-md font-bold text-[var(--color-text-primary)]">
                Acme Assistant
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-success)_16%,transparent)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-success)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                Active
              </span>
            </div>
            <p className="font-body text-caption text-[var(--color-text-muted)]">
              Performance analytics for this assistant
            </p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-text-secondary)] sm:flex">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            Jun 16 – Jun 22, 2026
          </span>
        </div>

        {/* Body */}
        <div className="bg-[var(--color-bg)] p-4">
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {STATS.map(({ icon: Icon, label, value, sub, trend, color }) => (
              <div
                key={label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{
                      color,
                      background: `color-mix(in srgb, ${color} 14%, transparent)`,
                    }}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-success)]">
                    <ArrowUpRight className="h-3 w-3" aria-hidden />
                    {trend}
                  </span>
                </div>
                <p className="mt-2 font-display text-display-md leading-none text-[var(--color-text-primary)]">
                  {value}
                </p>
                <p className="mt-1 font-body text-caption text-[var(--color-text-secondary)]">
                  {label}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                  {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Activity chart + Traffic donut */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Activity — this week vs prior */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-3">
              <p className="font-body text-body-sm font-semibold text-[var(--color-text-primary)]">
                Activity — This Week vs Prior
              </p>
              <div className="mt-3 flex h-24 items-end justify-around gap-2">
                {ACTIVITY.map(({ group, prior, current }) => (
                  <div key={group} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-20 w-full items-end justify-center gap-1">
                      <span
                        className="w-3 rounded-t bg-[var(--color-border-bright)]"
                        style={{ height: `${prior}%` }}
                        title="Prior week"
                      />
                      <span
                        className="w-3 rounded-t bg-[var(--color-accent)]"
                        style={{ height: `${current}%` }}
                        title="This week"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {group}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-[var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-border-bright)]" />
                  Prior
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  This week
                </span>
              </div>
            </div>

            {/* Traffic by platform */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-3">
              <p className="font-body text-body-sm font-semibold text-[var(--color-text-primary)]">
                Traffic by Platform
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="relative h-16 w-16 shrink-0 rounded-full"
                  style={{ background: donut }}
                  aria-hidden
                >
                  <span className="absolute inset-[22%] rounded-full bg-[var(--color-bg-2)]" />
                </span>
                <ul className="flex flex-1 flex-col gap-1.5">
                  {TRAFFIC.map(({ name, pct, color }) => (
                    <li
                      key={name}
                      className="flex items-center justify-between font-mono text-[11px]"
                    >
                      <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: color }}
                        />
                        {name}
                      </span>
                      <span className="text-[var(--color-text-muted)]">{pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Site Search analytics + Agent analytics */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Site Search analytics */}
            <div className="rounded-xl border border-[var(--color-indigo)]/40 bg-[color-mix(in_srgb,var(--color-indigo)_7%,var(--color-bg-2))] p-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-body text-body-sm font-semibold text-[var(--color-text-primary)]">
                  <Search className="h-4 w-4 text-[var(--color-indigo)]" aria-hidden />
                  Site Search Analytics
                </p>
                <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-[var(--color-success)]">
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                  18%
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SEARCH_STATS.map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5"
                  >
                    <p className="font-display text-body-lg leading-none" style={{ color }}>
                      {value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-[var(--color-text-muted)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mb-1.5 mt-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                Top queries
              </p>
              <ul className="flex flex-col gap-1.5">
                {TOP_QUERIES.map(({ q, count, pct }) => (
                  <li key={q} className="flex items-center gap-2">
                    <span className="w-28 shrink-0 truncate font-mono text-[11px] text-[var(--color-text-secondary)]">
                      {q}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-bg-3)]">
                      <span
                        className="block h-full rounded-full bg-[var(--color-indigo)]"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-6 shrink-0 text-right font-mono text-[11px] text-[var(--color-text-muted)]">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agent analytics */}
            <div className="rounded-xl border border-[var(--color-accent)]/40 bg-[color-mix(in_srgb,var(--color-accent)_6%,var(--color-bg-2))] p-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 font-body text-body-sm font-semibold text-[var(--color-text-primary)]">
                  <Bot className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
                  Agent Analytics
                </p>
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-secondary)]">
                  Acme Assistant
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {AGENT_METRICS.map(({ label, value, pct, color }) => (
                  <li key={label}>
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[var(--color-text-secondary)]">{label}</span>
                      <span style={{ color }}>{value}</span>
                    </div>
                    <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-3)]">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer status */}
          <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              System Active
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-3 w-3" aria-hidden />
              Auto-refresh
            </span>
          </div>
        </div>

        {/* Soft edge vignette — dissolves the outer edges, centre stays crisp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            WebkitMaskImage:
              "radial-gradient(125% 115% at 38% 42%, transparent 52%, #000 100%)",
            maskImage:
              "radial-gradient(125% 115% at 38% 42%, transparent 52%, #000 100%)",
          }}
        />
        {/* Right-side blur — increases toward the right edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 48%, rgba(0,0,0,0.55) 74%, #000 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 48%, rgba(0,0,0,0.55) 74%, #000 100%)",
          }}
        />
      </div>
    </div>
  );
}
