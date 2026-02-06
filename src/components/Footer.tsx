const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-2xl font-bold text-foreground">Carl</span>
            <span className="text-2xl font-bold text-muted-foreground">.dev</span>
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Building automation systems that save you time and scale your business.
          </p>
          
          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Carl Patrick Sajol. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Automation Specialist & AI Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
