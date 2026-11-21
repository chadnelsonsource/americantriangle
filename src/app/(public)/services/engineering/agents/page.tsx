import { OfferPage } from "@/components/marketing/offer-page";
import { engineeringCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Agents and automation",
  "Agents, workflow automation, integrations, and a recorded deployment handoff.",
  "/services/engineering/agents",
);

export default function AgentsPage() {
  return (
    <OfferPage
      eyebrow="Enterprise applications"
      title="Agents inside an agreed tool list."
      lede="This is enterprise implementation. An agent, an automation, or an integration is a project with a written workflow, a human approval where the design requires one, and a handoff."
      items={engineeringCatalog.filter((item) => item.href === "/services/engineering/agents")}
      scenario="A workflow drafts a reply and waits for a person to approve it before anything is sent. The project records the tool list, the approval step, and what was released. The example shows the control. It is not a customer deployment."
      inquiry="enterprise_applications"
      limit="Tools, approvals, and the release record are in scope. An agent is not given unnamed access to client systems, and a handoff is not an uptime guarantee."
    />
  );
}
