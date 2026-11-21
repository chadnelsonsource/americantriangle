"use client";

import { useId, useState } from "react";

export function FaqList({ items }: { items: readonly { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-${index}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3 className="text-lg">
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 rounded-md px-2 py-3 text-left transition-colors hover:bg-card"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.question}
                <span aria-hidden className="text-copper">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div className="disclose" data-open={expanded}>
              <div className="overflow-hidden">
                <p id={panelId} className="px-2 pb-5 text-sm leading-6 text-muted" inert={!expanded} aria-hidden={!expanded}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
