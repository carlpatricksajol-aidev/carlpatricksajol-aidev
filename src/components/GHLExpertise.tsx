import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState } from "react";
import { 
  Users, 
  Rocket, 
  Target, 
  Bot, 
  Workflow, 
  Share2, 
  Settings, 
  Plug,
  Brain,
  Database,
  Mail,
  BarChart3
} from "lucide-react";

const ghlSkills = [
  {
    title: "Claude MCP Server Development",
    description: "Architected production Claude MCP servers connecting internal SDKs, databases, and attribution platforms directly to Claude for real-time AI-powered data querying.",
    highlight: "Live business data inside Slack conversations",
    icon: Brain
  },
  {
    title: "AI Agent Deployment",
    description: "Built and deployed specialist AI agents in Slack — User Strategist, UA Performance, and Creative Concept agents with custom system instructions and persistent context.",
    highlight: "Multi-agent autonomous operations",
    icon: Bot
  },
  {
    title: "HubSpot CRM Automation",
    description: "Full HubSpot setup: lead management, workflow automation, email campaigns, landing pages, forms, and custom reporting dashboards with pipeline visibility.",
    highlight: "End-to-end lead flows with zero manual handoffs",
    icon: Database
  },
  {
    title: "GHL Platform Expertise",
    description: "Built complete client onboarding workflows, AI-powered conversation agents, multi-channel automation sequences, and managed 20+ client accounts.",
    highlight: "Reduced manual onboarding tasks by 80%",
    icon: Settings
  },
  {
    title: "Lead Qualification Systems",
    description: "Real-time enrichment workflows pulling domain data, company size, industry, and LinkedIn details from external APIs for intelligent lead scoring and routing.",
    highlight: "Improved lead qualification speed by 85%",
    icon: Target
  },
  {
    title: "Claude Code Agent Systems",
    description: "Built autonomous multi-step agent infrastructure for campaign management, creator sourcing pipelines, and content operations with error recovery.",
    highlight: "Zero-supervision end-to-end workflows",
    icon: Workflow
  },
  {
    title: "Meta & TikTok Ad Automation",
    description: "Internal platform for bulk campaign operations, performance-based deletion workflows, UTM automation, and TikTok appeal automation increasing success rate by 40%.",
    highlight: "4-hour process reduced to 15 minutes",
    icon: Rocket
  },
  {
    title: "Database Architecture",
    description: "Designed internal database infrastructure from scratch in Supabase — creator profiles, campaign records, lead history, and engagement data with automated pipelines.",
    highlight: "Full lifecycle data management",
    icon: Database
  },
  {
    title: "Email Campaigns & Sequences",
    description: "Created HubSpot email campaigns and automated sequences covering lead nurture, re-engagement, post-sale onboarding, and event-triggered communications.",
    highlight: "Optimised for deliverability and open rates",
    icon: Mail
  },
  {
    title: "API & Cross-Platform Integration",
    description: "Connected CRM platforms with external tools via webhooks and APIs — bidirectional syncs with Notion, Google Sheets, Stripe, and custom databases.",
    highlight: "Unified data management across the stack",
    icon: Plug
  },
  {
    title: "Reporting & Analytics",
    description: "Real-time dashboards pulling from Meta API showing creative-level metrics, budget pacing, ROI calculations, and pipeline health — replaced manual reporting.",
    highlight: "Saving 10+ hours weekly on reporting",
    icon: BarChart3
  },
  {
    title: "Team & Contractor Management",
    description: "Hired, trained, and managed AI-capable support staff and contractors responsible for system maintenance, content operations, and prompt workflows.",
    highlight: "Process documentation & SOPs",
    icon: Users
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
              <span className="text-sm font-medium tracking-wide uppercase">Technical Expertise</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Skills & Capabilities
            </h2>
            
            <p className="text-xl text-background/70 max-w-3xl mx-auto leading-relaxed">
              Deep expertise across AI agent systems, CRM platforms, automation tools, and database architecture — 
              building end-to-end systems that eliminate manual processes and drive measurable results.
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
                { value: "90%", label: "Task Automation" },
                { value: "40%", label: "Appeal Success Rate" },
                { value: "24/7", label: "AI Agent Uptime" },
                { value: "85%", label: "Lead Qual Speed Boost" },
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
