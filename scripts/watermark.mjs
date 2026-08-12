// Burn a watermark into every showcase creative, in place.
//
// A CSS overlay would have been three lines and would protect nothing: the
// visible page is a composite, but right-click-save downloads the clean original
// straight from /public. The only watermark that survives being taken is one
// that is part of the pixels, so this rewrites the files.
//
// Originals are kept under public/showcase/_original/ so this is reversible and
// so a second run never watermarks an already-watermarked file.
//
// Run: npm run watermark
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/showcase";
const ORIG = path.join(ROOT, "_original");
const FONT = "C\\:/Windows/Fonts/consola.ttf";
const MARK = "carlpatricksajol-aidev.onrender.com";

const ff = (args) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args]);

/** the tile: low-contrast, repeated on a diagonal, plus one legible corner
 *  credit. Tiled so a crop cannot remove it; low alpha so it does not wreck the
 *  work it is protecting. */
const filter = (w, h) => {
  const size = Math.max(13, Math.round(w * 0.019));
  const stamps = [];
  const stepX = Math.round(w / 1.6);
  const stepY = Math.round(h / 4.2);
  let i = 0;
  for (let y = Math.round(stepY * 0.4); y < h; y += stepY, i++) {
    for (let x = -stepX + (i % 2) * Math.round(stepX / 2); x < w; x += stepX) {
      stamps.push(
        `drawtext=fontfile='${FONT}':text='${MARK}':fontsize=${size}:fontcolor=white@0.13:x=${x}:y=${y}`
      );
    }
  }
  // the corner credit: readable, so a viewer knows where it came from
  stamps.push(
    `drawtext=fontfile='${FONT}':text='${MARK}':fontsize=${size}:fontcolor=white@0.62:` +
      `box=1:boxcolor=black@0.34:boxborderw=${Math.round(size * 0.5)}:x=w-tw-${Math.round(w * 0.03)}:y=h-th-${Math.round(h * 0.025)}`
  );
  return stamps.join(",");
};

const dims = (f) =>
  execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", f])
    .toString().trim().split(",").map(Number);

const stash = (rel) => {
  const src = path.join(ROOT, rel);
  const keep = path.join(ORIG, rel);
  fs.mkdirSync(path.dirname(keep), { recursive: true });
  if (!fs.existsSync(keep)) fs.copyFileSync(src, keep);
  return { src, keep };
};

let done = 0;

// ---- stills: the 11 static ads and the 7 video posters ----
for (const dir of ["ads", "posters"]) {
  for (const name of fs.readdirSync(path.join(ROOT, dir))) {
    const rel = `${dir}/${name}`;
    const { src, keep } = stash(rel);
    const [w, h] = dims(keep);
    const ext = path.extname(name).toLowerCase();
    const tmp = src + ".tmp" + ext;
    const enc = ext === ".webp" ? ["-c:v", "libwebp", "-quality", "88"] : ["-q:v", "3"];
    ff(["-i", keep, "-vf", filter(w, h), ...enc, tmp]);
    fs.renameSync(tmp, src);
    console.log(`  ${rel}  ${w}x${h}`);
    done++;
  }
}

// ---- the 7 videos. Re-encode once, keep the audio stream untouched. ----
for (const name of fs.readdirSync(path.join(ROOT, "videos"))) {
  const rel = `videos/${name}`;
  const { src, keep } = stash(rel);
  const [w, h] = dims(keep);
  const tmp = src + ".tmp.mp4";
  ff([
    "-i", keep,
    "-vf", filter(w, h),
    "-c:v", "libx264", "-preset", "medium", "-crf", "23",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-c:a", "copy",
    tmp,
  ]);
  fs.renameSync(tmp, src);
  console.log(`  ${rel}  ${w}x${h}`);
  done++;
}

console.log(`\nwatermarked ${done} files. originals kept in ${ORIG}`);
