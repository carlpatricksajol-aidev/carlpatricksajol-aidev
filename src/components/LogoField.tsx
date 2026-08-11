import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/BrandIcons";
import { platformField } from "@/data/site";

/**
 * The platforms the work plugs into, as two rails drifting in opposite
 * directions. Marks are rendered large enough to actually be recognised — the
 * previous 22px grid was too small to read as anything.
 *
 * Motion is a single transform per rail, so it composites on the GPU and costs
 * nothing per frame. It pauses off-screen and on hover, and under
 * prefers-reduced-motion the rails hold still as a plain legible grid.
 */

const CARD =
  "flex shrink-0 items-center gap-s3 surface surface-hover px-s5 py-s4 transition-[border-color,transform] duration-[180ms] hover:-translate-y-0.5 hover:border-line-strong";

const Mark = ({ item }: { item: (typeof platformField)[number] }) => (
  <div className={CARD}>
    {item.key ? (
      <BrandIcon name={item.key} size={26} className="shrink-0 text-ink" />
    ) : (
      <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-sm border border-line-interactive text-[11px] font-semibold text-ink-secondary">
        {item.name.slice(0, 1)}
      </span>
    )}
    <span className="t-body whitespace-nowrap font-medium text-ink">{item.name}</span>
  </div>
);

const Rail = ({
  items,
  reverse = false,
  duration,
}: {
  items: typeof platformField;
  reverse?: boolean;
  duration: number;
}) => (
  // duplicated once and translated exactly -50%, so the loop is seamless
  <div className="logo-rail-mask">
    <div
      className={`logo-rail flex w-max gap-s4 ${reverse ? "logo-rail--reverse" : ""}`}
      style={{ "--dur": `${duration}s` } as React.CSSProperties}
    >
      {[...items, ...items].map((it, i) => (
        <Mark key={`${it.name}-${i}`} item={it} />
      ))}
    </div>
  </div>
);

const LogoField = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const half = Math.ceil(platformField.length / 2);
  const top = platformField.slice(0, half);
  const bottom = platformField.slice(half);

  return (
    <div ref={ref} className={`logo-field mt-s8 space-y-s4 ${live ? "is-live" : ""}`}>
      <h3 className="sr-only-heading">Platforms these systems connect to</h3>
      <ul className="sr-only-heading">
        {platformField.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
      <div aria-hidden="true">
        <Rail items={top} duration={52} />
      </div>
      <div aria-hidden="true">
        <Rail items={bottom} duration={64} reverse />
      </div>
    </div>
  );
};

export default LogoField;
