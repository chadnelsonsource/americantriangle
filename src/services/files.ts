export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg",
  "audio/mpeg",
  "video/mp4",
  "application/json",
] as const;

export function validateFile(input: {
  name: string;
  type: string;
  size: number;
}): { ok: true } | { ok: false; reason: "size" | "type" | "name" } {
  if (!Number.isFinite(input.size) || input.size <= 0 || input.size > MAX_FILE_BYTES) {
    return { ok: false, reason: "size" };
  }
  if (!ALLOWED_FILE_TYPES.includes(input.type as (typeof ALLOWED_FILE_TYPES)[number])) {
    return { ok: false, reason: "type" };
  }
  if (
    input.name.trim().length === 0 ||
    input.name.includes("..") ||
    input.name.includes("/") ||
    input.name.includes("\\")
  ) {
    return { ok: false, reason: "name" };
  }
  return { ok: true };
}

export function signedDownloadAllowed(input: {
  requesterId: string;
  ownerId: string;
  sameOrganization: boolean;
  staffAssigned: boolean;
}): boolean {
  return input.requesterId === input.ownerId || input.sameOrganization || input.staffAssigned;
}
