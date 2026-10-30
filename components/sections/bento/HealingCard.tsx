"use client";

import { useState } from "react";
import { healingCard, healingEvents, type HealingEvent } from "@/lib/data";
import { SpotlightCard, CardHeader } from "@/components/ui/SpotlightCard";
import { StatusDot } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface EventRowProps {
  event: HealingEvent;
  open: boolean;
  onToggle: () => void;
  index: number;
}

function EventRow({ event, open, onToggle, index }: EventRowProps): JSX.Element {
  const panelId = `healing-panel-${event.id}`;

  return (
    <li className={cn(index > 0 && "border-t border-hairline")}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center gap-3 py-3 text-left transition-colors duration-150 hover:text-ink"
      >
        <StatusDot color={event.status} />
        <span className="w-14 flex-none font-mono text-[11px] tabular-nums text-faint">
          {event.time}
        </span>
        <span className="flex-1 truncate text-[13.5px] font-medium text-ink">
          {event.title}
        </span>
        <span className="pm" aria-hidden="true" />
      </button>

      {/* Height animates via the 0fr→1fr grid trick (globals.css) */}
      <div className="exp-panel" data-open={open} id={panelId}>
        <div>
          <dl className="space-y-2.5 pb-4 pl-[86px] pr-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                What happened
              </dt>
              <dd className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted">
                {event.whatFailed}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                What PulseFlow did
              </dt>
              <dd className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-muted">
                {event.whatChanged}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Duration
              </dt>
              <dd className="mt-1 font-mono text-[12px] tabular-nums text-ink">
                {event.duration}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </li>
  );
}

export function HealingCard(): JSX.Element {
  // First event open by default so the affordance is visible without
  // any interaction.
  const [openId, setOpenId] = useState<string | null>(healingEvents[0]?.id ?? null);

  return (
    <SpotlightCard>
      <CardHeader
        eyebrow={healingCard.eyebrow}
        heading={healingCard.heading}
        sub={healingCard.sub}
      />
      <ul className="mt-5 flex-1 border-t border-hairline">
        {healingEvents.map((event, index) => (
          <EventRow
            key={event.id}
            event={event}
            index={index}
            open={openId === event.id}
            onToggle={() => setOpenId(openId === event.id ? null : event.id)}
          />
        ))}
      </ul>
    </SpotlightCard>
  );
}
