---
name: Lumjha AI
description: Never Miss a Customer. Grow While You Sleep.
colors:
  lumjha-blue: "#527DFF"
  lumjha-blue-deep: "#3E63F2"
  panel-blue: "#5675FF"
  highlight: "#6E97FF"
  night-navy: "#030816"
  product-black: "#090A0F"
  surface: "#0B1428"
  menu: "#0B0D14"
  band: "#000000"
  glow: "#1B3AA0"
  ink: "#FFFFFF"
  headline: "#EAEAEE"
  muted: "#D1D5DB"
  subtle: "#9CA3AF"
  nav-link: "#B4BCCB"
  line: "rgba(255, 255, 255, 0.1)"
  focus-ring: "#38B6FF"
  exclusive-yellow: "#FFD21B"
  page-light: "#F4F7FD"
  ink-light: "#0B1526"
  muted-light: "#475569"
  subtle-light: "#64748B"
  band-light: "#E9EEF8"
  card-ring-light: "#D7E3F5"
  glow-light: "#8FB0FF"
  focus-ring-light: "#1276BC"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "clamp(2.25rem, 4vw + 1rem, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Poppins, Inter, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.375
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"cv02\", \"cv03\", \"cv04\", \"cv11\""
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "14.4px"
  card: "18px"
  xl: "20px"
  panel: "24px"
  pill: "9999px"
spacing:
  gutter-sm: "16px"
  gutter: "24px"
  head-gap-sm: "40px"
  section-sm: "48px"
  head-gap: "56px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.lumjha-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  button-primary-large:
    backgroundColor: "{colors.lumjha-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.lumjha-blue-deep}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  button-on-blue:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.lumjha-blue-deep}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  cta-panel:
    backgroundColor: "{colors.panel-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  menu-panel:
    backgroundColor: "{colors.menu}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "8px"
  tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
---

# Design System: Lumjha AI

## Overview

**Creative North Star: "The Night Shift"**

Lumjha's site is a deep navy night (`night-navy`) where blue signals switch on: the agent working while the business sleeps. Darkness is the resting state, and Lumjha Blue is the light that shows something is answering. Glows are soft, blue-tinted and ambient, like monitors in a dark room, never neon. The page should feel switched on and confident without raising its voice.

The system balances four moods at once: **confident and luminous** (heavy display type, glowing blue CTAs), **calm and trustworthy** (generous section rhythm, centered headers, no clutter), **precise and technical** (exact quotes, sources, mono for code and API), and **friendly and approachable** (pill shapes, rounded cards, plain words). When they pull against each other, calm wins over loud and precision wins over decoration.

Dark is the Figma default; a light theme (`[data-theme="light"]`) flips page, ink and line colors. Brand blue, blue panels and white-on-blue text stay the same in both themes.

**Key Characteristics:**
- Deep navy canvas with one blue accent family, never a second hue for decoration.
- Pill CTAs with a blue-tinted glow; white pills when sitting on blue.
- Poppins for section and product headlines, Inter for everything else, JetBrains Mono for code.
- Soft, large ambient blur pools (120px) behind heroes and headers.
- Every page closes with the blue "Ready to Scale" panel on a white topographic band, then a black footer.

## Colors

A single blue family on near-black navy; color means "this is live / act here".

### Primary
- **Lumjha Blue** (#527DFF): primary CTAs, links, active states, focus of attention. The one color the visitor should follow.
- **Lumjha Blue Deep** (#3E63F2): hover state for Lumjha Blue, text on white pills, and the highlight color in the light theme.
- **Panel Blue** (#5675FF): solid blue fills and accents on product pages (step badges, accent text, tinted hovers at 8–10%).
- **Highlight** (#6E97FF): the light-blue word inside a white headline on dark pages.

### Neutral
- **Night Navy** (#030816): home and legal page background. Light theme: Page Light (#F4F7FD).
- **Product Black** (#090A0F): product page background (Chat Agent, Site Search, Policy Vault).
- **Surface** (#0B1428): dark tiles and glass cards. White in the light theme.
- **Menu** (#0B0D14): dropdowns and embedded demo frames.
- **Band** (#000000): footer and wave band. Light theme: Band Light (#E9EEF8).
- **Glow** (#1B3AA0): ambient blurred pools behind heroes and headers. Light theme: Glow Light (#8FB0FF) at low opacity.
- **Ink** (#FFFFFF): headings and primary copy. Light theme: Ink Light (#0B1526).
- **Headline** (#EAEAEE): product hero headlines, a half-step softer than ink.
- **Muted** (#D1D5DB) / **Subtle** (#9CA3AF): secondary and tertiary copy, footer text. Light theme: #475569 / #64748B.
- **Nav Link** (#B4BCCB): resting navbar links; they rise to ink on hover and when active.
- **Line** (white at 10%): hairline borders and dividers. Light theme: ink at 10%; white cards add Card Ring Light (#D7E3F5).

### Tertiary
- **Exclusive Yellow** (#FFD21B): only the tiny "exclusive" tag on pricing features. Never a surface or text color.

### Named Rules
**The One Blue Rule.** Accent color comes only from the blue family. No purple, teal or gradient rainbows for decoration; yellow is limited to the exclusive tag.

**The Token-First Rule.** Page, ink, muted, subtle, line, surface and band come from the site tokens (`bg-page`, `text-ink`, `border-line`, …), so new sections theme automatically. Text on blue stays white in both themes.

## Typography

**Display Font:** Inter (with system-ui) for the home hero
**Headline Font:** Poppins 600/700 (with Inter) for section titles and product heroes
**Body Font:** Inter (with system-ui), stylistic sets cv02/cv03/cv04/cv11
**Mono Font:** JetBrains Mono for code samples and API snippets

**Character:** Poppins' round geometry makes headlines feel friendly and sure of themselves; Inter keeps body copy neutral and precise. Mono appears only where the content really is code.

### Hierarchy
- **Display** (800, clamp 2.25rem → 4.5rem, 1.05, −0.03em): the home hero only.
- **Headline** (Poppins 600, clamp 2.25rem → 3.75rem, 1.12): product page heroes, balanced wrapping.
- **Title** (Poppins 700, 28px mobile → 44px desktop, 1.25): every section header, centered, with a supporting line at 15px → 20px in ink at 85%.
- **Card Title** (Inter 700, 19px, 1.375): benefit and step cards.
- **Body** (Inter 400, 15px, 1.625): paragraphs; supporting lines max ~66rem wide, balanced.
- **Label** (Inter 600, 13–14px): nav menu items, buttons, toggles. Uppercase tracked labels are reserved for table headers.

### Named Rules
**The Two-Voice Rule.** Poppins speaks for headlines, Inter for everything else. Inter Tight is loaded but unused; don't introduce it or a third display face.

## Layout

Content sits in a centered container up to 1440px wide with 16px gutters on mobile and 24px from `sm`. Narrower inner measures (1040–1160px) hold text-heavy grids. Every content section uses the same vertical rhythm: 48px top/bottom on mobile, 72px from `md`, with a 40px (mobile) / 56px (desktop) gap between a section header and its content (`SECTION_Y`, `SECTION_HEAD_GAP`). Section headers are centered; content below may split into two columns or grids. The navbar is sticky (64px; 76px on desktop) and anchors land just below it.

### Named Rules
**The Shared Rhythm Rule.** New sections use `SECTION_Y` and `SECTION_HEAD_GAP` from `SectionHeader.tsx` rather than their own padding, so gaps match site-wide.

## Elevation & Depth

Depth is light, not stacking. On dark, elements lift with blue-tinted glows (Lumjha Blue at 50–70% in a long, negative-spread shadow) and large 120px blur pools of Glow behind heroes. On light, glows drop to neutral slate shadows with a faint blue tint, and glow pools fade to a soft tint, so nothing reads as a smudge.

### Shadow Vocabulary
- **CTA glow** (`box-shadow: 0 8px 30px -6px rgba(82,125,255,0.7)`): primary pill buttons on dark.
- **Card halo** (`box-shadow: 0 24px 60px -20px rgba(82,125,255,0.6)`): blue cards and featured demo frames.
- **Menu drop** (`box-shadow: 0 24px 60px -12px rgba(0,0,0,0.35)`): dropdown panels.
- **Light lift** (`box-shadow: 0 18px 40px -28px rgba(15,23,42,0.25)`): cards in the light theme.

### Named Rules
**The Glow-Not-Shadow Rule.** On dark, lift comes from blue light, never from black drop shadows. In the light theme, use soft neutral shadows instead; never a blue glow on a light page.

## Shapes

Friendly, rounded geometry. Actions and chips are full pills; cards and menus use gently curved 20px corners (pricing cards 18px); the closing CTA panel is the softest at 24px. Small badges use 4px; the secondary contact button uses 8px. Borders are 1px hairlines in Line; a featured card earns a 2px Lumjha Blue border.

## Components

### Buttons
Confident, glowing pills.
- **Shape:** full pill (9999px).
- **Primary:** Lumjha Blue fill, white semibold text, a trailing → arrow, CTA glow. Small 8px × 20px at 13px; large 14px × 32px at 15–16px.
- **Hover / Focus:** fill deepens to Lumjha Blue Deep; global focus is a 2px Focus Ring outline offset 2px.
- **Outline:** 1px Lumjha Blue border at 70%, ink text, arrow; hover tints the fill to 10% blue.
- **On blue:** white pill with Lumjha Blue Deep text; hover dims slightly. The only button on blue panels.

### Chips
- **Billing toggle:** a pill track (#09172B with a #355379 border on dark) holding pill segments; a small "2 months free" chip in pale blue (#EAF3FF / #3756AB).
- **Featured badge:** Lumjha Blue pill centered on the card's top edge.

### Cards / Containers
- **Corner Style:** 20px (pricing 18px, panels 24px).
- **Background:** Surface on dark; white with Card Ring Light on light. Pricing cards use a navy vertical gradient (#101E3B → #0C172D; featured #172A5D → #0D1830).
- **Shadow Strategy:** see Elevation; halo on blue cards, light lift in light theme.
- **Border:** 1px Line or 1px #213653 on pricing; featured gets 2px blue.
- **Internal Padding:** 20–24px.

### Navigation
Sticky top bar: Lumjha Play · Solutions ▾ · Pricing · Integration · Blogs, then theme toggle and sign-in. Links are Inter 16px medium in Nav Link, rising to ink on hover/active with a 300ms ease-out. The Solutions menu is a Menu panel (20px corners, 8px padding, menu drop) whose rows tint to Panel Blue at 8% on hover. On mobile, the menu rows fade in one after another.

### CTA Panel (signature)
"Ready to Scale Your Customer Experience?": a 24px-corner solid blue panel with a white Poppins title, an 85% white supporting line, a white "Start Free Trial" pill and an outlined white "Contact Us" button, sitting on a white band with a topographic line pattern, tilting gently on hover. It closes every page.

### Channel Reels & Engine Flow (signature)
Animated channel-logo slot reels and the sources → one knowledge base → channels diagram on the home hero, connected by pulsing dashed lines. They show the "one system" story; motion stops under reduced motion.

## Do's and Don'ts

### Do:
- **Do** use the site tokens (`bg-page`, `text-ink`, `text-muted`, `border-line`, `bg-surface`, `bg-band`) so sections work in both themes.
- **Do** keep primary actions as Lumjha Blue (#527DFF) pills with an arrow and the CTA glow.
- **Do** use Poppins for section titles via `SectionHeader`, with its shared rhythm.
- **Do** keep text on blue surfaces white in both themes.
- **Do** honor `prefers-reduced-motion`: every loop (reels, marquee, orbit, glow pulse) must come to rest.
- **Do** close every page with the CTA panel and the black footer.

### Don't:
- **Don't** introduce a second accent hue or decorative gradients outside the blue family.
- **Don't** use black drop shadows on dark surfaces or blue glows on light ones.
- **Don't** hardcode dark hexes for page, text or border colors in new sections.
- **Don't** add a third typeface; Inter Tight stays unused.
- **Don't** show testimonials, logos, stats or compliance badges as design filler (see PRODUCT.md).
