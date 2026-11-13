"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CtaPanel from "./CtaPanel";
import ContactDisclosure from "./ContactDisclosure";
import SectionHeader, { HEADING, HERO_BODY, HERO_TITLE, SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";
import BlueButton from "@/components/ui/BlueButton";
import Tilt from "@/components/ui/Tilt";

/* ============================================================
   Building blocks for the product pages (Chat Agent, Site Search,
   Lumjha Vault, Integration) — all share one Figma template:
   hero → intro split → how it works → benefits → FAQ → CTA.
   ============================================================ */

export type Icon = { src: string; width: number; height: number };
export type Item = { icon: Icon; title: string; body: string };

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 sm:px-6";
// Figma content column: 1160px, centred
const CONTENT = "mx-auto w-full max-w-[1160px]";

/** Page frame: navbar, the near-black Figma background, CTA panel and footer. */
export function ProductPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        {children}
        <CtaPanel contactLabel="Book a Demo" />
        <Footer />
      </main>
    </div>
  );
}

/** Centred hero: two-tone headline, intro, Get Started + Book a Demo. */
export function ProductHero({ title, accent, body }: { title: string; accent: string; body: string }) {
  return (
    <section className={`${CONTAINER} flex flex-col items-center pb-10 pt-16 text-center md:pb-12 md:pt-28`}>
      <h1 className={`max-w-[980px] ${HERO_TITLE}`}>
        {title} <span className="text-[#5675FF]">{accent}</span>
      </h1>
      <p className={`mx-auto mt-6 max-w-[1120px] text-ink/85 md:mt-8 ${HERO_BODY}`}>
        {body}
      </p>
      <ContactDisclosure
        label="Book a Demo"
        rowClassName="mt-10 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:mt-12"
        buttonClassName="inline-flex items-center justify-center rounded-full border-2 border-[#5675FF] px-7 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-[#5675FF]/10"
      >
        <BlueButton large>Get Started</BlueButton>
      </ContactDisclosure>
    </section>
  );
}

/** Copy on the left, product artwork bleeding off the right edge (desktop). */
export function IntroSplit({
  heading,
  body,
  media,
}: {
  heading: ReactNode;
  body: string;
  media: ReactNode;
}) {
  return (
    <section className={`${CONTAINER} ${SECTION_Y}`}>
      {/* copy starts on the 1160px content column's left edge (like every other
          section); the artwork runs on to the section's right edge.
          `100%` here is the section's content width, so the offset is exact. */}
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 lg:ml-[max(0px,calc((100%-1160px)/2))] lg:mr-0 lg:max-w-none lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-14">
      <div className="text-center lg:text-left">
        {/* narrow column: wrap naturally so balancing doesn't strand one word per line */}
        <h2 className={`${HEADING} lg:text-pretty!`}>
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[581px] text-base leading-relaxed text-ink sm:text-lg md:mt-8 md:text-xl md:leading-9 lg:mx-0">
          {body}
        </p>
      </div>
      <div className="flex justify-center lg:justify-end">{media}</div>
      </div>
    </section>
  );
}

/** Blue "How it works" step cards with a large line icon. */
export function StepCards({ title, subtitle, steps }: { title: ReactNode; subtitle: ReactNode; steps: Item[] }) {
  return (
    <section className={`${CONTAINER} ${SECTION_Y}`}>
      <SectionHeader title={title} subtitle={subtitle} />
      <ol className={`${CONTENT} grid gap-6 md:grid-cols-3 md:gap-8 lg:gap-14 ${SECTION_HEAD_GAP}`}>
        {steps.map((s) => (
          <li key={s.title}>
            <Tilt className="h-full rounded-[20px]" max={8}>
            <div className="flex h-full min-h-[296px] flex-col items-center rounded-[20px] bg-[#5675FF] px-2 pb-8 pt-6 text-center">
              <span className="flex h-[101px] items-center justify-center">
                <Image src={s.icon.src} alt="" width={s.icon.width} height={s.icon.height} style={{ width: s.icon.width, height: s.icon.height }} />
              </span>
              <h3 className="mt-2 text-xl font-bold leading-[30px] text-white md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-[304px] text-base font-medium leading-[30px] text-white">{s.body}</p>
            </div>
            </Tilt>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** White benefit cards: blue icon + title + one-liner, two per row. */
function FigmaIcon({ icon }: { icon: Icon }) {
  return <Image src={icon.src} alt="" width={icon.width} height={icon.height} style={{ width: icon.width, height: icon.height }} />;
}

/** A grid card's icon: a Figma image export, or an inline SVG element (drawn in brand blue). */
export type GridItem = { icon: Icon | ReactNode; title: string; body: string };

function isIconAsset(icon: GridItem["icon"]): icon is Icon {
  return typeof icon === "object" && icon !== null && "src" in icon;
}

export function BenefitGrid({
  id,
  title,
  subtitle,
  items,
  compact,
  bento,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: string;
  items: GridItem[];
  /** Play Area cards are shorter (96px vs 114px in Figma). */
  compact?: boolean;
  /** Benefits sections: themed bento tiles instead of the Figma white list. */
  bento?: boolean;
}) {
  if (bento) return <BenefitBento id={id} title={title} subtitle={subtitle} items={items} />;
  return (
    <section id={id} className={`${CONTAINER} ${SECTION_Y}`}>
      <SectionHeader title={title} subtitle={subtitle} />
      <ul className={`${CONTENT} grid gap-5 md:grid-cols-2 md:gap-x-14 md:gap-y-[34px] ${SECTION_HEAD_GAP}`}>
        {items.map((b) => (
          <li key={b.title}>
            {/* white cards: tilt without the (invisible) white glare */}
            <Tilt className="h-full rounded-[10px]" max={4} scale={1.01} glare={false}>
            <div
              className={`flex h-full items-center gap-4 rounded-[10px] bg-white px-6 ring-1 ring-card-ring py-3.5 text-[#5675FF] md:gap-[25px] ${
                compact ? "min-h-[96px]" : "min-h-[114px]"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#5675FF] [&>svg]:h-[38px] [&>svg]:w-[38px]">
                {isIconAsset(b.icon) ? <FigmaIcon icon={b.icon} /> : b.icon}
              </span>
              <span>
                <span className="block text-xl font-bold leading-[30px] md:text-2xl">{b.title}</span>
                <span className="block text-[15px] leading-[30px] md:text-base">{b.body}</span>
              </span>
            </div>
            </Tilt>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- benefits bento ---------- */

/* Two desktop rows so the section fits one viewport:
   six tiles → 4 columns, wide|narrow|narrow then narrow|narrow|wide;
   otherwise 3 columns, wide|narrow then narrow|wide (an odd last tile takes the row). */
function bentoCols(n: number) {
  // four columns get a slightly wider measure so descriptions don't over-wrap
  return n === 6 ? "max-w-[1240px] lg:grid-cols-4" : "max-w-[1160px] lg:grid-cols-3";
}
function bentoWide(i: number, n: number) {
  if (n === 6) return i === 0 || i === 5 ? "lg:col-span-2" : "";
  if (n % 2 === 1 && i === n - 1) return "md:col-span-2 lg:col-span-3";
  return i % 4 === 0 || i % 4 === 3 ? "lg:col-span-2" : "";
}

/** Benefits as a bento in the page's own surface colour. Text sits top-left (titles
    align across each row); each tile's icon sits oversized and faint in the bottom-right
    corner (same size and inset everywhere; slate grey on white) and drifts in a touch on hover. */
function BenefitBento({ id, title, subtitle, items }: { id?: string; title: ReactNode; subtitle?: string; items: GridItem[] }) {
  return (
    <section id={id} className={`${CONTAINER} ${SECTION_Y}`}>
      <SectionHeader title={title} subtitle={subtitle} />
      <ul className={`mx-auto grid w-full gap-4 md:grid-cols-2 lg:gap-5 ${bentoCols(items.length)} ${SECTION_HEAD_GAP}`}>
        {items.map((b, i) => {
          const span = bentoWide(i, items.length);
          const wide = span !== "";
          const icon = isIconAsset(b.icon) ? <FigmaIcon icon={b.icon} /> : b.icon;
          const titleCls = `font-bold leading-snug tracking-[-0.01em] ${wide ? "text-[22px] md:text-[26px]" : "text-[19px] md:text-xl"}`;
          const bodyCls = `mt-2 leading-relaxed ${wide ? "max-w-[40ch] text-[15.5px] md:max-w-[min(40ch,calc(100%-8rem))] md:text-base" : "text-[14.5px]"}`;
          return (
            <li
              key={b.title}
              className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 pb-[84px] shadow-[0_18px_36px_-24px_rgb(0_0_0/0.8)] transition-[border-color,box-shadow] duration-300 hover:border-[#527DFF]/40 light:border-card-ring light:bg-white light:shadow-[0_1px_2px_rgb(15_23_42/0.05),0_12px_28px_-16px_rgb(15_23_42/0.18)] light:hover:shadow-[0_2px_4px_rgb(15_23_42/0.06),0_20px_40px_-18px_rgb(15_23_42/0.24)] ${span}`}
            >
              {/* faint icon in the bottom-right corner; wide tiles have short copy, so they get a larger title and icon to fill the extra width */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -z-10 ${wide ? "bottom-5 right-6 h-[116px] w-[116px]" : "bottom-4 right-4 h-[68px] w-[68px]"} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transition-none`}
              >
                <span className="block h-full w-full text-[#527DFF] opacity-[0.16] light:text-[#64748B] light:opacity-[0.22] light:[&>img]:grayscale [&>img]:h-full! [&>img]:w-full! [&>svg]:h-full [&>svg]:w-full">
                  {icon}
                </span>
                {/* hover: a band of Lumjha blue sweeps through the icon's own shape, then the icon is back to its resting grey */}
                {isIconAsset(b.icon) ? (
                  <span className="bento-flash absolute inset-0" style={{ "--icon": `url(${b.icon.src})` } as CSSProperties} />
                ) : (
                  // inline SVG: a blue copy of the icon, revealed by the same moving band
                  <span className="bento-flash-svg absolute inset-0 [&>svg]:h-full [&>svg]:w-full">{icon}</span>
                )}
              </span>
              <h3 className={`${titleCls} text-ink`}>{b.title}</h3>
              <p className={`${bodyCls} text-muted`}>{b.body}</p>
              {/* hover: a Lumjha Blue band sweeps across the whole tile, a faint sheen
                  plus a blue copy of the text laid exactly over the original */}
              <div aria-hidden className="tile-flash pointer-events-none absolute inset-0 p-6 text-[#527DFF] light:text-[#3E63F2]">
                <p className={titleCls}>{b.title}</p>
                <p className={bodyCls}>{b.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Numbered FAQ accordion — every answer starts open, as in Figma. */
export function Faq({ product, items }: { product: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => true));
  return (
    <section className={`${CONTAINER} ${SECTION_Y}`}>
      <div className="text-center">
        <h2 className={HEADING}>
          Frequently Asked <span className="text-highlight">Questions</span>
        </h2>
        <p className="mt-4 text-base font-medium text-ink/80 md:mt-5 md:text-lg">{product}</p>
      </div>
      <ul className={`${CONTENT} border-b border-[#DBE3ED] ${SECTION_HEAD_GAP}`}>
        {items.map((item, i) => {
          const isOpen = open[i];
          const id = `faq-${i}`;
          return (
            <li key={item.q} className="border-t border-[#DBE3ED] pb-8">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
                className="flex w-full items-center gap-4 pt-8 text-left md:gap-[23px]"
              >
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-[#5675FF] text-[15px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg font-semibold text-ink md:text-2xl">{item.q}</span>
                {/* minus; a second, rotated bar turns it into a plus when closed */}
                <span className="relative mr-1 flex h-5 w-5 shrink-0 items-center justify-center md:mr-10" aria-hidden>
                  <Image src="/assets/shared/faq-minus.svg" alt="" width={20} height={5} className="absolute" />
                  <Image
                    src="/assets/shared/faq-minus.svg"
                    alt=""
                    width={20}
                    height={5}
                    className={`absolute transition-transform duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"}`}
                  />
                </span>
              </button>
              <div
                id={id}
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-[58px] pt-2 text-base leading-relaxed text-ink md:pl-[65px] md:text-xl md:leading-9">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
