-- Lumjha website admin panel (/admin) — run once in the Supabase SQL editor.
-- The admin panel talks to these tables with the service-role key from the
-- server. Row-level security is on with no policies, so the public anon key
-- can't read or change anything until you add a read policy for the site.

create table if not exists public.pricing_plans (
  id              text primary key,             -- slug of the plan name, e.g. "growth"
  position        integer not null default 0,   -- card order on /pricing
  name            text not null,
  audience        text not null default '',
  price_monthly   text not null,                -- shown as-is, e.g. "$119"
  price_annual    text not null,
  detail_monthly  text not null default '',
  detail_annual   text not null default '',
  allowance       text not null default '',     -- AI conversations / month
  allowance_note  text,
  cta             text not null default '',
  href            text,                         -- CTA link; empty = app sign-in
  featured        boolean not null default false,
  includes        text,                         -- "Everything in X, plus"
  features        jsonb not null default '[]',  -- [{ text, strong?, exclusive? }]
  note            text not null default '',
  updated_at      timestamptz not null default now()
);

create table if not exists public.blog_posts (
  slug          text primary key,
  title         text not null,
  excerpt       text not null default '',
  category      text not null,                  -- RAG | Tech news | Product | Guides
  date          date not null,
  read_minutes  integer not null default 5,
  author        text not null default '',
  featured      boolean not null default false,
  image         jsonb,                          -- { src, credit, creditUrl } or null
  body          jsonb not null default '[]',    -- [{ type: "p" | "h2" | "ul" | "code" | "quote", ... }]
  updated_at    timestamptz not null default now()
);

alter table public.pricing_plans enable row level security;
alter table public.blog_posts enable row level security;

-- Contact Us / Book a Demo form submissions (written by the public site).
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  page        text not null default '',        -- path the form was sent from, e.g. "/pricing"
  read        boolean not null default false,  -- toggled in /admin/messages
  created_at  timestamptz not null default now()
);

-- Footer newsletter sign-ups (written by the public site).
create table if not exists public.newsletter_subscribers (
  email       text primary key,                -- stored lower-case
  page        text not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
