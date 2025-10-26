const ToolsMarquee = () => {
  const tools = [
    "N8N", "Zapier", "Make.com", "APIs", "Webhooks", "HubSpot", 
    "ActiveCampaign", "Go High Level", "Shopify", "Monday.com", 
    "Asana", "Trello", "WordPress", "Elementor", "Webflow", 
    "ChatGPT", "Midjourney", "Slack", "Notion", "Loom", 
    "Airtable", "Google Workspace", "Google Sheets", "Sora"
  ];

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
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-6 py-3 border border-border text-foreground font-medium whitespace-nowrap hover:bg-foreground hover:text-background transition-colors duration-300"
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
