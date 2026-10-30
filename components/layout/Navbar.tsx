"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, navCta } from "@/lib/data";
import { buttonClasses } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export interface WordmarkProps {
  className?: string;
}

/** Geometric pulse mark + solid text. No gradients, no glow. */
export function Wordmark({ className }: WordmarkProps): JSX.Element {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1.25"
          y="1.25"
          width="21.5"
          height="21.5"
          rx="6"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 12h3.4l2-5.5 3.4 11 2.2-5.5h4"
          stroke="rgb(var(--rgb-accent))"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        PulseFlow
      </span>
    </span>
  );
}

export function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Glass + hairline only after leaving the top of the page.
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });
    return () => {
      document.body.style.overflow = previous;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const close = (): void => {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

  // Escape closes; Tab is trapped inside the drawer.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])"
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b border-hairline bg-base/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#" aria-label="PulseFlow home" className="rounded-card-sm">
          <Wordmark />
        </a>

        {/* Center: primary navigation (desktop) */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link block rounded-card-sm px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: theme + CTA (sign in joins at lg, where there's room) */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <a
            href="#"
            className="hidden whitespace-nowrap text-sm text-muted transition-colors duration-150 hover:text-ink lg:block"
          >
            Sign in
          </a>
          <a
            href={navCta.href}
            className={cn(buttonClasses({ variant: "primary", size: "sm" }))}
          >
            {navCta.label}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          type="button"
          className="rounded-card-sm p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {/* Mobile drawer: full height, focus-trapped */}
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />
          <div
            ref={panelRef}
            onKeyDown={onKeyDown}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-hairline bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                className="rounded-card-sm p-2 text-ink"
                aria-label="Close menu"
                onClick={close}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-8">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="block border-b border-hairline py-3.5 text-[15px] text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-muted">
                  Sign in
                </a>
                <ThemeToggle />
              </div>
              <a
                href={navCta.href}
                onClick={close}
                className={cn(buttonClasses({ variant: "primary", size: "md" }))}
              >
                {navCta.label}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
