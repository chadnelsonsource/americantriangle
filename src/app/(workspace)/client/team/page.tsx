import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function TeamPage() {
  return (
    <>
      <PageIntro title="Team" lede="Owners invite members. An invitation can be accepted once and it expires." />
      <div className="mt-8">
        <EmptyState title="No invitations" body="Invitations are emailed when Resend is configured. The raw token is not shown on this page." />
      </div>
    </>
  );
}
