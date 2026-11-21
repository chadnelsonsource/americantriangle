import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function MessagesPage() {
  return (
    <>
      <PageIntro title="Messages" lede="Messages are limited to your organization." />
      <div className="mt-8">
        <EmptyState title="No messages" body="When a project manager posts a client-visible update, it can also appear with the project." />
      </div>
    </>
  );
}
