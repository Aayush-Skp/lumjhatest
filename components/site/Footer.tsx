import Image from "next/image";
import FooterWordmark from "./FooterWordmark";

const QUICK_LINKS = [
  { label: "Platform", href: "/#platform" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Security", href: "/#security" },
];

const PLATFORMS = [
  { label: "Chatbot", href: "/#platform" },
  { label: "Site Search", href: "/#platform" },
  { label: "Policy Vault", href: "/#platform" },
  { label: "Integrations", href: "/#channels" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black px-4 pb-10 pt-16 text-gray-400 sm:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Lumjha AI logo"
              width={23}
              height={32}
              className="h-8 w-auto shrink-0 object-contain"
            />
            <span className="text-sm font-bold text-white">Lumjha AI</span>
          </div>
          <p className="mt-4 max-w-[240px] text-[13px] leading-relaxed md:text-sm">
            Lumjha is the no-code AI layer for modern customer engagement.
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href="#" aria-label="Facebook" className="hover:text-white">f</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">◉</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">in</a>
          </div>
        </div>
        <div>
          <p className="text-[13px] font-bold text-white md:text-sm">Quick Links</p>
          <ul className="mt-4 space-y-3 text-[13px] md:text-sm">
            {QUICK_LINKS.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-white">{x.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-white md:text-sm">Platforms</p>
          <ul className="mt-4 space-y-3 text-[13px] md:text-sm">
            {PLATFORMS.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-white">{x.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-white md:text-sm">Legal</p>
          <ul className="mt-4 space-y-3 text-[13px] md:text-sm">
            {LEGAL.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-white">{x.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-[13px] font-bold text-white md:text-sm">Newsletter</p>
          <input
            type="email"
            placeholder="backend@brjnole.dev"
            className="mt-4 w-full rounded-md border border-gray-700 bg-white px-3 py-2.5 text-[13px] text-black outline-none placeholder:text-gray-500"
          />
          <button className="mt-3 flex items-center gap-1.5 rounded-md bg-[#527DFF] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#3E63F2]">
            ✉ Subscribe
          </button>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1440px] md:mt-24">
        <FooterWordmark />
      </div>
      <div className="mx-auto mt-6 max-w-[1440px] border-t border-white/10 pt-8 md:mt-10">
        <p className="text-center text-[12px] text-gray-500">
          © 2026 Lumjha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
