export function accountRequestKind(kind: unknown, confirm: unknown): "export" | "delete" | "invalid" | "unconfirmed" {
  if (kind === "export") return "export";
  if (kind === "delete") return confirm === "delete" ? "delete" : "unconfirmed";
  return "invalid";
}
