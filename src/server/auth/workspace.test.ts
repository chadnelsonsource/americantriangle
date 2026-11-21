import { describe, expect, it } from "vitest";
import { workspaceAllowed } from "./workspace";

describe("workspaceAllowed", () => {
  it("allows an active account of the matching kind", () => {
    expect(workspaceAllowed({ accountKind: "staff", accountStatus: "active" }, ["staff"])).toBe(true);
  });

  it("rejects a suspended account and the wrong kind", () => {
    expect(workspaceAllowed({ accountKind: "staff", accountStatus: "suspended" }, ["staff"])).toBe(false);
    expect(workspaceAllowed({ accountKind: "contributor", accountStatus: "active" }, ["staff"])).toBe(false);
    expect(workspaceAllowed(null, ["client"])).toBe(false);
  });
});
