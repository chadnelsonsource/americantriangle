export function workspaceAllowed(
  profile: { accountKind: string; accountStatus: string } | null,
  allowedKinds: readonly string[],
): boolean {
  if (!profile) return false;
  if (profile.accountStatus !== "active") return false;
  return allowedKinds.includes(profile.accountKind);
}
