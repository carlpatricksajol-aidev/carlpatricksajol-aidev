import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import profileImage from "@/assets/profile.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative vertical line */}
      <div className="absolute left-20 top-0 bottom-0 w-px bg-border"></div>
      
      {/* Decorative vertical ring */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-32 h-64 border border-border rounded-full"></div>
      
      {/* Vertical text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          Automation Specialist
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Profile image with fade effect */}
          <div className="relative w-64 h-64 mx-auto mb-12">
            <div className="absolute inset-0">
              <img 
                src={profileImage} 
                alt="Carl Patrick Sajol" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, transparent 40%, hsl(var(--background)) 100%)'
              }}
            ></div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 text-foreground tracking-tight">
            Carl Patrick Sajol
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 text-foreground/80">
            Automation Specialist & AI Developer
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Building scalable no-code systems with N8N • Zapier • Make.com
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-foreground hover:bg-foreground/90 text-background font-semibold group"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("projects")}
              className="border-2 border-border text-foreground hover:bg-muted"
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
