import { describe, expect, it } from "vitest";
import { isProtectedWorkspacePath, safeInternalPath } from "./paths";

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

describe("workspace paths", () => {
  it("keeps the signed-in workspaces behind an account", () => {
    expect(isProtectedWorkspacePath("/contributor")).toBe(true);
    expect(isProtectedWorkspacePath("/contributor/tasks")).toBe(true);
    expect(isProtectedWorkspacePath("/client/inquiries/new")).toBe(true);
    expect(isProtectedWorkspacePath("/internal")).toBe(true);
    expect(isProtectedWorkspacePath("/account")).toBe(true);
  });

  it("leaves public customer and expert forms open", () => {
    expect(isProtectedWorkspacePath("/contributors/join")).toBe(false);
    expect(isProtectedWorkspacePath("/consultation")).toBe(false);
    expect(isProtectedWorkspacePath("/contact")).toBe(false);
    expect(isProtectedWorkspacePath("/partners")).toBe(false);
  });
});
