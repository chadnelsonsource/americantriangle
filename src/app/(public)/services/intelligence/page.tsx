import { DivisionOverview } from "@/components/marketing/division";
import { intelligenceCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "AI Model Training, Research & Evaluation",
  "Evaluation is a current service. Training, research, benchmarking, and safety review are scoped engagements, not a training platform.",
  "/services/intelligence",
);

export default function IntelligencePage() {
  return (
    <DivisionOverview
      eyebrow="The intelligence"
      title="Advancing the intelligence behind AI systems."
      lede="This division is for judging a model and, when an engagement is scoped, for training, research, or a safety review. Talent is the person who scores the work. Technology is the evaluation, or a training engagement when one is scoped. The opportunity is the question the client needs answered. Evaluation is a current service. The public platform does not run a foundation-model training job. A customer can start here without a data project or an application project."
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Model intelligence" },
      ]}
      capabilityTitle="What can be measured, and what must be scoped first."
      capabilityLede="Measurable here means a score, a comparison, or a recorded result against criteria you approve. It is not a promised accuracy rate."
      capabilities={[
        {
          title: "Model training and fine-tuning",
          body: "Later. A project names the model, the dataset, and the result to record. It is not a training platform. Writing the examples is a data-infrastructure service.",
        },
        {
          title: "Research and experimentation",
          body: "Later. A study has a written question, a method, and a recorded result. That result is not a published paper and not a performance claim.",
        },
        {
          title: "Model benchmarking",
          body: "Later for automated suites. People can score items against a frozen set. The report is those scores, not a ranking against other companies.",
        },
        {
          title: "Model testing and evaluation",
          body: "First release. People score outputs, or judge technical and domain work, against criteria you approve. The score stays with the submission.",
        },
        {
          title: "Safety, alignment, and red-teaming",
          body: "Later. People follow a written protocol and record the findings. This is not a certification, and it is not a claim that a model is safe.",
        },
      ]}
      problemTitle="The model problems this work is for."
      problemLede="The point is a record that can be checked. None of these cards is a result Americantriangle has published."
      problems={[
        {
          title: "Outputs with no criteria",
          body: "A preference or a score without a written rubric cannot be compared later. The criteria are part of the task.",
        },
        {
          title: "Training with no named inputs",
          body: "A fine-tuning request needs a named model and a named dataset. Until those are a project, the work has not started.",
        },
        {
          title: "A benchmark with no frozen set",
          body: "A number without the items and the scoring rule behind it is not a benchmark. Automated suite tooling is not in the first release.",
        },
        {
          title: "A safety claim with no protocol",
          body: "Responsible review means the test, the reviewer, and the finding are written down. It does not confer a safety certification.",
        },
      ]}
      useCases={[
        {
          title: "Scores against a rubric",
          body: "A team needs answers scored against criteria it approved. Evaluators record the score and a comment. A reviewer who did not write the score accepts or returns the sample.",
        },
        {
          title: "A training engagement that stays a project",
          body: "A team wants fine-tuning. The inquiry names the model and the dataset. Examples that still need to be written are prepared in the data division. The training itself waits until the scope is a project.",
        },
      ]}
      approachTitle="How improvement is shown."
      approach={[
        "The first release records human evaluation: a person, a criterion, a score, and a review decision. That is the evidence the current service can store.",
        "Training, research, automated benchmarking, and red-team review can be described in an inquiry. The inquiry does not start the job. Availability on each catalog row says what the first release stores.",
        "A data-infrastructure project can supply the examples or the preference set. Those records stay distinct from a training result.",
        "No accuracy, win rate, or safety rating is stated here, because no such result has been established for publication.",
      ]}
      catalogTitle="Evaluation is recorded now. The rest is scoped before it starts."
      catalogLede="A later row can still be described in an inquiry. The inquiry does not start the work."
      catalog={[...intelligenceCatalog]}
      cta={{
        eyebrow: "Model intelligence",
        title: "Name the model, the question, and the record you need.",
        body: "Choose model evaluation when outputs need a score. Describe training, research, or a red-team protocol in the message if that is the work.",
        href: "/consultation?type=model_intelligence",
        label: "Request a model consultation",
      }}
    />
  );
}
