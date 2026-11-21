import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { TASK_FORMATS } from "@/services/tasks";

export default async function TaskPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = await params;
  return (
    <>
      <PageIntro title="Task" lede="An exclusive assignment accepts one assignee. A second person cannot submit it, and a submitted assignment cannot be submitted again." />
      <div className="mt-8">
        <EmptyState title="No assignment is loaded" body={`Assignment ${assignmentId} is not available. Drafts and submissions are stored only for the assignee.`} />
      </div>
      <h2 className="mt-10 text-2xl">Supported formats</h2>
      <ul className="mt-4 columns-1 text-sm text-muted md:columns-2">
        {TASK_FORMATS.map((format) => (
          <li key={format} className="py-1">
            {format.replaceAll("_", " ")}
          </li>
        ))}
      </ul>
    </>
  );
}
