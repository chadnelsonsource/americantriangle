import { Metric } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { buildSnapshot, emptyCounts } from "@/services/metrics";

const labels = [
  ["Qualification", "qualification"],
  ["Task completion", "taskCompletion"],
  ["Approval", "approval"],
  ["Rejection", "rejection"],
  ["Revision", "revision"],
  ["Reviewer agreement", "agreement"],
  ["On-time milestones", "onTimeMilestones"],
  ["Payment success", "paymentSuccess"],
] as const;

export default function AnalyticsPage() {
  const snapshot = buildSnapshot(emptyCounts());
  return (
    <>
      <PageIntro title="Operational metrics" lede="Rates are calculated from stored rows. An empty table is a dash, not a zero presented as performance." />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {labels.map(([label, key]) => {
          const rate = snapshot.rates[key];
          return <Metric key={key} label={label} value={rate === null ? "—" : `${Math.round(rate * 100)}%`} />;
        })}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
        No stored rows were loaded, so every rate stays a dash. A dash is not a performance result.
      </p>
    </>
  );
}
