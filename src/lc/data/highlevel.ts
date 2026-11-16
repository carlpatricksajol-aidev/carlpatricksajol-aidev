/**
 * GoHighLevel work, shown on /highlevel.
 *
 * The client accounts these were built in are under NDA and no screenshots were kept, so every workflow
 * here is redrawn from the build, with placeholder names and no client data, and the page says so.
 * Only patterns Carl built are drawn: websites and funnels, lead capture, follow-up, nurture, onboarding,
 * AI conversation agents, the Systeme.io sale sync and the Notion stage sync (see automationCases.ts and
 * the White Key Marketing role in site.ts). No result numbers: none were measured, so none are claimed.
 */
export type IconKey =
  | "form" | "user" | "tag" | "mail" | "sms" | "wait" | "branch" | "bot" | "bell" | "kanban"
  | "calendar" | "goal" | "webhook" | "task" | "page" | "click" | "sync" | "users";

export interface Step {
  k: "trigger" | "action" | "wait" | "if" | "goal";
  t: string;
  sub?: string;
  icon: IconKey;
  yes?: Step[];
  no?: Step[];
  yesLabel?: string;
  noLabel?: string;
}

export interface Flow {
  id: string;
  title: string;
  job: string;
  steps: Step[];
}

export const ghlCapabilities = [
  { title: "Websites and funnels", body: "Landing pages, opt-in funnels and booking pages built in the HighLevel builder, with forms, calendars and tracking wired to the workflows behind them." },
  { title: "Lead capture", body: "Every form, chat and lead magnet lands as one contact, tagged by source, with an opportunity in the right pipeline and the owner notified." },
  { title: "Follow-up", body: "Speed-to-lead SMS and email that start within a minute, stop the moment someone books, and hand warm replies to a person." },
  { title: "Nurture", body: "Multi-step email and SMS sequences on tags and triggers, with goals that pull people out as soon as they act." },
  { title: "Pipelines, tags and triggers", body: "Stages that move themselves from what the contact did, a tag scheme the team can read, and triggers that keep the CRM honest." },
  { title: "AI conversation agents", body: "OpenAI-backed agents that answer inbound messages, qualify the lead and book the call before a person is involved." },
  { title: "Integrations", body: "HighLevel connected to Systeme.io, Notion, Slack and Google Maps through n8n, Zapier, webhooks and the API, including a two-way sync no connector offered." },
  { title: "Client onboarding", body: "Won deals start onboarding on their own: welcome email, intake form, kickoff task and the client's workspace created." },
];

export const funnel = [
  { t: "Landing page", sub: "Offer + opt-in form" },
  { t: "Lead magnet", sub: "Delivered by email" },
  { t: "Thank-you page", sub: "Book a call" },
  { t: "Calendar", sub: "Synced availability" },
  { t: "Confirmation", sub: "Reminders by SMS + email" },
];

export const flows: Flow[] = [
  {
    id: "capture",
    title: "Lead capture to pipeline",
    job: "A lead magnet opt-in becomes a tagged contact, an opportunity and a delivered guide in one run.",
    steps: [
      { k: "trigger", icon: "form", t: "Form submitted", sub: "Lead magnet opt-in" },
      { k: "action", icon: "user", t: "Create or update contact", sub: "Matched on email, then phone" },
      { k: "action", icon: "tag", t: "Add tag", sub: "source: lead-magnet" },
      { k: "action", icon: "mail", t: "Send email", sub: "Delivers the guide" },
      { k: "action", icon: "kanban", t: "Create opportunity", sub: "Leads pipeline · New lead" },
      { k: "action", icon: "bell", t: "Notify the owner", sub: "Internal SMS + Slack" },
      { k: "goal", icon: "goal", t: "Add to workflow", sub: "Speed-to-lead follow-up" },
    ],
  },
  {
    id: "follow-up",
    title: "Speed-to-lead follow-up",
    job: "The first text goes out inside a minute. Replies go to the agent, silence gets a follow-up, a booking ends it.",
    steps: [
      { k: "trigger", icon: "kanban", t: "Opportunity created", sub: "Stage: New lead" },
      { k: "action", icon: "sms", t: "Send SMS", sub: "Within a minute of opt-in" },
      { k: "wait", icon: "wait", t: "Wait 10 minutes" },
      {
        k: "if", icon: "branch", t: "Did they reply?", yesLabel: "Replied", noLabel: "No reply",
        yes: [
          { k: "action", icon: "bot", t: "AI agent takes the thread", sub: "Qualifies, offers times" },
        ],
        no: [
          { k: "action", icon: "mail", t: "Send email follow-up" },
          { k: "wait", icon: "wait", t: "Wait 1 day" },
          { k: "action", icon: "task", t: "Call task for the rep" },
        ],
      },
      { k: "goal", icon: "calendar", t: "Goal: appointment booked", sub: "Stage moves to Booked, sequence stops" },
    ],
  },
  {
    id: "nurture",
    title: "Nurture sequence",
    job: "Email and SMS on a schedule, branching on what the contact clicks, ending the moment they book.",
    steps: [
      { k: "trigger", icon: "tag", t: "Tag added", sub: "nurture" },
      { k: "action", icon: "mail", t: "Email 1", sub: "The problem, in their words" },
      { k: "wait", icon: "wait", t: "Wait 2 days" },
      { k: "action", icon: "mail", t: "Email 2", sub: "Proof: a client story" },
      { k: "wait", icon: "wait", t: "Wait 2 days" },
      {
        k: "if", icon: "branch", t: "Clicked the booking link?", yesLabel: "Clicked", noLabel: "Not yet",
        yes: [
          { k: "action", icon: "tag", t: "Add tag", sub: "hot" },
          { k: "action", icon: "task", t: "Task: call today" },
        ],
        no: [
          { k: "action", icon: "sms", t: "SMS nudge" },
          { k: "action", icon: "mail", t: "Email 3", sub: "Objections answered" },
        ],
      },
      { k: "goal", icon: "calendar", t: "Goal: appointment booked", sub: "Leaves nurture" },
    ],
  },
  {
    id: "agent",
    title: "AI conversation agent",
    job: "Inbound messages from any channel are answered, qualified and booked before a person is involved.",
    steps: [
      { k: "trigger", icon: "sms", t: "Customer replied", sub: "SMS, Facebook, Instagram, web chat" },
      { k: "action", icon: "bot", t: "AI agent replies", sub: "OpenAI, with the offer and FAQs as context" },
      {
        k: "if", icon: "branch", t: "Qualified?", yesLabel: "Qualified", noLabel: "Not yet",
        yes: [
          { k: "action", icon: "calendar", t: "Book the call", sub: "Calendar link in the thread" },
          { k: "action", icon: "kanban", t: "Move stage", sub: "Qualified" },
        ],
        no: [
          { k: "action", icon: "tag", t: "Add tag", sub: "nurture" },
          { k: "action", icon: "bell", t: "Hand to a person", sub: "When the agent is unsure" },
        ],
      },
    ],
  },
  {
    id: "onboarding",
    title: "Client onboarding",
    job: "A won deal starts onboarding by itself, so nobody re-keys the client into three tools.",
    steps: [
      { k: "trigger", icon: "kanban", t: "Opportunity status", sub: "Won" },
      { k: "action", icon: "tag", t: "Add tag", sub: "client" },
      { k: "action", icon: "mail", t: "Welcome email", sub: "With the intake form" },
      { k: "action", icon: "task", t: "Task: kickoff call", sub: "Assigned to the account lead" },
      { k: "wait", icon: "wait", t: "Wait until", sub: "Intake form submitted" },
      { k: "action", icon: "webhook", t: "Webhook to n8n", sub: "Creates the client's Notion page" },
      { k: "goal", icon: "kanban", t: "Move stage", sub: "Onboarding · Kickoff booked" },
    ],
  },
  {
    id: "sync",
    title: "Systeme.io sale to HighLevel",
    job: "No connector existed, so an n8n bridge routes every sale into HighLevel by product, without echo loops.",
    steps: [
      { k: "trigger", icon: "webhook", t: "Webhook", sub: "Sale in Systeme.io" },
      { k: "action", icon: "user", t: "Find contact by email" },
      {
        k: "if", icon: "branch", t: "Already in HighLevel?", yesLabel: "Found", noLabel: "New",
        yes: [{ k: "action", icon: "sync", t: "Update fields", sub: "Only fields Systeme.io owns" }],
        no: [{ k: "action", icon: "user", t: "Create contact" }],
      },
      { k: "action", icon: "tag", t: "Tag by product", sub: "Routes to the right campaign" },
      { k: "action", icon: "sync", t: "Mark the write as a sync", sub: "So it never syncs back" },
      { k: "goal", icon: "goal", t: "Add to product workflow" },
    ],
  },
];
