import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function InternalProjectsPage() {
  return (
    <>
      <PageIntro title="Delivery projects" lede="Scope, owners, milestones, risks, and the split between internal notes and client updates." />
      <div className="mt-8">
        <EmptyState title="No projects assigned" body="Project managers see projects they are members of. Super administrators can read across organizations, and that read is audited." />
      </div>
    </>
  );
}
