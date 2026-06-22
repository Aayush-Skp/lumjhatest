import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t border-stroke/10 bg-bg-1/60 pt-16 pb-8 backdrop-blur-xl">
      <Container className="flex flex-col gap-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-fg-mid">
              {site.footer.pitch}
            </p>
            <a
              href={`mailto:${site.footer.contact}`}
              className="text-sm font-medium text-brand-200 transition-colors hover:text-brand-100"
            >
              {site.footer.contact}
            </a>
          </div>
          {site.footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-low">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-fg-mid transition-colors hover:text-fg-high"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-stroke/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-low">{site.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
