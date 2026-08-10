import { PrimaryButton, useEnter } from "@/components/primitives";
import { profile, tracks, staticAds } from "@/data/site";

/** Capped at 72vh (not 100vh) so the next section's eyebrow peeks above the
 *  fold — the evidenced fix for the "false floor" that costs a full-height
 *  hero most of its viewing time. */
const Hero = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const proofAds = staticAds.slice(0, 3);

  return (
    <section ref={ref} className={`${className} relative`}>
      <div className="w-shell gutter grid min-h-[560px] items-center gap-s8 pb-s9 pt-s9 lg:min-h-0 lg:grid-cols-12 lg:pb-s10 lg:pt-s10">
        {/* text block: cols 1-7 */}
        <div className="lg:col-span-7">
          {profile.available && (
            <p className="inline-flex items-center gap-s2 rounded-full border border-line px-s3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              <span className="t-step--1 text-ink-secondary">Available for new engagements</span>
            </p>
          )}

          <h1 className="t-step-4 mt-s5 max-w-[18ch]">
            Automation that ships finished work — not just workflows.
          </h1>

          <p className="t-step-1 mt-s5 max-w-[52ch] text-ink-secondary">
            Ad creative that clears a quality gate before it ships, and business operations wired
            into the tools your team already runs.
          </p>

          <div className="mt-s7 flex flex-wrap items-center gap-x-s6 gap-y-s4">
            <PrimaryButton href={profile.calendly} large>
              Book a 30-minute call
            </PrimaryButton>
            <a href="#video-wall" className="t-step-0 font-medium text-brand-600 hover:text-brand-700">
              Watch real client ads ↓
            </a>
          </div>
        </div>

        {/* proof object: cols 9-12, hidden below lg. A neutral mat grades the
            jump from off-white page to dark creative instead of punching a hole. */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="mat">
            <div className="grid grid-cols-3 gap-s3">
              {proofAds.map((ad) => (
                <img
                  key={ad.src}
                  src={ad.src}
                  alt={`Static ad concept: ${ad.title}`}
                  width={900}
                  height={1600}
                  className="aspect-[9/16] w-full object-cover"
                  style={{ objectPosition: "top" }}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
            <p className="t-step--2 mt-s4 text-ink-tertiary">
              Generated and QA-scored by the pipeline
            </p>
          </div>
        </div>
      </div>

      {/* two-track ledger — the 5-second answer, pinned to the bottom of the fold */}
      <div className="border-y border-line">
        <div className="w-shell gutter grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {tracks.map((t) => (
            <a
              key={t.id}
              href={`#${t.id === "automation" ? "tracks" : "logo-field"}`}
              className="group flex items-baseline gap-s4 py-s6 transition-colors duration-120 md:px-s6 md:first:pl-0 md:last:pr-0"
            >
              <span className="t-mono t-step--2 shrink-0 text-ink-tertiary transition-colors group-hover:text-brand-600">
                {t.number}
              </span>
              <span className="min-w-0">
                <span className="t-eyebrow block text-ink-tertiary">{t.label}</span>
                <span className="t-step-0 mt-s2 block text-ink-secondary">{t.body}</span>
                <span className="t-step--2 mt-s3 block text-ink-tertiary">{t.meta}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
