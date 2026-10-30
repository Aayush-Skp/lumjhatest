/* ============================================================
   Blue feature band under the homepage hero: two rows of
   capabilities drifting in opposite directions (Figma).
   ============================================================ */

const ROWS = [
  ["24/7 AI Support", "Lead Capture", "Instant Answers", "Voice AI"],
  ["Unified Inbox", "MCP Connectivity", "API Integrations", "No Hallucinations"],
];

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5 shrink-0 md:h-7 md:w-7">
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
    <section aria-label="Lumjha features" className="marquee-band overflow-hidden bg-[#527DFF] py-3 text-[clamp(1.125rem,1.4vw+0.6rem,1.75rem)] font-light text-white md:py-5">
      <ul className="sr-only">
        {ROWS.flat().map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {ROWS.map((row, r) => (
        // the second row drifts the other way and starts half a step along
        <div key={r} aria-hidden className={`flex w-max py-2 md:py-3 ${r ? "marquee marquee-reverse -ml-40" : "marquee"}`}>
          <Run items={row} />
          <Run items={row} />
        </div>
      ))}
    </section>
  );
}
