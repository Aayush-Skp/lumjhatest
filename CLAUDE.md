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
│   ├── play-area/page.tsx ← Play Area (test-drive page; demo panel is a blank placeholder for now)
│   ├── privacy/page.tsx← Privacy Policy (content copied from original)
│   ├── terms/page.tsx  ← Terms of Service (content copied from original)
│   └── globals.css     ← design tokens + base utilities + .legal-prose
├── components/
│   ├── site/
│   │   ├── Navbar.tsx    ← shared navbar (prefix prop for non-home pages; "/route" links used as-is)
│   │   ├── BlueButton.tsx / SectionHeader.tsx / CtaSection.tsx ← shared page building blocks
│   │   ├── Footer.tsx    ← shared footer (Privacy/Terms wired)
│   │   ├── FooterWordmark.tsx ← outlined "Lumjha" + cursor torch (footer copy of the showcase piece)
│   │   └── LegalPage.tsx ← Figma-styled shell for legal pages
│   ├── showcase/
│   │   └── LumjhaSpotlight.tsx ← preserved hover-torch wordmark (unused, for later)
│   └── ui/
│       └── ChannelIcons.tsx    ← brand SVG channel logos
└── public/
    ├── logo.png
    └── assets/ ← site-search.svg, policy-vault.svg, bundle.svg
```

## 3. Rules

- This is the Figma-exact marketing site. Match the Figma: dark bg, blue
  highlights, white cards for pricing/add-ons, blue CTA panel, black footer.
- `components/showcase/` is intentionally **not** wired into any route —
  keep it dependency-free so it can be dropped in later.
- Legal page bodies are verbatim copies; style them only via
  `components/site/LegalPage.tsx` + `.legal-prose` in `globals.css`.
- Keep dependencies minimal (next + react only). Do not re-add animation,
  icon, or state libraries unless the design truly needs them.
```

## 4. Commands

- `npm run dev` — local dev
- `npm run build` — production build (must pass)
- `npm run lint` — eslint
