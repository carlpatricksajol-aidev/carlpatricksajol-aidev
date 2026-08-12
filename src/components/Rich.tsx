import type { ReactNode } from "react";

/**
 * Renders the inline emphasis syntax used in src/data/copy.ts.
 *
 *   [[lift:...]]  the highlight   [[step:...]] display ink
 *   [[fig:...]]   a counted number [[said:...]] serif italic, names a term
 *   [[aside:...]] sans italic, an aside
 *
 * Why a mini-syntax rather than JSX in the data file: copy.ts is the one place a
 * non-developer edits, and it is also the file every claim on this site gets
 * checked against. Filling it with spans would make it unreadable for both jobs.
 *
 * Deliberately NOT dangerouslySetInnerHTML. The strings are ours, but a copy
 * file is exactly the kind of thing that later accepts input from somewhere
 * else, and by then nobody remembers the renderer trusts it.
 */

const TOKEN = /\[\[(lift|step|fig|said|aside):([^\]]*)\]\]/g;

const CLASS: Record<string, string> = {
  lift: "lift",
  step: "step",
  fig: "fig tnum",
  said: "said",
  aside: "aside",
};

export const rich = (text: string): ReactNode[] => {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <span key={`${m.index}-${m[1]}`} className={CLASS[m[1]]}>
        {m[2]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

/** strips the syntax, for anywhere the string must be plain text (alt, title, meta) */
export const plain = (text: string) => text.replace(TOKEN, "$2");

const Rich = ({ text }: { text: string }) => <>{rich(text)}</>;

export default Rich;
