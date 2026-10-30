"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Sparkline } from "@/components/ui/Sparkline";
import { heroStats } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Live latency sparkline (~1.2s tick, paused for reduced motion and   */
/* background tabs)                                                    */
/* ------------------------------------------------------------------ */

const INITIAL_SERIES = [16, 15, 17, 16, 14, 15, 18, 17, 16, 15, 17, 19, 16, 15, 14, 16, 18, 17, 16, 15, 16, 15, 14, 15];

function useLatencySeries(): number[] {
  const reduce = useReducedMotion();
  const [series, setSeries] = useState<number[]>(INITIAL_SERIES);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setSeries((previous) => [
        ...previous.slice(1),
        13 + Math.round(Math.random() * 7),
      ]);
    }, 1200);
    return () => clearInterval(id);
  }, [reduce]);

  return series;
}

/* ------------------------------------------------------------------ */
/* Left panel: node diagram (VPC, web, worker, Postgres, queue)        */
/* ------------------------------------------------------------------ */

function DiagramNode({
  x,
  y,
  label,
  sub,
  status,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  status: "ok" | "warn";
}): JSX.Element {
  const dot = status === "ok" ? "rgb(var(--rgb-ok))" : "rgb(var(--rgb-warn))";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="88"
        height="30"
        rx="7"
        fill="rgb(var(--rgb-raised))"
        stroke="var(--color-hairline-strong)"
        strokeWidth="1"
      />
      <circle cx={x + 11} cy={y + 9} r="2.4" fill={dot} />
      <text
        x={x + 19}
        y={y + 12}
        fontSize="8.5"
        fontFamily="var(--font-geist-mono), monospace"
        fill="rgb(var(--rgb-ink))"
      >
        {label}
      </text>
      <text
        x={x + 11}
        y={y + 23}
        fontSize="7"
        fontFamily="var(--font-geist-mono), monospace"
        fill="rgb(var(--rgb-faint))"
      >
        {sub}
      </text>
    </g>
  );
}

const DIAGRAM_NODES = {
  vpc: { x: 6, y: 14 },
  alb: { x: 106, y: 34 },
  web: { x: 38, y: 96 },
  worker: { x: 174, y: 96 },
  pg: { x: 38, y: 168 },
  queue: { x: 174, y: 168 },
} as const;

function DiagramPanel(): JSX.Element {
  const { vpc, alb, web, worker, pg, queue } = DIAGRAM_NODES;
  return (
    <div
      className="relative h-full bg-raised/40 p-3"
      style={{
        backgroundImage:
          "radial-gradient(rgb(var(--rgb-faint) / 0.16) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <svg
        viewBox="0 0 300 218"
        className="h-full w-full"
        role="img"
        aria-label="Architecture diagram: an application load balancer feeding a web service and a worker, backed by Postgres and a queue, inside vpc-prod"
      >
        {/* VPC container */}
        <rect
          x={vpc.x + 2}
          y={vpc.y + 2}
          width="286"
          height="200"
          rx="9"
          fill="none"
          stroke="var(--color-hairline-strong)"
          strokeWidth="1"
        />
        <text
          x={vpc.x + 12}
          y={vpc.y + 14}
          fontSize="7.5"
          fontFamily="var(--font-geist-mono), monospace"
          fill="rgb(var(--rgb-faint))"
        >
          vpc-prod · 10.0.0.0/16 · us-east-1
        </text>

        {/* Edges */}
        <g stroke="var(--color-hairline-strong)" strokeWidth="1">
          <line x1="150" y1="64" x2="82" y2="96" />
          <line x1="150" y1="64" x2="218" y2="96" />
          <line x1="82" y1="126" x2="82" y2="168" />
          <line x1="82" y1="126" x2="218" y2="182" />
          <line x1="218" y1="126" x2="218" y2="168" />
        </g>
        {/* Pulse dots on two edges */}
        <circle r="1.8" fill="rgb(var(--rgb-accent))">
          <animate attributeName="cy" values="96;168" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="cx" values="82;218" dur="2.6s" repeatCount="indefinite" />
        </circle>

        <DiagramNode x={alb.x} y={alb.y} label="alb" sub=":443 · 3 targets" status="ok" />
        <DiagramNode x={web.x} y={web.y} label="svc/web" sub="ecs · 3 tasks" status="ok" />
        <DiagramNode x={worker.x} y={worker.y} label="worker" sub="ecs · reconciling" status="warn" />
        <DiagramNode x={pg.x} y={pg.y} label="rds pg16" sub="db.t4g.medium" status="ok" />
        <DiagramNode x={queue.x} y={queue.y} label="sqs events" sub="visibility 30s" status="ok" />

        <text
          x="12"
          y="210"
          fontSize="7"
          fontFamily="var(--font-geist-mono), monospace"
          fill="rgb(var(--rgb-faint))"
        >
          source: prod-architecture.drawio · imported 2 days ago
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right panel: generated Terraform with a review diff                  */
/* ------------------------------------------------------------------ */

type CodeLine = Array<{ text: string; tone: "plain" | "kw" | "str" | "muted" | "faint" }>;

const TONE_CLASS = {
  plain: "text-ink",
  kw: "text-accent",
  str: "text-ok",
  muted: "text-muted",
  faint: "text-faint",
} as const;

function Line({ parts }: { parts: CodeLine }): JSX.Element {
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={TONE_CLASS[part.tone]}>
          {part.text}
        </span>
      ))}
      {"\n"}
    </>
  );
}

function CodePanel(): JSX.Element {
  return (
    <div className="relative h-full border-t border-hairline md:border-l md:border-t-0">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
        <p className="font-mono text-[10px] tracking-wide text-faint">main.tf · generated</p>
        <p className="font-mono text-[10px] text-ok">plan: 12 to add · 0 destroy</p>
      </div>
      <pre className="overflow-hidden px-3 py-2.5 font-mono text-[10.5px] leading-[1.75] text-muted">
        <code>
          <Line parts={[{ text: "resource ", tone: "kw" }, { text: '"aws_vpc" "main"', tone: "str" }, { text: " {", tone: "muted" }]} />
          <Line parts={[{ text: "  cidr_block = ", tone: "muted" }, { text: '"10.0.0.0/16"', tone: "str" }]} />
          <Line parts={[{ text: "}", tone: "muted" }]} />
          <Line parts={[{ text: "", tone: "plain" }]} />
          <Line parts={[{ text: "+ ", tone: "kw" }, { text: "resource ", tone: "kw" }, { text: '"aws_sqs_queue" "events"', tone: "str" }, { text: " {", tone: "muted" }]} />
          <Line parts={[{ text: "+   visibility_timeout_seconds = 30", tone: "kw" }]} />
          <Line parts={[{ text: "+ }", tone: "kw" }]} />
          <Line parts={[{ text: "", tone: "plain" }]} />
          <Line parts={[{ text: "resource ", tone: "kw" }, { text: '"aws_db_instance" "pg"', tone: "str" }, { text: " {", tone: "muted" }]} />
          <Line parts={[{ text: "  engine          = ", tone: "muted" }, { text: '"postgres"', tone: "str" }]} />
          <Line parts={[{ text: "  instance_class  = ", tone: "muted" }, { text: '"db.t4g.medium"', tone: "str" }]} />
          <Line parts={[{ text: "}", tone: "muted" }]} />
          <Line parts={[{ text: "", tone: "plain" }]} />
          <Line parts={[{ text: "# review required · @ana approved 12:29:44", tone: "faint" }]} />
        </code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status strip                                                        */
/* ------------------------------------------------------------------ */

function StatusStrip(): JSX.Element {
  const series = useLatencySeries();
  const latest = series[series.length - 1];

  return (
    <div className="flex items-center justify-between gap-3 border-t border-hairline bg-surface px-3 py-2.5 min-[420px]:px-4">
      <div className="flex items-center gap-3 min-[420px]:gap-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
            <circle cx="3.5" cy="3.5" r="3" fill="rgb(var(--rgb-ok))" />
          </svg>
          <span className="hidden sm:inline">deploy svc/web ·</span> complete
        </span>
        <span className="hidden items-center gap-1.5 font-mono text-[10px] text-muted md:inline-flex">
          <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
            <circle cx="3.5" cy="3.5" r="3" fill="rgb(var(--rgb-accent))" />
          </svg>
          drift scan · running
        </span>
      </div>

      <div className="flex items-center gap-3 min-[420px]:gap-5">
        <span className="hidden font-mono text-[10px] text-muted sm:inline">
          p95 deploy <span className="text-ink">{heroStats.deployP95}</span>
        </span>
        <span className="hidden font-mono text-[10px] text-muted lg:inline">
          {heroStats.pipelinesWeek} pipelines this week
        </span>
        <span className="flex items-center gap-2">
          <Sparkline
            data={series}
            width={84}
            height={24}
            ariaLabel={`Service latency, currently ${latest} milliseconds p95`}
          />
          <span className="w-9 font-mono text-[11px] tabular-nums text-ink">
            {latest} ms
          </span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mock shell with reserved aspect ratio + max 4° scroll tilt          */
/* ------------------------------------------------------------------ */

export function HeroMock(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Starts at a slight tilt toward the viewer and settles flat on scroll.
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [3.5, 0]);

  return (
    <div
      id="demo"
      ref={sectionRef}
      className="shell relative mt-14 scroll-mt-24 md:mt-16"
      style={{ perspective: "1200px" }}
    >
      <div className="pf-glow pointer-events-none absolute -inset-x-24 -top-24 bottom-0" aria-hidden="true" />
      <motion.div
        style={reduce ? undefined : { rotateX, transformStyle: "preserve-3d" }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-card border border-hairline bg-surface shadow-hero"
      >
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-hairline px-3 py-2 min-[420px]:px-4">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </div>
          <p className="font-mono text-[10px] text-faint">
            pulseflow · <span className="text-muted">infra-prod / us-east-1</span>
          </p>
          <p className="hidden font-mono text-[10px] text-ok min-[420px]:inline">
            TF 1.9
          </p>
        </div>

        {/* Split view: exact md aspect ratio reserved; stacked on mobile */}
        <div className="aspect-[4/3] sm:aspect-[16/9] md:grid md:aspect-auto md:grid-cols-2">
          <div className="h-56 sm:h-64 md:h-full">
            <DiagramPanel />
          </div>
          <CodePanel />
        </div>

        <StatusStrip />
      </motion.div>
    </div>
  );
}
