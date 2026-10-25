"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CtaPanel from "./CtaPanel";
import ContactDisclosure from "./ContactDisclosure";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "./SectionHeader";
import BlueButton from "@/components/ui/BlueButton";
import Tilt from "@/components/ui/Tilt";

/* ============================================================
   Building blocks for the product pages (Chat Agent, Site Search,
   Policy Vault, Integration) — all share one Figma template:
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
    <section className={`${CONTAINER} flex flex-col items-center pb-8 pt-14 text-center md:pt-24`}>
      <h1 className="max-w-[980px] font-heading text-[clamp(2.25rem,4.5vw+1rem,4.6875rem)] font-semibold leading-[1.13] tracking-tight text-headline">
        {title} <span className="text-[#5675FF]">{accent}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-[1005px] text-lg leading-relaxed text-balance text-ink sm:text-xl md:mt-9 md:text-[28px] md:leading-9">
        {body}
      </p>
      <ContactDisclosure
        variant="dark"
        label="Book a Demo"
        rowClassName="mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-10 md:mt-11"
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
        <h2 className="font-heading text-[28px] font-bold leading-[1.4] tracking-tight text-ink sm:text-4xl md:text-[40px] md:leading-[72px]">
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
export function StepCards({ title, subtitle, steps }: { title: string; subtitle: ReactNode; steps: Item[] }) {
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
export function BenefitGrid({
  title,
  subtitle,
  items,
  compact,
}: {
  title: string;
  subtitle: string;
  items: Item[];
  /** Play Area cards are shorter (96px vs 114px in Figma). */
  compact?: boolean;
}) {
  return (
    <section className={`${CONTAINER} ${SECTION_Y}`}>
      <SectionHeader title={title} subtitle={subtitle} />
      <ul className={`${CONTENT} grid gap-5 md:grid-cols-2 md:gap-x-14 md:gap-y-[34px] ${SECTION_HEAD_GAP}`}>
        {items.map((b) => (
          <li key={b.title}>
            {/* white cards: tilt without the (invisible) white glare */}
            <Tilt className="h-full rounded-[10px]" max={4} scale={1.01} glare={false}>
            <div
              className={`flex h-full items-start gap-4 rounded-[10px] bg-white px-6 ring-1 ring-card-ring py-3.5 text-[#5675FF] md:gap-[25px] ${
                compact ? "min-h-[96px]" : "min-h-[114px]"
              }`}
            >
              <span className="mt-3.5 flex h-10 w-10 shrink-0 items-center justify-center">
                <Image src={b.icon.src} alt="" width={b.icon.width} height={b.icon.height} style={{ width: b.icon.width, height: b.icon.height }} />
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

/** Numbered FAQ accordion — every answer starts open, as in Figma. */
export function Faq({ product, items }: { product: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map(() => true));
  return (
    <section className={`${CONTAINER} ${SECTION_Y}`}>
      <div className="text-center">
        <h2 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-[40px]">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-lg font-semibold text-ink md:mt-4 md:text-2xl">{product}</p>
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
