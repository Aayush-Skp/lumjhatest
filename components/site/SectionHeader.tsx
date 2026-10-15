import type { ReactNode } from "react";

/* Vertical rhythm shared by every content section, so the gaps between
   sections (and between a section's header and its content) always match. */
export const SECTION_Y = "py-16 md:py-24";
export const SECTION_HEAD_GAP = "mt-10 md:mt-14";

/* Shared title + subtitle for content sections: white Poppins headline,
   soft-white supporting line. `as="h1"` for a page's opening header. */
export default function SectionHeader({
  title,
  subtitle,
  as: Heading = "h2",
}: {
  title: ReactNode;
  subtitle: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="text-center">
      <Heading className="font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-white sm:text-4xl md:text-[44px]">
        {title}
      </Heading>
      <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-relaxed text-balance text-white/85 sm:text-lg md:mt-5 md:text-xl">
        {subtitle}
      </p>
    </div>
  );
}
