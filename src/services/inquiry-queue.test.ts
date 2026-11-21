import { describe, expect, it } from "vitest";
import { filterInquiries } from "./inquiry-queue";

const leads = [
  { name: "Ada Lovelace", email: "ada@example.com", organization: "Analytical", inquiryType: "integrated", message: "Evaluate a corpus" },
  { name: "Grace Hopper", email: "grace@example.com", organization: "Compiler", inquiryType: "partnerships", message: "A technology proposal" },
];

describe("filterInquiries", () => {
  it("matches a name, email, organization, or message", () => {
    expect(filterInquiries(leads, "corpus", "all")).toEqual([leads[0]]);
    expect(filterInquiries(leads, "GRACE@", "all")).toEqual([leads[1]]);
  });

  it("keeps the type and the text together", () => {
    expect(filterInquiries(leads, "example.com", "partnerships")).toEqual([leads[1]]);
    expect(filterInquiries(leads, "   ", "all")).toEqual(leads);
  });
});
