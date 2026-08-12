// AUTO-GENERATED copy, reviewed by hand. Structure and tagging live in
// ./serviceLines.ts — this file is only the words.
import type { LineId } from "./serviceLines";

export interface LineCopy {
  id: LineId;
  name: string;
  promise: string;
  detail: string;
  deliverables: string[];
  evidence: string;
  proof: "live" | "client";
}

export const lineCopy: Record<LineId, LineCopy> = {
  "meta-ads": {
    id: "meta-ads",
    name: "Meta Ads Automation",
    promise: "Launch one creative across every market without touching Ads Manager.",
    detail: "One approved creative is fanned out into twenty correctly named and correctly routed ad variations — two media types, two platforms, five markets — and pushed live. Budgets can be raised, lowered or paused on a single command, and an automatic moderator screens incoming comments against your rules, escalating only the genuinely ambiguous ones for a closer read.",
    deliverables: ["Twenty routed ad variations from one creative", "Comment moderation with a full audit trail", "Budget pause and change controls"],
    evidence: "Live: 170-step publisher, budget control, AI comment moderation with retry, bulk delete, activity logs.",
    proof: "live",
  },
  "dashboards": {
    id: "dashboards",
    name: "Dashboards & Reporting",
    promise: "Yesterday's real numbers waiting for you every morning.",
    detail: "Eleven linked jobs rebuild your reporting tables overnight — clearing yesterday's rows, recreating campaign, ad set and ad records, then refreshing them against seven, fourteen, twenty-eight and thirty-day windows. A separate nightly sync joins ad performance with four other record sources, so spend, results and account history sit in one place instead of four tabs.",
    deliverables: ["Nightly-rebuilt campaign, ad set and ad tables", "Rolling 7, 14, 28 and 30-day views", "One reporting home in Sheets, Airtable or Notion"],
    evidence: "Twelve of twenty-six live workflows; plus Supabase and Notion dashboards for a marketing consultancy.",
    proof: "live",
  },
  "tiktok": {
    id: "tiktok",
    name: "TikTok Ads Automation",
    promise: "Policy problems caught before spend, rejections appealed for you.",
    detail: "Creative is checked against policy before any money goes behind it, so the obvious violations surface while they are still cheap to fix. When something is rejected anyway, the rejection notice is read for you, the affected ads identified and the appeal filed — and every budget change across campaigns and ad groups is compared against what was there before, so only real changes get recorded.",
    deliverables: ["A policy check that runs before spend", "Automatic appeals from every rejection notice", "A clean log of real budget changes"],
    evidence: "Live automations: pre-spend creative review, rejection-to-appeal filing, budget change logging across campaigns and ad groups.",
    proof: "live",
  },
  "ai-assistants": {
    id: "ai-assistants",
    name: "Internal AI Assistants",
    promise: "Your team asks a question and gets your own data back.",
    detail: "Your own systems — customer database, internal tools, attribution platform — get connected so an AI assistant can look things up and act on them directly, instead of a person copy-pasting between tabs. That has shipped as three specialist assistants living in Slack (one for user questions, one for acquisition performance, one for creative concepts) and as production connectors built on Model Context Protocol, the standard for handing an assistant a set of tools it is allowed to use.",
    deliverables: ["Assistants that answer inside Slack", "Your systems connected as tools they can use", "A search assistant over your team's files"],
    evidence: "Production connectors over an internal database and attribution platform, three Slack agents, one Drive assistant.",
    proof: "live",
  },
  "crm": {
    id: "crm",
    name: "CRM & Pipelines",
    promise: "A pipeline your team trusts, with no double entry.",
    detail: "Full builds in HubSpot or GoHighLevel: lead capture, deal stages, follow-up sequences and the reporting sitting on top of them. Where two systems both hold customer records, they are kept in step in both directions, with each synced change marked at its source so an update never bounces back and forth forever.",
    deliverables: ["A built pipeline with stages and owners", "Two-way sync between your two systems", "Follow-up sequences and pipeline dashboards"],
    evidence: "Client-account work: HubSpot and GoHighLevel builds, a two-way Systeme.io-GoHighLevel bridge, creator sourcing to payment.",
    proof: "client",
  },
  "lead-gen": {
    id: "lead-gen",
    name: "Lead Generation & Enrichment",
    promise: "Genuine replies spotted, answered and turned into booked calls.",
    detail: "An outbound assistant reads incoming replies, tells a real human answer from an auto-responder, works out what the person is actually asking for, follows up and books the call. Separately, every inbound lead is filled out the moment it arrives with company size, industry, website and profile details, then scored and sent to the right person instead of sitting in a form queue.",
    deliverables: ["An assistant that replies and books calls", "Inbound leads scored and routed on arrival", "Lead records filled out automatically"],
    evidence: "Client-account work: an outbound reply-and-book agent, real-time lead enrichment and scoring, creator fit-scoring.",
    proof: "client",
  },
  "email": {
    id: "email",
    name: "Email Sequences & Deliverability",
    promise: "Follow-up that runs itself, on a sending setup done right.",
    detail: "A six-email recovery sequence runs from day zero to day sixteen for anyone who starts signing up and stops, triggered by what each person actually did, and pulls them out the moment they pay. Alongside it: nurture, re-engagement and event-triggered sequences in HubSpot or GoHighLevel, plus the sending setup behind them — sender authentication, click-tracking on your own domain, and a gradual warm-up before volume goes up.",
    deliverables: ["A six-email abandoned-signup recovery sequence", "Nurture and re-engagement sequences in your CRM", "Sending setup that keeps mail out of spam"],
    evidence: "Client-account work: day 0-16 recovery sequence, HubSpot and GoHighLevel nurture flows, full deliverability setup.",
    proof: "client",
  },
  "creative-ops": {
    id: "creative-ops",
    name: "Creative Production Ops",
    promise: "Less admin between a brief and a finished ad.",
    detail: "The dull middle of production gets handled: a creator's messy uploads are matched to the right storyboard shot by actually looking at the footage, then renamed the same way every time, and a designer's revision brief stays current as comments land on the design file. An intake form can also carry straight through to fifteen scripted concept variants with slides, and requests raised in Slack land as proper records instead of scrollback.",
    deliverables: ["Footage renamed to match your storyboard", "An always-current revision brief for designers", "Fifteen scripted concept variants from one form"],
    evidence: "Live: footage renamer with a vision check, Figma comment digest, concept pipeline, Slack-to-Airtable intake.",
    proof: "live",
  },
};
