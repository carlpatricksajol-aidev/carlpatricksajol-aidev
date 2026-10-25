import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/site";
import { Magnetic, Reveal, Split, reducedMotion, useInView } from "../motion";
import { useTitle } from "../util";

/* the gold line down the timeline fills as you scroll through it */
const useRailProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { el.style.setProperty("--p", "100%"); return; }
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      el.style.setProperty("--p", `${p * 100}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return ref;
};

const COUNT: Record<number, string> = { 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine" };

const About = () => {
  useTitle("About · Carl Patrick Sajol");
  const [photo, photoIn] = useInView<HTMLDivElement>(0.2, "0px");
  const rail = useRailProgress();
  const roles = [...experience].sort((a, b) => (b.end ?? "9999").localeCompare(a.end ?? "9999") || (b.start ?? "").localeCompare(a.start ?? ""));

  return (
    <>
      <header className="wrap about-hero">
        <div>
          <Reveal><span className="eyebrow">About</span></Reveal>
          <h1 className="title"><Split text="Marketer first, *builder* by habit." immediate delay={0.15} /></h1>
          <Reveal delay={0.4}>
            <p className="lede">AI Marketing Specialist in the Philippines, working on Singapore time. I started in paid ads and social media, and now I build the AI systems that do the repetitive half of the job.</p>
          </Reveal>
        </div>
        <div ref={photo} className={`about-photo${photoIn ? " in" : ""}`}>
          <img src="/portrait-cut.webp" alt="Carl Patrick Sajol" loading="lazy" width={649} height={884} />
        </div>
      </header>

      <section className="wrap bio" aria-labelledby="bio-h">
        <Reveal><span className="eyebrow" id="bio-h">In short</span></Reveal>
        <div className="bio-body">
          <Reveal><p>I make marketing run on its own: research, content, creators, launches and reporting, wired together and checked before anything reaches a client.</p></Reveal>
          <Reveal delay={0.05}><p>Right now I'm the AI automation specialist at a performance creative agency, building the systems behind its ads: concepts, scripts, shoot guides and an AI video editor. Before that I ran marketing and automation for an ecommerce data platform on a three-month contract, and built the paid-social automation and Claude infrastructure at a mobile app company. Across those roles I've shipped 26 automations to production.</p></Reveal>
          <Reveal delay={0.1}><p>I build inside the tools a team already uses, so the work actually gets adopted, and I write every system up plainly: what it changed, and how it works.</p></Reveal>
        </div>
      </section>

      <section className="wrap" aria-labelledby="exp-h" style={{ paddingBottom: 120 }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <div>
            <Reveal><span className="eyebrow" id="exp-h">Experience</span></Reveal>
            <h2 className="title" style={{ marginTop: 20 }}><Split text={`Three years, *${COUNT[roles.length] ?? roles.length} roles.*`} /></h2>
          </div>
        </div>
        <div className="tline" ref={rail}>
          <div className="tline-rail" aria-hidden="true"><i /></div>
          {roles.map((r) => (
            <Reveal key={r.company} className={`trole${r.end === null ? " now" : ""}`}>
              <span className="when">{r.period}</span>
              <div>
                <h3>{r.title}</h3>
                <p className="co">{r.company}</p>
                <p>{r.summary}</p>
                {r.points.length > 0 && <ul>{r.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap" aria-labelledby="side-h" style={{ paddingBottom: 140 }}>
        <Reveal className="side">
          <div>
            <span className="eyebrow" id="side-h">Off the clock</span>
            <h3>Tumbang Preso</h3>
            <p>The street game every Filipino kid played with a tin can and a slipper, rebuilt as a cartoon game that runs in the browser. It has online rooms, a lobby, ranks, chat and a shop of throw trails, all on its own game server.</p>
            <div style={{ marginTop: 28 }}>
              <Magnetic><a className="btn gold" href="https://tumbang-preso.vercel.app" target="_blank" rel="noreferrer"><span>Play it</span><ArrowUpRight /></a></Magnetic>
            </div>
          </div>
          <div>
            <dl>
              <div><dt>Built with</dt><dd>three.js, cannon-es and a small Node game server</dd></div>
              <div><dt>Plays on</dt><dd>Desktop and phone browsers, no install</dd></div>
              <div><dt>Status</dt><dd>Live</dd></div>
            </dl>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default About;
