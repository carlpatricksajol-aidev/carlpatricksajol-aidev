import { Link } from "react-router-dom";
import { ArrowRight, useEnter } from "@/components/primitives";
import { useEffect, useRef, useState } from "react";
import { outputSection, outputs, problems, problemsSection, solutions, solutionsSection } from "@/data/copy";
import { rich } from "@/components/Rich";
import { Faults } from "@/components/schematic/Faults";
import { Move } from "@/components/schematic/Moves";
import { Terminal } from "@/components/schematic/Terminals";

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
    <section id="problems" ref={ref} className={`${className} section relative`} aria-labelledby="problems-h">
      <div className="grid12">
        {/* split header — one of only two on the page. The deck sits in the
            column the cost lines will later use, pre-declaring the margin. */}
        <div className="col-span-12 lg:col-span-5">
          <span className="sv-draw mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-slug text-brand-600">{problemsSection.eyebrow}</p>
          <h2 id="problems-h" className="t-section mt-s4">{problemsSection.title}</h2>
        </div>
        <p className="t-body col-span-12 mt-s4 text-ink-secondary lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
          {rich(problemsSection.deck)}
        </p>
      </div>

      <ul className="mt-s7">
        {problems.map((p, i) => {
          const right = i % 2 === 0;
          // the numeral hangs in whichever margin the prose is not using, so the
          // alternating left/right rhythm survives — it is what stops six ruled
          // rows from reading as one long left rail
          const numeral = (
            <p
              className={`t-mono tnum order-2 col-span-12 mt-s4 hidden text-[0.8125rem] text-ink-tertiary lg:col-span-2 lg:mt-0 lg:block ${
                right ? "lg:order-3 lg:col-start-11" : "lg:order-1 lg:text-right"
              }`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
              <Faults i={i} />
            </p>
          );
          return (
            <li key={p.title} className="relative border-t border-line last:border-b">
              <div className="grid12 py-s5">
                {!right && numeral}

                <div
                  className={`order-1 col-span-12 ${
                    right ? "lg:col-span-6 lg:col-start-2" : "lg:order-2 lg:col-span-6 lg:col-start-4"
                  }`}
                >
                  {/* the numeral column is hidden below lg, so the fragment is
                      rendered again here — all six must exist on a phone */}
                  <span className="mb-s4 block lg:hidden">
                    <Faults i={i} />
                  </span>
                  {/* hanging quotation mark keeps the measure optically straight */}
                  <p className="t-section text-ink" style={{ textIndent: "-0.42em" }}>
                    &ldquo;{p.title}&rdquo;
                  </p>
                  <p className="t-body mt-s4 max-w-[52ch] text-ink-secondary">{rich(p.body)}</p>
                </div>

                {right && numeral}
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
  // one observer over the five rows; the operation only runs while its own step
  // is being read, so five machines never animate at once
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const [liveRows, setLiveRows] = useState<boolean[]>(() => solutions.map(() => false));
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setLiveRows(solutions.map(() => true));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        setLiveRows((prev) => {
          const next = [...prev];
          for (const e of entries) next[Number((e.target as HTMLElement).dataset.i)] = e.isIntersecting;
          return next;
        });
      },
      { rootMargin: "-20% 0px -20% 0px" }
    );
    rows.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="solutions" ref={ref} className={`${className} section relative`} aria-labelledby="solutions-h">
      <div className="grid12">
        {/* stacked at the measure with no deck to the right — a different
            attachment from either neighbour */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-2">
          <span className="sv-draw mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-slug text-brand-600">{solutionsSection.eyebrow}</p>
          <h2 id="solutions-h" className="t-chapter mt-s4 max-w-[16ch]">{solutionsSection.title}</h2>
          <p className="t-lead--display mt-s5 max-w-[48ch] text-ink-secondary">{rich(solutionsSection.deck)}</p>
        </div>
      </div>

      <ol className="mt-s7">
        {solutions.map((s, i) => {
          const inner = (
            <div className="grid12 py-s5">
              <span
                className="t-mono tnum col-span-2 hidden text-[0.8125rem] text-ink-tertiary lg:block"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-12 lg:col-span-6">
                <h3 className="t-sub max-w-[24ch] text-ink">{s.headline}</h3>
                <p className="t-body mt-s3 max-w-[54ch] text-ink-secondary">{rich(s.body)}</p>
              </div>
              <span className="order-first col-span-12 mb-s4 block lg:order-none lg:col-span-1 lg:col-start-9 lg:mb-0 lg:self-center">
                <Move i={i} live={liveRows[i]} />
              </span>
              {/* the evidence rail: what used to be dead margin */}
              <div className="col-span-12 mt-s4 lg:col-span-3 lg:col-start-10 lg:mt-0">
                <p className="t-micro text-ink-tertiary">
                  <span
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle"
                    aria-hidden="true"
                  />
                  {rich(s.proof)}
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
            <li
              key={s.headline}
              data-i={i}
              ref={(el) => (rows.current[i] = el)}
              className="relative border-t border-line last:border-b"
            >
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

/**
 * ARCHETYPE: delivery manifest.
 *
 * The third beat of the spine, and the one most at risk of being the second
 * beat again in the past tense. So it is not shaped like the solution list: no
 * numerals in the margin, no evidence rail, no links out. A strict two-column
 * manifest — the thing on the left, what it is on the right — reads as an
 * inventory of objects rather than a second list of activities, which is
 * exactly the distinction the section has to earn.
 */
export const Output = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="output" ref={ref} className={`${className} section`} aria-labelledby="output-h">
      <div className="grid12">
        {/* header hard right, against both neighbours' left-weighted headers */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-6">
          <span className="sv-draw mb-s4 block h-px w-10 bg-brand-600" aria-hidden="true" />
          <p className="t-slug text-brand-600">{outputSection.eyebrow}</p>
          <h2 id="output-h" className="t-chapter mt-s4 max-w-[16ch]">{outputSection.title}</h2>
          <p className="t-lead--display mt-s5 max-w-[44ch] text-ink-secondary">{rich(outputSection.deck)}</p>
        </div>
      </div>

      <dl className="mt-s7 border-t border-line">
        {outputs.map((o, i) => (
          <div key={o.title} className="grid12 relative border-b border-line py-s5">
            <dt className="t-sub col-span-12 max-w-[26ch] text-ink lg:col-span-4 lg:col-start-2">{o.title}</dt>
            <dd className="t-body col-span-12 mt-s3 max-w-[58ch] text-ink-secondary lg:col-span-6 lg:col-start-6 lg:mt-0">
              {o.body}
            </dd>
            <Terminal i={i} live />
          </div>
        ))}
      </dl>
    </section>
  );
};
