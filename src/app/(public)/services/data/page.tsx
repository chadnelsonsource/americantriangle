import { DivisionOverview } from "@/components/marketing/division";
import { dataCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "AI Data Infrastructure",
  "The foundation of reliable artificial intelligence: collection, annotation, human feedback, quality review, and training-data preparation.",
  "/services/data",
);

const foundation = dataCatalog.filter((item) => item.href === "/services/data/annotation" || item.href === "/services/data/feedback");

export default function DataServicesPage() {
  return (
    <DivisionOverview
      eyebrow="The foundation"
      title="The foundation of reliable artificial intelligence."
      lede="Reliable systems depend on data a person can explain and another person can review. This division collects, annotates, compares, curates, and prepares that data. Preference data can later support training or RLHF. Preparing it is not a training run."
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Data infrastructure" },
      ]}
      capabilityTitle="What this division produces."
      capabilityLede="Each capability names a work product. Availability in the catalog below says whether the first release stores it."
      capabilities={[
        {
          title: "Data collection and annotation",
          body: "First release for text and structured items. People apply labels, classes, spans, or prompts against a schema you approve. Image, audio, and video annotation are later.",
        },
        {
          title: "Human feedback and RLHF",
          body: "First release stores rankings and pairwise preferences, reviewed separately from the author. That set can support a later RLHF or training engagement. This service does not run the training.",
        },
        {
          title: "Data quality assurance",
          body: "First release uses one review layer. Someone other than the author accepts, returns, or rejects the submission. The decision stays with the work.",
        },
        {
          title: "Training data preparation",
          body: "First release. People write or correct input and output examples. The approved set is versioned for export. Preparing examples does not train a model.",
        },
        {
          title: "Data curation and management",
          body: "First release keeps the schema, the contributor, the review, and the export together. It is a project record, not a separate data-platform product.",
        },
      ]}
      problemTitle="The data problems this work is for."
      problemLede="These are conditions the service is built to make visible. They are not a claim about any current client."
      problems={[
        {
          title: "No written instruction",
          body: "Source material without a schema or a decision rule cannot be labeled consistently. The project names both before work starts.",
        },
        {
          title: "No trace to a reviewer",
          body: "A label that cannot be tied to a person and a review is not a finished record. Acceptance, return, and rejection stay on the submission.",
        },
        {
          title: "Preferences treated as training",
          body: "A ranking is a dataset. It is not evidence that a model was trained or that a preference model was produced.",
        },
        {
          title: "Examples without a version",
          body: "Input and output pairs that leave the project without approval and a version cannot be used as a controlled training set.",
        },
      ]}
      useCases={[
        {
          title: "A labeled set with a second reader",
          body: "A team has support tickets and an approved label list. Contributors apply the labels. A reviewer who did not label the sample accepts or returns the batch. The export is the labeled set, not a trained classifier.",
        },
        {
          title: "A preference set for later training",
          body: "Two answers to the same prompt need a ranking. A contributor records the preference. A different person scores a sample against the written criteria. The stored result is the preference and the review.",
        },
      ]}
      approachTitle="How the work is controlled."
      approach={[
        "The inquiry names the material, the schema, and the decision to record. It does not create the project by itself.",
        "Contributors see paid work only after the profile and the assessment a project requires. Registration is not an assignment.",
        "The first release uses one review layer: a person other than the author scores the submission.",
        "The client receives the defined record: labels, preferences, or approved examples. Model training, if it is needed, is scoped in the intelligence division.",
      ]}
      catalogTitle="Each row is a service, not a slogan."
      catalogLede="The client receives a defined work product. A person does the work. A different person can review it."
      catalog={foundation}
      cta={{
        eyebrow: "Data projects",
        title: "Start with the material and the schema.",
        body: "Tell us what must be labeled, compared, or prepared. The inquiry is stored. It does not create a project by itself.",
        href: "/consultation?type=data_infrastructure",
        label: "Request a data consultation",
      }}
    />
  );
}
