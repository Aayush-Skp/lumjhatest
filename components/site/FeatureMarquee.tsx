/* ============================================================
   Feature band (Integration page): one row of capabilities
   drifting across the page, set in grey italics on the
   page itself (no band colour): semibold, so it holds up at a smaller size.
   ============================================================ */

const FEATURES = [
  "24/7 AI Support",
  "Lead Capture",
  "Instant Answers",
  "Voice AI",
  "Unified Inbox",
  "MCP Connectivity",
  "API Integrations",
  "No Hallucinations",
];

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5 shrink-0 opacity-60 md:h-4 md:w-4">
      <path d="M12 1c.6 5.6 4.4 9.4 11 11-6.6 1.6-10.4 5.4-11 11-.6-5.6-4.4-9.4-11-11 6.6-1.6 10.4-5.4 11-11Z" />
    </svg>
  );
}

/* One half of a track: the row twice over, so a half is wider than any screen. */
function Run({ items }: { items: string[] }) {
  return (
    <ul className="flex shrink-0 items-center">
      {[...items, ...items].map((item, i) => (
        <li key={i} className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20">
          <span className="whitespace-nowrap">{item}</span>
          <Sparkle />
        </li>
      ))}
    </ul>
  );
}

export default function FeatureMarquee() {
  return (
    <section
      aria-label="Lumjha AI features"
      className="marquee-band overflow-hidden py-6 text-[clamp(1rem,1.1vw+0.55rem,1.5rem)] font-semibold italic tracking-[-0.01em] text-subtle opacity-35 md:py-8"
    >
      <ul className="sr-only">
        {FEATURES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden className="marquee flex w-max">
        <Run items={FEATURES} />
        <Run items={FEATURES} />
      </div>
    </section>
  );
}
