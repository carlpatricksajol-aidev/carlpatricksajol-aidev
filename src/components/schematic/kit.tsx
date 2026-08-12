import type { ReactNode } from "react";

export const NODE_W = 150;
export const NODE_H = 52;

/** the run that happens: a horizontal bezier with the plates' own fillet */
export const edgeH = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.max(18, (x2 - x1) * 0.5);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

export const edgeV = (x1: number, y1: number, x2: number, y2: number) => {
  const dy = Math.max(18, (y2 - y1) * 0.5);
  return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
};

export const SNode = ({
  x,
  y,
  w = NODE_W,
  h = NODE_H,
  name,
  slug,
  live = false,
  off = false,
  className = "",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  name?: string;
  slug?: string;
  live?: boolean;
  off?: boolean;
  className?: string;
}) => (
  <g className={`sch-n ${live ? "is-live" : ""} ${off ? "is-off" : ""} ${className}`}>
    <rect x={x} y={y} width={w} height={h} rx={10} />
    {name && (
      <text x={x + 14} y={y + (slug ? h / 2 - 1 : h / 2 + 4)} className="sch-name">
        {name}
      </text>
    )}
    {slug && (
      <text x={x + 14} y={y + h / 2 + 15} className="sch-slug">
        {slug}
      </text>
    )}
  </g>
);

/** hollow = not connected, solid = connected. The site's one state symbol. */
export const SPort = ({
  x,
  y,
  on = false,
  className = "",
  style,
}: {
  x: number;
  y: number;
  on?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <rect
    className={`sch-p ${on ? "is-on" : ""} ${className}`}
    style={style}
    x={x - 2.5}
    y={y - 2.5}
    width={5}
    height={5}
  />
);

export const SPacket = ({
  className = "",
  r = 3.4,
  cx = 0,
  cy = 0,
  style,
}: {
  className?: string;
  r?: number;
  cx?: number;
  cy?: number;
  style?: React.CSSProperties;
}) => <circle className={`sch-k ${className}`} style={style} cx={cx} cy={cy} r={r} />;

/** rule 8: every apparatus carries exactly one. */
export const Read = ({ x, y, children }: { x: number; y: number; children: ReactNode }) => (
  <text x={x} y={y} className="sch-read">
    {children}
  </text>
);
