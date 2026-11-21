import { WorkspaceShell } from "@/components/workspace/shell";
import { contributorNav } from "@/config/navigation";
import { requireWorkspace } from "@/server/auth/guard";

export default async function ContributorLayout({ children }: { children: React.ReactNode }) {
  await requireWorkspace(["contributor"]);
  return (
    <WorkspaceShell title="Contributor" links={contributorNav}>
      <div className="px-6 py-10">{children}</div>
    </WorkspaceShell>
  );
}
