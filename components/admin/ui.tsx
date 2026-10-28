import type { ReactNode } from "react";

/* Shared admin styles — built on the site tokens so the panel follows the
   dark/light theme like the rest of the site. */

export const inputCls =
  "w-full rounded-lg border border-line bg-page-deep px-3 py-2 text-[14px] text-ink placeholder:text-subtle transition focus:border-[#527DFF] focus:outline-none focus:ring-2 focus:ring-[#527DFF]/25 disabled:opacity-60";

export const primaryBtn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#527DFF] px-4 text-[14px] font-semibold text-white transition hover:bg-[#3E63F2] disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryBtn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line px-4 text-[14px] font-semibold text-ink transition hover:bg-ink/[0.05] disabled:cursor-not-allowed disabled:opacity-60";

export const dangerBtn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 text-[14px] font-semibold text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-[24px] font-semibold tracking-tight text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[14px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-surface p-5 ${className}`}>{children}</div>;
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-[12px] text-subtle">{hint}</span>}
    </label>
  );
}

export function Message({ state }: { state: { ok: boolean; message: string } | null }) {
  if (!state) return null;
  return (
    <p
      role="status"
      className={`rounded-lg px-3 py-2 text-[13px] ${state.ok ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
    >
      {state.message}
    </p>
  );
}
