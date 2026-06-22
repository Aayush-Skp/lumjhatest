export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-caption uppercase tracking-widest text-[var(--color-accent)]">
      {children}
    </p>
  );
}
