# CLAUDE.md — Lumjha Website Rebuild

> This file is the single source of truth for Claude Code working on the Lumjha marketing website.
> Read this in full before touching any file. Every decision you make should be traceable back to a rule here.

---

## 1. Project Identity

**Product:** Lumjha — a no-code AI agent platform  
**Tagline:** Create your best agent. Automate your growth.  
**Core value prop:** One knowledge base → three AI modules (Chatbot, Site Search, Policy Vault) → live across Website, WhatsApp, Instagram, Facebook, Telegram in minutes, no code.  
**Target audience:** SMB owners, marketing leads, SaaS founders, e-commerce operators — people who are not engineers but need enterprise-grade AI support.  
**Live app:** https://app.lumjha.ai/login  
**Design reference:** https://www.purposetalent.xyz — large kinetic editorial type, dark canvas, expressive blobs, conversational warmth fused with theatrical scroll drama.

---

## 2. Repository Structure

```
lumjha-website/
├── CLAUDE.md                      ← you are here
├── FRONTEND-DESIGN.SKILL.md       ← design system, tokens, component rules
├── app/
│   ├── layout.tsx                 ← root layout, fonts loaded here
│   ├── page.tsx                   ← homepage (single scroll page)
│   └── globals.css                ← CSS variables + base resets
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx               ← kinetic headline + live chat demo
│   │   ├── Platform.tsx           ← three modules overview
│   │   ├── ChatbotDemo.tsx        ← INTERACTIVE: animated live chat flow
│   │   ├── SiteSearchDemo.tsx     ← INTERACTIVE: animated search widget
│   │   ├── PolicyVaultDemo.tsx    ← INTERACTIVE: policy citation demo
│   │   ├── Channels.tsx           ← omnichannel grid
│   │   ├── Features.tsx           ← 6 core pillars
│   │   ├── Pipeline.tsx           ← 5-stage ingestion pipeline
│   │   ├── RAG.tsx                ← RAG architecture explainer
│   │   ├── Security.tsx           ← security + transparency
│   │   ├── LeadCapture.tsx        ← leads demo
│   │   ├── Analytics.tsx          ← analytics preview
│   │   ├── Roadmap.tsx            ← future enhancements
│   │   └── Pricing.tsx            ← pricing table
│   ├── ui/
│   │   ├── ScrollTrail.tsx        ← SIGNATURE: vertical scroll progress trail
│   │   ├── FloatingOrb.tsx        ← ambient animated blob accent
│   │   ├── AnimatedCounter.tsx    ← number roll-up on scroll enter
│   │   ├── SectionReveal.tsx      ← scroll-triggered fade+translate wrapper
│   │   └── ChannelBadge.tsx       ← channel pill with icon
│   └── demos/
│       ├── ChatMessage.tsx        ← single chat bubble component
│       ├── TypingIndicator.tsx    ← animated three-dot typing
│       └── SearchResult.tsx       ← single search result card
├── hooks/
│   ├── useScrollProgress.ts       ← scroll position 0–1
│   ├── useInView.ts               ← IntersectionObserver hook
│   └── useChatSimulation.ts       ← drives the auto-play chat demo sequence
├── lib/
│   ├── chatScripts.ts             ← the scripted conversation flows for demos
│   └── constants.ts               ← brand strings, pricing data, channel list
└── public/
    ├── logo.svg                   ← placeholder logo (see §6)
    └── fonts/                     ← local font files if self-hosted
```

---

## 3. Tech Stack & Constraints

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Use server components for static sections, client components only where interactivity is needed |
| Styling | Tailwind CSS + CSS Variables | All brand tokens live in `globals.css` as CSS vars; Tailwind extends them |
| Animation | Framer Motion | Primary animation library; use `useInView` + `motion.div` for scroll reveals |
| Scroll trail | Custom CSS + Framer Motion | See §7.3 |
| Icons | Lucide React | Consistent icon set |
| Fonts | See FRONTEND-DESIGN.SKILL.md | Loaded via `next/font/google` |
| No extra UI libs | — | No shadcn, no MUI, no Radix unless strictly needed |

**Performance rules:**
- `next/image` for every image
- Lazy-load all demo components with `dynamic(() => import(...), { ssr: false })`
- `prefers-reduced-motion` must be respected — wrap all Framer variants with a `reducedMotion` check
- Lighthouse performance target: 90+ on mobile

---

## 4. Content — Complete Copy

### 4.1 Navigation
```
Logo | Platform | Features | How it works | Pricing | Security
[Log in]  [Start Free →]
```

### 4.2 Hero
```
Headline (animated, word-by-word reveal):
  "Create Your Best Agent."
  "Automate Your Growth."

Subheadline:
  Deploy a no-code AI assistant that learns every document, page, and policy
  in your business — and speaks in your exact brand voice.
  Engage customers 24/7 across Website, WhatsApp, Instagram, Facebook, and Telegram.
  Capture qualified leads and book appointments while you sleep.

CTAs: [Build Your Agent Free →]  [See how it works ↓]

Trust pills (appear after subheadline):
  ✓ 100% grounded in your data
  ✓ Live in minutes
  ✓ 14-day full-feature trial

Stats row (animated counters):
  24/7   Always on
  5+     Channels
  0      Lines of code
  100%   Grounded data
```

### 4.3 Platform (Three Modules)
```
Eyebrow: "The Platform"
Headline: "Three modules, one knowledge base."
Body: Most tools give you a chatbot. Lumjha gives you a complete AI layer for
customer engagement — three modules that share a single, secure knowledge base,
so everything your agent learns is instantly available everywhere.

Module 1 — Chatbot
  Tag: "Always-on agent"
  Body: Your always-on conversational agent — answers questions, captures leads,
  books appointments, and talks to customers across every channel in your brand voice.

Module 2 — Site Search
  Tag: "AI-native search"
  Body: AI-native search across your entire site and document library. Visitors
  ask a question; Lumjha returns the precise, summarized answer with sources —
  not ten blue links.

Module 3 — Policy Vault
  Tag: "Verbatim & cited"
  Body: Ask in plain language; Policy Vault understands your intent, finds the
  exact passage in your uploaded policies, contracts, or compliance docs, and
  returns it word-for-word with a citation. Where the Chatbot generates and
  Site Search summarizes, Policy Vault quotes the source as-is.

Footer note: "Start with the Chatbot; add Site Search and Policy Vault when
you're ready — they snap onto the same knowledge base with no re-setup."
```

### 4.4 Channels
```
Eyebrow: "Omnichannel"
Headline: "Meet your customers wherever they already are."
Body: One agent, one knowledge base, every channel. Roll Lumjha out on your
website, your socials, and your messaging apps — no separate bots, no duplicated content.

Channels:
  Website      → Embed widget
  WhatsApp     → Business API
  Instagram    → DMs + comments
  Facebook     → Messenger
  Telegram     → Bot API
  Shopify      → Storefront
  Google Calendar → Appointments

Footer: "Plus custom integrations via webhooks and REST API."
```

### 4.5 Features (Core Pillars)
```
Eyebrow: "Core Pillars"
Headline: "Everything a modern AI agent should already do."

1. Accurate AI Responses
   Precise answers generated from your uploaded documents and website — never generic.

2. Conversation Continuity
   Sessions persist, context carries, every reply remembers the last.

3. Lead Generation & Conversion
   Structured lead capture baked into the chat — turn conversations into pipeline.

4. Appointment Booking
   The agent checks availability and books straight into your Google Calendar.

5. Performance Insights
   Track usage, message counts, lead status, sentiment and intent — all on the dashboard.

6. Verbatim Verification
   With Policy Vault, every quoted phrase is checked word-for-word against the source;
   unverified answers are flagged.
```

### 4.6 Pipeline (5 Stages)
```
Eyebrow: "Pipeline"
Headline: "From your content to intelligent answers."
Body: Five deterministic stages turn raw documents into semantically searchable
knowledge your agent can reason with.

Stage 01: Data Ingestion
  Files uploaded or websites crawled. Metadata stored securely.

Stage 02: Text Extraction
  Content lifted from PDF / Word / Excel / Markdown / text.
  Converted to clean readable text.

Stage 03: Chunking (Segmentation)
  Large content split into logical sections — each chunk tagged with
  topic, section, page.

Stage 04: Embedding (AI Transformation)
  Each chunk converted to a vector. Enables semantic understanding,
  not keyword matching.

Stage 05: Storage
  Raw files → secure storage · Text → database · Embeddings → vector DB.

Footer: "Supported file types: PDF · DOCX · XLSX · Markdown · TXT"
```

### 4.7 RAG Architecture
```
Eyebrow: "Retrieval-Augmented Generation"
Headline: "RAG, tuned to your business."

Flow:
  Input (User query) → Retrieval (Semantic search) → Generate (LLM + context) → Response (Grounded answer)
  ↕
  Knowledge Database: Qdrant · vector embeddings

Steps:
  01 The system analyzes the user's query.
  02 Semantic search pulls the most relevant chunks from your knowledge base.
  03 The AI blends retrieved context + conversation history → contextual, grounded answer.
```

### 4.8 Security
```
Eyebrow: "Security"
Headline: "Your data, your control — always."

Controls:
  Access Control: Authenticated access on every protected route; role-based
  separation of users and admins.

  Session Security: Secure session tokens for chat; validation on every request.

  Controlled AI Behavior: Guardrails against unsafe or off-topic output;
  tool use is scoped and auditable.

  Data Isolation: Your knowledge base is yours alone — never shared across
  workspaces, never blended with another client's data.

Eyebrow: "Transparency"
Headline: "Transparency, in plain language."

We do NOT access private or restricted website data.
We do NOT use your data outside your workspace.
We do NOT train without your configured consent.
We do NOT expose your data to other clients.
We NEVER delete your data — when a plan lapses, access is locked, not erased.
```

### 4.9 Lead Capture
```
Eyebrow: "Leads"
Headline: "Capture leads inside the conversation."
Body: Leads are captured inside the conversation — gradually, conversationally.
When required fields complete, a structured lead record is saved and linked back
to the chat session. Track, filter, and export from one dashboard.

Fields: Name · Email · Interest · Source · Session ID
Pipeline stages: New → Contacted → Qualified → Converted / Lost
```

### 4.10 Analytics
```
Eyebrow: "Analytics"
Headline: "Every conversation, summarized automatically."

Stats:
  +28%     User intent (24h)
  142      Topics discussed (24h)
  Positive Sentiment (24h)
  38 hot   Lead signals (24h)

Body: Real-time notification counts surface unread messages, new leads, and
new sessions. These insights feed back into your app — improve the bot,
spot demand, optimize conversion.
```

### 4.11 Roadmap
```
Eyebrow: "Roadmap"
Headline: "Future enhancements, already scoped."

01  Data retention policies per data type
02  Full data export & deletion workflows
03  Advanced security documentation
04  Enterprise compliance support
```

### 4.12 Pricing
```
Eyebrow: "Pricing"
Headline: "Start free. Scale without complexity."
Body: Every account starts with a 14-day trial of all three modules — Chatbot,
Site Search, and Policy Vault — no credit card required.

Plan 1 — Free  ($0/forever)
  For: Testing & demos
  - 1 chatbot
  - 1 channel
  - 50 replies / month
  - 1 document
  - Lead capture & pipeline
  - Basic analytics
  CTA: Start free

Plan 2 — Gold  ($49/mo) [Popular]
  For: SMBs & consultants
  - 1 chatbot
  - 3 channels
  - 2,000 replies / month
  - 15 documents
  - Advanced analytics
  - Priority support
  CTA: Get started

Plan 3 — Platinum  ($89/mo)
  For: Agencies & multi-location
  - 3 chatbots
  - 5 channels
  - 5,000 replies / month
  - 25 documents
  - Add-ons across all agents
  - Priority support
  CTA: Get started

Plan 4 — Custom  (Let's talk)
  For: Enterprise & regulated
  - Custom chatbots
  - Unlimited channels
  - Custom replies & documents
  - Add-on modules included
  - Dedicated support + SLA
  CTA: Talk to sales

Add-on modules (any paid plan):
  Site Search     +$15/mo
  Policy Vault    +$15/mo
  Bundle (both)   +$25/mo  [save $5/mo]

Footer: "Every plan includes SSL security, GDPR-ready data handling,
your data never deleted, and cancel-anytime billing."
```

### 4.13 Final CTA Section
```
Headline: "Your data is your asset. Make it work for you."
Body: Spin up your first Lumjha agent in under 5 minutes —
no credit card, no code. Get the Chatbot, Site Search, and Policy Vault
free for 14 days.
CTAs: [Start Free →]  [Book a Demo]
```

### 4.14 Footer
```
Logo + tagline: "Create your best agent. Automate your growth.
Lumjha is the no-code AI layer for modern customer engagement."
Contact: info@lumjha.ai

Platform:  Chatbot | Site Search | Policy Vault | How it works
Product:   Features | Pricing | Security | Integrations
Company:   About | Blog | Contact
Legal:     Privacy | Terms | Data Processing | Data Deletion

© 2026 Lumjha. All rights reserved.
```

---

## 5. Interactive Demo Specs

These are the crown jewels of the page. Each demo must feel like a real product, not a screenshot.

### 5.1 Chatbot Demo (`ChatbotDemo.tsx`)

**Trigger:** Auto-plays when the component enters the viewport (IntersectionObserver). Replays on click of a "Replay demo" button.

**UI shell:** A floating chat widget — rounded card, 360px wide, branded header ("Lumjha Agent · Sales Bot"), message bubbles (user right, agent left), typing indicator between agent replies.

**Script** (defined in `lib/chatScripts.ts`):
```
delay 800ms  → User:  "Do you ship internationally?"
delay 600ms  → Typing indicator (1200ms)
             → Agent: "Yes — we ship to 40+ countries. Standard delivery is
                       5–7 business days, with express options at checkout.
                       Want me to check rates for your region?"
             → Citation pill: "shipping.pdf · §1"
delay 1200ms → User:  "What's your refund policy?"
delay 600ms  → Typing indicator (1000ms)
             → Agent: "Refunds are accepted within 30 days of delivery on
                       unused items."
             → Citation pill: "Returns Policy · §2 — verified ✓"
delay 800ms  → Input bar pulses (invitation to type)
```

**Visual details:**
- User bubbles: accent color background, right-aligned
- Agent bubbles: surface-2 background, left-aligned, small "L" avatar
- Citation pills: small, monospace font, faint border, lock icon or checkmark
- Typing indicator: three dots with staggered bounce animation

### 5.2 Site Search Demo (`SiteSearchDemo.tsx`)

**Trigger:** Auto-plays on viewport enter. Replays on click.

**UI shell:** A search bar (full width of its container) with a magnifying glass icon. Below it, result cards appear as the query types.

**Script:**
```
delay 500ms  → Cursor appears in search bar
             → Types "refund policy" (character by character, ~60ms/char)
delay 400ms  → Loading spinner (300ms)
             → Result card 1 appears:
                 Title: "Returns Policy"
                 Excerpt: "Refunds accepted within 30 days of delivery on unused items in original condition..."
                 Source badge: "Returns Policy · Page 2"
             → Result card 2 appears (100ms later):
                 Title: "FAQ — Shipping & Returns"
                 Excerpt: "For international orders, return shipping costs are covered by the customer..."
                 Source badge: "FAQ Doc · Page 5"
delay 800ms  → Search bar clears
             → Types "express shipping rates" (character by character)
delay 400ms  → New results appear
```

**Visual details:**
- Search bar: prominent, rounded, soft glow on focus state
- Results: white cards on dark bg, source badge in monospace with file icon
- Typing cursor: blinking caret

### 5.3 Policy Vault Demo (`PolicyVaultDemo.tsx`)

**Trigger:** Auto-plays on viewport enter. Replays on click.

**UI shell:** Two-panel layout. Left: a question input. Right: a document panel showing highlighted text.

**Script:**
```
delay 500ms  → Cursor in question input
             → Types "What is the notice period for contract termination?"
delay 600ms  → Loading spinner (400ms)
             → Right panel: document text appears
             → A specific passage gets highlighted (yellow highlight animation)
             → Below: Citation block:
                 "Contract Terms · Section 8.2 · Page 14"
                 "[Exact passage quoted verbatim]"
                 Badge: "verified ✓ word-for-word match"
```

**Visual details:**
- Left panel: clean question input, minimal
- Right panel: "document" look — slightly warmer bg, monospace-ish font for the doc text
- Highlight: sweeps in left-to-right (CSS clip-path animation)
- Citation block: bordered box, distinct from the surrounding copy

---

## 6. The Scroll Trail (Signature Element)

**Component:** `ScrollTrail.tsx`  
**Placement:** Fixed, left edge of viewport (`position: fixed; left: 24px; top: 0; height: 100vh`)

**Behavior:**
- A vertical line runs the full height of the left side
- As the user scrolls, a filled portion grows from top, using scroll progress (0–1) from `useScrollProgress.ts`
- At each major section boundary (calculated from section refs), a small labeled dot appears on the trail
- The dot for the current section glows in accent color; past sections are dimmed; future sections are ghost
- Section labels fade in beside the dot on hover (or always visible on desktop)

**Section waypoints (in order):**
```
Hero → Platform → Chatbot → Site Search → Policy Vault
→ Channels → Features → Pipeline → RAG → Security
→ Leads → Analytics → Pricing → Get Started
```

**Implementation notes:**
- Use `useScrollProgress` hook that returns a 0–1 value from `window.scrollY`
- Calculate section entry points as percentages of total document height
- Trail fill: CSS `scaleY` transform with `transform-origin: top`, driven by scroll value
- Dot activation: compare current scroll% against each waypoint threshold
- On mobile (<768px): hide the trail, show a minimal top progress bar instead

---

## 7. Animation System

All animations use Framer Motion. Every scroll-triggered reveal goes through the `SectionReveal.tsx` wrapper.

### 7.1 Entry Variants
```typescript
// Standard section reveal
const revealVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

// Stagger children
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Hero headline word-by-word
const wordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

### 7.2 Floating Orbs (`FloatingOrb.tsx`)
Decorative ambient blobs. Use SVG radial gradients, absolutely positioned, with a slow idle animation (Framer Motion `animate` loop):
```typescript
animate={{ 
  scale: [1, 1.08, 1], 
  x: [0, 12, 0], 
  y: [0, -8, 0] 
}}
transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
```
Place 1–2 per major section. Colors: brand accent (`#6EE7B7` mint-teal) and secondary (`#818CF8` indigo). Keep `opacity: 0.15–0.25` so they never fight the content.

### 7.3 Reduced Motion
```typescript
const prefersReducedMotion = useReducedMotion() // Framer Motion hook
// Wrap all variants: if prefersReducedMotion, use { opacity: 0 } → { opacity: 1 } only
```

---

## 8. Styling Rules

See `FRONTEND-DESIGN.SKILL.md` for the complete token system.

**Quick rules for Claude Code:**
1. Never hardcode a color. Always use a CSS variable from `globals.css`.
2. Never use `Inter` as a font — fonts are specified in FRONTEND-DESIGN.SKILL.md.
3. Section padding: `py-24 md:py-32` as default. Hero: `pt-32 pb-24`.
4. Max content width: `max-w-6xl mx-auto px-6`.
5. No generic purple gradients. The accent usage is defined in the design skill.
6. All interactive elements have `:focus-visible` styles.
7. Buttons: defined variants only — `primary`, `secondary`, `ghost`. No ad-hoc button styles.

---

## 9. Component Authoring Rules

1. Every component file exports a single default export.
2. Client components must have `'use client'` as the first line.
3. Demo components (`ChatbotDemo`, `SiteSearchDemo`, `PolicyVaultDemo`) are always client components, always lazy-loaded.
4. Props interfaces are defined inline above the component using TypeScript `interface`.
5. No inline styles except for dynamic values (e.g. scroll progress percentage).
6. Framer Motion `motion.div` replaces plain `div` only when animation is needed — don't wrap everything.

---

## 10. Routing & Pages

This is a **single-page marketing site**. All content lives in `app/page.tsx`.

Internal anchor links use `#section-id`. Every major section component must accept and forward a `id` prop to its root element for anchor targeting.

Section IDs:
```
#hero, #platform, #chatbot-demo, #search-demo, #vault-demo,
#channels, #features, #pipeline, #rag, #security,
#leads, #analytics, #roadmap, #pricing, #get-started
```

---

## 11. Environment Variables

```env
# Not needed for static marketing site — demos are scripted, no live API calls
# If a contact/demo form is added later:
# NEXT_PUBLIC_FORM_ENDPOINT=
```

---

## 12. Build & Dev Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # ESLint
npm run type-check # tsc --noEmit
```

Enforce no TypeScript errors before any commit. Run `npm run type-check` after each major component addition.

---

## 13. Do Not Do List

- ❌ Do not add placeholder lorem ipsum text anywhere. All copy is in §4.
- ❌ Do not use `<img>` — use `next/image` always.
- ❌ Do not use `useEffect` for data fetching in demo components — all demo data is local scripts.
- ❌ Do not add a blog section — it's in the footer as a link only.
- ❌ Do not add a testimonials section — not in the content.
- ❌ Do not wrap every `div` in Framer Motion — only what needs animation.
- ❌ Do not use `absolute` positioning for layout — only for decorative elements.
- ❌ Do not import from `@/components/ui` (shadcn) — build UI primitives from scratch per the design system.
