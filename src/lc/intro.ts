/**
 * Decided once, at load, before anything renders: does the intro curtain play
 * on this visit? Repeat visits in the same session skip it, and the html
 * element gets `no-intro` so CSS can drop the entrance delays.
 */
export const introPlays = (() => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem("cps-intro")) return false;
    sessionStorage.setItem("cps-intro", "1");
  } catch {
    /* storage blocked: play it */
  }
  return true;
})();

if (typeof document !== "undefined" && !introPlays) document.documentElement.classList.add("no-intro");

/** seconds to wait before hero animations start */
export const heroDelay = introPlays ? 1.55 : 0.15;
