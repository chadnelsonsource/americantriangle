import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function ContributorProjectsPage() {
  return (
    <>
      <PageIntro title="Projects" lede="You can apply once to a project you are eligible for. Matching is rule-based: skills, assessments, language, availability, and capacity." />
      <div className="mt-8">
        <EmptyState title="No eligible openings" body="Openings show up after you are qualified and a project’s rules include you. A country limit is ignored unless the project records a legal reason." />
      </div>
    </>
  );
}
