# FRONTEND-DESIGN.SKILL.md — Lumjha Visual Design System

> Read this before writing a single line of CSS or JSX.
> Every color, font, spacing, and animation decision must trace back to a token defined here.

---

## Design Brief Summary

**Product:** Lumjha — no-code AI agents for customer engagement  
**Audience:** SMB founders, marketing leads, e-commerce operators  
**Aesthetic direction:** Dark editorial canvas + conversational warmth. Think: a product that feels alive and intelligent, not corporate and sterile. Inspired by purposetalent.xyz — large kinetic type, expressive ambient art, white space used dramatically.  
**Signature element:** A vertical scroll trail on the left edge of the viewport that marks progress through the page, with labeled section waypoints that glow as you pass them.  
**The one rule:** Every section should feel like it could be its own poster.

---

## Design Token System

### Colors

Define all of these as CSS custom properties in `app/globals.css`:

```css
:root {
  /* Canvas */
  --color-bg:           #0A0A0F;   /* near-black, slightly blue-tinted */
  --color-bg-2:         #111118;   /* cards, elevated surfaces */
  --color-bg-3:         #1A1A24;   /* higher elevation, modals, demo shells */

  /* Accent — Mint Teal (primary) */
  --color-accent:       #5EEAD4;   /* teal-300 feel — primary CTAs, active states, trail fill */
  --color-accent-dim:   #2DD4BF33; /* 20% opacity teal — glow, ghost pills */
  --color-accent-glow:  #5EEAD440; /* 25% opacity — orb base color */

  /* Accent — Indigo (secondary, used sparingly) */
  --color-indigo:       #818CF8;   /* secondary accents, Policy Vault theme */
  --color-indigo-dim:   #818CF820; /* ghost backgrounds */

  /* Accent — Amber (tertiary, for highlights and Policy Vault highlights) */
  --color-amber:        #FCD34D;   /* text highlights, Policy Vault passage highlight */

  /* Text */
  --color-text-primary: #F0F0F5;   /* headlines, primary body */
  --color-text-secondary: #94A3B8; /* subtitles, meta, captions */
  --color-text-muted:   #475569;   /* placeholder, disabled states */
  --color-text-inverse: #0A0A0F;   /* text on accent-colored buttons */

  /* Borders */
  --color-border:       #1E2235;   /* default card/section borders */
  --color-border-bright: #2E3555;  /* hover borders, focus rings base */

  /* Status */
  --color-success:      #34D399;
  --color-warning:      #FBBF24;
  --color-error:        #F87171;

  /* Chat demo specific */
  --color-chat-user-bg:    var(--color-accent);
  --color-chat-user-text:  var(--color-text-inverse);
  --color-chat-agent-bg:   var(--color-bg-3);
  --color-chat-agent-text: var(--color-text-primary);
  --color-citation-bg:     #1E2235;
  --color-citation-border: #2E3555;
}
```

**Palette rationale:**  
The teal accent (`#5EEAD4`) is the "pulse" of the product — it represents the live, intelligent, always-on nature of the AI. It's used sparingly: trail fill, primary buttons, active states, and the verified citation checkmark. The indigo (`#818CF8`) signals Policy Vault's structured, legal-grade nature. Amber is reserved for highlights only — the Policy Vault passage highlight animation. Together they feel like a control panel at night, warm but precise.

---

### Typography

Load in `app/layout.tsx` using `next/font/google`:

```typescript
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})
```

Apply to `<html>` as className: `${syne.variable} ${dmSans.variable}`.

**CSS variables:**
```css
:root {
  --font-display: 'Syne', sans-serif;   /* headlines, hero, section titles */
  --font-body:    'DM Sans', sans-serif; /* body, UI, captions */
  --font-mono:    'ui-monospace', 'SF Mono', monospace; /* citations, code, source pills */
}
```

**Type Scale (Tailwind config extension):**

```javascript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)'],
      body:    ['var(--font-body)'],
      mono:    ['var(--font-mono)'],
    },
    fontSize: {
      'display-xl': ['clamp(3.5rem, 8vw, 7rem)',   { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
      'display-md': ['clamp(1.75rem, 3vw, 2.75rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em' }],
      'body-lg':    ['1.125rem', { lineHeight: '1.7' }],
      'body-md':    ['1rem',     { lineHeight: '1.65' }],
      'body-sm':    ['0.875rem', { lineHeight: '1.6' }],
      'caption':    ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.04em' }],
    },
  }
}
```

**Typography rules:**
- `font-display` (Syne) is used ONLY for: hero headline, section headlines, the kinetic word-reveal
- `font-body` (DM Sans) is used for: everything else — body, nav, buttons, labels
- `font-mono` is used for: citation pills, source badges, pipeline step numbers, the Policy Vault document text
- Never mix display and body fonts in the same line of running text
- Eyebrows (section labels above headlines) use `font-body` in `caption` size, uppercase, tracked, accent color

---

### Spacing

```css
/* Use Tailwind spacing scale — key landmarks: */
--space-section-y:  theme(spacing.24);  /* 96px — vertical section padding */
--space-section-x:  theme(spacing.6);   /* 24px — horizontal content padding */
--space-max-width:  72rem;              /* 1152px — max content width */
```

**Section anatomy:**
```
<section id="..." className="py-24 md:py-32">
  <div className="max-w-6xl mx-auto px-6">
    <EyebrowLabel>Eyebrow text</EyebrowLabel>
    <h2 className="font-display text-display-lg text-[var(--color-text-primary)] mt-3 mb-6">
      Section headline
    </h2>
    <p className="font-body text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-16">
      Section subheadline
    </p>
    {/* content */}
  </div>
</section>
```

---

### Borders & Surfaces

```css
/* Cards */
.card {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.card:hover {
  border-color: var(--color-border-bright);
}

/* Demo shells (chat, search, vault) */
.demo-shell {
  background: var(--color-bg-3);
  border: 1px solid var(--color-border-bright);
  border-radius: 20px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border);
}
```

---

## Component Patterns

### Eyebrow Label

Used above every section headline. Never skip it — it acts as the structural numbering system for the page.

```tsx
// components/ui/Eyebrow.tsx
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-caption uppercase tracking-widest text-[var(--color-accent)]">
      {children}
    </p>
  )
}
```

### Primary Button

```tsx
// Primary CTA — filled, teal
<button className="
  inline-flex items-center gap-2 px-6 py-3
  bg-[var(--color-accent)] text-[var(--color-text-inverse)]
  font-body font-semibold text-body-md
  rounded-full
  transition-all duration-200
  hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
">
  Build Your Agent Free <ArrowRight size={16} />
</button>
```

### Secondary Button

```tsx
// Secondary — outlined ghost
<button className="
  inline-flex items-center gap-2 px-6 py-3
  bg-transparent text-[var(--color-text-primary)]
  border border-[var(--color-border-bright)]
  font-body font-medium text-body-md
  rounded-full
  transition-all duration-200
  hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
">
  See how it works
</button>
```

### Section Reveal Wrapper

```tsx
// components/ui/SectionReveal.tsx
'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function SectionReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

### Channel Badge

```tsx
// components/ui/ChannelBadge.tsx
export function ChannelBadge({ name, sub, icon }: { name: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-bg-2)] border border-[var(--color-border)] hover:border-[var(--color-border-bright)] transition-colors">
      <span className="text-[var(--color-accent)]">{icon}</span>
      <div>
        <p className="font-body font-semibold text-body-sm text-[var(--color-text-primary)]">{name}</p>
        <p className="font-mono text-caption text-[var(--color-text-muted)]">{sub}</p>
      </div>
    </div>
  )
}
```

---

## Section-by-Section Design Notes

### Hero

**Layout:** Full viewport height. Headline takes up ~60% of the vertical space. Bottom half contains stats row.

**Headline treatment:**
- Split "Clone Your Best Agent." and "Automate Your Growth." into individual words
- Each word is wrapped in a `motion.span` with the `wordReveal` variant, staggered 80ms apart
- The period at the end of each line pulses in `--color-accent` after its word animates in
- Font: `font-display text-display-xl`

**Background:**
- A single large radial gradient blob, centered, using `--color-accent-glow` — very subtle, like a light source far behind the text
- Two `FloatingOrb` components: one teal top-right, one indigo bottom-left
- A subtle grid overlay: 1px lines at 40px intervals, `opacity: 0.03`, using CSS `background-image: linear-gradient`

**Live chat widget (hero right/below on mobile):**
- Render `ChatbotDemo` directly in the hero as a floating card, slightly rotated (`rotate-2`) and offset
- On desktop: positioned to the right of the headline text (2-column grid)
- On mobile: below the headline, full width, rotation removed

**Stats row:**
- Four items: 24/7 · 5+ · 0 · 100%
- Each number uses `AnimatedCounter` — counts up from 0 when in view
- Labels below in `text-caption text-[var(--color-text-secondary)]`
- Dividers between items: `1px solid var(--color-border)`

---

### Platform (Three Modules)

**Layout:** Three cards in a row on desktop, stacked on mobile.

**Card treatment:**
- Each card has a colored top border: Chatbot → teal, Site Search → indigo, Policy Vault → amber
- The card border flashes in on hover with a 1px `box-shadow: inset 0 1px 0 {color}`
- Card header has a small animated tag pill (the "Always-on agent" / "AI-native search" / "Verbatim & cited" labels)
- Below each card: a mini demo preview (not full demo — just a 2-line teaser of the interaction)

**Connection visual:**
- A horizontal dotted line connects the three cards at their midpoint
- Above the line: a small "One knowledge base" label centered
- This communicates the architectural unity visually

---

### Demo Sections (Chatbot, Site Search, Policy Vault)

Each demo section follows this two-column layout on desktop:

```
┌────────────────────┬──────────────────────┐
│                    │                      │
│  Eyebrow           │                      │
│  Headline          │   DEMO WIDGET        │
│  Body copy         │   (animated)         │
│                    │                      │
│  Feature bullets   │                      │
│                    │                      │
└────────────────────┴──────────────────────┘
```

On mobile: description above, demo below.

**The demo widget occupies 55% width on desktop** and is built to look exactly like the real product widget — same border radius (20px), same shadow, same header format. It must feel like a live embed, not a mockup.

**"Replay" button:** Small, ghost-style, bottom-right of the demo shell. Clicking it resets and re-runs the animation sequence.

**Section background variation:**
- Chatbot section: default `--color-bg`
- Site Search section: `--color-bg-2` with a very faint horizontal stripe pattern (CSS `repeating-linear-gradient`)
- Policy Vault section: default `--color-bg` with amber orb accent

---

### Pipeline

**Layout:** Horizontal stepper on desktop, vertical accordion on mobile.

**Step card design:**
- Step number in `font-mono text-display-md text-[var(--color-accent)] opacity-20` (large ghost number behind the card title)
- Title in `font-display`
- Body in `font-body text-[var(--color-text-secondary)]`
- Connector line between steps: dashed, `--color-border`
- On scroll: steps reveal one by one with a 120ms stagger

**DO NOT use generic numbered markers unless the content is actually sequential** — and this is actually sequential (data ingestion must come before embedding), so numbered steps are appropriate here.

---

### RAG Architecture

**Layout:** Centered, max-width 640px.

**Flow diagram:**
- Build it as an SVG or CSS flexbox flow, not a third-party diagram library
- Four boxes in a horizontal chain: Input → Retrieval → Generate → Response
- Arrows between them: thin, animated (a traveling dot along the arrow path on scroll enter)
- Below the chain: a "Knowledge Database" pill, connected upward to "Retrieval" with a vertical line
- Box styling: `--color-bg-2` background, `--color-border` border, rounded-lg
- Active box (highlight one at a time in sequence, cycle): gets `border-color: var(--color-accent)` and a faint glow

---

### Pricing

**Layout:** Four cards in a row on desktop. The "Gold" card (Popular) is visually elevated:
- Slightly larger scale (`transform: scale(1.05)`)
- Accent-colored top border (2px teal)
- "Popular" pill badge, top-right of card, teal background

**Add-on modules:** Rendered below the main cards as a horizontal row of three option cards, smaller.

**Price display:**
- The number is `font-display text-display-md`
- "/mo" is `font-body text-body-sm text-[var(--color-text-secondary)]`

---

### Security + Transparency

**Layout:** Two sub-sections, separated by a thin `--color-border` line.

**"We do NOT" list:**
- Each item is a row with a small `✕` in `--color-error` and the text
- "We NEVER delete" gets a `✓` in `--color-success` instead
- Animate each row in with a 60ms stagger (fade + slide left)

---

### Footer

**Layout:** Logo + tagline left, nav columns right. Contact email centered above the column grid.

**Footer background:** `--color-bg-2`, separated from the section above by a single `--color-border` line.

**Logo mark:** The placeholder logo should be an SVG wordmark — "Lumjha" in `font-display`, with the "jha" portion in `--color-accent`. Until a real logo is provided, generate this as an inline SVG.

---

## Scroll Trail Design Details

The trail is the single most important UI element for perceived quality. Build it carefully.

**Visual spec:**
```
Left edge: 24px from viewport left (32px on large screens)
Width: 2px line
Height: 100vh

Unfilled:  color: var(--color-border)     opacity: 0.4
Filled:    color: var(--color-accent)     opacity: 1

Dots (waypoints):
  Size: 8px diameter circle
  Unfilled/future: var(--color-border) border, transparent fill
  Current: var(--color-accent) fill, box-shadow: 0 0 8px var(--color-accent-glow)
  Past: var(--color-accent) fill, opacity 0.4

Labels beside dots:
  font-mono text-caption
  text-[var(--color-text-muted)] for past/future
  text-[var(--color-accent)] for current
  Appear on hover on desktop, always visible on large screens (>1280px)
  Position: 16px left of the dot, right-aligned text
```

**Mobile (<768px):** Replace with a 2px tall progress bar at the very top of the viewport:
```css
.mobile-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: var(--color-accent);
  transform-origin: left;
  /* scaleX driven by scroll progress */
}
```

---

## Floating Orbs — Placement Guide

One orb pair per "chapter" of the page. Never more than two orbs visible at once.

| Section | Orb 1 | Orb 2 |
|---|---|---|
| Hero | Teal, top-right, 400px, opacity 0.15 | Indigo, bottom-left, 300px, opacity 0.1 |
| Platform | None | None (let the section breathe) |
| Chatbot Demo | Teal, right, 320px, opacity 0.12 | — |
| Site Search | Indigo, left, 280px, opacity 0.1 | — |
| Policy Vault | Amber, right, 300px, opacity 0.1 | — |
| Security | None | — |
| Pricing | Teal, top-right, 350px, opacity 0.1 | Indigo, bottom-left, 250px, opacity 0.08 |

Orbs must use `pointer-events: none` and `user-select: none`. Never let them overlap text.

---

## Motion Choreography — Full Page Sequence

### On page load:
1. (0ms) Navbar fades in from top (`y: -20 → 0`, opacity 0 → 1, 400ms)
2. (200ms) Scroll trail line draws in from top (`scaleY: 0 → current_progress`, 600ms)
3. (400ms) Hero eyebrow fades in
4. (500ms) Hero headline words cascade in (80ms stagger per word)
5. (900ms) Hero subheadline fades in
6. (1100ms) Hero CTAs fade in from bottom
7. (1300ms) Trust pills fade in
8. (1500ms) Stats row counts up
9. (1700ms) Chat demo widget slides in from right

### On scroll:
- Every section uses `SectionReveal` — no exceptions
- Demo sections: auto-play when 60% of the demo widget is in viewport
- Pipeline steps: staggered 120ms per step
- Pricing cards: staggered 80ms per card

### Hover states:
- Nav links: underline slides in from left (CSS pseudo-element)
- Cards: `border-color` transitions to `--color-border-bright`, `translateY(-2px)`, subtle shadow increase
- CTA buttons: brightness increase + glow pulse
- Scroll trail dots: label fades in, dot scales to 1.5x

---

## Tailwind Config Extensions

```javascript
// tailwind.config.ts
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-2': 'var(--color-bg-2)',
        'bg-3': 'var(--color-bg-3)',
        accent: 'var(--color-accent)',
        indigo: 'var(--color-indigo)',
        amber: 'var(--color-amber)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'border-bright': 'var(--color-border-bright)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      animation: {
        'orb-float': 'orbFloat 8s ease-in-out infinite',
        'typing-bounce': 'typingBounce 1.2s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':      { transform: 'translate(12px, -8px) scale(1.08)' },
        },
        typingBounce: {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%':           { transform: 'translateY(-6px)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## Self-Critique Checklist (Run Before Declaring Done)

Before finishing the build, verify:

- [ ] No color is hardcoded — all use CSS variables
- [ ] No `Inter` font anywhere
- [ ] Hero headline is impossible to mistake for another product's site
- [ ] All three demos auto-play, replay on click, respect `prefers-reduced-motion`
- [ ] Scroll trail works: fills as you scroll, dots activate at correct sections
- [ ] Mobile: trail replaced by top progress bar, demos are full-width and readable
- [ ] Lighthouse performance ≥ 90 on mobile
- [ ] All interactive elements have visible `:focus-visible` states
- [ ] No layout shift on page load (all fonts loaded with `next/font`, no CLS)
- [ ] Orbs never overlap readable text
- [ ] Every section has an eyebrow label above its headline
- [ ] All external links (`app.lumjha.ai`) open in `_blank` with `rel="noopener noreferrer"`
