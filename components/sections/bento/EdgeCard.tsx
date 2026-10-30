import { edgeCard, edgeRegions } from "@/lib/data";
import { SpotlightCard, CardHeader } from "@/components/ui/SpotlightCard";
import { StatusDot } from "@/components/ui/Badge";

/**
 * Edge deployments: one large mono number, a region list with staggered
 * ping dots, and an honest footnote. Purely presentational.
 */
export function EdgeCard(): JSX.Element {
  return (
    <SpotlightCard>
      <CardHeader eyebrow={edgeCard.eyebrow} heading={edgeCard.heading} />
      <p
        className="mt-6 font-mono text-[56px] font-medium leading-none tracking-[-0.04em] text-ink tabular-nums"
        aria-label="12 milliseconds median probe latency"
      >
        12<small className="ml-1 font-sans text-sm font-normal text-muted">ms</small>
      </p>
      <p className="mt-1.5 text-[12.5px] text-muted">{edgeCard.bigCaption}</p>

      <ul className="mt-6 flex-1 border-t border-hairline pt-4">
        {edgeRegions.map((region, index) => (
          <li key={region.code} className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-2.5">
              <StatusDot color="ok" ping delay={index * 320} />
              <span className="font-mono text-[12px] text-ink">{region.code}</span>
              <span className="text-[12.5px] text-muted">{region.name}</span>
            </span>
            <span className="font-mono text-[12px] tabular-nums text-muted">
              {region.ms} ms
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-[44ch] text-[12.5px] leading-relaxed text-faint">
        {edgeCard.note}
      </p>
    </SpotlightCard>
  );
}
