import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CountUp, Reveal, Split } from "../motion";
import { highlights, statusLabel } from "../data/highlights";
import { laneById } from "../data/lanes";
import { caseBySlug, useTitle } from "../util";

const Case = () => {
  const { slug } = useParams();
  const i = highlights.findIndex((h) => h.slug === slug);
  const h = highlights[i];
  const c = h ? caseBySlug(h.slug) : undefined;
  useTitle(c ? `${c.title} · Carl Patrick Sajol` : "Work · Carl Patrick Sajol");
  if (!h || !c) return <Navigate to="/work" replace />;

  const next = highlights[(i + 1) % highlights.length];
  const nextCase = caseBySlug(next.slug)!;
  const delivered = c.status === "Delivered";
  // the headline number is shown big above; list the other measures beneath it
  const kpis = c.metrics.filter((m) => m.value.replace(/\s/g, "") !== h.value.replace(/\s/g, ""));

  return (
    <article>
      <header className="wrap case-hero">
        <Reveal><Link to="/work" className="back"><ArrowLeft /> All work</Link></Reveal>
        <Reveal delay={0.08} style={{ marginTop: 34 }}><span className="eyebrow">{h.areas.map((a) => laneById(a).label).join(" · ")}</span></Reveal>
        <h1 className="title"><Split text={c.title} immediate delay={0.15} /></h1>
        <Reveal delay={0.35}><p className="lede">{c.deck}</p></Reveal>
        <Reveal delay={0.45}>
          <dl className="case-meta">
            <div><dt>Client</dt><dd>{c.client}</dd></div>
            <div><dt>Role</dt><dd>{c.role}</dd></div>
            <div><dt>Year</dt><dd>{c.year}</dd></div>
            <div><dt>Status</dt><dd><span className={`badge${delivered ? " delivered" : ""}`}><i />{statusLabel(c.status)}</span></dd></div>
          </dl>
        </Reveal>
      </header>

      <section className="wrap result-band" aria-labelledby="res-h">
        <Reveal>
          <span className="eyebrow" id="res-h">The result</span>
          <div style={{ marginTop: 26 }}>
            <CountUp value={h.value} className="big" duration={2.2} />
          </div>
          <p className="big-label">{h.label}</p>
        </Reveal>
        <Reveal className="result-copy" delay={0.15}>
          <p className="outcome">{h.outcome}</p>
          {c.result.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </section>

      {kpis.length > 0 && (
        <section className="wrap" aria-label="More numbers">
          <div className="kpis">
            {kpis.map((m, k) => (
              <Reveal key={m.value + m.caption} className="kpi" delay={k * 0.08}>
                <CountUp value={m.value} />
                <p>{m.caption}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap" aria-labelledby="ch1">
        <div className="chapter">
          <div className="chapter-label"><b>01</b><span id="ch1">The challenge</span></div>
          <div className="chapter-body">
            {c.situation.map((p, k) => <Reveal key={p} delay={k * 0.05}><p>{p}</p></Reveal>)}
            <Reveal><p>{c.constraintIntro}</p></Reveal>
            <Reveal><p className="pull">{c.constraint}</p></Reveal>
          </div>
        </div>

        <div className="chapter">
          <div className="chapter-label"><b>02</b><span>What I built</span></div>
          <div className="chapter-body">
            <ol className="steps">
              {c.build.map((b, k) => (
                <Reveal as="li" key={b.title} className="step" delay={Math.min(k, 4) * 0.05}>
                  <div><h4>{b.title}</h4><p>{b.body}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="chapter">
          <div className="chapter-label"><b>03</b><span>How it runs</span></div>
          <div className="chapter-body">
            {c.pipeline && (
              <Reveal className="flow" aria-label="Pipeline">
                {c.pipeline.map((p, k) => (
                  <span key={p} style={{ display: "contents" }}>
                    {k > 0 && <i aria-hidden="true" />}
                    <span>{p}</span>
                  </span>
                ))}
              </Reveal>
            )}
            {c.flow && (
              <Reveal as="figure" className="flowimg">
                <img src={c.flow} alt={`The production workflow graph for ${c.title}`} loading="lazy" />
              </Reveal>
            )}
            <Reveal className="stack">{c.stack.map((s) => <span key={s}>{s}</span>)}</Reveal>
          </div>
        </div>
      </section>

      <Link to={`/work/${next.slug}`} className="wrap next-case" data-cursor="view" style={{ display: "block" }}>
        <span className="small">Next case study</span>
        <p className="title">{nextCase.title}</p>
      </Link>
    </article>
  );
};

export default Case;
