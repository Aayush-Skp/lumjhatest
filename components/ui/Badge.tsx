import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  tone?: "brand" | "neutral" | "success" | "danger";
  className?: string;
};

const TONE: Record<NonNullable<BadgeProps["tone"]>, string> = {
  brand:
    "bg-brand-300/10 text-brand-200 border-brand-300/25 shadow-[inset_0_0_0_1px_rgb(var(--brand-300)/0.1)]",
  neutral: "bg-bg-3/60 text-fg-mid border-stroke/15",
  success: "bg-success/10 text-success border-success/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export function Badge({ children, tone = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase",
        TONE[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
