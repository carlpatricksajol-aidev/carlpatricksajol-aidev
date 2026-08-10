// Post-build: emit a real index.html at every client-side route.
//
// The site is a BrowserRouter SPA on a static host with no rewrite rule — a direct
// visit to /work/<slug> returns a hard 404 (verified against production). Rather than
// depend on a host dashboard setting, we write the built index.html to each route's
// directory, so every deep link resolves to a real file and the router takes over
// from there. Works on any static host, no configuration required.
//
// Routes are read from src/data/routes.json, which is the canonical list.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const manifest = join(root, "src", "data", "routes.json");

if (!existsSync(manifest)) {
  console.log("emit-routes: no src/data/routes.json, skipping");
  process.exit(0);
}

const indexHtml = readFileSync(join(dist, "index.html"), "utf8");
const routes = JSON.parse(readFileSync(manifest, "utf8"));

let count = 0;
for (const route of routes) {
  if (route === "/") continue; // already emitted by Vite
  const dir = join(dist, route.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), indexHtml);
  count++;
}

// 404.html is the fallback many static hosts serve for unmatched paths; pointing it at
// the SPA lets the router render its own not-found page instead of a host error page.
writeFileSync(join(dist, "404.html"), indexHtml);

console.log(`emit-routes: wrote ${count} route document(s) + 404.html`);
