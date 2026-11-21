import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function TalentPage() {
  return (
    <>
      <PageIntro title="Talent review" lede="Applications move from profile incomplete to pending assessment, under review, qualified, or rejected." />
      <div className="mt-8">
        <EmptyState title="No applications" body="Talent operations can read contributor profiles. Finance records and client contracts are not part of this queue." />
      </div>
    </>
  );
}
