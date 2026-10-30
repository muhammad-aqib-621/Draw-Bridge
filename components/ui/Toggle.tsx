"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface ToggleOption {
  value: string;
  label: string;
  /** Small optional tag rendered next to the label, e.g. "Save 20%". */
  tag?: string;
}

export interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  className?: string;
}

/**
 * Segmented control built as a WAI-ARIA radiogroup with roving tabindex:
 * arrows move selection and focus, Home/End jump to the ends.
 */
export function Toggle({
  options,
  value,
  onChange,
  label,
  className,
}: ToggleProps): JSX.Element {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    const current = options.findIndex((o) => o.value === value);
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (current + 1) % options.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (current - 1 + options.length) % options.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = options.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-hairline bg-surface p-1",
        className
      )}
    >
      {options.map((option, index) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onKeyDown={onKeyDown}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium",
              "transition-colors duration-150 active:scale-[0.98]",
              checked ? "bg-raised text-ink" : "text-muted hover:text-ink"
            )}
          >
            {option.label}
            {option.tag ? (
              <span className="rounded-sm bg-accent/12 px-1.5 py-px font-mono text-[10px] uppercase tracking-wide text-accent">
                {option.tag}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
