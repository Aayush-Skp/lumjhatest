/**
 * TS-facing token exports. Prefer Tailwind classes in components.
 * These are for cases where CSS vars are needed inline (e.g. SVG).
 */
export const tokens = {
  bg: {
    0: "rgb(var(--bg-0))",
    1: "rgb(var(--bg-1))",
    2: "rgb(var(--bg-2))",
    3: "rgb(var(--bg-3))",
  },
  brand: {
    200: "rgb(var(--brand-200))",
    300: "rgb(var(--brand-300))",
    400: "rgb(var(--brand-400))",
    500: "rgb(var(--brand-500))",
  },
  fg: {
    high: "rgb(var(--fg-high))",
    mid: "rgb(var(--fg-mid))",
    low: "rgb(var(--fg-low))",
  },
  stroke: "rgb(var(--stroke))",
} as const;
