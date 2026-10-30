export interface FaqItemProps {
  question: string;
  answer: string;
  /** Controls the slide-in stagger applied by the parent list. */
  className?: string;
}

/**
 * Native <details>/<summary> accordion. Height animates through the
 * 0fr→1fr grid trick in globals.css; the plus/minus morphs with CSS.
 * No JavaScript needed, fully keyboard accessible.
 */
export function FaqItem({ question, answer, className }: FaqItemProps): JSX.Element {
  return (
    <details className={`group ${className ?? ""}`}>
      <summary className="flex items-center justify-between gap-6 py-5 text-[15px] font-medium text-ink transition-colors duration-150 hover:text-accent">
        {question}
        <span className="pm" aria-hidden="true" />
      </summary>
      <div className="acc-panel">
        <div>
          <p className="max-w-[62ch] pb-5 text-[15px] leading-[1.6] text-muted">
            {answer}
          </p>
        </div>
      </div>
    </details>
  );
}
