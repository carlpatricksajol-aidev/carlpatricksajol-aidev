// Cloudflare Worker entry, if the domain's Cloudflare account is used instead
// of Vercel: route carlsajol.dev/api/ask* to this worker and add
// ANTHROPIC_API_KEY as a secret.
import { handle } from "./lib/ask.mjs";

export default { fetch: (req, env) => handle(req, env) };
