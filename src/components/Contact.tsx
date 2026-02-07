import { useState } from "react";
import { InlineWidget } from "react-calendly";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Mail, MapPin, Calendar } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      contactSchema.parse(formData);
      setErrors({});

      const mailtoLink = `mailto:carlpatricksajol@gmail.com?subject=Enquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      toast({
        title: "Opening your email client",
        description: "Your message has been prepared for sending.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className={`py-32 bg-background relative overflow-hidden animate-on-scroll section-parallax noise-overlay ${isVisible ? 'visible' : ''}`}
    >
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-foreground/5 rounded-full blur-3xl animate-glow" />

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      {/* Decorative lines */}
      <div className="section-glow-line section-glow-line--top" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Get Started</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to automate your business? Book a call or send me a message.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Calendly Widget */}
          <div className="w-full">
            <div className="glass-card rounded-2xl overflow-hidden glow-effect" style={{ minHeight: "700px" }}>
              <InlineWidget 
                url="https://calendly.com/carlpatricksajol/30min"
                styles={{
                  height: '700px',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-secondary/50 rounded-xl">
                  <Mail className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">carlpatricksajol@gmail.com</p>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-secondary/50 rounded-xl">
                  <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Available for remote work worldwide</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-secondary/50 rounded-xl">
                  <Calendar className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Let's Work Together</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I specialize in building custom automation solutions that streamline your business operations. 
                    Whether you need CRM integrations, workflow automation, or AI-powered systems, I'm here to help.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground resize-none rounded-xl"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-xl glow-effect"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
