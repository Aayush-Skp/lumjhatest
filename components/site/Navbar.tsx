"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Figma nav: Play Area · Solutions ▾ · Integration · Blogs
const SOLUTIONS = [
  { label: "AI Chat Agent", href: "/chat-agent", blurb: "Answer every customer question, 24/7" },
  { label: "Site Search", href: "/site-search", blurb: "Help visitors find what they need, faster" },
  { label: "Policy Vault", href: "/policy-vault", blurb: "Exact answers, backed by your sources" },
];

const NAV_LINKS = [
  { label: "Play Area", href: "/play-area" },
  { label: "Solutions", children: SOLUTIONS },
  { label: "Integration", href: "/integrations" },
  { label: "Blogs", href: "/blogs" },
] as const;

const APP_LOGIN = "https://app.lumjha.ai/login";

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      className={`h-1.5 w-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 0h10L5 6z" />
    </svg>
  );
}

/** Desktop "Solutions" menu: opens on hover or click, closes on Escape / outside click. */
function SolutionsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // small delay so the pointer can cross the gap into the panel
  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="solutions-menu"
        // A mouse click lands after hover already opened the menu, so it only
        // opens; keyboard activation (detail === 0) toggles.
        onClick={(e) => setOpen((v) => (e.detail === 0 ? !v : true))}
        className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-300 ease-out hover:text-white ${
          active || open ? "text-white" : "text-[#B4BCCB]"
        }`}
      >
        Solutions
        <Caret open={open} />
      </button>
      <div
        id="solutions-menu"
        inert={!open}
        className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-2xl border border-white/10 bg-[#0B0D14] p-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)]">
          {SOLUTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-white/[0.06]"
              >
                <span className="block text-[14px] font-semibold text-white">{s.label}</span>
                <span className="mt-0.5 block text-[12px] text-[#8D96A8]">{s.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const solutionsActive = SOLUTIONS.some((s) => isActive(s.href));

  // mobile menu: staggered fade-in, one step per row
  const stagger = (row: number) => ({ transitionDelay: open ? `${100 + row * 60}ms` : "0ms" });
  const rowAnim = `transition-all duration-500 ease-out motion-reduce:transition-none ${
    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
  }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[66px] xl:px-[142px]">
        <Link href="/" className="flex items-center gap-2" aria-label="Lumjha home">
          <Image
            src="/logo.png"
            alt="Lumjha logo"
            width={25}
            height={35}
            className="h-[35px] w-auto shrink-0 object-contain"
            priority
          />
          {/* thin divider + two even lines, as in the brand lockup */}
          <span aria-hidden className="ml-1.5 hidden h-8 w-px shrink-0 bg-white/30 min-[420px]:block" />
          <span className="hidden flex-col pl-1 text-[12px] font-medium leading-[1.3] text-[#B4BCCB] min-[420px]:flex">
            <span>Knowledgebase,</span>
            <span>Activated Everywhere</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-[30px] lg:flex">
          {NAV_LINKS.map((l) =>
            "children" in l ? (
              <SolutionsMenu key={l.label} active={solutionsActive} />
            ) : (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-[15px] font-medium transition-colors duration-300 ease-out hover:text-white ${
                  isActive(l.href) ? "text-white" : "text-[#B4BCCB]"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-[26px] lg:flex">
          <a href={APP_LOGIN} className="text-[15px] font-medium text-white transition-opacity duration-300 hover:opacity-80">
            Log in
          </a>
          <a
            href={APP_LOGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-2.5 rounded-full bg-[#5675FF] pl-[19px] pr-[19px] text-[14px] font-semibold text-white transition hover:bg-[#3E63F2]"
          >
            Start Free
            <Image src="/assets/shared/arrow.svg" alt="" width={14} height={13} aria-hidden />
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
          shifts layout; slides open, rows fade in one by one */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile"
            className={`flex flex-col gap-3 border-y bg-black px-4 py-4 shadow-[0_24px_40px_-12px_rgba(0,0,0,0.6)] transition-colors duration-500 ${
              open ? "border-white/10" : "border-transparent"
            }`}
          >
            {NAV_LINKS.map((l, i) =>
              "children" in l ? (
                <div key={l.label} style={stagger(i)} className={rowAnim}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">{l.label}</p>
                  <div className="mt-2 flex flex-col gap-2.5 border-l border-white/10 pl-3">
                    {l.children.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className={`text-sm font-medium ${isActive(s.href) ? "text-white" : "text-gray-300"}`}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={stagger(i)}
                  className={`text-sm font-medium ${isActive(l.href) ? "text-white" : "text-gray-200"} ${rowAnim}`}
                >
                  {l.label}
                </Link>
              ),
            )}
            <div style={stagger(NAV_LINKS.length)} className={`mt-2 flex items-center gap-4 ${rowAnim}`}>
              <a href={APP_LOGIN} className="text-sm text-gray-200">
                Log in
              </a>
              <a
                href={APP_LOGIN}
                className="flex items-center gap-2 rounded-full bg-[#5675FF] px-4 py-1.5 text-sm font-semibold text-white"
              >
                Start Free
                <Image src="/assets/shared/arrow.svg" alt="" width={14} height={13} aria-hidden />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
