interface EyebrowProps {
  children: React.ReactNode;
  /** Accent colour for the chip (defaults to the brand accent). */
  color?: string;
  className?: string;
}

/**
 * Section eyebrow rendered as a highlighted chip — a tinted pill with a leading
 * marker — rather than plain coloured text, so it reads as a tag.
 */
export default function Eyebrow({
  children,
  color = "var(--color-accent)",
  className,
}: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-body text-caption font-medium uppercase tracking-widest ${className ?? ""}`}
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      {children}
    </span>
  );
}
