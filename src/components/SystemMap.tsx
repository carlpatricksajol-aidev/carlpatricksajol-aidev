import { useEffect, useRef, useState } from "react";
import { SNode, SPort, edgeH, edgeV } from "@/components/schematic/kit";

/**
 * The hero's living centrepiece, drawn in the notation the 26 plates at the
 * bottom of this page already use — so by the time a reader reaches the wall,
 * they are looking at the payoff of a drawing the whole page has been making.
 *
 * ONE 12s clock, as before. A node lights ~150ms after a packet reaches it,
 * which the visual system reads involuntarily as causation. What is new is that
 * the run now finishes and says so, and that the four jobs the deck names ride
 * the out-edges one per cycle.
 */

const CYCLE = "12s";
const ROUND = "48s";

/** the deck's last sentence, as cargo */
const JOBS = ["nightly reporting", "records in step", "publishing", "ad creative"];

const PHASES = [
  { at: 0.0, text: "TRIGGER · row added" },
  { at: 0.06, text: "READ · 4 accounts" },
  { at: 0.34, text: "SORT · AI judgement" },
  { at: 0.5, text: "WRITE · 3 accounts" },
  { at: 0.84, text: "DONE · 12s" },
];

const WIDE = {
  w: 520,
  h: 380,
  srcX: 0,
  coreX: 196,
  outX: 372,
  coreY: 132,
  coreH: 72,
  srcY: [8, 96, 184, 272],
  outY: [56, 144, 232],
  readY: 356,
  vertical: false,
};

const TALL = {
  w: 360,
  h: 560,
  srcX: 10,
  coreX: 90,
  outX: 170,
  coreY: 250,
  coreH: 60,
  srcY: [8, 64, 120, 176],
  outY: [358, 414, 470],
  readY: 540,
  vertical: true,
};

const SOURCES = [
  { label: "Slack", slug: "message" },
  { label: "Notion", slug: "row added" },
  { label: "HubSpot", slug: "record" },
  { label: "Dropbox", slug: "file" },
];

const OUTPUTS = [
  { label: "Supabase", slug: "upsert" },
  { label: "Airtable", slug: "update" },
  { label: "Google Sheets", slug: "append" },
];

/** in-packets run 0.06 -> 0.30 of the cycle; out-packets 0.50 -> 0.82 */
const packetTimes = (leg: "in" | "out", i: number) => {
  const start = leg === "in" ? 0.06 + i * 0.03 : 0.5 + i * 0.035;
  const end = start + 0.22;
  return { start: start.toFixed(3), end: end.toFixed(3) };
};

const SystemMap = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [live, setLive] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    const svg = svgRef.current;
    if (!el) return;

    // the resolved frame: a finished job, not a dead one
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      svg?.setCurrentTime(11.4);
      svg?.pauseAnimations();
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;

    const setRunning = (on: boolean) => {
      setLive(on);
      // SMIL and CSS are separate clocks; both must stop or the packets freeze
      // while the node flashes keep firing.
      if (svg) {
        if (on) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }
    };

    const obs = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [compact]);

  const L = compact ? TALL : WIDE;
  const nw = compact ? 180 : 148;
  const nh = compact ? 48 : 60;
  const edge = L.vertical ? edgeV : edgeH;

  const inEdges = L.srcY.map((y) =>
    L.vertical
      ? edge(L.srcX + nw / 2, y + nh, L.coreX + nw / 2, L.coreY)
      : edge(L.srcX + nw, y + nh / 2, L.coreX, L.coreY + L.coreH / 2)
  );
  const outEdges = L.outY.map((y) =>
    L.vertical
      ? edge(L.coreX + nw / 2, L.coreY + L.coreH, L.outX + nw / 2, y)
      : edge(L.coreX + nw, L.coreY + L.coreH / 2, L.outX, y + nh / 2)
  );

  return (
    <div
      ref={wrapRef}
      /* the bleed and the right-edge fade were for a layout that ran off the
         column. The map now fits inside it, and the fade was eating the last
         42 units — which is where the three output nodes end. */
      className={`system-map sch-in ${live ? "is-live" : ""}`}
      style={{ aspectRatio: `${L.w} / ${L.h}` }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${L.w} ${L.h}`}
        className="sch absolute inset-0 h-full w-full"
        role="img"
        aria-labelledby="sysmap-title sysmap-desc"
      >
        <title id="sysmap-title">How the systems fit together</title>
        <desc id="sysmap-desc">
          Slack, Notion, HubSpot and Dropbox feed the wiring in the middle, which writes results back
          out into Supabase, Airtable and Google Sheets. Nightly reporting, records kept in step,
          publishing and finished ad creative all run on the same wiring.
        </desc>

        {[...inEdges, ...outEdges].map((d, i) => (
          <path key={`e${i}`} id={`sm-e${i}`} className="ln" d={d} />
        ))}

        {/* the leads continue past the crop edge: the drawing does not end here */}
        {!compact &&
          L.outY.map((y, i) => (
            <path key={`c${i}`} className="ln" d={`M ${L.outX + nw} ${y + nh / 2} H ${L.w + 40}`} />
          ))}

        {SOURCES.map((s, i) => (
          <g key={s.label}>
            <SNode x={L.srcX} y={L.srcY[i]} w={nw} h={nh} name={s.label} slug={s.slug} live={i === 0} className="sm-node--src" />
            <SPort x={L.srcX + nw} y={L.srcY[i] + nh / 2} on />
          </g>
        ))}

        <SNode
          x={L.coreX}
          y={L.coreY}
          w={nw}
          h={L.coreH}
          name="The wiring"
          slug="n8n · zapier · make"
          className="sm-core"
        />

        {OUTPUTS.map((o, i) => (
          <g key={o.label}>
            <SPort x={L.outX} y={L.outY[i] + nh / 2} on />
            <SNode x={L.outX} y={L.outY[i]} w={nw} h={nh} name={o.label} slug={o.slug} className="sm-node--out" />
          </g>
        ))}

        {[...inEdges, ...outEdges].map((_, i) => {
          const leg = i < inEdges.length ? "in" : "out";
          const idx = leg === "in" ? i : i - inEdges.length;
          const { start, end } = packetTimes(leg, idx);
          return (
            <circle key={`p${i}`} className="sch-k sm-packet" r={3.4}>
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
                keyTimes={`0;${start};${(Number(start) + 0.02).toFixed(3)};${(Number(end) - 0.02).toFixed(3)};${end};1`}
              />
            </circle>
          );
        })}

        {/* the consignment: one job per cycle, riding the middle out-edge */}
        <g className="sm-tag">
          <animateMotion dur={CYCLE} repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.52;0.80;1">
            <mpath href={`#sm-e${inEdges.length + 1}`} />
          </animateMotion>
          <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.52;0.55;0.77;0.80;1" />
          <rect x={-52} y={-9} width={104} height={18} rx={4} />
          {JOBS.map((j, i) => (
            <text key={j} x={-44} y={4} opacity={0}>
              {j}
              <animate
                attributeName="opacity"
                dur={ROUND}
                repeatCount="indefinite"
                values="0;0;1;1;0;0"
                keyTimes={`0;${Math.max(0, i * 0.25 - 0.004).toFixed(3)};${(i * 0.25).toFixed(3)};${(i * 0.25 + 0.24).toFixed(3)};${(i * 0.25 + 0.245).toFixed(3)};1`}
              />
            </text>
          ))}
        </g>

        {/* the readout: the reason to wait for the end */}
        {PHASES.map((p, i) => {
          const next = PHASES[i + 1]?.at ?? 1;
          return (
            <text
              key={p.text}
              x={compact ? 10 : 8}
              y={L.readY}
              className={`sch-read sm-phase ${i === PHASES.length - 1 ? "sm-phase--rest" : ""}`}
              /* all five sit at the same coordinates and take turns via
                 <animate>. Without this they ALL paint on the first frame and
                 render as one unreadable smear. */
              opacity={0}
            >
              {p.text}
              {/* SIX stops, not five. With `0;1;...` the first segment ramps
                  linearly from zero across the label's whole lead-in, so three
                  labels are partly visible at once and the readout renders as a
                  smear. The extra stop holds it at zero until its own slot. */}
              <animate
                attributeName="opacity"
                dur={CYCLE}
                repeatCount="indefinite"
                values="0;0;1;1;0;0"
                keyTimes={`0;${Math.max(0, p.at - 0.006).toFixed(3)};${p.at.toFixed(3)};${Math.max(p.at + 0.002, next - 0.008).toFixed(3)};${next.toFixed(3)};1`}
              />
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default SystemMap;
