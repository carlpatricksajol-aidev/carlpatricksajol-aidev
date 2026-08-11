import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SectionHeader, useEnter } from "@/components/primitives";
import { workflowEvidence } from "@/data/site";

/**
 * The automation equivalent of the ad gallery: real production canvases.
 * They are illegible at card size by nature — that is the point of the
 * click-to-zoom, and the caption carries what each one actually does.
 */
const Workflows = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const [open, setOpen] = useState<number | null>(null);
  const wf = open === null ? null : workflowEvidence[open];

  return (
    <section id="workflows" ref={ref} className={`${className} section bg-surface-sunken`} aria-labelledby="wf-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="wf-h"
          eyebrow="Evidence"
          title="The graphs behind the systems"
          deck="Production workflow canvases from live automation work. Click any one to read it full size."
        />

        <ul className="mt-s9 grid gap-s4 sm:grid-cols-2 lg:grid-cols-4">
          {workflowEvidence.map((w, i) => (
            <li key={w.src}>
              {/* the canvas is dark, so the card carries the ink tone override —
                  without it the light-theme text tokens land dark-on-dark */}
              <button
                type="button"
                data-tone="ink"
                onClick={() => setOpen(i)}
                className="group flex h-full w-full flex-col rounded-lg border border-line bg-surface-ink p-s3 text-left transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(16,24,40,.06),0_10px_24px_-8px_rgba(16,24,40,.16)]"
                aria-label={`View workflow: ${w.title}`}
              >
                <span className="grid h-[128px] w-full place-items-center overflow-hidden rounded-sm">
                  <img
                    src={w.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-full w-full object-contain opacity-85 transition-opacity duration-[180ms] group-hover:opacity-100"
                  />
                </span>
                <span className="t-step--1 mt-s3 block font-medium text-ink">{w.title}</span>
                <span className="t-step--2 mt-1 block !normal-case !tracking-normal text-ink-secondary">
                  {w.note}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[min(96vw,1200px)] gap-0 overflow-hidden p-0">
          {wf && (
            <>
              <div className="bg-surface-ink p-s4">
                <img src={wf.src} alt={`Workflow canvas: ${wf.title}`} className="w-full" />
              </div>
              <div className="p-s5">
                <DialogTitle className="t-step-2">{wf.title}</DialogTitle>
                <DialogDescription className="t-step-0 mt-s2 text-ink-secondary">{wf.note}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Workflows;
