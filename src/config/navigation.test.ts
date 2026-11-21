import { describe, expect, it } from "vitest";
import { internalNav, internalQueues } from "./navigation";

describe("internal navigation", () => {
  it("gives the overview a destination for every operations link", () => {
    const destinations = new Set(internalQueues.map((queue) => queue.href));
    for (const link of internalNav) {
      if (link.href === "/internal") continue;
      expect(destinations.has(link.href)).toBe(true);
    }
  });
});
