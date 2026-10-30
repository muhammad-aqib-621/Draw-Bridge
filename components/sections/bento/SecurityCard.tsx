"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { securityCard, securityItems } from "@/lib/data";
import { SpotlightCard, CardHeader } from "@/components/ui/SpotlightCard";

/**
 * Security: checklist panel plus a shield outline that draws itself in
 * on scroll (pathLength). One subtle motion, no spinning locks.
 */
export function SecurityCard(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <SpotlightCard>
      <div className="flex items-start justify-between gap-6">
        <CardHeader
          eyebrow={securityCard.eyebrow}
          heading={securityCard.heading}
          sub={securityCard.note}
        />
        <motion.svg
          width="52"
          height="60"
          viewBox="0 0 26 30"
          fill="none"
          aria-hidden="true"
          className="mt-1 flex-none"
        >
          <motion.path
            d="M13 2.5 22.5 6v9.2c0 6.4-4 11.4-9.5 13.8C7.5 26.6 3.5 21.6 3.5 15.2V6L13 2.5Z"
            stroke="rgb(var(--rgb-accent))"
            strokeWidth="1.4"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
          <motion.path
            d="m8.6 14.6 3 3.1 5.8-6.4"
            stroke="rgb(var(--rgb-accent))"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: "easeInOut", delay: reduce ? 0 : 0.9 }}
          />
        </motion.svg>
      </div>

      <ul className="mt-5 flex-1 border-t border-hairline">
        {securityItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-4 border-b border-hairline py-2.5 first:border-t-0 last:border-b-0"
          >
            <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink">
              <Check aria-hidden="true" size={14} className="text-ok" />
              {item.label}
            </span>
            <span className="max-w-[24ch] text-right text-[12px] leading-snug text-faint">
              {item.detail}
            </span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
