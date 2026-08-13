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

/**
 * Four numbers, every one of them general.
 *
 * The previous four were "~5 min" (a video rough cut), "7/10" (a static ad's QA
 * gate), "$3.08" (a 15-second video ad) and "Jul 2026". All four were about one
 * deliverable, and they sat in the page's second slot — so a buyer who came for
 * a CRM, a report or a lead queue met four ad-production numbers and left.
 * Those numbers were not wrong; they belong inside the creative case studies,
 * where they still live.
 *
 * These four are counted from the live n8n instance via its API: 26 of 53
 * workflows switched on, 500 non-note steps inside them, 11 schedule triggers,
 * 6 webhooks, 222 HTTP steps, largest single graph 170 steps.
 */
export const proofMetrics = [
  { value: "26", caption: "automations running in production right now", note: "53 built in total. These 26 are switched on today." },
  { value: "11", caption: "start themselves on a clock, with nobody pressing go", note: "6 more wake up the moment another tool reaches them." },
  { value: "500", caption: "steps of wiring sitting inside those 26 systems", note: "Counted from the live workflows, notes excluded. The largest single system is 170 of them." },
  { value: "2 years", caption: "building these across three roles held at the same time", note: "On live accounts with real work depending on them, not demos." },
];

/**
 * The tool band. This is the argument the headline makes, so it is the general
 * stack and it leads with the automation platforms a buyer names out loud.
 * Creative-production tools have their own field inside the creative chapter;
 * the two lists deliberately do not overlap.
 *
 * `iconKey` must be a real key in BrandIcons.tsx or an empty string. Tracing or
 * generating a brand's mark would be legally worse than showing a letterform.
 */
export interface ToolItem {
  label: string;
  /** a key in BrandIcons.tsx: a square, single-path, monochrome mark */
  iconKey: string;
  /**
   * A horizontal brand lockup under /public/logos, for the brands that have no
   * square mark anywhere. These are ~4:1 to 6:1 wordmark lockups, so they
   * replace the icon AND the label rather than sitting beside it, and they are
   * rendered to ink rather than in brand colour: full-colour logos would be the
   * only saturated thing on the page and would read as a sponsor wall.
   */
  logo?: string;
}

export interface ToolGroup {
  group: string;
  blurb: string;
  items: ToolItem[];
}

export const toolGroups: ToolGroup[] = [
  {
    group: "Automation platforms",
    blurb: "The engines. These run a job on a clock, or the moment something happens, with nobody pressing go.",
    items: [
      { label: "n8n", iconKey: "n8n" },
      { label: "Zapier", iconKey: "zapier" },
      { label: "Make.com", iconKey: "make" },
      { label: "Google Apps Script", iconKey: "googleappsscript" },
    ],
  },
  {
    group: "CRM and marketing",
    blurb: "Where your customer records, deal stages and follow-up sequences already live.",
    items: [
      { label: "HubSpot", iconKey: "hubspot" },
      { label: "GoHighLevel", iconKey: "", logo: "/logos/gohighlevel.png" },
      { label: "ActiveCampaign", iconKey: "" },
      { label: "Klaviyo", iconKey: "" },
      { label: "Manychat", iconKey: "", logo: "/logos/manychat.svg" },
    ],
  },
  {
    group: "Data and databases",
    blurb: "Where the numbers get written down once, so a report is rebuilt instead of retyped.",
    items: [
      { label: "Airtable", iconKey: "airtable" },
      { label: "Notion", iconKey: "notion" },
      { label: "Supabase", iconKey: "supabase" },
      { label: "Google Sheets", iconKey: "googlesheets" },
      { label: "PostgreSQL", iconKey: "postgresql" },
      { label: "ClickUp", iconKey: "clickup" },
    ],
  },
  {
    group: "AI models and assistants",
    blurb: "Used inside a run to read, sort, draft and flag the things a fixed rule cannot.",
    items: [
      { label: "ChatGPT", iconKey: "openai" },
      { label: "Claude", iconKey: "claude" },
      { label: "Claude Code", iconKey: "anthropic" },
      { label: "Gemini", iconKey: "googlegemini" },
    ],
  },
  {
    group: "Code, when there is no connector",
    blurb: "For the jobs no ready-made connection covers. The step gets written from scratch — a script inside the run, an API nobody has wrapped yet, or a page your customers actually use.",
    items: [
      { label: "JavaScript", iconKey: "javascript" },
      { label: "TypeScript", iconKey: "typescript" },
      { label: "Python", iconKey: "python" },
      { label: "Node.js", iconKey: "nodedotjs" },
      { label: "HTML", iconKey: "html5" },
      { label: "Next.js", iconKey: "nextdotjs" },
    ],
  },
  {
    group: "Where the work lands",
    blurb: "Results arrive in the inbox, channel, drive or ad account your team already has open.",
    items: [
      { label: "Slack", iconKey: "slack" },
      { label: "Gmail", iconKey: "gmail" },
      { label: "Google Drive", iconKey: "googledrive" },
      { label: "Dropbox", iconKey: "dropbox" },
      { label: "Meta Ads", iconKey: "meta" },
      { label: "TikTok Ads", iconKey: "tiktok" },
    ],
  },
];

/** The creative chapter's own production line. Deliberately disjoint from
 *  toolGroups above: these are the models and cutting tools that make an ad,
 *  and they would mean nothing to a buyer reading the top of the page. */
export const platformField: { key?: string; word?: string; name: string }[] = [
  { word: "Nano Banana Pro", name: "Nano Banana Pro" },
  { word: "Higgsfield", name: "Higgsfield" },
  { word: "KIE.ai", name: "KIE.ai" },
  { word: "Seedance 2", name: "Seedance 2" },
  { word: "Veo 3.1", name: "Veo 3.1" },
  { key: "claude", name: "Claude" },
  { key: "googlegemini", name: "Gemini" },
  { word: "Whisper", name: "Whisper" },
  { key: "ffmpeg", name: "FFmpeg" },
  { key: "adobepremierepro", name: "Premiere / XMEML" },
  { key: "figma", name: "Figma" },
  { key: "dropbox", name: "Dropbox" },
];

/**
 * The one per-platform claim on the site, and the verbs are load-bearing.
 *
 * "Published to" is evidenced for Meta and TikTok: automated bulk creative
 * upload and cross-platform reporting in the Bumpy App role below, and the
 * webhook-to-post-ads case study, which ends with finished ads live on both.
 *
 * Instagram is labelled a SOURCE, not a destination, because that is all the
 * repos evidence: it appears only in the competitor-research scrapers, never in
 * anything that publishes. Quietly listing it beside the other two would imply
 * a publishing capability that does not exist, and the asymmetry does more
 * anti-sponsor-wall work than any amount of prose.
 *
 * Deliberately separate from `platformField` (the models and tools that MAKE an
 * ad) and from the toolGroups "Where the work lands" chips (a stack listing).
 */
export const adPlacements: { key: string; name: string; relation: string }[] = [
  { key: "meta", name: "Meta", relation: "Published to" },
  { key: "tiktok", name: "TikTok", relation: "Published to" },
  { key: "instagram", name: "Instagram", relation: "Pulled from" },
];

/**
 * The four testimonials already published on the live site, ported verbatim.
 *
 * Not written here. Every quote, name, title and company is copied exactly as it
 * appears on carlsajol.dev — an invented endorsement
 * attributed to a named person is a fabrication a visitor could check, and it
 * would put the one thing this whole site trades on at risk.
 *
 * All four are colleagues at the same automation studio rather than buying
 * clients, and the section says so rather than implying otherwise.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Carl's expertise in automation workflows is exceptional. His ability to architect complex N8N systems and deliver scalable solutions has been invaluable to our team's success.",
    name: "Rj Villamer",
    role: "Lead Automation Specialist",
    org: "Your Automation Crew",
  },
  {
    quote:
      "Working with Carl on CRM integrations has been a pleasure. His deep understanding of GoHighLevel and ability to create seamless automations consistently exceeds expectations.",
    name: "Aldren Azarcon",
    role: "GoHighLevel Specialist",
    org: "Your Automation Crew",
  },
  {
    quote:
      "Carl brings innovation to every project. His work on AI agent systems and multi-platform integrations demonstrates both technical skill and creative problem-solving.",
    name: "Mark Bahalla",
    role: "Automation & Voice AI Specialist",
    org: "Your Automation Crew",
  },
  {
    quote:
      "The quality of Carl's automation solutions is outstanding. He combines technical excellence with a strong understanding of business needs to deliver impactful results.",
    name: "Markee Navarro",
    role: "Automation & Voice AI Specialist",
    org: "Your Automation Crew",
  },
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

/**
 * Production-forward, and still true.
 *
 * The old vocabulary undersold running systems: "Piloted, not scaled" and
 * "Private beta" both describe things that run every day, and a prospective
 * client reads them as "not finished". So every status now leads with the fact
 * that the system runs.
 *
 * What did NOT change is what any of them means. "Live, invite-only" is used for
 * the two products whose front door is gated — one is public but unadvertised,
 * the other sits behind an invite code with checkout switched off — because
 * calling those "live in production" is a claim a reader can disprove in one
 * click, and one disproved claim costs more than four cautious labels.
 */
export type Status =
  | "Live in production"
  | "Running in production"
  | "Live, invite-only"
  | "Running, not yet scaled"
  /* One case earns this and only one: the Figma comment digest, whose own limits
     say "it has not been proven against a real file with a live token". Labelling
     that as running would be the single sentence on this site that a client could
     catch out, and it is not worth 1/14th of a status column. */
  | "Built, ready to run";

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
    status: "Running in production",
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
    title: "A name, a link and a photo in, a finished vertical ad out",
    oneLiner: "A stranger types a product name and a URL, adds a product photo, and gets a captioned fifteen-second ad back on the same page.",
    deck: "A self-serve generator with no login and no brief call. The agency's ad-making process became a form, which meant every check a reviewer used to make had to be written into the pipeline as a rule — and the checks nobody wrote down do not happen.",
    year: "2026",
    role: "Build lead — site, pipeline and captions",
    client: "Ad agency product",
    status: "Live, invite-only",
    metrics: [
      { value: "2 fields + 1 photo", caption: "everything the form actually makes you fill in: a product name, a website, one image" },
      { value: "3 to 6 minutes", caption: "what the page tells a stranger to expect. It holds the one open request for up to twelve before it gives up." },
    ],
    situation: [
      "The agency made ads the human way. Every ad needed a strategist to pick the angle, a shoot or an editor to make it, and rounds of back-and-forth to land it. The expertise was real and it did not scale, because every ad started with a meeting.",
      "Turning that into a form changes the problem rather than shrinking it. An agency ad gets looked at by someone before the client does. A self-serve tool hands the finished file straight to a stranger, with nobody in between. Everything a reviewer used to catch — a word cut off at fifteen seconds, a garbled label, a caption sitting over the product — had to be handled inside the machine before the file was ever shown. The page is public and unadvertised: no login, no email capture, and the agency's own homepage does not link to it.",
    ],
    constraintIntro: "The video model garbles text it renders, so captions are burned on afterwards. That splits a caption into two streams: the words come from the script, and their timing comes from a transcript of the finished voiceover. The two do not match, on purpose — the spoken line spells the brand name the way it sounds so the voice says it right, while the caption puts the real spelling back.",
    constraint: "A caption may only ever show words the voice actually spoke, timed to the moment it said them — even though the spelling on screen is not the spelling that was read out.",
    build: [
      { title: "Ask for two things and a photo", body: "Product name and website are required, and so is at least one product photo. Target audience is optional, the concept dropdown comes pre-answered with \"Surprise me\", and once three characters of a product name are typed a \"how do you say it\" field unfolds — it exists only because the ad is voiced. The browser redraws each photo to a maximum of 1024 pixels on its longest side and re-encodes it as a JPEG before sending; the photo rides inside the same single request as the rest of the brief. The strategist is handed the website as text and told it cannot browse, so the brand spec is built from the URL string, the product name, the audience and the photo description." },
      { title: "Describe the product, then write to a stopwatch", body: "A vision pass writes down what is visible: colours, materials, the words on the label, the proportions. That transcript is what the writing steps read. The photo itself is uploaded once and handed to the video model as its one reference image, so the words and the pixels describe the same object. Then one prompt runs three roles: a creative director picks the format and writes a twelve-beat script, a timing auditor counts the words against a budget of two a second, adds the pause budget for the scene cuts, and loops with the director until the whole thing fits inside 13.5 seconds, and a story director assigns the shots. The ten plain-English options in the concept dropdown map onto a larger internal format library, sorted into three groups: creator on camera, b-roll with no faces, and animated." },
      { title: "Generate on the tier that held the label, not the cheap one", body: "One reference image, vertical, 720p, audio on. The cheaper tier of the same model garbled labels, and a different provider ignored the product photo entirely — its video nodes were deleted rather than kept as an option, though the same provider's object storage still holds the photo and the finished file. The job is polled until it succeeds or fails, so the waiting page always gets a reply." },
      { title: "Align two streams, then burn", body: "The finished clip is transcribed word by word. One self-contained piece of code, testable on its own away from the pipeline, anchors each script word to a heard word within a six-word window, and one- and two-letter words are barred from anchoring so \"a\" and \"to\" cannot match in the wrong place. Words between two anchors inherit the heard words in the gap — that is how a phonetic spelling takes the timing of what was actually said. Words with nothing heard behind them are dropped. What survives is cut into cards of at most three words and about sixteen characters, never spanning two lines of script, placed by a second vision pass that reads one frame per scene to keep captions off the product, and burned in with ffmpeg. If that vision call fails the run does not — captions fall back to the lower third." },
      { title: "Hold one request open, and never claim done", body: "There is no account and no job ID. The page sends one request and holds it open for up to twelve minutes while the whole pipeline runs, so there is no real progress to report: the bar runs off a hardcoded clock, eases toward 95 per cent, and never says finished. If the wait runs out, the wording changes to say the request is still processing rather than showing an error. What comes back is the ad in a phone frame with a download button, and a storyboard card naming the format, the angle and the scene beats. The page walks the returned data for anything that looks like a media file, so a shape change on the pipeline side degrades to a message instead of a blank screen — it also means the uncaptioned version, which the reply carries for re-edits, turns up as a second, unlabelled \"Your Ad\" beside the finished one." },
    ],
    result: [
      "The full path runs end to end on the live page: brief in, hosted file back, storyboard card beside it.",
      "Product fidelity was the fix that took longest and it holds. The project's own notes record a beverage can and a hardware device both coming back with legible labels.",
      "The caption chain is the part that was hardened rather than assembled: the aligner is a self-contained function so it can be tested away from the pipeline, and the vision placement step fails soft, dropping captions to the lower third instead of killing the ad.",
    ],
    limits: [
      "There is no automated quality gate. Nothing scores the finished ad before a stranger watches it — it was named as the next build and it is not in the workflow.",
      "A run can come back with nothing. Video generation fails on the provider's side often enough to have its own branch in the pipeline, and when that branch fires the page tells the visitor the ad will be sent shortly. There is no address to send it to, and no measured failure rate, because nothing counts runs.",
      "There is no record of a run. No account, no job ID, no history on the page. The finished file is uploaded to object storage and keeps a working link, but that link is only ever shown in the tab that made it — close the tab and it is gone, and nobody can say how many ads the tool has made.",
      "The writing steps never see the website. The field is passed through as text and the strategist is told it cannot browse, so a product whose mechanic is not obvious from a photo can be described wrongly and confidently. The first line on the waiting screen still reads \"Reading your website...\".",
      "The form accepts up to five product photos. The pipeline reads the first one and ignores the rest.",
    ],
    stack: ["Static HTML on Vercel", "n8n on a VPS", "Claude via OpenRouter", "Seedance 2 via KIE.ai", "Whisper large-v3-turbo via Groq", "ffmpeg", "ASS subtitles", "S3 object storage"],
    pipeline: ["Brief in", "Describe the photo", "Script to a stopwatch", "Generate video", "Transcribe and align", "Burn captions"],
  },
  {
    slug: "songreels",
    track: "creative",
    trackLabel: "Creative AI production",
    title: "Your photos in, an original song written about them out",
    oneLiner: "Photos and phone clips become a music video set to a song written about them.",
    deck: "A consumer gift product where the song is written about the photos you upload, and the cut is made against the finished song rather than planned before it.",
    year: "2026",
    role: "Sole builder; product direction shared with the founder",
    client: "Consumer product (SongReels)",
    status: "Live, invite-only",
    metrics: [
      { value: "$9.99", caption: "the published price of one gift, one-time — the checkout is built and switched off in beta" },
      { value: "3", caption: "questions written from your own clips after they have been watched, instead of from a template" },
    ],
    situation: [
      "A personal gift video normally means one of two things. Either somebody spends an evening in an editor cutting a camera roll to a track that was written about somebody else's life, or they use a template that lays the same photos over the same stock music. Both end up as a slideshow, and both are obvious about it.",
      "The other version is a song that is actually about the photos — the line about their kitchen playing while the kitchen is on screen. That is the version people ask for, and it puts the difficulty in a new place: the song and the pictures now have to agree with each other. It also matters that the person paying is not the person watching. The buyer wants something honest to send; the recipient gets a link, usually on a phone, from someone they love, and will not install anything to see it. That shapes the whole output: the product is a page that plays, not a file to email.",
    ],
    constraintIntro: "The obvious build matches lyric words against clip descriptions at render time and drops each clip where its words are sung. That was built. Fuzzy matching missed the near misses — \"yellow wall\" against \"yellow building\" — clips scattered unevenly across the timeline, and the finished reel carried three to five second black gaps.",
    constraint: "The lyrics are written in the order the clips will play, so sync is a property of the writing rather than something the renderer has to go and find.",
    build: [
      { title: "Watch the clips first, then ask about what is in them", body: "On leaving the upload step the browser pulls one frame from up to eight clips, evenly sampled across the upload, and posts those small JPEGs to a vision service along with the occasion the sender already picked. Back comes a one-line read of what the clips are about and exactly three questions grounded in what it saw, with a \"that's not quite it\" editor if the read is wrong. If the vision pass fails for any reason — no key, a model error, a timeout, unparseable output — generic occasion questions take over rather than the flow stopping." },
      { title: "Let the footage set the length of the song", body: "Gemini watches every full clip and returns the window worth showing. The spec allows a quiet four-second beat or a sixteen-second run, capped at twenty seconds a clip, in place of the fixed five-second highlight it replaced. The song is then ordered against the sum of those windows rather than the raw length of the uploads, capped at three minutes. Clips are compressed on the server first and uploaded in parallel, each stamped with its position before the parallel work starts, because an earlier version let descriptions attach to the wrong files: a laptop screen came back described as palm fronds." },
      { title: "Write the lyrics in clip order, then stop and ask", body: "Claude receives the read of every clip in its final order and writes the script and lyrics to follow that order, stanza by stanza. That order is fixed before the writing starts, so every later step inherits it rather than voting on it. Claude also writes the single style line the music generator gets, and the non-negotiables — the chosen voice, no instrumental intro — are appended by code afterwards rather than trusted to the model. The run then pauses and waits: the sender reads and approves the lyrics before any music is generated, which is the last cheap moment to change their mind." },
      { title: "Read the finished song back, then cut against it", body: "The music generator has no duration setting, and it plays an instrumental intro of whatever length it likes however firmly the style line asks for none, so nothing about the timeline can be decided in advance. An early build assumed a two-second intro and ran the picture nine seconds ahead of the vocals. The builder now pulls the timestamped lyrics back from the finished song, works out when the singing really starts, and pins each clip's first appearance to the window between its own line's start and end. A clip is spent once it appears, so a repeating chorus draws a new shot from the unused pool instead of replaying one — before that rule, one simulation placed a single clip five times. The site offers the sender more than one take to choose from; all of this happens to the one they keep." },
      { title: "Deliver a page, not a file", body: "Creatomate renders the vertical video, it moves to Backblaze, and the gift lives at its own page that the recipient opens with no signup and no app. The privacy policy commits to deleting uploads 30 days after the job finishes, and states they are never used as training data. Payment is a Stripe credits purchase that lands before anything is made: the checkout screen sits straight after the setup questions and its own lede reads \"Choose a plan and pay once, then you can upload your clips and we'll compose the song.\" The pricing page and checkout sell packs — $9.99 for one gift, $39.99 for five, $69.99 for ten." },
    ],
    result: [
      "The pipeline runs end to end in private beta: clips in, an approved lyric sheet, a generated song, and a 9:16 reel on its own page.",
      "Sync survived the rewrite. Because the lyrics are authored in clip order, assembly is back-to-back stacking pinned to the real vocal onset, and the black gaps and the nine-second drift are both gone.",
      "Each clip appears once. A simulation over thirty clips whose chorus re-referenced one shot went from five placements of that clip to none.",
    ],
    limits: [
      "A gift can be technically right and still fall flat. The pipeline can put the line about the kitchen under the shot of the kitchen; it cannot make the song one anybody wants to keep, and the product's own terms say plainly that AI output can come back awkward or unexpected.",
      "There is no retry when the music generator returns a hard failure. The status poll retries; a generation failure comes back and the job stops there. The reseller has also had at least one full outage.",
      "The checkout is built and switched off. The live create page sits behind an invite code with payment bypassed, so there is no purchase volume, refund rate or repeat-purchase figure to report.",
    ],
    stack: ["n8n on a self-managed VPS", "Google Gemini", "Anthropic Claude", "Suno via an API reseller", "Creatomate", "Supabase", "Backblaze B2", "Stripe", "Vercel serverless functions", "ffmpeg"],
    pipeline: ["Photos + clips in", "Read every clip", "Lyrics in clip order", "Sender approves", "Song generated", "Cut to the vocals"],
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
];

export interface Role {
  /** "YYYY-MM". Parsed by the credentials lanes; the free-text `period` stays
   *  the display string and is never regex-parsed. */
  start?: string;
  end?: string | null;
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
    start: "2025-11",
    end: null,
    period: "Since Nov 2025",
    summary: "A dating app. Production Claude MCP infrastructure and the paid-social automation suite around it.",
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
    start: "2025-08",
    end: null,
    period: "Since Aug 2025",
    summary: "The creative production line: static ads, video assembly, and the self-serve generator.",
    points: [
      "Built the concept-first static ad service with a vision-QA ship gate that drops sub-bar renders rather than delivering them",
      "Built the AI video editor that turns raw creator footage into an editable Premiere timeline, live in production behind a queue and password gate",
      "Build lead on Creative OS: a self-serve generator that turns a product name, a link and a photo into a captioned fifteen-second vertical ad",
      "Built the concept pipeline, footage renamer and Figma comment digest that feed and surround the production line",
    ],
  },
  {
    title: "Business Consultant — AI Automation",
    company: "White Key Marketing",
    start: "2024-08",
    end: null,
    period: "Since Aug 2024",
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


/**
 * Automation leads. The n8n cases come first because they are the best-evidenced
 * work on the site — each one was written from the live production graph, not
 * from memory. Creative is real proof but it is the second track, not the thesis.
 */
export const caseStudies: CaseStudy[] = [...n8nCases, ...automationCases, ...creativeCases];
