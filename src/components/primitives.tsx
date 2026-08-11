import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

/* ---------- icons: the site has exactly three glyphs ---------- */

export const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className={className}>
    <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className = "" }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className={className}>
    <path d="M13 8H4m0 0l3.5 3.5M4 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlayGlyph = ({ className = "" }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
    <path d="M7 4.5v11l9-5.5-9-5.5z" />
  </svg>
);

/* ---------- entrance: one per section, fires once, never scroll-coupled ---------- */

export function useEnter<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isIn, setIsIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `enter${isIn ? " is-in" : ""}` };
}

/* ---------- section header: eyebrow -> H2 -> deck. The layer-cake frosting. ---------- */

export const SectionHeader = ({
  eyebrow,
  title,
  deck,
  split = false,
  id,
  level = "section",
  tone = "brand",
}: {
  eyebrow: string;
  title: ReactNode;
  deck?: string;
  split?: boolean;
  id?: string;
  /** at most 3 chapters per page — above 44px is a budget, not a style */
  level?: "chapter" | "section";
  tone?: "brand" | "oxide" | "plain";
}) => {
  const h = level === "chapter" ? "t-chapter" : "t-section";
  const accent = tone === "oxide" ? "text-oxide-600" : tone === "plain" ? "text-ink-tertiary" : "text-brand-600";
  const rule = tone === "oxide" ? "bg-oxide-600" : tone === "plain" ? "bg-line-edge" : "bg-brand-600";
  if (split) {
    return (
      <div className="grid items-start gap-s5 lg:grid-cols-2 lg:gap-s8">
        <div>
          <span className={`sv-draw mb-s4 block h-px w-6 ${rule}`} aria-hidden="true" />
          <p className={`t-slug ${accent}`}>{eyebrow}</p>
          <h2 id={id} className={`${h} mt-s4 max-w-[22ch]`}>{title}</h2>
        </div>
        {deck && <p className="t-lead max-w-[38ch] text-ink-secondary lg:pt-s7">{deck}</p>}
      </div>
    );
  }
  return (
    <div className="w-text">
      <span className={`sv-draw mb-s4 block h-px w-6 ${rule}`} aria-hidden="true" />
      <p className={`t-slug ${accent}`}>{eyebrow}</p>
      <h2 id={id} className={`${h} mt-s4 max-w-[22ch]`}>{title}</h2>
      {deck && <p className="t-lead mt-s4 max-w-[52ch] text-ink-secondary">{deck}</p>}
    </div>
  );
};

/* ---------- buttons: exactly one filled button per viewport ---------- */

export const PrimaryButton = ({
  href,
  to,
  children,
  large = false,
}: {
  href?: string;
  to?: string;
  children: ReactNode;
  large?: boolean;
}) => {
  // ink, not blue. the accent is reserved for links, focus and the track spine —
  // spending it on buttons is what made it read as chrome.
  const cls = `inline-flex items-center justify-center gap-s2 rounded-sm bg-ink text-[hsl(var(--card))] transition-[background-color,transform,box-shadow] duration-180 ease-out hover:bg-ink-strong active:translate-y-px ${
    large ? "h-14 px-7 text-[1.0625rem]" : "h-12 px-6 text-[0.9375rem]"
  }`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} className={cls}>
      {children}
    </a>
  );
};

export const ArrowLink = ({ to, href, children }: { to?: string; href?: string; children: ReactNode }) => {
  const inner = (
    <>
      {children}
      <ArrowRight />
    </>
  );
  const cls = "arrow-link t-body";
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
};

/* ---------- status dot: factual only, never decorative ---------- */

export const StatusDot = ({ live }: { live: boolean }) =>
  live ? (
    <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
  ) : (
    <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full ring-1 ring-line-interactive" aria-hidden="true" />
  );

/* ---------- metric row: hairline grid that survives wrapping ---------- */

export const MetricRow = ({
  items,
  tone = "light",
}: {
  items: { value: string; caption: string }[];
  tone?: "light" | "ink";
}) => (
  // column count must follow the item count, or the trailing empty cells expose
  // the rule-grid's border-coloured background as a solid block
  <dl
    className={`rule-grid grid grid-cols-2 ${
      items.length === 2 ? "" : items.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4"
    }`}
    style={tone === "ink" ? { background: "hsl(var(--rule) / 0.14)" } : undefined}
  >
    {items.map((m) => (
      <div key={m.caption} className="px-s5 py-s6" style={tone === "ink" ? { background: "hsl(var(--plate-0))" } : undefined}>
        <dt className="t-numeral text-ink">{m.value}</dt>
        <dd className="t-slug mt-s2 max-w-[24ch] text-ink-tertiary">{m.caption}</dd>
      </div>
    ))}
  </dl>
);

/* ---------- phone frame: makes a dark creative read as a screen, not a hole ---------- */

export const PhoneFrame = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`phone-frame ${className}`}>
    <div className="aspect-[9/16] bg-surface-ink">{children}</div>
  </div>
);
