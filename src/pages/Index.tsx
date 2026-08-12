import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import ServiceLines from "@/components/landing/ServiceLines";
import { Problems, Solutions } from "@/components/landing/Problems";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import { CTA, Credentials, Process, Proof, Systems, Tracks } from "@/components/landing/Sections";

/**
 * A dual-practice portfolio, argued in two explicit chapters:
 *
 *   what is this → is that my problem → can he fix it →
 *   CHAPTER 01 · AUTOMATION — the larger half, and argued in three passes:
 *       breadth  (eight service lines, the way a buyer shops)
 *       depth    (the three hardest builds, written up)
 *       volume   (all twenty-six workflow maps, filterable by line)
 *   CHAPTER 02 · AI CREATIVE (the dark room: rails, reel, carousel, cases)
 *   → how he works → who he is → talk.
 *
 * The automation chapter opens with the page's one sticky-pair section — the
 * chapter title pins while the eight service lines scroll past it — because
 * breadth is exactly what a list is for.
 */
const Index = () => (
  <Page>
    <Hero />
    <Proof />
    <Problems />
    <Solutions />
    <Tracks />
    <ServiceLines />
    <Systems />
    <Workflows />
    <InkBand />
    <Process />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
