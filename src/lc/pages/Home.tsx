import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, CalendarDays, Plus } from "lucide-react";
import { AskBox } from "../ask/Ask";
import { profile, testimonials } from "@/data/site";
import { CountUp, Magnetic, Reveal, Split, reducedMotion, spotlight } from "../motion";
import { featured, highlightOf, highlights, statusLabel } from "../data/highlights";
import { lanes } from "../data/lanes";
import { caseBySlug, useTitle } from "../util";
import { heroDelay } from "../intro";

const WORDS = ["content.", "creators.", "launches.", "reporting.", "AI agents."];

/* one word at a time inside a volt marker; only the current word is rendered, so two can never overlap */
const Rotator = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => window.clearInterval(t);
  }, []);
  return <span className="rot" aria-live="off"><span key={i}>{WORDS[i]}</span></span>;
};

/* the masthead is sized to fill the stage width exactly, capped by the screen height,
   and the portrait slides sideways so the head lands in the gap between the two words */
const HEAD_X = 0.549; // where the head's centre sits across the cutout, measured from the alpha
const useFitMast = (cut: React.RefObject<HTMLElement>) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const row = el.firstElementChild as HTMLElement | null;
    if (!row) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = row.getBoundingClientRect().width;
      const avail = el.clientWidth;
      if (!w || !avail) return;
      const cap = window.innerWidth > 900 ? window.innerHeight * 0.36 : Infinity;
      el.style.fontSize = `${Math.min((avail / w) * 100, cap)}px`;
      const gap = row.querySelector<HTMLElement>(".gap");
      const c = cut.current;
      if (!gap || !c) return;
      const gapX = el.offsetLeft + row.offsetLeft + gap.offsetLeft + gap.offsetWidth / 2;
      const headX = c.offsetLeft + c.offsetWidth * HEAD_X;
      const room = window.innerWidth > 900 ? 90 : 60;
      c.style.setProperty("--shift", `${Math.max(-room, Math.min(room, gapX - headX)).toFixed(1)}px`);
    };
    fit();
    // fonts.ready can resolve before Archivo has even been requested, so ask for it by name and refit once it lands
    document.fonts?.load('800 100px "Archivo"').then(fit, () => {});
    document.fonts?.addEventListener?.("loadingdone", fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => { ro.disconnect(); document.fonts?.removeEventListener?.("loadingdone", fit); };
  }, []);
  return ref;
};

/* depth: the masthead drifts against the pointer and the scroll, the portrait the other way */
const useDepth = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const move = (e: PointerEvent) => el.style.setProperty("--px", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    const scroll = () => el.style.setProperty("--sy", String(Math.min(window.scrollY, 900)));
    if (fine) window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll); };
  }, []);
  return ref;
};

const Hero = () => {
  const cut = useRef<HTMLElement>(null);
  const mast = useFitMast(cut);
  const stage = useDepth();
  return (
    <section className="hero" aria-label="Introduction" ref={stage} style={{ ["--hd" as string]: `${heroDelay}s` }}>
      <div className="wrap hero-stage">
        <h1 className="display mast" ref={mast} aria-label="Carl Sajol, AI Marketing Specialist">
          <span className="mast-row" aria-hidden="true">
            {"Carl Sajol".split("").map((ch, i) => (ch === " " ? <span key={i} className="gap" /> : <span key={i} style={{ ["--i" as string]: i }}>{ch}</span>))}
          </span>
        </h1>
        <figure className="cut" ref={cut}>
          <img src="/portrait-cut.webp" srcSet="/portrait-cut-sm.webp 560w, /portrait-cut.webp 649w" sizes="(max-width: 900px) 82vw, 36vw" alt="Carl Patrick Sajol" width={649} height={884} fetchPriority="high" />
        </figure>
        <div className="hero-left">
          <Reveal delay={heroDelay + 0.5}><p className="hero-role">AI Marketing Specialist · Philippines</p></Reveal>
          <Reveal delay={heroDelay + 0.6}><p className="hero-claim">I build the AI systems behind <Rotator /></p></Reveal>
          <Reveal delay={heroDelay + 0.7}>
            <p className="hero-lede">I run campaigns and build the agents behind them. I've shipped 26 of those automations to production, and every one is written up below with its result.</p>
          </Reveal>
          <Reveal delay={heroDelay + 0.8} className="hero-cta">
            <Magnetic><a className="btn gold" href="#results"><span>See the results</span><ArrowDown /></a></Magnetic>
            <Magnetic><a className="btn" href={profile.calendly} target="_blank" rel="noreferrer"><span>Book a call</span><CalendarDays /></a></Magnetic>
          </Reveal>
        </div>
        <Reveal className="hero-right" delay={heroDelay + 0.9}>
          <AskBox />
        </Reveal>
      </div>
    </section>
  );
};

const Proof = () => (
  <section className="night proof" aria-label="In numbers">
    <div className="wrap">
      <div className="proof-grid" role="list">
        {[
          ["26", "automations shipped to production"],
          ["500", "workflow steps inside them"],
          [String(highlights.length), "shipped case studies, each with its result"],
          ["3+", "years in marketing, ads first"],
        ].map(([v, l], k) => (
          <Reveal key={l} className="stat" role="listitem" delay={k * 0.08}>
            <CountUp value={v} />
            <span className="lab">{l}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Ticker = () => {
  const items = highlights.slice(0, 10);
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label="Results at a glance">
      <div className="marquee-track">
        {row.map((h, k) => (
          <span className="marquee-item" key={k} aria-hidden={k >= items.length}>
            <b>{h.value}</b> {h.label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* the results track: scrolls sideways while the section is pinned */
const Results = () => {
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const cases = featured.map((slug) => ({ h: highlightOf(slug)!, c: caseBySlug(slug)! })).filter((x) => x.h && x.c);

  useEffect(() => {
    const s = section.current, r = row.current;
    if (!s || !r) return;
    let distance = 0;
    const pinned = () => window.innerWidth > 900 && !reducedMotion();
    const layout = () => {
      if (!pinned()) { s.style.height = ""; r.style.transform = ""; return; }
      distance = Math.max(0, r.scrollWidth - window.innerWidth);
      s.style.height = `${distance + window.innerHeight}px`;
      onScroll();
    };
    const onScroll = () => {
      if (!pinned()) return;
      const top = s.getBoundingClientRect().top;
      const p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0;
      r.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      if (bar.current) bar.current.style.width = `${p * 100}%`;
    };
    layout();
    const t = window.setTimeout(layout, 500);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(t); window.removeEventListener("resize", layout); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section className="htrack night" id="results" ref={section} aria-labelledby="results-h">
      <div className="htrack-sticky">
        <div className="wrap htrack-head">
          <div>
            <Reveal><span className="eyebrow">Selected work</span></Reveal>
            <h2 id="results-h" className="title" style={{ marginTop: 20 }}><Split text="Results *first.*" /></h2>
          </div>
          <div className="htrack-progress" aria-hidden="true"><i ref={bar} /></div>
        </div>
        <div className="htrack-row" ref={row}>
          {cases.map(({ h, c }, k) => (
            <Link key={h.slug} to={`/work/${h.slug}`} className="rcard" data-cursor="view" onPointerMove={spotlight}>
              <div className="rcard-top">
                <span>{String(k + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}</span>
                <span className={`badge${c.status === "Delivered" ? " delivered" : ""}`}><i />{statusLabel(c.status)}</span>
              </div>
              <div>
                <CountUp value={h.value} />
                <p className="num-label">{h.label}</p>
              </div>
              <div>
                <h3>{c.title}</h3>
                <p>{h.outcome}</p>
              </div>
              <span className="more">Read the case study <ArrowRight /></span>
            </Link>
          ))}
          <div className="rcard end">
            <span className="eyebrow">{highlights.length} case studies</span>
            <p className="title" style={{ fontSize: "clamp(36px, 3.6vw, 58px)" }}>Every one written up, result first.</p>
            <Link className="btn" to="/work"><span>See all the work</span><ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [open, setOpen] = useState<string | null>("social");
  return (
    <section className="section" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal><span className="eyebrow">What I do</span></Reveal>
            <h2 id="svc-h" className="title" style={{ marginTop: 20 }}><Split text="Five things I make *run.*" /></h2>
          </div>
          <Reveal delay={0.15}><p className="lede">The work an AI marketing role asks for, each one already built and running somewhere. Open any line to see the proof.</p></Reveal>
        </div>
        <div className="services">
          {lanes.map((l, k) => {
            const isOpen = open === l.id;
            const proof = highlights.filter((h) => h.areas.includes(l.id)).slice(0, 3);
            return (
              <Reveal key={l.id} className={`svc${isOpen ? " open" : ""}`} delay={k * 0.06}>
                <button type="button" className="svc-row" aria-expanded={isOpen} aria-controls={`svc-${l.id}`} onClick={() => setOpen(isOpen ? null : l.id)}>
                  <span className="svc-n">{l.n}</span>
                  <span className="svc-title">{l.label}</span>
                  <span className="svc-line">{l.line}</span>
                  <span className="svc-plus" aria-hidden="true"><Plus /></span>
                </button>
                <div className="svc-body" id={`svc-${l.id}`}>
                  <div>
                    <div className="svc-inner">
                      <p>{l.detail}</p>
                      <div className="svc-links">
                        {proof.map((h) => (
                          <Link key={h.slug} to={`/work/${h.slug}`}>
                            <span>{caseBySlug(h.slug)?.title}</span>
                            <b>{h.value}</b>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Quotes = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(t);
  }, [i]);
  return (
    <section className="section" aria-labelledby="q-h" style={{ paddingTop: 0 }}>
      <div className="wrap quotes">
        <div>
          <Reveal><span className="eyebrow" id="q-h">Kind words</span></Reveal>
          <Reveal delay={0.1}><p className="small" style={{ marginTop: 18, maxWidth: "28ch" }}>From colleagues I built automation systems with.</p></Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="quote-stage">
            {testimonials.map((t, k) => (
              <figure key={t.name} className={`quote${k === i ? " on" : ""}`} aria-hidden={k !== i}>
                <blockquote>{t.quote}</blockquote>
                <figcaption><div><b>{t.name}</b><span>{t.role} · {t.org}</span></div></figcaption>
              </figure>
            ))}
          </div>
          <div className="quote-dots" role="tablist" aria-label="Choose a quote">
            {testimonials.map((t, k) => (
              <button key={`${t.name}-${k === i ? i : "x"}`} type="button" role="tab" aria-selected={k === i} aria-label={`Quote from ${t.name}`} className={k === i ? "on" : ""} onClick={() => setI(k)}><i /></button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Home = () => {
  useTitle("Carl Patrick Sajol · AI Marketing Specialist");
  return (
    <>
      <Hero />
      <Proof />
      <Ticker />
      <Results />
      <Services />
      <Quotes />
    </>
  );
};

export default Home;

