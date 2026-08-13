// Post-build: emit a real index.html at every client-side route.
//
// The site is a BrowserRouter SPA on a static host with no rewrite rule — a direct
// visit to /work/<slug> returns a hard 404 (verified against production). Rather
// than depend on a host dashboard setting, we write the built index.html into each
// route's directory so every deep link resolves to a real file and the router takes
// over. Works on any static host, no configuration required.
//
// Routes are DERIVED from the case-study data rather than hand-listed: a
// hand-maintained list silently drifts the moment a slug is added or renamed, and
// the failure mode is a 404 nobody notices until a client clicks a shared link.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const dataDir = join(root, "src", "data");

const ORIGIN = "https://carlsajol.dev";
const STATIC_ROUTES = ["/", "/work", "/experience"];

const slugs = new Set();
for (const file of readdirSync(dataDir)) {
  if (!file.endsWith(".ts")) continue;
  const src = readFileSync(join(dataDir, file), "utf8");
  for (const m of src.matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm)) slugs.add(m[1]);
}

const routes = [...STATIC_ROUTES, ...[...slugs].map((s) => `/work/${s}`)];

// A byte-identical copy would make every deep-link page advertise the site root as
// its canonical URL, telling crawlers the case studies are duplicates of the home page.
const forRoute = (html, route) =>
  html
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${ORIGIN}${route}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${ORIGIN}${route}" />`);

if (!existsSync(join(dist, "index.html"))) {
  console.error("emit-routes: dist/index.html missing — run vite build first");
  process.exit(1);
}
const indexHtml = readFileSync(join(dist, "index.html"), "utf8");

let count = 0;
for (const route of routes) {
  if (route === "/") continue; // already emitted by Vite
  const dir = join(dist, route.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), forRoute(indexHtml, route));
  count++;
}

// Many static hosts serve 404.html for unmatched paths; pointing it at the SPA lets
// the router render its own not-found page instead of a host error page.
writeFileSync(join(dist, "404.html"), indexHtml);

// Keep the manifest as a build artefact so the emitted route list is inspectable.
writeFileSync(join(dataDir, "routes.json"), JSON.stringify(routes, null, 2) + "\n");

console.log(`emit-routes: ${count} route document(s) + 404.html`);
console.log(`  case studies: ${slugs.size}`);
