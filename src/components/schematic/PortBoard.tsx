import { BrandIcon } from "@/components/BrandIcons";
import { Read } from "./kit";
import { useSchematic } from "./useSchematic";
import { toolGroups, type ToolItem } from "@/data/site";

/**
 * The board. Every tool held still, on one grid, connected to one bus.
 *
 * It replaced two drifting rails. It does NOT show per-tool usage counts: a
 * number beside a tool invites a reader to grade it ("only ten?") when the
 * point being made is coverage, not frequency. The board says these all
 * connect; how often is a conversation, not a scoreboard.
 */

const flat: ToolItem[] = toolGroups.flatMap((g) => g.items);

const Chip = ({ item }: { item: ToolItem }) => {
  return (
    <li className="relative flex items-center border-b border-line px-s4 py-s5">
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
    </li>
  );
};

const PortBoard = () => {
  const { ref, className } = useSchematic<HTMLDivElement>();
  return (
    <div className="relative mt-s7">
      <ul className="sr-only-heading">
        {flat.map((t) => (
          <li key={t.label}>{t.label}</li>
        ))}
      </ul>

      <div ref={ref} className={`board ${className}`} aria-hidden="true">
        <ul className="grid grid-cols-3 gap-x-px border-t border-line sm:grid-cols-4 lg:grid-cols-8">
          {flat.map((it) => (
            <Chip key={it.label} item={it} />
          ))}
        </ul>
        <div className="relative mt-s5 h-[26px]">
          <span className="board-bus" />
          <span className="board-k run-b1" style={{ ["--tx" as string]: "22%" }} />
          <span className="board-k run-b2" style={{ ["--tx" as string]: "54%" }} />
          <span className="board-k run-b3" style={{ ["--tx" as string]: "81%" }} />
        </div>
        <svg viewBox="0 0 220 14" className="mt-s2 h-[14px] w-[220px]" role="presentation">
          <Read x={0} y={10}>{`${flat.length} accounts · one bus`}</Read>
        </svg>
      </div>
    </div>
  );
};

export default PortBoard;
