import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot, Workflow, Zap, Database, Mail, Calendar, MessageSquare, ShoppingCart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "AI SDR Agent",
    description: "Built an AI SDR Agent in N8N to classify replies, auto-respond, escalate via Slack, and sync updates into GHL CRM.",
    tools: ["N8N", "Go High Level", "Slack", "AI"],
    icon: Bot,
    overview: "An intelligent AI-powered Sales Development Representative that automatically handles email responses, classifies leads, and manages CRM updates.",
    keyFeatures: [
      "Automated email response classification",
      "Smart reply generation based on context",
      "Real-time Slack escalation for high-priority leads",
      "Seamless GHL CRM synchronization"
    ],
    outcome: "Reduced response time by 80% and improved lead engagement rates, allowing the sales team to focus on high-value conversations while the AI handles routine interactions."
  },
  {
    title: "Systeme.io → GHL Automation",
    description: "Automated sales sync between Systeme.io and Go High Level, with contact routing by product and campaign management.",
    tools: ["N8N", "Systeme.io", "Go High Level"],
    icon: Workflow,
    overview: "A comprehensive automation solution that bridges Systeme.io and Go High Level, ensuring seamless data flow and intelligent contact management.",
    keyFeatures: [
      "Real-time sales data synchronization",
      "Product-based contact routing",
      "Automated campaign assignment",
      "Custom field mapping between platforms"
    ],
    outcome: "Eliminated manual data entry completely, reduced contact import time from hours to seconds, and enabled better campaign targeting through automated product-based segmentation."
  },
  {
    title: "E-commerce UGC Automation",
    description: "Automated collection, classification, and distribution of user-generated content for online stores.",
    tools: ["Zapier", "Shopify", "AI Classification"],
    icon: ShoppingCart,
    overview: "An intelligent system that automatically gathers, organizes, and leverages user-generated content to boost e-commerce engagement and sales.",
    keyFeatures: [
      "Automated UGC collection from multiple sources",
      "AI-powered content quality assessment",
      "Smart categorization and tagging",
      "Automated social media distribution"
    ],
    outcome: "Increased customer engagement by 150%, reduced content moderation time by 70%, and boosted conversion rates by showcasing authentic customer experiences."
  },
  {
    title: "Email Scraper & Lead Gen",
    description: "Built N8N workflow to scrape business data from Google Maps and automatically feed qualified leads into GHL CRM.",
    tools: ["N8N", "Google Maps API", "Go High Level"],
    icon: Mail,
    overview: "A powerful lead generation system that automatically extracts business information from Google Maps and populates your CRM with qualified prospects.",
    keyFeatures: [
      "Automated Google Maps data extraction",
      "Lead qualification filters",
      "Duplicate detection and prevention",
      "Direct CRM integration with enriched data"
    ],
    outcome: "Generated 500+ qualified leads per week with 95% accuracy, saving 30+ hours of manual research time and significantly expanding the sales pipeline."
  },
  {
    title: "Google Calendar Availability",
    description: "Integrated Acuity Scheduling with Google Calendar and N8N to verify booking availability and sync event data in real-time.",
    tools: ["N8N", "Google Calendar", "Acuity"],
    icon: Calendar,
    overview: "A sophisticated scheduling system that ensures perfect calendar synchronization across multiple platforms and prevents double-bookings.",
    keyFeatures: [
      "Real-time availability checking",
      "Bi-directional calendar sync",
      "Conflict prevention and resolution",
      "Automated reminder scheduling"
    ],
    outcome: "Eliminated double-bookings completely, reduced scheduling conflicts by 100%, and improved customer satisfaction with reliable appointment management."
  },
  {
    title: "Website Chatbot Integration",
    description: "Created and embedded intelligent chatbot that handles FAQs, qualifies inbound leads, and routes to appropriate teams.",
    tools: ["Chatbot Platform", "Webhooks", "CRM"],
    icon: MessageSquare,
    overview: "An AI-powered chatbot solution that provides instant customer support, qualifies leads 24/7, and seamlessly hands off to human agents when needed.",
    keyFeatures: [
      "Natural language understanding",
      "Lead qualification scoring",
      "Smart team routing",
      "CRM integration for lead tracking"
    ],
    outcome: "Handled 70% of customer inquiries automatically, increased lead capture by 45%, and provided 24/7 support without additional staffing costs."
  },
  {
    title: "Dynamic Notion Dashboard",
    description: "Built a Notion CRM that automatically updates when a contact's opportunity stage changes in GHL, keeping teams in sync.",
    tools: ["N8N", "Notion", "Go High Level"],
    icon: Database,
    overview: "A real-time synchronized dashboard that keeps your Notion workspace perfectly aligned with your GHL CRM data for unified team collaboration.",
    keyFeatures: [
      "Real-time bi-directional sync",
      "Custom database structure",
      "Automated status updates",
      "Team collaboration features"
    ],
    outcome: "Improved team alignment by 90%, reduced data discrepancies to zero, and enabled project managers to track deals without leaving Notion."
  },
  {
    title: "Content Creation Automation",
    description: "Streamlined ideation-to-posting workflows with AI prompts, auto-scheduling, and multi-platform content distribution.",
    tools: ["Make.com", "AI Tools", "Social Media APIs"],
    icon: Zap,
    overview: "An end-to-end content creation system that generates, optimizes, and distributes social media content across multiple platforms automatically.",
    keyFeatures: [
      "AI-powered content generation",
      "Multi-platform scheduling",
      "Automated posting workflows",
      "Performance tracking integration"
    ],
    outcome: "Reduced content creation time by 75%, maintained consistent posting schedule across 5 platforms, and increased social media engagement by 200%."
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
    <section 
      id="projects" 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
      </div>

      {/* Floating hexagons */}
      <div className="absolute top-32 right-1/3 w-28 h-28 border border-border animate-float-slow opacity-10" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)" }} />
      <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-border animate-float-medium opacity-10" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)" }} />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      
      {/* Vertical text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          Featured Work
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-20 text-center text-foreground tracking-tight">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                className="group hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-foreground group-hover:text-muted-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-border text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Project Details Dialog */}
    <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
        {selectedProject && (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                {(() => {
                  const Icon = selectedProject.icon;
                  return <Icon className="h-8 w-8" />;
                })()}
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-foreground/80">
                {selectedProject.overview}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Tools Used */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 border border-border text-foreground bg-muted/30 text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-foreground mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Outcome</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Projects;
