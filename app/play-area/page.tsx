import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import WaveGlow from "@/components/site/WaveGlow";
import { BenefitGrid, StepCards } from "@/components/site/ProductSections";
import BlueButton from "@/components/ui/BlueButton";

export const metadata: Metadata = {
  title: "Play Area",
  description:
    "Test-drive Lumjha in real time. Ask a question and see how Lumjha delivers instant, accurate and helpful answers.",
};

/** Live sandbox agent embedded in the demo window (the app allows framing). */
const SANDBOX_CHAT_URL = "https://app.lumjha.ai/chat/mohit?sandbox";

const A = "/assets/play-area";

const STEPS = [
  {
    icon: { src: `${A}/upload-cloud.svg`, width: 97.6635, height: 98 },
    title: "Upload your content",
    body: "Add your website, documents or knowledge base. Lumjha learns your information.",
  },
  {
    icon: { src: `${A}/ask-question.svg`, width: 100.653, height: 101 },
    title: "Ask a question",
    body: "Type your question or upload a file. Get clear, accurate answers instantly.",
  },
  {
    icon: { src: `${A}/check-circle.svg`, width: 82.715, height: 83 },
    title: "See the result",
    body: "Receive helpful, precise answers — with sources when applicable.",
  },
];

const ICON = { width: 40, height: 40 };

// Figma reuses one placeholder line for most cards; kept verbatim.
const WHY = [
  { icon: { src: `${A}/instant-answers.svg`, ...ICON }, title: "Instant answers", body: "Give your customers the information they need, right away." },
  { icon: { src: `${A}/more-leads.svg`, ...ICON }, title: "More Leads", body: "Give your customers the information they need, right away." },
  { icon: { src: `${A}/availability-clock.svg`, ...ICON }, title: "24/7 Availability", body: "Your AI agent runs constantly, even when you’re offline." },
  { icon: { src: `${A}/shield-check.svg`, ...ICON }, title: "Accurate and reliable", body: "Give your customers the information they need, right away." },
  { icon: { src: `${A}/easy-pointer.svg`, ...ICON }, title: "Easy to use", body: "Give your customers the information they need, right away." },
  { icon: { src: `${A}/happier-smile.svg`, ...ICON }, title: "Happier customers", body: "Give your customers the information they need, right away." },
];

/** Soft blue radial pool from the Figma "Ambient glow" ellipses. */
function Glow({ className }: { className: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- decorative SVG stretched to its box
  return <img src="/assets/shared/ambient-glow.svg" alt="" aria-hidden className={`pointer-events-none absolute -z-10 max-w-none ${className}`} />;
}

export default function PlayAreaPage() {
  return (
    <div className="min-h-screen bg-[#090a0f] font-sans text-white antialiased">
      <Navbar />
      <main id="top" className="relative isolate overflow-x-clip">
        {/* HERO + live demo */}
        <section className="relative isolate mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 text-center sm:px-6 md:pb-24 md:pt-12">
          <Glow className="-left-[21%] top-[8%] h-[622px] w-[651px]" />
          <Glow className="-right-[13%] top-[16%] h-[622px] w-[651px]" />
          <Glow className="left-[2%] top-[9%] h-[423px] w-[89%]" />

          <h1 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[40px] md:leading-[72px]">
            Test-drive Lumjha in real time.
          </h1>
          <p className="mx-auto mt-3 max-w-[1024px] text-lg leading-relaxed text-balance text-white sm:text-xl md:mt-3.5 md:text-[28px] md:leading-9">
            Try our AI-powered customer agent. Ask a question, explore your knowledge, and see how
            Lumjha delivers instant, accurate and helpful answers.
          </p>

          {/* TODO(backend): email capture for the demo isn't wired to anything yet */}
          <label className="mx-auto mt-10 flex h-8 w-full max-w-[317px] items-center gap-2 rounded-full bg-white px-3 md:mt-12">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#49454F]" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Your email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="enter your email"
              className="w-full bg-transparent text-[15px] text-[#1D1B20] outline-none placeholder:text-[#ABABAB]"
            />
          </label>

          <div className="mx-auto mt-10 w-full max-w-[1058px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D14] shadow-[0_30px_90px_-30px_rgba(0,121,242,0.55)] md:mt-14">
            <iframe
              src={SANDBOX_CHAT_URL}
              title="Lumjha AI Chat Agent — live demo"
              loading="lazy"
              allow="microphone; clipboard-write"
              className="block h-[480px] w-full md:h-[556px]"
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="relative isolate">
          <Glow className="-left-[18%] top-0 h-[747px] w-[802px]" />
          <Glow className="-right-[14%] -top-[6%] h-[761px] w-[934px]" />
          <StepCards
            title="HOW IT WORKS"
            subtitle={
              <>
                Get answers in 3 simple steps
                <br />
                No setup. No technical skills. Just upload, ask and get instant answers.
              </>
            }
            steps={STEPS}
          />
        </div>

        {/* WHY TRY IT */}
        <div className="relative isolate">
          <Glow className="-left-[24%] -top-[10%] h-[875px] w-[1091px]" />
          <Glow className="-right-[15%] -top-[8%] h-[865px] w-[884px]" />
          <BenefitGrid
            title="Why try it?"
            subtitle="Save time, delight your customers, and never miss an opportunity."
            items={WHY}
            compact
          />
        </div>

        {/* BE WHEREVER — black band lit by the Figma wave shader */}
        <section className="relative isolate overflow-hidden bg-black px-4 py-16 text-center sm:px-6 md:min-h-[373px] md:py-10">
          <div aria-hidden className="absolute inset-0 -z-10">
            <WaveGlow x={61.99686050415039} y={50} radius={65.49695587158203} angle={26.073211669921875} />
          </div>
          <h2 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[40px] md:leading-[72px]">
            Be Wherever Your Customers Are
          </h2>
          <p className="mx-auto mt-3 max-w-[1022px] text-base leading-relaxed text-balance text-white sm:text-lg md:mt-0 md:text-xl md:leading-9">
            Ask questions, test instant responses, and see how our AI processes information right here
            in your browser. Want to upload your own business data? Sign in for full access free for 14
            days, no credit card required.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-9 md:mt-[78px]">
            <BlueButton large>Log In for Full Access</BlueButton>
            <BlueButton large outline href="/#platform">Explore Features</BlueButton>
          </div>
        </section>

        <CtaPanel contactLabel="Book a Demo" />
        <Footer />
      </main>
    </div>
  );
}
