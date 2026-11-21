export interface MetricCounts {
  inquiries: number;
  qualifiedLeads: number;
  proposals: number;
  activeClients: number;
  applications: number;
  qualifiedContributors: number;
  finishedAssessments: number;
  activeContributors: number;
  tasksAssigned: number;
  tasksCompleted: number;
  reviewsCompleted: number;
  reviewsApproved: number;
  reviewsRejected: number;
  reviewsRevised: number;
  agreedReviews: number;
  pairedReviews: number;
  milestonesDue: number;
  milestonesOnTime: number;
  invoicedCents: number;
  collectedCents: number;
  approvedEarningsCents: number;
  outstandingEarningsCents: number;
  paymentAttempts: number;
  paymentSuccesses: number;
}

export interface MetricSnapshot {
  counts: MetricCounts;
  rates: {
    qualification: number | null;
    taskCompletion: number | null;
    approval: number | null;
    rejection: number | null;
    revision: number | null;
    agreement: number | null;
    onTimeMilestones: number | null;
    paymentSuccess: number | null;
  };
}

export function ratio(part: number, whole: number): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return null;
  return part / whole;
}

export function emptyCounts(): MetricCounts {
  return {
    inquiries: 0,
    qualifiedLeads: 0,
    proposals: 0,
    activeClients: 0,
    applications: 0,
    qualifiedContributors: 0,
    finishedAssessments: 0,
    activeContributors: 0,
    tasksAssigned: 0,
    tasksCompleted: 0,
    reviewsCompleted: 0,
    reviewsApproved: 0,
    reviewsRejected: 0,
    reviewsRevised: 0,
    agreedReviews: 0,
    pairedReviews: 0,
    milestonesDue: 0,
    milestonesOnTime: 0,
    invoicedCents: 0,
    collectedCents: 0,
    approvedEarningsCents: 0,
    outstandingEarningsCents: 0,
    paymentAttempts: 0,
    paymentSuccesses: 0,
  };
}

export function buildSnapshot(counts: MetricCounts): MetricSnapshot {
  return {
    counts,
    rates: {
      qualification: ratio(counts.qualifiedContributors, counts.finishedAssessments),
      taskCompletion: ratio(counts.tasksCompleted, counts.tasksAssigned),
      approval: ratio(counts.reviewsApproved, counts.reviewsCompleted),
      rejection: ratio(counts.reviewsRejected, counts.reviewsCompleted),
      revision: ratio(counts.reviewsRevised, counts.reviewsCompleted),
      agreement: ratio(counts.agreedReviews, counts.pairedReviews),
      onTimeMilestones: ratio(counts.milestonesOnTime, counts.milestonesDue),
      paymentSuccess: ratio(counts.paymentSuccesses, counts.paymentAttempts),
    },
  };
}

export function settleNotification(input: { domainCommitted: boolean; emailOk: boolean }): {
  domainStatus: "committed" | "not_committed";
  notificationStatus: "sent" | "failed";
} {
  return {
    domainStatus: input.domainCommitted ? "committed" : "not_committed",
    notificationStatus: input.emailOk ? "sent" : "failed",
  };
}
