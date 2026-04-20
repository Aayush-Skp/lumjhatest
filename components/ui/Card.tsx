import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GradientBorder } from "./GradientBorder";

type Variant = "surface" | "glass" | "gradient-border";

type CardProps = {
  children: ReactNode;
  variant?: Variant;
  interactive?: boolean;
  className?: string;
  innerClassName?: string;
};

const BASE =
  "relative overflow-hidden rounded-2xl p-6 md:p-7 transition-all duration-300";

const STYLES: Record<Variant, string> = {
  surface: "bg-bg-3/70 border border-stroke/10",
  glass: "glass",
  "gradient-border": "bg-transparent",
};

export function Card({
  children,
  variant = "surface",
  interactive = false,
  className,
  innerClassName,
}: CardProps) {
  const inner = (
    <div
      className={cn(
        BASE,
        STYLES[variant],
        interactive &&
          "group hover:border-brand-300/25 hover:bg-bg-3/80 hover:shadow-[0_0_0_1px_rgb(var(--brand-300)/0.18),0_30px_80px_-40px_rgb(var(--brand-300)/0.45)]",
        variant === "gradient-border" && "h-full",
        innerClassName,
      )}
    >
      {children}
    </div>
  );

  if (variant === "gradient-border") {
    return (
      <GradientBorder animated={interactive} className={cn("h-full", className)}>
        {inner}
      </GradientBorder>
    );
  }

  return <div className={cn("h-full", className)}>{inner}</div>;
}
