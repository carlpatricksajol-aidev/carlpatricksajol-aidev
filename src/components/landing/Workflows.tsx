import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SectionHeader, useEnter } from "@/components/primitives";
import { flows } from "@/data/flows";
import { sectionCopy } from "@/data/copy";

/**
 * The automation counterpart to the ad gallery: real production workflow graphs,
 * rendered from their own node positions and connection lists. Not screenshots —
 * so they carry no other product's UI, stay crisp at any zoom, and cost ~10KB of
 * vector each instead of a raster.
 */
const Workflows = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const [open, setOpen] = useState<number | null>(null);
  const featured = flows.filter((f) => f.feature);
  const current = open === null ? null : featured[open];

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

        <ul className="mt-s7 border-t border-line">
          {featured.map((f, i) => (
            <li key={f.src} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group grid12 w-full items-center py-s5 text-left transition-colors duration-180 hover:bg-surface-sunken"
                aria-label={`View workflow graph: ${f.title}`}
              >
                <span className="t-mono tnum col-span-2 hidden self-start pt-1 text-[0.8125rem] text-ink-tertiary lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-12 lg:col-span-4">
                  <span className="t-sub block text-ink">{f.title}</span>
                  <span className="t-small mt-s2 block max-w-[42ch] text-ink-secondary">{f.note}</span>
                </span>
                {/* the plate: a legible detail of the real graph, bleeding right */}
                <span className="col-span-12 mt-s4 block overflow-hidden rounded-md border border-line bg-surface-sunken lg:col-span-6 lg:col-start-7 lg:mt-0">
                  <img
                    src={f.src.replace("/flows/", "/flows/detail/")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-[600ms] ease-entrance group-hover:scale-[1.03]"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-[min(96vw,1400px)] gap-0 overflow-hidden p-0">
          {current && (
            <>
              <div className="max-h-[70vh] overflow-auto bg-surface p-s4">
                <img src={current.src} alt={`Workflow graph: ${current.title}`} className="min-w-[900px] max-w-none" />
              </div>
              <div className="border-t border-line p-s5">
                <DialogTitle className="t-sub">{current.title}</DialogTitle>
                <DialogDescription className="t-body mt-s2 text-ink-secondary">{current.note}</DialogDescription>
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
