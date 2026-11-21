import { OfferPage } from "@/components/marketing/offer-page";
import { dataCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Human feedback",
  "Ranked and pairwise preferences, reviewed separately from the person who wrote them.",
  "/services/data/feedback",
);

export default function FeedbackPage() {
  return (
    <OfferPage
      eyebrow="Data infrastructure"
      title="Human feedback, recorded as preferences."
      lede="This is data infrastructure. People compare or rank model outputs, including preferences that can later support RLHF. The result is a preference set, not a training run."
      items={dataCatalog.filter((item) => item.href === "/services/data/feedback")}
      scenario="Two answers to the same prompt need a ranking. A contributor records the preference. A different person scores a sample of those rankings against the written criteria. The stored result is the preference and the review, not a fine-tuned model."
      inquiry="data_infrastructure"
      limit="The first release stores the comparison and one review layer. It does not run a training job and it does not claim a preference model was produced."
    />
  );
}
