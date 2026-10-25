import type { CaseStudy } from "./site";

/**
 * The autumn 2026 work, written from the agency repo's own commits and notes.
 *
 * Same two rules as site.ts: nothing stated that the repos don't evidence, and
 * no client names. Money figures are the model spend the runs logged, not
 * revenue. Quotes are paraphrased from internal reviews and never attributed
 * to a named person.
 */
export const newCases: CaseStudy[] = [
  {
    slug: "concepts-and-scripts-engine",
    track: "creative",
    trackLabel: "Content engine",
    title: "Ad scripts that pass a scorecard before a strategist reads them",
    oneLiner: "Concepts and scripts graded on ten points, swept for compliance, and filed as the team's own doc.",
    deck: "A writing pipeline for paid-social ads that runs the strategists' own skill word for word, then makes every draft earn its way past a ten-point direct-response scorecard and a compliance sweep before anyone has to fix it.",
    year: "2026",
    role: "Sole builder",
    client: "Ad agency, in-house",
    status: "Live in production",
    metrics: [
      { value: "10 points", caption: "on the direct-response scorecard every script is graded against; the four that clients complained about most must reach 8" },
      { value: "4 words/s", caption: "the spoken-word budget, checked in code and calibrated on scripts the team had already got approved" },
    ],
    situation: [
      "AI-written ad scripts got the who and the what right and fell apart on the how and the proof. Batch after batch drifted into the same shape: a problem, the product finds the right people, real engagement, an offer in the last line. Strategists rewrote them by hand, and by their own estimate each fix took fifteen to twenty minutes.",
      "The scripts also ran long. Generated batches came back far wordier than the batches the same team had written and the client had approved, which only shows when somebody tries to read one aloud in thirty seconds.",
    ],
    constraintIntro:
      "The first fix that failed was adding more judges. A chain of reviewers and rewriters on top of the writer turned good drafts into flat ones, and the concept stage went back to running the skill as written, with the reviewers reduced to flags.",
    constraint: "The strategists' skill is the source of truth. Code only checks what code can count.",
    build: [
      { title: "A contract per concept before a word is written", body: "Each concept gets one line stating what the ad tests, for whom, and the measurable proof that would close the argument. The draft is held to that line from hook to call to action, so the proof has to match the promise instead of defaulting to likes and comments." },
      { title: "The team's own skill, installed word for word", body: "The writer runs the strategists' skill exactly as they wrote it, including its pre-write analysis of persona, objections and awareness level. An earlier version paraphrased the reference files for the pipeline and lost the craft rules, so now nothing is rewritten." },
      { title: "Who can be on camera, per client", body: "A production brief for each client, extracted from what the agency actually shot for them, states who may appear, how many people, and where. The concept selector scores cast fit and refuses a winner below four, and a lint flags a second actor in a one-creator brief." },
      { title: "A ten-point scorecard with a high bar on four", body: "A separate reviewer grades every script on the scorecard. Proof, differentiation, product introduction and offer placement must reach 8; anything under goes back to the writer with the failing lines quoted." },
      { title: "A compliance sweep with no ship-anyway option", body: "Last, a QA pass checks banned words, claims, disclaimers, grammar and whether each script still makes sense end to end. A script that fails is rewritten and re-scored; one that cannot pass is killed and flagged rather than delivered." },
      { title: "Filed where the team works", body: "Finished batches become a Google Doc in the house layout, filed in the client's batch folder, so a strategist opens a document instead of a tool." },
    ],
    result: [
      "Script batches are delivered on request as Google Docs in the team's format, with a summary of each script's contract, proof and offer placement.",
      "Length is now held to the team's own approved range by a word budget checked in code, rather than by asking the model to be brief.",
    ],
    limits: [
      "Strategists ask for runs rather than running it themselves, so it works as a service, not yet as a self-serve tool.",
      "Whether the model may write plausible illustrative numbers or must leave a placeholder is a policy question that is still open.",
      "A full eight-script run costs several dollars in model spend, which matters at batch volume.",
    ],
    stack: ["Node", "Claude", "Google Docs API", "Supabase", "Docker"],
    pipeline: ["Concepts in", "Contract per concept", "Write with the skill", "Ten-point scorecard", "Compliance sweep", "Doc in the batch folder"],
  },
  {
    slug: "creator-shoot-guides",
    track: "creative",
    trackLabel: "Creator operations",
    title: "Creator shoot guides a creator can use with no cleanup",
    oneLiner: "One guide per creator, written from the client's own onboarding deck, with the team's review rules enforced in code.",
    deck: "Remote creators film from a written guide. This builds one per creator, holding only that creator's scripts, from the client's own deck, and turns a strategist's review into checks the generator can no longer fail.",
    year: "2026",
    role: "Sole builder",
    client: "Ad agency, in-house",
    status: "Delivered",
    metrics: [
      { value: "30", caption: "creator-facing docs from one run, across five client batches" },
      { value: "$12.57", caption: "model spend for that whole run" },
    ],
    situation: [
      "A remote creator films alone, from whatever document they were sent. The first generated guides were judged about seventy per cent there by the strategist who reviewed them, and fixing the other thirty per cent took as long as writing a guide from scratch.",
      "The review named the faults precisely: one document for many creators, production jargon, gear lists and editing notes a creator never needs, long wardrobe sections, and filming locations the client had never mentioned.",
    ],
    constraintIntro: "The obvious fix is a better prompt. Prompts drift; the same faults come back a batch later.",
    constraint: "A guide goes to a creator exactly as generated. If it would need cleanup, it has failed.",
    build: [
      { title: "Read the client's own deck", body: "The generator reads the client's onboarding deck: the critical information for the batch, the talent mapping of which creator films which concept, and the concept slides with their reference images. It skips anything that looks like a login and strips creator rates before a model sees the text." },
      { title: "One document per creator", body: "Each creator gets a document with only their own scripts and the action cues for each line, plus one consolidated shot list, instead of a shared guide they have to search." },
      { title: "The review, written as rules", body: "The strategist's notes became code checks: no gear, no editing or sound notes, short wardrobe, places only from the onboarding. A tidy pass removes an invented location sentence by sentence instead of resetting the whole section." },
      { title: "Reference images that survive the trip", body: "Drive's HTML import silently dropped every image once a document carried three or more of the deck's large PNGs, so images are placed afterwards through the Docs API, one batch at a time from the end of the document backwards." },
    ],
    result: [
      "One run produced thirty Google Docs for five client batches, filed in a single Drive folder for the strategist's review, for $12.57 of model spend.",
    ],
    limits: [
      "The strategist's verdict on this version is still pending, and the live service has not been rebuilt with it yet.",
      "Reference images only appear when the client's deck carries them.",
    ],
    stack: ["Node", "Claude", "Google Slides API", "Google Docs API", "Google Drive API"],
    pipeline: ["Onboarding deck in", "Map creators", "Write per creator", "Check the team's rules", "Place reference images", "Docs in Drive"],
  },
];
