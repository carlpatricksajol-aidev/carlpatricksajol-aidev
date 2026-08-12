import { Read } from "./kit";
import { experience } from "@/data/site";

/** months since the axis origin, computed once at module scope */
const months = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

const now = (() => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
})();

const LANE_DUR = ["17s", "13s", "11s"];
const LANE_REST = [0.62, 0.78, 0.44];

const Concurrency = () => {
  const roles = experience.slice(0, 3).filter((r) => r.start);
  if (roles.length === 0) return null;

  const starts = roles.map((r) => months(r.start!));
  const origin = Math.min(...starts);
  const span = Math.max(1, now - origin);

  return (
    <div className="sch sch-in mt-s6 h-[140px]" aria-hidden="true">
      <div className="conc relative h-full">
        <span className="conc-axis" />
        <span className="conc-now" />
        {roles.map((r, i) => {
          const x0 = ((months(r.start!) - origin) / span) * 100;
          return (
            <div key={r.company} className="absolute left-0 right-0" style={{ top: `${14 + i * 26}px` }}>
              <span
                className="conc-bar"
                style={{ ["--x0" as string]: `${x0}%`, ["--x1" as string]: "100%" }}
              />
              <span
                className="conc-k"
                style={{
                  ["--x0" as string]: `${x0}%`,
                  ["--reach" as string]: `calc(${100 - x0}% - 6px)`,
                  ["--dur" as string]: LANE_DUR[i],
                  ["--rest" as string]: LANE_REST[i],
                }}
              />
              <span className="t-mono absolute left-0 top-[-12px] text-[0.625rem] text-ink-tertiary">
                {r.company}
              </span>
            </div>
          );
        })}
        <svg viewBox="0 0 260 14" className="absolute bottom-0 left-0 h-[14px] w-[260px]" role="presentation">
          <Read x={0} y={10}>{`${roles.length} roles · concurrent · ${span} months`}</Read>
        </svg>
      </div>
    </div>
  );
};

export default Concurrency;
