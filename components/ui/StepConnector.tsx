import { cn } from "@/lib/cn";

type Props = {
  orientation?: "vertical" | "horizontal";
  className?: string;
};

export function StepConnector({ orientation = "horizontal", className }: Props) {
  if (orientation === "horizontal") {
    return (
      <svg
        aria-hidden
        className={cn("h-px w-full", className)}
        viewBox="0 0 200 1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="200"
          y2="0.5"
          stroke="rgb(var(--brand-300) / 0.6)"
          strokeWidth="1"
          className="dash-flow"
        />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden
      className={cn("h-full w-px", className)}
      viewBox="0 0 1 200"
      preserveAspectRatio="none"
    >
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="200"
        stroke="rgb(var(--brand-300) / 0.6)"
        strokeWidth="1"
        className="dash-flow"
      />
    </svg>
  );
}
