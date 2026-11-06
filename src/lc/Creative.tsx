import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import { Reveal, Split, reducedMotion } from "./motion";
import { aiReels, brandLanes, moreReels, statics, type Reel, type Still } from "./data/creative";

/* Only one reel ever has sound. Tapping a reel unmutes it from the start and mutes the rest. */
const SOUND_EVENT = "creative-sound";

const ReelCard = ({ r, i }: { r: Reel; i: number }) => {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = vid.current, el = box.current;
    if (!v || !el) return;
    const off = (e: Event) => { if ((e as CustomEvent).detail !== r.src) { v.muted = true; setSound(false); } };
    window.addEventListener(SOUND_EVENT, off);
    if (reducedMotion() || typeof IntersectionObserver === "undefined") return () => window.removeEventListener(SOUND_EVENT, off);
    // muted preview while at least half the card is on screen, paused (and muted) once it leaves
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.play().then(() => setStarted(true), () => {}); }
      else { v.pause(); if (!v.muted) { v.muted = true; setSound(false); } }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); window.removeEventListener(SOUND_EVENT, off); };
  }, [r.src]);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.muted || v.paused) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: r.src }));
      v.muted = false; v.currentTime = 0;
      v.play().then(() => { setSound(true); setStarted(true); }, () => { v.muted = true; setSound(false); });
    } else { v.muted = true; setSound(false); }
  };

  return (
    <Reveal as="figure" className="crcard" delay={(i % 4) * 0.07}>
      <div className="crmedia" ref={box}>
        <video ref={vid} src={r.src} poster={r.poster} muted loop playsInline preload="none" aria-label={`${r.category}, ${r.format}`} />
        {r.ai && <span className="crbadge">{r.ai}</span>}
        <span className="crdur">{r.dur}</span>
        <button type="button" className={`crsound${started ? "" : " big"}`} onClick={toggle} aria-label={sound ? "Mute" : "Play with sound"} aria-pressed={sound}>
          {!started ? <Play /> : sound ? <Volume2 /> : <VolumeX />}
        </button>
      </div>
      <figcaption className="crcap"><b>{r.category}</b><span>{r.format}</span></figcaption>
    </Reveal>
  );
};

const Lightbox = ({ still, onClose }: { still: Still; onClose: () => void }) => {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    const back = document.activeElement as HTMLElement | null;
    close.current?.focus({ preventScroll: true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
      back?.focus?.({ preventScroll: true });
    };
  }, [onClose]);
  // portalled to <body>: the page wrapper keeps a transform from its entrance animation, which would
  // otherwise turn position:fixed into "fixed to the page" and put the image halfway down the document
  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${still.category}: ${still.concept}`} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={still.src} alt={`Static ad for a ${still.category.toLowerCase()} brand: ${still.concept}`} />
        <figcaption><b>{still.category}</b><span>{still.lane} · {still.concept}</span></figcaption>
      </figure>
      <button ref={close} type="button" className="lb-x" onClick={onClose} aria-label="Close"><X /></button>
    </div>,
    document.body,
  );
};

export const Creative = () => {
  const [open, setOpen] = useState<Still | null>(null);
  return (
    <section className="section creative" id="creative" aria-labelledby="cr-h">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal><span className="eyebrow">Creative</span></Reveal>
            <h2 id="cr-h" className="title" style={{ marginTop: 20 }}><Split text="AI video and *static ads.*" /></h2>
          </div>
          <Reveal delay={0.15}>
            <p className="lede">Paid social from the Creative AdBundance team, where I build the AI tools behind the concepts, scripts and edits. The badge says which part AI made. Tap any video for sound.</p>
          </Reveal>
        </div>

        <div className="crsub"><span className="eyebrow">01 · Made with AI</span><span className="small">AI-generated hooks, illustration and performers, cut for paid social</span></div>
        <div className="crgrid">{aiReels.map((r, i) => <ReelCard key={r.src} r={r} i={i} />)}</div>

        <div className="crsub"><span className="eyebrow">02 · Creator-led</span><span className="small">UGC, ASMR and explainers from the same team</span></div>
        <div className="crgrid">{moreReels.map((r, i) => <ReelCard key={r.src} r={r} i={i} />)}</div>

        <div className="crsub"><span className="eyebrow">03 · Statics</span><span className="small">One per brand, across DTC, B2B and ecommerce: tap any to see it full size</span></div>
        <div className="stgrid">
          {statics.map((s, i) => (
            <Reveal key={s.src} className="stcard" delay={i * 0.05}>
              <button type="button" onClick={() => setOpen(s)} data-cursor="view" aria-label={`Open the ${s.concept} static`}>
                <img src={s.src} alt={`Static ad for a ${s.category.toLowerCase()} brand: ${s.concept}`} loading="lazy" width={720} height={1280} />
              </button>
              <p className="crcap"><b>{s.category}</b><span>{s.lane} · {s.concept}</span></p>
            </Reveal>
          ))}
        </div>
      </div>
      {open && <Lightbox still={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

export const Brands = () => (
  <section className="section night brands-sec" id="brands" aria-labelledby="br-h">
    <div className="wrap">
      <div className="section-head">
        <div>
          <Reveal><span className="eyebrow">Brands we've made ads for</span></Reveal>
          <h2 id="br-h" className="title" style={{ marginTop: 20 }}><Split text="DTC, B2B and *ecommerce.*" /></h2>
        </div>
        <Reveal delay={0.15}>
          <p className="lede">A sample of the brands behind the ads above and the systems on this site. Listed by what they sell: client names stay with the client.</p>
        </Reveal>
      </div>
      <div className="brands">
        {brandLanes.map((b, k) => (
          <Reveal key={b.lane} className="blane" delay={k * 0.08}>
            <h3>{b.lane}</h3>
            <p className="bline">{b.line}</p>
            <ul>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
