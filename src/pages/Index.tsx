import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import { CTA, Credentials, Process, Proof, Systems, Tracks } from "@/components/landing/Sections";

/**
 * Order is the argument, and automation carries it. Two years of ops and
 * platform work leads; the creative pipelines are a second track and real proof,
 * not the thesis. Density alternates deliberately so the page breathes:
 * sparse hero -> proof band -> tracks -> ranked systems -> workflow evidence ->
 * the creative chapter -> process -> credentials -> one CTA.
 */
const Index = () => (
  <Page>
    <Hero />
    <Proof />
    <Tracks />
    <Systems />
    <Workflows />
    <InkBand />
    <Process />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
