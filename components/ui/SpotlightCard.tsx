"use client";

import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card chrome shared by the bento grid: solid surface, hairline border,
 * and a faint cursor-tracking spotlight (hover devices only). No lift,
 * no scale, the border just brightens.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps): JSX.Element {
  const onMouseMove = (event: MouseEvent<HTMLElement>): void => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "spotlight-host relative h-full overflow-hidden rounded-card border border-hairline bg-surface",
        "transition-colors duration-150 hover:border-hairline-strong",
        className
      )}
    >
      <div className="spotlight" aria-hidden="true" />
      <div className="relative flex h-full flex-col p-6 md:p-7">{children}</div>
    </div>
  );
}

export interface CardHeaderProps {
  eyebrow: string;
  heading: string;
  sub?: string;
}

export function CardHeader({ eyebrow, heading, sub }: CardHeaderProps): JSX.Element {
  return (
    <div>
      <p className="micro-label">{eyebrow}</p>
      <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-ink">
        {heading}
      </h3>
      {sub ? (
        <p className="mt-1.5 max-w-[48ch] text-[13.5px] leading-relaxed text-muted">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
