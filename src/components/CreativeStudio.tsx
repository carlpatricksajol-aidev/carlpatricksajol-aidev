import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Layers, Clapperboard, ScanSearch, Rocket, ArrowUpRight } from "lucide-react";
import { creativeSystems, supportingSystems, type CreativeSystem } from "@/data/showcase";

const systemIcons = [Layers, Clapperboard, ScanSearch, Rocket];

const studioStats = [
  { value: "50", label: "Statics per batch run" },
  { value: "7h → 5m", label: "Video pre-production" },
  { value: "15", label: "Video concept formats" },
  { value: "7/10", label: "Vision-QA gate to ship" },
];

const CreativeStudio = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedSystem, setSelectedSystem] = useState<CreativeSystem | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(25px) scale(1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
  };

  return (
    <section
      id="creative-ai"
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? "visible" : ""}`}
    >
      {/* Higgsfield-generated studio backdrop: ambient loop with still fallback */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-40"
          src="/showcase/studio-loop.mp4"
          poster="/showcase/studio-hero.webp"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>

      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Creative AI Studio</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            The Creative AI <span className="text-gradient-animated">Studio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Beyond ops automation: production pipelines that make the ads themselves. Real client
            campaigns — statics, UGC-style video, and cinematic AI film — produced through
            systems I designed and shipped. Explore the actual deliverables below; this backdrop
            was generated and animated with Higgsfield by the same stack.
          </p>
        </div>

        {/* Studio stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
          {studioStats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center pulse-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-gradient-animated stat-glow mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Flagship systems */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto perspective-container">
          {creativeSystems.map((system, index) => {
            const Icon = systemIcons[index % systemIcons.length];
            return (
              <div
                key={system.title}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => setSelectedSystem(system)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSystem(system);
                  }
                }}
                aria-label={`View details: ${system.title}`}
                className="glass-card border-gradient-animated holo-shine rounded-2xl p-8 cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground/60"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                <div style={{ transform: "translateZ(40px)" }} className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div style={{ transform: "translateZ(25px)" }}>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{system.title}</h3>
                  <p className="text-sm font-medium text-foreground/60 mb-3">{system.tagline}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{system.description}</p>
                </div>
                <div style={{ transform: "translateZ(15px)" }} className="flex flex-wrap gap-2 mt-4">
                  {system.tools.slice(0, 3).map((tool) => (
                    <Badge key={tool} variant="secondary" className="bg-secondary/50 text-foreground/70">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting systems */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mt-10">
          {supportingSystems.map((s) => (
            <div key={s.name} className="glass rounded-full px-5 py-2.5 hover:glow-effect transition-shadow" title={s.detail}>
              <span className="text-sm font-medium text-foreground/80">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System detail dialog */}
      <Dialog open={!!selectedSystem} onOpenChange={(open) => !open && setSelectedSystem(null)}>
        <DialogContent className="glass-card max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedSystem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-foreground">{selectedSystem.title}</DialogTitle>
                <DialogDescription className="text-base text-foreground/60 font-medium">
                  {selectedSystem.tagline}
                </DialogDescription>
              </DialogHeader>
              <p className="text-muted-foreground leading-relaxed">{selectedSystem.description}</p>
              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">How it works</h4>
                <ul className="space-y-2">
                  {selectedSystem.keyFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl p-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-1">Outcome</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedSystem.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSystem.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="bg-secondary/50 text-foreground/70">
                    {tool}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreativeStudio;
