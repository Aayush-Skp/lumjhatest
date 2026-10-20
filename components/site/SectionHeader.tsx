import type { ReactNode } from "react";

/* Vertical rhythm shared by every content section, so the gaps between
   sections (and between a section's header and its content) always match. */
export const SECTION_Y = "py-16 md:py-24";
export const SECTION_HEAD_GAP = "mt-10 md:mt-14";

/* Shared title + subtitle for content sections: Poppins headline in the
   theme ink colour, softer supporting line. */
export default function SectionHeader({ title, subtitle }: { title: ReactNode; subtitle: ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-ink sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-relaxed text-balance text-ink/85 sm:text-lg md:mt-5 md:text-xl">
        {subtitle}
      </p>
    </div>
  );
}
