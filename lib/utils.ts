export type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal class-name joiner (keeps the dependency list short). */
export function cn(...classes: ClassValue[]): string {
  return classes.flat(2).filter(Boolean).join(" ");
}

/** Email check shared by the newsletter form. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
