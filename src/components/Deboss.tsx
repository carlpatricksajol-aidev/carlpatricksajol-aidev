import { brandMarks } from "@/components/BrandIcons";

/**
 * The ad platforms blind-embossed into the dark plate.
 *
 * A printer's blind emboss is an impression with no ink in it: you only see it
 * because the light rakes across the paper and one edge catches while the other
 * falls into shadow. That is exactly what this is — a light ply offset up-left,
 * a dark ply offset down-right, nothing printed between them, and one band of
 * light that crosses all three as you scroll the chapter.
 *
 * It answers the ask for floating platform marks in the creative chapter
 * without answering it as a sponsor wall. Resting contrast between the plies is
 * about 1.2:1 against the plate and peaks near 1.7:1 as the light passes; a
 * real logo wall runs 8-16:1. The visible, accessible statement about these
 * three platforms is the placements row above, in real text, which is also the
 * only per-platform claim the site makes.
 *
 * The marks never move. What moves is the same lamp that lights the rest of the
 * page, so this adds exactly one scroll-linked animated element to the busiest
 * region of the site and zero autonomous ones.
 *
 * Geometry comes from BrandIcons, so there is one source of truth and no
 * duplicated path data. Both the URIs and the custom-property map are built once
 * at module scope, never in the render path.
 */

// A default-filled path is alpha 1 and shows; the empty background is alpha 0
// and hides. Do not add fill or mask-mode — the alpha channel is the mask.
const maskUrl = (key: string) => {
  const mark = brandMarks[key];
  if (!mark) return "none";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${mark.d}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const vars = {
  "--dm-meta": maskUrl("meta"),
  "--dm-tiktok": maskUrl("tiktok"),
  "--dm-ig": maskUrl("instagram"),
} as React.CSSProperties;

const Deboss = () => (
  <div className="deboss" style={vars} aria-hidden="true">
    <div className="deboss-lo" />
    <div className="deboss-hi" />
    <div className="deboss-rake">
      <span />
    </div>
  </div>
);

export default Deboss;
