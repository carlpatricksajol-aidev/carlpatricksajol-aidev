import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FlipWords from "@/components/FlipWords";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* Decorative lines */}
      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Who I Am</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              About <span className="text-gradient-animated">
                <FlipWords words={["Me", "My Work", "My Craft"]} interval={3000} />
              </span>
            </h2>
          </div>
          
          <p className="text-xl leading-relaxed text-foreground/80 text-center animate-fade-in mb-16">
            AI Automation and Platform Manager with hands-on experience building production-grade{" "}
            <span className="font-semibold text-foreground">Claude MCP servers</span>,{" "}
            <span className="font-semibold">Claude Code agent systems</span>, and multi-agent pipelines deployed 
            operationally in Slack. Expert in{" "}
            <span className="font-semibold">HubSpot CRM workflows</span>, pipeline automation, lead qualification 
            systems, and CRM-integrated tooling. Proven builder of practical business systems — from lead scraping 
            and enrichment to proposal delivery, payment processing, and CRM storage — with{" "}
            <span className="font-semibold text-foreground">zero manual handoffs</span>.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card rounded-2xl p-8 text-center pulse-glow transition-all duration-300">
              <div className="text-5xl font-bold text-gradient-animated stat-glow mb-3">50+</div>
              <p className="text-muted-foreground text-lg">Automations Built</p>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center pulse-glow transition-all duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold text-gradient-animated stat-glow mb-3">20+</div>
              <p className="text-muted-foreground text-lg">Platforms Integrated</p>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center pulse-glow transition-all duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold text-gradient-animated stat-glow mb-3">1000+</div>
              <p className="text-muted-foreground text-lg">Hours Saved</p>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center pulse-glow transition-all duration-300" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold text-gradient-animated stat-glow mb-3">90%</div>
              <p className="text-muted-foreground text-lg">Task Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
