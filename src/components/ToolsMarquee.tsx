const ToolsMarquee = () => {
  const tools = [
    "N8N", "Zapier", "Make.com", "APIs", "Webhooks", "HubSpot", 
    "ActiveCampaign", "Go High Level", "Shopify", "Monday.com", 
    "Asana", "Trello", "WordPress", "Elementor", "Webflow", 
    "ChatGPT", "Midjourney", "Slack", "Notion", "Loom", 
    "Airtable", "Google Workspace", "Google Sheets", "Sora"
  ];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
          Tools & Technologies
        </h2>
      </div>
      
      <div className="relative">
        <div className="flex gap-8 animate-scroll-left hover:[animation-play-state:paused]">
          {/* Duplicate the array twice for seamless loop */}
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-3 bg-card border-2 border-primary/20 rounded-lg text-foreground font-semibold whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
