import { useState, useEffect } from "react";
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
    title: "Acuity Scheduling Automation",
    overview: "Automated scheduling system that syncs Acuity appointments with Google Calendar and sends automated reminders.",
    tools: ["N8N", "Acuity Scheduling", "Google Calendar", "Email"],
    features: [
      "Real-time calendar synchronization",
      "Automated reminder emails",
      "Conflict detection and resolution",
      "Multi-timezone support"
    ],
    outcome: "Eliminated manual calendar updates, reduced no-shows by 60% through automated reminders, and enabled seamless scheduling across multiple time zones for a global client base."
  },
  { 
    id: 2, 
    img: workflow2, 
    title: "Meeting Availability Checker",
    overview: "Intelligent system that checks team member availability across multiple calendars before scheduling meetings.",
    tools: ["N8N", "Google Calendar", "Slack", "Webhooks"],
    features: [
      "Cross-calendar availability checking",
      "Instant Slack notifications",
      "Automatic meeting slot suggestions",
      "Team coordination automation"
    ],
    outcome: "Reduced scheduling back-and-forth by 85%, saved 10+ hours per week of coordination time, and improved meeting attendance rates through optimal time slot selection."
  },
  { 
    id: 3, 
    img: workflow3, 
    title: "GHL to Notion Integration",
    overview: "Seamless data sync between Go High Level CRM and Notion workspace for unified project management.",
    tools: ["N8N", "Go High Level", "Notion API"],
    features: [
      "Bidirectional data synchronization",
      "Custom field mapping",
      "Real-time contact updates",
      "Automated database creation"
    ],
    outcome: "Unified team workflow by connecting sales and project management data, eliminated duplicate data entry, and improved team collaboration with real-time CRM insights accessible in Notion."
  },
  { 
    id: 4, 
    img: workflow4, 
    title: "AI Quote Generation System",
    overview: "AI-powered workflow that generates personalized sales quotes based on customer requirements and historical data.",
    tools: ["N8N", "OpenAI", "Google Sheets", "PDF Generator"],
    features: [
      "AI-driven pricing analysis",
      "Automated PDF quote generation",
      "Historical data integration",
      "Custom branding support"
    ],
    outcome: "Reduced quote generation time from 2 hours to 5 minutes, increased quote accuracy by 95%, and improved win rates through data-driven pricing recommendations."
  },
  { 
    id: 5, 
    img: workflow5, 
    title: "Chatbot RAG Workflow",
    overview: "Advanced chatbot using Retrieval-Augmented Generation to provide accurate, context-aware responses from your knowledge base.",
    tools: ["N8N", "OpenAI", "Vector Database", "Webhooks"],
    features: [
      "Semantic search capabilities",
      "Context-aware responses",
      "Knowledge base integration",
      "Multi-language support"
    ],
    outcome: "Achieved 92% answer accuracy, reduced support ticket volume by 60%, and enabled 24/7 customer support with responses based on company-specific knowledge."
  },
  { 
    id: 6, 
    img: workflow6, 
    title: "Clockify Time Tracking",
    overview: "Automated time tracking system that logs project hours and generates detailed reports for client billing.",
    tools: ["N8N", "Clockify", "Google Sheets", "Slack"],
    features: [
      "Automatic time entry logging",
      "Project-based tracking",
      "Weekly report generation",
      "Billable hours calculation"
    ],
    outcome: "Improved billing accuracy to 99%, recovered 15% more billable hours through automated tracking, and streamlined invoicing process with automated report generation."
  },
  { 
    id: 7, 
    img: workflow7, 
    title: "Complex Multi-Agent System",
    overview: "Orchestrated AI agent system where multiple specialized agents work together to handle complex business processes.",
    tools: ["N8N", "OpenAI", "Custom APIs", "Database"],
    features: [
      "Agent coordination and handoff",
      "Task-specific specialization",
      "Error handling and recovery",
      "Performance monitoring"
    ],
    outcome: "Automated 80% of complex decision-making workflows, reduced processing time by 70%, and enabled scalable handling of multi-step business processes without manual intervention."
  },
  { 
    id: 8, 
    img: workflow8, 
    title: "AI SDR Agent Setup",
    overview: "Intelligent Sales Development Representative that qualifies leads, schedules meetings, and manages follow-ups automatically.",
    tools: ["N8N", "OpenAI", "CRM", "Email", "Calendar"],
    features: [
      "Lead qualification scoring",
      "Personalized email sequences",
      "Automated meeting scheduling",
      "Response classification"
    ],
    outcome: "Increased qualified meetings by 200%, reduced sales team workload by 50%, and maintained 24/7 lead engagement with personalized, contextual responses."
  },
  { 
    id: 9, 
    img: workflow9, 
    title: "Multi-Agent Orchestration",
    overview: "Advanced workflow system that coordinates multiple AI agents to execute complex, multi-step business processes.",
    tools: ["N8N", "Multiple AI Models", "Database", "APIs"],
    features: [
      "Dynamic agent selection",
      "Process flow optimization",
      "Real-time coordination",
      "Comprehensive logging"
    ],
    outcome: "Enabled sophisticated process automation handling 1000+ tasks daily, improved process reliability to 98%, and reduced operational costs by 60% through intelligent agent coordination."
  },
  { 
    id: 10, 
    img: workflow10, 
    title: "Lead Management System",
    overview: "End-to-end lead management automation that captures, qualifies, routes, and nurtures leads through the sales pipeline.",
    tools: ["N8N", "CRM", "Email Marketing", "Webhooks"],
    features: [
      "Multi-source lead capture",
      "Automatic lead scoring",
      "Smart routing rules",
      "Automated nurture campaigns"
    ],
    outcome: "Captured 3000+ leads monthly from multiple sources, improved lead response time by 95%, and increased conversion rates by 40% through intelligent lead nurturing and routing."
  },
];

type AnimationPhase = "scatter" | "chase" | "arrange";

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof workflows[0] | null>(null);
  const [phase, setPhase] = useState<AnimationPhase>("scatter");
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    // Initialize random scattered positions
    const initialPositions = workflows.map(() => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }));
    setPositions(initialPositions);

    // Animation cycle: scatter (2s) -> chase (3s) -> arrange (10s) -> repeat
    const cycleInterval = setInterval(() => {
      setPhase("scatter");
      const scatteredPositions = workflows.map(() => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }));
      setPositions(scatteredPositions);

      setTimeout(() => {
        setPhase("chase");
        // Chase phase - items move towards center with wobble
        const chasingPositions = workflows.map(() => ({
          x: (Math.random() - 0.5) * 30,
          y: (Math.random() - 0.5) * 30,
        }));
        setPositions(chasingPositions);

        setTimeout(() => {
          setPhase("arrange");
          // Arrange phase - back to grid
          setPositions(workflows.map(() => ({ x: 0, y: 0 })));
        }, 3000);
      }, 2000);
    }, 15000);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <>
      <section 
        id="projects-animated" 
        ref={ref}
        className={`py-32 bg-background relative overflow-hidden animate-on-scroll ${isVisible ? 'visible' : ''}`}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "float-slow 20s ease-in-out infinite"
          }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-border rotate-45 animate-float-slow opacity-20" />
        <div className="absolute bottom-40 right-20 w-16 h-16 border border-border animate-float-medium opacity-20" />
        
        {/* Vertical text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
            Workflows
          </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl font-bold mb-20 text-center text-foreground tracking-tight animate-fade-in">
            Automation Workflows
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {workflows.map((workflow, index) => {
              const position = positions[index] || { x: 0, y: 0 };
              const isArranged = phase === "arrange";
              
              return (
                <div
                  key={workflow.id}
                  className="relative group cursor-pointer animate-fade-in"
                  onClick={() => setSelectedWorkflow(workflow)}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) ${phase === "chase" ? "scale(0.95)" : "scale(1)"}`,
                    transition: phase === "scatter" ? "transform 2s cubic-bezier(0.4, 0, 0.2, 1)" : 
                               phase === "chase" ? "transform 3s cubic-bezier(0.4, 0, 0.2, 1)" : 
                               "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: isArranged ? 1 : 0.7,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="relative overflow-hidden border border-border hover:border-foreground/50 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10">
                    <img
                      src={workflow.img}
                      alt={workflow.title}
                      className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                      <p className="text-foreground font-semibold text-lg text-center">
                        {workflow.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center mt-16 text-muted-foreground max-w-3xl mx-auto text-lg animate-fade-in">
            Click on any workflow to view detailed information. These are real automation systems built with N8N, 
            showcasing complex integrations between CRMs, AI models, databases, and communication platforms.
          </p>
        </div>
      </section>

      {/* Workflow Details Dialog */}
      <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
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
                <div className="border border-border overflow-hidden">
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
                        className="px-4 py-2 border border-border text-foreground bg-muted/30 text-sm font-medium"
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
                        <span className="text-foreground mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div>
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
