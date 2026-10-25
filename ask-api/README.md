# ask-api

The server half of the "Ask my AI" assistant on carlsajol.dev. No dependencies.

- `lib/ask.mjs` is one handler (Request in, Response out). It holds the system prompt, rate limit and CORS list, and streams Claude's answer back as plain text.
- `lib/knowledge.mjs` is generated from the site's data by `npm run ask:kb` (also run by `npm run build`). Never edit it by hand.
- Without `ANTHROPIC_API_KEY`, the handler answers 503 and the site falls back to its prepared answers.

## Go live

1. Deploy this folder as its own Vercel project (root directory `ask-api`). Set `ANTHROPIC_API_KEY`, and optionally `ASK_MODEL` (default `claude-sonnet-5-5`).
2. On Render, set `VITE_ASK_URL=https://<project>.vercel.app/api/ask` for the portfolio and redeploy.
3. Set a monthly spend limit on the Anthropic account. The per-address limit here (`ASK_PER_10_MIN`, default 15) is only best effort.

To use Cloudflare instead, deploy `worker.mjs` on the route `carlsajol.dev/api/ask*`.

## Local

`npm run ask:dev` serves it on http://localhost:8787/api/ask. Put the key in `ask-api/.env.local`, which is gitignored.
