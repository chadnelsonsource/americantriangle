import { describe, expect, it } from "vitest";
import { safeInternalPath } from "./paths";

describe("safeInternalPath", () => {
  it("keeps a same-site path", () => {
    expect(safeInternalPath("/internal/inquiries")).toBe("/internal/inquiries");
  });

  it("rejects an off-site redirect", () => {
    expect(safeInternalPath("//evil.example")).toBe("/contributor");
    expect(safeInternalPath("/\\evil.example")).toBe("/contributor");
    expect(safeInternalPath("https://evil.example")).toBe("/contributor");
    expect(safeInternalPath(null)).toBe("/contributor");
  });
});
