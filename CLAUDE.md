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
│   ├── play-area/      ← demo page (blank white placeholder where the widget will go)
│   ├── chat-agent/     ← Solutions → AI Chat Agent
│   ├── site-search/    ← Solutions → Site Search
│   ├── policy-vault/   ← Solutions → Policy Vault
│   ├── integrations/   ← Integration page
│   ├── blogs/          ← placeholder until the blog is designed
│   ├── privacy/page.tsx← Privacy Policy (content copied from original)
│   ├── terms/page.tsx  ← Terms of Service (content copied from original)
│   └── globals.css     ← design tokens + base utilities + .legal-prose
├── components/
│   ├── site/
│   │   ├── Navbar.tsx    ← Play Area · Solutions ▾ · Integration · Blogs
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
│       └── ChannelIcons.tsx    ← brand SVG channel logos
└── public/
    ├── logo.png
    └── assets/ ← per-page Figma exports (play-area/, chat-agent/, site-search/,
                  policy-vault/, integration/, shared/) + add-on icons, cta-pattern.png
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
- Keep dependencies minimal (next + react only). Do not re-add animation,
  icon, or state libraries unless the design truly needs them.
```

## 4. Commands

- `npm run dev` — local dev
- `npm run build` — production build (must pass)
- `npm run lint` — eslint
