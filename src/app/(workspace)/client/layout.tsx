import { WorkspaceShell } from "@/components/workspace/shell";
import { clientNav } from "@/config/navigation";
import { requireWorkspace } from "@/server/auth/guard";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  await requireWorkspace(["client"]);
  return (
    <WorkspaceShell title="Client" links={clientNav}>
      <div className="px-6 py-10">{children}</div>
    </WorkspaceShell>
  );
}
