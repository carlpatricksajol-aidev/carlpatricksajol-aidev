/**
 * The five things an AI marketing role asks for. The home page lists them as
 * services, each linked to the shipped work that proves it (see highlights.ts).
 * Events and sponsorships have no evidence on record, so they are not listed.
 */
export type LaneId = "social" | "creators" | "launch" | "reporting" | "agents";

export interface Lane {
  id: LaneId;
  n: string;
  label: string;
  line: string;
  detail: string;
}

export const lanes: Lane[] = [
  {
    id: "social",
    n: "01",
    label: "Social and content",
    line: "Content for LinkedIn, X and paid social, written fast and checked before it posts.",
    detail: "Two years running organic and paid social for client accounts, including founder-voice posts for X, LinkedIn and Facebook, and now the systems behind it: competitor research read off the video frame, and scripts graded on a ten-point scorecard before anyone reads them.",
  },
  {
    id: "creators",
    n: "02",
    label: "Creators and influencers",
    line: "Finding creators, briefing them, and tracking every one from first message to paid.",
    detail: "A creator pipeline where one record follows each creator from scrape to payment, shoot guides written per creator from the client's own deck, and uploads that sort themselves.",
  },
  {
    id: "launch",
    n: "03",
    label: "Launches and demo video",
    line: "Launch pages, ad publishing and video, from raw footage to a finished edit.",
    detail: "A consumer product launched end to end, an AI editor that turns raw takes into an editable Premiere timeline, and a publisher that pushes approved ads to Meta across twenty lanes.",
  },
  {
    id: "reporting",
    n: "04",
    label: "Reporting and analytics",
    line: "Performance reports that rebuild themselves, and a weekly read on what to change.",
    detail: "A Meta reporting warehouse rebuilt every night from eleven workflows, cross-platform creative reporting for Meta and TikTok, and Slack agents that post the weekly digest on their own.",
  },
  {
    id: "agents",
    n: "05",
    label: "AI agents and automation",
    line: "The agents and workflows that do the repetitive half, running every day.",
    detail: "26 automations shipped to production with 500 steps inside them, a Claude MCP server over a company's internal stack, and quality gates that stop bad output before a client sees it.",
  },
];

export const laneById = (id: LaneId) => lanes.find((l) => l.id === id)!;
