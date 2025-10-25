const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Carl Patrick Sajol. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-secondary-foreground/80">
            Automation Specialist & AI Developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
