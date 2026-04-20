import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GradientBorderProps = {
  children: ReactNode;
  animated?: boolean;
  className?: string;
};

export function GradientBorder({
  children,
  animated = false,
  className,
}: GradientBorderProps) {
  return (
    <div
      data-animated={animated ? "true" : "false"}
      className={cn("gradient-border", className)}
    >
      {children}
    </div>
  );
}
