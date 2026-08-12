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
import { caseStudies, experience, otherSystems, profile, proofMetrics } from "@/data/site";
import { sectionCopy } from "@/data/copy";
import { INSTRUMENTS, Tape } from "@/components/schematic/Instruments";
import Guard from "@/components/schematic/Guard";
import WeekTrade from "@/components/schematic/WeekTrade";

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
      id="proof"
      ref={ref}
      className={`${className} bleed relative border-y border-line-strong stock-wove`}
      aria-labelledby="proof-h"
    >
      <div className="grid12 py-s6">
        <h2 id="proof-h" className="t-sub col-span-12 lg:col-span-4">
          {sectionCopy.proof.title}
        </h2>
        <p className="t-micro col-span-12 self-end text-ink-tertiary lg:col-span-7 lg:col-start-6 lg:text-right">
          {sectionCopy.proof.deck}
        </p>

        <dl className="col-span-12 relative mt-s5 grid grid-cols-2 gap-y-s6 border-t border-line-strong pt-s5 lg:grid-cols-4 lg:gap-0">
          <Tape />
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
              {(() => {
                const Instrument = INSTRUMENTS[i];
                return Instrument ? <Instrument /> : null;
              })()}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

/* ---------- 7. The three hardest builds — ranked 1 : 2, never a grid of equals ----------
   Depth, not breadth. The service lines above already link every case study by
   name; repeating all ten here as rows would read as filler. This section only
   has to prove that behind the list there is real engineering. */
export const Systems = () => {
  const { ref, className } = useEnter<HTMLElement>();
  // this section is the automation chapter's body — creative case studies
  // live inside the plate room, in their own chapter
  const automation = caseStudies.filter((c) => c.track === "automation");
  const [lead, ...rest] = automation;
  const mid = rest.slice(0, 2);

  return (
    <section id="systems" ref={ref} className={`${className} section bleed relative border-y border-line-strong stock-deep`} aria-labelledby="systems-h">
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
          className="group relative mt-s9 grid gap-s6 surface surface-hover p-s6 transition-[border-color,box-shadow] duration-[160ms] md:grid-cols-[1fr_320px] md:items-center md:p-s7"
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
          {/* the right column was empty: no n8n case defines a hero poster, so
              this half of the lead card rendered nothing. It now holds the one
              rule the system was built never to break. */}
          <Guard sentence={lead.constraint} delay={0} live />
        </Link>

        {/* rank 2 */}
        <div className="mt-s5 grid gap-s5 md:grid-cols-2">
          {mid.map((c, i) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className="group relative flex h-full flex-col surface surface-hover p-s6 transition-[border-color,box-shadow] duration-[160ms]"
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
              <Guard sentence={c.constraint} delay={-(i + 1) * 4} live />
            </Link>
          ))}
        </div>

        <p className="mt-s6">
          <ArrowLink to="/work">See all {caseStudies.length + otherSystems.length} systems</ArrowLink>
        </p>
      </div>
    </section>
  );
};

/* ---------- 9. Credentials — the recruiter's twenty seconds ---------- */
export const Credentials = () => {
  const { ref, className } = useEnter<HTMLElement>();
  return (
    <section id="credentials" ref={ref} className={`${className} section relative`} aria-labelledby="cred-h">
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
            <li key={r.company} className="grid gap-s3 border-b border-line py-s6 md:grid-cols-[1fr_2fr] md:gap-s6">
              <div>
                {/* the company is the thing a reader scans for, so it is set at
                    section size rather than as a caption above its own dates */}
                <p className="t-section text-ink">{r.company}</p>
                <p className="t-mono mt-s2 text-[0.8125rem] uppercase tracking-[0.08em] text-ink-tertiary">
                  {r.period}
                </p>
              </div>
              <div className="md:pt-s2">
                <p className="t-sub text-ink">{r.title}</p>
                <p className="t-body mt-s2 max-w-[62ch] text-ink-secondary">{r.summary}</p>
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
    <section ref={ref} className={`${className} chapter relative overflow-hidden border-t border-line`} aria-labelledby="cta-h">
      <WeekTrade />
      <div className="w-text gutter relative z-10 mx-auto text-center">
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
