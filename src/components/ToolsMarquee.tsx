import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const tools = [
  { name: "N8N", logo: "https://cdn.simpleicons.org/n8n/white" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/white" },
  { name: "Make", logo: "https://cdn.simpleicons.org/make/white" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/white" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/white" },
  { name: "Claude", logo: "https://cdn.simpleicons.org/anthropic/white" },
  { name: "Slack", logo: "https://cdn.simpleicons.org/slack/white" },
  { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/white" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/white" },
  { name: "Go High Level", logo: "https://cdn.simpleicons.org/g2/white" },
  { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify/white" },
  { name: "WordPress", logo: "https://cdn.simpleicons.org/wordpress/white" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/white" },
  { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable/white" },
  { name: "Google Sheets", logo: "https://cdn.simpleicons.org/googlesheets/white" },
  { name: "Meta", logo: "https://cdn.simpleicons.org/meta/white" },
  { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok/white" },
  { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/white" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/white" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "ActiveCampaign", logo: "https://cdn.simpleicons.org/activecampaign/white" },
  { name: "Google Workspace", logo: "https://cdn.simpleicons.org/google/white" },
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
            Tools & <span className="text-gradient-animated">Technologies</span>
          </h2>
        </div>
      </div>
      
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
          {/* Duplicate the array twice for seamless loop */}
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-4 glass-card rounded-xl text-foreground font-medium whitespace-nowrap hover:glow-effect transition-all duration-300 flex items-center gap-3"
            >
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="h-5 w-5 object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
