"use client";

import { useState } from "react";
import Image from "next/image";

// One link per landing-page section, in page order.
const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Integrations", href: "#channels" },
  { label: "Pricing", href: "#pricing" },
  { label: "Our Commitments", href: "#commitments" },
];

/** Site navbar. `prefix` lets legal pages link back home ("/#pricing"). */
export default function Navbar({ prefix = "" }: { prefix?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030816]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <a href={`${prefix}#top`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Lumjha logo"
            width={23}
            height={32}
            className="h-8 w-auto shrink-0 object-contain"
            priority
          />
          <span className="hidden flex-col leading-tight min-[420px]:flex">
            <span className="text-[11px] font-bold text-white">Knowledgebase,</span>
            <span className="text-[10px] text-gray-400">Activated Everywhere</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={`${prefix}${l.href}`}
              className="text-[12px] font-medium text-gray-300 transition-colors duration-300 ease-out hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="https://app.lumjha.ai/login" className="text-[12px] font-medium text-gray-200 transition-colors duration-300 ease-out hover:text-white">
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

        <button
          className="relative flex h-9 w-9 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* three bars that morph into an × */}
          <span className={`absolute h-0.5 w-5 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-5 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
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
            className={`flex flex-col gap-3 border-y bg-[#030816] px-4 py-4 shadow-[0_24px_40px_-12px_rgba(0,0,0,0.6)] transition-colors duration-500 ${
              open ? "border-white/10" : "border-transparent"
            }`}
          >
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={`${prefix}${l.href}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={`text-sm font-medium text-gray-200 transition-all duration-500 ease-out motion-reduce:transition-none ${
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
              <a href="https://app.lumjha.ai/login" className="text-sm text-gray-200">
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
