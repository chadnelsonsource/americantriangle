export const TASK_FORMATS = [
  "text_annotation",
  "classification",
  "prompt_creation",
  "response_evaluation",
  "response_ranking",
  "preference_comparison",
  "coding",
  "mathematics",
  "scientific_reasoning",
  "structured_extraction",
  "image_annotation",
  "audio_annotation",
  "video_annotation",
] as const;

export type TaskFormat = (typeof TASK_FORMATS)[number];

export type AssignmentStatus = "assigned" | "in_progress" | "submitted" | "expired" | "released";

export function canSubmitExclusive(input: {
  assigneeId: string;
  actorId: string;
  status: AssignmentStatus;
  lockHolderId: string | null;
}): { ok: boolean; reason: string } {
  if (input.actorId !== input.assigneeId) return { ok: false, reason: "not_assignee" };
  if (input.status === "submitted") return { ok: false, reason: "already_submitted" };
  if (input.status === "expired" || input.status === "released") return { ok: false, reason: "not_open" };
  if (input.lockHolderId && input.lockHolderId !== input.actorId) return { ok: false, reason: "locked" };
  return { ok: true, reason: "open" };
}

export function canSaveDraft(input: {
  assigneeId: string;
  actorId: string;
  status: AssignmentStatus;
}): { ok: boolean; reason: string } {
  if (input.actorId !== input.assigneeId) return { ok: false, reason: "not_assignee" };
  if (input.status === "submitted" || input.status === "expired" || input.status === "released") {
    return { ok: false, reason: "not_open" };
  }
  return { ok: true, reason: "open" };
}
