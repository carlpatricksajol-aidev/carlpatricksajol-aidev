import { Card } from "@/components/ui/card";
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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
