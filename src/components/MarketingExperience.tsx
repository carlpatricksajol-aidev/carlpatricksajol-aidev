import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState } from "react";
import { Briefcase, Bot, Globe, Megaphone, TrendingUp, Rocket } from "lucide-react";

const experiences = [
  {
    title: "AI Automation & Platform Manager",
    company: "Bumpy App",
    period: "Nov 2025 – Present",
    icon: Bot,
    responsibilities: [
      "Architected and deployed a production Claude MCP server connecting internal SDK, database, and Singular attribution platform to Claude",
      "Built Claude Code agent infrastructure for autonomous multi-step operations across campaign management and reporting",
      "Deployed specialist AI agents in Slack — User Strategist, UA Performance, and Creative Concept agents",
      "Automated Meta advertising suite: bulk uploads, performance-based deletion, campaign parameters, and analytics dashboard",
      "Built TikTok appeal automation increasing successful appeal rate by 40%"
    ]
  },
  {
    title: "AI Automation Specialist",
    company: "Creative Abundance",
    period: "Aug 2025 – Present",
    icon: Rocket,
    responsibilities: [
      "Designed fully autonomous content creator sourcing and contracting system using Claude Code — zero manual handoffs",
      "Built lead scraping & enrichment, onboarding automation, database processing, and proposal/payment workflows",
      "Set up HubSpot CRM from scratch — lead management, workflow automation, survey forms, and pipeline routing",
      "Architected internal database infrastructure in Supabase for creator lifecycle management"
    ]
  },
  {
    title: "Business Consultant – AI Automation",
    company: "White Key Marketing",
    period: "Aug 2024 – Present",
    icon: Globe,
    responsibilities: [
      "Managed end-to-end HubSpot CRM: lead flows, pipeline automation, email campaigns, landing pages, and reporting dashboards",
      "Built GHL client onboarding workflows reducing manual tasks by 80%",
      "Implemented AI-powered conversation agents for 24/7 lead engagement and appointment booking",
      "Architected Notion workspace managing 50+ client accounts with automated intake workflows"
    ]
  },
  {
    title: "Social Media Marketing Associate",
    company: "Actional Marketing",
    period: "Apr 2024 – Aug 2025",
    icon: TrendingUp,
    responsibilities: [
      "Developed and managed social media marketing strategies for multiple clients",
      "Executed content planning, copywriting, and B2B campaign messaging",
      "Conducted SEO audits and on-page optimization for search visibility",
      "Created campaigns across Facebook, Google, Instagram, TikTok, and YouTube"
    ]
  },
  {
    title: "Digital Marketing Specialist",
    company: "Business Connect World",
    period: "Jan 2024 – Feb 2025",
    icon: Megaphone,
    responsibilities: [
      "Implemented SEO strategies for Amazon product listings increasing discoverability by ~20%",
      "Conducted competitor and keyword research for optimization",
      "Monitored performance metrics and adjusted strategies for ROI"
    ]
  },
  {
    title: "Marketing Assistant / Paid Ads Support",
    company: "DreamTeam PH",
    period: "Feb 2023 – Mar 2024",
    icon: Briefcase,
    responsibilities: [
      "Managed and optimized Meta Ads campaigns for clients with weekly performance reports",
      "Adjusted targeting, creatives, and messaging based on performance insights",
      "Coordinated with internal teams and clients to implement revisions"
    ]
  }
];

const MarketingExperience = () => {
  const { ref, isVisible } = useScrollAnimation();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(25px) scale(1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
    setActiveCard(null);
  };

  return (
    <section
      id="marketing-experience"
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Decorative lines */}
      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Professional Background</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Professional <span className="text-gradient-animated">Experience</span>
            </h2>
            
            <p className="text-xl leading-relaxed text-foreground/80 max-w-4xl mx-auto">
              From digital marketing foundations to building production-grade AI automation systems 
              and managing platform infrastructure for growth companies.
            </p>
          </div>

          {/* 3D Experience Cards */}
          <div className="perspective-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className="group relative holo-shine"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="glass-card rounded-2xl p-8 h-full border-gradient-animated relative overflow-hidden">
                    {/* 3D light reflection */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                      style={{
                        background: activeCard === index 
                          ? 'radial-gradient(circle at 30% 20%, hsl(0 0% 100% / 0.06) 0%, transparent 50%)' 
                          : 'none',
                        opacity: activeCard === index ? 1 : 0,
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-foreground/10 transition-colors"
                          style={{ transform: 'translateZ(40px)' }}
                        >
                          <exp.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="flex-1" style={{ transform: 'translateZ(25px)' }}>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-foreground/70 font-medium">{exp.company}</p>
                          <p className="text-muted-foreground text-sm">{exp.period}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-3" style={{ transform: 'translateZ(15px)' }}>
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li 
                            key={respIndex}
                            className="flex items-start gap-3 text-foreground/80"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 mt-2 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats with 3D tilt */}
          <div className="perspective-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "80%", label: "Task Reduction" },
                { value: "20+", label: "Platforms Managed" },
                { value: "50+", label: "Clients & Accounts" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 text-center animate-tilt-3d depth-shadow" style={{ animationDelay: `${i * 0.7}s` }}>
                  <div className="text-4xl font-bold text-gradient-animated stat-glow mb-2">{stat.value}</div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingExperience;
