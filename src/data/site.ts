import { automationCases } from "./automationCases";
import { n8nCases } from "./n8nCases";

/**
 * Single source of truth for every fact on the site.
 *
 * Two rules govern this file:
 *  1. Nothing here may be stated that the working repos don't evidence. Numbers
 *     that are self-reported without an artefact are recorded in `unverified`
 *     and phrased as scope on the page, never as measured outcomes.
 *  2. Client names are anonymised. They are internal working names from an
 *     agency repo, not cleared public references.
 */

export const profile = {
  name: "Carl Patrick Sajol",
  role: "Automation Specialist · AI Creative Architect",
  email: "carlpatricksajol@gmail.com",
  calendly: "https://calendly.com/carlpatricksajol/30min",
  location: "Remote · Philippines",
  available: true,
};

/** Four numbers, each traceable to a system that is actually running. */
export const proofMetrics = [
  { value: "~5 min", caption: "end-to-end rough cut, first real client job", note: "7 scenes, 1.2 GB of footage" },
  { value: "7 / 10", caption: "minimum QA score before a static ad ships", note: "sub-bar ads are dropped, not delivered" },
  { value: "$3.08", caption: "cost of one finished 15-second video ad", note: "at 720p" },
  { value: "Jul 2026", caption: "in production since — not a demo", note: "password-gated, queued, monitored" },
];

export interface Track {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  meta: string;
  capabilities: string[];
  href: string;
  linkLabel: string;
}

export const tracks: Track[] = [
  {
    id: "automation",
    number: "01",
    label: "Business automation",
    title: "AI inside the tools your team already uses",
    body: "Staff ask a question in plain English and get a real answer from your own data. Routine jobs — reports, updates, follow-ups — happen without anyone starting them.",
    meta: "2+ years · running in production",
    capabilities: [
      "Ask a question in Slack, get an answer from your real data",
      "Reports rebuilt every night, ready before the team logs in",
      "Follow-ups, CRM syncing and spam cleanup handled without anyone watching",
    ],
    href: "/work?track=automation",
    linkLabel: "See these systems",
  },
  {
    id: "creative",
    number: "02",
    label: "Ad creative",
    title: "Ads that come back finished, ready to run",
    body: "Idea, artwork, check, delivery in one run. Static ads must score seven out of ten or they get dropped. Video ads are cut from your own raw footage.",
    meta: "Built at an ad agency · since Aug 2025",
    capabilities: [
      "Static ads scored before delivery — under 7 out of 10 never reaches you",
      "Video ads cut from raw footage into a timeline you can edit",
      "One product photo to a captioned 15-second video ad, about $3.08",
    ],
    href: "/work?track=creative",
    linkLabel: "See the ad work",
  },
];

/** 18 cells. Marks that exist in the icon set; wordmark chips for the rest —
 *  tracing or generating a brand's mark would be legally worse than naming it. */
export const platformField: { key?: string; word?: string; name: string }[] = [
  { key: "claude", name: "Claude" },
  { key: "n8n", name: "n8n" },
  { word: "Seedance 2", name: "Seedance 2" },
  { key: "supabase", name: "Supabase" },
  { key: "meta", name: "Meta" },
  { key: "notion", name: "Notion" },
  { key: "openai", name: "OpenAI" },
  { word: "Higgsfield", name: "Higgsfield" },
  { key: "airtable", name: "Airtable" },
  { key: "tiktok", name: "TikTok" },
  { key: "slack", name: "Slack" },
  { word: "KIE.ai", name: "KIE.ai" },
  { key: "googlegemini", name: "Google Gemini" },
  { key: "hubspot", name: "HubSpot" },
  { key: "dropbox", name: "Dropbox" },
  { word: "Whisper", name: "Whisper" },
  { key: "docker", name: "Docker" },
  { key: "adobepremierepro", name: "Adobe Premiere Pro" },
];

export interface VideoAd {
  src: string;
  poster: string;
  title: string;
  format: string;
  duration: string;
}

/** One clip was excluded: its delivery file was an upscale of a much smaller
 *  master and it broke the 9:16 grid. Filenames are deliberately neutral —
 *  a public asset path is copy too, and client names must not leak through it. */
export const videoAds: VideoAd[] = [
  { src: "/showcase/videos/video-01-same-person-skit.mp4", poster: "/showcase/posters/video-01-same-person-skit.jpg", title: "Talking to my past self", format: "Same-person skit", duration: "0:40" },
  { src: "/showcase/videos/video-02-street-interview.mp4", poster: "/showcase/posters/video-02-street-interview.jpg", title: "Street interview", format: "Multi-person interview", duration: "0:45" },
  { src: "/showcase/videos/video-03-search-intent-open.mp4", poster: "/showcase/posters/video-03-search-intent-open.jpg", title: "Search-intent open", format: "UGC presenter", duration: "0:41" },
  { src: "/showcase/videos/video-04-in-car-rant.mp4", poster: "/showcase/posters/video-04-in-car-rant.jpg", title: "In-car rant", format: "UGC, sound-on", duration: "0:34" },
  { src: "/showcase/videos/video-05-review-scroll.mp4", poster: "/showcase/posters/video-05-review-scroll.jpg", title: "Review scroll", format: "Social proof", duration: "0:46" },
  { src: "/showcase/videos/video-06-rapid-fire.mp4", poster: "/showcase/posters/video-06-rapid-fire.jpg", title: "Rapid-fire Q&A", format: "Platform-native pacing", duration: "1:04" },
  { src: "/showcase/videos/video-07-animated-concept.mp4", poster: "/showcase/posters/video-07-animated-concept.jpg", title: "Animated product concept", format: "3D stylised", duration: "0:14" },
];

export interface StaticAd {
  src: string;
  title: string;
  concept: string;
}

export const staticAds: StaticAd[] = [
  { src: "/showcase/ads/static-01-napkin-math.webp", title: "Napkin math", concept: "The saving worked out by hand" },
  { src: "/showcase/ads/static-02-sticky-note.webp", title: "Sticky note", concept: "A note left on the fridge" },
  { src: "/showcase/ads/static-03-crayon-drawing.webp", title: "Crayon drawing", concept: "The emotional angle, drawn by a child" },
  { src: "/showcase/ads/static-04-vintage-poster.webp", title: "Vintage poster", concept: "Retro travel poster treatment" },
  { src: "/showcase/ads/static-05-notification-stack.webp", title: "Notification stack", concept: "The scroll-stopper" },
  { src: "/showcase/ads/static-06-wall-of-bills.webp", title: "Wall of bills", concept: "Density as the message" },
  { src: "/showcase/ads/static-07-three-panel.webp", title: "Three panel", concept: "Before, during, after" },
  { src: "/showcase/ads/static-08-breaking-chains.webp", title: "Breaking chains", concept: "Freedom as visual metaphor" },
  { src: "/showcase/ads/static-09-consolidation-grid.webp", title: "Consolidation grid", concept: "Many bills into one" },
  { src: "/showcase/ads/static-10-one-payment-magnet.webp", title: "One-payment magnet", concept: "Payments pulled together" },
  { src: "/showcase/ads/static-11-wrecking-ball.webp", title: "Wrecking ball", concept: "High-concept imagery" },
];

export type Status = "Live in production" | "Piloted, not scaled" | "Private beta" | "Built, not yet run end to end";

export interface CaseStudy {
  slug: string;
  track: "automation" | "creative";
  trackLabel: string;
  title: string;
  oneLiner: string;
  deck: string;
  year: string;
  role: string;
  client: string;
  status: Status;
  metrics: { value: string; caption: string }[];
  situation: string[];
  constraintIntro: string;
  constraint: string;
  build: { title: string; body: string }[];
  result: string[];
  limits: string[];
  stack: string[];
  /** 4-6 short stage labels, rendered as an animated flow diagram */
  pipeline?: string[];
  /** path to the rendered production workflow graph, when one exists */
  flow?: string;
  hero?: { type: "video" | "image" | "mat"; src: string; poster?: string; caption: string };
}

/** The creative-AI track. Automation cases live in ./automationCases and lead. */
export const creativeCases: CaseStudy[] = [
  {
    slug: "ai-video-editor",
    track: "creative",
    trackLabel: "Creative AI production",
    title: "Raw creator footage in, an editable timeline out",
    oneLiner: "Raw creator footage in, editable Premiere timeline out.",
    deck: "An eleven-step pipeline that turns a folder of unsorted takes into a Premiere timeline an editor can actually finish.",
    year: "2026",
    role: "Sole architect and builder",
    client: "Ad agency, in-house",
    status: "Piloted, not scaled",
    metrics: [
      { value: "~5 min", caption: "first real client job, end to end" },
      { value: "12 of 12", caption: "scenes verified caption-on-word" },
      { value: "0.10s", caption: "caption lead-gap tolerance" },
    ],
    situation: [
      "Cutting a paid-social ad is mostly mechanical work. Someone watches every take, finds the usable one, trims the heads and tails, lays b-roll against the right line of script, then types and times the captions.",
      "It is high-volume and judgement-light, and it consumes most of the clock. The internal estimate for a single ad was roughly seven hours of pre-production spread across five or six freelancers — an estimate, never measured.",
    ],
    constraintIntro:
      "The obvious build is a pipeline that renders a finished video. That was rejected on day one, and the whole architecture follows from rejecting it.",
    constraint: "The output must be an editable timeline, never a render, because a render cannot be fixed.",
    build: [
      { title: "Read the storyboard from Notion", body: "Parses the strategist's storyboard table by column header rather than by position, so an added column doesn't break the run." },
      { title: "Transcribe every take to the word", body: "faster-whisper produces word-level timings across all takes, so the pipeline knows what was said and exactly when." },
      { title: "Match every line to its take", body: "Each scripted line is matched deterministically against the word-level transcript of every take, so the selection is reproducible and can be audited rather than re-rolled." },
      { title: "Cut on the waveform, not the transcript", body: "Every cut snaps to the real speech boundary in the audio and lead breath is trimmed by waveform, because transcript times are approximate and the drift accumulates." },
      { title: "Build captions from what was actually said", body: "Karaoke captions are generated from the transcript, so a caption can never show a word the talent did not say." },
      { title: "Write a timeline, not a video", body: "Outputs FCP7/XMEML plus a burned preview. Each source appears once in the bin at full length and is reused on the timeline, so any cut can be re-trimmed instead of re-shot." },
    ],
    result: [
      "Live in production since 16 July 2026 behind HTTPS and a password gate, with a job queue, a jobs page with inline preview, disk cleanup and failure reporting.",
      "The first real client job — seven scenes — finished in about five minutes including a 1.2 GB download. The motion designer imported and relinked the handoff on a second machine in one step and signed off on the format.",
      "Sync was hardened over several rounds of real review: WAV instead of MP3 segments to kill accumulated encoder delay, frame-aligned durations, waveform lead-trim. Verified on all twelve scenes of a client ad.",
    ],
    limits: [
      "Colour grade is not built.",
      "Hook variants are parsed, but only Hook 1 is produced.",
      "The 20-ad volume test has not been run.",
      "It is live but piloted — not yet the standard production workflow.",
    ],
    stack: ["Python", "ffmpeg", "faster-whisper", "Claude via OpenRouter", "FCP7 / XMEML", "Docker", "Traefik", "Dropbox API", "n8n"],
    pipeline: ["Storyboard in", "Transcribe takes", "Match lines", "Snap to waveform", "Burn captions", "Premiere timeline"],
    hero: { type: "video", src: "/showcase/videos/video-01-same-person-skit.mp4", poster: "/showcase/posters/video-01-same-person-skit.jpg", caption: "A delivered ad in the format the pipeline was built to cut" },
  },
  {
    slug: "static-ads-service",
    track: "creative",
    trackLabel: "Creative AI production",
    title: "Static ads that have to earn their way out the door",
    oneLiner: "QA-gated static ads: only the passers ship, the rest drop.",
    deck: "Concept-first generation with a vision-QA gate — so what reaches the client is the subset that scored, not everything the model produced.",
    year: "2026",
    role: "Sole architect and builder",
    client: "Ad agency, in-house",
    status: "Live in production",
    metrics: [
      { value: "7 / 10", caption: "minimum vision-QA score to ship" },
      { value: "up to 50", caption: "renders per batch run" },
    ],
    situation: [
      "The original version asked a single image model to render layout, imagery and text in one shot.",
      "It produced garbled brand text on billboards, uncanny faces that changed between frames, soft crooked headlines baked into the pixels — and no real concept. Whichever template got picked was the idea.",
    ],
    constraintIntro:
      "The fix was not a better prompt. It was noticing that one model was being asked to do three different jobs, and it was only good at one of them.",
    constraint: "Anything that cannot clear 7/10 unattended is dropped rather than shipped broken.",
    build: [
      { title: "Claude directs, once per batch", body: "A creative-director pass decides the angle, format and headline for each ad before anything is rendered, so the concept leads instead of the template." },
      { title: "Render text and logos as code where it counts", body: "In the HTML lane, headlines, CTAs and logos are drawn in HTML/CSS through local headless Chrome, so type is crisp and the real logo is composited rather than redrawn. A second photoreal lane trades that for image-model output when the concept needs it." },
      { title: "Ground the imagery in the real product", body: "Scenes are generated image-to-image from the client's own product photo rather than described from scratch." },
      { title: "Brand comes from the brand's own site", body: "Colours and fonts are scanned from the client's website, and logo placement is decided per ad so it never covers the call to action." },
      { title: "A vision pass scores every render", body: "Each output is graded and retried. Anything that cannot clear the bar unattended is dropped, which means a 15-template request can legitimately return fewer than 15." },
    ],
    result: [
      "Runs headless as a Node service beside n8n, fed by the existing intake form and asset library. Local rendering makes retries free, so the gate is cheap to enforce.",
      "It performs best on high-signal formats — big-question, notes-app, statistic, testimonial, comparison — and drops dense templates more often. That trade is stated in the README rather than hidden.",
    ],
    limits: [
      "Dense templates drop more often than high-signal ones.",
      "A request for N ads can legitimately return fewer than N.",
      "Premium and hero creative still wants a human in the loop.",
    ],
    stack: ["Node", "puppeteer-core", "headless Chrome", "Claude via OpenRouter", "Supabase", "KIE.ai", "HTML/CSS render engine"],
    pipeline: ["Brief in", "Creative direction", "Render text as code", "Paint imagery", "Vision-QA score", "Ship or drop"],
    hero: { type: "mat", src: "/showcase/ads/static-01-napkin-math.webp", caption: "A delivered static in one of the high-signal formats" },
  },
  {
    slug: "creative-os",
    track: "creative",
    trackLabel: "Creative AI production",
    title: "One product photo in, a finished vertical ad out",
    oneLiner: "Product photo in, captioned fifteen-second vertical ad out.",
    deck: "A self-serve generator that productises an agency's ad-making process — five fields and a photo, no strategist, no shoot.",
    year: "2026",
    role: "Sole architect and builder",
    client: "Ad agency product",
    status: "Private beta",
    metrics: [
      { value: "$3.08", caption: "per finished 15-second ad at 720p" },
      { value: "~1 in 15", caption: "generations that come back weak" },
    ],
    situation: [
      "The agency's ad-making expertise was human-limited. Every ad needed a strategist, a shoot or an editor, and a week of back-and-forth.",
      "The bet was that productising that expertise could work as a front door for the agency — but only if the output was good enough that no client ever saw an embarrassing result.",
    ],
    constraintIntro:
      "Video models garble rendered text. Every attempt to have the model produce captions failed the same way, so captions were moved out of generation entirely.",
    constraint: "Captions may only ever show words that were actually spoken.",
    build: [
      { title: "Describe the product forensically", body: "A vision pass writes down every colour, material, label word and proportion — the single source of truth for what the product actually looks like." },
      { title: "Run three roles in one pass", body: "A creative director picks the format and writes a twelve-beat script, a timing auditor does the arithmetic so nothing is cut off inside fifteen seconds, and a story director assigns shots." },
      { title: "Generate against the real product", body: "Video generation is locked to a model tier proven to hold label fidelity; cheaper tiers garbled labels and one platform ignored the product photo entirely." },
      { title: "Add captions in post, never in-model", body: "The finished clip is transcribed word by word, a vision pass decides where captions will not cover the product, and ffmpeg burns them in." },
    ],
    result: [
      "Live in private beta with the full pipeline working end to end. Exact-product fidelity was the biggest fix and is proven on real products — a beverage can and a hardware device both rendered with legible labels.",
      "Cost is roughly $3.08 per finished ad at 720p and $7.65 at 1080p.",
    ],
    limits: [
      "About one generation in fifteen fails or comes back weak.",
      "There is no automated quality gate yet — that is the next build.",
      "Private beta, not open to the public.",
    ],
    stack: ["n8n", "Claude via OpenRouter", "KIE.ai", "Whisper via Groq", "ffmpeg", "Vercel"],
    pipeline: ["Photo + 5 fields", "Describe product", "Script + timing", "Generate video", "Transcribe", "Burn captions"],
    hero: { type: "video", src: "/showcase/videos/video-07-animated-concept.mp4", poster: "/showcase/posters/video-07-animated-concept.jpg", caption: "A generated product ad concept" },
  },
];

/** Everything else, for the /work archive. */
export const otherSystems = [
  { title: "SA-1 to SA-2 concept pipeline", track: "automation" as const, year: "2026", note: "Intake form to fifteen scripted concept variants and slides.", stack: ["n8n", "Airtable", "Claude", "Slides API"] },
  { title: "MaxFusion MCP server", track: "automation" as const, year: "2026", note: "Ten MCP tools built over an undocumented REST API.", stack: ["Node", "MCP SDK", "Claude Code"] },
  { title: "Client operations platform", track: "automation" as const, year: "2024", note: "Notion, GoHighLevel and HubSpot running a consultancy's client base.", stack: ["Notion", "GoHighLevel", "HubSpot", "Supabase"] },
  { title: "RAG knowledge agent", track: "automation" as const, year: "2024", note: "Document-aware answers over a team's Drive, with citations.", stack: ["n8n", "Supabase pgvector", "OpenAI"] },
  { title: "Lead qualification and enrichment", track: "automation" as const, year: "2024", note: "Inbound leads enriched and routed the moment they arrive.", stack: ["n8n", "Enrichment APIs", "HubSpot"] },
  { title: "Ad comment moderation", track: "automation" as const, year: "2025", note: "Webhook-triggered triage of ad comments across two platforms.", stack: ["Meta Graph API", "LLM classification", "Sheets"] },
  { title: "Two-tier AI video stack", track: "creative" as const, year: "2026", note: "Ten Claude Code skills route each script to the right model.", stack: ["Claude Code", "Higgsfield", "KIE.ai", "Nano Banana Pro"] },
  { title: "SongReels", track: "creative" as const, year: "2026", note: "Photos and clips become a personalised AI music video.", stack: ["Gemini", "Claude", "Suno", "Creatomate", "Stripe"] },
];

export interface Role {
  title: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: "AI Automation & Platform Manager",
    company: "Bumpy App",
    period: "Nov 2025 — Present",
    summary: "Production Claude MCP infrastructure and the paid-social automation suite around it.",
    points: [
      "Built and shipped a production Claude MCP server exposing the internal SDK, proprietary database and attribution platform to Claude as first-class tools",
      "Deployed Claude Code agent infrastructure plus three specialist Slack agents scoped to users, acquisition performance and creative concepts",
      "Automated bulk creative upload, performance-based ad pruning, campaign parameters and cross-platform reporting across Meta and TikTok",
      "Built AI ad-comment moderation on webhook triggers with layered classification, and TikTok creative pre-review before spend",
    ],
  },
  {
    title: "AI Automation Specialist",
    company: "Creative Abundance",
    period: "Aug 2025 — Present",
    summary: "The creative production line: static ads, video assembly, and the self-serve generator.",
    points: [
      "Built the concept-first static ad service with a vision-QA ship gate that drops sub-bar renders rather than delivering them",
      "Built the AI video editor that turns raw creator footage into an editable Premiere timeline, live in production behind a queue and password gate",
      "Built Creative OS: a self-serve generator taking one product photo to a captioned fifteen-second vertical ad",
      "Built the concept pipeline, footage renamer and Figma comment digest that feed and surround the production line",
    ],
  },
  {
    title: "Business Consultant — AI Automation",
    company: "White Key Marketing",
    period: "Aug 2024 — Present",
    summary: "CRM architecture and internal platform for a marketing agency's client base.",
    points: [
      "End-to-end HubSpot: lead flows, pipeline automation, sequences, landing pages and reporting dashboards",
      "GoHighLevel onboarding workflows, AI conversation agents and multi-channel nurture sequences",
      "Company-wide Notion workspace and Supabase dashboards covering client, project and campaign operations",
    ],
  },
  {
    title: "Social Media Marketing Associate",
    company: "Actional Marketing",
    period: "Apr 2024 — Aug 2025",
    summary: "Organic and paid social execution across client accounts.",
    points: [],
  },
  {
    title: "Digital Marketing Specialist",
    company: "Business Connect World",
    period: "Jan 2024 — Feb 2025",
    summary: "Amazon SEO and marketplace listing optimisation.",
    points: [],
  },
  {
    title: "Marketing Assistant — Paid Ads",
    company: "DreamTeam PH",
    period: "Feb 2023 — Mar 2024",
    summary: "Meta Ads support and campaign operations.",
    points: [],
  },
];

export const processSteps = [
  { n: "01", title: "Find the step that eats the week", body: "Usually it is clerical, high-volume and judgement-light. That is the one worth automating first." },
  { n: "02", title: "Decide what must never break", body: "Every system here has one non-negotiable constraint written down before anything is built. It shapes the architecture more than the tooling does." },
  { n: "03", title: "Build the gate before the volume", body: "Generative output only becomes deliverable when something measurable decides what does not ship." },
  { n: "04", title: "Hand back something editable", body: "The deliverable is a timeline, a draft, a review record — something a person can correct. Not a black box." },
  { n: "05", title: "Write down what it can't do", body: "Every system ships with its open gaps listed. It is the fastest way to know whether it fits your problem." },
];

/**
 * Automation leads. The n8n cases come first because they are the best-evidenced
 * work on the site — each one was written from the live production graph, not
 * from memory. Creative is real proof but it is the second track, not the thesis.
 */
export const caseStudies: CaseStudy[] = [...n8nCases, ...automationCases, ...creativeCases];
