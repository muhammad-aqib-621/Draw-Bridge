# PulseFlow Landing Page

Marketing site for **PulseFlow**: design infrastructure as diagrams, generate Terraform, and auto-repair drift.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?logo=tailwindcss&logoColor=white)

## Tech Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 14 (App Router)                     |
| Language   | TypeScript (strict mode)                    |
| Styling    | Tailwind CSS v3 with CSS design tokens      |
| Animation  | Framer Motion                               |
| Typography | Geist, self-hosted via the `geist` package  |

## Getting Started

**Prerequisites:** Node.js 18.17+ and npm.

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the development server        |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build          |

## Project Structure

```text
.
├── app/
│   └── globals.css        # Design tokens (dark/light) and component CSS
├── components/
│   ├── sections/          # Page sections (hero, features, pricing, FAQ, ...)
│   └── ui/                # Reusable UI primitives
├── lib/
│   └── data.ts            # Single source of truth for all site content
└── tailwind.config.ts     # Maps design tokens to Tailwind utilities
```

## Customization

- **Content:** Edit `lib/data.ts` to update copy, pricing, FAQ, and feature lists. No component changes needed.
- **Theming:** Colors, radii, and shadows are CSS variables defined in `app/globals.css` for both dark and light modes.
- **Tailwind mapping:** `tailwind.config.ts` exposes those tokens as utility classes, so update both files when adding a new token.
