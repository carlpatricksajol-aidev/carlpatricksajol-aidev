import { Workflow, Zap, Code, Webhook, MessageSquare, ShoppingCart, Calendar, CheckSquare, Layout, Bot, Sparkles, Users, FileText, Video, Database, Mail, Globe } from "lucide-react";

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
  return (
    <section className="py-20 bg-background overflow-hidden border-y border-border">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-5xl font-bold text-center text-foreground tracking-tight">
          Tools & Technologies
        </h2>
      </div>
      
      <div className="relative">
        <div className="flex gap-8 animate-scroll-left hover:[animation-play-state:paused]">
          {/* Duplicate the array twice for seamless loop */}
          {[...tools, ...tools].map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 px-6 py-4 border border-border text-foreground font-medium whitespace-nowrap hover:bg-foreground hover:text-background transition-colors duration-300 flex items-center gap-3"
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
