import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";
import { 
  Users, 
  Rocket, 
  Target, 
  Bot, 
  Workflow, 
  Share2, 
  Settings, 
  Plug 
} from "lucide-react";

const ghlSkills = [
  {
    title: "Client Onboarding Systems",
    description: "Built complete onboarding workflows in GHL including form submissions, automated welcome sequences, document collection, and account setup automation.",
    highlight: "Reduced manual onboarding tasks by 80%",
    icon: Users
  },
  {
    title: "Funnel Building & Optimization",
    description: "Designed and deployed high-converting sales funnels with multi-step opt-ins, order bumps, upsells, and abandoned cart recovery.",
    highlight: "High-converting sales funnels",
    icon: Rocket
  },
  {
    title: "Lead Qualification Automation",
    description: "Created intelligent lead scoring and routing systems using GHL workflows. Automated qualification based on engagement and behavioral triggers.",
    highlight: "Hot leads reach sales teams within minutes",
    icon: Target
  },
  {
    title: "AI Agent Integration",
    description: "Implemented AI-powered conversation agents inside GHL for automated lead engagement, FAQ responses, and appointment booking.",
    highlight: "Integrated with OpenAI for intelligent responses",
    icon: Bot
  },
  {
    title: "Marketing Automation Workflows",
    description: "Built complex multi-channel automation sequences combining email, SMS, voicemail drops, and task assignments.",
    highlight: "Multi-channel automation sequences",
    icon: Workflow
  },
  {
    title: "Social Media Bulk Upload",
    description: "Leveraged GHL's Social Media Posting app to bulk upload and schedule creative content across multiple platforms.",
    highlight: "Streamlined content for 20+ client accounts",
    icon: Share2
  },
  {
    title: "CRM Customization",
    description: "Configured custom fields, pipelines, and opportunity stages tailored to client business models with custom reporting dashboards.",
    highlight: "Custom reporting dashboards",
    icon: Settings
  },
  {
    title: "Integration & API Development",
    description: "Connected GHL with external platforms via webhooks and API calls. Built bidirectional syncs with Notion, Sheets, Stripe.",
    highlight: "Bidirectional syncs with external platforms",
    icon: Plug
  }
];

const GHLExpertise = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(20px) scale(1.03)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    setHoveredIndex(null);
  };

  return (
    <section
      id="ghl-expertise"
      ref={ref}
      className={`py-32 bg-foreground text-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, hsl(var(--background)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--background)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-background/10 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-background/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-background/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-background rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">Platform Expertise</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Go High Level
            </h2>
            
            <p className="text-xl text-background/70 max-w-3xl mx-auto leading-relaxed">
              Deep expertise in leveraging GoHighLevel's full suite of tools to build automated systems 
              that drive growth, streamline operations, and deliver measurable results.
            </p>
          </div>

          {/* 3D Skills Grid */}
          <div className="perspective-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ghlSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className="group relative rounded-2xl overflow-hidden holo-shine"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
                    }}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <div className="relative p-6 bg-background/5 border border-background/10 hover:border-background/30 transition-all duration-300 rounded-2xl h-full"
                      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                    >
                      {/* Depth light reflection */}
                      <div 
                        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                        style={{
                          background: hoveredIndex === index 
                            ? 'radial-gradient(circle at 50% 0%, hsl(0 0% 100% / 0.08) 0%, transparent 60%)' 
                            : 'none',
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      />

                      <div className="relative z-10">
                        <div className="mb-4 p-3 bg-background/10 rounded-xl w-fit group-hover:bg-background/20 transition-colors"
                          style={{ transform: 'translateZ(30px)' }}
                        >
                          <Icon className="w-6 h-6 text-background" />
                        </div>
                        
                        <h3 className="text-lg font-bold mb-3 text-background" style={{ transform: 'translateZ(20px)' }}>
                          {skill.title}
                        </h3>
                        
                        <p className="text-background/60 text-sm leading-relaxed mb-4" style={{ transform: 'translateZ(10px)' }}>
                          {skill.description}
                        </p>
                        
                        <div className="pt-4 border-t border-background/10" style={{ transform: 'translateZ(15px)' }}>
                          <span className="text-sm font-semibold text-background/90 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-background rounded-full" />
                            {skill.highlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Bar with 3D */}
          <div className="mt-16 pt-16 border-t border-background/10 perspective-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "80%", label: "Task Reduction" },
                { value: "20+", label: "Client Accounts" },
                { value: "24/7", label: "AI Support" },
                { value: "100%", label: "Workflow Automation" },
              ].map((stat, i) => (
                <div key={i} className="animate-tilt-3d" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2 stat-glow">{stat.value}</div>
                  <p className="text-background/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLExpertise;
