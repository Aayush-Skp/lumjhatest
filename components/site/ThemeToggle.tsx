"use client";

import { useSyncExternalStore } from "react";

/* The theme lives on <html data-theme>, set before first paint by the init
   script in app/layout.tsx and persisted under the same storage key. The
   switch's look is pure CSS (`light:` variant), so it never flashes the
   wrong state; React only tracks it for aria-checked. */
const STORAGE_KEY = "lumjha-theme";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme => "dark";

function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage blocked (private mode) — the switch still works for this visit
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 300);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-white/15 bg-white/[0.06] p-0.5 transition-colors hover:border-white/30 light:border-[#D7E3F5] light:bg-[#E9EFFC] light:hover:border-[#527DFF]/50"
    >
      {/* knob: moon on the left (dark), slides right and turns into a sun (light) */}
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#527DFF] text-white shadow-[0_2px_8px_-2px_rgba(82,125,255,0.8)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] light:translate-x-5">
        <svg viewBox="0 0 24 24" className="h-3 w-3 light:hidden" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden h-3 w-3 light:block" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
    </button>
  );
}
