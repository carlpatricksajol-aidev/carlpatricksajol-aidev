import { Link } from "react-router-dom";
import {
  ArrowLink,
  ArrowRight,
  MetricRow,
  PrimaryButton,
  SectionHeader,
  StatusDot,
  useEnter,
} from "@/components/primitives";
import { caseStudies, experience, processSteps, profile, proofMetrics, tracks } from "@/data/site";
import { sectionCopy } from "@/data/copy";

/* ---------- 2. Four production numbers ---------- */
/**
 * The ledger. Numerals in Instrument Serif at display size, edge-to-edge
 * hairlines, and a mono footnote apparatus — the qualifications sit under the
 * row as footnotes rather than shrinking the numbers into a caption.
 */
export const Proof = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section ref={ref} className={`${className} border-y border-line bg-surface-sunken`} aria-labelledby="proof-h">
      <div className="w-shell gutter py-s7">
        <h2 id="proof-h" className="sr-only-heading">Production results</h2>
        <p className="t-body max-w-[54ch] text-ink-secondary">{sectionCopy.proof.deck}</p>

        <dl className="mt-s6 grid grid-cols-2 gap-x-s6 gap-y-s6 border-t border-line-strong pt-s6 lg:grid-cols-4">
          {proofMetrics.map((m, i) => (
            <div key={m.caption}>
              <dt className="t-numeral text-ink">
                {m.value}
                <sup className="t-mono ml-1 align-super text-[0.28em] text-ink-tertiary">{i + 1}</sup>
              </dt>
              <dd className="t-micro mt-s3 max-w-[26ch] text-ink-tertiary">{m.caption}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-s6 border-t border-line pt-s4">
          {proofMetrics.map((m, i) => (
            <li key={m.note} className="t-micro text-ink-tertiary">
              <span className="mr-2 align-super text-[0.75em]">{i + 1}</span>
              {m.note}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ---------- 3. The two tracks ---------- */
export const Tracks = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="tracks" ref={ref} className={`${className} section`} aria-labelledby="tracks-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="tracks-h"
          eyebrow="Two ways I help"
          title="Two tracks, one discipline"
          deck="One is the work behind the scenes. The other is the work your customers actually see."
        />
        <div className="mt-s9 grid gap-s8 md:grid-cols-2 md:gap-0">
          {tracks.map((t, i) => (
            <div key={t.id} className={i === 1 ? "md:border-l md:border-line md:pl-s8" : "md:pr-s8"}>
              <div className="flex items-baseline gap-s3">
                <span className="t-mono t-slug text-ink-tertiary">{t.number}</span>
                <span className="t-slug text-brand-600">{t.label}</span>
              </div>
              <h3 className="t-sub mt-s3 max-w-[26ch]">{t.title}</h3>
              <p className="t-body mt-s3 max-w-[46ch] text-ink-secondary">{t.body}</p>
              <ul className="mt-s5 space-y-s3">
                {t.capabilities.map((c) => (
                  <li key={c} className="grid grid-cols-[16px_1fr] gap-s3">
                    <span className="mt-2.5 h-px w-2 bg-line-interactive" aria-hidden="true" />
                    <span className="t-body max-w-[46ch] text-ink-secondary">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-s6">
                <ArrowLink to={t.href}>{t.linkLabel}</ArrowLink>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- 7. Selected systems — ranked 1 : 2 : rest, never a grid of equals ---------- */
export const Systems = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const [lead, ...rest] = caseStudies;
  const mid = rest.slice(0, 2);
  const tail = rest.slice(2, 6);

  return (
    <section id="systems" ref={ref} className={`${className} section`} aria-labelledby="systems-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="systems-h"
          eyebrow={sectionCopy.systems.eyebrow}
          title={sectionCopy.systems.title}
          deck={sectionCopy.systems.deck}
        />

        {/* rank 1 */}
        <Link
          to={`/work/${lead.slug}`}
          className="group mt-s9 grid gap-s6 surface surface-hover p-s6 transition-[border-color,box-shadow] duration-[160ms]  md:grid-cols-[1fr_auto] md:items-center md:p-s7"
        >
          <div>
            <div className="flex flex-wrap items-center gap-s3">
              <span className="t-slug text-ink-tertiary">{lead.trackLabel}</span>
              <span className="inline-flex items-center gap-s2">
                <StatusDot live={lead.status === "Live in production"} />
                <span className="t-slug text-ink-tertiary">{lead.status}</span>
              </span>
            </div>
            <h3 className="t-section mt-s3 max-w-[22ch]">{lead.title}</h3>
            <p className="t-lead mt-s4 max-w-[52ch] text-ink-secondary">{lead.deck}</p>
            <div className="mt-s6 flex flex-wrap gap-x-s7 gap-y-s4">
              {lead.metrics.slice(0, 2).map((m) => (
                <div key={m.caption}>
                  <p className="t-numeral text-ink">{m.value}</p>
                  <p className="t-slug mt-1 max-w-[22ch] text-ink-tertiary">{m.caption}</p>
                </div>
              ))}
            </div>
            <p className="arrow-link t-body mt-s6">
              Read the case study <ArrowRight />
            </p>
          </div>
          {lead.hero?.poster && (
            <div className="phone-frame w-[184px] shrink-0 justify-self-start md:justify-self-end">
              <div className="aspect-[9/16] bg-surface-ink">
                <img src={lead.hero.poster} alt="" width={720} height={1280} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </Link>

        {/* rank 2 */}
        <div className="mt-s5 grid gap-s5 md:grid-cols-2">
          {mid.map((c) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className="group flex flex-col surface surface-hover p-s6 transition-[border-color,box-shadow] duration-[160ms] "
            >
              <div className="flex flex-wrap items-center gap-s3">
                <span className="t-slug text-ink-tertiary">{c.trackLabel}</span>
                <span className="inline-flex items-center gap-s2">
                  <StatusDot live={c.status === "Live in production"} />
                  <span className="t-slug text-ink-tertiary">{c.status}</span>
                </span>
              </div>
              <h3 className="t-sub mt-s3 max-w-[26ch]">{c.title}</h3>
              <p className="t-body mt-s3 max-w-[34ch] text-ink-secondary">{c.oneLiner}</p>
              <p className="arrow-link t-body mt-auto pt-s5">
                Read the case study <ArrowRight />
              </p>
            </Link>
          ))}
        </div>

        {/* rank 3 — rows outscan cards at a fraction of the height */}
        <ul className="mt-s5 border-t border-line">
          {tail.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                to={`/work/${c.slug}`}
                className="group grid grid-cols-[1fr_auto] items-center gap-s4 py-s5 transition-colors duration-120 hover:bg-surface-sunken"
              >
                <span className="min-w-0">
                  <span className="t-sub block text-ink">{c.title}</span>
                  <span className="t-small mt-1 block text-ink-tertiary">
                    {c.trackLabel} · {c.status}
                  </span>
                </span>
                <span className="text-brand-600 transition-transform duration-[160ms] group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-s6">
          <ArrowLink to="/work">See all {caseStudies.length + 8} systems</ArrowLink>
        </p>
      </div>
    </section>
  );
};

/* ---------- 8. Process — removes the "what is working with him like" objection ---------- */
export const Process = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="process" ref={ref} className={`${className} bg-surface-sunken`} aria-labelledby="process-h">
      <div className="w-shell gutter section">
        <SectionHeader
          split
          id="process-h"
          eyebrow={sectionCopy.process.eyebrow}
          title={sectionCopy.process.title}
          deck={sectionCopy.process.deck}
        />
        <ol className="mt-s9 grid gap-s6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <li key={s.n} className="border-t border-line pt-s4">
              <span className="t-mono t-slug text-ink-tertiary">{s.n}</span>
              <h3 className="t-sub mt-s2 max-w-[26ch]">{s.title}</h3>
              <p className="t-body mt-s2 max-w-[38ch] text-ink-secondary">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ---------- 9. Credentials — the recruiter's twenty seconds ---------- */
export const Credentials = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="credentials" ref={ref} className={`${className} section`} aria-labelledby="cred-h">
      <div className="w-shell gutter">
        <SectionHeader
          split
          id="cred-h"
          eyebrow={sectionCopy.credentials.eyebrow}
          title={sectionCopy.credentials.title}
          deck={sectionCopy.credentials.deck}
        />
        <ul className="mt-s8 border-t border-line">
          {experience.slice(0, 3).map((r) => (
            <li key={r.company} className="grid gap-s2 border-b border-line py-s5 md:grid-cols-[1fr_2fr] md:gap-s6">
              <div>
                <p className="t-sub text-ink">{r.company}</p>
                <p className="t-slug mt-1 text-ink-tertiary">{r.period}</p>
              </div>
              <div>
                <p className="t-body font-medium text-ink">{r.title}</p>
                <p className="t-body mt-1 max-w-[62ch] text-ink-secondary">{r.summary}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-s6">
          <ArrowLink to="/experience">Full experience and stack</ArrowLink>
        </p>
      </div>
    </section>
  );
};

/* ---------- 10. CTA — one action, nothing else on screen ---------- */
export const CTA = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section ref={ref} className={`${className} chapter border-t border-line`} aria-labelledby="cta-h">
      <div className="w-text gutter mx-auto text-center">
        <h2 id="cta-h" className="t-section mx-auto max-w-[20ch]">
          {sectionCopy.cta.title}
        </h2>
        <p className="t-lead mx-auto mt-s4 max-w-[46ch] text-ink-secondary">
          {sectionCopy.cta.deck}
        </p>
        <div className="mt-s7 flex flex-col items-center gap-s4">
          <PrimaryButton href={profile.calendly} large>
            Book a 30-minute call
          </PrimaryButton>
          <a href={`mailto:${profile.email}`} className="link t-body">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
};
