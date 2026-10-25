import type { LaneId } from "./lanes";

/**
 * Results first. One line per shipped system: the number that matters, what it
 * counts, and the outcome in plain words. Only live or delivered work appears;
 * a case with no entry here is not shown on the site.
 *
 * Every value is taken from the case's own metrics or result text in
 * src/data/*.ts. Nothing here is a projection.
 */
export interface Highlight {
  slug: string;
  value: string;
  label: string;
  outcome: string;
  areas: LaneId[];
}

export const highlights: Highlight[] = [
  {
    slug: "ai-video-editor",
    value: "~5 min",
    label: "from raw footage to an editable edit",
    outcome: "On the first real client job, a folder of raw creator takes became a Premiere timeline an editor could finish, in about five minutes, with every cut still re-trimmable.",
    areas: ["launch", "agents"],
  },
  {
    slug: "webhook-to-post-ads",
    value: "170",
    label: "steps in one live publisher",
    outcome: "An approved creative batch becomes correctly routed Meta ads across twenty lanes without anyone opening Ads Manager, and a duplicate never costs money.",
    areas: ["launch", "agents"],
  },
  {
    slug: "meta-reporting-warehouse",
    value: "11",
    label: "workflows rebuilding reports nightly",
    outcome: "Meta performance lands in Supabase and Airtable every night, across four lookback windows, so reporting reads a warehouse instead of the ad platform.",
    areas: ["reporting", "agents"],
  },
  {
    slug: "creator-sourcing-to-payment-pipeline",
    value: "7",
    label: "stages, from scrape to paid",
    outcome: "Building a creator roster became a pipeline run instead of a week of DMs, with one record following each creator from first scrape to payment.",
    areas: ["creators", "agents"],
  },
  {
    slug: "concepts-and-scripts-engine",
    value: "10",
    label: "point scorecard on every script",
    outcome: "Every ad script is graded on direct-response craft and swept for compliance before a strategist reads it, then filed as a doc in the team's own layout.",
    areas: ["social", "agents"],
  },
  {
    slug: "songreels",
    value: "$9.99",
    label: "per gift, launched end to end",
    outcome: "A consumer product taken from idea to a live beta: the song is written about your own photos, and the reel arrives as a gift page that opens with no signup and no app.",
    areas: ["launch"],
  },
  {
    slug: "creative-os",
    value: "3–6 min",
    label: "from a product link to a finished ad",
    outcome: "A stranger types a product name and a link, adds one photo, and gets a captioned fifteen-second vertical ad back on the same page.",
    areas: ["launch", "agents"],
  },
  {
    slug: "creator-shoot-guides",
    value: "30",
    label: "creator guides from one run",
    outcome: "Thirty creator-ready shoot guides for five client batches, each holding only that creator's scripts, for $12.57 of model spend.",
    areas: ["creators", "agents"],
  },
  {
    slug: "static-ads-service",
    value: "7/10",
    label: "minimum score before an ad ships",
    outcome: "Statics only reach the client after a vision check scores them; up to fifty renders a batch, and nothing broken gets delivered.",
    areas: ["social", "agents"],
  },
  {
    slug: "claude-mcp-server-slack-agents",
    value: "3",
    label: "Slack agents on one tool layer",
    outcome: "Anyone on the team asks the attribution platform a question in Slack and gets an answer computed from live data; the weekly digests post themselves.",
    areas: ["agents", "reporting"],
  },
  {
    slug: "meta-tiktok-ads-automation-suite",
    value: "8",
    label: "ad automations across two platforms",
    outcome: "Launching a batch of creative is a sheet and a button instead of an afternoon in Ads Manager, and a rejected TikTok ad is appealed the same day.",
    areas: ["reporting", "launch"],
  },
  {
    slug: "creative-analysis-automation",
    value: "4",
    label: "sources researched per persona",
    outcome: "One persona becomes scraped, model-analysed creative research in Notion, with every hook read off the video frame rather than copied from a caption.",
    areas: ["social", "reporting"],
  },
  {
    slug: "meta-comments-moderator",
    value: "500",
    label: "comments per run, hard-capped",
    outcome: "Spam under live ads is removed on a schedule, every decision is logged before it acts, and re-running it is always harmless.",
    areas: ["social", "agents"],
  },
  {
    slug: "footage-renamer",
    value: "0",
    label: "original files ever overwritten",
    outcome: "Raw creator clips become a correctly named, storyboard-matched folder, and QA sees missing shots at upload time instead of in the middle of an edit.",
    areas: ["creators", "agents"],
  },
  {
    slug: "ai-sdr-and-crm-bridge",
    value: "2-way",
    label: "CRM sync, one record per contact",
    outcome: "A reply gets a relevant answer the hour it arrives, and the deal stage moves in the same run instead of at the next manual review.",
    areas: ["creators", "agents"],
  },
];

/** Shown in the home page's results track, in this order. */
export const featured = [
  "ai-video-editor",
  "webhook-to-post-ads",
  "meta-reporting-warehouse",
  "creator-sourcing-to-payment-pipeline",
  "concepts-and-scripts-engine",
  "songreels",
  "creative-os",
];

export const highlightOf = (slug: string) => highlights.find((h) => h.slug === slug);

/** Status in plain words. Every case shown is live or delivered. */
export const statusLabel = (status: string) =>
  status === "Live, invite-only" ? "Live · private beta" : status === "Delivered" ? "Delivered" : "Live";
