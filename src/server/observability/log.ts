import "server-only";
import { buildLogRecord, type LogFields, type LogLevel } from "@/server/observability/record";

export function logOperationalEvent(input: { level: LogLevel; event: string; code: string; fields?: LogFields }): { errorId: string } {
  const errorId = crypto.randomUUID();
  const line = JSON.stringify(buildLogRecord({ ...input, now: new Date().toISOString(), errorId }));
  if (input.level === "error") console.error(line);
  else if (input.level === "warn") console.warn(line);
  else console.info(line);
  return { errorId };
}
