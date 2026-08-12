/**
 * Plain-language copy for a non-technical buyer.
 *
 * The previous version was written engineer-to-engineer and did not survive
 * contact with a real reader. Rule for anything added here: if a business owner
 * who has never heard of MCP, n8n or a webhook can't follow it in one read,
 * it doesn't ship.
 *
 * Second rule, added after the top of the page was found to be arguing for one
 * deliverable: nothing above the service lines may be specific to ad creative.
 * A buyer who came for a CRM, a report or a lead queue has to see themselves in
 * every word before the chapters start. Creative stays reachable; it stops
 * being the subject.
 */

/**
 * INLINE EMPHASIS SYNTAX, read by <Rich> in src/components/Rich.tsx.
 *
 *   [[lift:...]]   the highlight. ONE per section, nine words max, never in a band.
 *   [[step:...]]   a phrase stepped to display ink. The workhorse.
 *   [[fig:...]]    a COUNTED number. Never a self-reported percentage.
 *   [[said:...]]   serif italic: names a term the first time it is defined.
 *   [[aside:...]]  sans italic: an aside, quieter than the sentence around it.
 *
 * The audit found zero emphasis devices in 29,000 characters of prose on this
 * site. These are deliberately sparse: if everything is emphasised, nothing is.
 */

export const hero = {
  h1: "I wire the tools you already pay for, so nobody has to move work between them.",
  deck: "Zapier, Make and n8n do the moving, ChatGPT and Claude do the reading and sorting, and it all runs on the HubSpot, Airtable, Notion and Google Sheets accounts you already have. [[lift:Nightly reporting, records kept in step, publishing, finished ad creative: same wiring.]]",
  primaryCta: "Map what repeats in 30 minutes",
  secondaryCta: "See the 26 running now",
  /** sits beside the availability dot, so the first screen is not proof-free */
  runningLine: "26 systems running in production right now",
  mapCaption: "The usual shape: your tools on the left, the wiring in the middle, the work landing back in your own accounts on the right.",
};

/* ------------------------------------------------------------------------- *
 * The spine: problem, then proof, then solution, then output.
 * Three genuinely different questions — what hurts, how it gets fixed, and
 * what you are holding at the end. If the output list ever reads as the
 * solution list in the past tense, it has stopped earning its section.
 * ------------------------------------------------------------------------- */

export interface Problem {
  title: string;
  body: string;
}

export const problemsSection = {
  eyebrow: "The problem",
  title: "Your tools all work. A person is what connects them.",
  deck: "Your records sit in one tool, your numbers in another, your files in a third, and someone spends every week carrying things between them. [[lift:None of it is a crisis. That is why it never gets fixed.]]",
};

export const problems: Problem[] = [
  {
    title: "One question, four tabs.",
    body: "The record is in the CRM, the invoice is in billing, the thread is in email, the file is in a drive. Searching takes longer than asking, so people ask, and your best person becomes the search bar.",
  },
  {
    title: "Two tools disagree and nobody knows which one is right.",
    body: "A record gets updated in one system and not the other. By the time someone notices, both versions have already been used.",
  },
  {
    title: "The weekly report exists because somebody assembles it.",
    body: "Numbers pulled out of three or four places, pasted into one sheet, checked twice, formatted so it reads properly. It is correct on Monday and stale by Wednesday.",
  },
  {
    title: "One finished thing has to be put in nine places.",
    body: "The same file, record or line of copy goes into each account, each channel, each folder. By hand, one at a time, every time, and each one is a chance to fumble a setting nobody will notice for a week.",
  },
  {
    title: "Nothing moves while one person is away.",
    body: "The steps live in their head and nowhere else. They take a week off and the queue backs up, or the work gets done by somebody guessing, which is worse.",
  },
  {
    title: "Anything that arrives after six o'clock waits until tomorrow.",
    body: "Leads, orders, forms and messages do not keep office hours. They land overnight and sit there, and the first hour of the next day goes on catching up.",
  },
];

export interface Solution {
  headline: string;
  body: string;
  proof: string;
  caseSlug?: string;
}

export const solutionsSection = {
  eyebrow: "The solution",
  title: "The same five moves, whatever the tools are",
  deck: "[[step:The order never changes, and nothing you already own gets thrown away.]] The first two moves decide what a build costs. The last three decide whether anyone still has to watch it run.",
};

export const solutions: Solution[] = [
  {
    headline: "Watch the job get done once, exactly as it is now",
    body: "Before anything is built I sit with the person who does the work and write down every step, including the two checks they do without thinking and the exceptions they handle from memory. That list is what the build gets quoted from, not a guess. It is also where we name the one thing the system must never do.",
    proof: "No number on this one. What it produces is the written rule every system on this site was built around.",
  },
  {
    headline: "Use the connection that already exists. Build the one that doesn't.",
    body: "Most tools already have a ready-made connection waiting in Zapier, Make or n8n, and where there is one, that is what gets used. Where there isn't, I build it against the tool's own controls. A tool nobody has connected before is a build, not a no.",
    proof: "[[fig:222]] steps across the live systems go straight at another company's software rather than through a ready-made connection.",
  },
  {
    headline: "Name the tool that is right, and stop copying",
    body: "One tool gets named as the one that is correct about each thing. The rest read from it instead of holding their own copy, and the numbers worth keeping get written down once, into your Airtable, Notion, Supabase or Google Sheets. After that a report is rebuilt rather than retyped.",
    proof: "How the reporting systems on this site are built: rebuilt from the source overnight, never edited by hand.",
    caseSlug: "meta-reporting-warehouse",
  },
  {
    headline: "Find the moment it should start",
    body: "Every repeating job already has one: [[said:a time on the clock, a form filled in, a row added, a file dropped in a folder, a message arriving]]. Finding that moment is most of the design. The rest is plumbing.",
    proof: "Not every job should start itself. Some live systems still wait for a person on purpose, and the handover says which.",
  },
  {
    headline: "Retry quietly, escalate loudly",
    body: "Every run writes down what it touched. Most failures are a tool being briefly unavailable, so the run tries again on its own. What it still cannot finish goes to a named person in Slack, saying which step broke. A system nobody can see is a system nobody trusts, and an untrusted system gets checked by hand, which puts the work straight back where it started.",
    proof: "Slack steps appear [[fig:22]] times across the live systems. That is where the failures land.",
    caseSlug: "meta-comments-moderator",
  },
];

export interface OutputItem {
  title: string;
  body: string;
}

export const outputSection = {
  eyebrow: "The output",
  title: "What you own on Monday",
  deck: "Five things that exist once it is done. [[lift:Each one sits in an account you already control.]]",
};

export const outputs: OutputItem[] = [
  {
    title: "A one-page map of where your work actually goes",
    body: "Every tool it passes through, what moves between them, what already runs on its own, and which steps a person still owns. Most teams I have worked with did not have one. It is the page you hand your boss when they ask what this was for.",
  },
  {
    title: "A queue that is already empty",
    body: "Records updated, rows written, files renamed and filed, versions posted with the right settings. The pile that used to be waiting on somebody at nine in the morning has already been dealt with. Where the job makes files, finished ad creative included, they land in the drive your team already opens.",
  },
  {
    title: "The systems themselves, on your login",
    body: "They sit in your own Zapier, Make or n8n account, connected with your credentials and on your billing. You can open one, pause it, change it or hand it to somebody else. Stop working with me and they keep running.",
  },
  {
    title: "A message only when you are actually needed",
    body: "Failures and judgement calls arrive in Slack or email with the run attached and the work already gathered up to that point. Nothing arrives when the job went out clean, which is what makes the quiet worth trusting.",
  },
  {
    title: "The handover, written down",
    body: "What each system does, the one rule it was built never to break, and the list of things it cannot do yet. It is the document you hand the next person you hire.",
  },
];

/* ------------------------------------------------------------------------- *
 * Five industries, one set of wiring.
 *
 * Ordered by how much there is to show, not by how the list sounds. Notes for
 * whoever edits this next:
 *
 *  - Online dating was rated thin and kept anyway, written as SCOPE, not as a
 *    claim. The work behind it is the deepest on the site, but nothing built
 *    there is dating-specific, so the entry says that out loud rather than
 *    implying category expertise.
 *  - That entry only lands if the reader knows what the first Credentials row
 *    is. The fix is three words in the Bumpy App role summary in site.ts — see
 *    the edit there. It is a resume fact and names no client.
 *  - AI automation is last on purpose. It is the practice, not a vertical;
 *    listed second it reads as a category error next to "marketing" and
 *    "online dating", so the entry says plainly that it is what the other four
 *    bought.
 *  - The client said SaaS was done "many times". The evidence is two products,
 *    so it is written as two, with private beta visible. "Twice, not once"
 *    still makes the point without colliding with the rest of the page.
 *  - No status was upgraded. site.ts marks the AI video editor "Piloted, not
 *    scaled", so its entry claims no production status.
 *  - Only approved counted numbers appear: 26 running, 500 steps, 170 steps.
 *    The 170-step system's finishing lanes and markets are real but off-list,
 *    so they are described by shape instead of counted.
 *  - Clients are named nowhere. The two products are named because they are
 *    his own. The phrase "a dating app" never appears here — only "online
 *    dating" and "a consumer app in this category".
 *  - The title deliberately echoes the solutions section. If that repetition
 *    reads as too neat once both are on screen, the alternate is "The same
 *    wiring, five different businesses."
 * ------------------------------------------------------------------------- */

export interface Industry {
  industry: string;
  work: string;
  proof: string;
  caseSlug: string;
}

export const industriesSection = {
  eyebrow: "The industries",
  title: "Five industries, one set of wiring",
  deck: "The same five moves have been sold into a working ad agency, a marketing consultancy, two software products and a consumer app. Every entry here is on this page already — a live system, a build written up, or a product you can open. Ordered by how much there is to show, not by how the list sounds.",
};

/** The one line that answers the "we have done SaaS many times" ask directly.
 *  Sits under the SaaS row, not in the deck, so it reads as evidence rather
 *  than as a boast the section then has to support. */
export const saasLine =
  "[[lift:SaaS twice, not once:]] a consumer gift product with published pricing, and a self-serve ad generator with no login at all. Both taken from an empty repo to a page a stranger can use without being taught how. Both are in private beta, and both case studies say so on their own pages.";

export const industries: Industry[] = [
  {
    industry: "Creative ad agency",
    work: "A working agency's whole production line: the concept written, the file made, the file scored before anyone sees it, the file delivered. Everything in the creative chapter below was built here.",
    proof: "The AI video editor. Raw creator footage goes in, an editable Premiere timeline comes out — every cut snapped to the real speech boundary in the audio, and every source left in the bin at full length so any cut can be re-trimmed instead of re-shot.",
    caseSlug: "ai-video-editor",
  },
  {
    industry: "Marketing and consultancy",
    work: "Two CRMs, an onboarding stack and one Notion workspace running a consultancy's client base — the contact record made to mean one thing before any agent was allowed near it.",
    proof: "A bridge that syncs both CRMs in both directions, where every write made by the sync is tagged with where it came from. A synced change cannot echo back and start the loop again. The agent that spots a real reply, classifies it, follows up and books the call sits on top of that.",
    caseSlug: "ai-sdr-and-crm-bridge",
  },
  {
    industry: "SaaS",
    work: "Two self-serve products taken from nothing to a page a stranger can use without being taught how — one consumer, one for ad teams. Both in private beta, and both case studies say so.",
    proof: "Creative AdBundance OS. Type a product name and a website, add one photo, and a captioned fifteen-second vertical ad comes back on the same page. No account, no job ID: one request held open up to twelve minutes while the whole pipeline runs.",
    caseSlug: "creative-os",
  },
  {
    industry: "Online dating",
    work: "Paid social and growth operations for a consumer app in this category — comment triage on a webhook, bulk creative upload, ads pruned on performance, reporting pulled across two platforms. None of it is dating-specific; the same wiring runs for any consumer app with an ad account.",
    proof: "A production Claude MCP server sitting over the company's own SDK, database and attribution platform, with three specialist Slack agents on one shared tool layer. The growth team asks in Slack instead of pasting an export into a chat window.",
    caseSlug: "claude-mcp-server-slack-agents",
  },
  {
    industry: "AI automation",
    work: "Not a fifth client industry — it is the practice the other four bought. 26 systems running in production, 500 steps between them, and every one of them was built inside somebody else's business.",
    proof: "The largest single system on this site: 170 steps from one webhook to finished ads live on two platforms, each lane writing its own audit line before it posts to Slack.",
    caseSlug: "webhook-to-post-ads",
  },
];

export const testimonialsSection = {
  eyebrow: "What people say",
  title: "Four people who have had to work with the output",
  deck: "Colleagues at an automation studio, not buying clients, and it is worth saying which. They are the people who inherit a system when it lands and have to keep it running.",
};

export const toolBandSection = {
  eyebrow: "The tools",
  title: "Nothing here gets replaced",
  deck: "These are the accounts the work runs on and lands in. Whatever you already pay for stays where it is and keeps its own login. [[lift:Nothing on this board gets swapped out to make a system work.]]",
};



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
    deck: "The fair question after that list is whether one person can actually cover it. These four are the answer, and every one of them can be checked.",
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
