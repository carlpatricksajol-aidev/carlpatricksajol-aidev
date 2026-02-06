import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ToolsMarquee from "@/components/ToolsMarquee";
import Projects from "@/components/Projects";
import AnimatedProjects from "@/components/AnimatedProjects";
import Testimonials from "@/components/Testimonials";
import GHLExpertise from "@/components/GHLExpertise";
import MarketingExperience from "@/components/MarketingExperience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <ToolsMarquee />
      <Projects />
      <AnimatedProjects />
      <Testimonials />
      <GHLExpertise />
      <MarketingExperience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
