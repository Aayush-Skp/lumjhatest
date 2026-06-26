"use client";

import { useRef } from "react";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";

interface LinkItem {
  label: string;
  href: string;
}

interface LinkColumn {
  heading: string;
  links: LinkItem[];
}

export type { LinkItem };

// Default "Quick links" target the /another-one route's section ids. The
// /solutions route uses different ids, so it overrides via the `quickLinks` prop.
const DEFAULT_QUICK_LINKS: LinkItem[] = [
  { label: "Platform", href: "#product-showcase" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#pipeline" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
];

const SECONDARY_COLUMNS: LinkColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Chatbot", href: "#product-showcase" },
      { label: "Site Search", href: "#product-showcase" },
      { label: "Policy Vault", href: "#product-showcase" },
      { label: "Integrations", href: "#channels" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      // { label: "Data Processing", href: "#" },
      // { label: "Data Deletion", href: "#" },
    ],
  },
];

// Shared sizing/typography for both wordmark layers so they overlap exactly.
const WORDMARK =
  "select-none whitespace-nowrap font-display font-extrabold leading-none tracking-tight text-[clamp(4.5rem,19vw,17rem)]";

// Torch radius (px) of the revealed circle around the cursor.
const TORCH = "radial-gradient(circle 200px at var(--mx) var(--my), #000 0%, #000 38%, transparent 72%)";

export default function Footer({
  quickLinks = DEFAULT_QUICK_LINKS,
}: {
  quickLinks?: LinkItem[];
}) {
  const COLUMNS: LinkColumn[] = [
    { heading: "Quick links", links: quickLinks },
    ...SECONDARY_COLUMNS,
  ];
  const rootRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      spot.style.setProperty("--mx", `${x}px`);
      spot.style.setProperty("--my", `${y}px`);
    });
  };

  const setTorch = (on: boolean) => {
    const spot = spotRef.current;
    if (spot) spot.style.opacity = on ? "0.5" : "0";
  };

  return (
    <footer
      ref={rootRef}
      onMouseMove={onMove}
      onMouseEnter={() => setTorch(true)}
      onMouseLeave={() => setTorch(false)}
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-2)]"
    >
      <FloatingOrb
        size={520}
        color="#5eead4"
        opacity={0.07}
        bottom={-160}
        left={-120}
      />

      {/* Giant wordmark sitting BEHIND the links. A faint base is always
          visible; a bright copy is revealed only inside a torch circle that
          follows the cursor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <span
          className={`${WORDMARK} opacity-[0.12]`}
          style={{
            WebkitTextStroke: "2px var(--color-text-primary)",
            WebkitTextFillColor: "transparent",
          }}
        >
          Lumjha
        </span>

        <div
          ref={spotRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300"
          style={{
            ["--mx" as string]: "50%",
            ["--my" as string]: "50%",
            WebkitMaskImage: TORCH,
            maskImage: TORCH,
          }}
        >
          <span
            className={WORDMARK}
            style={{
              WebkitTextStroke: "2px var(--color-text-primary)",
              WebkitTextFillColor: "transparent",
              // Glow hugs the painted STROKE (drop-shadow works on rendered
              // pixels), so the colored halo follows the outline — not the
              // hollow interior the way text-shadow would.
              filter:
                "drop-shadow(0 0 8px var(--color-accent)) drop-shadow(0 0 24px var(--color-accent-glow))",
            }}
          >
            Lum
            <span style={{ WebkitTextStroke: "2px var(--color-accent)" }}>
              jha
            </span>
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-between px-4 py-10 sm:px-6 md:py-12">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-[var(--color-border)] pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Get started
            </p>
            <h2 className="mt-4 max-w-xl font-display text-display-md text-[var(--color-text-primary)]">
              Create your best agent. Automate your growth.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://app.lumjha.ai/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-body font-semibold text-body-md text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Start Free →
            </a>
            <a
              href="https://app.lumjha.ai/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-bright)] px-6 py-3 font-body font-medium text-body-md text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-8 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-mono text-caption uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-body-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 font-body text-body-sm text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between">
          <p className="max-w-md">
            Lumjha is the no-code AI layer for modern customer engagement.
          </p>
          <div className="flex flex-col gap-1 md:items-end">
            <a
              href="mailto:info@lumjha.ai"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              info@lumjha.ai
            </a>
            <span className="font-mono text-caption text-[var(--color-text-muted)]">
              © 2026 Lumjha. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
