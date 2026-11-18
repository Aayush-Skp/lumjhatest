import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader, { Accent, SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import { ProductHero, ProductPage } from "@/components/site/ProductSections";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One knowledge base, three ways to help customers: Lumjha AI Chat Agent, AI Site Search and Lumjha Vault.",
};

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 sm:px-6";

/* Same artwork as each product page's intro split, so the overview and the
   page it links to read as one story. */
const SOLUTIONS = [
  {
    href: "/chat-agent",
    name: "AI Chat Agent",
    tagline: "Answer every customer question, 24/7.",
    body: "An AI agent that answers questions from your business knowledge, captures leads and books meetings across your website and messaging channels.",
    points: ["Instant answers, day and night", "Lead capture and appointment booking", "Human takeover when needed"],
    image: {
      src: "/assets/chat-agent/knowledge-connected.png",
      alt: "Website content, PDF documents, help center and custom information flowing into Lumjha AI",
      width: 1598,
      height: 984,
    },
  },
  {
    href: "/site-search",
    name: "Site Search",
    tagline: "Help visitors find what they need, faster.",
    body: "AI search that understands questions in plain words and points visitors to the right pages on your website, with a short answer on top.",
    points: ["Natural language search", "Relevant pages, ranked by meaning", "Clear next steps for visitors"],
    image: {
      src: "/assets/site-search/website-discovered.png",
      alt: "Lumjha AI Site Search answering “How do I choose the right plan?” with relevant pages",
      width: 1536,
      height: 1024,
    },
  },
  {
    href: "/lumjha-vault",
    name: "Lumjha Vault",
    tagline: "Exact answers, backed by your sources.",
    body: "Ask about your policies and documents in everyday words and get the exact passage back, quoted word for word with its source attached.",
    points: ["Exact quotations, not paraphrases", "Source and section attached", "Answers anyone can verify"],
    image: {
      src: "/assets/policy-vault/exact-answer.png",
      alt: "Policy documents feeding Lumjha AI, which answers “What is the refund policy?” with a quoted source",
      width: 1833,
      height: 858,
    },
  },
];

/* "Which one fits" rows: the visitor's problem → the product that solves it. */
const FIT = [
  { need: "Customers keep asking the same questions", href: "/chat-agent", name: "AI Chat Agent" },
  { need: "Visitors can’t find the right page on your site", href: "/site-search", name: "Site Search" },
  { need: "Policy answers must match your documents exactly", href: "/lumjha-vault", name: "Lumjha Vault" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`h-4 w-4 shrink-0 ${className}`}>
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="mt-[3px] h-4 w-4 shrink-0 text-[#527DFF]">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="m5 8.2 2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SolutionsPage() {
  return (
    <ProductPage>
      <ProductHero
        title="One Knowledge Base,"
        accent="Three Ways to Help."
        body="Connect your business knowledge once, then put it to work where your customers need it: answering in chat, guiding search on your website, and quoting your policies exactly."
      />

      <section id="solutions" className={`${CONTAINER} ${SECTION_Y}`}>
        <SectionHeader
          title={<>Our <Accent>Solutions</Accent></>}
          subtitle="Pick the one that fits today. They all run on the same knowledge, so you can add another whenever you’re ready."
        />
        <ul className={`mx-auto grid w-full max-w-[1160px] gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${SECTION_HEAD_GAP}`}>
          {SOLUTIONS.map((s, i) => (
            // the last card takes the full row on tablets so the grid never leaves a hole
            <li key={s.href} className={i === SOLUTIONS.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}>
              <Link
                href={s.href}
                aria-label={`${s.name}: ${s.tagline}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_36px_-24px_rgb(0_0_0/0.8)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#527DFF]/50 hover:shadow-[0_28px_48px_-24px_rgb(82_125_255/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#527DFF] motion-reduce:transition-none motion-reduce:hover:translate-y-0 light:border-card-ring light:bg-white light:shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-16px_rgb(15_23_42/0.18)]"
              >
                {/* artwork is dark in both themes; contain keeps the wide Vault art whole */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-[#03050b]">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="text-[13px] font-semibold tracking-[0.14em] text-highlight">0{i + 1}</span>
                  <h3 className="mt-2 font-heading text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-medium text-ink/90">{s.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-[14.5px] leading-snug text-ink/90">
                        <Check />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {/* pinned to the bottom so the links line up across the row */}
                  <span className="mt-auto flex items-center gap-2 pt-7 text-[15px] font-semibold text-[#527DFF] light:text-[#3E63F2]">
                    Explore {s.name}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${CONTAINER} ${SECTION_Y} pt-0! md:pt-0!`}>
        <SectionHeader title={<>Which One <Accent>Fits?</Accent></>} subtitle="Start from the problem you want to solve." />
        <ul className={`mx-auto w-full max-w-[1160px] overflow-hidden rounded-2xl border border-line bg-surface light:border-card-ring light:bg-white ${SECTION_HEAD_GAP}`}>
          {FIT.map((f, i) => (
            <li key={f.href} className={i > 0 ? "border-t border-line light:border-card-ring" : ""}>
              <Link
                href={f.href}
                className="group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-[#527DFF]/[0.06] focus-visible:bg-[#527DFF]/[0.06] focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 md:py-6"
              >
                <span className="text-[16px] font-medium leading-snug text-ink md:text-lg">{f.need}</span>
                <span className="flex shrink-0 items-center gap-2 text-[15px] font-semibold text-[#527DFF] light:text-[#3E63F2]">
                  {f.name}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </ProductPage>
  );
}
