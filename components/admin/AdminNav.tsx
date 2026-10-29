"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/pricing", label: "Pricing", icon: "M12 3v18M17 7.5c0-1.9-2.2-3.5-5-3.5s-5 1.6-5 3.5S9.2 11 12 11.5s5 1.6 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5" },
  { href: "/admin/blogs", label: "Blogs", icon: "M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h5" },
  { href: "/admin/messages", label: "Messages", icon: "M4 13h4l1.5 3h5l1.5-3h4M6 5h12l2 8v6H4v-6z" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "M3 6h18v12H3zM3 7l9 6 9-6" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" aria-label="Admin">
      {LINKS.map((l) => {
        const active = path.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] font-medium transition ${
              active ? "bg-[#527DFF]/15 text-ink" : "text-muted hover:bg-ink/[0.05] hover:text-ink"
            }`}
          >
            <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${active ? "text-[#527DFF]" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={l.icon} />
            </svg>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
