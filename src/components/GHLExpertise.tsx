import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
    description: "Designed and deployed high-converting sales funnels with multi-step opt-ins, order bumps, upsells, and abandoned cart recovery. Integrated payment processors and CRM for seamless data flow.",
    highlight: "High-converting sales funnels",
    icon: Rocket
  },
  {
    title: "Lead Qualification Automation",
    description: "Created intelligent lead scoring and routing systems using GHL workflows. Automated qualification based on engagement, form responses, and behavioral triggers.",
    highlight: "Hot leads reach sales teams within minutes",
    icon: Target
  },
  {
    title: "AI Agent Integration",
    description: "Implemented AI-powered conversation agents inside GHL for automated lead engagement, FAQ responses, appointment booking, and 24/7 customer support.",
    highlight: "Integrated with OpenAI for intelligent responses",
    icon: Bot
  },
  {
    title: "Marketing Automation Workflows",
    description: "Built complex multi-channel automation sequences combining email, SMS, voicemail drops, and task assignments. Created nurture campaigns, re-engagement flows, and event-triggered communications.",
    highlight: "Multi-channel automation sequences",
    icon: Workflow
  },
  {
    title: "Social Media Bulk Upload",
    description: "Leveraged GHL's Social Media Posting app to bulk upload and schedule creative content across Facebook, Instagram, LinkedIn, and Google My Business.",
    highlight: "Streamlined content for 20+ client accounts",
    icon: Share2
  },
  {
    title: "CRM Customization",
    description: "Configured custom fields, pipelines, and opportunity stages tailored to client business models. Built custom reporting dashboards tracking KPIs, conversion rates, and revenue attribution.",
    highlight: "Custom reporting dashboards",
    icon: Settings
  },
  {
    title: "Integration & API Development",
    description: "Connected GHL with external platforms via webhooks and API calls. Built bidirectional syncs with Notion, Google Sheets, Stripe, and custom databases for unified data management.",
    highlight: "Bidirectional syncs with external platforms",
    icon: Plug
  }
];

const GHLExpertise = () => {
  const { ref, isVisible } = useScrollAnimation();

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
              that drive growth, streamline operations, and deliver measurable results for businesses.
            </p>
          </div>

          {/* Skills Grid - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ghlSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-background/5 border border-background/10 hover:bg-background/10 hover:border-background/30 transition-all duration-300 rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 p-3 bg-background/10 rounded-xl w-fit group-hover:bg-background/20 transition-colors">
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-background">
                    {skill.title}
                  </h3>
                  
                  <p className="text-background/60 text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>
                  
                  <div className="pt-4 border-t border-background/10">
                    <span className="text-sm font-semibold text-background/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-background rounded-full" />
                      {skill.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="mt-16 pt-16 border-t border-background/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">80%</div>
                <p className="text-background/60 text-sm">Task Reduction</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                <p className="text-background/60 text-sm">Client Accounts</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <p className="text-background/60 text-sm">AI Support</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <p className="text-background/60 text-sm">Workflow Automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLExpertise;
