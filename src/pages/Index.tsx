import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import InkBand from "@/components/landing/InkBand";
import { CTA, Credentials, Process, Proof, Systems, Tracks } from "@/components/landing/Sections";

/**
 * Section order is the argument, and density deliberately alternates so the
 * page breathes: sparse hero -> proof band -> tracks -> the ink chapter
 * (gallery) -> systems -> process -> credentials -> one CTA.
 */
const Index = () => (
  <Page>
    <Hero />
    <Proof />
    <Tracks />
    <InkBand />
    <Systems />
    <Process />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
