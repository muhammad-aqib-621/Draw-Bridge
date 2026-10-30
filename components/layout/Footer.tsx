"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { footerColumns, footerCopyright, footerStatus, footerTagline, newsletter } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Wordmark } from "@/components/layout/Navbar";
import { cn, isValidEmail } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Newsletter: inline validation, aria-live status, 900ms mock submit  */
/* ------------------------------------------------------------------ */

interface NewsletterFormState {
  email: string;
  status: "idle" | "loading" | "success";
  error: string | null;
}

export function NewsletterForm(): JSX.Element {
  const [state, setState] = useState<NewsletterFormState>({
    email: "",
    status: "idle",
    error: null,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setEmail = (value: string): void =>
    setState((s) => ({ ...s, email: value }));

  const validate = (): string | null => {
    if (state.email.trim() === "") return newsletter.invalid;
    if (!isValidEmail(state.email)) return newsletter.invalid;
    return null;
  };

  const onBlur = (): void => {
    if (state.email.trim() === "") {
      setState((s) => ({ ...s, error: null }));
      return;
    }
    setState((s) => ({ ...s, error: validate() }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (state.status === "loading") return;
    const error = validate();
    if (error) {
      setState((s) => ({ ...s, error }));
      return;
    }
    setState((s) => ({ ...s, error: null, status: "loading" }));
    // Mock submit, no third-party call.
    timerRef.current = setTimeout(() => {
      setState({ email: "", status: "success", error: null });
    }, 900);
  };

  const { email, status, error } = state;
  const describedBy = error ? "newsletter-status" : undefined;

  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{newsletter.title}</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
        {newsletter.blurb}
      </p>

      {status === "success" ? (
        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className="mt-4 inline-flex items-center gap-2 rounded-card-sm border border-ok/30 bg-ok/8 px-3 py-2.5 text-[13px] text-ink"
        >
          <Check aria-hidden="true" size={14} className="text-ok" />
          {newsletter.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                {newsletter.emailLabel}
              </label>
              <Input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={onBlur}
                error={Boolean(error)}
                aria-describedby={describedBy}
                disabled={status === "loading"}
              />
            </div>
            <Button type="submit" size="md" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <span className="pf-spinner" aria-hidden="true" />
                  <span className="sr-only">Submitting</span>
                </>
              ) : null}
              {newsletter.button}
            </Button>
          </div>
          <p
            id="newsletter-status"
            role="status"
            aria-live="polite"
            className={cn(
              "mt-2 min-h-[18px] text-[12.5px]",
              error ? "text-danger" : "text-faint"
            )}
          >
            {status === "loading"
              ? newsletter.loading
              : error ?? undefined}
          </p>
        </form>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-hairline bg-base">
      <div className="shell pb-10 pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + tagline + status + newsletter */}
          <div className="lg:col-span-5">
            <a href="#" aria-label="PulseFlow home" className="inline-block rounded-card-sm">
              <Wordmark />
            </a>
            <p className="mt-3 max-w-[38ch] text-[13.5px] leading-relaxed text-muted">
              {footerTagline}
            </p>
            <a
              href="#"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:text-ink"
            >
              <span className="pf-ping" aria-hidden="true" />
              <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true">
                <circle cx="3.5" cy="3.5" r="3" fill="rgb(var(--rgb-ok))" />
              </svg>
              {footerStatus}
            </a>
            <div className="mt-8 max-w-sm" id="changelog">
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7 lg:pl-12">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="micro-label">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13.5px] text-muted transition-colors duration-150 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-[12.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{footerCopyright}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            SOC 2 Type II · US / EU data residency
          </p>
        </div>
      </div>
    </footer>
  );
}
