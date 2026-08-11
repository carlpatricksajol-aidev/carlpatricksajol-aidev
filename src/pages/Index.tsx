import { Page } from "@/components/SiteChrome";
import Hero from "@/components/landing/Hero";
import ChapterOpener from "@/components/landing/ChapterOpener";
import { Problems, Solutions } from "@/components/landing/Problems";
import InkBand from "@/components/landing/InkBand";
import Workflows from "@/components/landing/Workflows";
import { CTA, Credentials, Process, Proof, Systems, Tracks } from "@/components/landing/Sections";
import { chapters } from "@/data/copy";

/**
 * A dual-practice portfolio, argued in two explicit chapters:
 *
 *   what is this → is that my problem → can he fix it →
 *   CHAPTER 01 · AUTOMATION  (the larger half: domain index, systems, plates)
 *   CHAPTER 02 · AI CREATIVE (the dark room: rails, reel, carousel, cases)
 *   → how he works → who he is → talk.
 *
 * The automation chapter opens with the page's one sticky-pair section — the
 * left column pins while a six-domain index scrolls past it — because breadth
 * is exactly what a list is for.
 */
const Index = () => (
  <Page>
    <Hero />
    <Proof />
    <Problems />
    <Solutions />
    <Tracks />
    <ChapterOpener
      id="chapter-automation"
      number={chapters.automation.number}
      eyebrow={chapters.automation.eyebrow}
      title={chapters.automation.title}
      deck={chapters.automation.deck}
      domains={chapters.automation.domains}
      tone="brand"
    />
    <Systems />
    <Workflows />
    <InkBand />
    <Process />
    <Credentials />
    <CTA />
  </Page>
);

export default Index;
