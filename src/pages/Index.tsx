import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import ServiceLines from "@/components/landing/ServiceLines";
import ToolBand from "@/components/landing/ToolBand";
import { Output, Problems, Solutions } from "@/components/landing/Problems";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import { CTA, Credentials, Proof, Systems } from "@/components/landing/Sections";

/**
 * One argument, in order, with nothing above the chapters specific to a single
 * deliverable:
 *
 *   PROBLEM   what it costs to have a person connecting your tools
 *   PROOF     four numbers, all general, all counted from live systems
 *   SOLUTION  the same five moves, whatever the tools are
 *   OUTPUT    what you are actually holding on Monday
 *   TOOLS     the stack it runs on and lands in
 *   → then the work: eight service lines, the three hardest builds, all
 *     twenty-six workflow maps, and the creative chapter.
 *   → then who he is, then one action.
 *
 * The two-track fork and the separate Process section are both gone. The fork
 * asserted through geometry that ad creative was half the practice; Process was
 * a second five-step method list sitting a screen away from the first.
 */
const Index = () => (
  <Page>
    <Hero />
    <Problems />
    <Proof />
    <Solutions />
    <Output />
    <ToolBand />
    <ServiceLines />
    <Systems />
    <Workflows />
    <InkBand />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
