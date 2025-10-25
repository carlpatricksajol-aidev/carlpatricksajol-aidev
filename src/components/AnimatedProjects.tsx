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
  { id: 1, img: workflow1, title: "Acuity Scheduling Automation", animation: "animate-float-slow" },
  { id: 2, img: workflow2, title: "Meeting Availability Checker", animation: "animate-float-medium" },
  { id: 3, img: workflow3, title: "GHL to Notion Integration", animation: "animate-float-fast" },
  { id: 4, img: workflow4, title: "AI Quote Generation System", animation: "animate-float-slow", delay: "delay-100" },
  { id: 5, img: workflow5, title: "Chatbot RAG Workflow", animation: "animate-float-medium", delay: "delay-200" },
  { id: 6, img: workflow6, title: "Clockify Time Tracking", animation: "animate-float-fast", delay: "delay-300" },
  { id: 7, img: workflow7, title: "Complex Multi-Agent System", animation: "animate-float-slow", delay: "delay-500" },
  { id: 8, img: workflow8, title: "AI SDR Agent Setup", animation: "animate-float-medium", delay: "delay-150" },
  { id: 9, img: workflow9, title: "Multi-Agent Orchestration", animation: "animate-float-fast", delay: "delay-400" },
  { id: 10, img: workflow10, title: "Lead Management System", animation: "animate-float-slow", delay: "delay-250" },
];

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);

  return (
    <section id="projects-animated" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center text-foreground">Automation Workflows</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`relative group cursor-pointer ${workflow.animation} ${workflow.delay || ""}`}
              onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(27,69,67,0.4)] transition-all duration-500 hover:scale-105 border-2 border-primary/20">
                <img
                  src={workflow.img}
                  alt={workflow.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center p-6">
                  <p className="text-primary-foreground font-semibold text-lg text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {workflow.title}
                  </p>
                </div>
              </div>
              
              {selectedWorkflow === workflow.id && (
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-muted-foreground max-w-3xl mx-auto">
          Click on any workflow to select it. These are real automation systems built with N8N, showcasing 
          complex integrations between CRMs, AI models, databases, and communication platforms.
        </p>
      </div>
    </section>
  );
};

export default AnimatedProjects;
