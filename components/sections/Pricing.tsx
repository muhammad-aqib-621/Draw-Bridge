"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { plans, pricing, type Plan } from "@/lib/data";
import { Toggle } from "@/components/ui/Toggle";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function PriceRoll({ plan, annual }: { plan: Plan; annual: boolean }): JSX.Element {
  const reduce = useReducedMotion();
  const price = annual ? plan.annual : plan.monthly;

  // Custom pricing renders as text; only numeric values roll.
  if (price === null) {
    return (
      <span className="font-mono text-[38px] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">
        Custom
      </span>
    );
  }

  return (
    <span className="flex items-baseline gap-1.5">
      <span
        className={cn(
          "relative inline-flex font-mono text-[38px] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink",
          "overflow-hidden"
        )}
      >
        {/* Fixed box keeps the row height constant across the roll */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={`${plan.id}-${price}`}
            initial={reduce ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-block"
            aria-hidden="true"
          >
            ${price}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-[13px] text-muted">/mo</span>
    </span>
  );
}

interface PlanCardProps {
  plan: Plan;
  annual: boolean;
}

function PlanCard({ plan, annual }: PlanCardProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card border p-6 md:p-7",
        plan.featured
          ? "border-accent/40 bg-surface shadow-card"
          : "border-hairline bg-surface hover:border-hairline-strong"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
          {plan.name}
        </h3>
        {plan.featuredLabel ? (
          <span className="rounded-full bg-accent/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
            {plan.featuredLabel}
          </span>
        ) : null}
      </div>
      <p className="mt-2 min-h-[40px] max-w-[30ch] text-[13.5px] leading-relaxed text-muted">
        {plan.tagline}
      </p>

      <div className="mt-5">
        <PriceRoll plan={plan} annual={annual} />
        <p className="mt-1.5 font-mono text-[11px] tracking-wide text-faint">
          {annual ? plan.noteAnnual : plan.noteMonthly}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-hairline pt-5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-muted">
            <Check aria-hidden="true" size={14} className="mt-0.5 flex-none text-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <ButtonLink
          href={plan.cta.href}
          variant={plan.featured ? "primary" : "secondary"}
          size="md"
          className="w-full"
        >
          {plan.cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}

export function Pricing(): JSX.Element {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <section id="pricing" className="scroll-mt-20 border-y border-hairline bg-surface/60" aria-labelledby="pricing-heading">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="micro-label">{pricing.eyebrow}</p>
            <h2
              id="pricing-heading"
              className="mt-3 text-balance text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink"
            >
              {pricing.heading}
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:justify-self-end" delay={0.06}>
            <Toggle
              label={pricing.toggleLabel}
              value={billing}
              onChange={(value) => setBilling(value === "annual" ? "annual" : "monthly")}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "annual", label: "Annual", tag: pricing.saveTag },
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} annual={billing === "annual"} />
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-1.5">
          <p className="max-w-[72ch] text-[13px] leading-relaxed text-faint">
            {pricing.footnote}
          </p>
          <p className="text-[13px] text-muted">{pricing.comparison}</p>
        </div>
      </div>
    </section>
  );
}
