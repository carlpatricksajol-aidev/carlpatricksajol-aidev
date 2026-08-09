import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { videoAds } from "@/data/showcase";

const VideoAdsShowcase = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const playingCardRef = useRef<HTMLDivElement | null>(null);

  // Stop playback (and its audio) once the playing card scrolls out of view
  useEffect(() => {
    if (playingIndex === null || !playingCardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setPlayingIndex(null);
      },
      { threshold: 0.3 }
    );
    observer.observe(playingCardRef.current);
    return () => observer.disconnect();
  }, [playingIndex]);

  const scrollRail = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <section
      id="video-ads"
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? "visible" : ""}`}
    >
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">AI Video Ads</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Video Ads, <span className="text-gradient-animated">Produced</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Finished ad videos from the production stack — UGC skits, street interviews and
            rapid-fire cuts alongside Higgsfield cinematic and stylized animation concepts.
            Delivered concepts ship as multi-hook, multi-aspect render sets. Press play.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollRail(-1)}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass rounded-full items-center justify-center hover:glow-effect transition-shadow"
            aria-label="Scroll videos left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scrollRail(1)}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass rounded-full items-center justify-center hover:glow-effect transition-shadow"
            aria-label="Scroll videos right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <div
            ref={railRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin]"
          >
            {videoAds.map((video, index) => (
              <div
                key={video.src}
                ref={playingIndex === index ? playingCardRef : undefined}
                className="w-64 sm:w-72 shrink-0 snap-center"
              >
                <div className="glass-card rounded-3xl p-2 depth-shadow hover:glow-effect transition-shadow duration-300">
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-secondary/30">
                    {playingIndex === index ? (
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        autoPlay
                        playsInline
                        onEnded={() => setPlayingIndex(null)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <button
                        onClick={() => setPlayingIndex(index)}
                        className="group w-full h-full relative text-left"
                        aria-label={`Play video: ${video.title}`}
                      >
                        <img
                          src={video.poster}
                          alt={`${video.client} video ad — ${video.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 glass rounded-full flex items-center justify-center group-hover:scale-110 group-hover:glow-effect transition-all duration-300">
                            <Play className="w-7 h-7 text-foreground ml-1" fill="currentColor" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 glass rounded-full px-3 py-1">
                          <span className="text-xs font-medium text-foreground/90">{video.duration}</span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="text-sm font-bold text-foreground leading-snug">{video.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{video.format}</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Scroll for more · Concepted, produced, and assembled by the AI pipeline — from creator footage to fully AI-generated scenes
        </p>
      </div>
    </section>
  );
};

export default VideoAdsShowcase;
