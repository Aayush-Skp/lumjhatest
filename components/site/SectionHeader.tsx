import type { ReactNode } from "react";

/* Vertical rhythm shared by every content section, so the gaps between
   sections (and between a section's header and its content) always match. */
export const SECTION_Y = "py-14 md:py-[96px]";
export const SECTION_HEAD_GAP = "mt-12 md:mt-16";

/* One heading style for every section on the site: Poppins Medium, Title Case,
   no closing full stop, tracking loose enough that Poppins' round letters don't touch.
   Alignment is left to the caller. */
export const HEADING =
  "font-heading text-[28px] font-medium leading-[1.25] tracking-[-0.012em] text-balance text-ink sm:text-[34px] md:text-[40px]";

/* One hero style for the top of every marketing page (title + intro paragraph).
   Colour of the paragraph is left to the page. */
export const HERO_TITLE =
  "font-heading text-[clamp(2.125rem,3vw+1.25rem,3.75rem)] font-medium leading-[1.18] tracking-[-0.015em] text-balance text-headline";
export const HERO_BODY = "text-base leading-[1.7] text-balance sm:text-[17px] md:text-lg md:leading-[1.75]";

/** The key phrase of a heading, in the headline blue (the hero's two-tone device). */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-highlight">{children}</span>;
}

/* Shared title + subtitle for content sections. `wide` lets a long subtitle
   sit on two lines on desktop. */
export default function SectionHeader({
  title,
  subtitle,
  wide,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="text-center">
      <h2 className={HEADING}>
        {title}
      </h2>
      {subtitle && <p className={`mx-auto mt-4 ${wide ? "max-w-[66rem]" : "max-w-[58rem]"} text-[15px] leading-[1.7] text-balance text-muted sm:text-base md:mt-5`}>
        {subtitle}
      </p>}
    </div>
  );
}
