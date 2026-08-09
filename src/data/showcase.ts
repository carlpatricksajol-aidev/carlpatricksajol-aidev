// Creative AI Studio showcase data — real client deliverables produced by the
// AI pipelines built at Creative Abundance. Drop a new file into
// public/showcase/** and add one entry here to extend a gallery.

export interface StaticAd {
  src: string;
  title: string;
  concept: string;
  format: string;
  client: string;
}

export interface VideoAd {
  src: string;
  poster: string;
  title: string;
  format: string;
  client: string;
  duration: string;
}

export interface CreativeSystem {
  title: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  outcome: string;
  tools: string[];
}

export const staticAds: StaticAd[] = [
  { src: "/showcase/ads/adr-keep-coming.webp", title: "Keep Coming", concept: "Notification-stack scroll stopper", format: "Native feed", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-sticky-note.webp", title: "Sticky Note", concept: "Handwritten note on the fridge", format: "Native / organic", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-breaking-chains.webp", title: "Breaking Chains", concept: "Debt freedom as a visual metaphor", format: "High concept", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-consolidate-grid.webp", title: "Consolidate Grid", concept: "Many bills collapsing into one payment", format: "Information design", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-magnet-payment.webp", title: "One-Payment Magnet", concept: "A magnet pulling scattered payments together", format: "Visual metaphor", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-crayon-free.webp", title: "Crayon Drawing", concept: "A child's drawing carries the emotional angle", format: "Emotional / UGC feel", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-vintage-poster.webp", title: "Vintage Poster", concept: "Retro travel-poster take on debt freedom", format: "Stylized", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-napkin-math.webp", title: "Napkin Math", concept: "Savings breakdown scribbled on a napkin", format: "Direct response", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-sticky-wall.webp", title: "Wall of Bills", concept: "A wall of sticky-note bills, one way out", format: "Scroll stopper", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-three-panel.webp", title: "Three Panel", concept: "Before → during → after in comic panels", format: "Sequential story", client: "Accredited Debt Relief" },
  { src: "/showcase/ads/adr-magnet-wrecking.webp", title: "Wrecking Ball", concept: "A wrecking-ball magnet smashing debt", format: "High concept", client: "Accredited Debt Relief" },
];

export const videoAds: VideoAd[] = [
  { src: "/showcase/videos/adr-googling-debt.mp4", poster: "/showcase/posters/adr-googling-debt.jpg", title: "Googling 'Debt Relief'? Start Here", format: "UGC presenter · search-intent hook", client: "Accredited Debt Relief", duration: "0:41" },
  { src: "/showcase/videos/adr-same-person-skit.mp4", poster: "/showcase/posters/adr-same-person-skit.jpg", title: "\"Wait… I Could Save $480 a Month?\"", format: "Same-person skit · narrative", client: "Accredited Debt Relief", duration: "0:40" },
  { src: "/showcase/videos/adr-street-interview.mp4", poster: "/showcase/posters/adr-street-interview.jpg", title: "Street Interview", format: "Multi-person interview", client: "Accredited Debt Relief", duration: "0:45" },
  { src: "/showcase/videos/adr-incar-rant.mp4", poster: "/showcase/posters/adr-incar-rant.jpg", title: "In-Car Rant", format: "UGC rant · sound-on", client: "Accredited Debt Relief", duration: "0:34" },
  { src: "/showcase/videos/adr-rapid-fire.mp4", poster: "/showcase/posters/adr-rapid-fire.jpg", title: "Rapid Fire", format: "TikTok-native pacing", client: "Accredited Debt Relief", duration: "1:04" },
  { src: "/showcase/videos/adr-trustpilot.mp4", poster: "/showcase/posters/adr-trustpilot.jpg", title: "Trustpilot Reviews", format: "Social proof compilation", client: "Accredited Debt Relief", duration: "0:46" },
  { src: "/showcase/videos/symple-stitched.mp4", poster: "/showcase/posters/symple-stitched.jpg", title: "Symple Lending", format: "Multi-shot cinematic stitch", client: "Symple Lending", duration: "0:48" },
  { src: "/showcase/videos/pixar-onsen.mp4", poster: "/showcase/posters/pixar-onsen.jpg", title: "Onsen — Animated Concept", format: "Pixar-style 3D · Higgsfield", client: "Onsen", duration: "0:14" },
];

export const creativeSystems: CreativeSystem[] = [
  {
    title: "AI Static Ads Generator",
    tagline: "Client name in. Fifty on-brand statics out.",
    description:
      "A headless production service that turns a client name and a set of template picks into finished, on-brand static ads at batch scale. Claude runs creative direction once per batch, every headline and CTA is rendered deterministically in HTML/CSS so text is always crisp, and the image model only paints imagery — grounded in the client's real product photo.",
    keyFeatures: [
      "Concept-first architecture: AI decides the concept, code renders the text — the fix for garbled 'AI slop' ads",
      "Brand intelligence layer reads colors and fonts straight from the client's website CSS",
      "Real-asset fidelity: AI product cutouts, contrast-aware logo placement that never covers the CTA",
      "Hard QA gate — a vision model scores every ad and only 7/10+ ships, with fill-to-count retries",
    ],
    outcome: "Batches of up to 50 QA-passed static ads delivered per run, with a client revision loop built in.",
    tools: ["Claude", "Nano Banana Pro", "KIE.ai", "Headless Chrome", "Supabase"],
  },
  {
    title: "AI Video Editor",
    tagline: "Raw footage in. A Premiere timeline 90% cut.",
    description:
      "Turns a Dropbox folder of raw creator takes plus a Notion storyboard into an editable Adobe Premiere timeline: best takes selected, scenes trimmed to the spoken word, b-roll laid over the right lines, karaoke captions timed word-by-word. An editor opens one zip and finishes the last 10%.",
    keyFeatures: [
      "Whisper transcribes every take; Claude acts as the edit brain choosing the best delivery of each scripted line",
      "Waveform-snapped cuts, breath-aware lead trims, and sample-accurate audio — every scene checked against the waveform to a 0.00s clean target",
      "Delivers an editable timeline, not a render — every cut can still be adjusted",
      "Live in production: Dockerized on a VPS with an intake form and job queue",
    ],
    outcome: "~7 hours of pre-production across 5–6 freelancers compressed into a ~5-minute automated job per ad.",
    tools: ["Whisper", "Claude", "FFmpeg", "Premiere XML", "Docker"],
  },
  {
    title: "AI Footage QA & Renamer",
    tagline: "The AI that watches — and listens to — every clip.",
    description:
      "Front of the video funnel: a creator dumps mis-named uploads into Dropbox, a strategist ticks READY in Notion, and a multimodal model matches every clip to its storyboard scene — hearing the voiceover on talking-head takes, watching the visuals on b-roll — then a deterministic engine renames and organizes everything with a missing-shot report.",
    keyFeatures: [
      "Multimodal matching: audio for a-roll, visuals for b-roll",
      "Deterministic rename layer with take grouping and missing-shot diffs",
      "Notion-triggered, fully hands-off — status written back to the job page",
      "Its report becomes the authoritative scene map the AI Video Editor consumes",
    ],
    outcome: "Validated live on a real 14-scene, 17-shot client storyboard; iterated on the editor's own naming feedback.",
    tools: ["Gemini 2.5 Flash", "n8n", "Notion", "Dropbox"],
  },
  {
    title: "Creative OS",
    tagline: "Product photo in. Finished video ad in 6 minutes.",
    description:
      "A live self-serve product: a client enters their product name, website, audience and one product photo — and minutes later gets a finished 15-second vertical video ad, voiced and captioned, starring their real product, with a storyboard card explaining the creative choices.",
    keyFeatures: [
      "One Claude pass runs three roles: creative director, timing auditor, story director",
      "Video generated by Seedance 2 referenced to the real product photo",
      "AI decides caption placement so text never covers the product",
      "15 concept formats — UGC, street interview, unboxing, Pixar-3D, claymation and more",
    ],
    outcome: "Finished, voiced, captioned vertical ads in 3–6 minutes, self-serve, zero human in the loop.",
    tools: ["Claude", "Seedance 2", "KIE.ai", "Vercel"],
  },
];

export const supportingSystems = [
  { name: "MaxFusion MCP Server", detail: "10-tool custom MCP giving Claude direct control of the team's creative-flow platform" },
  { name: "Songreels", detail: "Photos + clips → a personalized AI music-video gift (Gemini · Claude · Suno · Creatomate)" },
  { name: "Figma Comment Digest", detail: "Client comments → a living, AI-clustered revision brief with Slack alerts" },
  { name: "Cartoon Fights R&D", detail: "75-second five-scene AI film with frame-chained match cuts (Higgsfield Kling 3.0)" },
];
