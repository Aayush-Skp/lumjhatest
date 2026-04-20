import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  iconClassName?: string;
};

export function Feature({
  icon,
  title,
  description,
  className,
  iconClassName,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {icon ? (
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border border-brand-300/20 bg-brand-300/10 text-brand-300 [&_svg]:h-5 [&_svg]:w-5",
            iconClassName,
          )}
        >
          {icon}
        </span>
      ) : null}
      <h3 className="font-display text-xl font-semibold tracking-tight text-fg-high">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-fg-mid">{description}</p>
    </div>
  );
}
