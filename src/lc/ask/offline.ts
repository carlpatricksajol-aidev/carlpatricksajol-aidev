// Prepared answers, used when the live assistant is not reachable. Same
// output format as the live one ([[case:slug]] cards, "- " bullets, **bold**),
// built only from the site's own data, so nothing here can drift from it.
import { caseStudies, experience, profile, toolGroups } from "@/data/site";
import { highlights } from "../data/highlights";
import { lanes } from "../data/lanes";

const text = (s: string) => ` ${s.toLowerCase().replace(/[^a-z0-9$%+ ]+/g, " ")} `;
const any = (q: string, words: string[]) => words.some((w) => q.includes(` ${w} `));
const caseLine = (slug: string) => {
  const h = highlights.find((x) => x.slug === slug);
  return h ? `- **${h.value}** ${h.label}` : "";
};

// generic words never decide which case study a question is about
const STOP = new Set(("the a an and or of to in on for with how what does did done is are was were be has have had carl he his him it its that this these those me my you your about can could would should will just really much many more most also than then them they who which do any some there get got use used using make made tell show give "
  + "built build builds live work works worked result results system systems ai project projects right now today thing things best").split(" "));

const bestCase = (q: string) => {
  const words = q.split(" ").filter((w) => w.length > 2 && !STOP.has(w));
  if (!words.length) return null;
  let best: { slug: string; score: number } | null = null;
  for (const h of highlights) {
    const c = caseStudies.find((x) => x.slug === h.slug);
    if (!c) continue;
    const hay = text(`${c.title} ${c.deck} ${h.label} ${h.outcome} ${c.stack.join(" ")} ${c.oneLiner}`);
    const score = words.reduce((n, w) => n + (hay.includes(` ${w}`) ? 1 : 0), 0) / words.length;
    if (!best || score > best.score) best = { slug: h.slug, score };
  }
  return best && best.score >= 0.5 ? best.slug : null;
};

export const offlineAnswer = (question: string): string => {
  const q = text(question);
  const book = `book a call: ${profile.calendly}`;

  if (any(q, ["salary", "rate", "rates", "pay", "compensation", "expected", "budget", "charge", "price"]))
    return `Carl prefers to talk pay and contract terms directly, so the best route is to ${book}. He's open to full-time remote roles and works on UTC+8, the same clock as Singapore.`;

  if (any(q, ["email", "contact", "reach", "call", "book", "calendly", "meet", "talk", "linkedin", "interview"]))
    return `Email Carl at **${profile.email}**, or ${book}. He's on LinkedIn too: ${profile.linkedin}\n\nHe's open to remote roles and works on UTC+8, the same clock as Singapore.`;

  if (any(q, ["where", "based", "location", "timezone", "time zone", "remote", "singapore", "philippines", "available", "availability", "open to"]))
    return `Carl is based in the Philippines and works remotely on UTC+8, the same clock as Singapore. He's open to new roles right now. Want to talk? ${book}`;

  if (any(q, ["hook", "hooks", "headline", "script", "copy", "caption", "ugc"]))
    return `The full assistant writes these for your product; right now you're getting the prepared answers. Here's the frame Carl's script system grades every hook against:\n- **Open on the viewer's problem**, in their words, in the first two seconds.\n- **Make one specific claim** with a number or a before and after.\n- **Earn the product mention**: it arrives as the answer, not the opener.\n\nEvery script in that system is scored on ten points before a strategist reads it.\n[[case:concepts-and-scripts-engine]]`;

  if (any(q, ["tool", "tools", "stack", "skill", "skills", "tech", "software", "platform", "n8n", "zapier", "make", "code", "python", "claude", "gpt"]))
    return `Carl's day-to-day tools:\n${toolGroups.slice(0, 5).map((g) => `- **${g.group}:** ${g.items.map((i) => i.label).join(", ")}`).join("\n")}\n\nHe builds inside the tools a team already uses, so the work actually gets adopted.`;

  if (any(q, ["experience", "background", "career", "role", "roles", "job", "jobs", "worked", "companies", "history", "years", "resume", "cv"])) {
    const roles = [...experience].sort((a, b) => (b.end ?? "9999").localeCompare(a.end ?? "9999") || (b.start ?? "").localeCompare(a.start ?? "")).slice(0, 4);
    return `Three years in marketing, starting in paid ads and social, now building the AI systems behind them. Most recent roles:\n${roles.map((r) => `- **${r.title}**, ${r.company} (${r.period})`).join("\n")}\n\nThe full timeline is on the About page.`;
  }

  if (any(q, ["why", "fit", "hire", "strength", "strengths", "good at", "best at", "stand out", "different", "value", "qualified"]))
    return `Three reasons Carl fits an AI marketing role:\n- **He ships to production.** 26 automations shipped so far, with about 500 workflow steps inside them.\n- **He's a marketer first.** Paid ads and social came before the code, so the systems serve the campaign.\n- **He measures it.** Every case study opens with what changed, then how it works.\n[[case:ai-video-editor]]\n[[case:webhook-to-post-ads]]`;

  const slug = bestCase(q);
  if (slug) {
    const h = highlights.find((x) => x.slug === slug)!;
    return `${h.outcome}\n[[case:${slug}]]`;
  }

  if (any(q, ["result", "results", "impact", "number", "numbers", "metric", "achievement", "proud", "best work", "biggest", "built", "build", "projects", "live", "portfolio", "work"]))
    return `A few results from Carl's live systems:\n${highlights.slice(0, 4).map((h) => caseLine(h.slug)).join("\n")}\n\nThe two most worth opening:\n[[case:${highlights[0].slug}]]\n[[case:${highlights[1].slug}]]`;

  const lane = lanes.find((l) => any(q, l.label.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3)));
  if (lane) {
    const proof = highlights.filter((h) => h.areas.includes(lane.id)).slice(0, 2);
    return `${lane.detail}\n${proof.map((h) => `[[case:${h.slug}]]`).join("\n")}`;
  }

  if (any(q, ["automate", "automation", "ai", "agent", "agents", "workflow", "marketing", "content", "campaign", "launch", "report", "reporting", "creator", "creators", "influencer", "ads"]))
    return `Carl's rule of thumb: automate the step that repeats every week and needs no taste, then put a check in front of anything a client will see. Start with one workflow, measure the hours it saves, and only then add the next. The full assistant can get specific about your setup; for now, here's how that looks in practice:\n[[case:meta-reporting-warehouse]]\n[[case:creator-sourcing-to-payment-pipeline]]`;

  if (any(q, ["hi", "hello", "hey", "yo", "sup", "good morning", "good evening"]))
    return `Hi! Ask me anything about Carl's work: what he's built, the results, the tools he uses, or how to reach him.`;

  return `Carl Patrick Sajol is an AI Marketing Specialist in the Philippines. He runs campaigns and builds the agents behind them: content, creators, launches and reporting, with 26 automations shipped to production.\n\nTry asking what he's built, why he fits an AI marketing role, or how to reach him.`;
};
