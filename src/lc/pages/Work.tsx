import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CountUp, Reveal, Split } from "../motion";
import { highlights, statusLabel } from "../data/highlights";
import { laneById, lanes, type LaneId } from "../data/lanes";
import { caseBySlug, useTitle } from "../util";

const Work = () => {
  useTitle("Work · Carl Patrick Sajol");
  const [params, setParams] = useSearchParams();
  const initial = params.get("area") as LaneId | null;
  const [area, setArea] = useState<LaneId | null>(lanes.some((l) => l.id === initial) ? initial : null);
  const shown = highlights.filter((h) => !area || h.areas.includes(area));

  const choose = (id: LaneId | null) => {
    setArea(id);
    setParams(id ? { area: id } : {}, { replace: true });
  };

  return (
    <>
      <header className="wrap page-head">
        <Reveal><span className="eyebrow">Case studies</span></Reveal>
        <h1 className="title"><Split text="Shipped work, *results first.*" immediate delay={0.15} /></h1>
        <Reveal delay={0.35}>
          <p className="lede">Every system here is live or delivered. Each one opens with what it changed, then how it was built. Client names are left out on purpose.</p>
        </Reveal>
        <Reveal delay={0.45} className="filters" role="group" aria-label="Filter by area">
          <button type="button" className="filter" aria-pressed={area === null} onClick={() => choose(null)}>All · {highlights.length}</button>
          {lanes.map((l) => (
            <button key={l.id} type="button" className="filter" aria-pressed={area === l.id} onClick={() => choose(l.id)}>{l.label}</button>
          ))}
        </Reveal>
      </header>

      <section className="wrap" aria-label="Case studies" style={{ paddingBottom: 120 }}>
        <div className="wlist">
          {shown.map((h, k) => {
            const c = caseBySlug(h.slug);
            if (!c) return null;
            return (
              <Reveal key={`${area}-${h.slug}`} delay={Math.min(k, 6) * 0.05}>
                <Link to={`/work/${h.slug}`} className="witem" data-cursor="view">
                  <div>
                    <CountUp value={h.value} />
                    <span className="num-label">{h.label}</span>
                  </div>
                  <div>
                    <h3>{c.title}</h3>
                    <div className="meta-line">
                      <span className={`badge${c.status === "Delivered" ? " delivered" : ""}`}><i />{statusLabel(c.status)}</span>
                      <span>{h.areas.map((a) => laneById(a).label).join(" · ")}</span>
                    </div>
                  </div>
                  <p>{h.outcome}</p>
                  <span className="go" aria-hidden="true"><ArrowRight /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Work;
