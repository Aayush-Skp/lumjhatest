# CLAUDE.md — Lumjha Website

> Single source of truth for working on the Lumjha marketing website.

## 1. Project Identity

**Product:** Lumjha — a no-code AI agent platform
**Tagline:** Never Miss a Customer. Grow While You Sleep.
**Live app:** https://app.lumjha.ai/login
**Design:** Figma landing (dark navy `#030816`, accent blue `#527DFF`).

## 2. Repository Structure

```
lumjha-website/
├── app/
│   ├── layout.tsx      ← root layout (Inter fonts, dark theme default)
│   ├── page.tsx        ← main landing page (Figma design)
│   ├── play-area/      ← Lumjha Play: demo chat + document upload (components/site/PlayDemo.tsx)
│   ├── api/playground/ ← server routes forwarding Play uploads/status to the Lumjha API (key stays server-side)
│   ├── pricing/        ← Pricing page: plans, AI engine flow, conversation rules, usage alerts, API, comparison matrix, FAQ
│   ├── chat-agent/     ← Solutions → AI Chat Agent
│   ├── site-search/    ← Solutions → Site Search
│   ├── policy-vault/   ← Solutions → Policy Vault
│   ├── integrations/   ← Integration page
│   ├── blogs/          ← blog: posts.ts (static posts) → listing + [slug] article pages
│   ├── admin/          ← /admin panel (login, pricing + blog editors); actions.ts = server actions
│   ├── privacy/page.tsx← Privacy Policy (content copied from original)
│   ├── terms/page.tsx  ← Terms of Service (content copied from original)
│   └── globals.css     ← design tokens + base utilities + .legal-prose
├── components/
│   ├── site/
│   │   ├── Navbar.tsx    ← Play Area · Solutions ▾ · Pricing · Integration · Blogs
│   │   ├── PricingPlans.tsx ← Monthly/Annual switch + the four plan cards (data: lib/content/pricing.ts)
│   │   ├── WaveLines.tsx ← simple code-drawn line backdrop (Pricing page band)
│   │   ├── Footer.tsx    ← shared footer (Privacy/Terms wired)
│   │   ├── FooterWordmark.tsx ← outlined "Lumjha" + cursor torch (footer copy of the showcase piece)
│   │   ├── ProductSections.tsx ← product-page template: hero, intro split, steps, benefits, FAQ
│   │   ├── SectionHeader.tsx   ← shared section title + SECTION_Y / SECTION_HEAD_GAP rhythm
│   │   ├── CtaPanel.tsx        ← "Ready to Scale" blue panel (every page)
│   │   ├── ChannelReels.tsx    ← animated channel-logo slot reels
│   │   ├── WaveGlow.tsx        ← canvas port of Figma's "Glowing wave" shader
│   │   └── LegalPage.tsx ← Figma-styled shell for legal pages
│   ├── showcase/
│   │   └── LumjhaSpotlight.tsx ← preserved hover-torch wordmark (unused, for later)
│   └── ui/
│       ├── BlueButton.tsx      ← pill CTA (solid / outline / white)
│       ├── ThemeToggle.tsx     ← dark/light switch (navbar), persists to localStorage
│       └── ChannelIcons.tsx    ← brand SVG channel logos (incl. Messenger, Viber)
└── public/
    ├── logo.png
    └── assets/ ← per-page Figma exports (play-area/, chat-agent/, site-search/,
                  policy-vault/, integration/, shared/) + add-on icons,
                  included.svg (plan check icon), cta-pattern.png
```

## 3. Rules

- This is the Figma-exact marketing site. Match the Figma: dark bg, blue
  highlights, white cards for pricing/add-ons, blue CTA panel, black footer.
- `components/showcase/` is intentionally **not** wired into any route —
  keep it dependency-free so it can be dropped in later.
- Legal page bodies are verbatim copies; style them only via
  `components/site/LegalPage.tsx` + `.legal-prose` in `globals.css`.
- Dark is the Figma default; light theme is driven by `[data-theme="light"]`.
  Use the site tokens (`bg-page`, `bg-page-deep`, `text-ink`, `text-muted`,
  `text-subtle`, `border-line`, `bg-surface`, `bg-band`, …) from `globals.css`
  instead of hardcoded dark hexes, so new sections theme automatically.
  Text on blue cards/buttons stays `text-white`. Light-only tweaks: `light:`.
  (The Pricing page still uses hard-coded colours + `light:` partners.)
- Keep dependencies minimal (next + react only). Do not re-add animation,
  icon, or state libraries unless the design truly needs them.
```

## 4. Lumjha Play environment

The Play upload talks to the Lumjha API through `app/api/playground/*` (server-side):

- `LUMJHA_PLAYGROUND_KEY` — the API's `PLAYGROUND_API_SECRET` (required; never `NEXT_PUBLIC_`)
- `LUMJHA_API_URL` — defaults to `https://api.lumjha.ai`; also the widget's `data-api-host` on the sample site
- `LUMJHA_APP_HOST` — where `agent-widget.js` and the chat page live; defaults to `https://app.lumjha.ai`
  (must match the API's `WIDGET_APP_HOST`)
- `LUMJHA_CHAT_API_URL` — defaults to `https://chat-api.lumjha.ai`
- `LUMJHA_PLAY_DEMO_AGENT` — subdomain of the demo agent shown before an upload (default `bedrocktest`)
- For staging, point all four at staging (e.g. `LUMJHA_APP_HOST=https://stg.app.lumjha.ai`).
- `app/play-area/preview` is the sample website Play frames; the real widget runs inside it.
  With `?site=` it frames a visitor's own site instead. `api/playground/frame-check`
  decides whether that site allows framing; it only fetches public addresses on ports 80/443.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — optional Cloudflare Turnstile
- Bump `PLAYGROUND_CONSENT_VERSION` in `lib/playground.ts` whenever the upload notice text changes.

## 5. Admin panel (/admin)

- Sign-in: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (signs the session cookie).
  Logic in `lib/admin/session.ts`; every admin page and server action calls `requireAdmin()`.
- Data: Supabase over its REST API (`lib/admin/supabase.ts`, no SDK) with `SUPABASE_URL` +
  `SUPABASE_SERVICE_ROLE_KEY` (server-only). Tables: `supabase/schema.sql`.
- `lib/admin/content.ts` reads Supabase, falling back to the built-in data
  (`lib/content/pricing.ts`, `app/blogs/posts.ts`). The first save into an empty table copies the
  built-in data in first, so no plan/post goes missing. Public pages still read the built-in data.
- `/admin` redirects to `/admin/pricing` (no overview page, no Supabase status UI by design).
- Blog bodies are edited as text (`lib/content/blog-format.ts`: `## `, `- `, `> `, ``` fences).

## 6. Commands

- `npm run dev` — local dev
- `npm run build` — production build (must pass)
- `npm run lint` — eslint
