"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn, isValidEmail } from "@/lib/utils";

interface SignupFormState {
  email: string;
  password: string;
  status: "idle" | "loading" | "success";
  fieldErrors: { email?: string; password?: string };
}

/**
 * Mock account creation. No backend call. Swap the setTimeout for a
 * real POST /api/auth/signup when an app exists on this domain.
 */
export function SignupForm(): JSX.Element {
  const [state, setState] = useState<SignupFormState>({
    email: "",
    password: "",
    status: "idle",
    fieldErrors: {},
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const patch = (partial: Partial<SignupFormState>): void =>
    setState((previous) => ({ ...previous, ...partial }));

  const validateAll = (): SignupFormState["fieldErrors"] => {
    const errors: SignupFormState["fieldErrors"] = {};
    if (!isValidEmail(state.email)) {
      errors.email = "Enter a valid work email, e.g. you@company.com.";
    }
    if (state.password.length < 8) {
      errors.password = "Password needs at least 8 characters.";
    }
    return errors;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (state.status === "loading") return;

    const errors = validateAll();
    if (Object.keys(errors).length > 0) {
      patch({ fieldErrors: errors });
      return;
    }
    patch({ fieldErrors: {}, status: "loading" });
    timerRef.current = setTimeout(() => patch({ status: "success" }), 900);
  };

  const { email, password, status, fieldErrors } = state;

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
          Workspace created
        </h2>
        <p className="mx-auto mt-2 max-w-[44ch] text-[13.5px] leading-relaxed text-muted">
          Demo workspace ready: 3 environments, 2 seats, 200 run minutes.
          The diagram importer would open next.
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
        <label htmlFor="signup-email" className="grid gap-1.5">
          <span className="text-[13px] font-medium text-ink">Work email</span>
          <Input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            required
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
            error={Boolean(fieldErrors.email)}
            disabled={status === "loading"}
            onChange={(e) => patch({ email: e.target.value })}
            onBlur={() => patch({ fieldErrors: validateAll() })}
          />
        </label>
        {fieldErrors.email ? (
          <p id="signup-email-error" className="-mt-2 text-[12.5px] text-danger" role="status">
            {fieldErrors.email}
          </p>
        ) : null}

        <label htmlFor="signup-password" className="grid gap-1.5">
          <span className="text-[13px] font-medium text-ink">Password</span>
          <Input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            required
            minLength={8}
            aria-invalid={fieldErrors.password ? true : undefined}
            aria-describedby={fieldErrors.password ? "signup-password-hint " + (fieldErrors.password ? "signup-password-error" : "") : "signup-password-hint"}
            error={Boolean(fieldErrors.password)}
            disabled={status === "loading"}
            onChange={(e) => patch({ password: e.target.value })}
            onBlur={() => patch({ fieldErrors: validateAll() })}
          />
        </label>
        <p id="signup-password-hint" className="-mt-2 text-[12.5px] text-faint">
          8+ characters. Store credentials with a password manager.
        </p>
        {fieldErrors.password ? (
          <p id="signup-password-error" className="-mt-2 text-[12.5px] text-danger" role="status">
            {fieldErrors.password}
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
        Create free account
      </Button>

      <p className="mt-4 text-center text-[12.5px] leading-relaxed text-faint">
        No credit card. Demo workspace spins up instantly; real SSO and
        cloud roles connect in about five minutes.
      </p>
    </form>
  );
}
