import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.png";
import FlipWords from "@/components/FlipWords";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background hero-pattern pt-20">
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating geometric shapes */}
      <div className="absolute top-40 left-1/4 w-24 h-24 border border-border/30 rotate-45 animate-float-slow opacity-20" />
      <div className="absolute bottom-40 right-1/4 w-32 h-32 border border-border/30 rounded-full animate-float-medium opacity-20" />
      <div className="absolute top-1/2 left-10 w-16 h-16 border border-border/30 animate-float-fast opacity-20" />
      
      {/* Decorative vertical ring */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-32 h-64 border border-border/20 rounded-full animate-float opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium text-foreground/80">Automation Expert & AI Developer</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                Automate Your
                <span className="block text-gradient-animated overflow-visible" style={{ minHeight: '1.2em' }}>
                  <FlipWords words={["Business Growth", "Sales Pipeline", "Lead Generation", "Marketing Ops"]} />
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                I build scalable automation systems with N8N, Zapier, and Make.com that save you 
                1000+ hours and transform your operations into efficient, AI-powered workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-foreground hover:bg-foreground/90 text-background font-semibold group h-14 px-8 text-base glow-effect"
                >
                  Book a Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("projects-animated")}
                  className="border-2 border-border text-foreground hover:bg-muted/50 h-14 px-8 text-base glass"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View My Work
                </Button>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-foreground">50+</div>
                  <p className="text-sm text-muted-foreground">Automations Built</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">1000+</div>
                  <p className="text-sm text-muted-foreground">Hours Saved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">15+</div>
                  <p className="text-sm text-muted-foreground">Platforms</p>
                </div>
              </div>
            </div>

            {/* Right Column - Profile with glow effect */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Glow behind profile */}
                <div className="absolute inset-0 bg-foreground/10 rounded-full blur-3xl animate-glow" />
                
                {/* Profile image container */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full overflow-hidden glass-card glow-effect-strong">
                    <img 
                      src={profileImage} 
                      alt="Carl Patrick Sajol" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Fade effect overlay */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, transparent 50%, hsl(var(--background)) 100%)'
                    }}
                  />
                </div>

                {/* Floating badges around profile */}
                <div className="absolute -top-4 -right-4 glass-card rounded-lg px-4 py-2 animate-float-slow">
                  <span className="text-sm font-semibold text-foreground">N8N Expert</span>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card rounded-lg px-4 py-2 animate-float-medium">
                  <span className="text-sm font-semibold text-foreground">AI Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-border/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
