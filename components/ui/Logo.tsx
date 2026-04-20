import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        aria-label="Lumjha AI"
        className="h-7 w-7"
      >
        <defs>
          <linearGradient id="lumjha-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--brand-200))" />
            <stop offset="100%" stopColor="rgb(var(--brand-500))" />
          </linearGradient>
          <filter id="lumjha-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="8"
          fill="rgb(var(--bg-3))"
          stroke="rgb(var(--brand-300) / 0.35)"
          strokeWidth="1"
        />
        <path
          d="M9 22V10M9 22h9"
          stroke="url(#lumjha-g)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="10.5" r="2.2" fill="url(#lumjha-g)" filter="url(#lumjha-glow)" />
      </svg>
      {showWordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight text-fg-high">
          Lumjha
        </span>
      ) : null}
    </div>
  );
}
