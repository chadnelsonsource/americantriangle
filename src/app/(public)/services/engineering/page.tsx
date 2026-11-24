import { DivisionOverview } from "@/components/marketing/division";
import { engineeringCatalog } from "@/config/catalog";
import { pageMetadata } from "@/config/seo";

export const metadata = pageMetadata(
  "Enterprise AI Applications",
  "Agents, custom applications, integrations, deployment, and a recorded operating handoff.",
  "/services/engineering",
);

export default function EngineeringPage() {
  return (
    <DivisionOverview
      eyebrow="The implementation"
      title="Turning AI capabilities into real-world business solutions."
      lede="This division ships an agent, an application, an integration, or an operating handoff. Talent is the specialist who builds it. Technology is the application, agent, or integration in the scope. The opportunity is the workflow the client needs in operation. Practical value is the system that was scoped and approved. It is not a claimed return, and it does not require a data project or a training project first."
      path="/services/engineering"
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Enterprise applications" },
      ]}
      capabilityTitle="What can be put into operation."
      capabilityLede="These are project deliverables. The first release tracks scope, milestones, and approval. It is not a prebuilt product for every offer."
      capabilities={[
        {
          title: "AI agents and workflow automation",
          body: "First release as a project. The tool list and any human approval are written down before the agent runs. An approval is a recorded step.",
        },
        {
          title: "Custom AI application development",
          body: "First release. Strategy, language-model features, retrieval, and custom development move through milestones and client approval.",
        },
        {
          title: "Enterprise system integrations",
          body: "First release. The interface, the data, and the owner are part of the scope. Provider keys stay on the server.",
        },
        {
          title: "AI deployment",
          body: "First release records what was released and the handoff. A handoff is not an uptime guarantee.",
        },
        {
          title: "Monitoring and optimization",
          body: "First release includes a support path for a released system. Further optimization is a scoped change, not an unnamed improvement program.",
        },
      ]}
      problemTitle="The delivery problems this work is for."
      problemLede="The control is a written scope. These are the gaps that scope is meant to close."
      problems={[
        {
          title: "An agent with unnamed access",
          body: "Tools and approval points are listed before the agent runs. Access that is not on that list is not part of the engagement.",
        },
        {
          title: "A model call with no rule",
          body: "A language-model feature names the model use. The project records that rule. Keys are not placed in the browser.",
        },
        {
          title: "An integration with no owner",
          body: "The interface, the data, and the person or team who owns them are part of the scope.",
        },
        {
          title: "A release with no handoff",
          body: "What shipped and how it is supported are records. Shipping alone does not define an operating commitment.",
        },
      ]}
      useCases={[
        {
          title: "Answers from an authorized corpus",
          body: "An internal tool needs to answer from documents the client has authorized. The project records the corpus, the access rule, and the milestone where the client reviews citations. This describes the record, not a completed engagement.",
        },
        {
          title: "A draft that waits for approval",
          body: "A workflow drafts a reply and waits for a person to approve it before anything is sent. The project records the tool list, the approval step, and what was released.",
        },
      ]}
      approachTitle="How business value is judged."
      approach={[
        "Discovery notes the client is allowed to see, a recommendation, and an estimate come before a build. Internal notes stay off the client timeline.",
        "An application project can include a data service. The data service keeps its own tasks and reviews. The application project keeps milestones and approvals.",
        "Value is compared with the approved scope: what was delivered, who approved it, and what the support path is. No revenue, savings, or performance figure is stated here.",
        "Deployment records the release. Monitoring in the first release is that support path. A later optimization is a new scoped change.",
      ]}
      catalogTitle="Projects with milestones, not a prebuilt product for every offer."
      catalogLede="An application project can include a data service. The records stay separate."
      catalog={[...engineeringCatalog]}
      cta={{
        eyebrow: "Enterprise applications",
        title: "Describe the system you need to evaluate, build, or ship.",
        body: "The consultation records the outcome you want. Scope, estimate, and approval come after, as project records.",
        href: "/consultation?type=enterprise_applications",
        label: "Request a consultation",
      }}
    />
  );
}
