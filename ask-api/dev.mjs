// Local server for the assistant: node ask-api/dev.mjs
// Reads ask-api/.env.local if present (gitignored). With no key it answers 503
// and the site falls back to its prepared answers.
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { handle } from "./lib/ask.mjs";

const envFile = new URL("./.env.local", import.meta.url);
const env = { ...process.env };
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const port = Number(process.env.PORT ?? 8787);
createServer(async (req, res) => {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(`http://localhost:${port}${req.url}`, {
    method: req.method,
    headers: Object.entries(req.headers).filter(([, v]) => typeof v === "string"),
    body: ["GET", "HEAD", "OPTIONS"].includes(req.method ?? "") ? undefined : Buffer.concat(chunks),
  });
  const response = await handle(request, env);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  if (response.body) for await (const c of response.body) res.write(c);
  res.end();
}).listen(port, () => console.log(`ask-api on http://localhost:${port}/api/ask (${env.ANTHROPIC_API_KEY ? "live" : "no key: offline"})`));
