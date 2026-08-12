import { Read } from "./kit";
import { staticAds } from "@/data/site";

/**
 * The gate. One shot per view, ~3s total, then still.
 *
 * Rhymes deliberately with the Systems guard: those are the only two places on
 * the site where the copy states a rule that refuses, and they are drawn with
 * the same vocabulary for that reason.
 */
const ScoreGate = () => (
  <div className="relative z-10 mt-s6" aria-hidden="true">
    <div className="gate">
      <span className="gate-rail" />
      <span className="gate-node" />
      {staticAds.map((a, i) => (
        <span key={a.src} className="gate-k" style={{ ["--i" as string]: i }} />
      ))}
      <span className="gate-k gate-k--drop" />
    </div>
    <svg viewBox="0 0 260 14" className="mt-s2 h-[14px] w-[260px]" role="presentation">
      <Read x={0} y={10}>{`${staticAds.length} shipped · below 7 dropped`}</Read>
    </svg>
  </div>
);

export default ScoreGate;
