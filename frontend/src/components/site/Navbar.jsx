import { useEffect, useState } from "react";
import LeafMotif from "@/components/LeafMotif";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Shop", href: "#categories" },
  { label: "Gallery", href: "#gallery" },
  { label: "Consign", href: "#consign" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-cream/80 border-b border-forest/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
          aria-label="Trio Collectives — home"
        >
          <LeafMotif className="h-8 w-4 text-forest" stroke="hsl(148 25% 24%)" />
          <div className="leading-none">
            <div className="font-serif text-2xl tracking-[0.04em] text-forest-ink">
              TRIO
            </div>
            <div className="text-[10px] uppercase tracking-widest2 text-muted2 -mt-0.5">
              Collectives
            </div>
          </div>
        </a>

        <nav
          data-testid="primary-nav"
          className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-widest2 text-forest-ink/80"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="nav-link hover:text-forest transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#visit"
          data-testid="nav-cta-visit"
          className="hidden md:inline-flex items-center gap-2 px-5 h-10 rounded-full bg-forest text-cream text-xs uppercase tracking-widest2 hover:bg-forest-deep transition-colors"
        >
          Visit Us
        </a>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-forest-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-forest-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-forest-ink transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 bg-cream/95 backdrop-blur-xl ${
          open ? "max-h-96 border-b border-forest/10" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
              className="text-forest-ink text-sm uppercase tracking-widest2"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            data-testid="mobile-nav-cta-visit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full bg-forest text-cream text-xs uppercase tracking-widest2"
          >
            Visit Us
          </a>
        </nav>
      </div>
    </header>
  );
}
