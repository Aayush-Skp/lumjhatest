"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#pipeline" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
];

const LOGIN_URL = "https://app.lumjha.ai/login";

function Wordmark() {
  return (
    <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
      Lum<span className="text-[var(--color-accent)]">jha</span>
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: reduced ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--color-bg-2)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
        <a href="#hero" aria-label="Lumjha home" className="shrink-0">
          <Wordmark />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="a1-navlink relative font-body font-medium text-body-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 font-body font-medium text-body-sm text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            Log in
          </a>
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2 font-body font-semibold text-body-sm text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            Start Free <ArrowRight size={15} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-body font-medium text-body-md text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-3)] hover:text-[var(--color-text-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border-bright)] px-5 py-3 text-center font-body font-medium text-body-md text-[var(--color-text-primary)]"
            >
              Log in
            </a>
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 font-body font-semibold text-body-md text-[var(--color-text-inverse)]"
            >
              Start Free <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
