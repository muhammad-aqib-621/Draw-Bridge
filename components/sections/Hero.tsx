"use client";

import { ArrowRight, Play } from "lucide-react";
import { announcement, hero } from "@/lib/data";
import { buttonClasses } from "@/components/ui/Button";
import { HeroMock } from "@/components/sections/HeroMock";
import { cn } from "@/lib/utils";

/**
 * Hero: static, deterministic markup for text (good LCP), mock below.
 * No scroll-reveal on the headline; the page should be readable even
 * before hydration.
 */
export function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40" aria-labelledby="hero-heading">
      {/* Faint 1px grid, fading out radially */}
      <div className="pf-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />

      <div className="shell relative">
        <a
          href={announcement.href}
          className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 py-1 pl-3 pr-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:border-hairline-strong hover:text-ink"
        >
          <span className="text-accent">{announcement.version}</span>
          <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
          <span className="normal-case tracking-normal">{announcement.label}</span>
          <ArrowRight
            aria-hidden="true"
            size={13}
            className="text-faint transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </a>

        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink text-center md:text-left"
        >
          {hero.titleLead}
          <br />
          <span className="text-accent">{hero.titleAccent}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[62ch] text-center text-[16.5px] leading-[1.6] text-muted md:mx-0 md:text-left md:text-[17px]">
          {hero.sub}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
          <a
            href={hero.primaryCta.href}
            className={cn(buttonClasses({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className={cn(
              buttonClasses({ variant: "secondary", size: "lg" }),
              "w-full sm:w-auto"
            )}
          >
            <Play aria-hidden="true" size={14} className="text-muted" />
            {hero.secondaryCta.label}
          </a>
        </div>

        <p className="mt-3.5 text-center text-[13px] text-muted md:text-left">
          {hero.note}
        </p>
      </div>

      <HeroMock />
    </section>
  );
}
