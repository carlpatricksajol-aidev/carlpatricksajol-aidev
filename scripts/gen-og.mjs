// Render public/og-image.jpg from scripts/og-template.html at 1200x630.
//
// The card that shipped before this was built in a different design system: cool
// grey ground, a bold geometric sans, and a deck reading "Ad creative that clears
// a quality gate before it ships" — copy the site itself no longer makes. A share
// card that contradicts the page it links to is worse than none, and it is the
// one asset nobody ever looks at again after writing it.
//
// Run: npm run gen:og
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(HERE, "og-template.html");
const OUT = path.join(HERE, "..", "public", "og-image.jpg");

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

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
});

const page = await browser.newPage();
// deviceScaleFactor 2 then a JPEG at quality 92: the card is served at 1200x630
// but is routinely rescaled by whichever platform renders it, and type this fine
// falls apart if it is rasterised at 1x first.
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto("file:///" + TEMPLATE.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 400));

await page.screenshot({ path: OUT, type: "jpeg", quality: 92, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`wrote public/og-image.jpg — 1200x630 @2x, ${kb} KB`);
