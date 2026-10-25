// What the portfolio assistant knows. Built from the same data the pages
// render, so the bot can never say something the site does not.
// Bundled and run by scripts/build-ask-kb.mjs.
import { caseStudies, experience, profile, testimonials, toolGroups } from "../src/data/site";
import { highlights, statusLabel } from "../src/lc/data/highlights";
import { lanes } from "../src/lc/data/lanes";

const bio = [
  "Carl makes marketing run on its own: research, content, creators, launches and reporting, wired together and checked before anything reaches a client.",
  "Right now he is the AI automation specialist at Creative AdBundance, a performance creative agency, and it is his only active role. Before that he ran marketing and automation for Upstack Data, an ecommerce tracking and attribution platform, on a three-month contract (May to Aug 2026), and built the paid-social automation and Claude infrastructure at Bumpy App, a dating app (Nov 2025 to Jul 2026). Across his roles he has shipped 26 automations to production, with about 500 workflow steps inside them.",
  "He started in paid ads and social media, and now builds the AI systems that do the repetitive half of the job. He builds inside the tools a team already uses, so the work gets adopted, and writes every system up plainly: what it changed, and how it works.",
];

export const buildKnowledge = () => {
  const out: string[] = [];
  const p = (s = "") => out.push(s);

  p("# Carl Patrick Sajol");
  p(`- Role: ${profile.role}`);
  p(`- Based: ${profile.location}. Timezone: ${profile.timezone}.`);
  p(`- Status: ${profile.available ? "open to new roles, remote" : "not looking right now"}.`);
  p(`- Email: ${profile.email}`);
  p(`- Book a 30-minute call: ${profile.calendly}`);
  p(`- LinkedIn: ${profile.linkedin}`);
  p("- Website: https://carlsajol.dev");
  p();
  p("## In short");
  bio.forEach((b) => p(b));
  p();
  p("## The five areas he works in");
  for (const l of lanes) {
    const proof = highlights.filter((h) => h.areas.includes(l.id)).map((h) => h.slug);
    p(`### ${l.label}`);
    p(`${l.line} ${l.detail}`);
    p(`Case studies: ${proof.join(", ")}`);
  }
  p();
  p("## Tools he uses");
  for (const g of toolGroups) p(`- ${g.group}: ${g.items.map((i) => i.label).join(", ")}`);
  p();
  p("## Experience (newest first)");
  for (const r of [...experience].sort((a, b) => (b.end ?? "9999").localeCompare(a.end ?? "9999") || (b.start ?? "").localeCompare(a.start ?? ""))) {
    p(`### ${r.title}, ${r.company} (${r.period})`);
    p(r.summary);
    r.points.forEach((x) => p(`- ${x}`));
  }
  p();
  p("## Case studies");
  p("Each one has a slug. Link one by writing [[case:slug]].");
  for (const h of highlights) {
    const c = caseStudies.find((x) => x.slug === h.slug);
    if (!c) continue;
    p();
    p(`### ${c.title}`);
    p(`- slug: ${c.slug}`);
    p(`- status: ${statusLabel(c.status)} | year: ${c.year} | client: ${c.client} | Carl's role: ${c.role}`);
    p(`- headline result: ${h.value} ${h.label}. ${h.outcome}`);
    if (c.metrics.length) p(`- numbers: ${c.metrics.map((m) => `${m.value} ${m.caption}`).join("; ")}`);
    p(`- summary: ${c.deck}`);
    p(`- the problem: ${c.situation.join(" ")} ${c.constraintIntro} ${c.constraint}`);
    p("- what he built:");
    c.build.forEach((b) => p(`  - ${b.title}: ${b.body}`));
    p(`- result: ${c.result.join(" ")}`);
    if (c.limits.length) p(`- known limits: ${c.limits.join(" ")}`);
    p(`- stack: ${c.stack.join(", ")}`);
  }
  p();
  p("## Off the clock");
  p("Tumbang Preso: the Filipino street game played with a tin can and a slipper, rebuilt by Carl as a cartoon browser game with online rooms, a lobby, ranks, chat and a shop, on its own game server. Built with three.js, cannon-es and Node. Play it at https://tumbang-preso.vercel.app");
  p();
  p("## What colleagues say");
  for (const t of testimonials) p(`- "${t.quote}" (${t.name}, ${t.role}, ${t.org})`);
  return out.join("\n");
};
