import { features } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { HealingCard } from "@/components/sections/bento/HealingCard";
import { EdgeCard } from "@/components/sections/bento/EdgeCard";
import { SecurityCard } from "@/components/sections/bento/SecurityCard";
import { MetricsCard } from "@/components/sections/bento/MetricsCard";

/**
 * Asymmetric 12-col bento: 7/5 then 5/7, so no two rows read the same.
 * Left-aligned heading, supporting paragraph offset to the right.
 */
export function BentoGrid(): JSX.Element {
  return (
    <section id="product" className="scroll-mt-20" aria-labelledby="features-heading">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="micro-label">{features.eyebrow}</p>
              <h2
                id="features-heading"
                className="mt-3 max-w-[24ch] text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink"
              >
                {features.heading}
              </h2>
            </div>
            <p className="max-w-[52ch] text-[15px] leading-[1.6] text-muted md:col-span-5 md:pb-1.5">
              {features.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={0.06}>
            <HealingCard />
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.12}>
            <EdgeCard />
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.06}>
            <SecurityCard />
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.12}>
            <MetricsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
