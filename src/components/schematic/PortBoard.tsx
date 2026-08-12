import { BrandIcon } from "@/components/BrandIcons";
import { Read } from "./kit";
import { useSchematic } from "./useSchematic";
import { toolGroups, type ToolItem } from "@/data/site";

/**
 * The frequency board.
 *
 * The deck states three counts nothing on this page has ever drawn. A drifting
 * rail is structurally incapable of expressing a tally; a board is. The three
 * counted marks get a port lane that fills to their true value. The other ~28
 * get one `in use` port and no number.
 */

/** the only counted appearances that exist in the copy */
export const COUNTS: Record<string, number> = {
  Supabase: 18,
  "Google Sheets": 14,
  Notion: 10,
};

const flat: ToolItem[] = toolGroups.flatMap((g) => g.items);

const Chip = ({ item, i }: { item: ToolItem; i: number }) => {
  const n = COUNTS[item.label];
  return (
    <li className="relative flex flex-col gap-s3 border-b border-line px-s4 py-s4">
      <span className="flex items-center gap-s3">
        {item.logo ? (
          <img src={item.logo} alt="" loading="lazy" decoding="async" className="tool-lockup h-[18px] w-auto shrink-0" />
        ) : item.iconKey ? (
          <BrandIcon name={item.iconKey} size={20} className="shrink-0 text-ink" />
        ) : (
          <span className="h-[20px] w-px shrink-0 bg-line-strong" aria-hidden="true" />
        )}
        {!item.logo && <span className="t-small whitespace-nowrap font-medium text-ink">{item.label}</span>}
      </span>
      <span className="flex items-center gap-s2">
        <svg viewBox="0 0 80 8" className="h-2 w-[80px]" role="presentation" aria-hidden="true">
          {n ? (
            <>
              {Array.from({ length: 18 }, (_, k) => (
                <rect key={k} className="sch-p" x={k * 4.4} y={1.5} width={2} height={5} />
              ))}
              <g className="board-tick" style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "left center" }}>
                {Array.from({ length: n }, (_, k) => (
                  <rect key={k} className="sch-p is-on" x={k * 4.4} y={1.5} width={2} height={5} />
                ))}
              </g>
            </>
          ) : (
            <rect className="sch-p is-on" x={0} y={1.5} width={5} height={5} />
          )}
        </svg>
        <span className="t-mono tnum text-[0.6875rem] text-ink-tertiary">{n ? `×${n}` : "in use"}</span>
      </span>
    </li>
  );
};

const PortBoard = () => {
  const { ref, className } = useSchematic<HTMLDivElement>();
  return (
    <div className="relative mt-s7">
      <ul className="sr-only-heading">
        {flat.map((t) => (
          <li key={t.label}>
            {COUNTS[t.label] ? `${t.label} — appears ${COUNTS[t.label]} times in the 26 live systems` : t.label}
          </li>
        ))}
      </ul>

      <div ref={ref} className={`board ${className}`} aria-hidden="true">
        <ul className="grid grid-cols-3 gap-x-px border-t border-line sm:grid-cols-4 lg:grid-cols-8">
          {flat.map((it, i) => (
            <Chip key={it.label} item={it} i={i} />
          ))}
        </ul>
        <div className="relative mt-s5 h-[26px]">
          <span className="board-bus" />
          <span className="board-k run-b1" style={{ ["--tx" as string]: "22%" }} />
          <span className="board-k run-b2" style={{ ["--tx" as string]: "54%" }} />
          <span className="board-k run-b3" style={{ ["--tx" as string]: "81%" }} />
        </div>
        <svg viewBox="0 0 220 14" className="mt-s2 h-[14px] w-[220px]" role="presentation">
          <Read x={0} y={10}>{`${flat.length} accounts · 3 counted`}</Read>
        </svg>
      </div>
    </div>
  );
};

export default PortBoard;
