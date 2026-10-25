"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// Page routes ("/play-area", "/pricing") first, then one link per landing-page section, in page order.
const NAV_LINKS = [
  { label: "Play Area", href: "/play-area" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "#channels" },
  { label: "Our Commitments", href: "#commitments" },
];

/** Site navbar. `prefix` lets other pages link back to home sections ("/#channels"). */
export default function Navbar({ prefix = "" }: { prefix?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // section anchors get the prefix; full routes are used as-is
  const hrefOf = (href: string) => (href.startsWith("/") ? href : `${prefix}${href}`);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030816]/90 backdrop-blur-md light:border-[#0B1526]/[0.06] light:bg-white/85">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <a href={`${prefix}#top`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Lumjha logo"
            width={23}
            height={32}
            className="h-8 w-auto shrink-0 object-contain"
            priority
          />
          {/* thin divider + two even lines, as in the brand lockup */}
          <span aria-hidden className="hidden h-8 w-px shrink-0 bg-white/30 min-[420px]:block light:bg-[#0B1526]/15" />
          <span className="hidden flex-col text-[12px] font-medium leading-[1.3] text-[#B4BCCB] min-[420px]:flex light:text-slate-500">
            <span>Knowledgebase,</span>
            <span>Activated Everywhere</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={hrefOf(l.href)}
              aria-current={pathname === l.href ? "page" : undefined}
              className="text-[12px] font-medium text-gray-300 transition-colors duration-300 ease-out hover:text-white aria-[current=page]:text-white light:text-slate-600 light:hover:text-[#0B1526] light:aria-[current=page]:text-[#0B1526]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* right edge: Log In / Start Free (desktop), theme switch, menu button (mobile) */}
        <div className="flex items-center gap-3 lg:gap-4">
        <div className="hidden items-center gap-4 lg:flex">
          <a href="https://app.lumjha.ai/login" className="text-[12px] font-medium text-gray-200 transition-colors duration-300 ease-out hover:text-white light:text-slate-600 light:hover:text-[#0B1526]">
            Log In
          </a>
          <a
            href="https://app.lumjha.ai/login"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#527DFF] px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-[#3E63F2]"
          >
            Start Free →
          </a>
        </div>

        <ThemeToggle />

        <button
          className="relative flex h-9 w-9 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* three bars that morph into an × */}
          <span className={`absolute h-0.5 w-5 bg-white light:bg-[#0B1526] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 bg-white light:bg-[#0B1526] transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-5 bg-white light:bg-[#0B1526] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
        </div>
      </div>

      {/* mobile menu — overlays the page (absolute) so opening/closing never
          shifts layout or anchor jumps; slides open, links fade in one by one */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            className={`flex flex-col gap-3 border-y bg-[#030816] px-4 py-4 shadow-[0_24px_40px_-12px_rgba(0,0,0,0.6)] transition-colors duration-500 light:bg-white light:shadow-[0_24px_40px_-16px_rgba(15,23,42,0.18)] ${
              open ? "border-white/10 light:border-[#0B1526]/[0.08]" : "border-transparent"
            }`}
          >
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={hrefOf(l.href)}
                aria-current={pathname === l.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={`text-sm font-medium text-gray-200 transition-all light:text-slate-700 duration-500 ease-out motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
              >
                {l.label}
              </a>
            ))}
            <div
              style={{ transitionDelay: open ? `${100 + NAV_LINKS.length * 60}ms` : "0ms" }}
              className={`mt-2 flex gap-3 transition-all duration-500 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              <a href="https://app.lumjha.ai/login" className="text-sm text-gray-200 light:text-slate-700">
                Log In
              </a>
              <a
                href="https://app.lumjha.ai/login"
                className="rounded-full bg-[#527DFF] px-4 py-1.5 text-sm font-semibold text-white"
              >
                Start Free →
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
