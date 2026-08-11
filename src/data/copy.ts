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
 * The two chapters. Every domain line below maps to named systems that exist on
 * this site — the counts are the systems we can actually show, not estimates.
 */
export const chapters = {
  automation: {
    number: "01",
    eyebrow: "Chapter one",
    title: "Automation",
    deck: "The larger half of the practice: systems that run a business's routine work unattended. Two years of it, across six domains.",
    domains: [
      {
        name: "AI wired into internal tools",
        note: "MCP servers and agents that let a team ask their own database, SDK and attribution platform questions in plain English.",
        systems: "Production MCP server · 3 Slack agents · 10-tool MCP over an undocumented API",
      },
      {
        name: "Paid-social operations",
        note: "Publishing, budget scaling, appeals and pre-review handled by machines across Meta and TikTok.",
        systems: "170-node publisher · budget scaling endpoint · TikTok appeals + pre-review · bulk deletion",
      },
      {
        name: "Reporting & data warehouses",
        note: "Ad numbers pulled, cleaned and written into queryable tables every night, before anyone opens a laptop.",
        systems: "11-workflow nightly rebuild · performance DB sync · insights-to-sheets · activity logs",
      },
      {
        name: "CRM & revenue operations",
        note: "Two CRMs kept in step, replies answered at the hour they arrive, leads enriched the moment they land.",
        systems: "AI SDR agent · two-way CRM bridge · creator sourcing to payment · lead enrichment",
      },
      {
        name: "Content & production ops",
        note: "The unglamorous middle of creative work — renaming, briefing, routing — done by systems instead of evenings.",
        systems: "Footage renamer · Figma comment digest · concept pipeline",
      },
      {
        name: "Moderation & compliance",
        note: "Comments triaged with a cost-capped AI pass, activity logged, policy checked before spend.",
        systems: "AI comment moderator · Meta + TikTok activity logging",
      },
    ],
  },
  creative: {
    number: "02",
    eyebrow: "Chapter two",
    title: "AI Creative",
    deck: "The second half: pipelines that produce the ads themselves — scored before delivery, cut from real footage.",
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
    eyebrow: "The automation record",
    title: "Ten systems, hardest problem first",
    deck: "Each is a real system with a job to do, written up honestly - its one hard constraint, and what it does not do yet.",
  },
  workflows: {
    eyebrow: "Under the hood",
    title: "What the systems look like inside",
    deck: "Maps of the steps each system runs, start to finish. You don't need to read them — they're here so you can see the work is real.",
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
    deck: "Two years inside a working ad agency and a mobile app company — on live ad accounts, with real work depending on it.",
  },
  cta: {
    eyebrow: "Start here",
    title: "Tell me what eats your week",
    deck: "Name the task your team repeats most. I'll tell you straight whether it's worth automating, roughly what it takes, and where it isn't.",
  },
};
