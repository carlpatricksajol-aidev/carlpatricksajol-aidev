import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ArrowRight, MetricRow, PrimaryButton, PhoneFrame, StatusDot } from "@/components/primitives";
import PipelineDiagram from "@/components/PipelineDiagram";
import { caseStudies, profile } from "@/data/site";

/**
 * One layout, eleven fixed slots, driven entirely by the typed record in
 * src/data/site.ts. Authors fill slots; they cannot reorder them. A slot with
 * no honest content renders nothing — it is never padded.
 */
const CaseStudy = () => {
  const { slug } = useParams();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const study = caseStudies[index];

  useEffect(() => {
    if (!study) return;
    const previous = document.title;
    document.title = `${study.title} — ${profile.name}`;
    return () => {
      document.title = previous;
    };
  }, [study]);

  if (!study) return <Navigate to="/work" replace />;

  const next = caseStudies[(index + 1) % caseStudies.length];
  const isLive = study.status === "Live in production";

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader backTo={{ to: "/work", label: "Work" }} centerLabel={study.title} />

      <main id="main" tabIndex={-1} className="outline-none">
        {/* 1 — header */}
        <header className="w-shell gutter pt-s9 md:pt-s10">
          <div className="w-text">
            <p className="t-eyebrow text-brand-600">{study.trackLabel}</p>
            <h1 className="t-step-4 mt-s4 max-w-[20ch]">{study.title}</h1>
            <p className="t-step-1 mt-s5 max-w-[50ch] text-ink-secondary">{study.deck}</p>
          </div>

          <dl className="rule-grid mt-s8 grid grid-cols-2 sm:grid-cols-4">
            {[
              ["Client", study.client],
              ["Role", study.role],
              ["Year", study.year],
            ].map(([k, v]) => (
              <div key={k} className="px-s4 py-s4">
                <dt className="t-step--2 text-ink-tertiary">{k}</dt>
                <dd className="t-step-0 mt-1 text-ink">{v}</dd>
              </div>
            ))}
            <div className="px-s4 py-s4">
              <dt className="t-step--2 text-ink-tertiary">Status</dt>
              <dd className="t-step-0 mt-1 flex items-center gap-s2 text-ink">
                <StatusDot live={isLive} />
                {study.status}
              </dd>
            </div>
          </dl>
        </header>

        {/* 2 — metrics */}
        <section className="w-shell gutter mt-s8" aria-label="Key numbers">
          <div className="w-wide">
            <MetricRow items={study.metrics} />
          </div>
        </section>

        {/* 3 — hero artefact */}
        {study.hero && (
          <figure className="w-shell gutter mt-s8">
            {study.hero.type === "video" && study.hero.poster ? (
              <div className="w-[240px] sm:w-[280px]">
                <PhoneFrame>
                  <img src={study.hero.poster} alt="" width={720} height={1280} className="h-full w-full object-cover" />
                </PhoneFrame>
              </div>
            ) : (
              <div className="mat w-[240px] sm:w-[280px]">
                <img src={study.hero.src} alt="" width={900} height={1600} className="aspect-[9/16] w-full object-cover" />
              </div>
            )}
            <figcaption className="t-step--2 mt-s4 text-ink-tertiary">{study.hero.caption}</figcaption>
          </figure>
        )}

        {/* 4 — situation */}
        <section className="w-shell gutter section" aria-labelledby="situation">
          <div className="w-prose">
            <h2 id="situation" className="t-step-3">The situation</h2>
            {study.situation.map((p) => (
              <p key={p} className="t-step-1 mt-s4 text-ink-secondary">{p}</p>
            ))}
          </div>
        </section>

        {/* 5 — the hard constraint */}
        <section className="w-shell gutter pb-s9" aria-labelledby="constraint">
          <div className="w-prose">
            <h2 id="constraint" className="t-step-3">The hard constraint</h2>
            <p className="t-step-1 mt-s4 text-ink-secondary">{study.constraintIntro}</p>
            <blockquote className="mt-s5 rounded-md border border-line bg-surface-sunken p-s5">
              <p className="t-step-2 text-ink">{study.constraint}</p>
            </blockquote>
          </div>
        </section>

        {/* 6 — what I built */}
        <section className="w-shell gutter pb-s9" aria-labelledby="built">
          <div className="w-prose">
            <h2 id="built" className="t-step-3">What I built</h2>
          </div>
          {study.pipeline && study.pipeline.length > 0 && (
            <div className="w-wide mt-s6">
              <PipelineDiagram stages={study.pipeline} />
            </div>
          )}
          <div className="w-prose">
            <ol className="mt-s6 grid grid-cols-[auto_1fr] gap-x-s5">
              {study.build.map((step, i) => (
                <li key={step.title} className="col-span-2 grid grid-cols-subgrid">
                  <span className="t-mono t-step--2 border-l border-line-subtle pb-s6 pl-s4 pt-1 text-ink-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pb-s6">
                    <h3 className="t-step-2 max-w-[26ch]">{step.title}</h3>
                    <p className="t-step-0 mt-s2 max-w-[62ch] text-ink-secondary">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 — result */}
        <section className="w-shell gutter pb-s9" aria-labelledby="result">
          <div className="w-prose">
            <h2 id="result" className="t-step-3">The result</h2>
            {study.result.map((p) => (
              <p key={p} className="t-step-1 mt-s4 text-ink-secondary">{p}</p>
            ))}
          </div>
        </section>

        {/* 8 — what it doesn't do yet. Mandatory; never softened into a roadmap. */}
        <section className="w-shell gutter pb-s9" aria-labelledby="limits">
          <div className="w-wide rounded-lg border border-line bg-surface-sunken p-s6">
            {/* ranked with its siblings: this is a peer section, not a footnote */}
            <h2 id="limits" className="t-step-3">What it doesn't do yet</h2>
            <ul className="mt-s4 space-y-s3">
              {study.limits.map((l) => (
                <li key={l} className="grid grid-cols-[16px_1fr] gap-s3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full ring-1 ring-line-interactive" aria-hidden="true" />
                  <span className="t-step-0 text-ink-secondary">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9 — stack, at the bottom */}
        {/* "Built with" is genuinely subordinate, so it is a label rather than a
            heading — the heading outline should not list it as a peer section */}
        <section className="w-shell gutter pb-s9" aria-labelledby="stack">
          <p id="stack" className="t-step--2 text-ink-tertiary">Built with</p>
          <ul className="mt-s4 flex flex-wrap gap-s2">
            {study.stack.map((s) => (
              <li key={s} className="rounded-xs border border-line bg-surface-raised px-s3 py-1.5">
                <span className="t-step--1 text-ink-secondary">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 10 — next */}
        <nav className="border-t border-line" aria-label="Next case study">
          <Link to={`/work/${next.slug}`} className="group block transition-colors duration-120 hover:bg-surface-sunken">
            <div className="w-shell gutter grid grid-cols-[1fr_auto] items-center gap-s4 py-s7">
              <span>
                <span className="t-step--2 block text-ink-tertiary">Next case study</span>
                <span className="t-step-2 mt-s2 block max-w-[30ch] text-ink">{next.title}</span>
              </span>
              <span className="text-brand-600 transition-transform duration-[160ms] group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </div>
          </Link>
        </nav>

        {/* 11 — CTA */}
        <section className="chapter border-t border-line">
          <div className="w-text gutter mx-auto text-center">
            <h2 className="t-step-3 mx-auto max-w-[22ch]">Have a problem shaped like this one?</h2>
            <p className="t-step-1 mx-auto mt-s4 max-w-[44ch] text-ink-secondary">
              Thirty minutes is usually enough to tell whether it's worth building.
            </p>
            <div className="mt-s7">
              <PrimaryButton href={profile.calendly} large>Book a 30-minute call</PrimaryButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CaseStudy;
