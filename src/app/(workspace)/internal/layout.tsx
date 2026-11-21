import { WorkspaceShell } from "@/components/workspace/shell";
import { internalNav } from "@/config/navigation";
import { requireWorkspace } from "@/server/auth/guard";

export default async function InternalLayout({ children }: { children: React.ReactNode }) {
  await requireWorkspace(["staff"]);
  return (
    <WorkspaceShell title="Operations" links={internalNav}>
      <div className="px-6 py-10">{children}</div>
    </WorkspaceShell>
  );
}
