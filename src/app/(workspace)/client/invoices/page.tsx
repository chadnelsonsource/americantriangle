import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function InvoicesPage() {
  return (
    <>
      <PageIntro title="Invoices" lede="Organization owners can see invoices. Members cannot, unless a later grant says so." />
      <div className="mt-8">
        <EmptyState title="No invoices" body="Issued invoices and payment status show up here. Card numbers are never stored." />
      </div>
    </>
  );
}
