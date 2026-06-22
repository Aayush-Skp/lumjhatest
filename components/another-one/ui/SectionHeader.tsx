import Eyebrow from "@/components/another-one/ui/Eyebrow";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Accent colour passed through to the eyebrow chip. */
  color?: string;
  /** Layout: "split" spreads title + body across the full width; "center"
   *  stacks them centred. */
  align?: "split" | "center";
  className?: string;
}

/**
 * Section header that uses the FULL available width instead of hugging the
 * left edge. In "split" mode the title sits on the left and the supporting copy
 * on the right (on large screens), so the header spans the container.
 */
export default function SectionHeader({
  eyebrow,
  title,
  body,
  color,
  align = "split",
  className,
}: SectionHeaderProps) {
  if (align === "center") {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className ?? ""}`}>
        <Eyebrow color={color}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-display-lg text-[var(--color-text-primary)]">
          {title}
        </h2>
        {body && (
          <p className="mx-auto mt-5 max-w-2xl font-body text-body-lg text-[var(--color-text-secondary)]">
            {body}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end ${className ?? ""}`}
    >
      <div className={body ? "lg:col-span-7" : "lg:col-span-12"}>
        <Eyebrow color={color}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-display-lg text-[var(--color-text-primary)]">
          {title}
        </h2>
      </div>
      {body && (
        <p className="font-body text-body-lg text-[var(--color-text-secondary)] lg:col-span-5 lg:pb-2">
          {body}
        </p>
      )}
    </div>
  );
}
