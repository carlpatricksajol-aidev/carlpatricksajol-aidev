import { useEffect, useRef, useState } from "react";

/**
 * One observer, one visibility listener, for every apparatus on the page.
 *
 * Loops are declared `animation-play-state: paused` in CSS and run only under
 * `html[data-run="live"] .sch.is-live`. Nothing is ever added or removed, so
 * two animations sharing a period stay phase-locked for the life of the page.
 */

const nodes = new Set<Element>();
let observer: IntersectionObserver | null = null;
let wired = false;

const setRun = () => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.run = document.hidden ? "idle" : "live";
};

const ensure = () => {
  if (wired || typeof IntersectionObserver === "undefined") return;
  wired = true;
  setRun();
  document.addEventListener("visibilitychange", setRun);
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const cb = (e.target as HTMLElement & { __sch?: (v: boolean) => void }).__sch;
        cb?.(e.isIntersecting);
      }
    },
    { threshold: 0, rootMargin: "10% 0px 10% 0px" }
  );
};

export function useSchematic<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current as (T & { __sch?: (v: boolean) => void }) | null;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    ensure();
    el.__sch = setLive;
    nodes.add(el);
    observer?.observe(el);
    return () => {
      observer?.unobserve(el);
      nodes.delete(el);
      delete el.__sch;
    };
  }, []);

  return { ref, live, className: `sch${live ? " is-live" : ""}` };
}

/** Call once, from Page, so the switch exists before any component mounts. */
export function useRunSwitch() {
  useEffect(() => {
    setRun();
    document.addEventListener("visibilitychange", setRun);
    return () => document.removeEventListener("visibilitychange", setRun);
  }, []);
}
