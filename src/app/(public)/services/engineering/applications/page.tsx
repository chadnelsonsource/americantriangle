import { OfferPage } from "@/components/marketing/offer-page";
import { engineeringCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "AI applications",
  "Consulting, custom development, language-model applications, retrieval, and the data engineering an engagement needs.",
  "/services/engineering/applications",
);

export default function ApplicationsPage() {
  return (
    <OfferPage
      eyebrow="Enterprise applications"
      title="Applications scoped as projects."
      lede="This is enterprise implementation. Strategy, custom development, language-model features, and retrieval are delivered with milestones and client approval."
      items={engineeringCatalog.filter((item) => item.href === "/services/engineering/applications")}
      scenario="An internal tool needs to answer questions from a document set the client has authorized. The project records the corpus, the access rule, and the milestone where the client reviews citations. That scenario describes the record. It is not a completed engagement."
      inquiry="enterprise_applications"
      limit="The first release can track the engagement from inquiry to client approval. Depth is the project scope. There is not a prebuilt product for every offer."
    />
  );
}
