import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { OrganizationForm } from "@/features/client/organization-form";

export default function ClientHomePage() {
  return (
    <>
      <PageIntro title="Organization" lede="You see projects, messages, and files for your organization. Another organization’s address will not reveal its data." />
      <OrganizationForm />
      <div className="mt-8">
        <EmptyState title="No projects yet" body="After the organization exists, inquiries become projects. Internal notes never appear on this page." />
      </div>
    </>
  );
}
