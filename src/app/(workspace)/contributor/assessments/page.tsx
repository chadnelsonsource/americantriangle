import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";

export default function AssessmentsPage() {
  return (
    <>
      <PageIntro title="Assessments" lede="Objective items are scored from a key that is not sent to the browser. Written and coding items wait for talent review." />
      <ul className="mt-8 grid gap-2 text-sm text-muted">
        {["multiple choice", "written", "coding", "mathematics", "scientific reasoning", "domain", "file submission"].map((kind) => (
          <li key={kind} className="border-t border-line py-2 capitalize">
            {kind}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <EmptyState title="No published assessment is loaded" body="Published exams appear when the database is connected. Answer keys stay in a column the browser role cannot select." />
      </div>
    </>
  );
}
