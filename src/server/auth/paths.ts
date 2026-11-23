export function safeInternalPath(value: string | null | undefined, fallback = "/contributor"): string {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (value.includes("\\") || value.includes("://")) return fallback;
  return value;
}

const protectedRoots = ["/contributor", "/client", "/internal", "/account"] as const;

/** Signed-in workspaces. A public path that only shares a prefix, such as /contributors/join, stays open. */
export function isProtectedWorkspacePath(path: string): boolean {
  return protectedRoots.some((root) => path === root || path.startsWith(`${root}/`));
}
