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
  <div className="flex-shrink-0 w-full md:w-[500px] px-4">
    <div className="relative p-8 border border-border hover:border-foreground/30 transition-colors duration-300 h-full bg-background">
      <Quote className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
      <p className="text-muted-foreground mb-6 leading-relaxed italic">
        "{testimonial.quote}"
      </p>
      <div className="pt-4 border-t border-border">
        <p className="text-foreground font-semibold text-lg">{testimonial.name}</p>
        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
        <p className="text-muted-foreground text-sm">{testimonial.company}</p>
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-border"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-border"></div>
    </div>
  </div>
);

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--border)) 0px, hsl(var(--border)) 1px, transparent 1px, transparent 20px)",
        }} />
      </div>

      {/* Floating quote marks */}
      <div className="absolute top-32 left-20 opacity-10">
        <Quote className="h-32 w-32 text-foreground" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-10 rotate-180">
        <Quote className="h-32 w-32 text-foreground" />
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
      
      {/* Vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          Testimonials
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-bold mb-20 text-center text-foreground tracking-tight">
          What People Say
        </h2>
        
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
