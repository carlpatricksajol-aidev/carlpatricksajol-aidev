import { Read, SPort } from "./kit";

/**
 * Five objects you are handed. Four arrive once and stop forever; two keep a
 * small permanent life — the login's 24s internal circuit (they keep running
 * without me) and the bell's 48s single flash.
 */

const VB = "0 0 132 78";

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
    {children}
  </svg>
);

/** 1 — the hero's own diagram, printed on the page you hand your boss */
const T1 = ({ i }: { i: number }) => (
  <Frame>
    <SPort x={4} y={30} on />
    <g className="sch-n"><rect x={12} y={8} width={112} height={46} rx={10} /></g>
    <g className="term-draw" style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "top center" }}>
      <rect className="sch-p" x={24} y={20} width={16} height={10} />
      <rect className="sch-p" x={58} y={20} width={16} height={10} />
      <rect className="sch-p" x={92} y={20} width={16} height={10} />
      <path className="ln" d="M 40 25 H 58 M 74 25 H 92" />
    </g>
    <text x={24} y={46} className="sch-slug">map</text>
    <Read x={12} y={70}>1 page</Read>
  </Frame>
);

/** 2 — the queue drains to zero and STAYS zero. The absence is the deliverable. */
const T2 = ({ i }: { i: number }) => (
  <Frame>
    <SPort x={4} y={30} on />
    <g className="sch-n"><rect x={12} y={8} width={112} height={46} rx={10} /></g>
    {Array.from({ length: 9 }, (_, k) => (
      <rect
        key={k}
        className="sch-k sch-k--ink term-pip"
        style={{ ["--i" as string]: k }}
        x={24 + (k % 5) * 10}
        y={18 + Math.floor(k / 5) * 10}
        width={6}
        height={6}
      />
    ))}
    <text x={24} y={46} className="sch-slug">queue</text>
    <Read x={12} y={70}>0 waiting</Read>
  </Frame>
);

/** 3 — on your login, still running. The slowest clock on the cream half. */
const T3 = ({ i }: { i: number }) => (
  <Frame>
    <SPort x={4} y={30} on />
    <g className="sch-n is-live"><rect x={12} y={8} width={112} height={46} rx={10} /></g>
    <path className="ln ln--dash" d="M 30 20 H 60 V 38 H 30 Z" />
    <rect className="sch-k run-login" x={27} y={17} width={6} height={6} />
    <text x={72} y={26} className="sch-slug">login</text>
    <text x={72} y={42} className="sch-slug">you</text>
    <Read x={12} y={70}>owner: you</Read>
  </Frame>
);

/** 4 — nothing arrives when the job went out clean. 900ms in every 48s. */
const T4 = ({ i }: { i: number }) => (
  <Frame>
    <SPort x={4} y={30} on />
    <g className="sch-n"><rect x={12} y={8} width={112} height={46} rx={10} /></g>
    <SPort x={36} y={30} />
    <SPort x={36} y={30} on className="run-bell" />
    <text x={52} y={34} className="sch-slug">notify</text>
    <Read x={12} y={70}>quiet · 0 messages</Read>
  </Frame>
);

/** 5 — the only terminal on the page with an output: it gets handed on. */
const T5 = ({ i }: { i: number }) => (
  <Frame>
    <SPort x={4} y={30} on />
    <g className="sch-n"><rect x={12} y={8} width={104} height={46} rx={10} /></g>
    <g className="term-draw" style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "top center" }}>
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <rect key={k} className="sch-p" x={24} y={16 + k * 5} width={k === 6 ? 26 : 64} height={1.5} />
      ))}
    </g>
    <path className="ln" d="M 116 31 H 128" />
    <SPort x={130} y={31} on />
    <Read x={12} y={70}>hand it on</Read>
  </Frame>
);

const SHEETS = [T1, T2, T3, T4, T5];

export const Terminal = ({ i, live }: { i: number; live: boolean }) => {
  const Sheet = SHEETS[i];
  if (!Sheet) return null;
  return (
    <span className={`term sch sch-in ${live ? "is-live" : ""}`} aria-hidden="true">
      <Sheet i={i} />
    </span>
  );
};
