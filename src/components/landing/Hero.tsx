import { PrimaryButton, useEnter } from "@/components/primitives";
import SystemMap from "@/components/SystemMap";
import { profile } from "@/data/site";
import { hero } from "@/data/copy";

/**
 * Capped under 100vh so the next section peeks above the fold.
 *
 * Two things used to happen in the first twenty pixels that no wording further
 * down could undo. The role line was colour-split blue/oxide to pre-declare two
 * co-equal chapters, and a two-track ledger sat pinned under the fold splitting
 * the page 50/50 between automation and ad creative. Geometry argues louder than
 * copy: ad creative is one of eight service lines, so the fork is gone and the
 * role line is one tone. The ledger's job — a fact on the first screen — is now
 * done by the running-systems line beside the availability dot.
 */
const Hero = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section ref={ref} className={`${className} relative`}>
      <div className="grid12 min-h-[560px] items-center gap-y-s6 pb-s8 pt-s8 lg:pb-s9 lg:pt-s9">
        {/* text block: cols 1-7 */}
        <div className="col-span-12 lg:col-span-7">
          <p className="t-slug text-ink-tertiary">
            Automation Specialist
            <span className="mx-2" aria-hidden="true">·</span>
            AI Creative Architect
          </p>

          <h1 className="t-display t-display--long mt-s5 max-w-[22ch]">{hero.h1}</h1>

          <p className="t-lead mt-s5 max-w-[48ch] text-ink-secondary">{hero.deck}</p>

          <div className="mt-s6 flex flex-wrap items-center gap-x-s6 gap-y-s4">
            <PrimaryButton href={profile.calendly} large>
              {hero.primaryCta}
            </PrimaryButton>
            <a href="#workflows" className="t-body font-medium text-brand-600 hover:text-brand-700">
              {hero.secondaryCta} ↓
            </a>
          </div>

          <div className="mt-s6 flex flex-wrap items-center gap-x-s5 gap-y-s3">
            {profile.available && (
              <p className="inline-flex items-center gap-s2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                <span className="t-small text-ink-tertiary">Available for new engagements</span>
              </p>
            )}
            <p className="t-small text-ink-tertiary">{hero.runningLine}</p>
          </div>
        </div>

        {/* The proof object is a literal diagram of the work, drawn in the same
            notation as the 26 plates further down. It now runs on phones too:
            hiding the hero's only component below 1024px left the first screen
            with nothing on it. */}
        <div className="col-span-12 lg:col-span-5 lg:pl-s7">
          <SystemMap />
          <p className="t-small mt-s5 max-w-[38ch] text-ink-tertiary">{hero.mapCaption}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
