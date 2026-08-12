import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/BrandIcons";

/**
 * The hero's living centrepiece. Not decoration — a literal diagram of what he
 * sells: a company's existing tools on the left, an agent layer in the middle,
 * where the work lands on the right, and one run passing through.
 *
 * Three things make it read as a system rather than a loop:
 *  - every packet and every flash shares ONE 12s clock, so nothing can drift;
 *  - a node lights within ~150ms of a packet reaching it, which the visual
 *    system reads involuntarily as causation rather than coincidence;
 *  - ~60% of the cycle is completely still, so it reads as a pipeline idle
 *    between runs, which is what an automation actually does.
 *
 * Paused off-screen and when the tab is hidden. Under reduced motion it renders
 * the RESOLVED frame — every node lit, packets parked mid-edge as direction
 * markers — which is a finished diagram, not a dead one.
 */

const W = 520;
const H = 360;
const CYCLE = "12s";

const sources = [
  { key: "slack", label: "Slack", y: 46 },
  { key: "notion", label: "Notion", y: 128 },
  { key: "hubspot", label: "HubSpot", y: 210 },
  { key: "dropbox", label: "Dropbox", y: 292 },
];

const outputs = [
  { key: "supabase", label: "Supabase", y: 74 },
  { key: "airtable", label: "Airtable", y: 169 },
  { key: "google", label: "Google Sheets", y: 264 },
];

const SRC_X = 66;
const CORE_X = 260;
const OUT_X = 454;
const CORE_Y = 169;

const edge = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

/** in-packets run 0.06 -> 0.20 of the cycle; out-packets 0.24 -> 0.38 */
const packetTimes = (leg: "in" | "out", i: number) => {
  const start = leg === "in" ? 0.06 + i * 0.012 : 0.24 + i * 0.014;
  const end = start + 0.14;
  return { start: start.toFixed(3), end: end.toFixed(3) };
};

const SystemMap = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    const svg = svgRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const setRunning = (on: boolean) => {
      setLive(on);
      // SMIL and CSS animations are separate clocks — both must be stopped, or
      // the packets freeze while the node flashes keep firing.
      if (svg) {
        if (on) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }
    };

    const obs = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    const onVis = () => setRunning(!document.hidden && !!wrapRef.current);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const inEdges = sources.map((s) => edge(SRC_X + 10, s.y, CORE_X - 52, CORE_Y));
  const outEdges = outputs.map((o) => edge(CORE_X + 52, CORE_Y, OUT_X - 10, o.y));

  return (
    <div ref={wrapRef} className={`system-map ${live ? "is-live" : ""}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-labelledby="sysmap-title sysmap-desc"
      >
        <title id="sysmap-title">How the systems fit together</title>
        <desc id="sysmap-desc">
          Slack, Notion, HubSpot and Dropbox feed the wiring in the middle, which writes results
          back out into Supabase, Airtable and Google Sheets.
        </desc>

        {[...inEdges, ...outEdges].map((d, i) => (
          <path key={`e${i}`} id={`sm-e${i}`} d={d} fill="none" stroke="hsl(var(--rule-2))" strokeWidth={1.25} />
        ))}

        {[...inEdges, ...outEdges].map((_, i) => {
          const leg = i < inEdges.length ? "in" : "out";
          const idx = leg === "in" ? i : i - inEdges.length;
          const { start, end } = packetTimes(leg, idx);
          return (
            <circle key={`p${i}`} className="sm-packet" r={3.4} fill="hsl(var(--blue-600))">
              <animateMotion
                dur={CYCLE}
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;0;1;1"
                keyTimes={`0;${start};${end};1`}
              >
                <mpath href={`#sm-e${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur={CYCLE}
                repeatCount="indefinite"
                values="0;0;1;1;0;0"
                keyTimes={`0;${start};${(Number(start) + 0.015).toFixed(3)};${(Number(end) - 0.015).toFixed(3)};${end};1`}
              />
            </circle>
          );
        })}
      </svg>

      {sources.map((s) => (
        <Node key={s.key} x={SRC_X} y={s.y} icon={s.key} label={s.label} phase="src" />
      ))}
      {outputs.map((o) => (
        <Node key={o.key} x={OUT_X} y={o.y} icon={o.key} label={o.label} phase="out" />
      ))}

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(CORE_X / W) * 100}%`, top: `${(CORE_Y / H) * 100}%` }}
      >
        {/* width is capped, not content-driven: an unconstrained core box grows
            until it collides with the middle output node */}
        <div className="sm-core w-[148px] rounded-md border border-line-strong bg-surface-raised px-s4 py-s3 text-center">
          <div className="flex items-center justify-center gap-s2">
            <BrandIcon name="claude" size={16} className="text-ink" />
            <span className="t-small font-medium text-ink">The wiring</span>
          </div>
          <span className="t-slug mt-1 block text-ink-tertiary">+ AI for judgement calls</span>
        </div>
      </div>
    </div>
  );
};

const Node = ({
  x,
  y,
  icon,
  label,
  phase,
}: {
  x: number;
  y: number;
  icon: string;
  label: string;
  phase: "src" | "out";
}) => (
  <div
    className="absolute"
    style={{
      left: `${(x / W) * 100}%`,
      top: `${(y / H) * 100}%`,
      transform: "translate(-100%, -50%)",
    }}
  >
    <div className={`sm-node sm-node--${phase} flex items-center gap-s2 whitespace-nowrap rounded-sm border border-line bg-surface-raised px-s3 py-1.5`}>
      <BrandIcon name={icon} size={13} className="text-ink-secondary" />
      <span className="t-small text-ink-secondary">{label}</span>
    </div>
  </div>
);

export default SystemMap;
