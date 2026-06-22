import { User, Mail, Tag, Radio, Hash } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";

const FIELDS = [
  { icon: User, label: "Name", value: "Jordan Lee" },
  { icon: Mail, label: "Email", value: "jordan@acme.co" },
  { icon: Tag, label: "Interest", value: "Gold plan" },
  { icon: Radio, label: "Source", value: "Website chat" },
  { icon: Hash, label: "Session ID", value: "sess_8f2a…" },
];

const STAGES = ["New", "Contacted", "Qualified", "Converted", "Lost"];
const ACTIVE_STAGE = 2;

export default function Leads({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Leads</Eyebrow>
          <h2 className="mt-3 max-w-md font-display text-display-lg text-[var(--color-text-primary)]">
            Capture leads inside the conversation.
          </h2>
          <p className="mt-6 max-w-md font-body text-body-lg text-[var(--color-text-secondary)]">
            Leads are captured gradually, conversationally. When required fields
            complete, a structured lead record is saved and linked back to the
            chat session. Track, filter, and export from one dashboard.
          </p>

          {/* Pipeline stages */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {STAGES.map((s, i) => (
              <span
                key={s}
                className="rounded-full border px-3 py-1.5 font-mono text-caption transition-colors"
                style={{
                  borderColor:
                    i <= ACTIVE_STAGE
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                  background:
                    i <= ACTIVE_STAGE
                      ? "var(--color-accent-dim)"
                      : "transparent",
                  color:
                    i <= ACTIVE_STAGE
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Lead record card */}
        <div className="rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-3)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-caption text-[var(--color-text-secondary)]">
              Lead Record
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent-dim)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-accent)]">
              Qualified
            </span>
          </div>

          <div className="mt-5 flex flex-col divide-y divide-[var(--color-border)]">
            {FIELDS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="group flex items-center gap-3 py-3 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-2)] text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent)]">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="w-24 font-body text-body-sm text-[var(--color-text-muted)]">
                  {label}
                </span>
                <span className="font-body text-body-sm font-medium text-[var(--color-text-primary)]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
