import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrandIcon } from "@/components/BrandIcons";
import { PlayGlyph, SectionHeader, useEnter } from "@/components/primitives";
import { staticAds, videoAds } from "@/data/site";
import { sectionCopy } from "@/data/copy";
import LogoField from "@/components/LogoField";

/* Exactly one <video> is mounted at a time. Posters are hand-picked mid-clip
   frames, so the poster is crossfaded out on `playing` rather than hard-swapped. */
const VideoWall = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const cardRef = useRef<HTMLLIElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // remembers which card to hand focus back to when playback tears down
  const lastPlayed = useRef<number | null>(null);

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

  // Swapping the button for a <video> destroys the focused element, so focus has
  // to be moved deliberately — onto the player when it opens, and back onto the
  // originating card when it closes.
  useEffect(() => {
    setReady(false);
    if (playing !== null) {
      lastPlayed.current = playing;
      videoRef.current?.focus();
      return;
    }
    const back = lastPlayed.current;
    if (back === null) return;
    const btn = triggerRefs.current[back];
    // only pull focus back if it was lost to the unmount, never steal it
    if (btn && (document.activeElement === document.body || document.activeElement === null)) {
      btn.focus();
    }
    lastPlayed.current = null;
  }, [playing]);

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
                    ref={videoRef}
                    src={v.src}
                    poster={v.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                    aria-label={`${v.title} — ${v.format}`}
                    /* every settled state clears the overlay: if autoplay is
                       blocked or the file fails, a stuck poster would otherwise
                       cover the video AND its controls permanently */
                    onPlaying={() => setReady(true)}
                    onLoadedData={() => setReady(true)}
                    onError={() => setReady(true)}
                    onPause={() => setReady(true)}
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
                  ref={(el) => (triggerRefs.current[i] = el)}
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
                  {/* scrim must extend past the caption block, not stop short of
                      it, or the meta line sits on raw poster and fails contrast */}
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(11,13,16,.94) 0%, rgba(11,13,16,.88) 22%, rgba(11,13,16,.55) 40%, rgba(14,16,20,0) 62%)",
                    }}
                  />
                  <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[rgba(14,16,20,.62)] text-ink transition-colors duration-[160ms] group-hover:bg-[rgba(14,16,20,.85)]" style={{ border: "1px solid rgba(255,255,255,.22)" }}>
                    <PlayGlyph className="ml-0.5" />
                  </span>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 p-s3">
                    <span className="t-step--1 block font-medium text-ink">{v.title}</span>
                    <span className="t-step--2 mt-1 block text-ink-secondary">
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
  // The dialog is controlled and opened from a plain button rather than a
  // DialogTrigger, so Radix's triggerRef is null and its own focus-restore
  // no-ops. Focus has to be handed back explicitly or it lands on <body>.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const ad = open === null ? null : staticAds[open];

  return (
    <>
      <ul className="mt-s8 grid grid-cols-2 gap-s3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-s4">
        {staticAds.map((a, i) => (
          <li key={a.src}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="group block w-full text-left"
              aria-label={`View static ad: ${a.title}`}
            >
              {/* object-contain, not cover: two of these creatives are ~1:1 and
                  letterbox invisibly against the dark tile rather than being
                  side-cropped or padded with white. */}
              <span className="ink-tile block aspect-[9/16] bg-surface-ink-raised">
                <img
                  src={a.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
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
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
          className="max-w-[420px] gap-0 overflow-hidden border-0 bg-surface-ink-raised p-0 text-ink [&>button]:right-3 [&>button]:top-3 [&>button]:grid [&>button]:h-9 [&>button]:w-9 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-[rgba(11,13,16,.72)] [&>button]:!opacity-100 [&>button]:ring-1 [&>button]:ring-white/25"
        >
          {ad && (
            <>
              <img src={ad.src} alt={`Static ad: ${ad.title}`} className="w-full" />
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
              eyebrow={sectionCopy["creative-logos"].eyebrow}
              title={sectionCopy["creative-logos"].title}
              deck={sectionCopy["creative-logos"].deck}
            />
            <LogoField />
          </div>
        </section>

        <section id="video-wall" className="pb-s9" ref={video.ref}>
          <div className={video.className}>
            <SectionHeader
              split
              eyebrow={sectionCopy["creative-video"].eyebrow}
              title={sectionCopy["creative-video"].title}
              deck={sectionCopy["creative-video"].deck}
            />
            <VideoWall />
          </div>
        </section>

        <section id="static-wall" className="pb-s10" ref={statics.ref}>
          <div className={statics.className}>
            <SectionHeader
              split
              eyebrow={sectionCopy["creative-static"].eyebrow}
              title={sectionCopy["creative-static"].title}
              deck={sectionCopy["creative-static"].deck}
            />
            <StaticWall />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InkBand;
