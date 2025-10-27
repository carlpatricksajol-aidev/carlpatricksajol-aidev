import Hero from "@/components/Hero";
import About from "@/components/About";
import ToolsMarquee from "@/components/ToolsMarquee";
import Projects from "@/components/Projects";
import AnimatedProjects from "@/components/AnimatedProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Hero />
      <About />
      <ToolsMarquee />
      <Projects />
      <AnimatedProjects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
