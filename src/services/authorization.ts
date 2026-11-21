export const ACCOUNT_STATUSES = [
  "pending_verification",
  "active",
  "suspended",
  "deactivated",
] as const;

export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const PLATFORM_ROLES = [
  "contributor",
  "client_owner",
  "client_member",
  "project_manager",
  "reviewer",
  "talent_operations",
  "finance_operations",
  "engineer",
  "administrator",
  "super_administrator",
] as const;

export type PlatformRole = (typeof PLATFORM_ROLES)[number];

export const ACTIONS = [
  "profile.read.self",
  "profile.update.self",
  "contributor.read",
  "contributor.review",
  "submission.read.own",
  "task.submit",
  "submission.review",
  "notes.internal.read",
  "project.read",
  "project.manage",
  "org.invite",
  "invoice.read",
  "earnings.approve",
  "payout.manage",
  "ai.invoke",
  "dataset.export",
  "analytics.read",
  "account.manage",
  "inquiry.read",
  "org.cross_read",
] as const;

export type Action = (typeof ACTIONS)[number];

export interface Actor {
  userId: string;
  accountStatus: AccountStatus;
  platformRole: PlatformRole;
  organizationIds: readonly string[];
  projectIds: readonly string[];
}

export interface Resource {
  organizationId?: string;
  projectId?: string;
  ownerUserId?: string;
  authorUserId?: string;
}

export interface Decision {
  allowed: boolean;
  reason: string;
}

const SELF_ACTIONS = new Set<Action>(["profile.read.self", "profile.update.self"]);

const GRANTS: Record<PlatformRole, readonly Action[]> = {
  contributor: ["profile.read.self", "profile.update.self", "submission.read.own", "task.submit"],
  client_owner: ["profile.read.self", "profile.update.self", "project.read", "org.invite", "invoice.read"],
  client_member: ["profile.read.self", "profile.update.self", "project.read"],
  project_manager: [
    "profile.read.self",
    "profile.update.self",
    "notes.internal.read",
    "project.read",
    "project.manage",
    "dataset.export",
    "analytics.read",
    "inquiry.read",
  ],
  reviewer: [
    "profile.read.self",
    "profile.update.self",
    "submission.review",
    "notes.internal.read",
    "project.read",
  ],
  talent_operations: [
    "profile.read.self",
    "profile.update.self",
    "contributor.read",
    "contributor.review",
    "analytics.read",
  ],
  finance_operations: [
    "profile.read.self",
    "profile.update.self",
    "invoice.read",
    "earnings.approve",
    "payout.manage",
    "analytics.read",
  ],
  engineer: [
    "profile.read.self",
    "profile.update.self",
    "project.read",
    "notes.internal.read",
    "ai.invoke",
    "dataset.export",
  ],
  administrator: [
    "profile.read.self",
    "profile.update.self",
    "contributor.read",
    "notes.internal.read",
    "project.read",
    "analytics.read",
    "account.manage",
    "inquiry.read",
  ],
  super_administrator: ACTIONS,
};

const CLIENT_ORG_ACTIONS = new Set<Action>(["project.read", "org.invite", "invoice.read"]);
const ASSIGNED_PROJECT_ACTIONS = new Set<Action>([
  "project.read",
  "project.manage",
  "notes.internal.read",
  "ai.invoke",
  "dataset.export",
]);

function skipsScope(role: PlatformRole): boolean {
  return role === "administrator" || role === "super_administrator";
}

export function authorize(actor: Actor, action: Action, resource: Resource = {}): Decision {
  if (actor.accountStatus !== "active" && !SELF_ACTIONS.has(action)) {
    return { allowed: false, reason: "account_not_active" };
  }

  if (action === "org.cross_read" && actor.platformRole !== "super_administrator") {
    return { allowed: false, reason: "role_denied" };
  }

  if (!GRANTS[actor.platformRole].includes(action)) {
    return { allowed: false, reason: "role_denied" };
  }

  if (action === "submission.review" && resource.authorUserId && resource.authorUserId === actor.userId) {
    return { allowed: false, reason: "self_review" };
  }

  if (
    (action === "submission.read.own" || action === "task.submit") &&
    resource.ownerUserId !== actor.userId
  ) {
    return { allowed: false, reason: "not_owner" };
  }

  const clientScoped =
    (actor.platformRole === "client_owner" || actor.platformRole === "client_member") &&
    CLIENT_ORG_ACTIONS.has(action);
  if (clientScoped) {
    if (!resource.organizationId || !actor.organizationIds.includes(resource.organizationId)) {
      return { allowed: false, reason: "outside_organization" };
    }
  }

  const projectScoped =
    !skipsScope(actor.platformRole) &&
    actor.platformRole !== "finance_operations" &&
    ASSIGNED_PROJECT_ACTIONS.has(action) &&
    actor.platformRole !== "client_owner" &&
    actor.platformRole !== "client_member";
  if (projectScoped) {
    if (!resource.projectId || !actor.projectIds.includes(resource.projectId)) {
      return { allowed: false, reason: "outside_project" };
    }
  }

  return { allowed: true, reason: "allowed" };
}
