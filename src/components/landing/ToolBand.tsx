import { SectionHeader, useEnter } from "@/components/primitives";
import { toolGroups } from "@/data/site";
import { toolBandSection } from "@/data/copy";
import PortBoard from "@/components/schematic/PortBoard";

/**
 * The stack, on the light ground and outside the creative chapter.
 *
 * The two drifting rails are GONE. The identical marquee mechanic ran six times
 * on this page, which is precisely the repetition the client objected to, and a
 * rail cannot express the one thing the copy actually says: that inside the 26
 * live systems Supabase appears 18 times, Google Sheets 14 and Notion 10. A
 * board that holds still and shows connection counts can.
 */
const ToolBand = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section
      id="tools"
      ref={ref}
      className={`${className} section bleed relative border-y border-line stock-wove`}
      aria-labelledby="tools-h"
    >
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="tools-h"
          eyebrow={toolBandSection.eyebrow}
          title={toolBandSection.title}
          deck={toolBandSection.deck}
        />

        <PortBoard />

        {/* the reading half. Two rows of three rather than one row of six: at six
            columns the blurbs set to about four words a line. */}
        <ul className="mt-s7 grid gap-x-px gap-y-s5 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {toolGroups.map((g, i) => (
            <li
              key={g.group}
              className={`border-b border-line py-s5 pr-s4 sm:border-b-0 ${
                i % 2 !== 0 ? "sm:border-l sm:border-line sm:pl-s4" : ""
              } ${
                i % 3 === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:border-line lg:pl-s4"
              }`}
            >
              <p className="t-slug text-ink">{g.group}</p>
              <p className="t-micro mt-s3 text-ink-tertiary">{g.blurb}</p>
              <p className="t-small mt-s4 text-ink-secondary">{g.items.map((it) => it.label).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToolBand;
