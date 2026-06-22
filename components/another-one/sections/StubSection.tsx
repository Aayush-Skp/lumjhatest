import SectionHeader from "@/components/another-one/ui/SectionHeader";

interface StubSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  elevated?: boolean;
}

/**
 * Placeholder section — full copy/visuals land in a later pass. Renders the
 * eyebrow + headline so the page rhythm and the waypoints are real.
 */
export default function StubSection({
  id,
  eyebrow,
  title,
  body,
  elevated,
}: StubSectionProps) {
  return (
    <section
      id={id}
      className={`a1-section py-24 md:py-32 ${elevated ? "a1-elevated" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} />
        <p className="mt-8 inline-flex rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-caption text-[var(--color-text-muted)]">
          Section in progress
        </p>
      </div>
    </section>
  );
}
