const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Carl Patrick Sajol. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Automation Specialist & AI Developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
