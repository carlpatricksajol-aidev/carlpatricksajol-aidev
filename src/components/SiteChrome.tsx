import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowLeft, PrimaryButton } from "@/components/primitives";
import { profile } from "@/data/site";

/** The one sticky element on the site. <=56px, hairline appears only after scroll. */
export const SiteHeader = ({
  backTo,
  centerLabel,
}: {
  backTo?: { to: string; label: string };
  centerLabel?: string;
}) => {
  const [scrolled, setScrolled] = useState(false);
  // The header must adopt the tone of whatever is behind it. Left light over the
  // ink band it renders as an opaque grey slab meeting near-black at a hard
  // full-width edge — a seam parked on screen for the whole gallery chapter.
  const [overInk, setOverInk] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const band = document.querySelector<HTMLElement>('[data-tone="plate"]');
      if (!band) {
        setOverInk(false);
        return;
      }
      const r = band.getBoundingClientRect();
      setOverInk(r.top <= 56 && r.bottom >= 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nav = [
    { to: "/work", label: "Work" },
    { to: "/experience", label: "Experience" },
  ];

  return (
    <header
      data-tone={overInk ? "plate" : undefined}
      className={`sticky top-0 z-50 h-14 transition-colors duration-180 ${
        scrolled ? "border-b border-line-subtle" : "border-b border-transparent"
      }`}
      style={{
        background: overInk ? "hsl(var(--plate-0) / 0.82)" : "hsl(var(--paper) / 0.88)",
        backdropFilter: "blur(12px)",
        color: overInk ? "hsl(var(--text-on-ink))" : undefined,
      }}
    >
      <div className="w-shell gutter flex h-14 items-center justify-between gap-s4">
        {backTo ? (
          <Link to={backTo.to} className="arrow-link t-small !text-ink-secondary hover:!text-ink">
            <ArrowLeft />
            {backTo.label}
          </Link>
        ) : (
          <Link to="/" className="t-body font-medium text-ink">
            {profile.name.split(" ")[0]} {profile.name.split(" ").slice(-1)}
            <span className="text-ink-tertiary">.dev</span>
          </Link>
        )}

        {centerLabel && (
          <p className="t-small hidden max-w-[40ch] truncate text-ink-tertiary lg:block">{centerLabel}</p>
        )}

        <div className="flex items-center gap-s5">
          {!backTo && (
            <nav className="hidden items-center gap-s5 sm:flex" aria-label="Primary">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `t-small transition-colors duration-120 ${isActive ? "text-ink" : "text-ink-secondary hover:text-ink"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          )}
          {/* outlined, not filled: the page's focal budget allows one saturated
              accent fill per viewport, and the hero / final CTA own it */}
          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-sm border border-line-interactive px-s4 text-[0.8125rem] font-medium text-ink transition-colors duration-120 ease-out hover:bg-surface-sunken"
          >
            Book a call
          </a>
        </div>
      </div>
    </header>
  );
};

/** Closes the page. No second CTA — the CTA section directly above owns that job. */
export const SiteFooter = () => (
  <footer className="border-t border-line">
    <div className="w-shell gutter grid gap-s6 py-s8 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="t-body font-medium text-ink">{profile.name}</p>
        <p className="t-small mt-s2 text-ink-tertiary">
          {profile.role} · {profile.location}
        </p>
      </div>
      <nav className="flex flex-wrap items-start gap-x-s6 gap-y-s3" aria-label="Footer">
        <Link to="/" className="t-small text-ink-secondary hover:text-ink">Home</Link>
        <Link to="/work" className="t-small text-ink-secondary hover:text-ink">Work</Link>
        <Link to="/experience" className="t-small text-ink-secondary hover:text-ink">Experience</Link>
        <a href={`mailto:${profile.email}`} className="t-small text-ink-secondary hover:text-ink">Email</a>
      </nav>
    </div>
    <div className="w-shell gutter pb-s8">
      <p className="t-slug text-ink-tertiary">
        © {new Date().getFullYear()} {profile.name}. Brand marks belong to their owners and are shown
        to identify the platforms worked with.
      </p>
    </div>
  </footer>
);

export const Page = ({ children, header }: { children: ReactNode; header?: ReactNode }) => (
  <div className="grain min-h-screen bg-surface">
    {header ?? <SiteHeader />}
    {/* tabIndex=-1 so the skip link actually moves focus, not just the hash */}
    <main id="main" tabIndex={-1} className="outline-none">
      {children}
    </main>
    <SiteFooter />
  </div>
);
