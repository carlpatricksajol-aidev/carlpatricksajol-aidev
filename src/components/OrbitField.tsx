import { useEffect, useRef, useState } from "react";
import { brandMarks } from "@/components/BrandIcons";

/**
 * Platform marks flying the full width of the dark chapter.
 *
 * This replaces a blind emboss that was correct in theory and invisible in
 * practice. The marks now genuinely travel: each one crosses the entire width
 * on its own arc, rotating as it goes, at its own size, depth and speed. They
 * pass behind everything, so a mark drifting under a paragraph lightens the
 * plate a little and the text above it gets no harder to read — light-on-dark
 * contrast goes UP as the ground lifts, not down.
 *
 * Motion is autonomous rather than scroll-linked, because "flying across the
 * screen" has to happen whether or not the reader is moving. It is one
 * transform per mark and nothing else, so the whole field composites on the
 * GPU. The field stops completely when the chapter is off screen and when the
 * tab is hidden, and under reduced motion the marks park at staggered points
 * along their own paths, which reads as a composed still rather than a freeze.
 *
 * Geometry comes from BrandIcons, so there is one source of truth for the paths
 * and nothing is redrawn by hand.
 */

type Flyer = {
  key: string;
  /** which of the three arc keyframes it rides */
  path: 1 | 2 | 3;
  size: number;
  /** seconds for one full crossing */
  dur: number;
  /** negative, so the field is already populated on first paint */
  delay: number;
  top: string;
  opacity: number;
};

// Six travellers from three marks: repeating a mark at a different size, depth
// and speed reads as distance rather than as duplication.
const FLYERS: Flyer[] = [
  { key: "meta", path: 1, size: 128, dur: 34, delay: -2, top: "8%", opacity: 0.29 },
  { key: "tiktok", path: 2, size: 92, dur: 27, delay: -11, top: "34%", opacity: 0.23 },
  { key: "instagram", path: 3, size: 150, dur: 41, delay: -20, top: "58%", opacity: 0.19 },
  { key: "tiktok", path: 1, size: 60, dur: 22, delay: -16, top: "76%", opacity: 0.16 },
  { key: "meta", path: 3, size: 74, dur: 30, delay: -25, top: "88%", opacity: 0.14 },
  { key: "instagram", path: 2, size: 54, dur: 19, delay: -6, top: "20%", opacity: 0.13 },
];

const OrbitField = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting && !document.hidden), {
      threshold: 0,
    });
    obs.observe(el);

    // a field of six animations has no business running behind another tab
    const onVis = () => setLive(!document.hidden && !!el.getClientRects().length && isOnScreen(el));
    const isOnScreen = (n: HTMLElement) => {
      const r = n.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={ref} className={`orbit-field ${live ? "is-live" : ""}`} aria-hidden="true">
      {FLYERS.map((f, i) => {
        const mark = brandMarks[f.key];
        if (!mark) return null;
        return (
          <span
            key={`${f.key}-${i}`}
            className={`orbit-flyer orbit-p${f.path}`}
            style={{
              top: f.top,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={mark.d} />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export default OrbitField;
