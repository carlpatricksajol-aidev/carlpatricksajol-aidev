import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

export const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** true once the element has scrolled into view (then stays true) */
export const useInView = <T extends Element>(threshold = 0.2, rootMargin = "0px 0px -8% 0px") => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || reducedMotion()) { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView] as const;
};

/** fade-up on scroll */
export const Reveal = ({ children, as: Tag = "div", delay = 0, fade = false, className = "", style, ...rest }: {
  children: ReactNode; as?: ElementType; delay?: number; fade?: boolean; className?: string; style?: CSSProperties; [k: string]: unknown;
}) => {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`${fade ? "rv-fade" : "rv"}${inView ? " in" : ""} ${className}`} style={{ ...style, ["--d" as string]: `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
};

/** words rise out of a mask, one after another. Pass plain text; *word* = italic gold. */
export const Split = ({ text, as: Tag = "span", className = "", delay = 0, immediate = false }: {
  text: string; as?: ElementType; className?: string; delay?: number; immediate?: boolean;
}) => {
  const [ref, inView] = useInView<HTMLElement>(0.15, "0px");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!immediate) return;
    const t = window.setTimeout(() => setReady(true), 30);
    return () => window.clearTimeout(t);
  }, [immediate]);
  const on = immediate ? ready : inView;
  // "*a few words*" can span several words: every word between the stars is italic gold
  let open = false;
  const words = text.split(" ").map((w) => {
    const starts = w.startsWith("*");
    const ends = w.replace(/[.,!?]$/, "").endsWith("*") && (w.length > 1 || open);
    const em = open || starts;
    open = (open || starts) && !ends;
    return { w, em };
  });
  return (
    <Tag ref={ref} className={`split${on ? " in" : ""} ${className}`} style={{ ["--d" as string]: `${delay}s` }} aria-label={text.replace(/\*/g, "")}>
      {words.map(({ w, em }, i) => {
        const clean = w.replace(/\*/g, "");
        // inside a run of highlighted words the space is highlighted too, so the marker reads as one stroke
        const joined = em && words[i + 1]?.em;
        return (
          <span key={i} aria-hidden="true">
            <span className="w"><span style={{ ["--i" as string]: i }}>{em ? <em>{joined ? `${clean} ` : clean}</em> : clean}</span></span>
            {i < words.length - 1 && !joined ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
};

/** counts the number inside a value like "~5 min", "$9.99", "7/10" up from zero */
export const CountUp = ({ value, className = "", duration = 1.8 }: { value: string; className?: string; duration?: number }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4, "0px");
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const [shown, setShown] = useState(m ? `${m[1]}0${m[3]}` : value);
  useEffect(() => {
    if (!m) return;
    if (!inView) return;
    if (reducedMotion()) { setShown(value); return; }
    const target = parseFloat(m[2]);
    const decimals = (m[2].split(".")[1] ?? "").length;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(`${m[1]}${(target * eased).toFixed(decimals)}${m[3]}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);
  return <span ref={ref} className={`num ${className}`} aria-label={value}><span aria-hidden="true">{m ? shown : value}</span></span>;
};

/** the element leans toward the pointer while hovered */
export const Magnetic = ({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} style={{ display: "inline-flex", transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}>{children}</span>;
};

/** a dot and a lagging ring; grows over links, says "View" over cards marked data-cursor="view" */
export const Cursor = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement | null;
      const view = t?.closest?.("[data-cursor='view']");
      const hover = !view && t?.closest?.("a, button, [role='button'], input, label");
      wrap.current?.classList.toggle("view", !!view);
      wrap.current?.classList.toggle("hover", !!hover);
    };
    const tick = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="cursor" ref={wrap} aria-hidden="true">
      <span className="dot" ref={dot} />
      <span className="ring" ref={ring}><span>View</span></span>
    </div>
  );
};

/** soft gold light that follows the pointer inside a card */
export const spotlight = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};
