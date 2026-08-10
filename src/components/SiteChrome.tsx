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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/work", label: "Work" },
    { to: "/experience", label: "Experience" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 h-14 transition-colors duration-180 ${
        scrolled ? "border-b border-line-subtle" : "border-b border-transparent"
      }`}
      style={{ background: "hsl(var(--surface-base) / 0.88)", backdropFilter: "blur(12px)" }}
    >
      <div className="w-shell gutter flex h-14 items-center justify-between gap-s4">
        {backTo ? (
          <Link to={backTo.to} className="arrow-link t-step--1 !text-ink-secondary hover:!text-ink">
            <ArrowLeft />
            {backTo.label}
          </Link>
        ) : (
          <Link to="/" className="t-step-0 font-medium text-ink">
            {profile.name.split(" ")[0]} {profile.name.split(" ").slice(-1)}
            <span className="text-ink-tertiary">.dev</span>
          </Link>
        )}

        {centerLabel && (
          <p className="t-step--1 hidden max-w-[40ch] truncate text-ink-tertiary lg:block">{centerLabel}</p>
        )}

        <div className="flex items-center gap-s5">
          {!backTo && (
            <nav className="hidden items-center gap-s5 sm:flex" aria-label="Primary">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `t-step--1 transition-colors duration-120 ${isActive ? "text-ink" : "text-ink-secondary hover:text-ink"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          )}
          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-sm bg-brand-600 px-s4 text-[0.8125rem] font-medium text-white transition-colors duration-120 ease-out hover:bg-brand-700"
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
        <p className="t-step-0 font-medium text-ink">{profile.name}</p>
        <p className="t-step--1 mt-s2 text-ink-tertiary">
          {profile.role} · {profile.location}
        </p>
      </div>
      <nav className="flex flex-wrap items-start gap-x-s6 gap-y-s3" aria-label="Footer">
        <Link to="/" className="t-step--1 text-ink-secondary hover:text-ink">Home</Link>
        <Link to="/work" className="t-step--1 text-ink-secondary hover:text-ink">Work</Link>
        <Link to="/experience" className="t-step--1 text-ink-secondary hover:text-ink">Experience</Link>
        <a href={`mailto:${profile.email}`} className="t-step--1 text-ink-secondary hover:text-ink">Email</a>
      </nav>
    </div>
    <div className="w-shell gutter pb-s8">
      <p className="t-step--2 text-ink-tertiary">
        © {new Date().getFullYear()} {profile.name}. Client creative shown with permission of the agency that produced it.
      </p>
    </div>
  </footer>
);

export const Page = ({ children, header }: { children: ReactNode; header?: ReactNode }) => (
  <div className="min-h-screen bg-surface">
    {header ?? <SiteHeader />}
    <main id="main">{children}</main>
    <SiteFooter />
  </div>
);
