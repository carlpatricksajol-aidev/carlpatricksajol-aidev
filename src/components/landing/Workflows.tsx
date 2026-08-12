import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SectionHeader, useEnter } from "@/components/primitives";
import { flows, type Flow } from "@/data/flows";
import { sectionCopy } from "@/data/copy";
import { flowLine, lineOrder, type LineId } from "@/data/serviceLines";
import { lineCopy } from "@/data/serviceLineCopy";

/**
 * The plate wall — every production workflow graph, not the eight we used to
 * show. Rendered from real node positions and connection lists rather than
 * screenshotted, so they carry no other product's UI, stay crisp at any zoom,
 * and cost ~10KB of vector each instead of a raster.
 *
 * Filtered by service line, because 26 graphs in one undifferentiated grid is a
 * pile, and the same 26 split into named practices is a body of work.
 */

const slugOf = (src: string) => src.replace("/flows/", "").replace(".svg", "");

type Filter = "all" | LineId;

const Workflows = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Flow | null>(null);

  // only lines that actually own plates get a tab — an empty tab is a dead end
  const tabs = useMemo(() => {
    const counts = new Map<LineId, number>();
    for (const f of flows) {
      const id = flowLine[slugOf(f.src)];
      if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return lineOrder.filter((id) => counts.has(id)).map((id) => ({ id, n: counts.get(id)! }));
  }, []);

  const shown = useMemo(
    () => (filter === "all" ? flows : flows.filter((f) => flowLine[slugOf(f.src)] === filter)),
    [filter]
  );

  return (
    <section id="workflows" ref={ref} className={`${className} section bg-surface-sunken`} aria-labelledby="wf-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="wf-h"
          eyebrow={sectionCopy.workflows.eyebrow}
          title={sectionCopy.workflows.title}
          deck={sectionCopy.workflows.deck}
        />

        {/* filter bar. The counts are information, not decoration — they carry
            the same colour as their label rather than a dimmed one, because a
            60%-alpha secondary ink lands around 3:1 and fails AA at this size. */}
        <div className="mt-s6 flex flex-wrap items-center gap-s2 border-y border-line py-s4" role="group" aria-label="Filter workflows by practice">
          {[{ id: "all" as Filter, name: "Everything", n: flows.length }, ...tabs.map((t) => ({ id: t.id as Filter, name: lineCopy[t.id].name, n: t.n }))].map(
            ({ id, name, n }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                className={`t-small rounded-xs px-s3 py-1.5 transition-colors duration-120 ${
                  filter === id
                    ? "bg-ink text-[hsl(var(--card))]"
                    : "border border-line bg-surface-raised text-ink-secondary hover:border-line-strong hover:text-ink"
                }`}
              >
                {name} <span className="t-mono tnum ml-1 text-[0.75rem]">{n}</span>
              </button>
            )
          )}
        </div>

        {/* the wall */}
        <ul className="mt-s6 grid gap-s5 md:grid-cols-2">
          {shown.map((f) => (
            <li key={f.src}>
              <button
                type="button"
                onClick={() => setOpen(f)}
                className="group block h-full w-full overflow-hidden rounded-md border border-line bg-surface-raised text-left transition-[border-color,box-shadow] duration-180 hover:border-line-strong hover:shadow-e2"
                aria-label={`View workflow graph: ${f.title}`}
              >
                <span className="block overflow-hidden border-b border-line bg-surface-sunken">
                  <img
                    src={f.src.replace("/flows/", "/flows/detail/")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-[600ms] ease-entrance group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block p-s5">
                  <span className="t-sub block text-ink">{f.title}</span>
                  <span className="t-small mt-s2 block text-ink-secondary">{f.note}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="t-micro mt-s5 text-ink-tertiary" aria-live="polite">
          Showing {shown.length} of {flows.length} workflow maps.
        </p>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-[min(96vw,1400px)] gap-0 overflow-hidden p-0">
          {open && (
            <>
              <div className="max-h-[70vh] overflow-auto bg-surface p-s4">
                <img src={open.src} alt={`Workflow graph: ${open.title}`} className="min-w-[900px] max-w-none" />
              </div>
              <div className="border-t border-line p-s5">
                <DialogTitle className="t-sub">{open.title}</DialogTitle>
                <DialogDescription className="t-body mt-s2 text-ink-secondary">{open.note}</DialogDescription>
                <p className="t-slug mt-s3 text-ink-tertiary">Scroll to pan · drawn from the live workflow graph</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Workflows;
