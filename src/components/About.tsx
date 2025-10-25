import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-foreground">About Me</h2>
          
          <Card className="p-8 bg-gradient-to-br from-fresh-mint to-card border-border animate-fade-in">
            <p className="text-lg leading-relaxed text-card-foreground">
              Tech-driven <span className="font-semibold text-primary">Automation Specialist</span> with expertise in{" "}
              <span className="font-semibold">N8N, Zapier, and Make.com</span>, building scalable no-code systems 
              that streamline sales, CRM, and marketing operations. Skilled in integrating{" "}
              <span className="font-semibold">HubSpot, Go High Level, Systeme.io, Shopify, and WordPress</span>, 
              with a strong focus on AI-driven sales workflows and process automation that save time, reduce errors, 
              and increase team efficiency.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Automations Built</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Platforms Integrated</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Hours Saved</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
