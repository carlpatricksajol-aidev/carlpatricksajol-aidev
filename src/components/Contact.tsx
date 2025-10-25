import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-foreground">Get In Touch</h2>
          
          <Card className="p-8 bg-gradient-to-br from-fresh-mint via-card to-soft-rose/20 border-border">
            <p className="text-lg text-card-foreground mb-8">
              Looking to automate your workflows and boost efficiency? Let's discuss how I can help transform your business operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
                onClick={() => window.location.href = 'mailto:carlpatricksajol@gmail.com'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10"
                onClick={() => window.location.href = 'tel:+639955104274'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Me
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground text-sm">
                📞 +63 995 510 4274
              </p>
              <p className="text-muted-foreground text-sm">
                📧 carlpatricksajol@gmail.com
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
