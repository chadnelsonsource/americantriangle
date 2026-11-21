import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function ClientProjectsPage() {
  return (
    <>
      <PageIntro title="Projects" lede="Milestones, deliverables, and client-visible updates for your organization." />
      <div className="mt-8">
        <EmptyState title="No projects" body="A project appears after an inquiry is stored. Approvals are explicit actions on a deliverable." />
      </div>
    </>
  );
}
