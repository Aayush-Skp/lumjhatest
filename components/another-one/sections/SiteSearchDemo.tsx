"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Loader2, RotateCcw, Search } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";
import SearchResult, {
  type SearchResultData,
} from "@/components/another-one/demos/SearchResult";

interface Query {
  text: string;
  results: SearchResultData[];
}

const QUERIES: Query[] = [
  {
    text: "refund policy",
    results: [
      {
        title: "Returns Policy",
        excerpt:
          "Refunds accepted within 30 days of delivery on unused items in original condition…",
        url: "/policies/returns",
      },
      {
        title: "FAQ — Shipping & Returns",
        excerpt:
          "For international orders, return shipping costs are covered by the customer…",
        url: "/faq#returns",
      },
    ],
  },
  {
    text: "express shipping rates",
    results: [
      {
        title: "Shipping Rates",
        excerpt:
          "Express delivery is calculated at checkout by destination and weight, typically 1–3 business days…",
        url: "/shipping/rates",
      },
      {
        title: "FAQ — Shipping & Returns",
        excerpt:
          "Express shipping is available to 40+ countries with live carrier rates at checkout…",
        url: "/faq#shipping",
      },
    ],
  },
];

const CHAR_MS = 60;

const FEATURES = [
  "Summarized answers with sources — not ten blue links",
  "Searches your whole site and document library",
  "Understands intent, not just keywords",
];

export function SearchWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [runId, setRunId] = useState(0);

  const [typed, setTyped] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResultData[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const at = (ms: number, fn: () => void) =>
    timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    if (!inView) return;
    clearTimers();

    let t = 0;
    // Reset off the effect body (setState inside a timer, not synchronously).
    at(t, () => {
      setTyped("");
      setLoading(false);
      setResults([]);
    });

    QUERIES.forEach((query) => {
      t += 500; // pause before typing
      // Type the query character by character.
      for (let i = 1; i <= query.text.length; i++) {
        const slice = query.text.slice(0, i);
        at(t, () => setTyped(slice));
        t += CHAR_MS;
      }
      // Spinner.
      t += 400;
      at(t, () => {
        setLoading(true);
        setResults([]);
      });
      t += 300;
      at(t, () => setLoading(false));
      // Reveal results (SearchResult handles its own stagger).
      at(t, () => setResults(query.results));
      // Hold, then clear before the next query.
      t += 1800;
      at(t, () => {
        setTyped("");
        setResults([]);
      });
    });

    return clearTimers;
  }, [inView, runId]);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-3)] p-5"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-2)] px-5 py-3 focus-within:border-[var(--color-accent)]">
        <Search size={18} className="text-[var(--color-text-secondary)]" />
        <div className="flex flex-1 items-center font-body text-body-md text-[var(--color-text-primary)]">
          {typed || (
            <span className="text-[var(--color-text-muted)]">Search the site…</span>
          )}
          <span className="ml-0.5 inline-block h-5 w-px bg-[var(--color-accent)] motion-safe:animate-cursor-blink" />
        </div>
        {loading && (
          <Loader2
            size={16}
            className="animate-spin text-[var(--color-accent)]"
          />
        )}
      </div>

      {/* Results */}
      <div className="mt-4 flex min-h-[200px] flex-col gap-3">
        {results.map((r, i) => (
          <SearchResult key={`${r.title}-${i}`} result={r} delay={i * 0.1} />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setRunId((v) => v + 1)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-caption text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <RotateCcw size={12} /> Replay
        </button>
      </div>
    </div>
  );
}

export default function SiteSearchDemo({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[var(--color-bg-2)] py-24 md:py-32"
    >
      <FloatingOrb size={280} color="#818CF8" opacity={0.1} top={80} left={-60} />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Site Search</Eyebrow>
          <h2 className="mt-3 max-w-lg font-display text-display-lg text-[var(--color-text-primary)]">
            <span className="text-[var(--color-accent)]">Answers</span>, not ten
            blue links.
          </h2>
          <p className="mt-6 max-w-md font-body text-body-lg text-[var(--color-text-secondary)]">
            AI-native search across your entire site and document library.
            Visitors ask a question; Lumjha returns the precise, summarized
            answer with sources.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-body text-body-md text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <SearchWidget />
      </div>
    </section>
  );
}
