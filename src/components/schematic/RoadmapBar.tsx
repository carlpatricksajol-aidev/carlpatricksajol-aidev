import { lineOrder } from "@/data/serviceLines";
import { lineCopy } from "@/data/serviceLineCopy";

/**
 * Same mechanism, second orientation. One media query, no new JavaScript, no
 * second observer, and it stacks directly under the header's own trunk line so
 * it reads as the chapter's rail taking delivery from the site's.
 */
const RoadmapBar = ({ active }: { active: number }) => (
  <div
    className="roadmap-bar lg:hidden"
    style={{ ["--road" as string]: `${(active + 1) / lineOrder.length}` }}
  >
    <span className="roadmap-bar-rail" aria-hidden="true">
      <span className="roadmap-bar-fill" />
      {lineOrder.map((id, i) => (
        <span
          key={id}
          className={`roadmap-bar-node ${i <= active ? "is-done" : ""}`}
          style={{ ["--p" as string]: `${((i + 0.5) / lineOrder.length) * 100}%` }}
        />
      ))}
    </span>
    <p className="t-mono tnum shrink-0 text-[0.6875rem] text-ink-tertiary">
      <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> of{" "}
      {String(lineOrder.length).padStart(2, "0")}
    </p>
    <p className="t-small hidden shrink-0 truncate text-ink sm:block">{lineCopy[lineOrder[active]].name}</p>
  </div>
);

export default RoadmapBar;
