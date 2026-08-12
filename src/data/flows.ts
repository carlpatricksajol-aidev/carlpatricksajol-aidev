// AUTO-GENERATED. Real production workflow graphs, rendered from their own node
// positions and connection lists rather than screenshotted — so they carry no
// other product's UI, and stay legible at any zoom.
export interface Flow {
  src: string;
  title: string;
  note: string;
  feature: boolean;
  /** real node count, read off the plate itself. These sum to 500 and peak at
   *  170 — the two numbers the proof ledger claims, from the ledger's source. */
  steps: number;
}

export const flows: Flow[] = [
  { src: "/flows/meta-comments-moderator-auto-delete-fixed.svg", title: "AI Comment Moderator", note: "Scheduled run dedupes ad posts, caps 500 comments, rule-screens them, sends only ambiguous ones to an OpenRouter agent, then marks processed.", feature: true , steps: 22 },
  { src: "/flows/meta-campaign-scaling-operation.svg", title: "Budget Scaling Endpoint", note: "Webhook parses a scaling command, switches into pause, CBO or ABO budget updates on Meta, logs to Sheets, and responds synchronously.", feature: true , steps: 11 },
  { src: "/flows/meta-campaign-insights-update-supabase.svg", title: "Campaign Insights Chain", note: "Sub-workflow pulls 14/28/30-day campaign insights with OS breakdown into Supabase, then a Limit node hands off to the ad-set workflow.", feature: true , steps: 15 },
  { src: "/flows/phase-1-creative-analysis-automation-v2.svg", title: "Competitor Creative Research", note: "Claude picks keywords, four scrapers run with wait-and-retry polling loops, then vision analysis writes hooks and patterns into Notion.", feature: true , steps: 52 },
  { src: "/flows/webhook-to-post-ads.svg", title: "Meta Ad Publish Pipeline", note: "Webhook-triggered 170-node pipeline dedupes against existing ads, splits video/image and Android/iOS, then fans creative uploads across five market branches.", feature: true , steps: 170 },
  { src: "/flows/campaigns-adset-sync.svg", title: "Meta to Airtable Sync", note: "Schedule diffs Meta campaigns and ad sets against Airtable, upserting each level and re-fetching campaigns to link ad sets to parents.", feature: true , steps: 14 },
  { src: "/flows/performance-db-sync.svg", title: "Nightly Performance Sync", note: "Daily 2AM job joins Meta insights with four record sources through a merge, then creates or updates each performance record by existence check.", feature: true , steps: 11 },
  { src: "/flows/tiktok-activities-logging.svg", title: "TikTok Budget Change Log", note: "Schedule pulls TikTok campaigns and ad groups for both platforms, dedupes, diffs against a sheet, and appends only detected budget changes.", feature: true , steps: 15 },
  { src: "/flows/meta-ad-set-insights-14d-update-supabase.svg", title: "Ad Set 14-Day Update", note: "Four parallel 14-day ad-set queries merge into one Supabase row update per set, then the workflow calls its 28-day sibling.", feature: false , steps: 10 },
  { src: "/flows/meta-ad-set-28d-insights-update-supabase.svg", title: "Ad Set 28-Day Update", note: "Merges list, metrics, country and device calls on a 28-day window into Supabase rows, then chains to the 30-day workflow.", feature: false , steps: 10 },
  { src: "/flows/meta-ad-set-30d-insights-update-supabase.svg", title: "Ad Set 30-Day Update", note: "Sub-workflow merges four 30-day ad-set calls (list, metrics, country, device) into Supabase updates, then hands off to the ads insights workflow.", feature: false , steps: 10 },
  { src: "/flows/meta-ad-set-insights-create-rows-supabase.svg", title: "Ad Set Row Creator", note: "Four parallel Meta calls (ad sets, metrics, country, device) merge into one row, guarded by a data-table existence check, then chain onward.", feature: false , steps: 11 },
  { src: "/flows/need-to-publish-meta-total-of-ads-sync.svg", title: "Ad Totals Sync", note: "Schedule walks Meta campaigns then their ads, updates a data table and Sheets, then reconciles a second sheet pass behind Limit.", feature: false , steps: 12 },
  { src: "/flows/meta-ads-insight-create-rows-supabase.svg", title: "Ads 7-Day Row Create", note: "Sub-workflow loops active campaigns in batches, pulls 7-day ad insights, inserts Supabase rows, then Limit triggers the update workflow once.", feature: false , steps: 10 },
  { src: "/flows/second-step-airtable-update-v2.svg", title: "Airtable Creative Backfill", note: "Sub-workflow finds Airtable rows with an empty creative file, matches Drive folders, then patches or posts each file inside a batch loop.", feature: false , steps: 14 },
  { src: "/flows/meta-check-active-campaign-with-ads-insights-goo.svg", title: "Campaign Insights To Sheets", note: "Schedule batches active campaigns, fetches ad insights per campaign, and appends or updates Sheets rows with a Wait node throttling each pass.", feature: false , steps: 9 },
  { src: "/flows/meta-campaign-insights-create-rows-supabase.svg", title: "Campaign Row Creator", note: "Pulls 7-day campaign insights with OS breakdown, inserts into a data table and Supabase, then Limit calls the ad-set creation workflow.", feature: false , steps: 8 },
  { src: "/flows/phase-2-claude-iteration.svg", title: "Claude Brief Iteration", note: "Webhook sets a Notion brief to Generating, merges Meta API data with a signal library, and Claude writes an iterated brief page.", feature: false , steps: 12 },
  { src: "/flows/phase-3-claude-new-concept.svg", title: "Claude Concept Generator", note: "Webhook flips a Notion brief to Generating, merges Meta API data with a signal library, then Claude writes the concept page.", feature: false , steps: 12 },
  { src: "/flows/meta-insights-deletion-supabase.svg", title: "Insights Table Reset", note: "Scheduled wipe empties Supabase ads, ad sets and campaigns through three batch-delete loops, then calls the campaign row-creation workflow to rebuild.", feature: false , steps: 14 },
  { src: "/flows/meta-activities-logging.svg", title: "Meta Activity Log", note: "Schedule pulls Meta ad account activity records, splits them, normalises fields in code, and appends or updates rows in a Google Sheet.", feature: false , steps: 5 },
  { src: "/flows/meta-ads-insights-update-supabase.svg", title: "Multi-Window Ads Insights", note: "Sub-workflow fans one trigger into 14/28/30-day Meta insight branches, each batching campaigns through split-out loops into Supabase row updates.", feature: false , steps: 22 },
  { src: "/flows/meta-check-new-created-ads.svg", title: "New Ad Detector", note: "Schedule reads a sheet of ads and inserts only rows missing from the data table, giving a four-node idempotent new-ad detector.", feature: false , steps: 4 },
  { src: "/flows/meta-total-ads-sheets-data-table.svg", title: "Sheet To Table Upsert", note: "Four-node schedule reads sheet rows, compares against the data table, and upserts, keeping ad totals mirrored between Sheets and n8n storage.", feature: false , steps: 4 },
  { src: "/flows/first-step-slack-airtable-v2.svg", title: "Slack Intake To Airtable", note: "Slack trigger filters and parses a post, checks Airtable for an existing record, creates one, then Limit calls the second-step workflow.", feature: false , steps: 8 },
  { src: "/flows/tiktok-creative-pre-review.svg", title: "TikTok Pre-Review Gate", note: "Webhook routes a video to iOS or one of two Android upload endpoints, then logs TikTok's pre-review verdict to Sheets and Slack.", feature: false , steps: 15 },
];
