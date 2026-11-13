"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Dark / light switch. The active theme lives on
 * `document.documentElement.dataset.theme` (set before first paint by the
 * inline script in the root layout); we read it with `useSyncExternalStore`
 * so the icon never mismatches on hydration, and persist changes to
 * localStorage under the same `lumjha-theme` key the script reads.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("lumjha-theme", next);
  } catch {
    // localStorage unavailable (private mode) — theme still applies for the session.
  }
  listeners.forEach((listener) => listener());
}

/* The page swaps as two snapshots (View Transitions): the new theme opens as
   a circle growing out of the toggle until it covers the viewport. One
   compositor animation, instead of transitioning colours on every element
   (which repainted the blurs each frame). Reduced motion gets a soft
   cross-fade (.theme-fade in globals.css); browsers without View
   Transitions switch instantly. */
function setTheme(next: Theme, from: HTMLElement) {
  const root = document.documentElement;
  if (!document.startViewTransition) {
    applyTheme(next);
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mode = reduce ? "theme-fade" : "theme-reveal";
  root.classList.add(mode);
  const transition = document.startViewTransition(() => applyTheme(next));
  transition.finished.finally(() => root.classList.remove(mode));
  if (reduce) return;

  const box = from.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}

const ICON = "absolute h-[18px] w-[18px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={(e) => setTheme(isDark ? "light" : "dark", e.currentTarget)}
      aria-label={label}
      title={label}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-[#5675FF]/60 hover:text-[#5675FF] ${className}`}
    >
      {/* sun (shown in dark mode → go light) and moon swap with a small spin */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        aria-hidden
        className={`${ICON} ${isDark ? "rotate-0 opacity-100" : "-rotate-90 scale-50 opacity-0"}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`${ICON} ${isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 opacity-100"}`}
      >
        <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
      </svg>
    </button>
  );
}
