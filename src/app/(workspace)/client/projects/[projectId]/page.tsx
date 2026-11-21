import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default async function ClientProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <>
      <PageIntro title="Project" lede="Client-visible updates only. Internal notes are a different record and are not rendered here." />
      <div className="mt-8">
        <EmptyState title="Project not available" body={`No project ${projectId} is visible to this account. If it belongs to another organization, the database policy returns nothing.`} />
      </div>
    </>
  );
}
