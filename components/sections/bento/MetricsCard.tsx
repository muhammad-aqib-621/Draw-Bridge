"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { alertRule, latencyByDay, metricsCard } from "@/lib/data";
import { SpotlightCard, CardHeader } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Chart geometry                                                       */
/* ------------------------------------------------------------------ */

const CHART = { width: 300, height: 132, padX: 6, baseY: 116, maxMs: 48 } as const;

const BARS = latencyByDay.map((point, index) => {
  const slot = (CHART.width - CHART.padX * 2) / latencyByDay.length;
  const barWidth = 20;
  const x = CHART.padX + index * slot + (slot - barWidth) / 2;
  const fullHeight = (point.ms / CHART.maxMs) * (CHART.baseY - 6);
  return { ...point, x, barWidth, fullHeight, slot, center: x + barWidth / 2 };
});

function ChartSkeleton(): JSX.Element {
  // Same bounding box as the real chart so hydration causes zero shift.
  return (
    <div
      className="flex items-end gap-[6.2%] px-1.5 pt-1"
      style={{ height: CHART.height, width: CHART.width, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {BARS.map((bar) => (
        <div
          key={bar.day}
          className="flex-1 rounded-sm bg-raised"
          style={{ height: `${Math.max(bar.fullHeight, 4)}px` }}
        />
      ))}
    </div>
  );
}

function BarChart(): JSX.Element {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const activeBar = active !== null ? BARS[active] : null;

  return (
    <div className="relative w-full max-w-[300px]">
      {/** Skeleton occupies the exact chart box until hydration */}
      {!mounted ? <ChartSkeleton /> : null}

      {mounted ? (
        <>
          {activeBar ? (
            <div
              role="status"
              className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 whitespace-nowrap rounded-card-sm border border-hairline-strong bg-raised px-2 py-1 font-mono text-[10.5px] tabular-nums text-ink shadow-card"
              style={{ left: `${(activeBar.center / CHART.width) * 100}%` }}
            >
              {activeBar.day} · {activeBar.ms} ms p95
            </div>
          ) : null}

          <svg
            viewBox={`0 0 ${CHART.width} ${CHART.height}`}
            className="block w-full"
            style={{ height: CHART.height }}
            role="img"
            aria-label={`p95 service latency by day, Monday through Sunday: 38, 41, 36, 44, 41, 28, and 24 milliseconds`}
            onMouseLeave={() => setActive(null)}
          >
            {/* Baseline */}
            <line
              x1={CHART.padX}
              y1={CHART.baseY + 4}
              x2={CHART.width - CHART.padX}
              y2={CHART.baseY + 4}
              stroke="var(--color-hairline-strong)"
              strokeWidth="1"
            />
            {BARS.map((bar, index) => (
              <motion.g
                key={bar.day}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
              >
                {/* Invisible hover/click target, full column height */}
                <rect
                  x={bar.center - bar.slot / 2}
                  y={0}
                  width={bar.slot}
                  height={CHART.height}
                  fill="transparent"
                />
                <motion.rect
                  x={bar.x}
                  width={bar.barWidth}
                  rx="3"
                  fill={
                    active === index
                      ? "rgb(var(--rgb-accent))"
                      : "rgb(var(--rgb-ink) / 0.22)"
                  }
                  initial={{
                    height: reduce ? bar.fullHeight : 0,
                    y: reduce ? CHART.baseY - bar.fullHeight : CHART.baseY,
                  }}
                  whileInView={{
                    height: bar.fullHeight,
                    y: CHART.baseY - bar.fullHeight,
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: reduce ? 0 : index * 0.06,
                  }}
                />
                <text
                  x={bar.center}
                  y={CHART.height - 2}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="var(--font-geist-mono), monospace"
                  fill={active === index ? "rgb(var(--rgb-ink))" : "rgb(var(--rgb-faint))"}
                >
                  {bar.day}
                </text>
              </motion.g>
            ))}
          </svg>
        </>
      ) : null}

      {/* Accessible data for non-visual readers */}
      <span className="sr-only">
        Values in ms p95 by day:{" "}
        {latencyByDay.map((p) => `${p.day} ${p.ms}`).join(", ")}.
      </span>
    </div>
  );
}

export function MetricsCard(): JSX.Element {
  return (
    <SpotlightCard>
      <CardHeader
        eyebrow={metricsCard.eyebrow}
        heading={metricsCard.heading}
        sub={metricsCard.sub}
      />

      <div className="mt-6 flex flex-1 flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <BarChart />

        {/* Mocked alert rule */}
        <div className="w-full max-w-[240px] sm:w-auto sm:max-w-[250px]">
          <p className="micro-label">Alert rule</p>
          <div
            className={cn(
              "mt-2 rounded-card-sm border bg-raised px-3 py-2.5",
              alertRule.state === "healthy"
                ? "border-warn/30"
                : "border-hairline"
            )}
          >
            <p className="flex items-start gap-2 font-mono text-[12px] leading-relaxed text-ink">
              <TriangleAlert
                aria-hidden="true"
                size={13}
                className="mt-0.5 flex-none text-warn"
              />
              {alertRule.trigger}
            </p>
            <p className="mt-1.5 pl-[21px] text-[12px] text-muted">
              → {alertRule.action}
            </p>
          </div>
          <p className="mt-2 text-[12px] text-faint">
            Firing 0 times in last 7 days.
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}
