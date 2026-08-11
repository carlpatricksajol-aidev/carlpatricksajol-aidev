import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import { Problems, Solutions } from "@/components/landing/Problems";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import { CTA, Credentials, Process, Proof, Systems, Tracks } from "@/components/landing/Sections";

/**
 * The page argues in the order a buyer actually thinks:
 *   what is this → is that my problem → can he fix it → prove it → who is he → talk.
 *
 * Problems come before anything built. The previous version opened with what he
 * had made and never named the visitor's situation, which is why it read as a
 * list of projects rather than an offer. Density alternates so the page breathes.
 */
const Index = () => (
  <Page>
    <Hero />
    <Proof />
    <Problems />
    <Solutions />
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
