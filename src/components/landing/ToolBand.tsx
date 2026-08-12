import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/BrandIcons";
import { SectionHeader, useEnter } from "@/components/primitives";
import { toolGroups } from "@/data/site";
import { toolBandSection } from "@/data/copy";

/**
 * The stack, on the light ground and outside the creative chapter.
 *
 * This band exists because the headline claims "the tools you already pay for"
 * and, until now, the only tool wall on the page sat inside the dark creative
 * room showing image and video models. A buyer looking for Zapier, Make, n8n or
 * HubSpot found none of them anywhere above the fold.
 *
 * Two readings, one section. The rails drift so the breadth registers before
 * anyone reads a word; the grouped columns underneath say what each group is
 * actually FOR, which is what turns a logo wall into an argument.
 *
 * Rail mechanics are the ones already proven in LogoField: duplicate the set,
 * translate exactly -50%, one transform per rail so it composites on the GPU,
 * animate only while on screen, pause on hover, wrap to a static grid under
 * reduced motion. The rails are aria-hidden with a real list behind them —
 * otherwise a screen reader reads every tool twice.
 */

const flat = toolGroups.flatMap((g) => g.items);

/**
 * Two chip variants, not one chip plus a placeholder.
 *
 * GoHighLevel, ActiveCampaign, Klaviyo and ManyChat have no mark in simple-icons
 * and never have, so there is nothing correct to draw. The old fallback put a
 * circled first letter where a logo should be, which reads as a broken image
 * rather than a design decision. A wordmark set in the site's own type is what
 * a real logo wall does with brands that ship as wordmarks — it is honest, and
 * it does not fabricate somebody's trademark.
 */
const Mark = ({ item }: { item: { label: string; iconKey: string } }) => (
  <div className="flex shrink-0 items-center gap-s3 surface px-s5 py-s4 transition-[border-color,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-line-strong">
    {item.iconKey ? (
      <BrandIcon name={item.iconKey} size={24} className="shrink-0 text-ink" />
    ) : (
      // the wordmark carries its own weight, so it takes the mark's optical slot
      // instead of sitting next to an empty one
      <span className="h-[24px] w-px shrink-0 bg-line-strong" aria-hidden="true" />
    )}
    <span
      className={`whitespace-nowrap text-ink ${
        item.iconKey ? "t-body font-medium" : "t-body font-medium tracking-[-0.01em]"
      }`}
    >
      {item.label}
    </span>
  </div>
);

const Rail = ({
  items,
  reverse = false,
  duration,
}: {
  items: typeof flat;
  reverse?: boolean;
  duration: number;
}) => (
  <div className="logo-rail-mask">
    <div
      className={`logo-rail flex w-max gap-s4 ${reverse ? "logo-rail--reverse" : ""}`}
      style={{ "--dur": `${duration}s` } as React.CSSProperties}
    >
      {[...items, ...items].map((it, i) => (
        <Mark key={`${it.label}-${i}`} item={it} />
      ))}
    </div>
  </div>
);

const half = Math.ceil(flat.length / 2);

const ToolBand = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const railRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="tools"
      ref={ref}
      className={`${className} section bleed border-y border-line bg-surface-sunken`}
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
      </div>

      {/* the drifting half — full bleed, because a rail that stops at the shell
          edge reads as a carousel that ran out rather than as a stream */}
      <div ref={railRef} className={`logo-field mt-s7 space-y-s4 ${live ? "is-live" : ""}`}>
        <ul className="sr-only-heading">
          {flat.map((t) => (
            <li key={t.label}>{t.label}</li>
          ))}
        </ul>
        <div aria-hidden="true">
          <Rail items={flat.slice(0, half)} duration={62} />
        </div>
        <div aria-hidden="true">
          <Rail items={flat.slice(half)} duration={76} reverse />
        </div>
      </div>

      {/* the reading half */}
      <div className="w-shell gutter">
        <ul className="mt-s7 grid gap-px border-t border-line md:grid-cols-2 lg:grid-cols-5">
          {toolGroups.map((g, i) => (
            <li
              key={g.group}
              className={`border-b border-line py-s5 lg:border-b-0 lg:pr-s4 ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-s4" : ""
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
