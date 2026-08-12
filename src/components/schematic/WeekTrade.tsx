import { useSchematic } from "./useSchematic";

/**
 * The week, and the thirty minutes.
 *
 * The only apparatus on the site that runs a full narrative arc — fill, hold,
 * trade, release — because it is the only section whose job is to make an offer
 * rather than describe a capability.
 */

const COLS = 5;
const ROWS = 6;
/** the void: rows 2-4, all five columns, is where the copy sits */
const VOID_ROWS = [2, 3, 4];

const WeekTrade = () => {
  const { ref, className } = useSchematic<HTMLDivElement>();

  const cells: { c: number; r: number; eat: number | null }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (VOID_ROWS.includes(r)) continue;
      // the repeating task: the same slot on every day, spreading outward
      const eat = r === 1 || r === 5 ? c : r === 0 ? c + 5 : null;
      cells.push({ c, r, eat });
    }
  }

  return (
    <div ref={ref} className={`week ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-[min(680px,84%)]">
        {cells.map(({ c, r, eat }) => (
          <span
            key={`${c}-${r}`}
            className="week-cell"
            style={{
              left: `${(c / COLS) * 100}%`,
              top: `${(r / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
            }}
          >
            {eat !== null && (
              <span className="week-ink run-week" style={{ ["--i" as string]: eat }} />
            )}
          </span>
        ))}
        <span
          className="week-void"
          style={{
            left: 0,
            width: "100%",
            top: `${(VOID_ROWS[0] / ROWS) * 100}%`,
            height: `${(VOID_ROWS.length / ROWS) * 100}%`,
          }}
        />
        <span
          className="t-mono absolute text-[0.625rem] text-ink-tertiary"
          style={{ left: 4, top: `calc(${(VOID_ROWS[0] / ROWS) * 100}% - 14px)` }}
        >
          30 min
        </span>
        <span
          className="week-trade run-week-offer"
          style={{ left: 0, top: `calc(${(VOID_ROWS[0] / ROWS) * 100}% - 10px)` }}
        />
        <span
          className="t-mono absolute bottom-0 left-0 text-[0.625rem] text-ink-tertiary"
        >
          one week · 30 minutes
        </span>
      </div>
    </div>
  );
};

export default WeekTrade;
