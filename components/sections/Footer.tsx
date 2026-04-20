import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.24L4.8 22H2.04l6.98-7.97L2 2h6.914l4.312 5.7L18.244 2Zm-1.196 18h1.637L7.06 4H5.3l11.748 16Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.25H3V9.75ZM10 9.75h3.84v1.54h.06c.54-1.02 1.85-2.1 3.81-2.1 4.08 0 4.83 2.68 4.83 6.16V21h-4v-5.11c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.75Z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.54.12-3.2 0 0 1.01-.32 3.3 1.23a11.48 11.48 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.89.12 3.2.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.61-5.48 5.91.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-stroke/10 bg-bg-1/60 pt-16 pb-8 backdrop-blur-xl">
      <Container className="flex flex-col gap-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-fg-mid">
              {site.footer.pitch}
            </p>
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
          <div className="flex items-center gap-3 text-fg-low">
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke/10 bg-bg-2/40 hover:text-brand-300 hover:border-brand-300/30"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke/10 bg-bg-2/40 hover:text-brand-300 hover:border-brand-300/30"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke/10 bg-bg-2/40 hover:text-brand-300 hover:border-brand-300/30"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
