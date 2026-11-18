import Image from "next/image";
import Link from "next/link";
import FooterWordmark from "./FooterWordmark";
import NewsletterForm from "./NewsletterForm";
import ContactDisclosure from "./ContactDisclosure";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/ChannelIcons";

const QUICK_LINKS = [
  { label: "Playground", href: "/play-area" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/#channels" },
  { label: "Our Commitments", href: "/#commitments" },
];

const SOLUTIONS = [
  { label: "Chatbot", href: "/chat-agent" },
  { label: "Site Search", href: "/site-search" },
  { label: "Lumjha Vault", href: "/lumjha-vault" },
];

const ABOUT = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-band px-4 pb-10 pt-16 text-subtle sm:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" aria-label="Lumjha AI home" className="inline-block">
            <Image
              src="/assets/logo-wordmark.png"
              alt="Lumjha AI"
              width={664}
              height={174}
              className="h-9 w-auto md:h-10"
            />
          </Link>
          <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed md:text-sm">
            Lumjha AI is the no-code AI layer for modern customer engagement.
          </p>
          <a
            href="mailto:info@lumjha.ai"
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium transition hover:text-ink md:text-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            info@lumjha.ai
          </a>
          <div className="mt-5 flex items-center gap-4">
            {/* no Facebook / Instagram pages yet: shown, but not links */}
            <span aria-label="Facebook" role="img">
              <FacebookIcon className="h-5 w-5" />
            </span>
            <span aria-label="Instagram" role="img">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <a
              href="https://www.linkedin.com/company/lumjha/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lumjha on LinkedIn"
              className="transition hover:text-ink"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-[13px] font-bold text-ink md:text-sm">Quick Links</p>
          <ul className="mt-4 space-y-3 text-[13px] font-medium md:text-sm">
            {QUICK_LINKS.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-ink">{x.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-ink md:text-sm">Solutions</p>
          <ul className="mt-4 space-y-3 text-[13px] font-medium md:text-sm">
            {SOLUTIONS.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-ink">{x.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold text-ink md:text-sm">About</p>
          <ul className="mt-4 space-y-3 text-[13px] font-medium md:text-sm">
            {ABOUT.map((x) => (
              <li key={x.label}><a href={x.href} className="hover:text-ink">{x.label}</a></li>
            ))}
            <li>
              {/* opens the same Contact Us form as the CTA panel */}
              <ContactDisclosure label="Contact" rowClassName="contents" buttonClassName="cursor-pointer hover:text-ink">
                {null}
              </ContactDisclosure>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-[13px] font-bold text-ink md:text-sm">Newsletter</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1440px] md:mt-24">
        <FooterWordmark />
      </div>
      <div className="relative mx-auto mt-6 max-w-[1440px] border-t border-line pt-8 md:mt-10">
        <div className="relative">
          {/* quiet theme switch, bottom-left under the wordmark */}
          <ThemeToggle small className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100" />
          <p className="text-center text-[12px] text-subtle">
            © 2026 Lumjha AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
