import { Page, SiteHeader } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import ServiceLines from "@/components/landing/ServiceLines";
import Industries from "@/components/landing/Industries";
import ToolBand from "@/components/landing/ToolBand";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import Testimonials from "@/components/landing/Testimonials";
import { CTA, Credentials, Proof, Systems } from "@/components/landing/Sections";

/**
 * The direct spine: who, proof, then the work itself.
 *
 *   HERO      the offer and the running-systems fact
 *   PROOF     four numbers, all general, all counted from live systems
 *   WORK      the three hardest builds first, then the eight service lines,
 *     the five industries they were sold into, and all twenty-six workflow
 *     maps. Every case leads with its result.
 *   TOOLS     the stack it runs on and lands in
 *   → then what four people who inherited the systems say, then who he
 *     is, then one action.
 *
 * The Problems / Solutions / Output essay sections are unmounted, not deleted
 * (src/components/landing/Problems.tsx keeps all three). They argued the case
 * for automation to a cold SMB buyer across ~1,500 words before any work
 * appeared. The visitors this site actually gets arrive from a resume, a
 * LinkedIn profile or a referral already convinced automation exists; they came
 * to check the work, so the work now comes first.
 */
const Index = () => (
  <Page header={<SiteHeader stops={10} />}>
    <Hero />
    <Proof />
    <Systems />
    <ServiceLines />
    <Industries />
    <Workflows />
    <ToolBand />
    <InkBand />
    <Testimonials />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
