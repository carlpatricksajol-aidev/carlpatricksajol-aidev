import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Browsers restore scroll on history navigation, but a client-side route change
 * is not a document load — without this, moving between routes keeps the previous
 * page's scrollY (clamped to the new document height), so a visitor clicking a
 * card near the footer lands in the footer of the next page.
 * Hash links are left alone so in-page anchors still work.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
