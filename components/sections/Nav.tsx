"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { useUIStore } from "@/store/useUIStore";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { navOpen, toggleNav, closeNav, activeSection } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-stroke/10 bg-bg-0/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-18">
        <a href="#hero" aria-label="Lumjha — home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {site.nav.links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-fg-high"
                    : "text-fg-mid hover:text-fg-high",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-bg-3/70 border border-stroke/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" href={site.urls.login}>
            {site.nav.cta.secondary}
          </Button>
          <Button variant="primary" size="sm" href={site.urls.login}>
            {site.nav.cta.primary}
          </Button>
        </div>

        <button
          type="button"
          onClick={toggleNav}
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-stroke/10 bg-bg-2/60 text-fg-high md:hidden"
        >
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {navOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-stroke/10 bg-bg-0/95 backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {site.nav.links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeNav}
                  className="rounded-lg px-3 py-2.5 text-sm text-fg-mid hover:bg-bg-3/60 hover:text-fg-high"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  href={site.urls.login}
                  onClick={closeNav}
                >
                  {site.nav.cta.secondary}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  href={site.urls.login}
                  onClick={closeNav}
                >
                  {site.nav.cta.primary}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
