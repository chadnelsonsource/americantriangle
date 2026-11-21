import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function SupportPage() {
  return (
    <>
      <PageIntro title="Support" lede="Support tickets belong to your organization." />
      <div className="mt-8">
        <EmptyState title="No tickets" body="Open a ticket when you are signed in and the organization exists. Staff outside the organization do not see it unless their role allows support access." />
      </div>
    </>
  );
}
