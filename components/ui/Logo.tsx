import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="Lumjha AI"
        width={400}
        height={535}
        priority
        className="h-9 w-auto select-none"
      />
      {showWordmark ? (
        <span className="font-display text-lg font-semibold tracking-tight text-fg-high">
          Lumjha
        </span>
      ) : null}
    </div>
  );
}
