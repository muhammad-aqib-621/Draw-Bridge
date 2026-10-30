import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

interface StyleArgs {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Shared class builder so buttons and button-link stay visually
 * identical. 150ms transitions, press scale, AA contrast on all states.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
}: StyleArgs = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-card-sm font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" &&
      "bg-accent text-accent-ink hover:bg-accent/85",
    variant === "secondary" &&
      "border border-hairline-strong bg-transparent text-ink hover:bg-raised hover:border-hairline-strong",
    size === "sm" && "h-9 px-3.5 text-[13px]",
    size === "md" && "h-10 px-4 text-sm",
    size === "lg" && "h-12 px-6 text-[15px]"
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button className={cn(buttonClasses({ variant, size }), className)} {...props} />
  );
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps): JSX.Element {
  return (
    <a className={cn(buttonClasses({ variant, size }), className)} {...props} />
  );
}
