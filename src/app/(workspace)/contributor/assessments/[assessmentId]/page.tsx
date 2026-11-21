import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default async function AssessmentDetailPage({ params }: { params: Promise<{ assessmentId: string }> }) {
  const { assessmentId } = await params;
  return (
    <>
      <PageIntro title="Assessment" lede="Attempts are limited and stored with the version you took." />
      <div className="mt-8">
        <EmptyState title="This assessment is not available" body={`No published version was found for ${assessmentId}. The page does not include an answer key.`} />
      </div>
    </>
  );
}
