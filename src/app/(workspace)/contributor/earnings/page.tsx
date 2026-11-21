import { EmptyState, Metric } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function EarningsPage() {
  return (
    <>
      <PageIntro title="Earnings" lede="Pending, approved, payout initiated, and paid are separate. A client invoice does not move these states." />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Pending" value="—" />
        <Metric label="Approved" value="—" />
        <Metric label="Paid" value="—" />
      </div>
      <div className="mt-8">
        <EmptyState title="No earnings rows" body="Amounts appear only from ledger rows for your account. Dashes mean there is nothing to total." />
      </div>
    </>
  );
}
