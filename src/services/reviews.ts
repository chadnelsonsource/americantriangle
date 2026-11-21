export const REVIEW_STATES = [
  "submitted",
  "queued",
  "under_review",
  "approved",
  "revision_required",
  "rejected",
  "disputed",
] as const;

export type ReviewState = (typeof REVIEW_STATES)[number];

export function canReview(input: {
  reviewerId: string;
  authorId: string;
  exceptionGranted: boolean;
}): { ok: boolean; reason: string } {
  if (input.reviewerId === input.authorId && !input.exceptionGranted) {
    return { ok: false, reason: "self_review" };
  }
  return { ok: true, reason: "ok" };
}

export function earningsGate(state: ReviewState): { ok: boolean; reason: string } {
  if (state !== "approved") return { ok: false, reason: "review_not_approved" };
  return { ok: true, reason: "approved" };
}

const REVIEW_TRANSITIONS: Record<ReviewState, readonly ReviewState[]> = {
  submitted: ["queued"],
  queued: ["under_review"],
  under_review: ["approved", "revision_required", "rejected", "disputed"],
  approved: [],
  revision_required: ["submitted"],
  rejected: ["disputed"],
  disputed: ["under_review", "approved", "rejected"],
};

export function nextReviewState(
  current: ReviewState,
  next: ReviewState,
): { ok: true; state: ReviewState } | { ok: false; error: "invalid_transition" } {
  if (!REVIEW_TRANSITIONS[current].includes(next)) return { ok: false, error: "invalid_transition" };
  return { ok: true, state: next };
}
