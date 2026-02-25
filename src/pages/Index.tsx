import { useEffect, useRef } from "react";
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

const ParallaxSection = ({ children, speed = 0.15, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const translateY = centerOffset * speed;
      ref.current.style.transform = `translateY(${translateY}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`parallax-section ${className}`} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ParallaxSection speed={0.08}>
        <About />
      </ParallaxSection>
      <ParallaxSection speed={-0.05}>
        <ToolsMarquee />
      </ParallaxSection>
      <ParallaxSection speed={0.1}>
        <Projects />
      </ParallaxSection>
      <ParallaxSection speed={-0.08}>
        <AnimatedProjects />
      </ParallaxSection>
      <ParallaxSection speed={0.06}>
        <Testimonials />
      </ParallaxSection>
      <ParallaxSection speed={-0.07}>
        <GHLExpertise />
      </ParallaxSection>
      <ParallaxSection speed={0.09}>
        <MarketingExperience />
      </ParallaxSection>
      <ParallaxSection speed={-0.05}>
        <Contact />
      </ParallaxSection>
      <Footer />
    </div>
  );
};

export default Index;
