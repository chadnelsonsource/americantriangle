import { describe, expect, it } from "vitest";
import { checkDataset, exportable } from "./dataset-quality";

const fields = [
  { name: "text", required: true, type: "string" as const },
  { name: "label", required: true, allowed: ["yes", "no"] },
];

describe("dataset quality", () => {
  it("reports missing values, duplicates, schema violations, and disagreements", () => {
    const issues = checkDataset(
      [
        { id: "1", groupId: "g", values: { text: "a", label: "yes" } },
        { id: "2", values: { text: "a", label: "yes" } },
        { id: "3", groupId: "g", values: { text: "b", label: "no" } },
        { id: "4", values: { text: "", label: "maybe" } },
      ],
      fields,
      "label",
    );
    expect(issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["duplicate", "inconsistent_label", "missing", "schema"]),
    );
  });

  it("exports only an approved stage", () => {
    expect(exportable("raw")).toBe(false);
    expect(exportable("processed")).toBe(false);
    expect(exportable("approved")).toBe(true);
  });
});
