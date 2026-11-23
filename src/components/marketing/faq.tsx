"use client";

import { useId, useState } from "react";
import { TextField } from "@/components/ui/fields";

export function FaqList({
  items,
  searchable = false,
}: {
  items: readonly { question: string; answer: string }[];
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);
  const baseId = useId();
  const needle = searchable ? query.trim().toLowerCase() : "";
  const visible = needle
    ? items.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(needle))
    : items;
  return (
    <div>
      {searchable ? (
        <div className="mb-6 max-w-md">
          <TextField
            label="Search questions"
            name={`${baseId.replace(/:/g, "")}-search`}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(0);
            }}
            placeholder="Search questions"
          />
        </div>
      ) : null}
      {visible.length === 0 ? <p className="text-sm leading-6 text-muted">No questions match that search.</p> : null}
      <div className="border-t border-line">
      {visible.map((item, index) => {
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
    </div>
  );
}
