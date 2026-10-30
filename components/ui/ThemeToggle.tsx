"use client";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme switch persisted to localStorage. Icon visibility is driven by
 * CSS against [data-theme], so server and client markup always match
 * (no hydration mismatch, no mounted check, no flash).
 */
export function ThemeToggle({ className }: ThemeToggleProps): JSX.Element {
  const toggle = (): void => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("pf-theme", next);
    } catch {
      // Private mode: theme still applies for this session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={`theme-toggle rounded-card-sm p-2 text-muted transition-colors duration-150 hover:text-ink ${className ?? ""}`}
    >
      {/* Sun shows in dark theme (switch to light); moon in light. */}
      <svg
        className="icon-sun"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M8 1.2v1.6M8 13.2v1.6M2.8 2.8l1.1 1.1M12.1 12.1l1.1 1.1M1.2 8h1.6M13.2 8h1.6M2.8 13.2l1.1-1.1M12.1 3.9l1.1-1.1"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="icon-moon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M13.5 9.7A6 6 0 0 1 6.3 2.5a6 6 0 1 0 7.2 7.2Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
