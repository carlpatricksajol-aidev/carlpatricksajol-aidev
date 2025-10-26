import { useState } from "react";
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
  { id: 1, img: workflow1, title: "Acuity Scheduling Automation" },
  { id: 2, img: workflow2, title: "Meeting Availability Checker" },
  { id: 3, img: workflow3, title: "GHL to Notion Integration" },
  { id: 4, img: workflow4, title: "AI Quote Generation System" },
  { id: 5, img: workflow5, title: "Chatbot RAG Workflow" },
  { id: 6, img: workflow6, title: "Clockify Time Tracking" },
  { id: 7, img: workflow7, title: "Complex Multi-Agent System" },
  { id: 8, img: workflow8, title: "AI SDR Agent Setup" },
  { id: 9, img: workflow9, title: "Multi-Agent Orchestration" },
  { id: 10, img: workflow10, title: "Lead Management System" },
];

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);

  return (
    <section id="projects-animated" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      
      {/* Vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          Workflows
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-20 text-center text-foreground tracking-tight">
          Automation Workflows
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
            >
              <div className="relative overflow-hidden border border-border hover:border-foreground/50 transition-all duration-300">
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
              
              {selectedWorkflow === workflow.id && (
                <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-2 text-sm font-bold z-10">
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-16 text-muted-foreground max-w-3xl mx-auto text-lg">
          Click on any workflow to select it. These are real automation systems built with N8N, showcasing 
          complex integrations between CRMs, AI models, databases, and communication platforms.
        </p>
      </div>
    </section>
  );
};

export default AnimatedProjects;
