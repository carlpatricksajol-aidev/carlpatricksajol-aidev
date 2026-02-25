import { useState, useRef } from "react";
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
    keyFeatures: ["Automated email response classification", "Smart reply generation based on context", "Real-time Slack escalation for high-priority leads", "Seamless GHL CRM synchronization"],
    outcome: "Reduced response time by 80% and improved lead engagement rates, allowing the sales team to focus on high-value conversations while the AI handles routine interactions."
  },
  {
    title: "Systeme.io → GHL Automation",
    description: "Automated sales sync between Systeme.io and Go High Level, with contact routing by product and campaign management.",
    tools: ["N8N", "Systeme.io", "Go High Level"],
    icon: Workflow,
    overview: "A comprehensive automation solution that bridges Systeme.io and Go High Level, ensuring seamless data flow and intelligent contact management.",
    keyFeatures: ["Real-time sales data synchronization", "Product-based contact routing", "Automated campaign assignment", "Custom field mapping between platforms"],
    outcome: "Eliminated manual data entry completely, reduced contact import time from hours to seconds, and enabled better campaign targeting."
  },
  {
    title: "E-commerce UGC Automation",
    description: "Automated collection, classification, and distribution of user-generated content for online stores.",
    tools: ["Zapier", "Shopify", "AI Classification"],
    icon: ShoppingCart,
    overview: "An intelligent system that automatically gathers, organizes, and leverages user-generated content to boost e-commerce engagement and sales.",
    keyFeatures: ["Automated UGC collection from multiple sources", "AI-powered content quality assessment", "Smart categorization and tagging", "Automated social media distribution"],
    outcome: "Increased customer engagement by 150%, reduced content moderation time by 70%, and boosted conversion rates."
  },
  {
    title: "Email Scraper & Lead Gen",
    description: "Built N8N workflow to scrape business data from Google Maps and automatically feed qualified leads into GHL CRM.",
    tools: ["N8N", "Google Maps API", "Go High Level"],
    icon: Mail,
    overview: "A powerful lead generation system that automatically extracts business information from Google Maps and populates your CRM with qualified prospects.",
    keyFeatures: ["Automated Google Maps data extraction", "Lead qualification filters", "Duplicate detection and prevention", "Direct CRM integration with enriched data"],
    outcome: "Generated 500+ qualified leads per week with 95% accuracy, saving 30+ hours of manual research time."
  },
  {
    title: "Google Calendar Availability",
    description: "Integrated Acuity Scheduling with Google Calendar and N8N to verify booking availability and sync event data in real-time.",
    tools: ["N8N", "Google Calendar", "Acuity"],
    icon: Calendar,
    overview: "A sophisticated scheduling system that ensures perfect calendar synchronization across multiple platforms and prevents double-bookings.",
    keyFeatures: ["Real-time availability checking", "Bi-directional calendar sync", "Conflict prevention and resolution", "Automated reminder scheduling"],
    outcome: "Eliminated double-bookings completely, reduced scheduling conflicts by 100%, and improved customer satisfaction."
  },
  {
    title: "Website Chatbot Integration",
    description: "Created and embedded intelligent chatbot that handles FAQs, qualifies inbound leads, and routes to appropriate teams.",
    tools: ["Chatbot Platform", "Webhooks", "CRM"],
    icon: MessageSquare,
    overview: "An AI-powered chatbot solution that provides instant customer support, qualifies leads 24/7, and seamlessly hands off to human agents.",
    keyFeatures: ["Natural language understanding", "Lead qualification scoring", "Smart team routing", "CRM integration for lead tracking"],
    outcome: "Handled 70% of customer inquiries automatically, increased lead capture by 45%, and provided 24/7 support."
  },
  {
    title: "Dynamic Notion Dashboard",
    description: "Built a Notion CRM that automatically updates when a contact's opportunity stage changes in GHL, keeping teams in sync.",
    tools: ["N8N", "Notion", "Go High Level"],
    icon: Database,
    overview: "A real-time synchronized dashboard that keeps your Notion workspace perfectly aligned with your GHL CRM data.",
    keyFeatures: ["Real-time bi-directional sync", "Custom database structure", "Automated status updates", "Team collaboration features"],
    outcome: "Improved team alignment by 90%, reduced data discrepancies to zero, and enabled project managers to track deals without leaving Notion."
  },
  {
    title: "Content Creation Automation",
    description: "Streamlined ideation-to-posting workflows with AI prompts, auto-scheduling, and multi-platform content distribution.",
    tools: ["Make.com", "AI Tools", "Social Media APIs"],
    icon: Zap,
    overview: "An end-to-end content creation system that generates, optimizes, and distributes social media content across multiple platforms automatically.",
    keyFeatures: ["AI-powered content generation", "Multi-platform scheduling", "Automated posting workflows", "Performance tracking integration"],
    outcome: "Reduced content creation time by 75%, maintained consistent posting schedule across 5 platforms, and increased engagement by 200%."
  },
];

// Duplicate for infinite scroll
const doubledProjects = [...projects, ...projects];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(30px) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0) scale(1)';
  };

  return (
    <>
    <section 
      id="projects" 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="section-glow-line section-glow-line--top" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">What I've Built</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Featured <span className="text-gradient-animated">Projects</span>
          </h2>
        </div>
      </div>
      
      {/* Running 3D Marquee */}
      <div className="relative overflow-hidden py-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 animate-run-3d" style={{ width: 'max-content' }}>
          {doubledProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                ref={el => cardRefs.current[index] = el}
                className="group cursor-pointer flex-shrink-0 w-[320px] holo-shine"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
                }}
                onClick={() => setSelectedProject(project)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="glass-card rounded-2xl p-6 h-full border-gradient-animated relative overflow-hidden depth-shadow">
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground" style={{ transform: 'translateZ(25px)' }}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3" style={{ transform: 'translateZ(15px)' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(20px)' }}>
                      {project.tools.slice(0, 2).map((tool, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="border-border/50 text-muted-foreground text-xs"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Project Details Dialog */}
    <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto glass-card border-border rounded-2xl">
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
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, idx) => (
                    <span key={idx} className="px-4 py-2 glass rounded-lg text-foreground text-sm font-medium">{tool}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Outcome</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.outcome}</p>
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
