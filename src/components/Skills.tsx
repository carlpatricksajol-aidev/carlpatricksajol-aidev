import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    category: "Automation & Integration",
    skills: ["Zapier", "Make.com", "N8N", "APIs", "Webhooks", "Scenario Logic"],
  },
  {
    category: "CRM & Lead Management",
    skills: ["HubSpot", "ActiveCampaign", "Go High Level", "Google Sheets"],
  },
  {
    category: "E-Commerce Operations",
    skills: ["Shopify", "Inventory Sync", "Product Management", "Order Flow"],
  },
  {
    category: "Project & Task Automation",
    skills: ["Monday.com", "Asana", "Trello", "Task Triggers", "Dashboards"],
  },
  {
    category: "Web & CMS Tools",
    skills: ["WordPress", "Breakdance Builder", "Elementor", "Webflow"],
  },
  {
    category: "AI & Chatbot Flows",
    skills: ["Microsoft Copilot Studio", "ChatGPT", "Midjourney", "Sora"],
  },
  {
    category: "Collaboration & Workflow",
    skills: ["Slack", "Notion", "Loom", "Airtable", "Google Workspace"],
  },
  {
    category: "Reporting & Dashboards",
    skills: ["Google Data Studio", "Sheets", "Automated Metrics"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Skills & Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-to-br from-card to-fresh-mint/20 border-border hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline"
                    className="border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
