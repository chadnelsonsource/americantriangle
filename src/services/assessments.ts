export interface ObjectiveQuestion {
  id: string;
  prompt: string;
  choices: readonly string[];
  answer?: string;
}

export interface PublicQuestion {
  id: string;
  prompt: string;
  choices: readonly string[];
}

export function toPublicQuestion(question: ObjectiveQuestion): PublicQuestion {
  return { id: question.id, prompt: question.prompt, choices: question.choices };
}

export function scoreMultipleChoice(
  answers: Readonly<Record<string, string>>,
  key: Readonly<Record<string, string>>,
): { correct: number; total: number } {
  const ids = Object.keys(key);
  const correct = ids.filter((id) => answers[id] === key[id]).length;
  return { correct, total: ids.length };
}

export function passed(score: { correct: number; total: number }, threshold: number): boolean {
  if (score.total === 0 || threshold < 0 || threshold > 1) return false;
  return score.correct / score.total >= threshold;
}

export function canStartAttempt(attemptCount: number, maxAttempts: number): { ok: boolean; reason: string } {
  if (maxAttempts < 1) return { ok: false, reason: "attempts_disabled" };
  if (attemptCount >= maxAttempts) return { ok: false, reason: "attempt_limit" };
  return { ok: true, reason: "ok" };
}

export type QuestionKind = "multiple_choice" | "written" | "coding" | "mathematics" | "scientific" | "domain" | "file";

export function needsManualReview(kind: QuestionKind): boolean {
  return kind !== "multiple_choice";
}
