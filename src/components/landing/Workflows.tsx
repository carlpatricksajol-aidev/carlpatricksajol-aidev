import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SectionHeader, useEnter } from "@/components/primitives";
import { flows } from "@/data/flows";

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
          eyebrow="Evidence"
          title="The graphs behind the systems"
          deck={`Live production workflows, drawn from their own node graphs. ${flows.length} are running right now — these are eight of them.`}
        />

        <ul className="mt-s9 grid gap-s5 md:grid-cols-2">
          {featured.map((f, i) => (
            <li key={f.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-line bg-surface-raised text-left transition-[transform,box-shadow,border-color] duration-[180ms] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_1px_2px_rgba(16,24,40,.04),0_10px_24px_-8px_rgba(16,24,40,.10)]"
                aria-label={`View workflow graph: ${f.title}`}
              >
                {/* these graphs run up to 8:1, so the thumbnail fits the whole
                    shape rather than cropping to an empty-looking strip */}
                <span className="grid h-[150px] place-items-center overflow-hidden border-b border-line-subtle bg-surface p-s4">
                  <img
                    src={f.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full w-full object-contain opacity-90 transition-opacity duration-[180ms] group-hover:opacity-100"
                  />
                </span>
                <span className="flex flex-1 flex-col p-s5">
                  <span className="t-step-2 text-ink">{f.title}</span>
                  <span className="t-step-0 mt-s2 text-ink-secondary">{f.note}</span>
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
                <DialogTitle className="t-step-2">{current.title}</DialogTitle>
                <DialogDescription className="t-step-0 mt-s2 text-ink-secondary">{current.note}</DialogDescription>
                <p className="t-step--2 mt-s3 text-ink-tertiary">Scroll to pan · drawn from the live workflow graph</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Workflows;
