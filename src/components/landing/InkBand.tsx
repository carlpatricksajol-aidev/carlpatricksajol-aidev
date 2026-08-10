import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrandIcon } from "@/components/BrandIcons";
import { PlayGlyph, SectionHeader, useEnter } from "@/components/primitives";
import { platformField, staticAds, videoAds } from "@/data/site";

/* Non-harmonic periods so the field never visibly re-synchronises. */
const DUR = [9.1, 10.3, 11.7, 12.9, 13.3, 14.1];

const LogoField = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`logo-field mt-s8 ${live ? "is-live" : ""}`}>
      <h3 className="sr-only-heading">Platforms in the production line</h3>
      <ul className="grid grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-12">
        {platformField.map((p, i) => (
          <li
            key={p.name}
            className="drift-cell grid h-7 place-items-center"
            style={
              {
                "--dx": `${(i % 3) - 1}px`,
                "--dy": `${((i % 4) - 1.5) * 3}px`,
                "--dur": `${DUR[i % DUR.length]}s`,
                "--delay": `${(i % 5) * 0.8}s`,
              } as React.CSSProperties
            }
          >
            <span className="sr-only-heading">{p.name}</span>
            {p.key ? (
              <BrandIcon
                name={p.key}
                size={22}
                className="text-ink-secondary transition-colors duration-[160ms] hover:text-ink"
              />
            ) : (
              <span
                className="whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-medium text-ink-secondary transition-colors duration-[160ms] hover:text-ink"
                style={{ border: "1px solid rgba(255,255,255,.16)", letterSpacing: "0.01em" }}
              >
                {p.word}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Exactly one <video> is mounted at a time. Posters are hand-picked mid-clip
   frames, so the poster is crossfaded out on `playing` rather than hard-swapped. */
const VideoWall = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const cardRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (playing === null || !cardRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setPlaying(null);
      },
      { threshold: 0.3 }
    );
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [playing]);

  useEffect(() => setReady(false), [playing]);

  return (
    <ul className="mt-s8 grid grid-cols-2 gap-s4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-s5">
      {videoAds.map((v, i) => {
        const isPlaying = playing === i;
        return (
          <li key={v.src} ref={isPlaying ? cardRef : undefined} className="relative">
            <div className="ink-tile relative aspect-[9/16] bg-surface-ink-raised">
              {isPlaying ? (
                <>
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    onPlaying={() => setReady(true)}
                    onEnded={() => setPlaying(null)}
                    className="h-full w-full object-cover"
                  />
                  {!ready && (
                    <img
                      src={v.poster}
                      alt=""
                      aria-hidden="true"
                      className="crossfade pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-180"
                    />
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(i)}
                  className="group absolute inset-0 h-full w-full text-left"
                  aria-label={`Play ${v.title}, ${v.duration}`}
                >
                  <img
                    src={v.poster}
                    alt=""
                    width={720}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(14,16,20,.82) 0%, rgba(14,16,20,0) 46%)" }}
                  />
                  <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[rgba(14,16,20,.62)] text-ink transition-colors duration-[160ms] group-hover:bg-[rgba(14,16,20,.85)]" style={{ border: "1px solid rgba(255,255,255,.22)" }}>
                    <PlayGlyph className="ml-0.5" />
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-s3">
                    <span className="t-step--1 block font-medium text-ink">{v.title}</span>
                    <span className="t-step--2 mt-1 block text-ink-tertiary">
                      {v.format} · {v.duration}
                    </span>
                  </span>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const StaticWall = () => {
  const [open, setOpen] = useState<number | null>(null);
  const ad = open === null ? null : staticAds[open];

  return (
    <>
      <ul className="mt-s8 grid grid-cols-2 gap-s3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-s4">
        {staticAds.map((a, i) => (
          <li key={a.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={`View static ad: ${a.title}`}
            >
              <span className="ink-tile block aspect-[9/16] bg-surface-ink-raised">
                <img
                  src={a.src}
                  alt=""
                  width={900}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="t-step--2 mt-s3 block text-ink-tertiary transition-colors duration-120 group-hover:text-ink-secondary">
                {a.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          data-tone="ink"
          className="max-w-[420px] gap-0 overflow-hidden border-0 bg-surface-ink-raised p-0 text-ink"
        >
          {ad && (
            <>
              <img src={ad.src} alt={`Static ad: ${ad.title}`} width={900} height={1600} className="w-full" />
              <div className="p-s5">
                <DialogTitle className="t-step-2 text-ink">{ad.title}</DialogTitle>
                <DialogDescription className="t-step--1 mt-s2 text-ink-tertiary">{ad.concept}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

/** One continuous dark region. The page flips tone exactly once and flips back —
 *  alternating light/dark sections reads as zebra striping, not as a chapter. */
const InkBand = () => {
  const logo = useEnter<HTMLDivElement>();
  const video = useEnter<HTMLDivElement>();
  const statics = useEnter<HTMLDivElement>();

  return (
    <div data-tone="ink" className="gallery-contain bg-surface-ink text-ink">
      <div className="w-shell gutter">
        {/* chapter opener */}
        <section id="logo-field" className="section" ref={logo.ref}>
          <div className={logo.className}>
            <SectionHeader
              split
              eyebrow="Creative AI production"
              title="One production line, wired end to end"
              deck="Models, automation and channels connected into a single pipeline that concepts, generates, quality-gates and delivers finished ad creative."
            />
            <LogoField />
          </div>
        </section>

        <section id="video-wall" className="pb-s9" ref={video.ref}>
          <div className={video.className}>
            <SectionHeader
              split
              eyebrow="Video"
              title="Ads produced through the pipeline"
              deck="Finished client work. Press play — nothing loads until you do."
            />
            <VideoWall />
          </div>
        </section>

        <section id="static-wall" className="pb-s10" ref={statics.ref}>
          <div className={statics.className}>
            <SectionHeader
              split
              eyebrow="Static"
              title="One batch, eleven concepts"
              deck="Every one of these cleared the 7/10 vision-QA gate. The ones that didn't were dropped, not delivered."
            />
            <StaticWall />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InkBand;
