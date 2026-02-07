import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    id: 1, img: workflow1, title: "Meta Campaign Scaling",
    overview: "Automated Meta Ads campaign scaling workflow that monitors performance, adjusts budgets, and manages CBO/ABO strategies in real-time.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "Webhooks"],
    stats: [{ value: "90%", label: "Time Saved" }, { value: "3x", label: "ROI Increase" }],
    features: ["Automated budget optimization based on performance", "CBO and ABO campaign management", "Real-time status monitoring and updates", "Automated scaling rules execution"],
    outcome: "Reduced manual ad management time by 90% while improving campaign ROI through data-driven budget allocation and automated scaling decisions."
  },
  { 
    id: 2, img: workflow2, title: "Full Campaign Operations",
    overview: "Complete end-to-end campaign management system handling everything from status updates to automated sheet logging and webhook responses.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "JavaScript"],
    stats: [{ value: "50+", label: "Ad Accounts" }, { value: "100%", label: "Visibility" }],
    features: ["Paused status detection and handling", "CBO/ABO campaign type routing", "Automated data merging and formatting", "Real-time sheet updates and logging"],
    outcome: "Streamlined campaign operations across 50+ ad accounts, eliminating manual reporting and enabling instant performance visibility."
  },
  { 
    id: 3, img: workflow3, title: "Meta Ads Data Sync",
    overview: "Automated workflow that fetches Meta Ads data, processes it through loops, and syncs updates to Google Sheets with wait timers to respect rate limits.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "Loop Logic"],
    stats: [{ value: "1000+", label: "Ads Tracked" }, { value: "100%", label: "Data Accuracy" }],
    features: ["Batch ad data retrieval", "Intelligent loop processing with rate limiting", "Automated upsert operations", "Wait timers for API compliance"],
    outcome: "Enabled real-time ad performance tracking for 1000+ ads while maintaining API compliance and ensuring 100% data accuracy."
  },
  { 
    id: 4, img: workflow4, title: "Meta Ads Bulk Deletion",
    overview: "Automated bulk deletion workflow that filters and removes underperforming ads based on predefined criteria with loop-based processing.",
    tools: ["N8N", "Meta Ads API", "Filters", "Loop Logic"],
    stats: [{ value: "500+", label: "Ads Cleaned" }, { value: "35%", label: "Spend Saved" }],
    features: ["Smart filtering based on performance metrics", "Batch deletion with rate limiting", "Automated loop processing", "Wait timers for stability"],
    outcome: "Automated cleanup of 500+ underperforming ads weekly, improving account health and reducing wasted ad spend by 35%."
  },
  { 
    id: 5, img: workflow5, title: "Complex Multi-Platform Automation",
    overview: "Advanced multi-branch workflow handling image and video creative uploads to Meta, with error handling and Slack notifications.",
    tools: ["N8N", "Meta Ads API", "Google Drive", "Slack"],
    stats: [{ value: "5 min", label: "Upload Time" }, { value: "100+", label: "Ad Variants" }],
    features: ["Image and video creative routing", "Automated file downloads and uploads", "Error detection with Slack alerts", "Multi-variant ad creation"],
    outcome: "Reduced creative upload time from 2 hours to 5 minutes, enabling rapid A/B testing across 100+ ad variations simultaneously."
  },
  { 
    id: 6, img: workflow6, title: "Campaign Performance Reporter",
    overview: "Scheduled workflow that extracts campaign data, checks budget types, and compiles insights into formatted reports with automated sheet updates.",
    tools: ["N8N", "Meta Ads API", "Google Sheets", "JavaScript"],
    stats: [{ value: "10+", label: "Hours Saved/Week" }, { value: "Real-time", label: "Dashboards" }],
    features: ["Scheduled trigger automation", "CBO/ABO budget type detection", "Adset insight aggregation", "Automated report formatting"],
    outcome: "Eliminated 10+ hours of weekly manual reporting, providing real-time performance dashboards for data-driven decisions."
  },
  { 
    id: 7, img: workflow7, title: "Gmail Auto-Appeal System",
    overview: "Intelligent email monitoring system that parses Gmail for ad disapprovals, extracts ad IDs, and automatically submits appeals via API.",
    tools: ["N8N", "Gmail API", "Meta Ads API", "HTTP Requests"],
    stats: [{ value: "85%", label: "Appeal Success" }, { value: "$50K+", label: "Spend Recovered" }],
    features: ["Automated email parsing and filtering", "Ad ID extraction from messages", "Automatic appeal submission", "Slack notifications for results"],
    outcome: "Achieved 85% appeal success rate with zero manual intervention, recovering $50K+ in previously disapproved ad spend."
  },
  { 
    id: 8, img: workflow8, title: "Ad Set Preset Manager",
    overview: "Comprehensive ad set management system with preset configurations for different time periods (7D, 14D, 28D, 30D) and automated insights collection.",
    tools: ["N8N", "Meta Ads API", "Presets", "Automation Rules"],
    stats: [{ value: "80%", label: "Setup Reduced" }, { value: "4", label: "Time Presets" }],
    features: ["Multiple time-period preset management", "Automated ad set rule execution", "Campaign-level preset handling", "Cross-period insight comparison"],
    outcome: "Standardized ad set configurations across all campaigns, reducing setup time by 80% and ensuring consistent optimization strategies."
  },
  { 
    id: 9, img: workflow9, title: "E-Commerce UGC Video Generator",
    overview: "AI-powered workflow that extracts product data, generates prompts, creates UGC-style videos, and posts them automatically.",
    tools: ["N8N", "OpenAI", "Video Generation API", "Google Gemini"],
    stats: [{ value: "100+", label: "Videos/Month" }, { value: "200%", label: "Engagement Up" }],
    features: ["Automated product data extraction", "AI prompt generation for videos", "UGC-style video creation", "Multi-step video processing"],
    outcome: "Generated 100+ UGC videos automatically per month, increasing organic engagement by 200% and reducing content creation costs by 75%."
  },
  { 
    id: 10, img: workflow10, title: "ClickUp Project Automation",
    overview: "Complete project management automation syncing ClickUp tasks with custom fields, handling assignments, and routing to appropriate team members.",
    tools: ["N8N", "ClickUp API", "HTTP Requests", "JavaScript"],
    stats: [{ value: "500+", label: "Tasks/Month" }, { value: "40%", label: "Productivity Up" }],
    features: ["Automated task creation and updates", "Custom field value routing", "Team member assignment logic", "Multi-department project sync"],
    outcome: "Automated project tracking for 500+ tasks monthly, ensuring zero missed deadlines and 40% improvement in team productivity."
  },
];

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof workflows[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const goTo = (index: number) => {
    setActiveIndex((index + workflows.length) % workflows.length);
  };

  return (
    <>
      <section 
        id="projects-animated" 
        ref={ref}
        className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax ${isVisible ? 'visible' : ''}`}
      >
        {/* Decorative after-effect lines */}
        <div className="section-glow-line section-glow-line--top" />
        <div className="section-glow-line section-glow-line--bottom" />

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-foreground/20 rounded-full animate-float-slow" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-foreground/10 rounded-full animate-float-medium" />
        <div className="absolute bottom-32 left-[20%] w-1.5 h-1.5 bg-foreground/15 rounded-full animate-float-fast" />
        <div className="absolute bottom-20 right-[25%] w-2.5 h-2.5 bg-foreground/10 rounded-full animate-float-slow" style={{ animationDelay: "3s" }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 shimmer-border">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Real Automation Workflows</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Automation <span className="text-gradient-animated">Portfolio</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how agencies & businesses achieved results with these real automation systems.
            </p>
          </div>
          
          {/* Stacked Card Carousel */}
          <div className="relative max-w-5xl mx-auto" style={{ minHeight: "520px" }}>
            {workflows.map((workflow, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = index === activeIndex;

              // Only render nearby cards for performance
              if (absOffset > 3) return null;

              return (
                <div
                  key={workflow.id}
                  className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `translateY(${offset * -30}px) scale(${1 - absOffset * 0.05})`,
                    opacity: isActive ? 1 : Math.max(0, 1 - absOffset * 0.35),
                    zIndex: workflows.length - absOffset,
                    pointerEvents: isActive ? "auto" : "none",
                    filter: isActive ? "none" : `blur(${absOffset * 1.5}px)`,
                  }}
                  onClick={() => isActive && setSelectedWorkflow(workflow)}
                >
                  <div className="stacked-card rounded-2xl overflow-hidden h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                      {/* Left: Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                          {workflow.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                          {workflow.overview}
                        </p>
                        
                        <button className="text-foreground/70 hover:text-foreground text-sm font-medium underline underline-offset-4 mb-6 w-fit transition-colors">
                          Read about this →
                        </button>

                        {/* Stats boxes */}
                        <div className="flex gap-4">
                          {workflow.stats.map((stat, idx) => (
                            <div key={idx} className="flex-1 glass rounded-xl p-4 text-center stat-card-hover">
                              <div className="text-xl font-bold text-foreground">{stat.value}</div>
                              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Image */}
                      <div className="relative overflow-hidden hidden lg:block">
                        <div className="absolute inset-0 card-image-gradient" />
                        <img
                          src={workflow.img}
                          alt={workflow.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation dots & arrows */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              onClick={() => goTo(activeIndex - 1)}
              className="p-2 glass rounded-full hover:bg-foreground/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex gap-2">
              {workflows.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-foreground w-8" : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => goTo(activeIndex + 1)}
              className="p-2 glass rounded-full hover:bg-foreground/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
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
                <div className="rounded-xl overflow-hidden glow-effect">
                  <img src={selectedWorkflow.img} alt={selectedWorkflow.title} className="w-full h-auto object-cover" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkflow.tools.map((tool, idx) => (
                      <span key={idx} className="px-4 py-2 glass rounded-lg text-foreground text-sm font-medium">{tool}</span>
                    ))}
                  </div>
                </div>

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

                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Outcome</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedWorkflow.outcome}</p>
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
