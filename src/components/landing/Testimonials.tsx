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
      className={`${className} section relative`}
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

        <ul className="mt-s7 grid gap-px border-t border-line md:grid-cols-2">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={`relative border-b border-line py-s6 md:pr-s6 ${
                i % 2 === 1 ? "md:border-l md:border-line md:pl-s6" : ""
              }`}
            >
              {/* the mark hangs outside the measure so the quote's first line
                  still starts on the column edge */}
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="t-lead max-w-[46ch] text-ink">{t.quote}</blockquote>
              <figcaption className="mt-s5 border-t border-line pt-s3">
                <p className="t-body font-medium text-ink">{t.name}</p>
                <p className="t-mono mt-1 text-[0.75rem] uppercase tracking-[0.07em] text-ink-tertiary">
                  {t.role} · {t.org}
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
