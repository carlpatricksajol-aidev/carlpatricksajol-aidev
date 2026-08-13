import { Page } from "@/components/SiteChrome";
import { BrandIcon } from "@/components/BrandIcons";
import { PrimaryButton } from "@/components/primitives";
import { experience, profile } from "@/data/site";

const stack: { group: string; items: { key?: string; label: string }[] }[] = [
  {
    group: "AI & agents",
    items: [
      { key: "anthropic", label: "Claude MCP (custom servers)" },
      { key: "anthropic", label: "Claude Code" },
      { key: "openai", label: "OpenAI" },
      { key: "googlegemini", label: "Gemini" },
      { label: "Whisper" },
      { label: "RAG systems" },
    ],
  },
  {
    group: "Creative AI",
    items: [
      { label: "Higgsfield" },
      { label: "KIE.ai" },
      { label: "Seedance 2" },
      { label: "Nano Banana Pro" },
      { key: "ffmpeg", label: "FFmpeg" },
      { key: "adobepremierepro", label: "Premiere / XMEML" },
    ],
  },
  {
    group: "Automation",
    items: [
      { key: "n8n", label: "n8n" },
      { key: "zapier", label: "Zapier" },
      { key: "make", label: "Make.com" },
      { key: "googleappsscript", label: "Google Apps Script" },
    ],
  },
  {
    group: "Code & scripting",
    items: [
      { key: "javascript", label: "JavaScript" },
      { key: "typescript", label: "TypeScript" },
      { key: "python", label: "Python" },
      { key: "nodedotjs", label: "Node.js" },
      { key: "googleappsscript", label: "Google Apps Script" },
      { key: "postgresql", label: "PostgreSQL / SQL" },
    ],
  },
  {
    group: "Web & deployment",
    items: [
      { key: "html5", label: "HTML" },
      { key: "css", label: "CSS" },
      { key: "react", label: "React" },
      { key: "nextdotjs", label: "Next.js" },
      { key: "tailwindcss", label: "Tailwind CSS" },
      { key: "git", label: "Git" },
      { key: "vercel", label: "Vercel" },
      { key: "docker", label: "Docker" },
    ],
  },
  {
    group: "CRM & data",
    items: [
      { key: "hubspot", label: "HubSpot" },
      { label: "GoHighLevel" },
      { label: "ActiveCampaign" },
      { label: "Klaviyo" },
      { label: "Manychat" },
      { label: "Systeme.io" },
      { key: "supabase", label: "Supabase" },
      { key: "airtable", label: "Airtable" },
      { key: "notion", label: "Notion" },
      { key: "googlesheets", label: "Google Sheets" },
      { key: "clickup", label: "ClickUp" },
    ],
  },
  {
    group: "APIs & platforms",
    items: [
      { key: "meta", label: "Meta Ads API" },
      { key: "tiktok", label: "TikTok Ads API" },
      { key: "slack", label: "Slack API" },
      { key: "dropbox", label: "Dropbox API" },
      { key: "stripe", label: "Stripe" },
      { key: "figma", label: "Figma API" },
    ],
  },
];

const Experience = () => (
  <Page>
    <div className="w-shell gutter section grid gap-s8 lg:grid-cols-[20rem_1fr] lg:gap-s10">
      {/* sticky bio rail */}
      <div className="lg:sticky lg:top-[5.5rem] lg:self-start">
        <p className="t-slug text-brand-600">Experience</p>
        <h1 className="t-section mt-s3">{profile.name}</h1>
        <p className="t-body mt-s3 text-ink-secondary">{profile.role}</p>
        <p className="t-small mt-s2 text-ink-tertiary">{profile.location}</p>
        <div className="mt-s6">
          <PrimaryButton href={profile.calendly}>Book a call</PrimaryButton>
        </div>
        <p className="mt-s4">
          <a href={`mailto:${profile.email}`} className="link t-small">{profile.email}</a>
        </p>
      </div>

      {/* scrolling column */}
      <div>
        <ol className="border-t border-line">
          {experience.map((r) => (
            <li key={`${r.company}-${r.period}`} className="border-b border-line py-s6">
              <div className="flex flex-wrap items-baseline justify-between gap-s3">
                <h2 className="t-sub text-ink">{r.title}</h2>
                <span className="t-mono t-slug text-ink-tertiary">{r.period}</span>
              </div>
              <p className="t-body mt-s2 font-medium text-brand-600">{r.company}</p>
              <p className="t-body mt-s3 max-w-[62ch] text-ink-secondary">{r.summary}</p>
              {r.points.length > 0 && (
                <ul className="mt-s4 space-y-s3">
                  {r.points.map((p) => (
                    <li key={p} className="grid grid-cols-[16px_1fr] gap-s3">
                      <span className="mt-2.5 h-px w-2 bg-line-interactive" aria-hidden="true" />
                      <span className="t-body max-w-[62ch] text-ink-secondary">{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <section className="mt-s9" aria-labelledby="stack-h">
          <h2 id="stack-h" className="t-section">Stack</h2>
          <div className="mt-s6 grid gap-s6 sm:grid-cols-2">
            {stack.map((g) => (
              <div key={g.group}>
                <h3 className="t-slug text-ink-tertiary">{g.group}</h3>
                <ul className="mt-s3 flex flex-wrap gap-s2">
                  {g.items.map((it) => (
                    <li
                      key={it.label}
                      className="inline-flex items-center gap-s2 rounded-xs border border-line bg-surface-raised px-s3 py-1.5"
                    >
                      {it.key && <BrandIcon name={it.key} size={13} className="text-ink-tertiary" />}
                      <span className="t-small text-ink-secondary">{it.label}</span>
                    </li>
                  ))}
                  {/* Every one of these six groups is a sample. A grid of named
                      tools reads as a complete inventory, and a reader who does
                      not see their own tool concludes it cannot be done. */}
                  <li className="inline-flex items-center rounded-xs border border-dashed border-line-interactive px-s3 py-1.5">
                    <span className="t-small text-ink-tertiary">and more</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </Page>
);

export default Experience;
