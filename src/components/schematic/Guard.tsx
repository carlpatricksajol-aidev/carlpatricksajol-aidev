import { Read } from "./kit";

/**
 * The line it must not cross.
 *
 * Three cards, three different refusal rules, offset -0s/-4s/-8s on the 12s
 * master so one card is always in its approach. The interesting frame is the
 * refusal, and it happens about every fourth cycle — which is why you watch.
 */
const Guard = ({
  label,
  sentence,
  delay,
  live,
}: {
  label?: string;
  sentence: string;
  delay: number;
  live: boolean;
}) => (
  <div className={`sch sch-in mt-s5 block ${live ? "is-live" : ""}`}>
    <p className="t-micro max-w-[54ch] text-ink-tertiary">{sentence}</p>
    <div className="guard mt-s3" aria-hidden="true">
      <span className="guard-rail" />
      <span className="guard-return" />
      <span className="guard-node" />
      <span className="guard-k run-guard" style={{ ["--d" as string]: `${delay}s` }} />
    </div>
    <p className="t-mono tnum flex items-center gap-s3 text-[0.6875rem] text-ink-tertiary" aria-hidden="true">
      {label && <span>{label}</span>}
      <span className="run-guard-say" style={{ ["--d" as string]: `${delay}s`, opacity: 0 }}>
        refused
      </span>
    </p>
  </div>
);

export default Guard;
