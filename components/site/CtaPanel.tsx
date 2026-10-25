"use client";

import Image from "next/image";
import ContactDisclosure from "./ContactDisclosure";
import BlueButton from "@/components/ui/BlueButton";
import Tilt from "@/components/ui/Tilt";

/** "Ready to Scale" blue panel on the topographic white band — closes every page. */
export default function CtaPanel({ contactLabel = "Contact Us" }: { contactLabel?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-28">
      {/* topographic pattern — the PNG carries its own transparency */}
      <Image
        src="/assets/cta-pattern.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover"
      />
      <div className="mx-auto max-w-[1440px]">
        {/* gentle tilt for the large panel; pauses while the contact form has focus */}
        <Tilt className="rounded-3xl" max={3} scale={1.01}>
        <div className="rounded-3xl bg-[#506DFF] px-6 py-14 text-center shadow-xl sm:px-10 md:py-20 lg:py-24">
          <h2 className="mx-auto max-w-4xl font-heading text-[28px] font-bold leading-tight tracking-tight text-balance text-white sm:max-w-none sm:whitespace-nowrap sm:text-[clamp(1.5rem,calc((100vw_-_128px)/22),3rem)]">
            Ready to Scale Your Customer Experience?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-balance text-white/85 sm:text-base md:mt-6 md:text-lg">
            Deliver instant, personalized answers across web, messaging, and social apps
            without increasing your team&apos;s workload.
          </p>
          <ContactDisclosure
            variant="light"
            label={contactLabel}
            rowClassName="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10"
            buttonClassName="inline-flex items-center justify-center rounded-lg border border-white/80 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10 md:px-8 md:text-base"
          >
            <BlueButton light large>Start Free Trial</BlueButton>
          </ContactDisclosure>
        </div>
        </Tilt>
      </div>
    </section>
  );
}
