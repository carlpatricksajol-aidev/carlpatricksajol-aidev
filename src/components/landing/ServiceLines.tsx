import { Link } from "react-router-dom";
import { ArrowRight, useEnter } from "@/components/primitives";
import { caseStudies } from "@/data/site";
import { caseLine, lineHeroFlow, lineOrder, type LineId } from "@/data/serviceLines";
import { lineCopy } from "@/data/serviceLineCopy";
import { chapters } from "@/data/copy";

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

          {/* an index of the eight, so the breadth is legible before you scroll it */}
          <ul className="mt-s6 hidden border-t border-line lg:block">
            {lineOrder.map((id, i) => (
              <li key={id}>
                <a
                  href={`#line-${id}`}
                  className="flex items-baseline gap-s3 border-b border-line py-s3 transition-colors duration-120 hover:text-ink"
                >
                  <span className="t-mono tnum text-[0.75rem] text-ink-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-small text-ink-secondary">{lineCopy[id].name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* the scrolling half */}
        <div className="col-span-12 mt-s6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {lineOrder.map((id, i) => {
            const c = lineCopy[id];
            const plate = lineHeroFlow[id];
            const cases = casesFor(id);
            return (
              <article
                key={id}
                id={`line-${id}`}
                className="sv-rise scroll-mt-28 border-t border-line py-s6 last:border-b"
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
