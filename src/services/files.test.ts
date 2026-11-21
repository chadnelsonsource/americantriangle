import { describe, expect, it } from "vitest";
import { signedDownloadAllowed, validateFile } from "./files";

describe("files", () => {
  it("rejects an oversize file, an unknown type, and a path-like name", () => {
    expect(validateFile({ name: "notes.pdf", type: "application/pdf", size: 11 * 1024 * 1024 }).ok).toBe(false);
    expect(validateFile({ name: "run.exe", type: "application/octet-stream", size: 100 }).ok).toBe(false);
    expect(validateFile({ name: "../secret.pdf", type: "application/pdf", size: 100 }).ok).toBe(false);
  });

  it("allows a normal pdf and blocks a stranger from the download", () => {
    expect(validateFile({ name: "brief.pdf", type: "application/pdf", size: 1000 }).ok).toBe(true);
    expect(
      signedDownloadAllowed({
        requesterId: "stranger",
        ownerId: "owner",
        sameOrganization: false,
        staffAssigned: false,
      }),
    ).toBe(false);
  });
});
