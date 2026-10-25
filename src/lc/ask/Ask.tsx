import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, X } from "lucide-react";
import { highlights } from "../data/highlights";
import { caseBySlug } from "../util";
import { reducedMotion } from "../motion";
import { offlineAnswer } from "./offline";

/* Set VITE_ASK_URL at build time to the deployed ask-api endpoint. Without it,
   or when that endpoint is down, the assistant uses its prepared answers. */
const ASK_URL = (import.meta.env.VITE_ASK_URL as string | undefined) ?? "";

export const SUGGESTIONS = [
  "What has Carl built that's live right now?",
  "Is he a fit for an AI marketing role?",
  "Write 3 ad hooks for a meal-prep app",
  "How would you automate a content calendar?",
  "What tools does he use?",
  "How do I reach him?",
];

type Msg = { role: "user" | "assistant"; content: string; done?: boolean };
interface AskCtx { open: boolean; setOpen: (v: boolean) => void; ask: (q: string) => void; msgs: Msg[]; busy: boolean; live: boolean }
const Ctx = createContext<AskCtx>({ open: false, setOpen: () => {}, ask: () => {}, msgs: [], busy: false, live: false });
export const useAsk = () => useContext(Ctx);

export const AskProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(Boolean(ASK_URL));
  const liveRef = useRef(Boolean(ASK_URL));
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  const write = (content: string, done = false) =>
    setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content, done }]);

  /* prepared answers still arrive word by word, so both modes feel the same */
  const typeOut = (full: string) =>
    new Promise<void>((resolve) => {
      if (reducedMotion()) { write(full, true); return resolve(); }
      const words = full.split(/(\s+)/);
      let i = 0;
      const t = window.setInterval(() => {
        i += 3;
        write(words.slice(0, i).join(""), i >= words.length);
        if (i >= words.length) { window.clearInterval(t); resolve(); }
      }, 28);
    });

  const ask = useCallback(async (q: string) => {
    const question = q.trim().slice(0, 1200);
    if (!question || busy) return;
    setOpen(true);
    const history = [...msgsRef.current, { role: "user" as const, content: question }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      if (liveRef.current) {
        try {
          const res = await fetch(ASK_URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ messages: history.slice(-10).map(({ role, content }) => ({ role, content })) }),
          });
          if (res.status === 429) { await typeOut("That's a lot of questions in a short time. Give it a few minutes, or email Carl directly at carlpatricksajol@gmail.com."); return; }
          if (!res.ok || !res.body) throw new Error(String(res.status));
          const reader = res.body.getReader();
          const dec = new TextDecoder();
          let acc = "";
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            acc += dec.decode(value, { stream: true });
            write(acc);
          }
          write(acc || "Sorry, no answer came back. Try again?", true);
          return;
        } catch {
          liveRef.current = false;
          setLive(false);
        }
      }
      await typeOut(offlineAnswer(question));
    } finally {
      setBusy(false);
    }
  }, [busy]);

  const value = useMemo(() => ({ open, setOpen, ask, msgs, busy, live }), [open, ask, msgs, busy, live]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <AskPanel />
    </Ctx.Provider>
  );
};

/* ---- answers: a tiny, safe renderer for **bold**, "- " bullets, links and [[case:slug]] cards ---- */
const CaseCard = ({ slug }: { slug: string }) => {
  const { setOpen } = useAsk();
  const h = highlights.find((x) => x.slug === slug);
  const c = caseBySlug(slug);
  if (!h || !c) return null;
  return (
    <Link to={`/work/${slug}`} className="ask-case" onClick={() => setOpen(false)}>
      <b>{h.value}</b>
      <span>{c.title}</span>
      <ArrowRight />
    </Link>
  );
};

const inline = (s: string, key: string): ReactNode[] =>
  s.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\[\[case:[a-z0-9-]+\]\])/g).filter(Boolean).map((part, i) => {
    const k = `${key}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={k}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      const url = part.replace(/[.,]$/, "");
      return <a key={k} className="inline" href={url} target="_blank" rel="noreferrer">{url.replace(/^https?:\/\/(www\.)?/, "")}</a>;
    }
    const m = part.match(/^\[\[case:([a-z0-9-]+)\]\]$/);
    if (m) return <Link key={k} className="inline" to={`/work/${m[1]}`}>{caseBySlug(m[1])?.title ?? m[1]}</Link>;
    return part;
  });

export const Answer = ({ text, streaming }: { text: string; streaming: boolean }) => {
  // hide a half-typed [[case: token while it streams in
  const clean = streaming ? text.replace(/\[\[[^\]]*$/, "") : text;
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={`ul-${blocks.length}`}>{list.map((l, i) => <li key={i}>{inline(l, `li-${blocks.length}-${i}`)}</li>)}</ul>);
    list = [];
  };
  clean.split("\n").forEach((raw) => {
    const line = raw.trim();
    const card = line.match(/^\[\[case:([a-z0-9-]+)\]\]$/);
    if (/^[-*•]\s+/.test(line)) { list.push(line.replace(/^[-*•]\s+/, "")); return; }
    flush();
    if (!line) return;
    if (card) blocks.push(<CaseCard key={`c-${blocks.length}`} slug={card[1]} />);
    else blocks.push(<p key={`p-${blocks.length}`}>{inline(line, `p-${blocks.length}`)}</p>);
  });
  flush();
  return <>{blocks}{streaming && <span className="caret" aria-hidden="true" />}</>;
};

/* ---- the input, shared by the hero card and the panel ---- */
const useTypingPlaceholder = (active: boolean) => {
  const [ph, setPh] = useState(SUGGESTIONS[0]);
  useEffect(() => {
    if (!active || reducedMotion()) return;
    let q = 0, c = 0, dir = 1, wait = 0;
    const t = window.setInterval(() => {
      const s = SUGGESTIONS[q];
      if (wait > 0) { wait -= 1; return; }
      c += dir;
      setPh(s.slice(0, c) || " ");
      if (c >= s.length) { dir = -1; wait = 40; }
      if (c <= 0) { dir = 1; q = (q + 1) % SUGGESTIONS.length; wait = 4; }
    }, 45);
    return () => window.clearInterval(t);
  }, [active]);
  return ph;
};

const AskForm = ({ autoFocus = false, typing = false, id }: { autoFocus?: boolean; typing?: boolean; id: string }) => {
  const { ask, busy } = useAsk();
  const [v, setV] = useState("");
  const [focus, setFocus] = useState(false);
  const ph = useTypingPlaceholder(typing && !focus && !v);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) window.setTimeout(() => ref.current?.focus(), 350); }, [autoFocus]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!v.trim()) return;
    ask(v);
    setV("");
  };
  return (
    <form className="askform" onSubmit={submit} role="search">
      <label htmlFor={id} className="skip">Ask a question about Carl or about marketing</label>
      <input id={id} ref={ref} value={v} onChange={(e) => setV(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        placeholder={typing ? ph : "Ask a follow-up"} maxLength={1200} autoComplete="off" enterKeyHint="send" />
      <button type="submit" className="send" disabled={busy || !v.trim()} aria-label="Ask"><ArrowUp /></button>
    </form>
  );
};

/* ---- the card in the hero ---- */
export const AskBox = () => {
  const { ask, live } = useAsk();
  return (
    <div className="askbox">
      <div className="askbox-head">
        <b><i aria-hidden="true" />Ask my AI</b>
        <span className={`mode${live ? " live" : ""}`}><i />{live ? "Live" : "Ready"}</span>
      </div>
      <p>It knows every case study here. Ask about my work, or bring a marketing problem.</p>
      <AskForm id="ask-hero" typing />
      <div className="chips">
        {[SUGGESTIONS[0], SUGGESTIONS[2], SUGGESTIONS[1]].map((s) => (
          <button key={s} type="button" className="chip" onClick={() => ask(s)}>{s}</button>
        ))}
      </div>
    </div>
  );
};

/* ---- the conversation, sliding in from the right ---- */
const AskPanel = () => {
  const { open, setOpen, msgs, ask, live, busy } = useAsk();
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" }); }, [msgs]);
  if (!open) return null;
  return (
    <>
      <div className="askpanel-veil" onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className="askpanel" role="dialog" aria-modal="true" aria-label="Ask about Carl">
        <div className="askpanel-head">
          <div>
            <h2>Ask about Carl</h2>
            <span className={`mode${live ? " live" : ""}`}><i />{live ? "Live AI, grounded in this portfolio" : "Prepared answers from this portfolio"}</span>
          </div>
          <button type="button" className="x" onClick={() => setOpen(false)} aria-label="Close"><X /></button>
        </div>
        <div className="askpanel-body" ref={body} aria-live="polite">
          {msgs.length === 0 && (
            <div className="ask-empty">
              <h3>What do you want to know?</h3>
              <p>Ask about Carl's work, his results, or a marketing problem you're stuck on.</p>
              <div className="chips">
                {SUGGESTIONS.map((s) => <button key={s} type="button" className="chip" onClick={() => ask(s)}>{s}</button>)}
              </div>
            </div>
          )}
          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="msg user">{m.content}</div>
            ) : (
              <div key={i} className="msg bot">
                {m.content ? <Answer text={m.content} streaming={!m.done && busy && i === msgs.length - 1} /> : <span className="thinking" aria-label="Thinking"><i /><i /><i /></span>}
              </div>
            ),
          )}
        </div>
        <div className="askpanel-foot">
          <AskForm id="ask-panel" autoFocus />
          <small>Answers come from Carl's case studies. AI can be wrong, so email him for anything that matters.</small>
        </div>
      </aside>
    </>
  );
};
