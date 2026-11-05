"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type SVGProps } from "react";
import { WebsiteIcon } from "@/components/ui/ChannelIcons";
import { DocIcon, ShieldIcon } from "./EngineFlow";

/* ============================================================
   Integration page chat widget. The first time it scrolls into
   view it plays a real exchange: the question is typed and sent,
   the agent "thinks", then answers and cites its sources — and
   the finished conversation stays put. Reduced motion → final state.
   ============================================================ */

const QUESTION = "What is your return policy?";
const ANSWER = "You can return products within 30 days of purchase. Items must be unused and in original condition.";

const SOURCE_CHIPS = [
  { label: "Website", icon: WebsiteIcon },
  { label: "Policy doc", icon: DocIcon },
  { label: "Policies", icon: ShieldIcon },
];

/** idle → typing the question → sent → agent thinking → answer → sources (held). */
type Stage = "idle" | "typing" | "sent" | "thinking" | "answer" | "sources";
const ORDER: Stage[] = ["idle", "typing", "sent", "thinking", "answer", "sources"];

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.4 3.6a1 1 0 0 0-1.36 1.2L5.3 12l-2.26 7.2a1 1 0 0 0 1.36 1.2l16-7.5a1 1 0 0 0 0-1.8zM6.9 13h5.6a1 1 0 0 0 0-2H6.9" />
    </svg>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <circle cx="12" cy="9" r="3.6" />
      <path d="M5.5 19.2a6.8 6.8 0 0 1 13 0 9 9 0 0 1-13 0" />
    </svg>
  );
}

function ChatAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF] ring-1 ring-[#527DFF]/20">
      <Image src="/logo.png" alt="" width={405} height={564} className="h-4 w-auto" />
    </span>
  );
}

const BUBBLE = "rounded-xl bg-white/[0.07] px-3 py-2 light:bg-[#EDF1F8]";
/** Fade + rise in when `on`; stays laid out (invisible) before, so nothing jumps. */
const reveal = (on: boolean) =>
  `transition-all duration-500 ease-out ${on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`;

export default function OrbitChat() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTyped(QUESTION.length);
        setStage("sources");
        return;
      }
      setStage("typing");
      const perChar = 45;
      for (let i = 1; i <= QUESTION.length; i++) at(300 + i * perChar, () => setTyped(i));
      const sent = 300 + QUESTION.length * perChar + 350;
      at(sent, () => setStage("sent"));
      at(sent + 500, () => setStage("thinking"));
      at(sent + 2000, () => setStage("answer"));
      at(sent + 2600, () => setStage("sources"));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const past = (s: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(s);
  const inputText = stage === "typing" ? QUESTION.slice(0, typed) : "";

  return (
    <div
      ref={ref}
      className="relative z-10 w-full max-w-[320px] shrink-0 rounded-2xl border-2 border-[#527DFF]/30 bg-surface/85 p-3 text-left shadow-[0_24px_60px_-28px_rgba(82,125,255,0.6)] backdrop-blur lg:w-[244px] xl:w-[284px] light:border-[#D9E1F2] light:bg-[#F8FAFD] light:shadow-none"
    >
      <div className="flex items-center gap-2 border-b border-line pb-2.5">
        <ChatAvatar />
        <p className="text-[12px] font-semibold text-ink">Lumjha AI</p>
        <p className="flex items-center gap-1 text-[9.5px] font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Online
        </p>
        <span aria-hidden className="ml-auto pr-1 text-[13px] font-bold leading-none tracking-[0.1em] text-subtle">
          ···
        </span>
      </div>

      {/* screen readers get the finished exchange; the animation is visual only */}
      <p className="sr-only">
        Customer asks: {QUESTION} Lumjha AI answers: {ANSWER} Sources: website, policy doc, policies.
      </p>

      <div aria-hidden className="flex min-h-[150px] flex-col gap-3 pt-3 text-[11px] leading-relaxed text-ink lg:min-h-[208px] xl:min-h-[232px] xl:text-[11.5px]">
        <div className={`flex items-center justify-end gap-2 ${reveal(past("sent"))}`}>
          <p className={BUBBLE}>{QUESTION}</p>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF] text-[#3E63F2] ring-1 ring-[#527DFF]/30">
            <UserIcon className="h-5 w-5" />
          </span>
        </div>

        <div className={`flex items-start gap-2 ${reveal(past("thinking"))}`}>
          <ChatAvatar />
          <div className="min-w-0">
            {past("answer") ? (
              <p className={`${BUBBLE} chat-in`}>{ANSWER}</p>
            ) : (
              <p className={`${BUBBLE} inline-flex items-center gap-1 py-3`}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#6E8BFF]" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </p>
            )}
            <ul className={`mt-2 flex flex-wrap gap-1 ${reveal(past("sources"))}`}>
              {SOURCE_CHIPS.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-1 rounded-full border border-line bg-white/[0.04] px-1.5 py-0.5 text-[8.5px] text-muted light:border-[#E1E7F2] light:bg-white"
                >
                  <c.icon className="h-3 w-3 text-[#6E8BFF] light:text-[#3E63F2]" />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden className="mt-3 flex items-center rounded-full border border-line py-1 pl-3.5 pr-1 light:border-[#DCE3F0] light:bg-white">
        <span className={`flex-1 truncate text-[10.5px] ${inputText ? "text-ink" : "text-subtle"}`}>
          {inputText || "Ask anything..."}
          {stage === "typing" && <span className="caret-blink ml-px inline-block h-3 w-px translate-y-0.5 bg-ink" />}
        </span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-[#2F6BFF] text-white transition-transform duration-200 ${stage === "sent" ? "scale-90" : ""}`}
        >
          <SendIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
