/* ------------------------------------------------------------------ */
/* All page copy lives here so it can be edited without touching JSX.  */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

/* Navbar ----------------------------------------------------------- */
export const navLinks: NavLink[] = [
  // In-page anchors on this one-pager; swap for real routes when the
  // product/docs pages exist.
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#faq" },
  { label: "Changelog", href: "#changelog" },
];

export const navCta: CtaLink = { label: "Start free trial", href: "/signup" };

/* Announcement pill ------------------------------------------------ */
export const announcement: CtaLink & { version: string } = {
  version: "v2.0",
  label: "drift detection is now in beta",
  href: "#changelog",
};

/* Hero ------------------------------------------------------------- */
export const hero = {
  titleLead: "Draw your architecture.",
  titleAccent: "Ship the infrastructure.",
  sub: "Import a diagram or Mermaid file, review the generated Terraform, and deploy to AWS, GCP, or Azure in one pull request.",
  primaryCta: { label: "Import a diagram", href: "/signup" } as CtaLink,
  secondaryCta: { label: "Watch 2-min demo", href: "#demo" } as CtaLink,
  note: "Free for 3 environments. No credit card.",
};

export const heroStats = {
  deployP95: "41s",
  pipelinesWeek: "2,184",
  latencyLabel: "p95 latency",
};

/* Logo strip ------------------------------------------------------- */
export const logoStrip = {
  label: "Used by platform teams at",
  companies: [
    "Camber",
    "Ridgeline",
    "Osmore",
    "Triwave",
    "Halcyon",
    "Bitfeld",
    "Novaseam",
  ] as const,
};

/* Features --------------------------------------------------------- */
export interface HealingEvent {
  id: string;
  time: string;
  status: "ok" | "warn" | "danger" | "accent";
  title: string;
  whatFailed: string;
  whatChanged: string;
  duration: string;
}

export interface EdgeRegion {
  code: string;
  name: string;
  ms: number;
}

export interface SecurityItem {
  label: string;
  detail: string;
}

export interface MetricPoint {
  day: string;
  ms: number;
}

export const features = {
  eyebrow: "01 / FEATURES",
  heading: "Built for the part after the diagram.",
  sub: "PulseFlow turns the picture your architects already draw into the Terraform your platform team would have written, then watches the running stack and repairs it when reality drifts.",
};

export const healingCard = {
  eyebrow: "Auto-healing",
  heading: "Drift and incidents, handled while you read the log",
  sub: "Every repair is a pull request, not a mystery console change.",
};

export const healingEvents: HealingEvent[] = [
  {
    id: "heal-1",
    time: "14:08:12",
    status: "warn",
    title: "Instance count drifted (3 → 2)",
    whatFailed:
      "aws_autoscaling_group.web desired_size changed to 2 outside Git (someone scaled down from the AWS console during a traffic scare).",
    whatChanged:
      "Pinned the drift, opened PR #482 restoring desired_size = 3, and left a comment linking the ASG event.",
    duration: "Reconciled in 96s",
  },
  {
    id: "heal-2",
    time: "13:52:40",
    status: "danger",
    title: "pg_data volume hit 91% capacity",
    whatFailed:
      "aws_db_instance.metrics storage crossed 90% and stayed there for 15 minutes.",
    whatChanged:
      "Provisioned a gp3 volume with +200 GiB, updated the Terraform module, tagged the change with the alert ID.",
    duration: "Resolved in 3m 12s",
  },
  {
    id: "heal-3",
    time: "12:30:02",
    status: "ok",
    title: "Deploy svc/web #321",
    whatFailed: "Nothing: healthy plan. 2 to add, 0 to change, 0 to destroy.",
    whatChanged: "Applied by the review pipeline after @ana approved the plan.",
    duration: "Applied in 41s (p95)",
  },
  {
    id: "heal-4",
    time: "04:00:00",
    status: "ok",
    title: "Nightly drift scan",
    whatFailed: "Nothing. 214 resources checked across 3 stacks.",
    whatChanged: "No drift found. Report attached to the audit log.",
    duration: "Scanned in 58s",
  },
];

export const edgeCard = {
  eyebrow: "Edge deploys",
  heading: "Plans checked from every region you run in",
  big: "12 ms" as const,
  bigCaption: "median probe latency, last hour",
  note: "Deploy previews and plan summaries render from the edge, so your team in Singapore reviews at the same speed as your team in Ashburn.",
};

export const edgeRegions: EdgeRegion[] = [
  { code: "iad1", name: "Ashburn", ms: 11 },
  { code: "fra1", name: "Frankfurt", ms: 12 },
  { code: "sin1", name: "Singapore", ms: 14 },
  { code: "gru1", name: "São Paulo", ms: 19 },
  { code: "syd1", name: "Sydney", ms: 21 },
];

export const securityCard = {
  eyebrow: "Security",
  heading: "Passes the review, passes the audit",
  note: "SOC 2 report available under NDA. Data residency: US or EU (Frankfurt), selected per workspace.",
};

export const securityItems: SecurityItem[] = [
  { label: "SOC 2 Type II", detail: "Audited annually, continuous monitoring" },
  { label: "SSO / SAML", detail: "Okta, Entra ID, Google Workspace" },
  { label: "Secrets scanning", detail: "Blocks credentials in diagrams and plans" },
  { label: "Audit logs", detail: "Every plan, approval, and API call" },
];

export const metricsCard = {
  eyebrow: "Metrics & alerting",
  heading: "Alerts wired to real signals",
  sub: "p95 service latency, last 7 days: the same series your on-call rules read.",
};

export const latencyByDay: MetricPoint[] = [
  { day: "Mon", ms: 38 },
  { day: "Tue", ms: 41 },
  { day: "Wed", ms: 36 },
  { day: "Thu", ms: 44 },
  { day: "Fri", ms: 41 },
  { day: "Sat", ms: 28 },
  { day: "Sun", ms: 24 },
];

export const alertRule = {
  trigger: "p95 latency > 200 ms for 5 m",
  action: "page on-call",
  state: "healthy" as const,
};

/* Pricing ---------------------------------------------------------- */
export interface Plan {
  id: "starter" | "pro" | "enterprise";
  name: string;
  tagline: string;
  /** null = custom pricing */
  monthly: number | null;
  annual: number | null;
  noteMonthly: string;
  noteAnnual: string;
  featured?: boolean;
  featuredLabel?: string;
  cta: CtaLink;
  features: string[];
}

export const pricing = {
  eyebrow: "02 / PRICING",
  heading: "Honest limits, no sales call.",
  sub: "Usage scales with your infrastructure, not your headcount.",
  toggleLabel: "Billing period",
  saveTag: "Save 20%",
  footnote:
    "Overage: run minutes beyond your tier bill at $0.01/min on Pro. Extra Pro seats: $9/mo each. Starter stops at its limits instead of billing you.",
  comparison: "All plans include unlimited diagrams and community support.",
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For the first real environment.",
    monthly: 0,
    annual: 0,
    noteMonthly: "free forever",
    noteAnnual: "free forever",
    cta: { label: "Create free account", href: "/signup" },
    features: [
      "3 environments (dev, staging, one prod)",
      "2 seats, unlimited viewers",
      "200 run minutes / month",
      "7-day drift history",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For platform teams running real workloads.",
    monthly: 49,
    annual: 39,
    noteMonthly: "billed monthly",
    noteAnnual: "per user / mo, billed annually",
    featured: true,
    featuredLabel: "Most teams choose this",
    cta: { label: "Start free trial", href: "/signup" },
    features: [
      "20 environments",
      "15 seats included",
      "5,000 run minutes / month",
      "90-day drift history + evidence export",
      "One-click auto-repair on drift",
      "SSO (SAML, OIDC) and audit logs",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For 500+ engineers and regulated stacks.",
    monthly: null,
    annual: null,
    noteMonthly: "annual contract",
    noteAnnual: "annual contract · self-hosted option",
    cta: { label: "Talk to engineering", href: "/contact" },
    features: [
      "Unlimited environments and seats",
      "Self-hosted runners",
      "1-year retention, S3 archive export",
      "SCIM provisioning",
      "99.95% SLA, shared Slack channel",
    ],
  },
];

/* FAQ -------------------------------------------------------------- */
export interface FaqItemData {
  question: string;
  answer: string;
}

export const faq = {
  eyebrow: "03 / FAQ",
  heading: "Straight answers.",
  sub: "The questions platform engineers actually ask us.",
};

export const faqItems: FaqItemData[] = [
  {
    question: "How does PulseFlow handle secrets?",
    answer:
      "It never stores credential values. Diagrams reference secret managers (AWS Secrets Manager, GCP Secret Manager, Vault), and generated code resolves them at plan time through your cloud role. The scanner blocks anything that looks like a key, token, or password from being committed into a diagram.",
  },
  {
    question: "How long does setup actually take?",
    answer:
      "About five minutes. You connect an AWS, GCP, or Azure account with a read-only role via OIDC, import your first diagram or .mmd file, and get a reviewable Terraform plan in the same session. No agents to install, nothing runs inside your cluster until you deploy it.",
  },
  {
    question: "Can my whole team use it?",
    answer:
      "Viewers are free and unlimited on every plan. Engineers, architects, and reviewers can all comment on diagrams and approve plans. Paid seats cover people who can push changes: Starter includes 2, Pro includes 15, Enterprise is unlimited.",
  },
  {
    question: "What happens when the generated code is wrong?",
    answer:
      "Nothing deploys on its own. Every generation is a pull request with a human-readable diff: resources to add, change, or destroy, with estimated cost deltas. You can edit the Terraform inline, reject the plan, or pin parts of the diagram as manual. Approval is required for every apply, including auto-repairs.",
  },
  {
    question: "Are there API rate limits?",
    answer:
      "The REST and GraphQL APIs allow 600 requests per minute per workspace, with bursts to 120. Plan runs are queued per environment, not dropped. If you need more, the Enterprise plan negotiates dedicated throughput.",
  },
  {
    question: "Where is my data stored, and how do I get it out?",
    answer:
      "Each workspace pins to US (Virginia) or EU (Frankfurt) residency, chosen at creation. Diagrams, Terraform, and logs are encrypted at rest (AES-256) and in transit. Your generated Terraform and state export the moment you ask; there is no lock-in format.",
  },
  {
    question: "What does cancellation look like?",
    answer:
      "Cancel from settings; no retention call. You keep access until the end of the billing period, then workspace data is retained read-only for 30 days and deleted. Your Terraform and state export automatically on the last day.",
  },
];

/* Final CTA + footer ----------------------------------------------- */
export const finalCta = {
  eyebrow: "04 / DEPLOY",
  heading: "Import your first diagram in under five minutes.",
  sub: "Connect a read-only cloud role, drop in a diagram or .mmd file, and get a reviewable plan. No sales call required.",
  primary: { label: "Start free trial", href: "/signup" } as CtaLink,
  secondary: { label: "Read the docs", href: "#faq" } as CtaLink,
};

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#product" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Terraform provider", href: "#" },
      { label: "Mermaid import guide", href: "#" },
      { label: "Community Slack", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers (hiring 3)", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "DPA", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export const newsletter = {
  title: "Get the changelog digest",
  blurb: "One email a month: releases, benchmarks, and code. No marketing blast.",
  emailLabel: "Work email",
  placeholder: "you@company.com",
  button: "Get the digest",
  loading: "Adding you to the list…",
  success: "You’re on the list. First digest lands next Tuesday.",
  invalid: "Enter a valid work email, e.g. you@company.com.",
  genericError: "Something broke on our side. Try again in a moment.",
};

export const footerStatus = "All systems operational";
export const footerCopyright = "© 2026 PulseFlow Labs, Inc.";
export const footerTagline =
  "Diagrams in. Terraform out. Drift handled.";
