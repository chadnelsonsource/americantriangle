export type CapabilityStatus = "release" | "project" | "later";

export type Capability = {
  title: string;
  status: CapabilityStatus;
  body: string;
};

export type CapabilityGroup = {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  items: readonly Capability[];
  links: readonly { href: string; label: string }[];
};

export type ToolStatus = "repository" | "named" | "adapter" | "target";

export type Tool = {
  name: string;
  status: ToolStatus;
  body: string;
};

export type ToolGroup = {
  title: string;
  items: readonly Tool[];
};

export const capabilityStatusLabel: Record<CapabilityStatus, string> = {
  release: "In the first release",
  project: "Set in the project",
  later: "Later",
};

export const toolStatusLabel: Record<ToolStatus, string> = {
  repository: "In the repository",
  named: "Named, not installed",
  adapter: "Adapter name",
  target: "Hosting target",
};

export const technologyNav = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#machine-learning", label: "AI and machine learning" },
  { href: "#data-engineering", label: "Data engineering" },
  { href: "#application-engineering", label: "Application engineering" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#quality-evaluation", label: "Quality" },
  { href: "#stack", label: "Technology register" },
] as const;

export const philosophy = [
  "One Next.js application holds the public site, the workspaces, and the server rules. The browser does not decide who may read a record.",
  "A model call needs a recorded data-handling approval and a server-side key. The key is not sent to the browser.",
  "Preparing examples, scoring an output, and shipping an application are different records. A score does not change a model by itself.",
  "An invoice, a payment, an earnings approval, and a payout stay separate. Creating an invoice does not mark work paid.",
] as const;

export const stackLayers = [
  ["Browser", "Pages and forms. No service-role key and no provider key."],
  ["Next.js server", "Validation, authorization, and route handlers."],
  ["Domain services", "The business rule, including the model gateway."],
  ["Records and jobs", "PostgreSQL, Inngest, Stripe, and Resend, when configured."],
] as const;

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    id: "machine-learning",
    eyebrow: "AI and machine learning",
    title: "Evaluation is current. A training run is scoped.",
    lede: "The repository does not train a foundation model. Model development, fine-tuning, and experimentation can be written into an engagement. Human evaluation is a current service.",
    items: [
      {
        title: "Model development",
        status: "later",
        body: "A scoped engagement can name a model, a dataset, and a recorded result. This is not a training platform, and the repository has no training runtime.",
      },
      {
        title: "Fine-tuning",
        status: "project",
        body: "Example preparation is in the first release, with the review kept on the export. The fine-tuning run itself is a scoped engagement. This repository does not run it.",
      },
      {
        title: "Model evaluation",
        status: "release",
        body: "People score outputs against criteria the project approves. The score and the comment stay with the submission. No accuracy percentage is stated.",
      },
      {
        title: "AI experimentation",
        status: "later",
        body: "A study can be scoped with a written question, a method, and a result. Research is later. A stored score is not that study and not a published paper.",
      },
    ],
    links: [
      { href: "/services/intelligence", label: "Model intelligence" },
      { href: "/services/data/evaluation", label: "Model evaluation" },
    ],
  },
  {
    id: "data-engineering",
    eyebrow: "Data engineering",
    title: "The work product is reviewed data.",
    lede: "Text collection, annotation, preference records, and example preparation are in the first release. Image, audio, and video annotation are later. No datasheet standard is published here.",
    items: [
      {
        title: "Data preparation",
        status: "release",
        body: "People write or correct examples against an instruction the client approves. The export is the reviewed set, not a trained model.",
      },
      {
        title: "Data processing",
        status: "project",
        body: "A pipeline the engagement needs is described in the project. The repository does not ship a named processing product.",
      },
      {
        title: "Annotation pipelines",
        status: "release",
        body: "A task is assigned, submitted, and reviewed by someone other than the author. The decision is accept, return, or reject.",
      },
      {
        title: "Dataset management",
        status: "release",
        body: "The project keeps the schema, the contributor, the review, and the export together. A formal datasheet or model card is not part of this site.",
      },
    ],
    links: [
      { href: "/services/data", label: "Data infrastructure" },
      { href: "/services/data/annotation", label: "Annotation and collection" },
    ],
  },
  {
    id: "application-engineering",
    eyebrow: "AI application engineering",
    title: "A system is a project with milestones.",
    lede: "Agents, applications, integrations, and workflows are first-release projects. The tool list, the interface, and any required approval are written down before the work runs.",
    items: [
      {
        title: "AI agents",
        status: "release",
        body: "An agent stays inside an agreed workflow and tool list. Access that is not on the list is outside the engagement. Shipping an agent is not a safety certification.",
      },
      {
        title: "Application development",
        status: "release",
        body: "A language-model feature names the model use. Client approval is a milestone. The repository is not a prebuilt product for every offer.",
      },
      {
        title: "API integrations",
        status: "release",
        body: "The interface, the data, and the owner are part of the scope. Provider keys stay on the server. The gateway names OpenAI, Anthropic, Google, and an OpenAI-compatible endpoint. No vendor SDK is installed, and a name here is not a partnership.",
      },
      {
        title: "Workflow automation",
        status: "release",
        body: "The workflow and any human approval are written before the automation runs. The approval is a recorded step.",
      },
    ],
    links: [
      { href: "/services/engineering/applications", label: "Applications" },
      { href: "/services/engineering/agents", label: "Agents and automation" },
    ],
  },
  {
    id: "infrastructure",
    eyebrow: "Infrastructure and deployment",
    title: "One application. Named hosts. No production claim.",
    lede: "The deployment notes name Vercel for the application. A hosted project is not provisioned from this repository. There is no database, no second cloud, and no uptime target.",
    items: [
      {
        title: "Cloud infrastructure",
        status: "project",
        body: "Vercel is the named application host. A hosted project is not connected. This page does not name another cloud, a region, or a private network.",
      },
      {
        title: "Deployment architecture",
        status: "release",
        body: "The shape is one Next.js application. Public inquiries are email. There is no database schema in this application.",
      },
      {
        title: "Monitoring",
        status: "later",
        body: "Sentry and PostHog are named in the deployment notes and are not installed. A client handoff records a support path. Installed error monitoring is later.",
      },
      {
        title: "Operational reliability",
        status: "release",
        body: "A Stripe event is accepted only when the signature matches. The event is not stored. Payouts are not sent. No availability figure is stated.",
      },
    ],
    links: [
      { href: "/platform", label: "Platform" },
      { href: "/trust", label: "Trust" },
    ],
  },
  {
    id: "quality-evaluation",
    eyebrow: "Quality and evaluation",
    title: "A check is a record, not a rate.",
    lede: "The quality page separates what the first release stores from what a project still has to write down. This section points at that record. It states no coverage rate and no benchmark score.",
    items: [
      {
        title: "Testing",
        status: "release",
        body: "Vitest covers domain rules in this repository. Playwright is a dependency, and its browsers are not installed in CI. A client project names its own checks. No coverage rate is published.",
      },
      {
        title: "Benchmarking",
        status: "later",
        body: "People can score a fixed set of items. Automated benchmark suites are later. A score on a set is not a leaderboard result.",
      },
      {
        title: "Validation",
        status: "release",
        body: "Someone other than the author accepts, returns, or rejects a submission. An application milestone records client approval of the agreed scope.",
      },
      {
        title: "Performance monitoring",
        status: "later",
        body: "Installed performance monitoring is not in this application. A further change after handoff is a new scoped milestone. No latency or throughput figure is stated.",
      },
    ],
    links: [{ href: "/quality", label: "Quality" }],
  },
];

export const toolGroups: readonly ToolGroup[] = [
  {
    title: "Application",
    items: [
      { name: "Next.js", status: "repository", body: "App Router. The public site is one application." },
      { name: "React", status: "repository", body: "The interface layer. Business rules stay in domain services." },
      { name: "TypeScript", status: "repository", body: "Strict mode for the application code." },
      { name: "Tailwind CSS", status: "repository", body: "The shared visual tokens. No second design system." },
    ],
  },
  {
    title: "Data and access",
    items: [
      { name: "Email inquiries", status: "repository", body: "Contact, consultation, partnership, and expert forms send email. They do not write to a database." },
    ],
  },
  {
    title: "Validation, jobs, payments, and email",
    items: [
      { name: "Zod", status: "repository", body: "Server-side checks for forms and domain input." },
      { name: "Inngest", status: "repository", body: "Function definitions are in the repository. The signing keys are unset." },
      { name: "Stripe", status: "repository", body: "The webhook checks a signature. The event is not stored. Connect payouts are not sent." },
      { name: "Resend", status: "repository", body: "Email is sent only when the API key and the from-address are set." },
    ],
  },
  {
    title: "Tests",
    items: [
      { name: "Vitest", status: "repository", body: "Unit tests for authorization, leads, webhooks, and other domain rules." },
      { name: "Playwright", status: "repository", body: "A browser spec exists. CI does not download the browsers." },
    ],
  },
  {
    title: "Named and not installed",
    items: [
      { name: "Sentry", status: "named", body: "Named for error monitoring. The package is not installed." },
      { name: "PostHog", status: "named", body: "Named for product analytics. The package is not installed, and no tracking script is on the site." },
    ],
  },
  {
    title: "Hosting targets",
    items: [
      { name: "Vercel", status: "target", body: "Named as the application host. A production project is not provisioned here." },
      { name: "Resend domain", status: "target", body: "The from-address sends only after its domain is verified with the email provider." },
    ],
  },
  {
    title: "Model adapter names",
    items: [
      { name: "OpenAI", status: "adapter", body: "A provider name the gateway can select. No OpenAI SDK is installed." },
      { name: "Anthropic", status: "adapter", body: "A provider name the gateway can select. No Anthropic SDK is installed." },
      { name: "Google", status: "adapter", body: "A provider name the gateway can select. No Google model SDK is installed." },
      { name: "OpenAI-compatible", status: "adapter", body: "A name for an endpoint that speaks that protocol. It is not a claim that one is connected." },
    ],
  },
];
