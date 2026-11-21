import { EmptyState, Metric } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function FinancePage() {
  return (
    <>
      <PageIntro title="Finance" lede="Invoices, payments, earnings approval, and payout confirmation are separate steps. Webhook replays do not create a second ledger row." />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Invoiced" value="—" />
        <Metric label="Collected" value="—" />
        <Metric label="Approved earnings" value="—" />
      </div>
      <div className="mt-8">
        <EmptyState title="Ledger is empty" body="Stripe Connect payouts stay off until STRIPE_CONNECT_ENABLED is legally approved. Until then, finance records a payout that happened outside the product." />
      </div>
    </>
  );
}
