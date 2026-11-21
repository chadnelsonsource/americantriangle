import Link from "next/link";
import { StackDiagram } from "@/components/marketing/diagrams";
import { CtaBand, PageHero, Section } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/config/seo";
import {
  capabilityGroups,
  capabilityStatusLabel,
  philosophy,
  stackLayers,
  technologyNav,
  toolGroups,
  toolStatusLabel,
} from "@/config/technology";

export const metadata = pageMetadata(
  "Technology",
  "The technical scope of Americantriangle: evaluation, data preparation, application projects, and the tools in this repository. Not a certification, a partnership list, or a production-hosting claim.",
  "/technology",
);

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="What the work uses, and what it does not claim."
        lede="This page is the technical scope. A capability is marked by whether the first release stores it, a project has to define it, or it is later. A tool is listed only when it is in the repository, named in the stack notes, or accepted as a model-adapter name. There is no partner logo and no certification."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Technology" },
        ]}
        actions={
          <>
            <ButtonLink href="#stack" variant="accent">
              Read the register
            </ButtonLink>
            <ButtonLink href="/consultation?type=integrated" variant="secondary" tone="night">
              Request a consultation
            </ButtonLink>
          </>
        }
      />
      <Section className="pb-0">
        <nav aria-label="Technology">
          <ul className="flex flex-wrap gap-2">
            {technologyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center border border-control px-4 text-sm hover:border-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
      <Section id="philosophy" eyebrow="Engineering" title="The rule stays on the server." className="scroll-mt-24">
        <ul className="grid gap-4 lg:grid-cols-2">
          {philosophy.map((item) => (
            <li key={item} className="surface p-5 text-sm leading-6">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <StackDiagram layers={stackLayers} />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
          Sentry and PostHog are named and not installed. Model providers are names the gateway can select. No vendor SDK is in the repository, and a name is not a partnership.
        </p>
      </Section>
      {capabilityGroups.map((group) => (
        <Section key={group.id} id={group.id} eyebrow={group.eyebrow} title={group.title} lede={group.lede} className="scroll-mt-24 pt-0">
          <ul className="grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.title} className="surface p-5">
                <p className="eyebrow text-muted">{capabilityStatusLabel[item.status]}</p>
                <h3 className="mt-3 text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {group.links.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4 hover:decoration-ink">
                {link.label}
              </Link>
            ))}
          </p>
        </Section>
      ))}
      <Section
        id="stack"
        eyebrow="Technology register"
        title="Add a tool here when the repository or the stack notes do."
        lede="The groups below are the public list. A new capability is a change to this register, not a logo. Nothing in the list is a partnership, a certification, or a statement that production is running."
        className="scroll-mt-24 pt-0"
      >
        <div className="space-y-10">
          {toolGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-2xl">{group.title}</h3>
              <ul className="mt-4 border-t border-line">
                {group.items.map((item) => (
                  <li key={item.name} className="grid gap-2 border-b border-line py-4 lg:grid-cols-[14rem_12rem_1fr] lg:items-baseline lg:gap-6">
                    <h4 className="text-lg">{item.name}</h4>
                    <p className="eyebrow text-muted">{toolStatusLabel[item.status]}</p>
                    <p className="text-sm leading-6 text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand
        eyebrow="Consultation"
        title="Name the technical constraint in the inquiry."
        body="The form stores the request. It does not start a build, connect a model provider, or claim a result."
        href="/consultation?type=integrated"
        label="Request a consultation"
      />
    </>
  );
}
