import { describe, expect, it } from "vitest";
import { canSubmitExclusive, TASK_FORMATS } from "./tasks";

describe("exclusive assignment", () => {
  it("allows only the assignee to submit an open task", () => {
    expect(
      canSubmitExclusive({ assigneeId: "a", actorId: "a", status: "in_progress", lockHolderId: "a" }).ok,
    ).toBe(true);
    expect(
      canSubmitExclusive({ assigneeId: "a", actorId: "b", status: "assigned", lockHolderId: null }).reason,
    ).toBe("not_assignee");
  });

  it("rejects a second submit and a lock held by someone else", () => {
    expect(
      canSubmitExclusive({ assigneeId: "a", actorId: "a", status: "submitted", lockHolderId: "a" }).reason,
    ).toBe("already_submitted");
    expect(
      canSubmitExclusive({ assigneeId: "a", actorId: "a", status: "in_progress", lockHolderId: "b" }).reason,
    ).toBe("locked");
  });

  it("lists every task format the product supports", () => {
    expect(TASK_FORMATS).toContain("preference_comparison");
    expect(TASK_FORMATS).toContain("image_annotation");
    expect(TASK_FORMATS).toHaveLength(13);
  });
});
