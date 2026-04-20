import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function Stat({ value, label, icon, className }: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center gap-3 rounded-2xl border border-stroke/10 bg-bg-2/40 px-4 py-4 backdrop-blur sm:gap-4 sm:px-5",
        className,
      )}
    >
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-300/10 text-brand-300 [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-col">
        <span className="font-display text-xl font-semibold leading-tight tracking-tight text-fg-high md:text-2xl">
          {value}
        </span>
        <span className="mt-0.5 text-xs leading-snug text-fg-low md:text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}
