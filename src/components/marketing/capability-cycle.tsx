import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const nodes = [
  {
    key: "data",
    href: "/services/data",
    role: "The foundation",
    title: "AI Data Infrastructure",
    body: "Provides reviewed datasets, human feedback, and data expertise.",
  },
  {
    key: "intelligence",
    href: "/services/intelligence",
    role: "The intelligence",
    title: "AI Model Training, Research & Evaluation",
    body: "Evaluation is available now. Training and research are scoped before they start.",
  },
  {
    key: "engineering",
    href: "/services/engineering",
    role: "The implementation",
    title: "Enterprise AI Applications",
    body: "Turns an agreed capability into an application, an agent, an integration, or a workflow.",
  },
] as const;

const flows = [
  {
    from: "Enterprise applications",
    to: "Model intelligence",
    body: "Applications in use can return requirements and operational feedback. That feedback is a note for a later inquiry, not an automatic change to a model.",
  },
  {
    from: "Model intelligence",
    to: "Data infrastructure",
    body: "Evaluation, and a research engagement when one is scoped, can name what should change: a criterion, a dataset, or a recorded model behavior.",
  },
  {
    from: "Data infrastructure",
    to: "Model intelligence",
    body: "Reviewed datasets, human feedback, and data expertise can support the next evaluation or a scoped training engagement. Preparing data is not itself a training run.",
  },
  {
    from: "Model intelligence",
    to: "Enterprise applications",
    body: "A score, or a capability that has been scoped, can be what an application project deploys. The project still has its own milestones and approval.",
  },
] as const;

function NodeLink({ node, className }: { node: (typeof nodes)[number]; className?: string }) {
  return (
    <Link
      href={node.href}
      data-node={node.key}
      className={cn("surface block p-4 text-ink transition-colors hover:border-ink", className)}
    >
      <span className="eyebrow text-muted">{node.role}</span>
      <span className="mt-2 block font-serif text-lg leading-tight tracking-tight">{node.title}</span>
      <span className="mt-2 block text-sm leading-6 text-muted">{node.body}</span>
    </Link>
  );
}

function CycleDrawing() {
  return (
    <svg viewBox="0 0 1000 680" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <marker id="capability-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 1.2 L 8 5 L 0 8.8" fill="none" stroke="var(--control)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <line className="cycle-line touch-data" x1="500" y1="250" x2="500" y2="168" fill="none" stroke="var(--control)" strokeWidth="1.35" />
      <line className="cycle-line touch-intelligence" x1="430" y1="340" x2="230" y2="430" fill="none" stroke="var(--control)" strokeWidth="1.35" />
      <line className="cycle-line touch-engineering" x1="570" y1="340" x2="770" y2="430" fill="none" stroke="var(--control)" strokeWidth="1.35" />
      <path
        className="cycle-line touch-data touch-intelligence"
        markerEnd="url(#capability-arrow)"
        d="M 410 150 C 250 170, 90 280, 130 400"
        fill="none"
        stroke="var(--control)"
        strokeWidth="1.35"
      />
      <path
        className="cycle-line touch-data touch-intelligence"
        markerEnd="url(#capability-arrow)"
        d="M 210 400 C 160 270, 320 175, 470 155"
        fill="none"
        stroke="var(--control)"
        strokeWidth="1.35"
      />
      <path
        className="cycle-line touch-intelligence touch-engineering"
        markerEnd="url(#capability-arrow)"
        d="M 280 455 C 500 545, 500 545, 720 455"
        fill="none"
        stroke="var(--control)"
        strokeWidth="1.35"
      />
      <path className="cycle-line touch-intelligence touch-engineering" markerEnd="url(#capability-arrow)" d="M 700 430 C 500 480, 500 480, 300 430" fill="none" stroke="var(--control)" strokeWidth="1.35" />
    </svg>
  );
}

export function CapabilityCycle() {
  const [data, intelligence, engineering] = nodes;
  return (
    <section className="page pb-16 md:pb-24" aria-labelledby="capability-cycle-heading">
      <p className="eyebrow text-muted">How the work can connect</p>
      <h2 id="capability-cycle-heading" className="heading-title mt-4">
        One Ecosystem. Three Connected Capabilities.
      </h2>
      <p className="measure mt-5 leading-7 text-muted">
        A note can move from one division to another. That note is a later inquiry. It does not change a dataset, a score, or a shipped system by itself.
      </p>

      <div className="mt-10 space-y-4 lg:hidden">
        <div className="flex justify-center">
          <div className="surface px-5 py-4">
            <Logo />
          </div>
        </div>
        {nodes.map((node) => (
          <NodeLink key={node.href} node={node} />
        ))}
      </div>

      <div className="cycle relative mt-14 hidden aspect-[1000/680] lg:block">
        <CycleDrawing />
        <NodeLink node={data} className="absolute left-1/2 top-0 z-10 w-[26%] -translate-x-1/2" />
        <NodeLink node={intelligence} className="absolute left-0 top-[62%] z-10 w-[26%]" />
        <NodeLink node={engineering} className="absolute right-0 top-[62%] z-10 w-[26%]" />
        <div className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 bg-canvas px-4 py-3">
          <Logo />
        </div>
        <p className="absolute left-[6%] top-[30%] max-w-[9rem] bg-canvas px-1 text-xs leading-5 text-muted">Datasets and expertise</p>
        <p className="absolute left-[18%] top-[40%] max-w-[8rem] bg-canvas px-1 text-xs leading-5 text-muted">What to refine</p>
        <p className="absolute left-1/2 top-[64%] max-w-[12rem] -translate-x-1/2 bg-canvas px-2 text-center text-xs leading-5 text-muted">Operational feedback</p>
        <p className="absolute left-1/2 top-[82%] max-w-[12rem] -translate-x-1/2 bg-canvas px-2 text-center text-xs leading-5 text-muted">Evaluated capability</p>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl">When the divisions inform each other</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          The arrows are optional paths. A customer can start at any division, use only one, or ask the work to carry forward.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {flows.map((flow) => (
            <li key={flow.from + flow.to} className="surface p-5">
              <p className="eyebrow text-muted">
                {flow.from} to {flow.to}
              </p>
              <p className="mt-3 text-sm leading-6">{flow.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
