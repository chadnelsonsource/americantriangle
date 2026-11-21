export type SolutionPillar = {
  href: "/services/data" | "/services/intelligence" | "/services/engineering";
  label: string;
};

export type SolutionInquiry = "data_infrastructure" | "model_intelligence" | "enterprise_applications" | "integrated";

export type Solution = {
  id: string;
  title: string;
  availability: "First release";
  problem: string;
  approach: string;
  pillars: readonly SolutionPillar[];
  implementation: string;
  value: string;
  serviceHref: string;
  serviceLabel: string;
  inquiry: SolutionInquiry;
};

export const solutionNav = [
  { href: "#requirements", label: "Requirements" },
  { href: "#together", label: "Divisions together" },
  { href: "#solutions", label: "Solutions" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#engagements", label: "Engagements" },
] as const;

export const businessRequirements = [
  {
    href: "#workflow-automation",
    title: "A repeated process",
    body: "The same draft, lookup, or handoff is done by hand, or an automation acts before anyone approves it.",
  },
  {
    href: "#knowledge-systems",
    title: "Answers from authorized material",
    body: "People need an answer from documents the organization is allowed to use, and the corpus has an owner.",
  },
  {
    href: "#enterprise-ai-development",
    title: "A feature with a named approval",
    body: "A language-model feature or internal tool needs milestones, a model-use rule, and a person who can accept the result.",
  },
  {
    href: "#deployment",
    title: "A release with a support path",
    body: "Something is ready to operate, and the organization needs a record of what shipped and who supports it.",
  },
] as const;

export const technicalRequirements = [
  {
    href: "#data-preparation",
    title: "Reviewed data",
    body: "Source material needs a schema, a person other than the author on review, and a versioned export.",
  },
  {
    href: "#model-evaluation",
    title: "A recorded judgment",
    body: "Outputs need scores against criteria the project approves. The score stays with the submission.",
  },
  {
    href: "#agent-development",
    title: "A bounded tool list",
    body: "An agent or workflow may use only the tools and approval points written down before it runs.",
  },
  {
    href: "#integrations",
    title: "An interface with an owner",
    body: "Two systems need to exchange data. The interface, the data, and the owner are part of the scope.",
  },
] as const;

export const solutions: readonly Solution[] = [
  {
    id: "enterprise-ai-development",
    title: "Enterprise AI development",
    availability: "First release",
    problem: "An organization needs a language-model feature or an internal tool, and the model use, the milestones, and the approver are not written down.",
    approach: "Strategy and custom development move as one application project. The project names the model use. Provider keys stay on the server. Client approval is a milestone.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/data", label: "Data infrastructure, when examples are in scope" },
      { href: "/services/intelligence", label: "Model intelligence, when outputs are scored" },
    ],
    implementation: "The first release tracks scope, milestones, and approval. It is not a prebuilt product. A data task or an evaluation stays on its own record.",
    value: "The organization can point to an approved deliverable and the rule for the model call. No return or adoption figure is stated.",
    serviceHref: "/services/engineering/applications",
    serviceLabel: "Applications",
    inquiry: "enterprise_applications",
  },
  {
    id: "data-preparation",
    title: "Data infrastructure and preparation",
    availability: "First release",
    problem: "Source material has no schema, the author is the only reviewer, or the examples have no versioned export.",
    approach: "People label, classify, write prompts, or prepare input and output examples. Someone other than the author reviews a sample. The export is the reviewed set.",
    pillars: [
      { href: "/services/data", label: "Data infrastructure" },
      { href: "/services/intelligence", label: "Model intelligence, when the set is scored" },
    ],
    implementation: "Text annotation, classification, prompts, preference records, and fine-tuning examples are in the first release. Image, audio, and video annotation are later. Preparing examples does not train a model.",
    value: "The operational result is a reviewed dataset with a decision on the sample. It is not a trained model and not a quality percentage.",
    serviceHref: "/services/data",
    serviceLabel: "Data infrastructure",
    inquiry: "data_infrastructure",
  },
  {
    id: "model-evaluation",
    title: "AI model evaluation",
    availability: "First release",
    problem: "Model outputs are accepted or rejected without criteria, and the judgment is not kept with the item.",
    approach: "People score responses, code, mathematics, scientific work, or domain tasks against criteria the project names. The score and the comment stay on the submission.",
    pillars: [
      { href: "/services/intelligence", label: "Model intelligence" },
      { href: "/services/data", label: "Data infrastructure, when the criteria send work back to the set" },
      { href: "/services/engineering", label: "Enterprise applications, when a scored sample gates a release" },
    ],
    implementation: "Human evaluation is a current service. Automated benchmarks, training, research, and red-team review can be scoped later. A score does not change a model by itself.",
    value: "The organization keeps a judgment it can read. This page states no accuracy rate and no claim that a model is safe.",
    serviceHref: "/services/data/evaluation",
    serviceLabel: "Model evaluation",
    inquiry: "model_intelligence",
  },
  {
    id: "workflow-automation",
    title: "Intelligent workflow automation",
    availability: "First release",
    problem: "A draft, a lookup, or a handoff is repeated by hand, or an automation sends an action before a person approves it.",
    approach: "The workflow, the tool list, and any required human approval are written before the automation runs. The approval is a recorded step.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/intelligence", label: "Model intelligence, when a sample of drafts is scored" },
      { href: "/services/data", label: "Data infrastructure, when the workflow needs prepared examples" },
    ],
    implementation: "The first release delivers this as a project with a written workflow. An approval that the design requires is stored as a step, not assumed.",
    value: "The organization can see which action waits and which action proceeds. No time-saved figure is stated.",
    serviceHref: "/services/engineering/agents",
    serviceLabel: "Agents and automation",
    inquiry: "enterprise_applications",
  },
  {
    id: "agent-development",
    title: "AI agent development",
    availability: "First release",
    problem: "An agent is expected to act, and the tools it may call have not been listed.",
    approach: "The engagement names the workflow and the tool list. Approval points are written down before the agent runs. Access that is not on the list is outside the engagement.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/intelligence", label: "Model intelligence, when agent outputs are judged" },
    ],
    implementation: "Agents are a first-release project. A safety review can be scoped later. Shipping an agent is not a certification that the agent is safe.",
    value: "The organization operates an agent inside a written boundary and can see the approval points. No autonomy claim is made.",
    serviceHref: "/services/engineering/agents",
    serviceLabel: "Agents and automation",
    inquiry: "enterprise_applications",
  },
  {
    id: "knowledge-systems",
    title: "Enterprise knowledge systems",
    availability: "First release",
    problem: "People need answers from material the organization is allowed to use, and a tool might otherwise answer from a corpus nobody authorized.",
    approach: "Retrieval uses content the client has authorized. The corpus and the access rule are part of the scope. Where the design requires citations, a milestone records the review.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/data", label: "Data infrastructure, when the corpus is structured first" },
      { href: "/services/intelligence", label: "Model intelligence, when answers are scored" },
    ],
    implementation: "Retrieval over an authorized corpus is in the first release. The corpus, the access rule, and the citation review are project records. Completeness is not claimed.",
    value: "Answers stay tied to an authorized corpus and a named access rule. This is not a claim that every document was found.",
    serviceHref: "/services/engineering/applications",
    serviceLabel: "Applications",
    inquiry: "enterprise_applications",
  },
  {
    id: "integrations",
    title: "Custom AI integrations",
    availability: "First release",
    problem: "A feature needs data from another system, and the interface has no owner.",
    approach: "The project names the interface, the data that may cross it, and the owner. Provider keys stay on the server.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/data", label: "Data infrastructure, when a pipeline is part of the same engagement" },
    ],
    implementation: "Integrations are a first-release project. A pipeline written for the engagement is described in that project. It is not a claim that a foundation model was trained.",
    value: "The organization has a connection with an owner and a written data boundary. No throughput figure is stated.",
    serviceHref: "/services/engineering/agents",
    serviceLabel: "Agents and automation",
    inquiry: "enterprise_applications",
  },
  {
    id: "deployment",
    title: "AI deployment and optimization",
    availability: "First release",
    problem: "A system is treated as finished when it is built, with no record of the release and no path for a later change.",
    approach: "Deployment records what was released and the support path. A later optimization is a new scoped change, not an automatic improvement.",
    pillars: [
      { href: "/services/engineering", label: "Enterprise applications" },
      { href: "/services/intelligence", label: "Model intelligence, when criteria are agreed before release" },
    ],
    implementation: "The first release records the release and the support path. That path is not an uptime guarantee. Installed error monitoring is later.",
    value: "The organization can see what shipped and how support is requested. No performance gain is stated.",
    serviceHref: "/services/engineering/agents",
    serviceLabel: "Agents and automation",
    inquiry: "enterprise_applications",
  },
];

export const combinedUses = [
  {
    title: "Examples, a score, then a feature",
    body: "A team prepares input and output examples, scores a sample of model outputs against written criteria, and ships a feature that uses the approved set. The dataset, the scores, and the application milestones stay on separate records. Preparing the examples is not a training run.",
    links: [
      { href: "#data-preparation", label: "Data preparation" },
      { href: "#model-evaluation", label: "Model evaluation" },
      { href: "#enterprise-ai-development", label: "Enterprise AI development" },
    ],
  },
  {
    title: "An authorized corpus, then a reviewed answer",
    body: "A corpus is structured under a data record. An application answers only from that corpus, with the access rule in the scope. A sample of answers can be scored before a milestone is approved. This describes the records, not a completed deployment.",
    links: [
      { href: "#data-preparation", label: "Data preparation" },
      { href: "#knowledge-systems", label: "Knowledge systems" },
      { href: "#model-evaluation", label: "Model evaluation" },
    ],
  },
  {
    title: "A draft that waits, then a named release",
    body: "A workflow drafts a reply and waits for approval. Evaluation can score a sample of those drafts. Deployment then records what was released and the support path. The workflow and the release are separate project records.",
    links: [
      { href: "#workflow-automation", label: "Workflow automation" },
      { href: "#model-evaluation", label: "Model evaluation" },
      { href: "#deployment", label: "Deployment" },
    ],
  },
] as const;

export const engagements = [
  {
    title: "One division",
    body: "The consultation names data infrastructure, model intelligence, or enterprise applications. The other divisions are not required.",
    href: "/consultation",
    label: "Choose one area",
  },
  {
    title: "An integrated engagement",
    body: "The inquiry can name Integrated AI Solutions. Data tasks, evaluation scores, and application milestones still stay on their own records.",
    href: "/consultation?type=integrated",
    label: "Request an integrated consultation",
  },
  {
    title: "Consultation before scope",
    body: "The form stores the request. Discovery notes, a recommendation, and an estimate are later records. The form is not a contract and does not start the work.",
    href: "/consultation?type=integrated",
    label: "Request a consultation",
  },
  {
    title: "An industry-shaped requirement",
    body: "Healthcare, finance, software, education, manufacturing, and retail each have their own pages. Those pages are potential applications, not a client list.",
    href: "/industries",
    label: "Open industry solutions",
  },
] as const;
