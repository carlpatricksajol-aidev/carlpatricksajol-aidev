import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, useEnter } from "@/components/primitives";
import { caseStudies } from "@/data/site";
import { caseLine, lineHeroFlow, lineOrder, type LineId } from "@/data/serviceLines";
import { lineCopy } from "@/data/serviceLineCopy";
import { chapters } from "@/data/copy";
import RoadmapBar from "@/components/schematic/RoadmapBar";

/**
 * ARCHETYPE: sticky-left / scrolling-right pair — the page's one use of it.
 *
 * The automation practice shown the way a client shops for it: eight service
 * lines, not one flat list of systems. Each row carries its plain promise, what
 * you receive, the real systems behind it, and — where one exists — a plate of
 * the running workflow. Lines built inside client accounts say so plainly
 * rather than borrowing someone else's visual.
 */
const ServiceLines = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const ch = chapters.automation;

  // The roadmap. One observer for all eight rows, so the active index changes
  // a handful of times per chapter rather than on every frame — the spine and
  // the numerals animate in CSS off a single class change.
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Map<number, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.i);
          seen.set(i, e.isIntersecting ? e.intersectionRatio : 0);
        }
        // the row occupying the most of the reading band wins, so the marker
        // never flickers between two rows meeting at a boundary
        let best = -1;
        let bestRatio = 0;
        for (const [i, r] of seen) if (r > bestRatio) { best = i; bestRatio = r; }
        if (best >= 0) setActive(best);
      },
      // a band across the middle of the viewport: what the reader is reading
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.5, 1] }
    );
    rowRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const casesFor = (id: LineId) =>
    caseStudies.filter((c) => caseLine[c.slug] === id);

  return (
    <section id="chapter-automation" ref={ref} className={`${className} section`} aria-labelledby="auto-h">
      <div className="grid12 items-start">
        {/* the pinned half */}
        <div className="col-span-12 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <span className="sv-draw mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-mono tnum text-[0.9375rem] text-brand-600">{ch.number}</p>
          <p className="t-slug mt-s2 text-ink-tertiary">{ch.eyebrow}</p>
          <h2 id="auto-h" className="t-chapter mt-s4 max-w-[12ch]">{ch.title}</h2>
          <p className="t-lead mt-s5 max-w-[34ch] text-ink-secondary">{ch.deck}</p>

          {/* THE ROADMAP. The index of eight is also a progress spine: a rail
              that fills to wherever you have read to, a node per line that
              lights as its row reaches the middle of the screen, and the
              current name pulled to full ink. It answers "where am I in this"
              without the reader having to count. */}
          <div className="roadmap mt-s6 hidden lg:block" style={{ ["--road" as string]: `${(active + 1) / lineOrder.length}` }}>
            <div className="roadmap-rail" aria-hidden="true">
              <span className="roadmap-fill" />
            </div>
            <ul>
              {lineOrder.map((id, i) => (
                <li key={id} className={i <= active ? "is-done" : ""} aria-current={i === active ? "true" : undefined}>
                  <a href={`#line-${id}`} className="roadmap-item">
                    <span className="roadmap-node" aria-hidden="true" />
                    <span className="t-mono tnum roadmap-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t-small roadmap-name">{lineCopy[id].name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-micro mt-s4 text-ink-tertiary">
              <span className="tnum text-ink">{String(active + 1).padStart(2, "0")}</span> of{" "}
              <span className="tnum">{String(lineOrder.length).padStart(2, "0")}</span> service lines
            </p>
          </div>
        </div>

        {/* the scrolling half */}
        {/* the scrolling half. RoadmapBar is the roadmap's phone form and MUST
            live here, not in the index column — a taller sibling in
            grid12 items-start stops the desktop index sticking. */}
        <div className="col-span-12 mt-s6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <RoadmapBar active={active} />
          {lineOrder.map((id, i) => {
            const c = lineCopy[id];
            const plate = lineHeroFlow[id];
            const cases = casesFor(id);
            return (
              <article
                key={id}
                id={`line-${id}`}
                data-i={i}
                ref={(el) => (rowRefs.current[i] = el)}
                className={`line-row scroll-mt-28 border-t border-line py-s6 last:border-b ${
                  i === active ? "is-reading" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-s4">
                  <h3 className="t-sub text-ink">{c.name}</h3>
                  <span className="t-mono tnum shrink-0 text-[0.8125rem] text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="t-lead mt-s3 max-w-[46ch] text-ink">{c.promise}</p>
                <p className="t-body mt-s3 max-w-[56ch] text-ink-secondary">{c.detail}</p>

                {/* what you receive — a fixed 3-up so every line answers the
                    same question in the same shape */}
                <p className="t-slug mt-s5 text-ink-tertiary">What you get</p>
                <ul className="mt-s3 grid gap-px border-t border-line sm:grid-cols-3">
                  {c.deliverables.map((d, j) => (
                    <li
                      key={d}
                      className={`t-small border-b border-line py-s3 text-ink-secondary sm:border-b-0 sm:pr-s4 ${
                        j > 0 ? "sm:border-l sm:border-line sm:pl-s4" : ""
                      }`}
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                {plate && (
                  <div className="mt-s5 overflow-hidden rounded-md border border-line bg-surface-sunken">
                    <img src={plate} alt="" loading="lazy" decoding="async" className="w-full" />
                  </div>
                )}

                <p className="t-micro mt-s4 flex items-start gap-s2 text-ink-tertiary">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      c.proof === "live" ? "bg-signal" : "ring-1 ring-line-interactive"
                    }`}
                    aria-hidden="true"
                  />
                  {c.evidence}
                </p>

                {cases.length > 0 && (
                  <ul className="mt-s4 flex flex-wrap gap-s2">
                    {cases.map((cs) => (
                      <li key={cs.slug}>
                        <Link
                          to={`/work/${cs.slug}`}
                          className="group inline-flex items-center gap-s2 rounded-xs border border-line bg-surface-raised px-s3 py-1.5 transition-colors duration-120 hover:border-line-strong"
                        >
                          <span className="t-small text-ink-secondary">{cs.title}</span>
                          <ArrowRight className="text-brand-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceLines;
