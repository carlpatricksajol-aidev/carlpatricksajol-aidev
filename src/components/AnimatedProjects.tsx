import { useState, useEffect } from "react";
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

type AnimationPhase = "scatter" | "chase" | "arrange";

const AnimatedProjects = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);
  const [phase, setPhase] = useState<AnimationPhase>("scatter");
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);

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
    <section id="projects-animated" className="py-32 bg-background relative overflow-hidden">
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
                className="relative group cursor-pointer"
                onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) ${phase === "chase" ? "scale(0.95)" : "scale(1)"}`,
                  transition: phase === "scatter" ? "transform 2s cubic-bezier(0.4, 0, 0.2, 1)" : 
                             phase === "chase" ? "transform 3s cubic-bezier(0.4, 0, 0.2, 1)" : 
                             "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: isArranged ? 1 : 0.7,
                }}
              >
                <div className="relative overflow-hidden border border-border hover:border-foreground/50 transition-all duration-300 animate-float">
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
            );
          })}
        </div>

        <p className="text-center mt-16 text-muted-foreground max-w-3xl mx-auto text-lg animate-fade-in">
          Click on any workflow to select it. These are real automation systems built with N8N, showcasing 
          complex integrations between CRMs, AI models, databases, and communication platforms.
        </p>
      </div>
    </section>
  );
};

export default AnimatedProjects;
