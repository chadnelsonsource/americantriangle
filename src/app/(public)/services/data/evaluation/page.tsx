import { OfferPage } from "@/components/marketing/offer-page";
import { dataCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Evaluation",
  "Response scores, technical judgment, and a recorded accept, return, or reject decision.",
  "/services/data/evaluation",
);

export default function EvaluationPage() {
  return (
    <OfferPage
      eyebrow="Model intelligence"
      parentHref="/services/intelligence"
      title="Evaluation with a decision attached."
      lede="This is the model-evaluation service in the intelligence division. People score responses, solve technical items, or review someone else's submission. The decision stays with the work."
      items={dataCatalog.filter((item) => item.href === "/services/data/evaluation")}
      scenario="A team needs answers scored against a rubric. Evaluators record the score and a comment. A reviewer who did not write the score accepts or returns the sample. Benchmark suites that run as an automated product are a later capability."
      inquiry="model_intelligence"
      limit="Response evaluation, coding, mathematics, domain tasks, and one review layer are in the first release. Automated benchmark suites are later."
    />
  );
}
