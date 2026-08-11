import { Link } from "react-router-dom";
import { ArrowRight, useEnter } from "@/components/primitives";
import { problems, problemsSection, solutions, solutionsSection } from "@/data/copy";

/**
 * ARCHETYPE: marginalia with an alternating margin side.
 *
 * Six ruled rows rather than six identical cards. The prose left edge alternates
 * between column 2 and column 4, and the cost line hangs in the opposite margin
 * each time — so the eye crosses the page three times per screen instead of
 * tracking a single left rail. The quotes are printed on the paper; the money
 * is in the margin.
 */
export const Problems = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="problems" ref={ref} className={`${className} section`} aria-labelledby="problems-h">
      <div className="grid12">
        {/* split header — one of only two on the page. The deck sits in the
            column the cost lines will later use, pre-declaring the margin. */}
        <div className="col-span-12 lg:col-span-5">
          <span className="mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-slug text-brand-600">{problemsSection.eyebrow}</p>
          <h2 id="problems-h" className="t-section mt-s4">{problemsSection.title}</h2>
        </div>
        <p className="t-body col-span-12 mt-s4 text-ink-secondary lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
          {problemsSection.deck}
        </p>
      </div>

      <ul className="mt-s7">
        {problems.map((p, i) => {
          const right = i % 2 === 0;
          return (
            <li key={p.symptom} className="border-t border-line last:border-b">
              <div className="grid12 py-s6">
                {/* cost hangs left on even rows */}
                {!right && (
                  <p className="t-micro order-2 col-span-12 mt-s4 border-l border-line-edge pl-s3 text-ink-tertiary lg:order-1 lg:col-span-2 lg:mt-0 lg:border-l-0 lg:border-r lg:pl-0 lg:pr-s3 lg:text-right">
                    {p.cost}
                  </p>
                )}

                <div
                  className={`order-1 col-span-12 ${
                    right ? "lg:col-span-6 lg:col-start-2" : "lg:order-2 lg:col-span-6 lg:col-start-4"
                  }`}
                >
                  {/* hanging quotation mark keeps the measure optically straight */}
                  <p className="t-section text-ink" style={{ textIndent: "-0.42em" }}>
                    &ldquo;{p.symptom}&rdquo;
                  </p>
                  <p className="t-body mt-s4 max-w-[52ch] text-ink-secondary">{p.detail}</p>
                </div>

                {/* cost hangs right on odd rows */}
                {right && (
                  <p className="t-micro order-3 col-span-12 mt-s4 border-l border-line-edge pl-s3 text-ink-tertiary lg:col-span-2 lg:col-start-11 lg:mt-0">
                    {p.cost}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

/**
 * ARCHETYPE: numbered editorial list, numerals hanging in the margin.
 *
 * The previous version ran 3,220px at 16% fill — five stacked rows with a 377px
 * dead strip down the right. The evidence line and the link now occupy that
 * strip as a right-hand rail, so each row is a real two-column record.
 */
export const Solutions = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="solutions" ref={ref} className={`${className} section`} aria-labelledby="solutions-h">
      <div className="grid12">
        {/* stacked at the measure with no deck to the right — a different
            attachment from either neighbour */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-2">
          <span className="mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-slug text-brand-600">{solutionsSection.eyebrow}</p>
          <h2 id="solutions-h" className="t-chapter mt-s4 max-w-[16ch]">{solutionsSection.title}</h2>
          <p className="t-lead mt-s5 max-w-[48ch] text-ink-secondary">{solutionsSection.deck}</p>
        </div>
      </div>

      <ol className="mt-s7">
        {solutions.map((s, i) => {
          const inner = (
            <div className="grid12 py-s6">
              <span
                className="t-mono tnum col-span-2 hidden text-[0.8125rem] text-ink-tertiary lg:block"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-12 lg:col-span-6">
                <h3 className="t-sub max-w-[24ch] text-ink">{s.headline}</h3>
                <p className="t-body mt-s3 max-w-[54ch] text-ink-secondary">{s.body}</p>
              </div>
              {/* the evidence rail: what used to be dead margin */}
              <div className="col-span-12 mt-s4 lg:col-span-3 lg:col-start-10 lg:mt-0">
                <p className="t-micro text-ink-tertiary">
                  <span
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle"
                    aria-hidden="true"
                  />
                  {s.proof}
                </p>
                {s.caseSlug && (
                  <span className="arrow-link t-small mt-s3 inline-flex">
                    See the system <ArrowRight />
                  </span>
                )}
              </div>
            </div>
          );

          return (
            <li key={s.headline} className="border-t border-line last:border-b">
              {s.caseSlug ? (
                <Link
                  to={`/work/${s.caseSlug}`}
                  className="group block transition-colors duration-180 hover:bg-surface-sunken"
                >
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};
