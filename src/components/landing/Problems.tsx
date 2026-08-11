import { Link } from "react-router-dom";
import { ArrowRight, SectionHeader, useEnter } from "@/components/primitives";
import { problems, problemsSection, solutions, solutionsSection } from "@/data/copy";

/**
 * The section the site was missing entirely: name the visitor's problem before
 * showing them anything you built. Problems are quoted in the client's own
 * words; each solution points at a real system as evidence.
 */
export const Problems = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="problems" ref={ref} className={`${className} section bg-surface-sunken`} aria-labelledby="problems-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="problems-h"
          eyebrow={problemsSection.eyebrow}
          title={problemsSection.title}
          deck={problemsSection.deck}
        />

        <ul className="mt-s9 grid gap-s5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <li
              key={p.symptom}
              className="flex flex-col surface surface-hover p-s6"
            >
              <p className="t-sub text-ink">&ldquo;{p.symptom}&rdquo;</p>
              <p className="t-body mt-s4 flex-1 text-ink-secondary">{p.detail}</p>
              <p className="t-slug mt-s5 border-t border-line-subtle pt-s4 text-ink-tertiary">
                {p.cost}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const Solutions = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="solutions" ref={ref} className={`${className} section`} aria-labelledby="solutions-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="solutions-h"
          level="chapter"
          eyebrow={solutionsSection.eyebrow}
          title={solutionsSection.title}
          deck={solutionsSection.deck}
        />

        <ol className="mt-s9 border-t border-line">
          {solutions.map((s, i) => {
            const body = (
              <>
                <div className="flex items-baseline gap-s5">
                  <span className="t-mono t-slug shrink-0 text-ink-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="t-section max-w-[24ch] text-ink">{s.headline}</h3>
                    <p className="t-lead mt-s4 max-w-[62ch] text-ink-secondary">{s.body}</p>
                    <p className="t-small mt-s5 flex flex-wrap items-center gap-x-s3 gap-y-s2 text-ink-tertiary">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      {s.proof}
                    </p>
                    {s.caseSlug && (
                      <span className="arrow-link t-body mt-s5 inline-flex">
                        See the system <ArrowRight />
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <li key={s.headline} className="border-b border-line">
                {s.caseSlug ? (
                  <Link
                    to={`/work/${s.caseSlug}`}
                    className="group block py-s8 transition-colors duration-120 hover:bg-surface-sunken"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="py-s8">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
