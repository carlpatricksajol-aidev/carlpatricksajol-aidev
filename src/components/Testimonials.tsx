import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Rj Villamer",
    role: "Lead Automation Specialist",
    company: "Your Automation Crew",
    quote: "Carl's expertise in automation workflows is exceptional. His ability to architect complex N8N systems and deliver scalable solutions has been invaluable to our team's success."
  },
  {
    name: "Aldren Azarcon",
    role: "GoHighLevel Specialist",
    company: "Your Automation Crew",
    quote: "Working with Carl on CRM integrations has been a pleasure. His deep understanding of GoHighLevel and ability to create seamless automations consistently exceeds expectations."
  },
  {
    name: "Mark Bahalla",
    role: "Automation & Voice AI Specialist",
    company: "Your Automation Crew",
    quote: "Carl brings innovation to every project. His work on AI agent systems and multi-platform integrations demonstrates both technical skill and creative problem-solving."
  },
  {
    name: "Markee Navarro",
    role: "Automation & Voice AI Specialist",
    company: "Your Automation Crew",
    quote: "The quality of Carl's automation solutions is outstanding. He combines technical excellence with a strong understanding of business needs to deliver impactful results."
  }
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="flex-shrink-0 w-full px-4">
    <div className="glass-card rounded-2xl p-8 h-full hover:glow-effect transition-all duration-300">
      <Quote className="h-8 w-8 text-foreground/30 mb-4" />
      <p className="text-foreground/80 mb-6 leading-relaxed text-lg italic">
        "{testimonial.quote}"
      </p>
      <div className="pt-4 border-t border-border/50">
        <p className="text-foreground font-semibold text-lg">{testimonial.name}</p>
        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
        <p className="text-muted-foreground text-sm">{testimonial.company}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />

      {/* Decorative lines */}
      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Testimonials</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            What People <span className="text-gradient-animated">Say</span>
          </h2>
        </div>
        
        {/* Vertical scrolling testimonials */}
        <div className="relative h-[600px] overflow-hidden max-w-3xl mx-auto">
          <div className="flex flex-col gap-6 animate-scroll-vertical">
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
        
        <p className="text-center mt-8 text-muted-foreground text-sm">
          Hover to pause • Scroll continues automatically
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
