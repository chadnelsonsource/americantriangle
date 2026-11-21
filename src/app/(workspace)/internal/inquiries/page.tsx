import { redirect } from "next/navigation";
import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { InquiryQueue } from "@/features/internal/inquiry-queue";
import { readInquiryQueue } from "@/server/inquiries";
import { withReference } from "@/server/observability/record";

export default async function InquiriesPage() {
  const queue = await readInquiryQueue();
  if (queue.status === "unauthenticated") redirect("/login?next=/internal/inquiries");
  if (queue.status === "forbidden") redirect("/unauthorized");

  return (
    <>
      <PageIntro
        title="Inquiries"
        lede="Project managers and administrators can read stored contact and partnership proposals. A proposal is not an agreement, and this page does not publish it."
      />
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        The database policy that limits this read is written and has not been applied to a hosted database. Until it is applied, a stored proposal may not appear here. This page does not assign an owner or close an inquiry.
      </p>
      <div className="mt-8">
        {queue.status === "unconfigured" ? (
          <EmptyState title="Inquiry store is not configured" body="Proposals cannot be listed until the database client is configured. Nothing on this page is a sample proposal." />
        ) : null}
        {queue.status === "read_failed" ? (
          <EmptyState title="The inquiry list could not be read" body={withReference("The signed-in request did not return the rows. Apply the lead migrations, including partnership fields, before expecting this list to load.", queue.errorId)} />
        ) : null}
        {queue.status === "ready" && queue.leads.length === 0 ? (
          <EmptyState title="No inquiries are stored" body="A contact or partnership form adds a row only after a real save. This page does not show sample proposals." />
        ) : null}
        {queue.status === "ready" && queue.leads.length > 0 ? <InquiryQueue leads={queue.leads} /> : null}
      </div>
    </>
  );
}
