import type { ReactNode } from "react";

/* Vertical rhythm shared by every content section, so the gaps between
   sections (and between a section's header and its content) always match. */
export const SECTION_Y = "py-12 md:py-[72px]";
export const SECTION_HEAD_GAP = "mt-10 md:mt-14";

/* Shared title + subtitle for content sections: Poppins headline in the
   theme ink colour, softer supporting line. `wide` lets a long subtitle
   sit on two lines on desktop. */
export default function SectionHeader({
  title,
  subtitle,
  wide,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="text-center">
      <h2 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-ink sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      <p className={`mx-auto mt-4 ${wide ? "max-w-[66rem]" : "max-w-4xl"} text-[15px] leading-relaxed text-balance text-ink/85 sm:text-lg md:mt-5 md:text-xl`}>
        {subtitle}
      </p>
    </div>
  );
}
