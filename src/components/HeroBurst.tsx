import { useEffect, useRef, useState } from "react";
import { BrandIcon, brandMarks } from "@/components/BrandIcons";

/**
 * The arrival. Eight automation marks fly out to the edges of the screen, bounce
 * back and forth for a few seconds, and are gone.
 *
 * It runs ONCE, on arrival, and then removes itself from the DOM entirely — so
 * the first thing a visitor sees is the stack in motion, and five seconds later
 * the hero is a clean page with nothing looping behind the headline. A permanent
 * background animation under an h1 is the thing that makes a portfolio feel
 * cheap; a single entrance does not.
 *
 * Full-bleed and fixed, so "the edge of the screen" means the actual screen
 * rather than the edge of a column. One transform and one opacity per mark,
 * nothing else, so the whole burst composites on the GPU.
 */

/** written out in full so Tailwind's scanner can see them: a class name built
 *  by template literal is invisible to it and the rule is purged from the
 *  bundle, which is exactly how this shipped silently broken the first time. */
const PATH_CLASS: Record<number, string> = {
  1: "burst-p1",
  2: "burst-p2",
  3: "burst-p3",
  4: "burst-p4",
};

type Fly = {
  key: string;
  /** which bounce path it takes */
  path: 1 | 2 | 3 | 4;
  size: number;
  delay: number;
};

// The tools the headline actually names, plus the two the deck names next.
// Nothing here is a tool the copy does not claim.
const FLYERS: Fly[] = [
  { key: "n8n", path: 1, size: 46, delay: 0.05 },
  { key: "zapier", path: 2, size: 40, delay: 0.18 },
  { key: "make", path: 3, size: 44, delay: 0.3 },
  { key: "openai", path: 4, size: 38, delay: 0.42 },
  { key: "hubspot", path: 2, size: 42, delay: 0.54 },
  { key: "airtable", path: 1, size: 36, delay: 0.66 },
  { key: "notion", path: 4, size: 40, delay: 0.78 },
  { key: "slack", path: 3, size: 38, delay: 0.9 },
];

/** total run: the longest delay plus the animation, then it unmounts */
const LIFETIME = 6200;

const HeroBurst = () => {
  const [gone, setGone] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // a burst is motion for its own sake, which is exactly what reduced motion
    // asks not to see. Nothing renders at all rather than something frozen.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    timer.current = window.setTimeout(() => setGone(true), LIFETIME);
    return () => window.clearTimeout(timer.current);
  }, []);

  if (gone) return null;

  return (
    <div className="burst" aria-hidden="true">
      {FLYERS.map((f, i) => {
        // never render an empty box for a mark that is not in the set
        if (!brandMarks[f.key]) return null;
        return (
          <span
            key={`${f.key}-${i}`}
            className={`burst-mark ${PATH_CLASS[f.path]}`}
            style={{ width: f.size, height: f.size, animationDelay: `${f.delay}s` }}
          >
            <BrandIcon name={f.key} size={f.size} />
          </span>
        );
      })}
    </div>
  );
};

export default HeroBurst;
