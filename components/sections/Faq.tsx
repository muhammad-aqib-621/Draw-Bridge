import { faq, faqItems } from "@/lib/data";
import { FaqItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function Faq(): JSX.Element {
  return (
    <section id="faq" className="scroll-mt-20" aria-labelledby="faq-heading">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="micro-label">{faq.eyebrow}</p>
            <h2
              id="faq-heading"
              className="mt-3 text-[clamp(1.75rem,3.4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink"
            >
              {faq.heading}
            </h2>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-muted">
              {faq.sub}
            </p>
          </Reveal>

          <div className="md:col-span-8">
            <Reveal delay={0.06}>
              <div className="flex flex-col divide-y divide-hairline rounded-card border border-hairline bg-surface px-6 md:px-7">
                {faqItems.map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
