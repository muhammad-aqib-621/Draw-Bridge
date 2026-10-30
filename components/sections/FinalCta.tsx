import { finalCta } from "@/lib/data";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Full-bleed CTA band directly above the footer. Split layout so the
 * page doesn't end on another centered block.
 */
export function FinalCta(): JSX.Element {
  return (
    <section
      id="get-started"
      className="scroll-mt-20 border-t border-hairline bg-base"
      aria-labelledby="cta-heading"
    >
      <div className="shell py-20 md:py-24">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="micro-label">{finalCta.eyebrow}</p>
              <h2
                id="cta-heading"
                className="mt-3 max-w-[26ch] text-balance text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink"
              >
                {finalCta.heading}
              </h2>
              <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.6] text-muted">
                {finalCta.sub}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
              <a
                href={finalCta.primary.href}
                className={cn(buttonClasses({ variant: "primary", size: "lg" }), "md:w-auto")}
              >
                {finalCta.primary.label}
              </a>
              <a
                href={finalCta.secondary.href}
                className={cn(buttonClasses({ variant: "secondary", size: "lg" }), "md:w-auto")}
              >
                {finalCta.secondary.label}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
