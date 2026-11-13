# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The marketing site serves all four plan audiences equally; no single segment is primary:

- **Solo businesses & consultants** (Starter): want 24/7 answers and leads without hiring.
- **Growing SMBs, e-commerce, clinics** (Growth): more volume, Shopify, CRM/webhooks, Site Search.
- **Multi-location businesses, agencies, high-volume teams** (Pro): several agents, per-location brand kits and lead routing, Policy Vault.
- **Regulated & large organisations** (Enterprise): SSO-gated Policy Vault with audit log, white-label, DPA, SLA.

Each visitor should be able to find their own situation in the site; pages must not assume only one of these buyers.

## Product Purpose

Lumjha AI is a no-code AI agent platform. A business connects its own content (website pages, documents, help center, Google Drive, custom information) once, and Lumjha AI answers customers from it around the clock, captures leads inside the conversation, and books meetings, so no customer goes unanswered. Success means visitors get accurate answers from the business's own content and more of them take the next step (a lead, a booking, a purchase).

## Positioning

- **One knowledge base, three modules.** The same knowledge base runs the AI Chat Agent, AI Site Search, and Policy Vault, live across every channel.
- **Exact-quote Policy Vault.** Answers quote the source passage word for word with the source attached, so anyone can verify them. The pricing comparison treats this as unique among Chatbase, SiteGPT, DocsBot, Tidio, and ChatBot.com.
- **Every messaging channel at the entry price.** WhatsApp, Instagram, Messenger, Telegram, and Viber are included on the $49 Starter plan (one account each), not sold as add-ons.

## Operating Context

- Visitors evaluate through **Lumjha Play** (`/play-area`): a live demo agent, document upload to try their own content, and a preview that can frame the visitor's own site with the real widget.
- Conversion paths: 14-day trial on Starter/Growth/Pro (sign-in at app.lumjha.ai), Contact Us / Book a Demo, and Enterprise via sales (info@lumjha.ai) starting with a paid 30-day pilot credited to the contract.
- Buyers compare Lumjha AI against Chatbase, SiteGPT, DocsBot, Tidio, and ChatBot.com; the pricing page carries a feature and pricing comparison table.
- Pricing and blog content are edited by the team in `/admin` (Supabase), with built-in fallbacks in `lib/content/pricing.ts` and `app/blogs/posts.ts`.

## Capabilities and Constraints

- **Modules:** AI Chat Agent, AI Site Search (included from Growth), Policy Vault (add-on on Growth, PIN-protected on Pro, SSO-gated with audit log on Enterprise).
- **Channels:** website widget (including live voice), WhatsApp, Instagram, Messenger, Telegram, Viber. Integrations: Google Calendar booking, Google Drive, Shopify search and cart, CRM/webhooks; the Integrations page also lists Discord and Slack.
- **Agent features:** form-less lead capture, Google Calendar booking, human handoff inbox / takeover, brand kit (voice, tone, messaging), guardrails, escalation rules, PII masking, reporting with knowledge-gap suggestions, API and MCP access, premium reasoning model (Pro).
- **Billing unit:** conversations, with monthly allowances (500 / 2,000 / 6,000 / custom) and capped auto top-ups. Annual billing = 10× monthly (Growth $99 vs $119); Enterprise is annual-contract only.
- **Terminology:** "Lumjha AI" (product), "AI Chat Agent", "AI Site Search", "Policy Vault", "Lumjha Play" / Play Area, "Knowledge Documents", "conversations", "top-up".
- **Availability varies by plan and setup.** Channel and feature copy stays hedged ("where available", "when configured").
- **Open:** the public comparison table in `app/pricing/page.tsx` disagrees with the plan cards in `lib/content/pricing.ts` (it lists a free plan with 50 replies, Site Search and Policy Vault at +$25, "no annual discount shown", and white-label "not stated") and shows internal research notes ("exists in code, not marketed", "built, unlisted (v2)"). Which source is current is undecided; the plan cards are the more recent, admin-editable source.

## Brand Commitments

- Name: always **"Lumjha AI"** in copy.
- Fixed tagline: **"Never Miss a Customer. Grow While You Sleep."**
- The Figma landing design is the source of truth for the marketing site (per `CLAUDE.md`).
- Logos: `public/logo.png`, `public/assets/logo-wordmark.png`.
- Voice: plain, benefit-led, confident, with careful wording about availability; never overclaims.

## Evidence on Hand

- Live product demo: Lumjha Play with the real widget and a demo agent (`app/play-area`, `components/site/PlayDemo.tsx`).
- Product illustrations and screenshots per page in `public/assets/` (chat-agent, site-search, policy-vault, integration, play-area, shared).
- Plan and pricing data (`lib/content/pricing.ts`), competitor comparison data (`app/pricing/page.tsx`), blog posts (`app/blogs/posts.ts`), and Privacy/Terms pages.
- **Absent; must not be fabricated:** testimonials, customer names or logos, usage statistics, case studies, press, and compliance certifications (no SOC 2, HIPAA, or GDPR certification is claimed; Enterprise offers a DPA). The pricing page has a placeholder for social proof that stays empty until real, approved material exists.

## Product Principles

1. **One system, not three tools.** Show the chat agent, site search, and Policy Vault as one knowledge base serving every channel.
2. **Answers people can verify.** Sources and exact quotes are the trust mechanism; the agent says when it doesn't know instead of making something up.
3. **Full reach from day one.** Messaging channels are part of the entry plan, not an upsell; never present them as premium-only.
4. **Real or absent.** Proof is real and approved, or it isn't shown. Capability claims stay hedged where plan or setup decides availability.
5. **Every buyer finds their rung.** Starter through Enterprise map to distinct audiences; each should recognise itself without the site picking one.
