/**
 * Plain-language copy for a non-technical buyer.
 *
 * The previous version was written engineer-to-engineer and did not survive
 * contact with a real reader. Rule for anything added here: if a business owner
 * who has never heard of MCP, n8n or a webhook can't follow it in one read,
 * it doesn't ship.
 */

export const hero = {
  h1: "Software that does the repetitive work — and makes the ads.",
  deck: "I connect AI to the tools your team already uses, then build systems that run on their own: nightly reports, bulk ad publishing, comment cleanup, finished ad creative.",
  primaryCta: "Book a 30-minute call",
  secondaryCta: "See what's running now",
};

export interface Problem {
  symptom: string;
  detail: string;
  cost: string;
}

export const problemsSection = {
  eyebrow: "Sound familiar?",
  title: "The work nobody should be doing by hand",
  deck: "Six things I hear from almost every business I work with. If two or more of these are yours, there is probably a week a month sitting in them.",
};

export const problems: Problem[] = [
  {
    symptom: "My team retypes the same numbers into three tools.",
    detail: "The same figures get typed into a spreadsheet, then the sales tool, then the report, by hand, every single morning.",
    cost: "Typos nobody catches until a client does.",
  },
  {
    symptom: "Our weekly report takes someone a whole day.",
    detail: "Numbers get pulled from each ad platform, pasted into one sheet, checked twice and formatted before anyone can read them.",
    cost: "Decisions wait while someone formats a spreadsheet.",
  },
  {
    symptom: "Every launch means uploading the same ad over and over.",
    detail: "One ad has to go up for each platform, country and device, set up by hand, each one a chance to fumble.",
    cost: "Launches slip and wrong settings quietly burn budget.",
  },
  {
    symptom: "Half my day is answering questions in Slack.",
    detail: "The answer is already in a document or an old thread, but finding it takes longer than asking the nearest expert.",
    cost: "Your best people become the company search bar.",
  },
  {
    symptom: "We can't make ads fast enough to test them.",
    detail: "Whoever runs your ads wants fresh versions weekly, but the designer already has a queue, so the same tired ad keeps running.",
    cost: "Fewer ideas tested, so winners stay undiscovered.",
  },
  {
    symptom: "We only find out something broke when it's too late.",
    detail: "A connection between two tools quits overnight and nothing announces it, so you find out when a number looks wrong.",
    cost: "Bad numbers reach the client before you do.",
  },
];

export interface Solution {
  headline: string;
  body: string;
  proof: string;
  caseSlug?: string;
}

export const solutionsSection = {
  eyebrow: "What I build",
  title: "And what I do about each one",
  deck: "Five things I build to end that list. Each one points at a real system on this page, running today — not a description of what's possible.",
};

export const solutions: Solution[] = [
  {
    headline: "Work that runs without anyone watching",
    body: "I connect the tools you already pay for so information moves itself and routine jobs happen overnight. Every run is recorded, failures retry themselves, and if something still can't finish, a person gets told.",
    proof: "26 automations running live; the comment cleaner logs every decision and retries failures",
    caseSlug: "meta-comments-moderator",
  },
  {
    headline: "Reporting that rebuilds itself overnight",
    body: "Every night the ad numbers get pulled, cleaned and written into one set of tables your team can actually read. The report is finished before anyone opens a laptop.",
    proof: "Eleven chained workflows rebuild the ad reporting tables every night",
    caseSlug: "meta-reporting-warehouse",
  },
  {
    headline: "One creative goes out as every version",
    body: "You hand over one ad and the system builds every version it needs — video or image, iPhone or Android, each market — and posts each one with the right settings. The afternoon of uploading and double-checking disappears.",
    proof: "A 170-step system publishes twenty routed variations across five markets",
    caseSlug: "webhook-to-post-ads",
  },
  {
    headline: "Your team asks, the system answers",
    body: "I put an assistant inside the tools your staff already use and connect it to the files and records that hold the answers. Someone asks in plain English and gets a straight answer, instead of queueing behind the one person who knows.",
    proof: "Built on the same connections behind the automations running live today",
  },
  {
    headline: "Ad creative without the design queue",
    body: "Static ads are produced and scored before anyone sees them — anything under 7 out of 10 gets dropped, not shipped. Video ads are cut from your own raw footage into a timeline your editor can open and change.",
    proof: "Static ads ship at 7/10 or not at all; video cut from raw footage in about five minutes",
    caseSlug: "static-ads-service",
  },
];

/**
 * The two chapters. The automation chapter's body is organised by service line —
 * see src/data/serviceLines.ts for the spine and serviceLineCopy.ts for the
 * words; the old abstract "domains" index it replaced is gone with it.
 */
export const chapters = {
  automation: {
    number: "01",
    eyebrow: "Chapter one",
    title: "Automation",
    deck: "The main practice. Two years of building systems that run a business's routine work unattended — grouped here the way you'd actually buy them.",
  },
  creative: {
    number: "02",
    eyebrow: "Chapter two",
    title: "AI Creative",
    deck: "One line of the practice taken all the way to its own product: pipelines that produce the ads themselves — scored before delivery, cut from real footage.",
  },
};

/** Section headers, keyed by section id. */
export const sectionCopy: Record<string, { eyebrow: string; title: string; deck: string }> = {
  proof: {
    eyebrow: "Proof",
    title: "Four numbers, all from live systems",
    deck: "Not estimates. Counted from work running in production right now — twenty-six automations and the jobs they finish every day.",
  },
  systems: {
    eyebrow: "In depth",
    title: "The three hardest builds, written up",
    deck: "Behind every line above is a real system with a job to do. These three are the ones worth reading — each written up honestly: its one hard constraint, and what it does not do yet.",
  },
  workflows: {
    eyebrow: "Under the hood",
    title: "Twenty-six systems, running now",
    deck: "A map of every step each system runs, start to finish, drawn from the live workflows themselves. Filter by practice, or open any one of them full size.",
  },
  "creative-logos": {
    eyebrow: "How ads get made",
    title: "One production line, end to end",
    deck: "The tools that make one ad: writing the idea, making the picture or the cut, checking it, sending it out. Same line every time.",
  },
  "creative-video": {
    eyebrow: "Video ads",
    title: "Video ads cut from your footage",
    deck: "Raw clips in, an edited ad out, handed over as a timeline you can still change. Press play — nothing loads until you do.",
  },
  "creative-static": {
    eyebrow: "Static ads",
    title: "Eleven concepts from one batch",
    deck: "One brief, eleven different takes. Every one scored before it ships — anything under 7 out of 10 is dropped, not sent to you to fix.",
  },
  process: {
    eyebrow: "How I work",
    title: "The same five steps, every time",
    deck: "Find the task that repeats. Decide what must never break. Build the check before the volume. Hand back something you can edit.",
  },
  credentials: {
    eyebrow: "Background",
    title: "Where this work was built",
    deck: "Two years inside a mobile app company, a working ad agency and a marketing consultancy — on live ad accounts and live client systems, with real work depending on it.",
  },
  cta: {
    eyebrow: "Start here",
    title: "Tell me what eats your week",
    deck: "Name the task your team repeats most. I'll tell you straight whether it's worth automating, roughly what it takes, and where it isn't.",
  },
};
