/**
 * The service-line spine.
 *
 * This is how a buyer shops — dashboards, CRMs, lead gen, email, Meta, TikTok —
 * rather than how an engineer would file the work. Every plate and every case
 * study is tagged to exactly one line, so the automation practice can be shown
 * by breadth instead of as one flat list of systems.
 *
 * `evidence` is deliberate and load-bearing: three of these lines were built
 * inside client accounts and have no public artefact. They are described by
 * scope, never dressed up with invented visuals.
 */
export type LineId =
  | "meta-ads"
  | "dashboards"
  | "tiktok"
  | "ai-assistants"
  | "crm"
  | "lead-gen"
  | "email"
  | "creative-ops";

export interface ServiceLine {
  id: LineId;
  name: string;
  promise: string;
  detail: string;
  deliverables: string[];
  evidence: string;
  /** "live" = we can show the running graph. "client" = built in a client account. */
  proof: "live" | "client";
  caseSlugs: string[];
}

/** Copy is filled from src/data/serviceLineCopy.ts; structure lives here. */
export const lineOrder: LineId[] = [
  "meta-ads",
  "dashboards",
  "ai-assistants",
  "creative-ops",
  "crm",
  "tiktok",
  "lead-gen",
  "email",
];

/** Which rendered workflow plate belongs to which line. All 26 are assigned. */
export const flowLine: Record<string, LineId> = {
  // --- Meta Ads operations (7)
  "webhook-to-post-ads": "meta-ads",
  "meta-campaign-scaling-operation": "meta-ads",
  "meta-comments-moderator-auto-delete-fixed": "meta-ads",
  "meta-check-new-created-ads": "meta-ads",
  "meta-activities-logging": "meta-ads",
  "need-to-publish-meta-total-of-ads-sync": "meta-ads",
  "meta-total-ads-sheets-data-table": "meta-ads",

  // --- Dashboards & reporting (12) — the largest group by volume
  "meta-insights-deletion-supabase": "dashboards",
  "meta-campaign-insights-create-rows-supabase": "dashboards",
  "meta-campaign-insights-update-supabase": "dashboards",
  "meta-ad-set-insights-create-rows-supabase": "dashboards",
  "meta-ad-set-insights-14d-update-supabase": "dashboards",
  "meta-ad-set-28d-insights-update-supabase": "dashboards",
  "meta-ad-set-30d-insights-update-supabase": "dashboards",
  "meta-ads-insight-create-rows-supabase": "dashboards",
  "meta-ads-insights-update-supabase": "dashboards",
  "meta-check-active-campaign-with-ads-insights-goo": "dashboards",
  "performance-db-sync": "dashboards",
  "campaigns-adset-sync": "dashboards",

  // --- TikTok operations (2)
  "tiktok-creative-pre-review": "tiktok",
  "tiktok-activities-logging": "tiktok",

  // --- Creative production ops (5)
  "first-step-slack-airtable-v2": "creative-ops",
  "second-step-airtable-update-v2": "creative-ops",
  "phase-1-creative-analysis-automation-v2": "creative-ops",
  "phase-2-claude-iteration": "creative-ops",
  "phase-3-claude-new-concept": "creative-ops",
};

/** Which case study belongs to which line. */
export const caseLine: Record<string, LineId> = {
  "webhook-to-post-ads": "meta-ads",
  "meta-comments-moderator": "meta-ads",
  "meta-tiktok-ads-automation-suite": "meta-ads",
  "meta-reporting-warehouse": "dashboards",
  "claude-mcp-server-slack-agents": "ai-assistants",
  "creative-analysis-automation": "creative-ops",
  "footage-renamer": "creative-ops",
  "figma-comment-digest": "creative-ops",
  "creator-sourcing-to-payment-pipeline": "crm",
  "ai-sdr-and-crm-bridge": "crm",
};

/** The plate that best represents each line in its row. */
export const lineHeroFlow: Record<LineId, string | null> = {
  "meta-ads": "/flows/detail/webhook-to-post-ads.svg",
  dashboards: "/flows/detail/performance-db-sync.svg",
  tiktok: "/flows/detail/tiktok-creative-pre-review.svg",
  "ai-assistants": null,
  crm: null,
  "lead-gen": null,
  email: null,
  "creative-ops": "/flows/detail/phase-1-creative-analysis-automation-v2.svg",
};
