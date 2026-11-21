import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { REVIEW_STATES } from "@/services/reviews";

export default function ReviewQueuePage() {
  return (
    <>
      <PageIntro title="Review queue" lede="Reviewers score work they did not author. Earnings stay blocked until the review is approved." />
      <h2 className="mt-8 text-xl">States this queue can hold</h2>
      <ul className="mt-3 flex flex-wrap gap-2 text-sm">
        {REVIEW_STATES.map((state) => (
          <li key={state} className="rounded-sm border border-line px-2 py-1">
            {state.replaceAll("_", " ")}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <EmptyState title="Queue is empty" body="A dispute returns the item to an authorized reviewer who is not the author." />
      </div>
    </>
  );
}
