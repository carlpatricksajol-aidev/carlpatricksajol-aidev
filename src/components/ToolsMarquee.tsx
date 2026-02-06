import { Workflow, Zap, Code, Webhook, MessageSquare, ShoppingCart, CheckSquare, Layout, Bot, Sparkles, FileText, Video, Database, Mail, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tools = [
  { name: "N8N", icon: Workflow },
  { name: "Zapier", icon: Zap },
  { name: "Make.com", icon: Code },
  { name: "APIs", icon: Code },
  { name: "Webhooks", icon: Webhook },
  { name: "HubSpot", icon: Database },
  { name: "ActiveCampaign", icon: Mail },
  { name: "Go High Level", icon: Database },
  { name: "Shopify", icon: ShoppingCart },
  { name: "Monday.com", icon: CheckSquare },
  { name: "Asana", icon: CheckSquare },
  { name: "Trello", icon: CheckSquare },
  { name: "WordPress", icon: Globe },
  { name: "Elementor", icon: Layout },
  { name: "Webflow", icon: Layout },
  { name: "ChatGPT", icon: Bot },
  { name: "Midjourney", icon: Sparkles },
  { name: "Slack", icon: MessageSquare },
  { name: "Notion", icon: FileText },
  { name: "Loom", icon: Video },
  { name: "Airtable", icon: Database },
  { name: "Google Workspace", icon: Mail },
  { name: "Google Sheets", icon: FileText },
  { name: "Sora", icon: Sparkles }
];

const ToolsMarquee = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`py-20 bg-background overflow-hidden border-y border-border relative animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-foreground/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">My Tech Stack</span>
          </div>
          
          <h2 className="text-5xl font-bold text-center text-foreground tracking-tight">
            Tools & <span className="text-gradient">Technologies</span>
          </h2>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
          {/* Duplicate the array twice for seamless loop */}
          {[...tools, ...tools].map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-4 glass-card rounded-xl text-foreground font-medium whitespace-nowrap hover:glow-effect transition-all duration-300 flex items-center gap-3"
              >
                <Icon className="h-5 w-5" />
                <span>{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
