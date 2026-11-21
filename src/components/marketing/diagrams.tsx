const steps = ["Requested", "Proposed", "Production", "Delivery"] as const;

export function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 760 132" role="img" aria-label="Work moves from requested, to proposed, to production, to delivery." className="w-full text-ink">
      {steps.map((label, index) => {
        const x = 20 + index * 185;
        return (
          <g key={label}>
            {index < steps.length - 1 ? <line x1={x + 128} y1={46} x2={x + 168} y2={46} stroke="currentColor" strokeOpacity="0.35" /> : null}
            <rect x={x} y={18} width={128} height={56} fill="none" stroke="currentColor" strokeOpacity="0.45" />
            <text x={x + 64} y={42} textAnchor="middle" fill="#ee5a24" fontSize="11" fontFamily="Georgia, serif">
              0{index + 1}
            </text>
            <text x={x + 64} y={60} textAnchor="middle" fill="currentColor" fontSize="13" fontFamily="Outfit, Segoe UI, sans-serif">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const rooms = [
  ["Contributors", "Own profile, tasks, and earnings"],
  ["Clients", "One organization"],
  ["Staff", "Review, delivery, finance"],
] as const;

const combination = [
  ["The foundation", "Reviewed data, preferences, and examples. The product is the data record."],
  ["The intelligence", "Scores against criteria the project approves. A score does not change the model by itself."],
  ["The implementation", "An application, agent, integration, or handoff, with milestones and approval."],
] as const;

export function StackDiagram({ layers }: { layers: readonly (readonly [string, string])[] }) {
  return (
    <div className="rounded-md border border-line p-4 sm:p-6">
      <p className="eyebrow text-muted">Request path</p>
      <ol className="mt-4 grid gap-3 lg:grid-cols-4">
        {layers.map(([title, body], index) => (
          <li key={title} className="rounded-md border border-line p-4">
            <p className="font-serif text-sm text-copper">0{index + 1}</p>
            <p className="mt-2 font-serif text-xl">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CombinationDiagram() {
  return (
    <div className="rounded-md border border-line p-4 sm:p-6">
      <p className="eyebrow text-muted">One requirement, one or more records</p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        A requirement can stay in one division. When it uses more than one, each division keeps its own record.
      </p>
      <ul className="mt-4 grid gap-3 lg:grid-cols-3">
        {combination.map(([title, body]) => (
          <li key={title} className="rounded-md border border-line p-4">
            <p className="font-serif text-xl">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IsolationDiagram() {
  return (
    <div className="rounded-md border border-line p-4 sm:p-6" role="img" aria-label="Contributors, clients, and staff share a system and do not share each other's records.">
      <p className="eyebrow text-muted">One system</p>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {rooms.map(([title, body]) => (
          <li key={title} className="rounded-md border border-line p-4">
            <p className="font-serif text-xl">{title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
