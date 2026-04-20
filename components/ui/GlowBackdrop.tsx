import { cn } from "@/lib/cn";

type GlowBackdropProps = {
  className?: string;
  color?: string;
  size?: number;
  position?: "top" | "center" | "bottom" | "left" | "right";
  intensity?: number;
};

const POS: Record<NonNullable<GlowBackdropProps["position"]>, string> = {
  top: "top-[-30%] left-1/2 -translate-x-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-[-30%] left-1/2 -translate-x-1/2",
  left: "top-1/2 left-[-20%] -translate-y-1/2",
  right: "top-1/2 right-[-20%] -translate-y-1/2",
};

export function GlowBackdrop({
  className,
  color = "rgb(var(--brand-400) / 0.35)",
  size = 900,
  position = "top",
  intensity = 0.65,
}: GlowBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl glow-pulse",
        POS[position],
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
        opacity: intensity,
      }}
    />
  );
}
