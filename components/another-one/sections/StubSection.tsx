import SectionHeader from "@/components/another-one/ui/SectionHeader";

interface StubSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  elevated?: boolean;
  /** Header layout — "split" (default) or "center" (everything stacked). */
  align?: "split" | "center";
  /** Centre mode only: keep the title and body each on a single line. */
  nowrap?: boolean;
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
  align = "split",
  nowrap,
}: StubSectionProps) {
  return (
    <section
      id={id}
      className={`a1-section py-24 md:py-32 ${elevated ? "a1-elevated" : ""}`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 ${align === "center" ? "flex flex-col items-center" : ""}`}
      >
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          body={body}
          align={align}
          nowrap={nowrap}
        />
      </div>
    </section>
  );
}
