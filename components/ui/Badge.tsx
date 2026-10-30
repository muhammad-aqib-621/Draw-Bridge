import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type StatusColor = "ok" | "warn" | "danger" | "accent";

export interface BadgeProps {
  children: ReactNode;
  /** Optional inline status dot (small SVG, never an emoji). */
  dot?: StatusColor;
  /** Slow sonar ping behind the dot. */
  ping?: boolean;
  className?: string;
}

const dotColor: Record<StatusColor, string> = {
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
  accent: "bg-accent",
};

export function Badge({
  children,
  dot,
  ping = false,
  className,
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1",
        "font-mono text-[11px] uppercase tracking-[0.14em] text-muted",
        className
      )}
    >
      {dot ? <StatusDot color={dot} ping={ping} /> : null}
      {children}
    </span>
  );
}

export interface StatusDotProps {
  color: StatusColor;
  ping?: boolean;
  /** Stagger for animated groups. */
  delay?: number;
  className?: string;
}

/**
 * Tiny status dot. A plain <circle> keeps it crisp at 6px; the ping is
 * a separate CSS-driven span so it respects prefers-reduced-motion.
 */
export function StatusDot({
  color,
  ping = false,
  delay = 0,
  className,
}: StatusDotProps): JSX.Element {
  const cssColor: Record<StatusColor, string> = {
    ok: "rgb(var(--rgb-ok))",
    warn: "rgb(var(--rgb-warn))",
    danger: "rgb(var(--rgb-danger))",
    accent: "rgb(var(--rgb-accent))",
  };
  return (
    <span className={cn("relative inline-flex h-[7px] w-[7px] flex-none", className)}>
      {ping ? (
        <span
          aria-hidden="true"
          className="pf-ping absolute inset-0"
          style={{ "--pf-ping-color": cssColor[color], "--pf-ping-delay": `${delay}ms` } as CSSProperties}
        />
      ) : null}
      <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true" className="relative">
        <circle cx="3.5" cy="3.5" r="3" fill={cssColor[color]} />
      </svg>
    </span>
  );
}
