import { Link } from "react-router-dom";
import {
  ArrowRight, Bell, Bot, CalendarCheck, Clock, FileText, Flag, GitBranch, LayoutTemplate, ListChecks, Mail,
  MessageSquare, MousePointerClick, SquareKanban, ArrowRightLeft, Tag, UserPlus, Users, Webhook, Zap,
} from "lucide-react";
import { Reveal, Split } from "../motion";
import { useTitle } from "../util";
import { flows, funnel, ghlCapabilities, type Flow, type IconKey, type Step } from "../data/highlevel";

const ICONS: Record<IconKey, typeof Zap> = {
  form: FileText, user: UserPlus, tag: Tag, mail: Mail, sms: MessageSquare, wait: Clock, branch: GitBranch,
  bot: Bot, bell: Bell, kanban: SquareKanban, calendar: CalendarCheck, goal: Flag, webhook: Webhook,
  task: ListChecks, page: LayoutTemplate, click: MousePointerClick, sync: ArrowRightLeft, users: Users,
};

const KIND: Record<Step["k"], string> = { trigger: "Trigger", action: "Action", wait: "Wait", if: "If / else", goal: "Goal" };

const Node = ({ s }: { s: Step }) => {
  const I = ICONS[s.icon];
  return (
    <div className={`gnode ${s.k}`}>
      <span className="gic" aria-hidden="true">{s.k === "trigger" ? <Zap /> : <I />}</span>
      <span className="gtx">
        <span className="gkind">{KIND[s.k]}</span>
        <b>{s.t}</b>
        {s.sub && <span className="gsub">{s.sub}</span>}
      </span>
    </div>
  );
};

const Steps = ({ steps }: { steps: Step[] }) => (
  <ol className="gsteps">
    {steps.map((s, k) => (
      <li key={k} className={s.k === "if" ? "gif-li" : undefined}>
        <Node s={s} />
        {s.k === "if" && (
          <div className="gbranches">
            <div className="gbranch yes"><span className="glab">{s.yesLabel || "Yes"}</span><Steps steps={s.yes || []} /></div>
            <div className="gbranch no"><span className="glab">{s.noLabel || "No"}</span><Steps steps={s.no || []} /></div>
          </div>
        )}
      </li>
    ))}
  </ol>
);

const FlowCard = ({ f, i }: { f: Flow; i: number }) => (
  <Reveal as="article" className="gflow" delay={(i % 2) * 0.08}>
    <header className="gflow-head">
      <span className="gnum">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <h3>{f.title}</h3>
        <p>{f.job}</p>
      </div>
    </header>
    <div className="gcanvas">
      <span className="grecreated">Recreated · no client data</span>
      <Steps steps={f.steps} />
    </div>
  </Reveal>
);

const HighLevel = () => {
  useTitle("GoHighLevel · Carl Patrick Sajol");
  return (
    <>
      <header className="wrap ghl-hero">
        <Reveal><span className="eyebrow">GoHighLevel</span></Reveal>
        <h1 className="title"><Split text="HighLevel, built *end to end.*" immediate delay={0.15} /></h1>
        <Reveal delay={0.35}>
          <p className="lede">
            Websites and funnels, lead capture, follow-up, nurture, pipelines and tags, AI conversation agents, and the
            bridges that connect HighLevel to the rest of the stack. Built for a marketing consultancy and its client
            accounts, 2024 to 2026.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="ghl-note">
            Those accounts are under NDA, so the workflows below are redrawn from the builds with placeholder names
            and no client data. The steps are the ones that ran.
          </p>
        </Reveal>
      </header>

      <section className="wrap" aria-labelledby="ghl-caps-h">
        <h2 className="ghl-hidden" id="ghl-caps-h">What I build in HighLevel</h2>
        <div className="ghl-caps">
          {ghlCapabilities.map((c, k) => (
            <Reveal key={c.title} className="ghl-cap" delay={(k % 4) * 0.06}>
              <span className="gnum">{String(k + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section ghl-funnel-sec" aria-labelledby="ghl-funnel-h"><div className="wrap">
        <div className="section-head">
          <div>
            <Reveal><span className="eyebrow">Sites and funnels</span></Reveal>
            <h2 id="ghl-funnel-h" className="title" style={{ marginTop: 20 }}><Split text="The page is the *first step.*" /></h2>
          </div>
          <Reveal delay={0.15}><p className="lede">Built in the HighLevel builder, so every form, calendar and button already feeds the workflows below. Nothing is copied between tools by hand.</p></Reveal>
        </div>
        <Reveal className="ghl-funnel">
          <span className="grecreated">Recreated · no client data</span>
          <ol>
            {funnel.map((p, k) => (
              <li key={p.t}>
                <div className="gpage" aria-hidden="true"><i /><i /><i /><b /></div>
                <span className="gnum">{String(k + 1).padStart(2, "0")}</span>
                <b>{p.t}</b>
                <span>{p.sub}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div></section>

      <section className="wrap" aria-labelledby="ghl-flows-h" style={{ paddingBottom: 120 }}>
        <div className="section-head">
          <div>
            <Reveal><span className="eyebrow">Workflows</span></Reveal>
            <h2 id="ghl-flows-h" className="title" style={{ marginTop: 20 }}><Split text="Triggers, tags, *pipelines.*" /></h2>
          </div>
          <Reveal delay={0.15}><p className="lede">Six of the workflows I build most, drawn the way the HighLevel builder lays them out: a trigger, then actions, waits, branches and a goal that ends the run.</p></Reveal>
        </div>
        <div className="gflows">
          {flows.map((f, k) => <FlowCard key={f.id} f={f} i={k} />)}
        </div>
        <Reveal className="ghl-more">
          <p>The AI reply agent and the two-way CRM bridge behind these are written up in full as a case study.</p>
          <Link className="btn" to="/work/ai-sdr-and-crm-bridge"><span>Read the case study</span><ArrowRight /></Link>
        </Reveal>
      </section>
    </>
  );
};

export default HighLevel;
