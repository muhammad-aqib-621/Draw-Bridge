import { logoStrip } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Seven invented wordmarks, deliberately varied in letterforms, weight,
 * and width so the row doesn't read as one templated strip.
 * Each renders monochrome via currentColor: 55% opacity, 100% on hover.
 */
const LOGOS: Array<{ name: string; width: number; svg: JSX.Element }> = [
  {
    name: "Camber",
    width: 122,
    svg: (
      <>
        <path d="M3 14 8 4l5 10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text x="17" y="19" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.4" fill="currentColor">
          camber
        </text>
      </>
    ),
  },
  {
    name: "Ridgeline",
    width: 138,
    svg: (
      <>
        <path d="M2 12l5-4 4 3 5-5 4 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <text x="24" y="19" fontFamily="Georgia, 'Times New Roman', serif" fontSize="13" letterSpacing="0.06em" fill="currentColor">
          RIDGELINE
        </text>
      </>
    ),
  },
  {
    name: "Osmore",
    width: 112,
    svg: (
      <>
        <circle cx="6" cy="14" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="14" y="19" fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="13" fill="currentColor">
          osmore
        </text>
      </>
    ),
  },
  {
    name: "Triwave",
    width: 116,
    svg: (
      <>
        <path d="M2 18 7 6l5 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <text x="16" y="19" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="600" fontSize="14" fill="currentColor">
          triwave
        </text>
      </>
    ),
  },
  {
    name: "Halcyon",
    width: 128,
    svg: (
      <>
        <rect x="3" y="19" width="4" height="4" rx="1" fill="currentColor" />
        <text x="12" y="18" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="400" fontSize="13.5" letterSpacing="0.22em" fill="currentColor">
          HALCYON
        </text>
      </>
    ),
  },
  {
    name: "Bitfeld",
    width: 120,
    svg: (
      <>
        <text x="3" y="19" fontFamily="ui-monospace, SFMono-Regular, monospace" fontWeight="700" fontSize="14.5" fill="currentColor">
          bit_feld
        </text>
        <rect x="86" y="6" width="5" height="5" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Novaseam",
    width: 132,
    svg: (
      <>
        <path d="M3 10c3-3.5 6.5-3.5 9.5 0s6.5 3.5 9.5 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <text x="4" y="21" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="500" fontStyle="italic" fontSize="14" letterSpacing="-0.2" fill="currentColor">
          novaseam
        </text>
      </>
    ),
  },
];

function LogoList({ hidden = false }: { hidden?: boolean }): JSX.Element {
  return (
    <ul aria-hidden={hidden || undefined} className="flex items-center gap-14 pr-14">
      {LOGOS.map((logo) => (
        <li key={logo.name} className="flex shrink-0 items-center">
          <span
            className="logo-item block cursor-default rounded-card-sm"
            title={logo.name}
          >
            <svg
              width={logo.width}
              height="24"
              viewBox={`0 0 ${logo.width} 24`}
              fill="none"
              role="img"
              aria-label={`${logo.name} wordmark`}
            >
              {logo.svg}
            </svg>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee(): JSX.Element {
  return (
    <section className="border-y border-hairline bg-base" aria-label={logoStrip.label}>
      <Reveal className="shell py-10">
        <div className="flex flex-col gap-6">
          <p className="micro-label">{logoStrip.label}</p>
          <div className="marquee" role="presentation">
            <div className="marquee-track">
              <LogoList />
              {/* Duplicated content for the seamless loop */}
              <LogoList hidden />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
