"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";

export type Integration = {
  title: string;
  body: string;
  icon: ReactNode;
  /** The logo's own colour: tints the chip, dot pattern, border and hover sweep. */
  brand: string;
  /** Tile span classes on the 6-column desktop grid (default: a third, lg:col-span-2).
      `wide` tiles get a bigger icon + title. */
  span?: string;
  wide?: boolean;
};

/** Integrations as a bento on a 6-column grid (spans come with each item). With `visible`,
    only that many tiles show at first: the last row fades under a faint blur with a
    "See all" button that reveals the rest.
    Each tile's logo is its artwork: oversized in brand colour, cropped by the bottom-right
    edge in a bloom of its own light. On hover the logo swings upright and rises, the bloom
    brightens, the brand colour sweeps across the tile and a white shine crosses the logo. */
export default function IntegrationBento({
  id,
  title,
  subtitle,
  items,
  visible,
}: {
  id?: string;
  title: ReactNode;
  subtitle: string;
  items: Integration[];
  /** How many tiles show before "See all" (all when unset). */
  visible?: number;
}) {
  const [open, setOpen] = useState(false);
  const collapsed = !open && visible !== undefined && items.length > visible;
  const listId = `${id ?? "integrations"}-list`;
  return (
    <section id={id} className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
      {/* brand gradients for the Instagram / Messenger marks */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <linearGradient id="ig-brand" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.3" stopColor="#FA7E1E" />
            <stop offset="0.6" stopColor="#D62976" />
            <stop offset="0.85" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
          <linearGradient id="msg-brand" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0099FF" />
            <stop offset="0.6" stopColor="#A033FF" />
            <stop offset="0.9" stopColor="#FF5280" />
            <stop offset="1" stopColor="#FF7061" />
          </linearGradient>
        </defs>
      </svg>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className={`relative mx-auto w-full max-w-[1040px] ${SECTION_HEAD_GAP}`}>
      <ul id={listId} className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
        {items.map((b, i) => {
          const span = b.span?.includes("lg:col-span") ? b.span : `${b.span ?? ""} lg:col-span-2`;
          const hidden = collapsed && i >= (visible ?? 0) ? "hidden" : "";
          // the logo is the artwork: oversized, brand colour, cropped by the tile's bottom-right edge
          const mark = b.wide
            ? "-bottom-8 -right-5 h-[124px] w-[124px] lg:-bottom-10 lg:h-[164px] lg:w-[164px]"
            : "-bottom-6 -right-4 h-[96px] w-[96px]";
          return (
            <li
              key={b.title}
              style={{ "--brand": b.brand } as CSSProperties}
              className={`int-tile group relative isolate flex min-h-[176px] flex-col overflow-hidden rounded-[18px] border border-line bg-surface p-5 md:p-6 light:border-card-ring light:bg-white lg:min-h-[196px] ${span} ${hidden}`}
            >
              {/* the logo's own light, blooming from the corner it sits in */}
              <span aria-hidden className="int-bloom pointer-events-none absolute inset-0 -z-10" />
              <span aria-hidden className={`int-logo pointer-events-none absolute -z-10 ${mark}`}>
                <span className="flex h-full w-full [&>svg]:h-full [&>svg]:w-full" style={{ color: b.brand }}>
                  {b.icon}
                </span>
                <span className="int-shine absolute inset-0 flex [&>svg]:h-full [&>svg]:w-full">{b.icon}</span>
              </span>
              <h3
                className={`font-heading font-semibold leading-tight tracking-[-0.02em] text-ink ${b.wide ? "text-[22px] md:text-[28px]" : "text-[19px] md:text-xl"}`}
              >
                {b.title}
              </h3>
              <p
                className={`mt-2 leading-relaxed text-muted ${b.wide ? "max-w-[min(34ch,calc(100%-8rem))] text-[14.5px] md:text-[15.5px]" : "max-w-[26ch] text-[14px]"}`}
              >
                {b.body}
              </p>
              {/* hover: a band of the logo's brand colour sweeps across the tile */}
              <span aria-hidden className="tile-flash int-flash pointer-events-none absolute inset-0" />
            </li>
          );
        })}
      </ul>
      {/* collapsed: the last visible row fades out under a faint blur, with the button on it */}
      {collapsed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-56 items-end justify-center pb-8">
          <div aria-hidden className="absolute inset-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,transparent,#000_70%)]" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent via-page-deep/75 to-page-deep" />
          <button
            type="button"
            aria-expanded={false}
            aria-controls={listId}
            onClick={() => setOpen(true)}
            className="pointer-events-auto relative inline-flex items-center gap-2 rounded-full border-2 border-[#5675FF] bg-page-deep px-6 py-3 text-[15px] font-semibold text-ink shadow-[0_12px_30px_-12px_rgb(82_125_255/0.7)] transition hover:bg-[#5675FF] hover:text-white"
          >
            See all integrations ({items.length})
            <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 5 5 5-5" />
            </svg>
          </button>
        </div>
      )}
      </div>
      {open && visible !== undefined && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded
            aria-controls={listId}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#5675FF]/60 px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-[#5675FF]/10"
          >
            Show fewer
            <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5-5 5 5" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
