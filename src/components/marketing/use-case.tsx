import Link from "next/link";
import { pillars } from "@/config/catalog";
import type { UseCase } from "@/config/industries";

const serviceLabel: Record<string, string> = {
  "/services/data": "Data infrastructure",
  "/services/data/annotation": "Annotation and collection",
  "/services/data/evaluation": "Model evaluation",
  "/services/engineering/applications": "Applications",
  "/services/engineering/agents": "Agents and automation",
};

const fields = [
  ["Business challenge", "challenge"],
  ["Proposed approach", "approach"],
  ["Americantriangle capabilities", "capabilities"],
  ["Operational value", "value"],
] as const;

export function UseCaseList({ items }: { items: readonly UseCase[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item) => {
        const pillar = pillars.find((entry) => entry.href === (item.pillar === "data" ? "/services/data" : item.pillar === "intelligence" ? "/services/intelligence" : "/services/engineering"));
        return (
          <li id={item.id} key={item.id} className="surface scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-6 py-5">
              <h3 className="text-2xl">{item.title}</h3>
              <p className="eyebrow text-muted">
                {pillar?.role} · {item.availability}
              </p>
            </div>
            <dl className="grid gap-6 px-6 py-6 md:grid-cols-2">
              {fields.map(([label, key]) => (
                <div key={key}>
                  <dt className="eyebrow text-muted">{label}</dt>
                  <dd className="mt-2 text-sm leading-6">{item[key]}</dd>
                </div>
              ))}
            </dl>
            <p className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-4 text-sm">
              {pillar ? (
                <Link href={pillar.href} className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
                  {pillar.title}
                </Link>
              ) : null}
              <Link href={item.href} className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">
                {serviceLabel[item.href] ?? "Related service"}
              </Link>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
