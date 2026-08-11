import { useEffect, useRef, useState } from "react";

/**
 * Renders a system's stages as a flow that actually runs: the stages light in
 * sequence and a pulse travels the connectors, so a reader sees the shape of
 * the pipeline before reading a word of it.
 *
 * Horizontal on desktop, vertical on mobile. Under reduced motion it renders as
 * a plain numbered flow with every stage in its lit state.
 */
const PipelineDiagram = ({ stages, className = "" }: { stages: string[]; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pipeline ${live ? "is-live" : ""} ${className}`}
      role="list"
      aria-label="Pipeline stages"
    >
      {stages.map((s, i) => (
        <div key={s} className="pipeline-stage" role="listitem" style={{ "--i": i } as React.CSSProperties}>
          <div className="pipeline-node">
            <span className="t-mono t-slug shrink-0 pt-0.5 text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-small text-ink">{s}</span>
          </div>
          {i < stages.length - 1 && (
            <span className="pipeline-link" aria-hidden="true">
              <span className="pipeline-pulse" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PipelineDiagram;
