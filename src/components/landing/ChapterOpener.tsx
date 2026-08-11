import { useEnter } from "@/components/primitives";

/**
 * ARCHETYPE: sticky-left / scrolling-right pair — used once on the page.
 *
 * The left column (chapter numeral, title, deck) pins while the right column
 * scrolls a domain index past it. This is the automation chapter's answer to
 * "you focused on the creative side": the breadth of the practice is listed as
 * an index a reader can actually scan, each domain tied to named systems.
 */
export interface Domain {
  name: string;
  note: string;
  systems: string;
}

const ChapterOpener = ({
  id,
  number,
  eyebrow,
  title,
  deck,
  domains,
  tone = "brand",
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  deck: string;
  domains: Domain[];
  tone?: "brand" | "oxide";
}) => {
  const { ref, className } = useEnter<HTMLElement>();
  const accent = tone === "oxide" ? "text-oxide-600" : "text-brand-600";
  const rule = tone === "oxide" ? "bg-oxide-600" : "bg-brand-600";

  return (
    <section id={id} ref={ref} className={`${className} section`} aria-labelledby={`${id}-h`}>
      <div className="grid12 items-start">
        {/* the pinned half */}
        <div className="col-span-12 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <span className={`sv-draw mb-s4 block h-px w-10 ${rule}`} aria-hidden="true" />
          <p className={`t-mono tnum text-[0.9375rem] ${accent}`}>{number}</p>
          <p className="t-slug mt-s2 text-ink-tertiary">{eyebrow}</p>
          <h2 id={`${id}-h`} className="t-chapter mt-s4 max-w-[12ch]">{title}</h2>
          <p className="t-lead mt-s5 max-w-[34ch] text-ink-secondary">{deck}</p>
        </div>

        {/* the scrolling index */}
        <ul className="col-span-12 mt-s6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {domains.map((d, i) => (
            <li key={d.name} className="sv-rise border-t border-line py-s5 last:border-b">
              <div className="flex items-baseline justify-between gap-s4">
                <h3 className="t-sub text-ink">{d.name}</h3>
                <span className={`t-mono tnum shrink-0 text-[0.8125rem] ${accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="t-body mt-s2 max-w-[52ch] text-ink-secondary">{d.note}</p>
              <p className="t-micro mt-s3 text-ink-tertiary">{d.systems}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChapterOpener;
