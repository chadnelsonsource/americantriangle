import { describe, expect, it } from "vitest";
import { accountRequestKind } from "./request";

describe("accountRequestKind", () => {
  it("accepts an export without a deletion confirmation", () => {
    expect(accountRequestKind("export", null)).toBe("export");
  });

  it("requires an explicit deletion confirmation", () => {
    expect(accountRequestKind("delete", null)).toBe("unconfirmed");
    expect(accountRequestKind("delete", "delete")).toBe("delete");
    expect(accountRequestKind("suspend", "delete")).toBe("invalid");
  });
});
