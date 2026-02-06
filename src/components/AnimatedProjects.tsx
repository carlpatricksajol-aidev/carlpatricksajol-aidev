import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import workflow1 from "@/assets/workflow-1.png";
import workflow2 from "@/assets/workflow-2.png";
import workflow3 from "@/assets/workflow-3.png";
import workflow4 from "@/assets/workflow-4.png";
import workflow5 from "@/assets/workflow-5.png";
import workflow6 from "@/assets/workflow-6.png";
import workflow7 from "@/assets/workflow-7.png";
import workflow8 from "@/assets/workflow-8.png";
import workflow9 from "@/assets/workflow-9.png";
import workflow10 from "@/assets/workflow-10.png";

const workflows = [
  { 
    id: 1, 
    img: workflow1, 
    title: "Meta Campaign Scaling",
    overview: "Automated Meta Ads campaign scaling workflow that monitors performance, adjusts budgets, and manages CBO/ABO strategies in real-time.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "Webhooks"],
    features: [
      "Automated budget optimization based on performance",
      "CBO and ABO campaign management",
      "Real-time status monitoring and updates",
      "Automated scaling rules execution"
    ],
    outcome: "Reduced manual ad management time by 90% while improving campaign ROI through data-driven budget allocation and automated scaling decisions."
  },
  { 
    id: 2, 
    img: workflow2, 
    title: "Full Campaign Operations",
    overview: "Complete end-to-end campaign management system handling everything from status updates to automated sheet logging and webhook responses.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "JavaScript"],
    features: [
      "Paused status detection and handling",
      "CBO/ABO campaign type routing",
      "Automated data merging and formatting",
      "Real-time sheet updates and logging"
    ],
    outcome: "Streamlined campaign operations across 50+ ad accounts, eliminating manual reporting and enabling instant performance visibility."
  },
  { 
    id: 3, 
    img: workflow3, 
    title: "Meta Ads Data Sync",
    overview: "Automated workflow that fetches Meta Ads data, processes it through loops, and syncs updates to Google Sheets with wait timers to respect rate limits.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "Loop Logic"],
    features: [
      "Batch ad data retrieval",
      "Intelligent loop processing with rate limiting",
      "Automated upsert operations",
      "Wait timers for API compliance"
    ],
    outcome: "Enabled real-time ad performance tracking for 1000+ ads while maintaining API compliance and ensuring 100% data accuracy."
  },
  { 
    id: 4, 
    img: workflow4, 
    title: "Meta Ads Bulk Deletion",
    overview: "Automated bulk deletion workflow that filters and removes underperforming ads based on predefined criteria with loop-based processing.",
    tools: ["N8N", "Meta Ads API", "Filters", "Loop Logic"],
    features: [
      "Smart filtering based on performance metrics",
      "Batch deletion with rate limiting",
      "Automated loop processing",
      "Wait timers for stability"
    ],
    outcome: "Automated cleanup of 500+ underperforming ads weekly, improving account health and reducing wasted ad spend by 35%."
  },
  { 
    id: 5, 
    img: workflow5, 
    title: "Complex Multi-Platform Automation",
    overview: "Advanced multi-branch workflow handling image and video creative uploads to Meta, with error handling and Slack notifications.",
    tools: ["N8N", "Meta Ads API", "Google Drive", "Slack"],
    features: [
      "Image and video creative routing",
      "Automated file downloads and uploads",
      "Error detection with Slack alerts",
      "Multi-variant ad creation"
    ],
    outcome: "Reduced creative upload time from 2 hours to 5 minutes, enabling rapid A/B testing across 100+ ad variations simultaneously."
  },
  { 
    id: 6, 
    img: workflow6, 
    title: "Campaign Performance Reporter",
    overview: "Scheduled workflow that extracts campaign data, checks budget types, and compiles insights into formatted reports with automated sheet updates.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "JavaScript"],
    features: [
      "Scheduled trigger automation",
      "CBO/ABO budget type detection",
      "Adset insight aggregation",
      "Automated report formatting"
    ],
    outcome: "Eliminated 10+ hours of weekly manual reporting, providing real-time performance dashboards for data-driven decisions."
  },
  { 
    id: 7, 
    img: workflow7, 
    title: "Gmail Auto-Appeal System",
    overview: "Intelligent email monitoring system that parses Gmail for ad disapprovals, extracts ad IDs, and automatically submits appeals via API.",
    tools: ["N8N", "Gmail API", "Meta Ads API", "HTTP Requests"],
    features: [
      "Automated email parsing and filtering",
      "Ad ID extraction from messages",
      "Automatic appeal submission",
      "Slack notifications for results"
    ],
    outcome: "Achieved 85% appeal success rate with zero manual intervention, recovering $50K+ in previously disapproved ad spend."
  },
  { 
    id: 8, 
    img: workflow8, 
    title: "Ad Set Preset Manager",
    overview: "Comprehensive ad set management system with preset configurations for different time periods (7D, 14D, 28D, 30D) and automated insights collection.",
    tools: ["N8N", "Meta Ads API", "Presets", "Automation Rules"],
    features: [
      "Multiple time-period preset management",
      "Automated ad set rule execution",
      "Campaign-level preset handling",
      "Cross-period insight comparison"
    ],
    outcome: "Standardized ad set configurations across all campaigns, reducing setup time by 80% and ensuring consistent optimization strategies."
  },
  { 
    id: 9, 
    img: workflow9, 
    title: "E-Commerce UGC Video Generator",
    overview: "AI-powered workflow that extracts product data, generates prompts, creates UGC-style videos, and posts them automatically.",
    tools: ["N8N", "OpenAI", "Video Generation API", "Google Gemini"],
    features: [
      "Automated product data extraction",
      "AI prompt generation for videos",
      "UGC-style video creation",
      "Multi-step video processing"
    ],
    outcome: "Generated 100+ UGC videos automatically per month, increasing organic engagement by 200% and reducing content creation costs by 75%."
  },
  { 
    id: 10, 
    img: workflow10, 
    title: "ClickUp Project Automation",
    overview: "Complete project management automation syncing ClickUp tasks with custom fields, handling assignments, and routing to appropriate team members.",
    tools: ["N8N", "ClickUp API", "HTTP Requests", "JavaScript"],
    features: [
      "Automated task creation and updates",
      "Custom field value routing",
      "Team member assignment logic",
      "Multi-department project sync"
    ],
    outcome: "Automated project tracking for 500+ tasks monthly, ensuring zero missed deadlines and 40% improvement in team productivity."
  },
];

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof workflows[0] | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <section 
        id="projects-animated" 
        ref={ref}
        className={`py-32 bg-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
      >
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />

        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-20" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Real Automation Workflows</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Automation <span className="text-gradient">Portfolio</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Click on any workflow to view detailed information. These are real automation systems built with N8N, 
              showcasing complex integrations between CRMs, AI models, databases, and communication platforms.
            </p>
          </div>
          
          {/* Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {workflows.map((workflow, index) => (
              <div
                key={workflow.id}
                className="group cursor-pointer animate-fade-in"
                onClick={() => setSelectedWorkflow(workflow)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl glass-card hover:glow-effect transition-all duration-500 hover:scale-[1.02]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={workflow.img}
                      alt={workflow.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {workflow.overview}
                    </p>
                    
                    {/* Tools */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {workflow.tools.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs font-medium text-muted-foreground bg-secondary/50 rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Details Dialog */}
      <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-border rounded-2xl">
          {selectedWorkflow && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-foreground mb-4">
                  {selectedWorkflow.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-foreground/80">
                  {selectedWorkflow.overview}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Workflow Image */}
                <div className="rounded-xl overflow-hidden glow-effect">
                  <img
                    src={selectedWorkflow.img}
                    alt={selectedWorkflow.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Tools Used */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkflow.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 glass rounded-lg text-foreground text-sm font-medium"
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
                    {selectedWorkflow.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Outcome</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedWorkflow.outcome}
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

export default AnimatedProjects;
