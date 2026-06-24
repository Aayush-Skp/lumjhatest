import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalShellProps {
  title: string;
  lastUpdated: string;
  /** "privacy" | "terms" — used to show the cross-link to the other document. */
  current: "privacy" | "terms";
  children: React.ReactNode;
}

export default function LegalShell({
  title,
  lastUpdated,
  current,
  children,
}: LegalShellProps) {
  const other =
    current === "privacy"
      ? { href: "/terms", label: "Terms of Service" }
      : { href: "/privacy", label: "Privacy Policy" };

  return (
    <>
      {/* Slim top bar */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-2)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" aria-label="Lumjha home" className="shrink-0">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Lum<span className="text-[var(--color-accent)]">jha</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-body-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <h1 className="font-display text-display-md text-[var(--color-text-primary)]">
          {title}
        </h1>
        <p className="mt-3 font-mono text-caption uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Last updated: {lastUpdated}
        </p>

        <div className="legal-prose mt-12">{children}</div>

        {/* Footer note */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-8 font-body text-body-sm text-[var(--color-text-secondary)]">
          <p>
            &copy; {new Date().getFullYear()} Lumjha. Empowering businesses with
            intelligent AI agents that engage customers, capture leads, and drive
            growth through advanced RAG technology.
          </p>
          <p className="mt-3">
            <Link href={other.href}>{other.label}</Link>
            {" · "}
            <a href="mailto:info@lumjha.ai">info@lumjha.ai</a>
          </p>
        </div>
      </main>
    </>
  );
}
