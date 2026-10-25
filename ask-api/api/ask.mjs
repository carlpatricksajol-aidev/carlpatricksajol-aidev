// Vercel function: deploy the ask-api folder as its own project and set
// ANTHROPIC_API_KEY in the project's environment variables.
import { handle } from "../lib/ask.mjs";

const run = (req) => handle(req, process.env);
export const GET = run;
export const POST = run;
export const OPTIONS = run;
