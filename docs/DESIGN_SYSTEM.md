# Design System — Monochrome App UI (Light + Dark)

> Extracted from 10 reference screenshots (Dashboard, Billing, Settings, Developer API,
> Image Generation, Video Generation, Pricing, Credit estimator + FAQ).
> Every colour marked **measured** was read pixel-by-pixel from the screenshots.
> Values marked _derived_ (hover, focus, light-mode accent) are not visible in the
> references and were filled in to stay consistent with the measured system.

---

## 1. Design principles

1. **Monochrome first.** The UI is near-black / near-white neutrals. Colour is
   used only for (a) the purple pricing accent and (b) the destructive red.
2. **Flat, border-defined surfaces.** No drop shadows. Cards, inputs and panels
   are the same colour as the page and are separated by a 1px hairline border.
3. **One inverted primary.** The primary button is the "opposite" of the page:
   near-black on light, near-white on dark.
4. **Quiet hierarchy.** Titles are foreground colour; everything secondary
   (descriptions, nav items, icons, placeholders) uses a single muted grey.
5. **Generous whitespace, compact controls.** 80px page gutters, 24px card
   padding, but 36–40px control heights and 14px body text.

---

## 2. Colour tokens

### 2.1 Core neutrals (measured)

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#0D0D0D` | Page, sidebar, cards, inputs, panels |
| `--foreground` | `#0D0D0D` | `#F9F9F9` | Headings, labels, active nav text, values |
| `--muted-foreground` | `#686868` | `#999999` | Descriptions, subtitles, nav items, section labels, placeholders, icons, empty-state text |
| `--border` | `#E1E1E1` | `#222222` | Card, input, select, sidebar divider, row dividers |
| `--input` | `#E1E1E1` | `#222222` | Input / select / textarea borders |
| `--primary` | `#161616` | `#F9F9F9` | Primary button background, colour swatch |
| `--primary-foreground` | `#F9F9F9` | `#161616` | Primary button text + icon |
| `--accent` (nav active) | `#D4D4D4` | `#222222` | Active sidebar item background |
| `--accent-foreground` | `#0D0D0D` | `#F9F9F9` | Active sidebar item text |
| `--surface-raised` | `#F5F5F5` _derived_ | `#151515` | Card footer / action row (Billing "Buy Credits" row) |
| `--surface-header` | `#F5F5F5` _derived_ | `#171717` | Pricing card header block |
| `--empty-icon-bg` | `#EDEDED` _derived_ | `#222222` | Circle behind empty-state icon |

### 2.2 Documentation / prose neutrals (measured — cool slate tint)

The API documentation body text is slightly blue-grey, not pure neutral.

| Token | Light | Dark |
|---|---|---|
| `--prose-body` | `#313947` | `#CBCFD6` |
| `--prose-hr` | `#E1E3E8` | `#313947` |
| `--dropzone-border` | `#CBCFD6` | `#313947` _derived_ |
| `--dropzone-text` | `#616674` | `#999999` _derived_ |

### 2.3 Destructive (measured on dark)

| Token | Light | Dark |
|---|---|---|
| `--destructive` | `#B42318` _derived_ | `#73201D` |
| `--destructive-foreground` | `#FFFFFF` | `#F9F9F9` |
| `--destructive-border` | `#F3C1BD` _derived_ | `#73201D` |

### 2.4 Purple accent — pricing & marketing only (measured on dark)

| Token | Dark value | Used for |
|---|---|---|
| `--brand` | `#BD79F8` | Selected plan border (2px), price-per-credit number in pill |
| `--brand-strong` | `#A44BF1` | Feature check icons |
| `--brand-number` | `#C383FF` | Large mono numbers on credit estimator ("1,000 images") |
| `--brand-eyebrow` | `#6853E3` | "PRICING" eyebrow label (indigo-violet) |
| `--brand-pill-bg` | `#231C29` | Per-credit pill background (≈ brand @ 8% on `#171717`) |
| `--brand-pill-border` | `#572E79` | Per-credit pill border (≈ brand @ 35–40%) |

Light-mode accent _derived_ (keeps ≥ 4.5:1 on white): `--brand #8B3FD9`,
`--brand-strong #7E2FD0`, `--brand-number #8B3FD9`, `--brand-eyebrow #5B45D6`,
`--brand-pill-bg #F4ECFD`, `--brand-pill-border #D9C2F5`.

### 2.5 Opacity-derived states (measured)

Disabled controls are **not** separate colours — they are the normal control at
`opacity: 0.5`. Measured proof on dark: disabled input border `#181818`,
disabled switch track `#181818`, disabled "Add Credits" text `#838383` /
border `#171717` all equal the base token at 50% over `#0D0D0D`.

Fine print (e.g. Billing footnote) is `--foreground` at **70%** (`#B2B2B2` on dark).

### 2.6 Marketing-page variant

The credit-estimator section renders on a marginally deeper canvas:
`--background #0A0A0A`, `--border #262626`, select background `#1A1A1A`,
select border `#282828`, eyebrow/caption grey `#A8A8A8`. Treat it as the same
system; you may use the core tokens instead.

---

## 3. CSS variables (drop-in)

```css
:root {
  --background: #ffffff;
  --foreground: #0d0d0d;
  --muted-foreground: #686868;
  --border: #e1e1e1;
  --input: #e1e1e1;
  --primary: #161616;
  --primary-foreground: #f9f9f9;
  --accent: #d4d4d4;
  --accent-foreground: #0d0d0d;
  --hover: #f2f2f2;              /* derived */
  --surface-raised: #f5f5f5;     /* derived */
  --surface-header: #f5f5f5;     /* derived */
  --empty-icon-bg: #ededed;      /* derived */
  --ring: #0d0d0d;               /* derived */

  --prose-body: #313947;
  --prose-hr: #e1e3e8;
  --dropzone-border: #cbcfd6;
  --dropzone-text: #616674;

  --destructive: #b42318;        /* derived */
  --destructive-foreground: #ffffff;
  --destructive-border: #f3c1bd; /* derived */

  --brand: #8b3fd9;              /* derived */
  --brand-strong: #7e2fd0;       /* derived */
  --brand-number: #8b3fd9;       /* derived */
  --brand-eyebrow: #5b45d6;      /* derived */
  --brand-pill-bg: #f4ecfd;      /* derived */
  --brand-pill-border: #d9c2f5;  /* derived */

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-display: "Satoshi", "General Sans", "Inter", ui-sans-serif, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

[data-theme="dark"] {
  --background: #0d0d0d;
  --foreground: #f9f9f9;
  --muted-foreground: #999999;
  --border: #222222;
  --input: #222222;
  --primary: #f9f9f9;
  --primary-foreground: #161616;
  --accent: #222222;
  --accent-foreground: #f9f9f9;
  --hover: #171717;              /* derived */
  --surface-raised: #151515;
  --surface-header: #171717;
  --empty-icon-bg: #222222;
  --ring: #f9f9f9;               /* derived */

  --prose-body: #cbcfd6;
  --prose-hr: #313947;
  --dropzone-border: #313947;    /* derived */
  --dropzone-text: #999999;      /* derived */

  --destructive: #73201d;
  --destructive-foreground: #f9f9f9;
  --destructive-border: #73201d;

  --brand: #bd79f8;
  --brand-strong: #a44bf1;
  --brand-number: #c383ff;
  --brand-eyebrow: #6853e3;
  --brand-pill-bg: #231c29;
  --brand-pill-border: #572e79;
}

html { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
}
```

### Tailwind v4 mapping

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-hover: var(--hover);
  --color-surface-raised: var(--surface-raised);
  --color-surface-header: var(--surface-header);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-brand: var(--brand);
  --color-brand-strong: var(--brand-strong);
  --color-ring: var(--ring);
  --font-sans: var(--font-sans);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

---

## 4. Typography

Three families:

- **Sans (UI/body):** Inter-style neo-grotesk. All body, labels, nav, buttons.
- **Display (headings):** geometric grotesk with tight tracking: page titles, H1/H2,
  empty-state title, workspace panel title. The exact face isn't identifiable
  from screenshots; Satoshi / General Sans are the closest free matches.
- **Mono:** credit numbers, per-credit price, eyebrows, model meta text.

| Role | Family | Size / line-height | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| Marketing H1 ("Pay as you go, or subscribe") | display | 40 / 48 | 700 | -0.02em | foreground |
| Marketing H2 ("Frequently Asked Questions") | display | 40 / 48 | 700 | -0.02em | foreground |
| Eyebrow ("PRICING") | mono | 12 / 16 | 500 | 0.2em, UPPERCASE | brand-eyebrow |
| Hero subtitle | sans | 18 / 28 | 400 | 0 | muted |
| Page title ("Developer API", "Billing") | display | 24 / 32 | 700 | -0.01em | foreground |
| Page subtitle | sans | 16 / 24 | 400 | 0 | muted |
| Card title ("Your API Keys") | sans | 18 / 28 | 600 | -0.005em | foreground |
| Card description | sans | 14 / 20 | 400 | 0 | muted |
| Docs H2 ("Introduction") | sans | 20 / 28 | 600 | 0 | foreground |
| Docs body | sans | 14 / 24 | 400 | 0 | prose-body |
| Workspace panel title ("Image Generation") | sans | 20 / 28 | 700 | 0 | foreground |
| Workspace section ("Generation Settings") | sans | 18 / 28 | 600 | 0 | foreground |
| Field label ("Key Name (Optional)") | sans | 14 / 20 | 500 | 0 | foreground |
| Body / input text | sans | 14 / 20 | 400 | 0 | foreground |
| Placeholder | sans | 14 / 20 | 400 | 0 | muted |
| Nav item | sans | 14 / 20 | 400 (500 active) | 0 | muted (active: accent-fg) |
| Sidebar section ("IMAGE", "MENU") | sans | 12 / 16 | 500 | 0.02em, UPPERCASE | muted |
| Small label ("EXTRA CREDITS") | sans | 12 / 16 | 500 | 0.05em, UPPERCASE | muted |
| Fine print / hint | sans | 12 / 16 | 400 | 0 | foreground/70 or muted |
| Plan name ("PRO") | sans | 13 / 16 | 500 | 0.08em, UPPERCASE | muted |
| Plan price ("$15") | sans | 28 / 32 | 700 | -0.01em | foreground |
| Price unit ("/month") | sans | 14 / 20 | 400 | 0 | muted |
| Estimator number ("1,000") | mono | 32 / 36 | 500 | -0.02em | brand-number |
| Estimator unit ("images") | sans | 16 / 24 | 600 | 0 | foreground |
| Estimator eyebrow ("IMAGE GENERATE") | mono | 11 / 16 | 500 | 0.15em, UPPERCASE | muted |
| Model meta ("1 credit per second") | mono | 11 / 14 | 400 | 0 | muted |
| FAQ question | sans | 16 / 24 | 500 | 0 | foreground |
| Empty-state title ("No Content Yet") | display | 20 / 28 | 700 | -0.01em | foreground |
| Header credits ("0 Credits") | sans | 14 / 20 | 500 | 0 | foreground |

Inline emphasis inside muted text (e.g. "the **Pay as you go** plan") uses
weight 600 and `--foreground`.

---

## 5. Spacing & layout

Base unit **4px**. Scale used: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.

### 5.1 App shell (Dashboard / Billing / Settings / Developer API)

```
┌──────────────┬──────────────────────────────────────────────┐
│ Sidebar 256  │  Top bar (h 56): ………………… "0 Credits"  ☀/☾      │
│ border-r 1px │                                              │
│              │  ← 80px →  Page title (24)                   │
│ [⇤] collapse │            Page subtitle (16, muted)         │
│ IMAGE        │            ↓ 24px                            │
│  ✦ Generate ⓘ│            ┌ Card ───────────────────────┐   │
│  ⤢ Upscale  ⓘ│            │ 24px padding                │   │
│  ✎ Edit     ⓘ│            └─────────────────────────────┘   │
│ VIDEO        │            ↓ 32px                            │
│ MENU         │            ┌ Card ───────────────────────┐   │
│  ▦ Dashboard │            …                    ← 80px →     │
└──────────────┴──────────────────────────────────────────────┘
```

| Element | Value |
|---|---|
| Sidebar width | 256px, `border-right: 1px solid var(--border)`, same bg as page |
| Sidebar padding | 12–16px horizontal, 16px top |
| Collapse button | top-right of sidebar, 20px icon, muted |
| Section label → first item | 12px |
| Section group gap | 24px |
| Nav item | height 36px, radius 4px, padding 0 8px, gap 12px icon→label, 2px between items |
| Nav item trailing ⓘ | 18px circle-info icon, muted, right-aligned |
| Top bar | height 56px, right-aligned cluster: credits text + 20px theme icon, gap 24px, right padding 24px |
| Content gutter | 80px left and right (from sidebar border / viewport edge) |
| Content top | page title starts ~80px from top of viewport |
| Page header → first card | 24px |
| Card → card | 32px |
| Card padding | 24px |
| Card title → description | 4px |
| Description → body | 24px |
| Label → control | 8px |
| Control → helper text | 8px |
| Input + button row gap | 8px |

### 5.2 Workspace (Image / Video Generation)

| Element | Value |
|---|---|
| Top bar | height ~70px, back icon `⇤` left (20px), credits + theme toggle right |
| Workspace frame | 1px border, radius 4px, inset 2–10px from viewport |
| Canvas | flex-1, page bg, illustration centred (~240px) |
| Settings panel | 400px wide, `border-left: 1px solid var(--border)`, padding 16px |
| Panel collapse icon | top-right, 20px muted |
| Panel title | centred, 20px bold + 18px info icon, 48px below panel top |
| Field block gap | 32px between fields |
| Two-up fields | 2 columns, 12px gap (Aspect Ratio / Resolution) |

### 5.3 Marketing pages

| Element | Value |
|---|---|
| Container | max-width 1128px, centred |
| Nav bar | height 54px; wordmark left (18px bold uppercase), links 14px at 40px gap; "Dashboard" primary button right |
| Eyebrow → H1 | 16px; H1 → subtitle 8px; subtitle → cards 40px |
| Pricing grid | 4 columns, 16px gap |
| Footnote under grid | 14px muted, centred, max-width ~760px, 32px above |
| Estimator grid | 5 columns of 212px, 16px gap |
| FAQ column | max-width 872px, centred; H2 → list 64px |
| Section gap | 120px |

### 5.4 Breakpoints

| Name | Min width | Behaviour |
|---|---|---|
| `sm` | 640px | |
| `md` | 768px | Sidebar becomes off-canvas drawer below this; gutter 16px |
| `lg` | 1024px | Pricing 2 → 4 columns; workspace panel stacks under canvas below |
| `xl` | 1280px | Full 80px gutters |

---

## 6. Radius, borders, elevation

| Token | Value | Applied to |
|---|---|---|
| `--radius-sm` | 4px | Nav items, workspace frame, destructive button |
| `--radius-md` | 6px | Buttons, inputs, selects, textareas |
| `--radius-lg` | 8px | Cards, danger-zone box, dropzone |
| `--radius-xl` | 12px | Pricing plan cards, estimator cards |
| `--radius-full` | 9999px | Pills, switch, empty-state icon circle |

- **Border width:** 1px everywhere. Exceptions: selected pricing card **2px**
  `--brand`; image dropzone **2px dashed** (6px dash / 4px gap).
- **Dashed panel** (Dashboard empty canvas): 1px dashed `--border`, 3px dash / 2px gap.
- **Elevation:** none. No box-shadows on cards, buttons or inputs. Depth comes
  only from `--surface-raised` / `--surface-header` fills.

---

## 7. Iconography

- Style: outline, 1.5px stroke, rounded caps/joins (Lucide-compatible).
- Sizes: **16px** in buttons and inline; **18px** for info `ⓘ`; **20px** for nav and top-bar icons.
- Colour: `--muted-foreground` by default; `currentColor` inside buttons.

| Usage | Lucide name |
|---|---|
| Generate | `sparkles` |
| Upscale | `scan` / `maximize` |
| Edit | `pencil` |
| Dashboard | `layout-dashboard` |
| Billing | `credit-card` |
| Settings | `settings` |
| Developer API | `server` |
| Homepage | `house` |
| Info | `circle-info` |
| Sidebar collapse | `panel-left` / `panel-right` |
| Back | `arrow-left-to-line` |
| Theme | `sun` (light), `moon-star` (dark) |
| Upload | `cloud-upload` |
| Add key | `circle-plus` |
| Reset | `refresh-cw` |
| Logout | `log-out` |
| Delete | `trash-2` |
| Check (pricing) | `check` in `--brand-strong` |
| Chevrons | `chevron-down`, `chevron-right` (16px) |
| Empty state | `image` in a 80px circle |

---

## 8. Components

All interactive controls: `transition: background-color, border-color, color, opacity 150ms ease`.
Focus: `outline: 2px solid var(--ring); outline-offset: 2px` (_derived_).

### 8.1 Button

| Variant | Background | Text | Border | Example |
|---|---|---|---|---|
| **primary** | `--primary` | `--primary-foreground` | none | Generate New Key, Logout, Buy Credits, Save, Dashboard |
| **outline** | transparent | `--foreground` | 1px `--border` | Upgrade, Reset, Choose File/Image |
| **destructive** | `--destructive` | `--destructive-foreground` | none | Delete Account |
| **ghost** | transparent | `--muted-foreground` | none | Icon buttons (collapse, theme, back) |

| Size | Height | Padding-x | Font | Icon gap |
|---|---|---|---|---|
| `sm` | 32px | 12px | 12px / 500 | 6px |
| `md` (default) | 40px | 16px | 14px / 500 | 8px |
| `icon` | 32×32 | — | — | 20px icon |
| `block` | 40px, width 100% | — | 14px / 500 | — |

States (_derived_): primary hover `opacity: .9`; outline/ghost hover `background: var(--hover)`;
disabled `opacity: .5; pointer-events: none`.

```html
<button class="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
  <CirclePlus class="size-4" /> Generate New Key
</button>
```

### 8.2 Text input / Select / Textarea

| Property | Value |
|---|---|
| Height | 40px (textarea min 140px, resizable) |
| Padding | 0 12px (textarea 12px) |
| Background | `--background` |
| Border | 1px `--input`, radius 6px |
| Text | 14px `--foreground`; placeholder `--muted-foreground` |
| Focus | border `--foreground` at 40% + ring (_derived_) |
| Disabled | opacity .5 |
| Prefix | "$" inside field, muted, 8px gap (Refill amount) |

**Select** adds a 16px `chevron-down` (muted) at 12px from the right. A select
can carry **inline meta**: primary value 14px foreground + secondary 12px muted
("Max Turbo · 4 credits per second"). A **navigation select** (Model picker)
uses `chevron-right` and opens a sheet/list.

**Colour-swatch select** (Aspect Ratio): 28×18 rounded-sm swatch filled with
`--primary`, then the value.

### 8.3 Card

```
┌ border 1px --border, radius 8px, bg --background ────────────┐
│ 24px  Title 18/600                                           │
│       Description 14 muted                                   │
│       ↓ 24px                                                 │
│       Content                                                │
├──────────────────────────────────────────────────────────────┤  ← optional footer
│ 12px 24px  bg --surface-raised, border-top 1px --border      │
│            [Buy Credits]                                     │
└──────────────────────────────────────────────────────────────┘
```

Empty card body: centred muted 16px text, 64px vertical padding
("No API keys found. Generate one above to get started.").

### 8.4 Settings row (Settings page)

Two-column row: left column (≈ 40%) title 18/600 + muted 14px description;
right column the control. Rows separated by 1px `--border` with 24px above/below.
No card around the rows.

### 8.5 Danger zone

| Property | Value |
|---|---|
| Box | 1px `--destructive-border`, radius 8px, padding 16px |
| Title | "Are you sure?" 14px/500 foreground |
| Body | 14px muted, 8px below title |
| Action | destructive button, 36px tall, radius 4px, `trash-2` icon, 16px below body |

### 8.6 Sidebar nav item

| State | Background | Text | Icon |
|---|---|---|---|
| default | transparent | muted | muted |
| hover (_derived_) | `--hover` | foreground | foreground |
| active | `--accent` | `--accent-foreground` / 500 | `--accent-foreground` |

### 8.7 Switch

Track 44×24 radius-full, off = `--input`, on = `--primary` (_derived_);
thumb 20px `--background`. Disabled at opacity .5, with helper text right-aligned
beneath in 14px muted ("Add a payment method by purchasing credits manually first.").

### 8.8 Dropzone (file upload)

| Property | Value |
|---|---|
| Border | 2px dashed `--dropzone-border`, radius 8px |
| Height | ~255px, content vertically centred |
| Icon | `cloud-upload` 28px muted |
| Text | 14px `--dropzone-text`; leading "Drag and drop" in 600 |
| Button | outline `sm`, 12px below text |
| Hint | 12px muted, 12px below button ("Image or video (max 25 seconds)") |
| Drag-over (_derived_) | border `--foreground`, bg `--hover` |

### 8.9 Empty state (Dashboard)

Full-height panel with 1px dashed `--border`, radius 8px. Centred: 80px circle
`--empty-icon-bg` containing a 32px `image` icon (foreground), 20px gap, title
20px display bold "No Content Yet".

### 8.10 Header credits + theme toggle

`0 Credits` 14px/500 foreground, then a 20px ghost icon button (`sun` in light,
`moon-star` in dark). Toggle writes `data-theme` on `<html>` and persists it.

### 8.11 Pricing plan card

```
┌ radius 12, border 1px --border (selected: 2px --brand) ─┐
│ HEADER  bg --surface-header, padding 32/20, centred     │
│   PRO                          13 / 500 / 0.08em muted   │
│   $15 /month                   28 bold + 14 muted        │
│   ( 1.5¢ per credit )          pill                      │
├─ 1px --border ──────────────────────────────────────────┤
│ BODY  padding 24/20                                     │
│   ✓ 1,000 monthly credits, …   check 16 --brand-strong   │
│   ✓ Extra credits never expire 14px foreground, 12 gap   │
│   …                                                      │
│   (flex spacer)                                          │
│   [ Upgrade ]        outline block                       │
│   [ Add Credits ]    outline block (disabled = .5)       │
└──────────────────────────────────────────────────────────┘
```

- Feature items: 14/20, gap 12px between icon and text, 8–10px between items;
  key numbers in 600 ("**4 jobs** at a time").
- Card height equalised across the row; buttons pinned to the bottom with 8px between them.

**Per-credit pill:** height 26px, padding 0 12px, radius-full, bg
`--brand-pill-bg`, border 1px `--brand-pill-border`; number in mono 13px/600
`--brand`, label 13px muted ("**1.5¢** per credit").

### 8.12 Credit estimator card (marketing)

| Part | Spec |
|---|---|
| Card | 212px wide, radius 12px, border 1px `--border`, overflow hidden |
| Media | 210px tall image/video, object-cover; before/after split uses a 2px white divider |
| Body | padding 16px |
| Eyebrow | mono 11px, 0.15em, uppercase, muted |
| Value | mono 32px `--brand-number` + 16px/600 unit word, 8px gap |
| Caption | 12px muted ("1 credit each") |
| Divider | 1px `--border`, 16px margin |
| Model select | bg `#1A1A1A` (dark) / `#F5F5F5` (light, _derived_), border 1px `#282828`, radius 6px, padding 8px 12px; title 13px/600 foreground, meta mono 11px muted |
| Inline option rows | 32px tall, label 12px muted left, value 12px/500 foreground right + chevron |

### 8.13 FAQ accordion

- Column max-width 872px.
- Row: 57px tall, question 16px/500 foreground, `chevron-down` 16px right.
- Divider 1px `--border` between rows (no box, no top border on first row).
- Open (_derived_): chevron rotates 180°, answer 14/22 muted, 16px bottom padding.

### 8.14 Docs / prose

- Heading `Introduction` 20/600 foreground, 24px above, 16px below.
- Paragraphs 14px / line-height 24px, `--prose-body`, 16px between paragraphs.
- Section separators: 1px `--prose-hr`, 24px margin.
- Inline code (_derived_): mono 13px, bg `--hover`, radius 4px, padding 2px 6px.

### 8.15 Text link

Inherits surrounding colour, `text-decoration: underline`, 1px thickness,
2px offset ("on the pricing page"). Hover (_derived_): `--foreground`.

---

## 9. Motion

| Interaction | Duration | Easing |
|---|---|---|
| Hover / colour changes | 150ms | ease |
| Accordion open/close | 200ms | ease-out (height + chevron rotate) |
| Sidebar collapse | 200ms | ease-in-out (width 256 → 64) |
| Panel collapse (workspace) | 200ms | ease-in-out |
| Theme switch | instant (no cross-fade) |

Respect `prefers-reduced-motion: reduce` by disabling non-essential transitions.

---

## 10. Accessibility

- Contrast (measured tokens): foreground on background ≈ 19:1 both themes;
  muted on background — light `#686868` on `#FFF` ≈ 5.6:1, dark `#999999` on
  `#0D0D0D` ≈ 6.8:1 — both pass AA for body text.
- Disabled content (opacity .5) is exempt but must not be the only signal; pair with helper text.
- Every icon-only button needs `aria-label` (collapse, theme toggle, back, info).
- `ⓘ` info icons are buttons that open a tooltip/popover, not decoration.
- Selected pricing card: don't rely on the purple border alone — also expose
  `aria-current="true"` / "Current plan" text.
- Focus ring must be visible on both themes (`--ring` flips with the theme).

---

## 11. Do / Don't

**Do**
- Use the same colour for page, card and input backgrounds; separate with borders.
- Keep one primary button per card/section; everything else outline or ghost.
- Use mono only for numbers, prices, eyebrows and technical meta.
- Use purple only on pricing/marketing surfaces.

**Don't**
- Add shadows, gradients or glass effects to app surfaces.
- Introduce new greys — pick from `--foreground`, `--muted-foreground`, `--border`, `--accent`, `--surface-*`.
- Use pure `#000` / `#FFF` for dark-theme text or backgrounds (`#0D0D0D` / `#F9F9F9`).
- Colour body text purple or use the destructive red for anything but irreversible actions.

---

## 12. Measurement log

| Token | Light sample | Dark sample | Screenshot |
|---|---|---|---|
| background | `#FFFFFF` | `#0D0D0D` | Developer API (light/dark) |
| foreground (h1, label) | `#0D0D0D` | `#F9F9F9` | Developer API |
| muted (subtitle, nav, placeholder) | `#686868` | `#999999` | Developer API |
| border (card, input, sidebar) | `#E1E1E1` | `#222222` | Developer API |
| primary button | `#161616` / text `#F9F9F9` | `#F9F9F9` / text `#161616` | Developer API |
| active nav | `#D4D4D4` | `#222222` | Developer API |
| prose body / hr | `#313947` / `#E1E3E8` | `#CBCFD6` / `#313947` | Developer API docs |
| dropzone border / text | `#CBCFD6` / `#616674` | — | Video Generation |
| card footer row | — | `#151515` | Billing |
| fine print | — | `#B2B2B2` | Billing |
| destructive bg / border | — | `#73201D` | Settings |
| pricing card header | — | `#171717` | Pricing |
| selected plan border | — | `#BD79F7` (2px) | Pricing |
| pill bg / border / number | — | `#231C29` / `#572E79` / `#BD79F8` | Pricing |
| check icon | — | `#A44BF1` | Pricing |
| eyebrow | — | `#6853E3` | Pricing |
| estimator number | — | `#C383FF` | Credit estimator |
| estimator bg / border / select | — | `#0A0A0A` / `#262626` / `#1A1A1A` | Credit estimator |
| empty-state circle | — | `#222222` | Dashboard |
| card radius | 8px | 8px | Developer API, Settings |
| pricing card radius | — | 12px | Pricing |
