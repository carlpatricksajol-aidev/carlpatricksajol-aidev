import { Read, SPort } from "./kit";

/**
 * One job, five operations. Staggered 2.4s apart on the 12s master, so
 * something completes roughly every two and a half seconds down the list —
 * deliberately calmer than Problems' one-per-second directly above it.
 */

const VB = "0 0 88 88";

/** the constant: the same card, in all five cells */
const Card = ({ y = 20 }: { y?: number }) => (
  <g className="sch-n">
    <rect x={10} y={y} width={58} height={34} rx={10} />
    <rect className="sch-p" x={18} y={y + 9} width={30} height={1.5} />
    <rect className="sch-p" x={18} y={y + 16} width={38} height={1.5} />
    <rect className="sch-p" x={18} y={y + 23} width={22} height={1.5} />
  </g>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox={VB} className="block h-auto w-full" role="presentation" aria-hidden="true">
    {children}
  </svg>
);

const M1 = () => (
  <Frame>
    <Card />
    <rect
      className="ln--live run-m1"
      x={10}
      y={17}
      width={58}
      height={1.5}
      fill="hsl(var(--sch-live))"
    />
    <path className="ln ln--dash" d="M 6 16 H 72 V 58 H 6 Z" />
    <Read x={2} y={78}>12 steps · 2 exceptions</Read>
  </Frame>
);

const M2 = () => (
  <Frame>
    <Card />
    {/* the connection that already exists: seats immediately */}
    <rect className="sch-k run-m2a" x={2} y={34} width={8} height={6} />
    {/* the one that doesn't: the socket is DRAWN, then it seats */}
    <rect
      className="sch-p is-on run-m2b"
      x={68}
      y={33}
      width={10}
      height={8}
      style={{ transformBox: "fill-box", transformOrigin: "left center" }}
    />
    <Read x={2} y={78}>ready-made · built</Read>
  </Frame>
);

const M3 = () => (
  <Frame>
    <Card />
    <rect className="ln--live" x={18} y={44} width={38} height={1.5} fill="hsl(var(--sch-live))" />
    {[
      { x: 6, dx: 22, dy: -8 },
      { x: 40, dx: -6, dy: -8 },
      { x: 70, dx: -32, dy: -8 },
    ].map((p, i) => (
      <rect
        key={i}
        className="sch-k run-m3"
        x={p.x}
        y={64}
        width={6}
        height={6}
        style={{ ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` }}
      />
    ))}
    <Read x={2} y={82}>1 source · 3 readers</Read>
  </Frame>
);

/** the five objects the body names, in the order it names them */
const TRIGGERS = ["schedule", "form", "row", "file", "message"];

const M4 = () => (
  <Frame>
    <Card y={26} />
    {TRIGGERS.map((t, i) => (
      <g key={t}>
        <SPort x={14 + i * 12} y={12} />
        <SPort
          x={14 + i * 12}
          y={12}
          on
          className="run-m4"
          style={{ ["--i" as string]: i }}
        />
      </g>
    ))}
    <Read x={2} y={80}>5 ways to start</Read>
  </Frame>
);

const M5 = () => (
  <Frame>
    <Card y={26} />
    <path className="ln ln--dash" d="M 68 43 C 80 43, 80 66, 39 66 C 4 66, 4 43, 10 43" />
    <text x={2} y={16} className="sch-slug">×3</text>
    <rect className="sch-k sch-k--ink run-m5" x={62} y={26} width={6} height={6} />
    <text x={70} y={14} className="sch-slug">slack</text>
    <Read x={2} y={82}>×3 quiet · 1 loud</Read>
  </Frame>
);

const CELLS = [M1, M2, M3, M4, M5];

export const Move = ({ i, live }: { i: number; live: boolean }) => {
  const Cell = CELLS[i];
  if (!Cell) return null;
  return (
    <span className={`move sch sch-in ${live ? "is-live" : ""}`} aria-hidden="true">
      <Cell />
    </span>
  );
};
