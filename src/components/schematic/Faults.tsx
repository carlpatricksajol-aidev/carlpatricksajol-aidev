import { useEffect, useRef, useState } from "react";
import { Read, SPort } from "./kit";

/**
 * Six broken graphs, one per row.
 *
 * 01 four tabs and no connectors — the question is CARRIED, so it teleports.
 * 02 two records, two authorities, trading forever with no arbiter.
 * 03 three sheets into a merge with NO OUTPUT PORT and a `manual` node.
 * 04 one node, nine ports, one lane re-routed nine times by hand.
 * 05 five items against a gate, and the operator node unlit.
 * 06 the hand crosses six and everything after it parks until nine.
 */

const VB = "0 0 176 110";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
    {children}
  </svg>
);

const F1 = () => (
  <Frame>
    {[6, 50, 94, 138].map((x) => (
      <g key={x} className="sch-n">
        <rect x={x} y={18} width={32} height={26} rx={6} />
      </g>
    ))}
    <rect className="sch-k sch-k--ink run-f1" x={19} y={28} width={6} height={6} />
    <Read x={6} y={72}>4 tabs · 0 links</Read>
    <Read x={6} y={90}>carried by hand</Read>
  </Frame>
);

const F2 = () => (
  <Frame>
    <g className="sch-n"><rect x={6} y={16} width={64} height={34} rx={10} /></g>
    <g className="sch-n"><rect x={106} y={16} width={64} height={34} rx={10} /></g>
    <text x={20} y={38} className="sch-slug">v.3</text>
    <text x={120} y={38} className="sch-slug">v.2</text>
    <path className="ln ln--dash" d="M 70 33 H 106" />
    <SPort x={38} y={62} on className="run-f2a" />
    <SPort x={138} y={62} on className="run-f2b" />
    <Read x={6} y={90}>2 sources · no arbiter</Read>
  </Frame>
);

const F3 = () => {
  const legs = [
    { dx: 58, dy: 30 },
    { dx: 58, dy: 0 },
    { dx: 58, dy: -30 },
  ];
  return (
    <Frame>
      {legs.map((l, i) => (
        <path key={i} className="ln" d={`M 14 ${16 + i * 30} H 72`} />
      ))}
      <g className="sch-n is-off"><rect x={90} y={22} width={72} height={38} rx={10} /></g>
      <text x={102} y={46} className="sch-slug">manual</text>
      {legs.map((l, i) => (
        <rect
          key={`k${i}`}
          className="sch-k sch-k--ink run-f3"
          x={11}
          y={13 + i * 30}
          width={6}
          height={6}
          style={{ ["--dx" as string]: `${l.dx}px`, ["--dy" as string]: `${l.dy}px`, ["--d" as string]: `${-i * 4}s` }}
        />
      ))}
      <Read x={6} y={90}>assembled by hand</Read>
    </Frame>
  );
};

const F4 = () => (
  <Frame>
    <g className="sch-n"><rect x={6} y={26} width={46} height={34} rx={10} /></g>
    {Array.from({ length: 9 }, (_, i) => (
      <SPort key={i} x={128 + (i % 3) * 18} y={14 + Math.floor(i / 3) * 22} />
    ))}
    <path className="ln run-f4" d="M 52 43 H 118" />
    <SPort x={122} y={43} on className="run-f4" />
    <Read x={6} y={90}>1 of 9 · one at a time</Read>
  </Frame>
);

const F5 = () => (
  <Frame>
    <g className="sch-n is-off"><rect x={112} y={8} width={56} height={26} rx={10} /></g>
    <text x={122} y={25} className="sch-slug">away</text>
    <path className="ln" d="M 104 44 V 74" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        className="sch-k sch-k--ink run-f5"
        x={6 + i * 18}
        y={56}
        width={6}
        height={6}
        style={{ ["--d" as string]: `${-i * 0.18}s` }}
      />
    ))}
    <Read x={6} y={90}>5 waiting · owner away</Read>
  </Frame>
);

const F6 = () => (
  <Frame>
    <circle className="sch-p" cx={30} cy={34} r={20} fill="none" />
    <path className="ln run-f6h" d="M 30 34 V 18" />
    <text x={56} y={26} className="sch-slug">18:00</text>
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        className="sch-k sch-k--ink run-f6p"
        x={60 + i * 16}
        y={44}
        width={6}
        height={6}
        style={{ ["--d" as string]: `${-i * 1.4}s` }}
      />
    ))}
    <path className="ln ln--dash" d="M 56 60 H 152" />
    <Read x={6} y={90}>held until 09:00</Read>
  </Frame>
);

const SHEETS = [F1, F2, F3, F4, F5, F6];

/**
 * One live at a time. This is the tallest section on the page, so a single
 * object at the top is off screen for most of the read — and six running at
 * once is a wall of noise. The observer picks the row nearest the reading band.
 */
export const Faults = ({ i }: { i: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [live, setLive] = useState(false);
  const Sheet = SHEETS[i];

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "-24% 0px -24% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!Sheet) return null;
  return (
    <span ref={ref} className={`fault sch sch-in ${live ? "is-live" : ""}`} aria-hidden="true">
      <Sheet />
    </span>
  );
};
