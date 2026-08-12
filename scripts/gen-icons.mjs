// Regenerate src/components/BrandIcons.tsx from simple-icons.
// The file header forbids hand-editing; this is the "regenerate instead" path.
//
// simple-icons v16 DROPPED several marks the site legitimately uses (Adobe,
// Premiere Pro, Amazon, LinkedIn, OpenAI, Slack) — upstream trademark policy,
// not a rename. So this merges: current upstream where it exists, and the
// previously-generated v13 path carried forward where it no longer does.
import * as si from "simple-icons";
import fs from "node:fs";

const TARGET = "src/components/BrandIcons.tsx";
const pkg = JSON.parse(fs.readFileSync("node_modules/simple-icons/package.json", "utf8"));

const prev = fs.readFileSync(TARGET, "utf8");
const carried = new Map();
const ROW = new RegExp('^ {2}"([a-z0-9]+)": \\{ title: ("(?:[^"\\\\]|\\\\.)*"), d: ("(?:[^"\\\\]|\\\\.)*") \\},', "gm");
for (const m of prev.matchAll(ROW)) carried.set(m[1], { title: m[2], d: m[3] });

const WANT = [
  "adobe", "adobepremierepro", "airtable", "amazon", "anthropic", "bytedance", "claude",
  "clickup", "css", "docker", "dropbox", "facebook", "ffmpeg", "figma", "git", "gmail",
  "google", "googleads", "googleappsscript", "googledrive", "googlegemini", "googlesheets",
  "html5", "hubspot", "instagram", "javascript", "linkedin", "make", "meta", "n8n",
  "nextdotjs", "nodedotjs", "notion", "openai", "pinterest", "postgresql", "python",
  "react", "reddit", "shopify", "slack", "snapchat", "stripe", "supabase", "tailwindcss",
  "tiktok", "typescript", "vercel", "woocommerce", "wordpress", "x", "youtube", "zapier",
];

const cap = (s) => "si" + s.charAt(0).toUpperCase() + s.slice(1);
const rows = [];
const fromUpstream = [], fromCarry = [], lost = [];

for (const key of [...WANT].sort()) {
  const icon = si[cap(key)];
  if (icon) {
    rows.push(`  "${key}": { title: ${JSON.stringify(icon.title)}, d: ${JSON.stringify(icon.path)} },`);
    fromUpstream.push(key);
  } else if (carried.has(key)) {
    const c = carried.get(key);
    rows.push(`  "${key}": { title: ${c.title}, d: ${c.d} }, // carried from v13; dropped upstream`);
    fromCarry.push(key);
  } else {
    lost.push(key);
  }
}

const out = `// AUTO-GENERATED from simple-icons v${pkg.version}. Do not hand-edit; regenerate instead.
// Marks are single-path, 24x24, and inherit currentColor so the theme controls their color.
// Brand marks remain the property of their respective owners and are used here for
// nominative identification of the platforms and tools worked with.
//
// Lines tagged "carried from v13" are marks simple-icons has since dropped upstream on
// trademark grounds. They are kept because the site genuinely uses those tools and the
// previously generated path is still accurate; they are not hand-drawn.
//
// NOT PRESENT, deliberately: GoHighLevel, ActiveCampaign, Klaviyo, ManyChat, Systeme.io,
// Higgsfield, KIE.ai, Seedance, Nano Banana Pro, Veo, Whisper. None has ever existed in
// simple-icons (checked back through v9's 2,770 marks), and hand-tracing a logo produces
// something both inaccurate and a worse trademark position than not drawing it at all.
// Those render as wordmarks instead — see the \`word\` branch in LogoField and ToolBand.

export interface BrandMark {
  title: string;
  d: string;
}

export const brandMarks: Record<string, BrandMark> = {
${rows.join("\n")}
};

export type BrandKey = keyof typeof brandMarks;

export const BrandIcon = ({
  name,
  className = "",
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) => {
  const mark = brandMarks[name];
  if (!mark) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <title>{mark.title}</title>
      <path d={mark.d} />
    </svg>
  );
};
`;

fs.writeFileSync(TARGET, out);
console.log(`${rows.length} marks total — ${fromUpstream.length} from simple-icons v${pkg.version}, ${fromCarry.length} carried forward`);
console.log("carried:", fromCarry.join(", ") || "(none)");
if (lost.length) console.log("!! LOST (no upstream, no carry):", lost.join(", "));
