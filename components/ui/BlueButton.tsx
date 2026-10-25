import type { ReactNode } from "react";

/** Pill CTA used across the site: solid blue (default), outlined, or white. */
export default function BlueButton({
  children,
  outline,
  light,
  large,
  href = "https://app.lumjha.ai/login",
}: {
  children: ReactNode;
  outline?: boolean;
  light?: boolean;
  large?: boolean;
  href?: string;
}) {
  const size = large
    ? "justify-center gap-2 px-7 py-3.5 text-[15px] md:px-8 md:text-base"
    : "gap-1.5 px-5 py-2 text-[13px]";
  // in-site links stay in the tab; the app opens in a new one
  const external = href.startsWith("http");
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (light) {
    return (
      <a
        href={href}
        {...target}
        className={`inline-flex items-center rounded-full bg-white font-semibold text-[#3E63F2] transition hover:brightness-95 ${size}`}
      >
        {children}
      </a>
    );
  }
  if (outline) {
    return (
      <a
        href={href}
        {...target}
        className={`inline-flex items-center rounded-full border border-[#527DFF]/70 font-semibold ${size} text-ink transition hover:bg-[#527DFF]/10`}
      >
        {children} <span aria-hidden>→</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      {...target}
      className={`inline-flex items-center rounded-full bg-[#527DFF] font-semibold text-white shadow-[0_8px_30px_-6px_rgba(82,125,255,0.7)] transition hover:bg-[#3E63F2] ${size}`}
    >
      {children} <span aria-hidden>→</span>
    </a>
  );
}
