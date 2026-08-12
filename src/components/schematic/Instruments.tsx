import { Read } from "./kit";
import { flows } from "@/data/flows";

/**
 * Four instruments and one walking head.
 *
 * Only two things run continuously: the head, and the 24-hour hand. The three
 * counts land once and stay landed, because a count that keeps animating is a
 * lie.
 */

const Tape = () => (
  <div className="audit" aria-hidden="true">
    <span className="audit-tape" />
    <span className="audit-head run-audit" />
  </div>
);

/** 01 — 53 built, 26 switched on. A fact you can count with your eye. */
const Switched = () => (
  <svg viewBox="0 0 220 46" className="mt-s3 w-full" role="presentation" aria-hidden="true">
    {Array.from({ length: 53 }, (_, i) => (
      <rect key={i} className="sch-p" x={i * 4.1} y={6} width={2} height={12} />
    ))}
    <g className="tally-fill" style={{ transformBox: "fill-box", transformOrigin: "left center" }}>
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i} className="sch-p is-on" x={i * 4.1} y={6} width={2} height={12} />
      ))}
    </g>
    <Read x={0} y={38}>26 of 53 switched on</Read>
  </svg>
);

/** 02 — eleven start themselves on a clock; six wake on a different rule. */
const Clock = () => {
  const R = 17;
  const pt = (i: number, n: number, r: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: 26 + Math.cos(a) * r, y: 22 + Math.sin(a) * r };
  };
  return (
    <svg viewBox="0 0 220 46" className="mt-s3 w-full" role="presentation" aria-hidden="true">
      <circle className="sch-p" cx={26} cy={22} r={R} fill="none" />
      {Array.from({ length: 11 }, (_, i) => {
        const p = pt(i, 11, R);
        return <rect key={i} className="sch-p is-on" x={p.x - 2} y={p.y - 2} width={4} height={4} />;
      })}
      {Array.from({ length: 6 }, (_, i) => {
        const p = pt(i, 6, R + 8);
        return <rect key={`o${i}`} className="sch-p" x={p.x - 2} y={p.y - 2} width={4} height={4} />;
      })}
      <path className="ln ln--live run-dial" d="M 26 22 V 8" />
      <Read x={60} y={20}>11 on a clock</Read>
      <Read x={60} y={34}>6 on a trigger</Read>
    </svg>
  );
};

/**
 * 03 — 26 columns at their REAL step counts. Counted off the plates themselves
 * (rx="7" node rects in public/flows/*.svg): they sum to exactly 500 and the
 * largest is exactly 170, which is the ledger's own claim from the ledger's own
 * source. Nothing here is estimated.
 */
const Steps = () => {
  const bars = [...flows].sort((a, b) => b.steps - a.steps);
  const max = bars[0]?.steps ?? 1;
  return (
    <svg viewBox="0 0 220 46" className="mt-s3 w-full" role="presentation" aria-hidden="true">
      {bars.map((f, i) => {
        const h = Math.max(2, (f.steps / max) * 24);
        return (
          <rect
            key={f.src}
            className={`tally-col ${i === 0 ? "sch-p is-on" : "sch-p"}`}
            style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "bottom center" }}
            x={i * 8.2}
            y={28 - h}
            width={5}
            height={h}
          />
        );
      })}
      <Read x={0} y={40}>largest 170 of 500</Read>
    </svg>
  );
};

/** 04 — the sketch that becomes the full instrument nine sections later. */
const Months = () => (
  <svg viewBox="0 0 220 46" className="mt-s3 w-full" role="presentation" aria-hidden="true">
    {Array.from({ length: 24 }, (_, i) => (
      <rect key={i} className="sch-p" x={i * 8.4} y={4} width={2} height={5} />
    ))}
    {[
      { x0: 0, x1: 196 },
      { x0: 100, x1: 196 },
      { x0: 126, x1: 196 },
    ].map((b, i) => (
      <rect
        key={i}
        className="tally-fill sch-p is-on"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        x={b.x0}
        y={14 + i * 6}
        width={b.x1 - b.x0}
        height={3}
      />
    ))}
    <path className="ln ln--live" d="M 196 10 V 34" />
    <Read x={0} y={44}>3 roles · 24 months</Read>
  </svg>
);

export const INSTRUMENTS = [Switched, Clock, Steps, Months];
export { Tape };
