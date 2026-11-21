import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function AdminPage() {
  return (
    <>
      <PageIntro title="Administration" lede="Account status changes and cross-organization reads are audited. Public registration cannot create a staff role." />
      <div className="mt-8">
        <EmptyState
          title="No audit events"
          body="Suspending an account, exporting data, or a super administrator reading across organizations writes an audit row. This screen does not create a staff account, publish an article, send a notification, or edit environment settings."
          action={{ href: "/account", label: "Open your account request" }}
        />
      </div>
    </>
  );
}
