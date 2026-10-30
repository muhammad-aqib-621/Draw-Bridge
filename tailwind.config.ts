import type { Config } from "tailwindcss";

/**
 * All colors resolve to CSS variables defined in app/globals.css.
 * The `rgb(var(--x) / <alpha-value>)` form lets opacity modifiers
 * (e.g. `bg-base/70`) work without hard-coded hex values anywhere.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--rgb-bg) / <alpha-value>)",
        surface: "rgb(var(--rgb-surface) / <alpha-value>)",
        raised: "rgb(var(--rgb-raised) / <alpha-value>)",
        ink: "rgb(var(--rgb-ink) / <alpha-value>)",
        muted: "rgb(var(--rgb-muted) / <alpha-value>)",
        faint: "rgb(var(--rgb-faint) / <alpha-value>)",
        accent: "rgb(var(--rgb-accent) / <alpha-value>)",
        ok: "rgb(var(--rgb-ok) / <alpha-value>)",
        warn: "rgb(var(--rgb-warn) / <alpha-value>)",
        danger: "rgb(var(--rgb-danger) / <alpha-value>)",
        // Pre-mixed tokens (alpha baked into the variable per theme)
        hairline: "var(--color-hairline)",
        "hairline-strong": "var(--color-hairline-strong)",
        "accent-ink": "var(--color-accent-contrast)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "76rem", // 1200px + breathing room
      },
      borderRadius: {
        card: "12px",
        "card-sm": "10px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hero: "var(--shadow-hero)",
      },
    },
  },
  plugins: [],
};

export default config;
