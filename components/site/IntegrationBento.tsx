import type { CSSProperties, ReactNode } from "react";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";

export type Integration = {
  title: string;
  body: string;
  icon: ReactNode;
  /** The logo's own colour: tints the chip, dot pattern, border and hover sweep. */
  brand: string;
  /** Tile span classes for the bento rhythm (wide tiles get a bigger icon + title). */
  span?: string;
  wide?: boolean;
};

/** Integrations as a 3-column bento: wide|narrow, three narrow, narrow|wide, three narrow.
    Each tile's logo is its artwork: oversized in brand colour, cropped by the bottom-right
    edge in a bloom of its own light. On hover the logo swings upright and rises, the bloom
    brightens, the brand colour sweeps across the tile and a white shine crosses the logo. */
export default function IntegrationBento({
  id,
  title,
  subtitle,
  items,
}: {
  id?: string;
  title: ReactNode;
  subtitle: string;
  items: Integration[];
}) {
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
      <ul className={`mx-auto grid w-full max-w-[1040px] gap-4 md:grid-cols-2 lg:grid-cols-3 ${SECTION_HEAD_GAP}`}>
        {items.map((b) => {
          // the logo is the artwork: oversized, brand colour, cropped by the tile's bottom-right edge
          const mark = b.wide
            ? "-bottom-8 -right-5 h-[124px] w-[124px] lg:-bottom-10 lg:h-[164px] lg:w-[164px]"
            : "-bottom-6 -right-4 h-[96px] w-[96px]";
          return (
            <li
              key={b.title}
              style={{ "--brand": b.brand } as CSSProperties}
              className={`int-tile group relative isolate flex min-h-[176px] flex-col overflow-hidden rounded-[18px] border border-line bg-surface p-5 md:p-6 light:border-card-ring light:bg-white lg:min-h-[196px] ${b.span ?? ""}`}
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
                className={`mt-2 leading-relaxed text-muted ${b.wide ? "max-w-[34ch] text-[14.5px] md:text-[15.5px]" : "max-w-[26ch] text-[14px]"}`}
              >
                {b.body}
              </p>
              {/* hover: a band of the logo's brand colour sweeps across the tile */}
              <span aria-hidden className="tile-flash int-flash pointer-events-none absolute inset-0" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
