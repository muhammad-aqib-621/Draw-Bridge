import type { Metadata } from "next";
import { SignupForm } from "@/components/sections/SignupForm";

export const metadata: Metadata = {
  title: "Create your workspace",
  description:
    "Create a free PulseFlow workspace: 3 environments, 2 seats, 200 run minutes. No credit card.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: true },
};

export default function SignupPage(): JSX.Element {
  return (
    <section
      className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 pb-16 pt-28 md:pb-24"
      aria-labelledby="signup-heading"
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
              id="signup-heading"
              className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink"
            >
              Create your workspace
            </h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              Import a diagram, review the Terraform, deploy through a pull
              request.
            </p>
          </div>

          <SignupForm />
        </div>

        <p className="mt-6 text-center text-[12.5px] text-faint">
          Front-of-house mock. When the product backend exists, point the
          form at <span className="font-mono text-[11.5px]">POST /api/auth/signup</span>.
        </p>
      </div>
    </section>
  );
}
