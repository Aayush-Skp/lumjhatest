import type { ComponentType, SVGProps } from "react";
import { Upload, FileText, Scissors, Cpu, Database } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import Reveal from "@/components/another-one/ui/Reveal";

type Stage = {
  no: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const STAGES: Stage[] = [
  {
    no: "01",
    icon: Upload,
    title: "Data Ingestion",
    body: "Files uploaded or websites crawled. Metadata stored securely.",
  },
  {
    no: "02",
    icon: FileText,
    title: "Text Extraction",
    body: "Content lifted from PDF / Word / Excel / Markdown / text. Converted to clean readable text.",
  },
  {
    no: "03",
    icon: Scissors,
    title: "Chunking",
    body: "Large content split into logical sections — each chunk tagged with topic, section, page.",
  },
  {
    no: "04",
    icon: Cpu,
    title: "Embedding",
    body: "Each chunk converted to a vector. Enables semantic understanding, not keyword matching.",
  },
  {
    no: "05",
    icon: Database,
    title: "Storage",
    body: "Raw files → secure storage · Text → database · Embeddings → vector DB.",
  },
];

export default function Pipeline({ id }: { id?: string }) {
  return (
    <section id={id} className="a1-section a1-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>Pipeline</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-display-lg text-[var(--color-text-primary)]">
          From your content to intelligent answers.
        </h2>
        <p className="mt-6 max-w-2xl font-body text-body-lg text-[var(--color-text-secondary)]">
          Five deterministic stages turn raw documents into semantically
          searchable knowledge your agent can reason with.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map(({ no, icon: Icon, title, body }, i) => (
            <Reveal
              key={no}
              delay={i * 0.06}
              className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-accent)]"
            >
              {/* ghost number watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 font-mono text-[5rem] font-bold leading-none text-[var(--color-accent)] opacity-[0.08] transition-all duration-300 group-hover:opacity-20"
              >
                {no}
              </span>
              {/* accent top bar grows on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-1 w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"
              />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border-bright)] bg-[var(--color-bg-3)] text-[var(--color-accent)]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="relative mt-4 font-display text-body-lg font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="relative mt-2 font-body text-body-sm text-[var(--color-text-secondary)]">
                {body}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 font-mono text-caption text-[var(--color-text-muted)]">
          Supported file types: PDF · DOCX · XLSX · Markdown · TXT
        </p>
      </div>
    </section>
  );
}
