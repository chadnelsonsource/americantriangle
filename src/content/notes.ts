export type Note = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  published: string;
  paragraphs: readonly string[];
};

export const notes: readonly Note[] = [
  {
    slug: "preference-feedback",
    title: "Human preference feedback is a reviewed set of rankings",
    summary: "A preference set records how people compared model outputs. It is not a training run, and the review is a separate decision.",
    category: "Data infrastructure",
    published: "2026-11-18",
    paragraphs: [
      "Human preference feedback asks a person to compare or rank model outputs against a written instruction. The work product is the ranking or the pairwise choice, stored with the task.",
      "That record is data preparation. It does not mean Americantriangle trained a model, and it does not mean the ranking was accepted. Acceptance is a later review.",
      "In the first release, one person other than the author scores a submission. The reviewer can accept, return, or reject it. The score stays with the submission.",
      "A project can ask for rankings of answers, summaries, or code explanations. The instruction, the outputs, and the decision criteria have to be named before the work starts. If those are missing, the task is not ready.",
      "Preference feedback is distinct from response evaluation. Evaluation scores a single output against criteria. Preference feedback compares outputs with each other. The inquiry form keeps those as separate types so the queue does not treat them as the same job.",
    ],
  },
  {
    slug: "review-decisions",
    title: "What a review decision stores",
    summary: "Accept, return, and reject are recorded decisions. Creating an invoice, approving earnings, and confirming a payout are different states.",
    category: "Quality",
    published: "2026-11-18",
    paragraphs: [
      "A review decision names what happened to a submission: accept, return, or reject, with a score. The reviewer is not the person who authored the work. That separation is the first release's single review layer.",
      "The decision does not move money by itself. Client invoicing, client payment, earnings approval, and contributor payout confirmation are separate states. An invoice can exist while the contributor is still unpaid.",
      "Returned work can be revised and submitted again when the task allows it. A second person cannot submit an assignment that is exclusive to someone else.",
      "Audit events can record account and operational actions. They are not a substitute for the review record, and they are not a certification.",
      "If a project needs a second required review layer, that is a later setting. The first release does not describe every project as multi-layer review.",
    ],
  },
  {
    slug: "engineering-milestones",
    title: "What an engineering milestone records",
    summary: "An engineering engagement is a project with scope, milestones, and client approval. Internal notes stay off the client timeline.",
    category: "Enterprise applications",
    published: "2026-11-18",
    paragraphs: [
      "An engineering project starts from an inquiry. The inquiry is not a contract and it does not create the project by itself. Discovery notes the client is allowed to see, a recommendation, and an estimate come next, when the engagement is scoped.",
      "Milestones name what will be shown, what needs client approval, and what was released. Internal notes can exist on the same project and stay off the client timeline.",
      "A project can include a data service. The data tasks, reviews, and earnings stay with that service. The engineering project keeps the milestones, deliverables, and approvals.",
      "Model calls from an application stay behind the project rule. Provider keys are server-side. Project content is sent to a provider only when that project has a recorded data-handling approval.",
      "Deployment support is a handoff and a path, not an unnamed uptime promise. What was released should be something a person can point to in the project record.",
    ],
  },
];

export function noteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}

export function readingMinutes(note: Note): number {
  const words = note.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
