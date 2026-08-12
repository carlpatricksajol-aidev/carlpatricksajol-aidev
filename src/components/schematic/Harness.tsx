import { Read } from "./kit";

/**
 * One harness, five sockets. It fans, it does not fill: no scroll position, no
 * progress, no counter, so it cannot read as the roadmap directly above it.
 */
const Harness = ({ i, last = false }: { i: number; last?: boolean }) => (
  <span className="sch sch-in block w-full" aria-hidden="true">
    <span className={`harness-run block ${last ? "harness-run--rev" : ""}`}>
      {/* the plug: identical in every row */}
      <svg viewBox="0 0 100 12" className="absolute inset-0 h-full w-full" role="presentation">
        <rect className="sch-p is-on" x={0} y={3.5} width={5} height={5} />
        <path className="ln ln--dash" d="M 7 6 H 88" />
        <rect className="sch-p harness-socket" x={90} y={2} width={8} height={8} />
      </svg>
      <span className="harness-k" />
    </span>
    {last && (
      <svg viewBox="0 0 100 22" className="mt-1 block h-[22px] w-full" role="presentation">
        {/* the other four, pointing back at this one */}
        {[0, 1, 2, 3].map((k) => (
          <path key={k} className="ln ln--dash" d={`M ${8 + k * 20} 18 V ${12 - k * 2} H 92`} />
        ))}
        <Read x={0} y={8}>1 harness · 5 sockets</Read>
      </svg>
    )}
  </span>
);

export default Harness;
