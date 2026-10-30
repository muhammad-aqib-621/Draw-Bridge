import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Marks the border/error styling; caller owns validation logic. */
  error?: boolean;
}

/**
 * Text input on a raised surface. Size and typography are fixed so the
 * newsletter form and any future forms stay consistent.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error = false, className, ...props },
  ref
): JSX.Element {
  return (
    <input
      ref={ref}
      aria-invalid={error || undefined}
      className={cn(
        "h-10 w-full rounded-card-sm border bg-raised px-3 py-2 text-sm text-ink",
        "placeholder:text-faint transition-colors duration-150",
        error
          ? "border-danger/60 focus:border-danger"
          : "border-hairline hover:border-hairline-strong focus:border-accent/60",
        className
      )}
      {...props}
    />
  );
});
