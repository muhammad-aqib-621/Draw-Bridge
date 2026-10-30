import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Talk to engineering",
  description:
    "Tell us about your infrastructure. An engineer who runs PulseFlow in production answers within one business day.",
  alternates: { canonical: "/contact" },
  robots: { index: false, follow: true },
};

export default function ContactPage(): JSX.Element {
  return (
    <section
      className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 pb-16 pt-28 md:pb-24"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-md">
        <div className="rounded-card border border-hairline bg-surface p-8 shadow-card">
          <div className="text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-raised">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4.5 12h3.4l2-5.5 3.4 11 2.2-5.5h4"
                  stroke="rgb(var(--rgb-accent))"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h1
              id="contact-heading"
              className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink"
            >
              Talk to engineering
            </h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              Enterprise means self-hosted runners, SCIM, custom run-minute
              pools, and a real SLA. Tell us about your stack.
            </p>
          </div>

          <ContactForm />
        </div>

        <p className="mt-6 text-center text-[12.5px] text-faint">
          Front-of-house mock. When the product backend exists, point the
          form at <span className="font-mono text-[11.5px]">POST /api/enterprise/contact</span>.
        </p>
      </div>
    </section>
  );
}
