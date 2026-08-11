import { PrimaryButton, useEnter } from "@/components/primitives";
import SystemMap from "@/components/SystemMap";
import { profile, tracks } from "@/data/site";
import { hero } from "@/data/copy";

/**
 * Capped under 100vh so the next section peeks above the fold. The role line
 * leads — this is a portfolio for a dual practice, and the two halves of the
 * title are the two chapters of the page (blue automation / oxide creative).
 */
const Hero = () => {
  const { ref, className } = useEnter<HTMLElement>();

  return (
    <section ref={ref} className={`${className} relative`}>
      <div className="grid12 min-h-[560px] items-center gap-y-s6 pb-s8 pt-s8 lg:pb-s9 lg:pt-s9">
        {/* text block: cols 1-7 */}
        <div className="col-span-12 lg:col-span-7">
          {/* the dual role, colour-split to pre-declare the two chapters */}
          <p className="t-slug">
            <span className="text-brand-600">Automation Specialist</span>
            <span className="mx-2 text-ink-tertiary" aria-hidden="true">·</span>
            <span className="text-oxide-600">AI Creative Architect</span>
          </p>

          <h1 className="t-display mt-s5 max-w-[21ch]">{hero.h1}</h1>

          <p className="t-lead mt-s5 max-w-[46ch] text-ink-secondary">{hero.deck}</p>

          <div className="mt-s6 flex flex-wrap items-center gap-x-s6 gap-y-s4">
            <PrimaryButton href={profile.calendly} large>
              {hero.primaryCta}
            </PrimaryButton>
            <a href="#problems" className="t-body font-medium text-brand-600 hover:text-brand-700">
              {hero.secondaryCta} ↓
            </a>
          </div>

          {profile.available && (
            <p className="mt-s6 inline-flex items-center gap-s2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              <span className="t-small text-ink-tertiary">Available for new engagements</span>
            </p>
          )}
        </div>

        {/* The proof object is a diagram of the work itself. Drifts slightly
            against the scroll (scroll-driven, transform-only, reduced-motion off). */}
        <div className="col-span-12 hidden lg:col-span-5 lg:block lg:pl-s7">
          <div className="sv-parallax">
            <SystemMap />
          </div>
          <p className="t-small mt-s5 text-ink-tertiary">
            The usual shape: your tools in, an agent layer, work back out.
          </p>
        </div>
      </div>

      {/* two-track ledger — the 5-second answer, pinned to the bottom of the fold */}
      <div className="border-y border-line">
        <div className="w-shell gutter grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {tracks.map((t, i) => (
            <a
              key={t.id}
              href={`#${t.id === "automation" ? "chapter-automation" : "chapter-creative"}`}
              className="group flex items-baseline gap-s4 py-s6 transition-colors duration-120 md:px-s6 md:first:pl-0 md:last:pr-0"
            >
              <span
                className={`t-mono t-slug shrink-0 transition-colors ${
                  i === 1 ? "text-oxide-600" : "text-brand-600"
                }`}
              >
                {t.number}
              </span>
              <span className="min-w-0">
                <span className="t-slug block text-ink-tertiary">{t.label}</span>
                <span className="t-body mt-s2 block text-ink-secondary">{t.body}</span>
                <span className="t-slug mt-s3 block text-ink-tertiary">{t.meta}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
