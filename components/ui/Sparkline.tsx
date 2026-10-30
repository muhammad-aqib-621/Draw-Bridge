export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  ariaLabel: string;
  /** Show an emphasized dot on the newest point. */
  showDot?: boolean;
}

/**
 * Deterministic sparkline: pure SVG from props, safe to render on
 * the server. A parent component owns any live data.
 */
export function Sparkline({
  data,
  width = 96,
  height = 28,
  ariaLabel,
  showDot = true,
}: SparklineProps): JSX.Element {
  const pad = 3;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / Math.max(data.length - 1, 1);

  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((v - min) / span) * (height - pad * 2);
    return { x, y };
  });

  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${points[points.length - 1].x.toFixed(1)},${height - pad}`;
  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaLabel}
    >
      <polygon points={area} fill="rgb(var(--rgb-accent) / 0.12)" />
      <polyline
        points={line}
        fill="none"
        stroke="rgb(var(--rgb-accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot ? <circle cx={last.x} cy={last.y} r="2" fill="rgb(var(--rgb-accent))" /> : null}
    </svg>
  );
}
