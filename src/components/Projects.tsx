import { Badge } from "@/components/ui/badge";
import { Bot, Workflow, Zap, Database, Mail, Calendar, MessageSquare, ShoppingCart } from "lucide-react";

const projects = [
  {
    title: "AI SDR Agent",
    description: "Built an AI SDR Agent in N8N to classify replies, auto-respond, escalate via Slack, and sync updates into GHL CRM.",
    tools: ["N8N", "Go High Level", "Slack", "AI"],
    icon: Bot,
  },
  {
    title: "Systeme.io → GHL Automation",
    description: "Automated sales sync between Systeme.io and Go High Level, with contact routing by product and campaign management.",
    tools: ["N8N", "Systeme.io", "Go High Level"],
    icon: Workflow,
  },
  {
    title: "E-commerce UGC Automation",
    description: "Automated collection, classification, and distribution of user-generated content for online stores.",
    tools: ["Zapier", "Shopify", "AI Classification"],
    icon: ShoppingCart,
  },
  {
    title: "Email Scraper & Lead Gen",
    description: "Built N8N workflow to scrape business data from Google Maps and automatically feed qualified leads into GHL CRM.",
    tools: ["N8N", "Google Maps API", "Go High Level"],
    icon: Mail,
  },
  {
    title: "Google Calendar Availability",
    description: "Integrated Acuity Scheduling with Google Calendar and N8N to verify booking availability and sync event data in real-time.",
    tools: ["N8N", "Google Calendar", "Acuity"],
    icon: Calendar,
  },
  {
    title: "Website Chatbot Integration",
    description: "Created and embedded intelligent chatbot that handles FAQs, qualifies inbound leads, and routes to appropriate teams.",
    tools: ["Chatbot Platform", "Webhooks", "CRM"],
    icon: MessageSquare,
  },
  {
    title: "Dynamic Notion Dashboard",
    description: "Built a Notion CRM that automatically updates when a contact's opportunity stage changes in GHL, keeping teams in sync.",
    tools: ["N8N", "Notion", "Go High Level"],
    icon: Database,
  },
  {
    title: "Content Creation Automation",
    description: "Streamlined ideation-to-posting workflows with AI prompts, auto-scheduling, and multi-platform content distribution.",
    tools: ["Make.com", "AI Tools", "Social Media APIs"],
    icon: Zap,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
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
                className="group hover:translate-y-[-4px] transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
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
  );
};

export default Projects;
