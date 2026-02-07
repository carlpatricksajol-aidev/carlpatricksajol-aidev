import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, TrendingUp, Globe, Megaphone } from "lucide-react";

const experiences = [
  {
    title: "Marketing Assistant / Paid Ads & Social Media Support",
    company: "DreamTeam PH",
    period: "Feb 2023 - Mar 2024",
    icon: Megaphone,
    responsibilities: [
      "Managed and optimized Meta (Facebook & Instagram) Ads campaigns for clients",
      "Monitored ad performance and prepared weekly performance reports with key metrics",
      "Adjusted targeting, creatives, and messaging based on performance insights",
      "Assisted in social media content management and engagement tracking",
      "Coordinated with internal teams and clients to implement revisions"
    ]
  },
  {
    title: "Social Media Marketing Associate / Marketing Assistant",
    company: "Actional Marketing",
    period: "Apr 2024 - Aug 2025",
    icon: TrendingUp,
    responsibilities: [
      "Developed and managed social media marketing strategies for multiple clients",
      "Executed content planning, copywriting, and campaign messaging",
      "Supported B2B marketing campaigns including buyer persona development",
      "Conducted SEO audits and on-page optimization for search visibility",
      "Created campaigns across Facebook, Google, Instagram, TikTok, and YouTube",
      "Provided client support communicating directly with Israel-based clients"
    ]
  },
  {
    title: "Digital Marketing Specialist",
    company: "Business Connect World",
    period: "Jan 2024 - Feb 2025",
    icon: Globe,
    responsibilities: [
      "Implemented SEO strategies for Amazon product listings",
      "Increased product discoverability through search by approximately 20%",
      "Conducted competitor and keyword research for optimization",
      "Optimized product titles, descriptions, and keywords",
      "Monitored performance metrics and adjusted strategies for ROI"
    ]
  },
  {
    title: "Freelance Website Designer & Funnel Builder",
    company: "Contract / Project-Based",
    period: "Ongoing",
    icon: Briefcase,
    responsibilities: [
      "Designed and built websites from scratch using WordPress",
      "Developed sales funnels and landing pages using GoHighLevel (GHL)",
      "Built GHL SaaS-style accounts with funnels, pipelines, and automations",
      "Customized websites and funnels for client branding and conversion goals",
      "Worked directly with clients for requirements and delivery"
    ]
  }
];

const MarketingExperience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="marketing-experience"
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-foreground/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: "2s" }} />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Decorative lines */}
      <div className="section-glow-line section-glow-line--top" />
      <div className="section-glow-line section-glow-line--bottom" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Professional Background</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Marketing <span className="text-gradient-animated">Experience</span>
            </h2>
            
            <p className="text-xl leading-relaxed text-foreground/80 max-w-4xl mx-auto">
              Results-driven Digital Marketing professional with hands-on experience in social media marketing, 
              SEO, paid advertising, website development, funnel building, and client support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 hover:glow-effect transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-secondary/50 rounded-xl group-hover:bg-foreground/10 transition-colors">
                    <exp.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-foreground/70 font-medium">{exp.company}</p>
                    <p className="text-muted-foreground text-sm">{exp.period}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li 
                      key={respIndex}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-gradient-animated stat-glow mb-2">3+</div>
              <p className="text-muted-foreground text-sm">Years Experience</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-gradient-animated stat-glow mb-2">20%</div>
              <p className="text-muted-foreground text-sm">SEO Improvement</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-gradient-animated stat-glow mb-2">5+</div>
              <p className="text-muted-foreground text-sm">Platforms Managed</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-gradient-animated stat-glow mb-2">10+</div>
              <p className="text-muted-foreground text-sm">Clients Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingExperience;
