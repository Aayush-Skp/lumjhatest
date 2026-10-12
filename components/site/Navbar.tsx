"use client";

import { useState } from "react";
import Image from "next/image";

// One link per landing-page section, in page order.
const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Integrations", href: "#channels" },
  { label: "Pricing", href: "#pricing" },
  { label: "Add-ons", href: "#addons" },
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
              className="text-[12px] font-medium text-gray-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="https://app.lumjha.ai/login" className="text-[12px] font-medium text-gray-200 hover:text-white">
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
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#030816] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={`${prefix}${l.href}`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-200"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
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
      )}
    </header>
  );
}
