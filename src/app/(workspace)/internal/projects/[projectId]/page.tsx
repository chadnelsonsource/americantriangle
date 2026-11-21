import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default async function InternalProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <>
      <PageIntro title="Project file" lede="Internal notes stay on this page. Client-visible updates are written separately." />
      <div className="mt-8">
        <EmptyState
          title="Project file is not loaded"
          body={`No assigned project matches ${projectId}. Dataset export is available only for an approved version.`}
          action={{ href: "/internal/projects", label: "Back to projects" }}
        />
      </div>
    </>
  );
}
