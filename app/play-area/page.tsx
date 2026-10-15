import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BlueButton from "@/components/site/BlueButton";
import CtaSection from "@/components/site/CtaSection";
import WaveLines from "@/components/site/WaveLines";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import Tilt from "@/components/ui/Tilt";

export const metadata: Metadata = {
  title: "Play Area",
  description:
    "Test-drive Lumjha in real time. Ask a question, explore a knowledge base, and see how Lumjha delivers instant, accurate answers.",
};

/* ============================================================
   Play Area — try the AI agent before signing up (Figma design)
   ============================================================ */

/* Line icons in the 24×24 Lucide style; each entry is one stroked path. */
const ICONS = {
  upload: ["M12 13v8", "M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.24", "m8 17 4-4 4 4"],
  question: [
    "M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M9.6 8.4a2.5 2.5 0 0 1 4.9.7c0 1.7-2.5 2.1-2.5 3.4",
    "M12 14.5h.01",
  ],
  check: ["M21.8 10A10 10 0 1 1 17 3.34", "m9 11 3 3L22 4"],
  zap: ["M13 2 3 14h9l-1 8 10-12h-9l1-8Z"],
  clock: ["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "M12 6v6l4 2"],
  pointer: [
    "M12.6 12.6 19 19",
    "M3.7 3a.5.5 0 0 0-.65.65l6.5 16a.5.5 0 0 0 .95-.06l1.57-6.08a2 2 0 0 1 1.45-1.48l6.12-1.58a.5.5 0 0 0 .06-.95Z",
  ],
  userPlus: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0", "M19 8v6", "M22 11h-6"],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
    "m9 12 2 2 4-4",
  ],
  smile: ["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
} as const;

function Icon({ name, className, strokeWidth = 1.75 }: { name: keyof typeof ICONS; className: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ---------- how it works ---------- */

const STEPS: { icon: keyof typeof ICONS; title: string; body: string }[] = [
  {
    icon: "upload",
    title: "Upload your content",
    body: "Upload your website, documents or knowledge base. Lumjha learns your content.",
  },
  {
    icon: "question",
    title: "Ask a question",
    body: "Type your question or upload a file. Get clear, accurate answers instantly.",
  },
  {
    icon: "check",
    title: "See the result",
    body: "Receive helpful, precise answers — with sources when applicable.",
  },
];

/* ---------- why try it ---------- */

/* Left column: plain white cards; right column: white fading into a soft
   blue sheen, as in the Figma. */
const BENEFITS: { icon: keyof typeof ICONS; title: string; body: string }[] = [
  { icon: "zap", title: "Instant answers", body: "Give your customers the information they need, right away." },
  { icon: "userPlus", title: "More Leads", body: "Capture contact details naturally while you answer questions." },
  { icon: "clock", title: "24/7 Availability", body: "Your AI agent runs constantly, even when you're offline." },
  { icon: "shield", title: "Accurate and reliable", body: "Answers come straight from your own content, with sources." },
  { icon: "pointer", title: "Easy to use", body: "No code and no setup — upload your content and start chatting." },
  { icon: "smile", title: "Happier customers", body: "Quick, helpful replies keep visitors engaged and coming back." },
];

/* ---------- page ---------- */

export default function PlayAreaPage() {
  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased light:bg-[#F5F7FC] light:text-[#0B1526]">
      <Navbar prefix="/" />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-56 h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -right-40 top-[420px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/25 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -left-40 top-[1100px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/20 blur-[120px] light:bg-[#527DFF]/10" />

        {/* HERO — live demo window */}
        <section className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
          <SectionHeader
            as="h1"
            title="Test-drive Lumjha in real time."
            subtitle="Try our AI-powered customer agent. Ask a question, explore your knowledge, and see how Lumjha delivers instant, accurate and helpful answers."
          />
          <Tilt className={`mx-auto max-w-[1170px] rounded-xl md:rounded-2xl ${SECTION_HEAD_GAP}`} max={3} scale={1.01} glare={false}>
            {/* TODO: blank placeholder — drop the product screenshot (or live demo) in here */}
            <div
              aria-hidden
              className="aspect-[1.9] w-full rounded-xl border-2 border-[#527DFF] bg-white shadow-[0_24px_80px_-20px_rgba(82,125,255,0.55)] md:rounded-2xl"
            />
          </Tilt>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="HOW IT WORKS"
            subtitle={
              <>
                <span className="block">Get answers in 3 simple steps</span>
                <span className="block">No setup. No technical skills. Just upload, ask and get instant answers.</span>
              </>
            }
          />
          <ol className={`mx-auto grid max-w-[1170px] grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-14 ${SECTION_HEAD_GAP}`}>
            {STEPS.map((s) => (
              <li key={s.title} className="flex">
                <Tilt className="flex w-full rounded-2xl" max={8}>
                  <div className="flex w-full flex-col items-center rounded-2xl bg-[#527DFF] px-6 py-8 text-center text-white shadow-[0_24px_60px_-20px_rgba(82,125,255,0.6)] md:py-10">
                    <Icon name={s.icon} className="h-12 w-12 text-white md:h-14 md:w-14" />
                    <h3 className="mt-4 text-lg font-bold md:mt-5 md:text-xl">{s.title}</h3>
                    <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-white/90 md:text-sm">{s.body}</p>
                  </div>
                </Tilt>
              </li>
            ))}
          </ol>
        </section>

        {/* WHY TRY IT */}
        <section id="why" className={`relative mx-auto max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
          <SectionHeader
            title="Why try it?"
            subtitle="Save time, delight your customers, and never miss an opportunity."
          />
          <ul className={`mx-auto grid max-w-[1170px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-14 md:gap-y-5 ${SECTION_HEAD_GAP}`}>
            {BENEFITS.map((b, i) => (
              <li key={b.title}>
                {/* wide, short rows → gentle angle, as on the commitments list */}
                <Tilt className="rounded-lg" max={3} scale={1.01} glare={false}>
                  <div
                    className={`flex items-center gap-4 rounded-lg px-5 py-4 md:px-6 md:py-5 ${
                      i % 2 === 0
                        ? "bg-white light:ring-1 light:ring-[#D7E3F5]"
                        : "bg-[linear-gradient(90deg,#FFFFFF_0%,#D9E6FF_65%,#E8EBF2_100%)] light:ring-1 light:ring-[#D7E3F5]"
                    }`}
                  >
                    <Icon name={b.icon} className="h-6 w-6 shrink-0 text-[#527DFF] md:h-7 md:w-7" />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-[#3E63F2] md:text-lg">{b.title}</span>
                      <span className="mt-0.5 block text-[12px] text-[#527DFF]/90 md:text-[13px]">{b.body}</span>
                    </span>
                  </div>
                </Tilt>
              </li>
            ))}
          </ul>
        </section>

        {/* FULL ACCESS — same navy as the page, with thin light lines drifting behind */}
        <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 md:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)]">
            <WaveLines />
          </div>
          <div className="mx-auto max-w-[1440px]">
            <SectionHeader
              title="Be Wherever Your Customers Are"
              subtitle={
                <>
                  Ask questions, test instant responses, and see how our AI processes information
                  right here in your browser. Want to upload your own business data? Sign in for
                  full access free for 14 days, no credit card required.
                </>
              }
            />
            <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10">
              <BlueButton large>Log In for Full Access</BlueButton>
              <BlueButton outline large href="/#platform">Explore Features</BlueButton>
            </div>
          </div>
        </section>

        <CtaSection />

        <Footer />
      </main>
    </div>
  );
}
