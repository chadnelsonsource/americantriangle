export const contributorNav = [
  { href: "/contributor", label: "Overview" },
  { href: "/contributor/profile", label: "Profile" },
  { href: "/contributor/assessments", label: "Assessments" },
  { href: "/contributor/projects", label: "Projects" },
  { href: "/contributor/earnings", label: "Earnings" },
  { href: "/account", label: "Account" },
] as const;

export const clientNav = [
  { href: "/client", label: "Overview" },
  { href: "/client/inquiries/new", label: "New inquiry" },
  { href: "/client/projects", label: "Projects" },
  { href: "/client/team", label: "Team" },
  { href: "/client/messages", label: "Messages" },
  { href: "/client/invoices", label: "Invoices" },
  { href: "/client/support", label: "Support" },
  { href: "/account", label: "Account" },
] as const;

export const internalNav = [
  { href: "/internal", label: "Overview" },
  { href: "/internal/inquiries", label: "Inquiries" },
  { href: "/internal/talent", label: "Talent" },
  { href: "/internal/review", label: "Review" },
  { href: "/internal/projects", label: "Projects" },
  { href: "/internal/finance", label: "Finance" },
  { href: "/internal/analytics", label: "Analytics" },
  { href: "/internal/admin", label: "Admin" },
  { href: "/account", label: "Account" },
] as const;

export const internalQueues = [
  { href: "/internal/inquiries", label: "Inquiries", body: "Stored contact and partnership proposals. The server allows this read for an active project manager or administrator." },
  { href: "/internal/talent", label: "Talent", body: "Contributor applications. Finance records and client contracts are not in this queue." },
  { href: "/internal/review", label: "Review", body: "Work scored by someone other than the author. Earnings stay blocked until that review is approved." },
  { href: "/internal/projects", label: "Projects", body: "Delivery projects for a member of the project. A cross-organization read is audited." },
  { href: "/internal/finance", label: "Finance", body: "Invoices, collection, earnings approval, and payout stay separate. Payouts are not sent." },
  { href: "/internal/analytics", label: "Analytics", body: "Rates calculated from stored rows. An empty table stays a dash." },
  { href: "/internal/admin", label: "Admin", body: "Audit events. This screen does not create staff, publish articles, send notifications, or edit settings." },
  { href: "/account", label: "Account", body: "Your own export or deletion request. Recording it does not complete the deletion." },
] as const;
