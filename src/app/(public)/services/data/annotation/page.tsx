import { OfferPage } from "@/components/marketing/offer-page";
import { dataCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Annotation and collection",
  "Labels, classification, prompts, and supervised fine-tuning examples prepared by people and available for review.",
  "/services/data/annotation",
);

export default function AnnotationPage() {
  return (
    <OfferPage
      eyebrow="Data infrastructure"
      title="Annotation and collection."
      lede="This is data infrastructure. People label, classify, write prompts, or prepare input and output examples against a schema you approve."
      items={dataCatalog.filter((item) => item.href === "/services/data/annotation")}
      scenario="A product team has a pile of support tickets and a label set. Contributors apply the labels. A reviewer who did not label the sample accepts or returns the batch. The export is the labeled set, not a trained classifier."
      inquiry="data_infrastructure"
      limit="Text and structured items are in the first release. Image, audio, and video annotation are named and are not part of the first delivery claim."
    />
  );
}
