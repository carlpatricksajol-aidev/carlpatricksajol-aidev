import { CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {/* Animated diagonal lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-border animate-pulse"
            style={{
              width: "200%",
              top: `${i * 10}%`,
              left: "-50%",
              transform: "rotate(-15deg)",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating circles */}
      <div className="absolute top-20 right-1/4 w-40 h-40 border border-border rounded-full animate-float-slow opacity-10" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-border rounded-full animate-float-medium opacity-10" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
      
      {/* Vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          About Me
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-foreground tracking-tight">
            About Me
          </h2>
          
          <p className="text-xl leading-relaxed text-foreground/90 text-center animate-fade-in mb-20">
            Tech-driven <span className="font-semibold text-foreground">Automation Specialist</span> with expertise in{" "}
            <span className="font-semibold">N8N, Zapier, and Make.com</span>, building scalable no-code systems 
            that streamline sales, CRM, and marketing operations. Skilled in integrating{" "}
            <span className="font-semibold">HubSpot, Go High Level, Systeme.io, Shopify, and WordPress</span>, 
            with a strong focus on AI-driven sales workflows and process automation that save time, reduce errors, 
            and increase team efficiency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="text-6xl font-bold text-foreground mb-3">50+</div>
              <p className="text-muted-foreground text-lg">Automations Built</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl font-bold text-foreground mb-3">15+</div>
              <p className="text-muted-foreground text-lg">Platforms Integrated</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl font-bold text-foreground mb-3">1000+</div>
              <p className="text-muted-foreground text-lg">Hours Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
