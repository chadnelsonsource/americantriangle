import { describe, expect, it } from "vitest";
import { canStartAttempt, needsManualReview, passed, scoreMultipleChoice, toPublicQuestion } from "./assessments";

describe("assessments", () => {
  it("hides the answer key from the public question", () => {
    expect(toPublicQuestion({ id: "q1", prompt: "2 + 2", choices: ["4"], answer: "4" })).toEqual({
      id: "q1",
      prompt: "2 + 2",
      choices: ["4"],
    });
  });

  it("scores objective items and enforces attempt limits", () => {
    const score = scoreMultipleChoice({ q1: "4", q2: "no" }, { q1: "4", q2: "yes" });
    expect(score).toEqual({ correct: 1, total: 2 });
    expect(passed(score, 0.8)).toBe(false);
    expect(passed({ correct: 4, total: 5 }, 0.8)).toBe(true);
    expect(canStartAttempt(2, 2).reason).toBe("attempt_limit");
  });

  it("sends written and coding items to manual review", () => {
    expect(needsManualReview("multiple_choice")).toBe(false);
    expect(needsManualReview("coding")).toBe(true);
  });
});
