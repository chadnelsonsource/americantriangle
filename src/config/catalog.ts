export type Availability = "First release" | "Later";

export type CatalogItem = {
  title: string;
  receives: string;
  work: string;
  availability: Availability;
  href: string;
};

export const dataCatalog: CatalogItem[] = [
  {
    title: "Data annotation",
    receives: "Labeled or structured records against a schema.",
    work: "People apply labels, spans, or structure to source material.",
    availability: "First release",
    href: "/services/data/annotation",
  },
  {
    title: "Data classification",
    receives: "Records assigned to an allowed set of labels.",
    work: "People choose one or more classes for each item.",
    availability: "First release",
    href: "/services/data/annotation",
  },
  {
    title: "Prompt creation",
    receives: "Prompts written to a stated specification.",
    work: "People write and revise prompts. The result is text, not a trained model.",
    availability: "First release",
    href: "/services/data/annotation",
  },
  {
    title: "Supervised fine-tuning data preparation",
    receives: "Approved input and output examples, versioned for export.",
    work: "People write or correct examples. This prepares data. It does not train a model.",
    availability: "First release",
    href: "/services/data/annotation",
  },
  {
    title: "Human preference feedback",
    receives: "Ranked or pairwise preferences.",
    work: "People compare or rank model outputs. A reviewer scores a sample separately.",
    availability: "First release",
    href: "/services/data/feedback",
  },
  {
    title: "LLM response evaluation",
    receives: "Scores and comments against criteria you approve.",
    work: "People judge responses. The score stays with the submission.",
    availability: "First release",
    href: "/services/data/evaluation",
  },
  {
    title: "Coding, mathematics, and scientific tasks",
    receives: "Reviewed solutions, code, or judgments.",
    work: "Experts solve or assess technical work. Items can require manual review.",
    availability: "First release",
    href: "/services/data/evaluation",
  },
  {
    title: "Domain tasks",
    receives: "Work in finance, law, business, or life sciences, inside project instructions.",
    work: "People apply domain judgment. The project names the instructions.",
    availability: "First release",
    href: "/services/data/evaluation",
  },
  {
    title: "Quality assurance",
    receives: "An accept, return, or reject decision with a score.",
    work: "Someone other than the author reviews the submission.",
    availability: "First release",
    href: "/services/data/evaluation",
  },
  {
    title: "Benchmark suites",
    receives: "A fixed evaluation set and a quality report.",
    work: "People score items against a frozen set. Automated suite tooling is not in the first release.",
    availability: "Later",
    href: "/services/data/evaluation",
  },
  {
    title: "Image, audio, and video annotation",
    receives: "Time-based or region labels on media.",
    work: "These formats need different tools. They are named in the product and are not part of the first delivery claim.",
    availability: "Later",
    href: "/services/data/annotation",
  },
];

export const engineeringCatalog: CatalogItem[] = [
  {
    title: "AI strategy and consulting",
    receives: "Discovery notes the client is allowed to see, a recommendation, and an estimate.",
    work: "The delivery team scopes the engagement. Internal notes stay off the client timeline.",
    availability: "First release",
    href: "/services/engineering/applications",
  },
  {
    title: "Custom AI development",
    receives: "A scoped application and its deliverables.",
    work: "Build, client approval, and handoff are project records.",
    availability: "First release",
    href: "/services/engineering/applications",
  },
  {
    title: "LLM applications",
    receives: "A feature or internal tool that calls a language model under a project rule.",
    work: "The project names the model use. Provider keys stay on the server.",
    availability: "First release",
    href: "/services/engineering/applications",
  },
  {
    title: "RAG systems",
    receives: "Retrieval over content the client has authorized, with sources where the design requires them.",
    work: "The corpus and the access rule are part of the scope.",
    availability: "First release",
    href: "/services/engineering/applications",
  },
  {
    title: "Data engineering",
    receives: "Pipelines and datasets the engagement needs.",
    work: "The pipeline is described in the project. It is not a claim that a foundation model was trained.",
    availability: "First release",
    href: "/services/engineering/applications",
  },
  {
    title: "AI agents",
    receives: "An agent inside an agreed workflow and tool list.",
    work: "Tools and approval points are written down before the agent runs.",
    availability: "First release",
    href: "/services/engineering/agents",
  },
  {
    title: "Workflow automation",
    receives: "An automated process with a human approval where the design requires one.",
    work: "The approval is a recorded step, not an implied one.",
    availability: "First release",
    href: "/services/engineering/agents",
  },
  {
    title: "Enterprise integrations",
    receives: "Connections to the client’s systems under an agreed interface.",
    work: "The interface, the data, and the owner are part of the scope.",
    availability: "First release",
    href: "/services/engineering/agents",
  },
  {
    title: "Deployment, monitoring, and support",
    receives: "A released system, an operating handoff, and a support path.",
    work: "What was released is recorded. Support is a path, not an unnamed promise.",
    availability: "First release",
    href: "/services/engineering/agents",
  },
];

export const intelligenceCatalog: CatalogItem[] = [
  {
    title: "Model testing and evaluation",
    receives: "Scores and comments against criteria you approve.",
    work: "People judge model outputs. The score stays with the submission.",
    availability: "First release",
    href: "/services/data/evaluation",
  },
  {
    title: "Benchmarking",
    receives: "A fixed evaluation set and a quality report.",
    work: "People can score items against a frozen set. Automated suite tooling is not in the first release.",
    availability: "Later",
    href: "/services/data/evaluation",
  },
  {
    title: "Model training and fine-tuning",
    receives: "A scoped engagement with a named model, a named dataset, and a recorded result.",
    work: "This is a project, not a training platform. Preparing the examples is a data-infrastructure service.",
    availability: "Later",
    href: "",
  },
  {
    title: "AI research and experimentation",
    receives: "A written question, the method, and a recorded result.",
    work: "A study is scoped before it starts. A result here is not a published paper and not a performance claim.",
    availability: "Later",
    href: "",
  },
  {
    title: "Safety, alignment, and red-teaming",
    receives: "A written review protocol and the findings from that protocol.",
    work: "People follow the protocol. This is not a certification, and it is not a claim that a model is safe.",
    availability: "Later",
    href: "",
  },
];

export const dataNav = [
  { href: "/services/data", label: "Overview", exact: true },
  { href: "/services/data/annotation", label: "Annotation and collection", exact: false },
  { href: "/services/data/feedback", label: "Human feedback", exact: false },
] as const;

export const intelligenceNav = [
  { href: "/services/intelligence", label: "Overview", exact: true },
  { href: "/services/data/evaluation", label: "Model evaluation", exact: false },
] as const;

export const engineeringNav = [
  { href: "/services/engineering", label: "Overview", exact: true },
  { href: "/services/engineering/applications", label: "Applications", exact: false },
  { href: "/services/engineering/agents", label: "Agents and automation", exact: false },
] as const;

export const companyNav = [
  { href: "/platform", label: "Platform", exact: false },
  { href: "/technology", label: "Technology", exact: true },
  { href: "/industries", label: "Industries", exact: false },
  { href: "/solutions", label: "Enterprise solutions", exact: true },
  { href: "/about", label: "About", exact: true },
  { href: "/trust", label: "Trust", exact: true },
  { href: "/quality", label: "Quality", exact: true },
  { href: "/insights", label: "Insights", exact: false },
  { href: "/resources", label: "Resources", exact: false },
  { href: "/contributors/join", label: "Contributors", exact: false },
  { href: "/partners", label: "Partnerships", exact: true },
  { href: "/contact", label: "Contact", exact: true },
] as const;

export const pillars = [
  {
    href: "/services/data",
    role: "The foundation",
    title: "AI Data Infrastructure",
    body: "Collection, annotation, human feedback, and training-data preparation. The work product is reviewed data, not a trained model.",
    points: ["Data collection and annotation", "Human feedback and preference data", "Training-data preparation", "Curation and quality review"],
    tone: "light",
  },
  {
    href: "/services/intelligence",
    role: "The intelligence",
    title: "AI Model Training, Research & Evaluation",
    body: "Evaluation is a current service. Training, research, benchmarking, and safety review can be scoped as engagements. They are not a foundation-model training platform.",
    points: ["Model testing and evaluation", "Training and fine-tuning engagements", "Research and benchmarking", "Safety, alignment, and red-team review"],
    tone: "light",
  },
  {
    href: "/services/engineering",
    role: "The implementation",
    title: "Enterprise AI Applications",
    body: "Agents, custom applications, integrations, and operations, delivered as projects with milestones and client approval.",
    points: ["AI agents and automation", "Custom AI applications", "Enterprise integrations", "Deployment and operations"],
    tone: "dark",
  },
] as const;

