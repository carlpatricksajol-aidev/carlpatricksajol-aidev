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
import { caseStudies, experience, otherSystems, processSteps, profile, proofMetrics, tracks } from "@/data/site";
import { sectionCopy } from "@/data/copy";

/* ---------- 2. Four production numbers ---------- */
/**
 * The ledger. Numerals in Instrument Serif at display size, edge-to-edge
 * hairlines, and a mono footnote apparatus — the qualifications sit under the
 * row as footnotes rather than shrinking the numbers into a caption.
 */
/**
 * ARCHETYPE: dense ledger band, full bleed.
 * Four numbers with footnotes IS a table, so it is shaped like one — and it is
 * the page's first full-width event rather than its flattest block. Each
 * footnote lives under its own numeral instead of pooling into a fifth,
 * headerless list nobody reads.
 */
export const Proof = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`${className} bleed border-y border-line-strong bg-surface-sunken`}
      aria-labelledby="proof-h"
    >
      <div className="grid12 py-s6">
        <h2 id="proof-h" className="t-sub col-span-12 lg:col-span-4">
          {sectionCopy.proof.title}
        </h2>
        <p className="t-micro col-span-12 self-end text-ink-tertiary lg:col-span-7 lg:col-start-6 lg:text-right">
          {sectionCopy.proof.deck}
        </p>

        <dl className="col-span-12 mt-s5 grid grid-cols-2 gap-y-s6 border-t border-line-strong pt-s5 lg:grid-cols-4 lg:gap-0">
          {proofMetrics.map((m, i) => (
            <div
              key={m.caption}
              /* partial rules that stop short of the band edges — a ledger page,
                 not a table widget */
              className={i > 0 ? "lg:border-l lg:border-line-strong lg:pl-s5" : ""}
            >
              <dt className="t-numeral tnum text-ink">
                {m.value}
                <sup className="t-mono ml-1 align-super text-[0.26em] text-ink-tertiary">{i + 1}</sup>
              </dt>
              <dd className="t-micro mt-s3 max-w-[24ch] text-ink-tertiary">{m.caption}</dd>
              <p className="t-mono mt-s4 max-w-[26ch] border-t border-line pt-s2 text-[0.6875rem] leading-[1.5] text-ink-tertiary opacity-70">
                <span className="mr-1 align-super">{i + 1}</span>
                {m.note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

/* ---------- 3. Two tracks — ARCHETYPE: full-bleed two-up fork ----------
   No header above; the two halves ARE the statement. A centre seam and two
   different ground tones make the fork visible rather than described. */
export const Tracks = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="tracks" ref={ref} className={`${className} bleed border-y border-line`} aria-label="What I build">
      <div className="grid12">
        {tracks.map((t, i) => (
          <div
            key={t.id}
            className={`col-span-12 py-s7 lg:col-span-6 ${
              i === 1
                ? "lg:col-start-7 lg:border-l lg:border-line lg:pl-s6"
                : "lg:pr-s6"
            }`}
          >
            <div className="flex items-baseline gap-s3">
              <span className={`t-mono tnum text-[0.8125rem] ${i === 1 ? "text-oxide-600" : "text-brand-600"}`}>
                {t.number}
              </span>
              <span className={`t-slug ${i === 1 ? "text-oxide-600" : "text-brand-600"}`}>{t.label}</span>
            </div>
            <h2 className="t-section mt-s4 max-w-[18ch]">{t.title}</h2>
            <p className="t-body mt-s4 max-w-[44ch] text-ink-secondary">{t.body}</p>
            <ul className="mt-s5 space-y-s3">
              {t.capabilities.map((c) => (
                <li key={c} className="grid grid-cols-[14px_1fr] gap-s3">
                  <span
                    className={`mt-2.5 h-px w-2.5 ${i === 1 ? "bg-oxide-600" : "bg-brand-600"}`}
                    aria-hidden="true"
                  />
                  <span className="t-body max-w-[44ch] text-ink-secondary">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-s5">
              <ArrowLink to={t.href}>{t.linkLabel}</ArrowLink>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- 7. Selected systems — ranked 1 : 2 : rest, never a grid of equals ---------- */
export const Systems = () => {
  const { ref, className } = useEnter<HTMLElement>();
  const [lead, ...rest] = caseStudies;
  const mid = rest.slice(0, 2);
  const tail = rest.slice(2);

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
          <ArrowLink to="/work">See all {caseStudies.length + otherSystems.length} systems</ArrowLink>
        </p>
      </div>
    </section>
  );
};

/* ---------- 8. Process — ARCHETYPE: five-column spine ----------
   It is a sequence, so it reads once, left to right. As a 3-column card grid it
   broke 3+2 across a row boundary and read as an unordered set of five things,
   which is the opposite of "the same five steps, every time". */
export const Process = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="process" ref={ref} className={`${className} section bg-surface-sunken`} aria-labelledby="process-h">
      <div className="grid12">
        <div className="col-span-12 lg:col-span-6">
          <span className="mb-s4 block h-px w-10 bg-line-edge" aria-hidden="true" />
          <p className="t-slug text-ink-tertiary">{sectionCopy.process.eyebrow}</p>
          <h2 id="process-h" className="t-section mt-s4 max-w-[18ch]">{sectionCopy.process.title}</h2>
        </div>
      </div>

      <ol className="grid12 mt-s7">
        {processSteps.map((st, i) => (
          <li
            key={st.n}
            className={`col-span-12 border-t border-line-strong pt-s4 sm:col-span-6 lg:col-span-2 ${
              i === 0 ? "" : "lg:border-l lg:pl-s4"
            } ${i > 0 ? "mt-s5 lg:mt-0" : ""}`}
          >
            <span className="t-mono tnum text-[0.8125rem] text-ink-tertiary">{st.n}</span>
            <h3 className="t-sub mt-s3 max-w-[16ch]">{st.title}</h3>
            <p className="t-small mt-s3 text-ink-secondary">{st.body}</p>
          </li>
        ))}
      </ol>
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
