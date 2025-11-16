import { useState } from "react";
import { InlineWidget } from "react-calendly";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { toast } = useToast();
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
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Animated concentric circles */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-border rounded-full animate-pulse"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.3}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Floating squares */}
      <div className="absolute top-40 left-20 w-20 h-20 border border-border rotate-12 animate-float-slow opacity-10" />
      <div className="absolute bottom-40 right-20 w-28 h-28 border border-border rotate-45 animate-float-medium opacity-10" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      
      {/* Vertical text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase whitespace-nowrap">
          Contact
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-20 text-center text-foreground tracking-tight">
          Get In Touch
        </h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Calendly Widget */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Book a Meeting</h3>
            <div className="border border-border overflow-hidden" style={{ minHeight: "700px" }}>
              <InlineWidget 
                url="https://calendly.com/carlpatricksajol/30min"
                styles={{
                  height: '700px',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-lg">carlpatricksajol@gmail.com</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground text-lg">Available for remote work worldwide</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Let's Work Together</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in building custom automation solutions that streamline your business operations. 
                  Whether you need CRM integrations, workflow automation, or AI-powered systems, I'm here to help.
                </p>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
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
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12"
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
                className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
              {errors.message && (
                <p className="text-destructive text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-semibold"
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
