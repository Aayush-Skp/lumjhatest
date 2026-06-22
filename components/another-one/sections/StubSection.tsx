import Eyebrow from "@/components/another-one/ui/Eyebrow";

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
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-display-lg text-[var(--color-text-primary)]">
          {title}
        </h2>
        {body && (
          <p className="mt-6 max-w-2xl font-body text-body-lg text-[var(--color-text-secondary)]">
            {body}
          </p>
        )}
        <p className="mt-8 inline-flex rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-caption text-[var(--color-text-muted)]">
          Section in progress
        </p>
      </div>
    </section>
  );
}
