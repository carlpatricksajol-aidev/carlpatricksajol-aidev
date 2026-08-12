import { SectionHeader, useEnter } from "@/components/primitives";
import { testimonials } from "@/data/site";
import { testimonialsSection } from "@/data/copy";

/**
 * ARCHETYPE: quotations set as quotations.
 *
 * Four cards would read as a review widget. These are set the way a book sets a
 * pull quote: the words large and in the display face, the attribution small and
 * in mono beneath a rule, and a hanging quotation mark the measure is optically
 * corrected for. The section's own component is the mark itself — it is drawn at
 * display scale in the margin and is the only decorative glyph on the site.
 *
 * The deck says plainly that these are colleagues rather than buying clients.
 * Four quotes from one studio presented as client testimonials is the kind of
 * thing a reader works out on their own and then distrusts the rest of the page
 * for.
 */
const Testimonials = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section
      id="testimonials"
      ref={ref}
      className={`${className} section bleed relative border-y border-line stock-wove`}
      aria-labelledby="testimonials-h"
    >
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="testimonials-h"
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
          deck={testimonialsSection.deck}
        />

        {/* Four across, not four stacked. As two tall columns each quote owned
            about 500px of page and the section ran four screens for 90 words of
            text. At this size all four are comparable in one glance, which is
            the only reason to show four rather than one. */}
        <ul className="mt-s7 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((q, i) => (
            <li
              key={q.name}
              className={`relative flex flex-col border-b border-line py-s5 pr-s5 ${
                i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-s5" : ""
              } ${i % 4 !== 0 ? "lg:border-l lg:border-line lg:pl-s5" : "lg:border-l-0 lg:pl-0"}`}
            >
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="t-body relative z-10 text-ink">{q.quote}</blockquote>
              <figcaption className="mt-auto pt-s5">
                <p className="t-small font-medium text-ink">{q.name}</p>
                <p className="t-mono mt-1 text-[0.6875rem] uppercase leading-[1.45] tracking-[0.06em] text-ink-tertiary">
                  {q.role}
                  <br />
                  {q.org}
                </p>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
