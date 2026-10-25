// Render the resume to PDF from scripts/resume.html.
//
// Also verifies the two things that silently ruin a resume PDF:
//
//   1. PAGE COUNT. Two pages is the target. Chrome will happily spill a third
//      page with one orphaned line on it, and you cannot see that from the HTML.
//      Parsed from the PDF itself, not estimated.
//   2. TEXT LAYER ORDER. Applicant tracking systems read the extracted text, not
//      the layout. The plain text is written alongside the PDF so the reading
//      order can be checked by eye — if it reads as prose, an ATS can parse it.
//
// Run: npm run gen:resume
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(HERE, "resume.html");
// NOT public/. Vite copies public/ to the web root, so a CV left there ships to
// carlsajol.dev on the next unrelated deploy and takes a personal phone number
// onto an indexable URL. Output lands outside the published tree and is
// gitignored; publishing it is a deliberate act, not a side effect of a build.
const OUT_DIR = path.join(HERE, "..", "cv");
const PDF = path.join(OUT_DIR, "Carl-Patrick-Sajol-AI-Automation-Engineer.pdf");
const TXT = path.join(OUT_DIR, "resume.txt");

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
await page.goto("file:///" + TEMPLATE.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 350));

// the text layer, in DOM order — this is what an ATS actually sees
const text = await page.evaluate(() => document.body.innerText);
fs.writeFileSync(TXT, text, "utf8");

await page.pdf({
  path: PDF,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();

// page count, read out of the PDF rather than guessed at
const buf = fs.readFileSync(PDF);
const raw = buf.toString("latin1");
const counts = [...raw.matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
const pages = counts.length ? Math.max(...counts) : (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;

const words = text.split(/\s+/).filter(Boolean).length;

console.log(`${path.basename(PDF)}`);
console.log(`  pages       ${pages}${pages === 2 ? "  ok" : "  <-- TARGET IS 2"}`);
console.log(`  size        ${(buf.length / 1024).toFixed(1)} KB`);
console.log(`  words       ${words}`);
console.log(`  text layer  ${path.basename(TXT)}  (${text.length} chars — check the reading order)`);

if (pages !== 2) process.exitCode = 1;
