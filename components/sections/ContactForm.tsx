"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn, isValidEmail } from "@/lib/utils";

type FieldName = "name" | "email" | "company" | "teamSize" | "message";

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
  status: "idle" | "loading" | "success";
  fieldErrors: Partial<Record<FieldName, string>>;
}

const FIELD_CLASS =
  "h-10 w-full rounded-card-sm border bg-raised px-3 py-2 text-sm text-ink placeholder:text-faint transition-colors duration-150";

/**
 * Enterprise inquiry. Mock submit with no backend call; point it at
 * POST /api/enterprise/contact when a backend is wired up.
 */
export function ContactForm(): JSX.Element {
  const [state, setState] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    teamSize: "21 - 100 engineers",
    message: "",
    status: "idle",
    fieldErrors: {},
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const patch = (partial: Partial<ContactFormState>): void =>
    setState((previous) => ({ ...previous, ...partial }));

  const setFieldError = (field: FieldName, error: string | null): void =>
    setState((previous) => {
      const fieldErrors = { ...previous.fieldErrors };
      if (error) fieldErrors[field] = error;
      else delete fieldErrors[field];
      return { ...previous, fieldErrors };
    });

  const validateField = (field: FieldName): string | null => {
    switch (field) {
      case "name":
        return state.name.trim().length >= 2
          ? null
          : "Tell us who you are so we know we are talking shop, not spam.";
      case "email":
        return isValidEmail(state.email)
          ? null
          : "Enter a valid work email, e.g. you@company.com.";
      case "message":
        return state.message.trim().length >= 20
          ? null
          : "A sentence or two about your stack (20+ characters) gets a faster, more specific reply.";
      default:
        return null;
    }
  };

  const onBlur = (field: FieldName): void => {
    if (state[field].trim() === "") {
      setFieldError(field, null);
      return;
    }
    setFieldError(field, validateField(field));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (state.status === "loading") return;

    const errors: ContactFormState["fieldErrors"] = {};
    for (const field of ["name", "email", "message"] as const) {
      const error = validateField(field);
      if (error) errors[field] = error;
    }
    if (Object.keys(errors).length > 0) {
      patch({ fieldErrors: errors });
      return;
    }
    patch({ fieldErrors: {}, status: "loading" });
    timerRef.current = setTimeout(() => patch({ status: "success" }), 900);
  };

  const { name, email, company, teamSize, message, status, fieldErrors } = state;

  if (status === "success") {
    return (
      <div
        className="rounded-card border border-ok/30 bg-ok/10 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-ok/40 bg-ok/12">
          <Check aria-hidden="true" size={18} className="text-ok" />
        </span>
        <h2 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">
          Message received
        </h2>
        <p className="mx-auto mt-2 max-w-[44ch] text-[13.5px] leading-relaxed text-muted">
          An engineer replies within one business day, usually faster. In the
          meantime, the staging workspace stays open for you.
        </p>
        <p className="mx-auto mt-4 max-w-[40ch] text-[12.5px] text-faint">
          Reference: ENT-{new Date().getFullYear()}-0042 · demo environment, no data sent
        </p>
        <a
          href="/"
          className={cn(buttonClasses({ variant: "secondary", size: "md" }), "mt-6")}
        >
          Back to the site
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 text-left">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label htmlFor="contact-name" className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink">Name</span>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Ana Ferreira"
              value={name}
              required
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              className={cn(
                FIELD_CLASS,
                fieldErrors.name
                  ? "border-danger/60 focus:border-danger"
                  : "border-hairline hover:border-hairline-strong focus:border-accent/60"
              )}
              disabled={status === "loading"}
              onChange={(e) => patch({ name: e.target.value })}
              onBlur={() => onBlur("name")}
            />
          </label>
          <label htmlFor="contact-email" className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink">Work email</span>
            <Input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              value={email}
              required
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              error={Boolean(fieldErrors.email)}
              disabled={status === "loading"}
              onChange={(e) => patch({ email: e.target.value })}
              onBlur={() => onBlur("email")}
            />
          </label>
        </div>
        {fieldErrors.name ? (
          <p id="contact-name-error" role="status" className="-mt-2 text-[12.5px] text-danger">
            {fieldErrors.name}
          </p>
        ) : null}
        {fieldErrors.email ? (
          <p id="contact-email-error" role="status" className="-mt-2 text-[12.5px] text-danger">
            {fieldErrors.email}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label htmlFor="contact-company" className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink">Company</span>
            <input
              id="contact-company"
              type="text"
              name="organization"
              autoComplete="organization"
              placeholder="Ridgeline Systems"
              value={company}
              className={cn(
                FIELD_CLASS,
                "border-hairline hover:border-hairline-strong focus:border-accent/60"
              )}
              disabled={status === "loading"}
              onChange={(e) => patch({ company: e.target.value })}
            />
          </label>
          <label htmlFor="contact-team-size" className="grid gap-1.5">
            <span className="text-[13px] font-medium text-ink">Engineering team</span>
            <span className="relative block">
              <select
                id="contact-team-size"
                name="teamSize"
                value={teamSize}
                className={cn(
                  FIELD_CLASS,
                  "border-hairline hover:border-hairline-strong focus:border-accent/60",
                  "appearance-none pr-8"
                )}
                disabled={status === "loading"}
                onChange={(e) => patch({ teamSize: e.target.value })}
              >
                <option value="1 - 20 engineers">1 to 20 engineers</option>
                <option value="21 - 100 engineers">21 to 100 engineers</option>
                <option value="101 - 500 engineers">101 to 500 engineers</option>
                <option value="500+ engineers">500+ engineers</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-faint"
              />
            </span>
          </label>
        </div>

        <label htmlFor="contact-message" className="grid gap-1.5">
          <span className="text-[13px] font-medium text-ink">What are you running?</span>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            placeholder="3 clouds, 400 Terraform modules, Terraform Cloud burnout, self-hosting requirement..."
            value={message}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            className={cn(
              FIELD_CLASS,
              "h-auto resize-none leading-relaxed",
              fieldErrors.message
                ? "border-danger/60 focus:border-danger"
                : "border-hairline hover:border-hairline-strong focus:border-accent/60"
            )}
            disabled={status === "loading"}
            onChange={(e) => patch({ message: e.target.value })}
            onBlur={() => onBlur("message")}
          />
        </label>
        {fieldErrors.message ? (
          <p id="contact-message-error" role="status" className="-mt-2 text-[12.5px] text-danger">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="mt-6 h-11 w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <span className="pf-spinner" aria-hidden="true" />
            <span className="sr-only">Submitting</span>
          </>
        ) : null}
        Send message
      </Button>

      <p className="mt-4 text-center text-[12.5px] leading-relaxed text-faint">
        No SDR sequence. An engineer who runs PulseFlow in production reads
        this and answers.
      </p>
    </form>
  );
}
