import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, CalendarDays, MessageCircle, Send } from "lucide-react";
import { profile } from "@/data/site";
import { Cursor, Magnetic, Reveal, Split } from "./motion";
import { introPlays } from "./intro";
import { AskProvider, useAsk } from "./ask/Ask";

interface ShellCtx { copyEmail: () => void; toContact: () => void }
const Ctx = createContext<ShellCtx>({ copyEmail: () => {}, toContact: () => {} });
export const useShell = () => useContext(Ctx);

const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
];
const activeFor = (pathname: string) => (pathname === "/" ? "/" : pathname.startsWith("/work") ? "/work" : pathname.startsWith("/about") || pathname.startsWith("/experience") ? "/about" : "");

/* shown once per visit: the masthead letters rise, a volt bar runs, the curtain lifts */
const Curtain = () => {
  const show = introPlays;
  const [gone, setGone] = useState(!show);
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => setGone(true), 2200);
    return () => window.clearTimeout(t);
  }, [show]);
  if (gone) return null;
  return (
    <div className="curtain" aria-hidden="true">
      <div className="curtain-name">
        {"Carl Sajol".split("").map((ch, i) => <span key={i} style={{ ["--i" as string]: i }}>{ch === " " ? " " : ch}</span>)}
      </div>
      <div className="curtain-bar" />
    </div>
  );
};

const NavPill = () => {
  const { pathname } = useLocation();
  const { setOpen } = useAsk();
  const active = activeFor(pathname);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [glide, setGlide] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[active];
      setGlide(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    const t = window.setTimeout(measure, 400); // after the web font settles
    window.addEventListener("resize", measure);
    return () => { window.clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [active]);
  return (
    <nav className="navpill" aria-label="Main">
      <span className="glider" style={{ left: glide?.left ?? 0, width: glide?.width ?? 0, opacity: glide ? 1 : 0 }} aria-hidden="true" />
      {NAV.map((n) => (
        <Link key={n.to} to={n.to} ref={(el) => (refs.current[n.to] = el)} className={active === n.to ? "on" : ""} aria-current={active === n.to ? "page" : undefined}>
          {n.label}
        </Link>
      ))}
      <button type="button" className="ask-btn" onClick={() => setOpen(true)}><MessageCircle aria-hidden="true" />Ask AI</button>
    </nav>
  );
};

const Contact = () => {
  const { copyEmail } = useShell();
  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <Reveal><span className="eyebrow">Contact</span></Reveal>
        <h2 id="contact-h" className="display contact-big" style={{ marginTop: 26 }}>
          <Split text="Let's *work* together." />
        </h2>
        <Reveal className="contact-row" delay={0.2}>
          <button type="button" className="email-big" onClick={copyEmail} aria-label={`Copy ${profile.email}`}>{profile.email}</button>
          <Magnetic>
            <a className="btn gold" href={profile.calendly} target="_blank" rel="noreferrer"><span>Book a call</span><CalendarDays /></a>
          </Magnetic>
          <Magnetic>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><ArrowUpRight /></a>
          </Magnetic>
        </Reveal>
        <div className="foot">
          <span>© 2026 Carl Patrick Sajol · Philippines · UTC+8</span>
          <nav aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/about">About</Link>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </div>
      </div>
    </section>
  );
};

export const Shell = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [msg, setMsg] = useState<string | null>(null);

  const toast = useCallback((m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg(null), 2600);
  }, []);
  const copyEmail = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email).then(() => toast("Email copied"), () => (window.location.href = `mailto:${profile.email}`));
    } else {
      window.location.href = `mailto:${profile.email}`;
    }
  }, [toast]);
  const toContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // the top bar steps out of the way while reading down and comes back on the way up
  const [bar, setBar] = useState({ solid: false, away: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const away = y > 160 && y > last + 2 ? true : y < last - 2 || y <= 160 ? false : null;
      last = y;
      setBar((b) => {
        const next = { solid: y > 24, away: away === null ? b.away : away };
        return next.solid === b.solid && next.away === b.away ? b : next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctx = useMemo(() => ({ copyEmail, toContact }), [copyEmail, toContact]);

  return (
    <Ctx.Provider value={ctx}>
      <a href="#main" className="skip">Skip to content</a>
      <AskProvider>
        <Curtain />
        <header className={`topbar${bar.solid ? " solid" : ""}${bar.away ? " away" : ""}`}>
          <Link to="/" className="mark" aria-label="Carl Patrick Sajol, home"><i aria-hidden="true" />Carl Sajol</Link>
          <div className="top-right">
            <span className="avail"><span className="pulse" aria-hidden="true" /><span>Open to roles</span><span className="long">· UTC+8</span></span>
            <button type="button" className="talk" onClick={toContact}><span>Let's talk</span><Send aria-hidden="true" /></button>
          </div>
        </header>
        <main id="main" key={pathname} className="page" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Contact />
        <NavPill />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        {msg && <div className="toast" role="status">{msg}</div>}
      </AskProvider>
    </Ctx.Provider>
  );
};
