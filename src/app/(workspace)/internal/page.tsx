import { EmptyState } from "@/components/ui/feedback";
import { PageIntro } from "@/components/workspace/shell";
import { internalQueues } from "@/config/navigation";
import { readIntegrationStatus } from "@/server/observability/status";
import { DELIVERY_STATES } from "@/services/operations";
import Link from "next/link";

export default function InternalHomePage() {
  const status = readIntegrationStatus();
  return (
    <>
      <PageIntro title="Operations" lede="Open the queue you are responsible for. Counts appear only after stored rows are read. Nothing on this page is a sample." />
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {internalQueues.map((queue) => (
          <li key={queue.href}>
            <Link href={queue.href} className="surface block h-full p-5 transition-colors hover:border-ink">
              <h2 className="text-xl">{queue.label}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{queue.body}</p>
            </Link>
          </li>
        ))}
      </ul>
      <section aria-labelledby="integrations" className="mt-8">
        <h2 id="integrations" className="text-xl">Integrations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Configured means the required environment values are present. It does not mean a vendor accepted a call. Error monitoring is not installed, so a Sentry value does not send events. Failures are written to the server log.
        </p>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          {status.integrations.map((item) => (
            <div key={item.id} className="surface flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <dt>{item.label}</dt>
              <dd>{item.state === "configured" ? "Configured" : "Off"}</dd>
            </div>
          ))}
          <div className="surface flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <dt>Error monitoring</dt>
            <dd>Not installed</dd>
          </div>
        </dl>
      </section>
      <details className="mt-8 rounded-md border border-line">
        <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm">Delivery stages</summary>
        <ol className="grid gap-2 border-t border-line px-4 py-4 text-sm sm:grid-cols-2">
          {DELIVERY_STATES.map((state, index) => (
            <li key={state}>
              {String(index + 1).padStart(2, "0")} {state.replaceAll("_", " ")}
            </li>
          ))}
        </ol>
      </details>
      <div className="mt-8">
        <EmptyState
          title="Nothing is queued"
          body="A delivery project moves one stage at a time, from new inquiry through support. The inquiry list is the only queue this application can read today."
          action={{ href: "/internal/inquiries", label: "Open inquiries" }}
        />
      </div>
    </>
  );
}
