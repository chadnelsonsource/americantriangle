import { describe, expect, it } from "vitest";
import { authorize, type Actor } from "./authorization";

const orgA = "org-a";
const orgB = "org-b";
const projectA = "project-a";

function actor(partial: Partial<Actor> & Pick<Actor, "platformRole">): Actor {
  return {
    userId: partial.userId ?? "user-1",
    accountStatus: partial.accountStatus ?? "active",
    platformRole: partial.platformRole,
    organizationIds: partial.organizationIds ?? [],
    projectIds: partial.projectIds ?? [],
  };
}

describe("authorize", () => {
  it("lets project managers and administrators read inquiries and denies other roles", () => {
    expect(authorize(actor({ platformRole: "project_manager" }), "inquiry.read").allowed).toBe(true);
    expect(authorize(actor({ platformRole: "administrator" }), "inquiry.read").allowed).toBe(true);
    expect(authorize(actor({ platformRole: "super_administrator" }), "inquiry.read").allowed).toBe(true);
    expect(authorize(actor({ platformRole: "contributor" }), "inquiry.read").reason).toBe("role_denied");
    expect(authorize(actor({ platformRole: "client_owner", organizationIds: [orgA] }), "inquiry.read").reason).toBe("role_denied");
    expect(authorize(actor({ platformRole: "talent_operations" }), "inquiry.read").reason).toBe("role_denied");
    expect(authorize(actor({ platformRole: "project_manager", accountStatus: "suspended" }), "inquiry.read").reason).toBe("account_not_active");
  });

  it("denies a client reading another organization", () => {
    const decision = authorize(actor({ platformRole: "client_owner", organizationIds: [orgA] }), "project.read", {
      organizationId: orgB,
    });
    expect(decision).toEqual({ allowed: false, reason: "outside_organization" });
  });

  it("allows a client owner to read their own organization", () => {
    const decision = authorize(actor({ platformRole: "client_owner", organizationIds: [orgA] }), "project.read", {
      organizationId: orgA,
    });
    expect(decision.allowed).toBe(true);
  });

  it("denies a client member invoices", () => {
    const decision = authorize(actor({ platformRole: "client_member", organizationIds: [orgA] }), "invoice.read", {
      organizationId: orgA,
    });
    expect(decision.reason).toBe("role_denied");
  });

  it("denies a contributor another person's submission", () => {
    const decision = authorize(actor({ platformRole: "contributor", userId: "c1" }), "submission.read.own", {
      ownerUserId: "c2",
    });
    expect(decision.reason).toBe("not_owner");
  });

  it("denies internal notes to a client owner", () => {
    const decision = authorize(actor({ platformRole: "client_owner", organizationIds: [orgA] }), "notes.internal.read", {
      organizationId: orgA,
      projectId: projectA,
    });
    expect(decision.reason).toBe("role_denied");
  });

  it("denies a reviewer reviewing their own submission", () => {
    const decision = authorize(
      actor({ platformRole: "reviewer", userId: "same", projectIds: [projectA] }),
      "submission.review",
      { authorUserId: "same", projectId: projectA },
    );
    expect(decision.reason).toBe("self_review");
  });

  it("allows a reviewer reviewing someone else on an assigned project", () => {
    const decision = authorize(
      actor({ platformRole: "reviewer", userId: "rev", projectIds: [projectA] }),
      "submission.review",
      { authorUserId: "author", projectId: projectA },
    );
    expect(decision.allowed).toBe(true);
  });

  it("denies an engineer earnings approval", () => {
    const decision = authorize(actor({ platformRole: "engineer", projectIds: [projectA] }), "earnings.approve");
    expect(decision.reason).toBe("role_denied");
  });

  it("denies a contributor earnings approval", () => {
    const decision = authorize(actor({ platformRole: "contributor" }), "earnings.approve");
    expect(decision.reason).toBe("role_denied");
  });

  it("denies a suspended contributor a task submit", () => {
    const decision = authorize(
      actor({ platformRole: "contributor", accountStatus: "suspended", userId: "c1" }),
      "task.submit",
      { ownerUserId: "c1" },
    );
    expect(decision.reason).toBe("account_not_active");
  });

  it("denies an unverified contributor a task submit", () => {
    const decision = authorize(
      actor({ platformRole: "contributor", accountStatus: "pending_verification", userId: "c1" }),
      "task.submit",
      { ownerUserId: "c1" },
    );
    expect(decision.reason).toBe("account_not_active");
  });

  it("allows a suspended user to read their own profile", () => {
    const decision = authorize(
      actor({ platformRole: "contributor", accountStatus: "suspended" }),
      "profile.read.self",
    );
    expect(decision.allowed).toBe(true);
  });

  it("denies cross-organization reads to an administrator", () => {
    const decision = authorize(actor({ platformRole: "administrator" }), "org.cross_read", {
      organizationId: orgB,
    });
    expect(decision.reason).toBe("role_denied");
  });

  it("allows cross-organization reads to a super administrator", () => {
    const decision = authorize(actor({ platformRole: "super_administrator" }), "org.cross_read", {
      organizationId: orgB,
    });
    expect(decision.allowed).toBe(true);
  });

  it("denies a project manager a project they are not assigned to", () => {
    const decision = authorize(actor({ platformRole: "project_manager", projectIds: ["other"] }), "project.manage", {
      projectId: projectA,
    });
    expect(decision.reason).toBe("outside_project");
  });
});
