import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowLeft, HeaderCTA } from "@/components/primitives";
import { profile } from "@/data/site";
import { useRunSwitch } from "@/components/schematic/useSchematic";

/** The one sticky element on the site. <=56px, hairline appears only after scroll. */
export const SiteHeader = ({
  backTo,
  centerLabel,
  stops = 1,
}: {
  backTo?: { to: string; label: string };
  centerLabel?: string;
  /** section ports along the wire. 13 on the landing page, 1 everywhere else —
   *  the port count is a landing-page fact and must not leak onto /work. */
  stops?: number;
}) => {
  const [scrolled, setScrolled] = useState(false);
  // The header must adopt the tone of whatever is behind it. Left light over the
  // ink band it renders as an opaque grey slab meeting near-black at a hard
  // full-width edge — a seam parked on screen for the whole gallery chapter.
  const [overInk, setOverInk] = useState(false);

  const { pathname } = useLocation();

  // Two effects, because they cost completely different things.
  //
  // This one only reads window.scrollY, which forces no layout.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // This one used to live in the same handler, running querySelector plus
  // getBoundingClientRect on every scroll event — a forced synchronous layout
  // of the whole document per frame, and the most expensive persistent thing on
  // the site. An IntersectionObserver reports the identical condition for free:
  // shrinking the root to its top 56px makes "intersecting" mean exactly
  // "top <= 56 && bottom >= 0".
  //
  // Scoped to main so the portaled data-tone="plate" dialog can never match.
  useEffect(() => {
    const band = document.querySelector<HTMLElement>('main [data-tone="plate"]');
    if (!band || typeof IntersectionObserver === "undefined") {
      setOverInk(false);
      return;
    }
    let obs: IntersectionObserver | null = null;
    const build = () => {
      obs?.disconnect();
      obs = new IntersectionObserver(([e]) => setOverInk(e.isIntersecting), {
        rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 56)}px 0px`,
      });
      obs.observe(band);
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      obs?.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [pathname]);

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
      {/* THE RUN, END TO END. The header is the only element holding both ends of
          the site's one action — the wordmark it leaves and the button it
          arrives at — so it carries the whole run: a source port at the mark,
          one port per section along the wire, dashes travelling it, and a
          terminal node welded to the button.

          Three things fixed here from the first attempt: the strip was 2px with
          overflow:hidden so the packet inside it rendered as a clipped smear;
          .wire-fill declared scaleX(0) unconditionally and only animated inside
          @supports, so in Firefox the header's only component was a zero-width
          element; and the ports must NOT ride the fill, or they squeeze with it
          instead of lighting. Rest state is now the FINISHED state. */}
      <span className="wire" aria-hidden="true">
        <span className="wire-track" />
        <span className="wire-fill" />
        <span className="wire-ports">
          {Array.from({ length: stops }, (_, i) => (
            <i key={i} style={{ "--p": `${(((i + 1) / stops) * 100).toFixed(3)}%` } as React.CSSProperties} />
          ))}
        </span>
        <i className="wire-dash" style={{ "--d": "0s" } as React.CSSProperties} />
        <i className="wire-dash" style={{ "--d": "-6s" } as React.CSSProperties} />
        <i className="wire-dash" style={{ "--d": "-12s" } as React.CSSProperties} />
      </span>

      <div className="w-shell gutter flex h-14 items-center justify-between gap-s4">
        {backTo ? (
          <Link to={backTo.to} className="arrow-link t-small !text-ink-secondary hover:!text-ink">
            <ArrowLeft />
            {backTo.label}
          </Link>
        ) : (
          <Link to="/" className="t-body font-medium text-ink">
            {profile.name.split(" ")[0]} {profile.name.split(" ").slice(-1)}
            <span className="wire-source text-ink-tertiary">.dev</span>
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
          <span className="wire-dock">
            <span className="wire-terminus" aria-hidden="true" />
            <HeaderCTA href={profile.calendly} />
          </span>
        </div>
      </div>
    </header>
  );
};

/**
 * Closes the page. No second CTA — the CTA section directly above owns that job.
 *
 * THE TERMINUS. The header carries a wire that fills as you read; this is where
 * that run lands. The rail arrives from the left, reaches a node, and the node
 * closes — so the page is one run from the first pixel to the last, and the two
 * persistent elements on the site are the two ends of the same thing rather
 * than two unrelated ornaments.
 *
 * It draws on arrival rather than on a loop: a thing that terminates should
 * terminate once, and a footer that animates forever is a footer nobody leaves.
 */
export const SiteFooter = () => (
  <footer className="terminus border-t border-line">
    <div className="w-shell gutter">
      <div className="terminus-run" aria-hidden="true">
        <span className="terminus-rail" />
        <span className="terminus-node" />
        <span className="t-mono terminus-label">run complete</span>
      </div>
    </div>
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

export const Page = ({ children, header }: { children: ReactNode; header?: ReactNode }) => {
  // one switch, set before any apparatus mounts, so no loop ever runs unseen
  useRunSwitch();
  return (
    <div className="grain min-h-screen bg-surface">
      {header ?? <SiteHeader />}
      {/* tabIndex=-1 so the skip link actually moves focus, not just the hash */}
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        {children}
      </main>
      <div className="relative z-[1]">
        <SiteFooter />
      </div>
    </div>
  );
};
