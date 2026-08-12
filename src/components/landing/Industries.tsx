import { ArrowLink, SectionHeader, useEnter } from "@/components/primitives";
import { industries, industriesSection, saasLine } from "@/data/copy";
import Harness from "@/components/schematic/Harness";

/**
 * ARCHETYPE: ruled list, five rows.
 *
 * Not five cards. Five identical cards would read as a pricing table, and these
 * are not equivalent offers — they are ordered by how much there is to show,
 * and each row hands off to a real case study by name.
 *
 * Deliberately carries no scroll-driven motion of its own. The ambient system
 * is closed at three layers, and the rise pattern belongs to ServiceLines.
 */
const Industries = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section id="industries" ref={ref} className={`${className} section`} aria-labelledby="industries-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="industries-h"
          eyebrow={industriesSection.eyebrow}
          title={industriesSection.title}
          deck={industriesSection.deck}
        />

        <ul className="mt-s7 border-t border-line">
          {industries.map((item, i) => (
            <li key={item.industry} className="relative border-b border-line py-s6">
              <div className="grid12">
                {/* the numeral gutter, not column 7: column 7 is about 60-85px
                    of the shell, too narrow for a real object */}
                <span className="col-span-12 mb-s4 block lg:col-span-2 lg:col-start-1 lg:mb-0 lg:self-center">
                  <span className="t-mono tnum mb-s2 hidden text-[0.8125rem] text-ink-tertiary lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Harness i={i} last={i === industries.length - 1} />
                </span>

                <div className="col-span-12 lg:col-span-4">
                  <h3 className="t-sub text-ink">{item.industry}</h3>
                  <p className="t-body mt-s3 max-w-[40ch] text-ink-secondary">{item.work}</p>
                </div>

                <div className="col-span-12 mt-s4 lg:col-span-5 lg:col-start-8 lg:mt-0">
                  <p className="t-small max-w-[52ch] text-ink-tertiary">{item.proof}</p>
                  <p className="mt-s4">
                    <ArrowLink to={`/work/${item.caseSlug}`}>Read the case study</ArrowLink>
                  </p>
                </div>
              </div>

              {/* the "SaaS more than once" point, evidenced where it is made
                  rather than asserted in the deck the section then has to
                  support */}
              {item.industry === "SaaS" && (
                <p className="t-small mt-s5 max-w-[70ch] border-l-2 border-brand-600 pl-s4 text-ink-secondary lg:ml-[16.6667%]">
                  {saasLine}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Industries;
