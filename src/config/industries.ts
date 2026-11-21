export type IndustryPillar = "data" | "intelligence" | "engineering";

export type IndustryCapability = {
  pillar: IndustryPillar;
  title: string;
  body: string;
  availability: "First release" | "Later";
};

export type UseCase = {
  id: string;
  title: string;
  challenge: string;
  approach: string;
  capabilities: string;
  value: string;
  pillar: IndustryPillar;
  availability: "First release" | "Later";
  href: string;
};

export type Industry = {
  slug: string;
  title: string;
  summary: string;
  applications: readonly [string, string, string];
  introduction: string;
  challenges: readonly { title: string; body: string }[];
  capabilities: readonly IndustryCapability[];
  useCases: readonly UseCase[];
  limit: string;
};

export const industries = [
  {
    slug: "healthcare",
    title: "Healthcare and life sciences",
    summary: "Reviewed text, evaluation against an approved rubric, and scoped operational workflows. No certification is claimed.",
    applications: ["Medical document processing", "Medical image annotation", "Research assistance"],
    introduction:
      "Healthcare and life-sciences work can be scoped when the material, the instruction, and the handling rule are named. Americantriangle can prepare and review text, score model outputs, or build an operational workflow. This page does not claim a healthcare certification, a right to receive patient data, or a clinical result.",
    challenges: [
      { title: "Fragmented records", body: "Clinical and research text often arrives in different formats. A project has to name the source and the schema before anyone labels it." },
      { title: "Quality and consistency", body: "A label or a score is useful when a second person can review it. The decision stays with the submission." },
      { title: "Evaluation without a claimed outcome", body: "Teams need model outputs judged against criteria they approve. A score is not a clinical validation." },
      { title: "Repetitive operations", body: "Intake, routing, and document handling can be specified as a workflow. The workflow is a project, not an installed clinic system." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Text preparation and review",
        body: "People label, classify, or annotate clinical and scientific text against a schema the project approves. A different person can accept, return, or reject the work.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Human feedback",
        body: "People compare or rank model answers about the approved material. The record is the preference set, not a training run.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Medical image annotation",
        body: "Image and video annotation are later formats. They can be described in an inquiry. The first release does not provide an image canvas.",
        availability: "Later",
      },
      {
        pillar: "intelligence",
        title: "Healthcare model evaluation",
        body: "People score outputs against criteria the project writes down. The score stays with the submission. This is not a certification and not a claim that a model is safe for care.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Training or a research study",
        body: "A training or research engagement can be scoped. It names the model, the dataset, and the result to record. The inquiry does not start the job.",
        availability: "Later",
      },
      {
        pillar: "engineering",
        title: "Document and operations workflows",
        body: "A research assistant or an administrative workflow can be delivered as a project with milestones and client approval.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "medical-documents",
        title: "Medical document processing",
        challenge: "Clinical and research text arrives in different formats, and a team needs a consistent record of what was extracted.",
        approach: "Name the documents, the fields, and the handling rule. People classify or extract against that schema. A different person reviews the submission.",
        capabilities: "Text annotation, classification, and a recorded review. The export is the reviewed set, not a diagnosis.",
        value: "A document set the organization can trace to a person and a review decision.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
      {
        id: "medical-images",
        title: "Medical image annotation",
        challenge: "Imaging work needs a defined label set before anyone can mark a study. The first release does not include an image canvas.",
        approach: "Describe the image task, the labels, and the review rule in an inquiry. The annotation work waits until that format is in scope.",
        capabilities: "Image annotation is a later data-infrastructure format. It can be specified now. It is not a current delivery.",
        value: "A written annotation protocol. Not a labeled image set, and not a clinical device.",
        pillar: "data",
        availability: "Later",
        href: "/services/data",
      },
      {
        id: "research-assistance",
        title: "Research assistance",
        challenge: "Researchers need to find and summarize material they are allowed to use, and to see who approved the output.",
        approach: "A project limits the assistant to an authorized corpus, records citations, and requires a person where the design says so.",
        capabilities: "An application project with milestones. Evaluation can score summaries against a rubric. Neither one is a published finding.",
        value: "A workflow and an approval record the team can inspect. Not a research result.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/applications",
      },
    ],
    limit: "Text, structured items, human evaluation, and project delivery can be scoped now. Image annotation, training, and automated benchmarking wait until that work is scoped. No patient-data right and no healthcare certification are stated here.",
  },
  {
    slug: "financial-services",
    title: "Financial services",
    summary: "Document classification, evaluation, and scoped internal workflows. This is not a financial license or a current client.",
    applications: ["Document intelligence", "Data classification", "Risk analysis workflows"],
    introduction:
      "Financial work can be scoped when the documents, the labels, and the decision to record are defined. Americantriangle can prepare that material, evaluate model outputs, or build an internal workflow. This is not a financial license, a risk certification, or a claim of a current client.",
    challenges: [
      { title: "Volume and mixed formats", body: "Statements, filings, and messages mix structured fields with prose. The project names which fields are in scope." },
      { title: "Document-heavy operations", body: "People still have to check what a model extracted. The review is a separate record from the extraction." },
      { title: "Accuracy and risk controls", body: "Criteria for a score have to be written down. A score is not a regulatory opinion." },
      { title: "Internal workflow complexity", body: "Reporting and review paths can be specified. They are project milestones, not a guarantee of a control outcome." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Extraction and classification",
        body: "People classify or extract defined fields from financial text. A second person can review the submission.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Document preparation",
        body: "Instructions, source files, and the expected record are named before the work starts. The export is the reviewed set.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Evaluation of model outputs",
        body: "People score extractions, classifications, or answers against criteria the project approves. Automated benchmark suites are later.",
        availability: "First release",
      },
      {
        pillar: "engineering",
        title: "Document and reporting workflows",
        body: "An internal assistant or a reporting workflow can be a project. Access rules and approval steps are written down. It is not a prebuilt product.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "document-intelligence",
        title: "Document intelligence",
        challenge: "Filings, statements, and messages mix structured fields with prose, and someone still has to check the extraction.",
        approach: "The project names the corpus and the fields. People extract or classify. A second person accepts, returns, or rejects the work.",
        capabilities: "Document preparation, extraction, and review. An application project can later assemble the same fields into a workflow.",
        value: "A reviewed field set tied to the source document. Not a regulatory opinion.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
      {
        id: "data-classification",
        title: "Data classification",
        challenge: "Transaction and account records need categories the organization has defined, not categories a model invents in the moment.",
        approach: "Write the label set and the examples. People apply the labels. Review is separate from the person who labeled the row.",
        capabilities: "Classification of text and structured records, with the decision stored on the submission.",
        value: "A labeled set and a review record. Not a claim about portfolio performance.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
      {
        id: "risk-workflows",
        title: "Risk analysis workflows",
        challenge: "A team wants model outputs used in a review path to be scored against written criteria, without treating the score as a risk certification.",
        approach: "Approve the rubric. People score the outputs. The workflow records who accepted the score. Automated benchmark suites are a later scope.",
        capabilities: "Human evaluation of model outputs. A workflow can hold the score. This is not a financial license or a risk rating of a firm.",
        value: "A score and an acceptance decision that stay with the work. Not a measured reduction in risk.",
        pillar: "intelligence",
        availability: "First release",
        href: "/services/data/evaluation",
      },
    ],
    limit: "Text and structured work, human evaluation, and application projects can be scoped now. Automated benchmarking is later. No financial license is claimed.",
  },
  {
    slug: "software",
    title: "Technology and software",
    summary: "Code data, human feedback, evaluation, and scoped engineering tools. Training is a separate engagement.",
    applications: ["AI coding assistants", "Software testing", "Model evaluation"],
    introduction:
      "Software teams can scope code annotation, preference data, evaluation of engineering outputs, or an internal tool. Preparing examples does not train a model. A coding assistant on this page is a potential project, not a product Americantriangle already ships.",
    challenges: [
      { title: "More code than reviewers", body: "Annotation and review can be scoped for repositories and instructions the client defines." },
      { title: "Model behavior that needs a score", body: "Coding and technical outputs can be judged by people. The score is not a claimed pass rate." },
      { title: "Evaluation at a scale the first release does not automate", body: "A fixed benchmark suite can be described. Automated suite tooling is later." },
      { title: "Repetitive engineering work", body: "Drafting tests, replies, or reviews can be a workflow with a human approval where the design requires one." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Code data preparation",
        body: "People write, label, or correct code-related examples against a schema. The approved set can be exported. That export is not a trained model.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Human feedback for coding outputs",
        body: "People rank or compare code explanations and patches. The record is the preference set.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Evaluation of engineering outputs",
        body: "People solve or score coding, mathematics, and technical items. The decision stays with the submission.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Training, fine-tuning, and benchmark suites",
        body: "A training engagement or an automated benchmark can be scoped. Neither is a foundation-model training platform, and neither starts from the inquiry alone.",
        availability: "Later",
      },
      {
        pillar: "engineering",
        title: "Engineering tools as projects",
        body: "A coding assistant, a test workflow, or a support tool can be built with a written tool list, milestones, and client approval.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "coding-assistants",
        title: "AI coding assistants",
        challenge: "Engineers want a draft of code or a review inside a repository they control, and a person still has to accept the change.",
        approach: "A project names the repository, the tool list, and the approval step. The assistant does not merge on its own.",
        capabilities: "An application project. Preference data and code examples can be prepared separately. Preparing them does not train the assistant.",
        value: "A scoped workflow and a record of what a person approved. Not a product Americantriangle already ships, and not a productivity statistic.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/agents",
      },
      {
        id: "software-testing",
        title: "Software testing",
        challenge: "Teams repeat test drafting and checking, and need to know what ran and who accepted it.",
        approach: "A workflow proposes tests or checks against instructions the project defines. The project stores the run and the approval.",
        capabilities: "An automation project with a written tool list. Code-related examples can be prepared as data work when the tests still need to be written.",
        value: "A test record inside the project. Not a coverage rate.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/agents",
      },
      {
        id: "model-evaluation",
        title: "Model evaluation",
        challenge: "A team needs coding or technical outputs judged against criteria it wrote, without treating the score as a pass rate for the model.",
        approach: "People solve or score items. Someone other than the author reviews the submission. An automated suite can be described later.",
        capabilities: "Human evaluation of engineering outputs. Training and automated benchmark tooling stay scoped engagements.",
        value: "A score that stays with the submission. Not a published accuracy number.",
        pillar: "intelligence",
        availability: "First release",
        href: "/services/data/evaluation",
      },
    ],
    limit: "Code annotation, preference data, and human evaluation are current services. Training, fine-tuning, and automated benchmarks are scoped engagements. No performance statistic is stated.",
  },
  {
    slug: "education",
    title: "Education and research",
    summary: "Text preparation, evaluation, and scoped research or learning applications. Records are not published findings.",
    applications: ["Learning systems", "Educational data processing", "Research documents"],
    introduction:
      "Education and research work can be scoped around materials the organization is allowed to use. Americantriangle can prepare and classify that text, evaluate model outputs, or build a research or learning workflow. A project record is not a published paper and not a measured learning gain.",
    challenges: [
      { title: "Large bodies of material", body: "Courses, papers, and notes need a schema before they can be classified or summarized." },
      { title: "Accuracy of processed information", body: "A summary or a label needs a reviewer when the project says so. The decision stays with the work." },
      { title: "Learning workflows that have to be specified", body: "Personalization can be described as a workflow. This page does not claim a learning outcome." },
      { title: "Research knowledge that is hard to trace", body: "A research assistant has to show the material it used and the approval that released it." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Educational and research text",
        body: "People classify, annotate, or prepare text from materials the project names. Image and audio course material is a later format.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Evaluation of answers and summaries",
        body: "People score outputs against a rubric. The score is the record. It is not a claim about student performance.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "A scoped research engagement",
        body: "A study can be named with a question, a method, and a result to record. It is not a published paper.",
        availability: "Later",
      },
      {
        pillar: "engineering",
        title: "Learning and research applications",
        body: "A learning assistant or a document workflow can be delivered as a project. What the client approved is the measure of the work.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "learning-systems",
        title: "Intelligent learning systems",
        challenge: "An organization wants learners to ask questions of an authorized course set, with a person able to approve what is released.",
        approach: "A project names the materials, the access rule, and where a person must approve a reply. Personalization is the path through that material.",
        capabilities: "A learning application delivered as a project. Answers can be scored against a rubric. No learning gain is claimed.",
        value: "A workflow and an approval record. Not a completion rate or a measured outcome.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/applications",
      },
      {
        id: "educational-data",
        title: "Educational data processing",
        challenge: "Course notes, assignments, and references need a shared taxonomy before they can be searched or reused.",
        approach: "Define the labels. People classify or annotate the text. A second person reviews the batch. Image and audio course material is a later format.",
        capabilities: "Text annotation and classification, with the review stored on the submission.",
        value: "A reviewed teaching set the organization can export. Not a student-performance claim.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
      {
        id: "research-documents",
        title: "Research document processing",
        challenge: "A research group needs sources extracted or summarized without treating the summary as a finding.",
        approach: "The project names the sources the group is allowed to provide. People extract or summarize. Review is separate when the instructions require it.",
        capabilities: "Document preparation and, when scoped, evaluation of the summaries. A research study itself is a later engagement.",
        value: "An extract or summary tied to the source and the reviewer. Not a published paper.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
    ],
    limit: "Text preparation and human evaluation can start now. A research engagement is scoped before it starts. No educational outcome is claimed.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing and industrial operations",
    summary: "Operational records now. Image and video inspection when that format is scoped. No installed plant system is claimed.",
    applications: ["Computer vision inspection", "Defect detection", "Predictive maintenance"],
    introduction:
      "Industrial work can start with operational records that are text or structured data. Image and video inspection can be described, and those formats are later. A maintenance or monitoring workflow is a potential project. This page does not claim an installed system or a measured reduction in defects.",
    challenges: [
      { title: "Operational data in more than one form", body: "Logs, checklists, and sensor exports can be scoped when the schema is defined. Video is a later format." },
      { title: "Quality control that needs a person", body: "A defect call can be reviewed by someone other than the person who marked it. The first release stores that decision for text and structured work." },
      { title: "Maintenance and monitoring", body: "A workflow can record what was inspected and who approved the next step. It is not a live plant monitor." },
      { title: "Repetitive checks", body: "Repeatable inspection steps can be written down. Automating them still requires a scoped project." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Industrial data preparation",
        body: "People classify or extract operational text and structured records. The review stays with the submission.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Image and video annotation",
        body: "Visual inspection data can be named in an inquiry. Image and video annotation canvases are not in the first release.",
        availability: "Later",
      },
      {
        pillar: "intelligence",
        title: "Evaluation of inspection outputs",
        body: "People can score a model’s described output against criteria the project approves. An automated computer-vision benchmark is later.",
        availability: "First release",
      },
      {
        pillar: "engineering",
        title: "Operations workflows",
        body: "A maintenance, monitoring, or handoff workflow can be a project. Deployment records the release. It is not an uptime promise.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "vision-inspection",
        title: "Computer vision inspection",
        challenge: "A plant wants visual checks defined before anyone labels images. Image and video canvases are not in the first release.",
        approach: "Write the inspection view, the labels, and the review rule. The image work starts only when that format is scoped. Until then, the record is the written procedure.",
        capabilities: "Image and video annotation are later data-infrastructure work. Human review of a described output can be scoped now.",
        value: "An inspection specification a later project can use. Not a labeled image archive and not an installed camera system.",
        pillar: "data",
        availability: "Later",
        href: "/services/data",
      },
      {
        id: "defect-detection",
        title: "Defect detection",
        challenge: "Quality teams need a defect call checked by someone other than the person who marked it, without publishing a detection rate.",
        approach: "Define the defect criteria. People score the described output. An automated vision benchmark is later and is not a current product.",
        capabilities: "Human evaluation against approved criteria. Vision automation is not part of the first delivery claim.",
        value: "A score and a review decision on the submission. Not a defect-rate improvement.",
        pillar: "intelligence",
        availability: "First release",
        href: "/services/data/evaluation",
      },
      {
        id: "predictive-maintenance",
        title: "Predictive maintenance",
        challenge: "Maintenance signals and approvals are scattered, and a team wants one workflow for what was flagged and who cleared it.",
        approach: "A project names the signals, the handoff, and the person who approves the next step. It does not claim a forecast has been validated.",
        capabilities: "An operations workflow with milestones. Structured maintenance records can be prepared as data work. Deployment is a handoff, not uptime coverage.",
        value: "A maintenance record and an approval. Not a predicted failure date.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/agents",
      },
    ],
    limit: "Structured operational data and human evaluation can be scoped now. Image and video annotation, and automated vision benchmarks, are later. No plant performance figure is claimed.",
  },
  {
    slug: "retail",
    title: "Retail and e-commerce",
    summary: "Catalog text, evaluation of support or recommendation outputs, and scoped customer or operations workflows.",
    applications: ["Recommendation systems", "Customer support automation", "Product data enrichment"],
    introduction:
      "Retail work can be scoped around product text, customer conversations the organization is allowed to use, and the workflow that should follow. Americantriangle can classify that material, evaluate model replies, or build a support or operations project. This is not a live recommendation engine and not a claimed lift in sales.",
    challenges: [
      { title: "Large catalogs", body: "Attributes and categories have to be defined before people enrich them. The export is the reviewed catalog text." },
      { title: "Customer conversations", body: "Support text can be prepared only when the source and the handling rule are named." },
      { title: "Inventory and operations", body: "Handoffs between a draft and a person can be specified. The project does not claim an inventory outcome." },
      { title: "Discovery and personalization", body: "A recommendation or ranking can be evaluated against written criteria. Operating a storefront recommender is a separate project, not a current product." },
    ],
    capabilities: [
      {
        pillar: "data",
        title: "Catalog classification and enrichment",
        body: "People apply categories, attributes, or corrections to product text. A second person can review the batch.",
        availability: "First release",
      },
      {
        pillar: "data",
        title: "Customer-interaction preparation",
        body: "Support conversations can be labeled or compared when the project defines the material. The record is the reviewed set.",
        availability: "First release",
      },
      {
        pillar: "intelligence",
        title: "Evaluation of support and recommendation outputs",
        body: "People score replies or ranked suggestions against criteria the project approves. That score does not operate a storefront.",
        availability: "First release",
      },
      {
        pillar: "engineering",
        title: "Support and operations applications",
        body: "A customer-support assistant or an operational workflow can be delivered with milestones, an agreed tool list, and a handoff.",
        availability: "First release",
      },
    ],
    useCases: [
      {
        id: "recommendations",
        title: "Recommendation systems",
        challenge: "A retailer wants product suggestions specified and reviewed before anyone treats them as the storefront.",
        approach: "People score ranked suggestions against written criteria. A separate project can specify how a suggestion workflow would run. Neither one operates a live recommender.",
        capabilities: "Evaluation of recommendation outputs. An application project can be scoped afterward. No conversion or revenue figure is claimed.",
        value: "A score against the criteria, or a specified workflow. Not a sales lift.",
        pillar: "intelligence",
        availability: "First release",
        href: "/services/data/evaluation",
      },
      {
        id: "customer-support",
        title: "Customer support automation",
        challenge: "Support replies are repetitive, and a draft still needs a person before it is sent.",
        approach: "A workflow drafts from material the organization has authorized and waits for approval. The tool list and the handoff are written down.",
        capabilities: "An agent or automation project. Support conversations can be labeled first when the handling rule is named.",
        value: "A draft, an approval, and a handoff record. Not a claimed reduction in handle time.",
        pillar: "engineering",
        availability: "First release",
        href: "/services/engineering/agents",
      },
      {
        id: "product-data",
        title: "Product data enrichment",
        challenge: "Catalog attributes are missing or inconsistent, and the corrected text needs a reviewer.",
        approach: "Define the attribute schema. People fill or correct the product text. A different person reviews the batch.",
        capabilities: "Classification and enrichment of product text, with the review stored on the submission.",
        value: "Reviewed catalog text the organization can export. Not a ranking in search results.",
        pillar: "data",
        availability: "First release",
        href: "/services/data/annotation",
      },
    ],
    limit: "Catalog text, interaction labels, and human evaluation can be scoped now. A recommendation or support application is a project with its own approval. No commercial outcome is claimed.",
  },
] as const satisfies readonly Industry[];

export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function casesForPillar(pillar: IndustryPillar) {
  return industries.flatMap((industry) =>
    industry.useCases
      .filter((useCase) => useCase.pillar === pillar)
      .map((useCase) => ({ industry, useCase })),
  );
}
