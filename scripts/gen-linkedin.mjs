// Render the LinkedIn cover at 1584x396 from scripts/linkedin-cover.html.
//
// Also emits a "-guide" copy with the avatar keep-out shaded, so the safe area
// can be checked by eye rather than trusted. LinkedIn drops the circular profile
// photo over the lower left of the cover on desktop and crops the sides on
// mobile, and a banner that ignores either loses whatever sat there.
//
// Run: npm run gen:linkedin
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const W = 1584;
const H = 396;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(HERE, "linkedin-cover.html");
const OUT_DIR = path.join(HERE, "..", "public", "brand");

const CHROME =
  process.env.CHROME_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error("No Chrome found. Set CHROME_PATH.");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
});

const page = await browser.newPage();
// 2x then a high-quality JPEG: LinkedIn re-compresses whatever it is given, and
// type this fine falls apart if it is rasterised at 1x first
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await page.goto("file:///" + TEMPLATE.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 350));

const shoot = async (file, guide) => {
  await page.evaluate((g) => document.body.classList.toggle("guide", g), guide);
  await new Promise((r) => setTimeout(r, 120));
  const out = path.join(OUT_DIR, file);
  await page.screenshot({ path: out, type: "jpeg", quality: 94, clip: { x: 0, y: 0, width: W, height: H } });
  return out;
};

const main = await shoot("linkedin-cover.jpg", false);
const guide = await shoot("linkedin-cover-guide.jpg", true);
await browser.close();

for (const f of [main, guide]) {
  console.log(`${path.basename(f).padEnd(28)} ${W}x${H} @2x  ${(fs.statSync(f).size / 1024).toFixed(1)} KB`);
}
console.log(`\nupload linkedin-cover.jpg — the -guide copy is only for checking the avatar keep-out`);
