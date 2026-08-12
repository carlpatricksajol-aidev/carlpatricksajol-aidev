import { Link, useSearchParams } from "react-router-dom";
import { Page } from "@/components/SiteChrome";
import { ArrowRight, StatusDot } from "@/components/primitives";
import { caseStudies, otherSystems } from "@/data/site";

type Filter = "all" | "automation" | "creative";

const rows = [
  ...caseStudies.map((c) => ({
    title: c.title,
    track: c.track,
    year: c.year,
    note: c.oneLiner,
    stack: c.stack.slice(0, 4),
    to: `/work/${c.slug}`,
    status: c.status,
  })),
  ...otherSystems.map((s) => ({
    title: s.title,
    track: s.track,
    year: s.year,
    note: s.note,
    stack: s.stack,
    to: undefined,
    status: undefined,
  })),
];

const Work = () => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("track");
  const filter: Filter = raw === "automation" || raw === "creative" ? raw : "all";
  const visible = rows.filter((r) => filter === "all" || r.track === filter);

  const setFilter = (f: Filter) => {
    if (f === "all") setParams({});
    else setParams({ track: f });
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "automation", label: "Business & ops" },
    { key: "creative", label: "Creative AI" },
  ];

  return (
    <Page>
      <div className="w-shell gutter pt-s9 md:pt-s10">
        <div className="w-text">
          <p className="t-slug text-brand-600">Archive</p>
          <h1 className="t-display mt-s4 max-w-[18ch]">Every system, in one list</h1>
          <p className="t-lead mt-s5 max-w-[52ch] text-ink-secondary">
            Every build, across all eight service lines. The ones with case studies are linked; the
            rest are listed for completeness.
          </p>
        </div>

        <div className="mt-s7 flex flex-wrap gap-s2" role="group" aria-label="Filter by track">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`rounded-sm border px-s4 py-2 text-[0.8125rem] font-medium transition-colors duration-120 ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-line-interactive text-ink-secondary hover:bg-surface-sunken"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-shell gutter pb-s10 pt-s8">
        <ul className="border-t border-line">
          {visible.map((r) => {
            const inner = (
              <>
                <span className="min-w-0">
                  {/* a real h2 so the page has a heading outline a screen reader
                      (and the headings-only scan test) can actually use */}
                  <h2 className="t-sub text-ink">{r.title}</h2>
                  <span className="t-body mt-1 block max-w-[62ch] text-ink-secondary">{r.note}</span>
                  <span className="mt-s3 flex flex-wrap items-center gap-x-s3 gap-y-1">
                    {r.status && (
                      <span className="inline-flex items-center gap-s2">
                        <StatusDot live={r.status === "Live in production"} />
                        <span className="t-slug text-ink-tertiary">{r.status}</span>
                      </span>
                    )}
                    <span className="t-slug text-ink-tertiary">{r.stack.join(" · ")}</span>
                  </span>
                </span>
                <span className="flex items-center gap-s4 justify-self-end">
                  <span className="t-mono t-slug hidden text-ink-tertiary sm:block">{r.year}</span>
                  {r.to && (
                    <span className="text-brand-600 transition-transform duration-[160ms] group-hover:translate-x-1">
                      <ArrowRight />
                    </span>
                  )}
                </span>
              </>
            );

            return (
              <li key={r.title} className="border-b border-line">
                {r.to ? (
                  <Link to={r.to} className="group grid grid-cols-[1fr_auto] items-center gap-s4 py-s5 transition-colors duration-120 hover:bg-surface-sunken">
                    {inner}
                  </Link>
                ) : (
                  <div className="grid grid-cols-[1fr_auto] items-center gap-s4 py-s5">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Page>
  );
};

export default Work;
