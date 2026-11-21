import { Inngest } from "inngest";
import { scoreMultipleChoice } from "@/services/assessments";
import { settleNotification } from "@/services/metrics";
import { sendTransactionalEmail } from "@/server/email/send";
import { logOperationalEvent } from "@/server/observability/log";

async function traced<T>(event: string, work: () => Promise<T>): Promise<T> {
  try {
    return await work();
  } catch (error) {
    logOperationalEvent({ level: "error", event, code: "job_failed" });
    throw error;
  }
}

export const inngest = new Inngest({ id: "americantriangle" });

type AssessmentSubmitted = {
  name: "assessment/submitted";
  data: { attemptId: string; email: string; answers: Record<string, string>; key: Record<string, string> };
};

type ReviewDecided = {
  name: "review/decided";
  data: { submissionId: string; email: string; state: string };
};

export const gradeAssessment = inngest.createFunction(
  { id: "grade-assessment", retries: 3, triggers: [{ event: "assessment/submitted" }] },
  async ({ event, step }) => {
    const typed = event as unknown as AssessmentSubmitted;
    const scored = await step.run("score", async () => traced("job.grade_assessment", async () => scoreMultipleChoice(typed.data.answers, typed.data.key)));
    const notice = await step.run("email", async () =>
      traced("job.grade_assessment", async () => {
        const email = await sendTransactionalEmail({
          to: typed.data.email,
          subject: "Assessment received",
          text: "Your assessment was received. Objective items are scored. Other items wait for review.",
        });
        return settleNotification({ domainCommitted: true, emailOk: email.ok });
      }),
    );
    return { attemptId: typed.data.attemptId, scored, notice };
  },
);

export const notifyReview = inngest.createFunction(
  { id: "notify-review", retries: 3, triggers: [{ event: "review/decided" }] },
  async ({ event, step }) => {
    const typed = event as unknown as ReviewDecided;
    return step.run("email", async () =>
      traced("job.notify_review", async () => {
        const email = await sendTransactionalEmail({
          to: typed.data.email,
          subject: "Review update",
          text: `A review is now ${typed.data.state}. A failed email does not change that review.`,
        });
        return settleNotification({ domainCommitted: true, emailOk: email.ok });
      }),
    );
  },
);

export const functions = [gradeAssessment, notifyReview];
