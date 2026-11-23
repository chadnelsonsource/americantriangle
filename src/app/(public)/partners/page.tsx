import { FeatureCard } from "@/components/marketing/cards";
import { PageHero, Section } from "@/components/marketing/sections";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/config/seo";
import { PartnershipForm } from "@/features/leads/partnership-form";
import { partnershipCategoryFromQuery } from "@/services/leads";

export const metadata = pageMetadata(
  "Partnerships",
  "Propose a technology, research, business, or expert collaboration with Americantriangle. A proposal is not an existing partnership or an endorsement.",
  "/partners",
);

const categories = [
  {
    href: "/partners?category=technology#propose",
    title: "Technology partnerships",
    body: "A software, infrastructure, or AI technology provider can propose a technical collaboration. A proposal does not mean Americantriangle runs on that product, and it is not a certification of the provider.",
  },
  {
    href: "/partners?category=research#propose",
    title: "Research partnerships",
    body: "A research group can propose work on evaluation, experimentation, or technical development. The study would be scoped. A proposal is not a published paper and it does not mean a model was trained.",
  },
  {
    href: "/partners?category=business#propose",
    title: "Business partnerships",
    body: "An organization can propose a strategic relationship, a joint opportunity, or a service collaboration. A proposal does not create a reseller relationship or a shared customer.",
  },
  {
    href: "/partners?category=talent#propose",
    title: "Talent and expert collaboration",
    body: "A professional or a group of qualified technical people can propose how they would take part in relevant work. A proposal is not employment, a guaranteed assignment, or a public listing.",
  },
] as const;

const value = [
  ["Technology", "The proposal can name an integration, a delivery path, or a boundary between the two products. The record is that scope."],
  ["Research", "The proposal can name a question, a method, and the result that would be written down. The record is the study, when one is scoped."],
  ["Business", "The proposal can name a joint offer both sides are willing to describe. The record is that offer. It is not a customer list."],
  ["Experts", "The proposal can name the expertise and the kind of work it fits. The record is a reviewed introduction. It does not assign work."],
] as const;

const approach = [
  ["01", "Proposal", "The form sends the category, the collaboration, the capabilities, and any website or notes by email, and saves them when the store is available."],
  ["02", "Review", "Project managers and administrators can read a stored proposal. It is not published and it is not sent to a model provider."],
  ["03", "Conversation", "If the proposal fits current work, the team can reply. A reply is a conversation, not an agreement."],
  ["04", "Agreement", "Any collaboration is written separately. This page does not set terms, a share of work, or a public announcement."],
] as const;

export default async function PartnersPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const category = partnershipCategoryFromQuery(params.category);

  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Propose a collaboration."
        lede="Americantriangle is open to organizations, technology providers, research collaborators, and professional partners. This page is a way to propose that work. It is not a partner directory, and a submission is not an endorsement."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Partnerships" },
        ]}
        actions={<ButtonLink href="#propose">Submit a proposal</ButtonLink>}
      />

      <Section id="categories" className="scroll-mt-24" eyebrow="Collaboration" title="Four ways to propose work.">
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((item) => (
            <a key={item.title} href={item.href} className="block h-full">
              <FeatureCard title={item.title} body={item.body} />
            </a>
          ))}
        </div>
      </Section>

      <Section id="value" className="scroll-mt-24 pt-0" eyebrow="Mutual value" title="A proposal names the value. It does not report a result.">
        <ul className="grid gap-8 md:grid-cols-2">
          {value.map(([title, body]) => (
            <li key={title}>
              <h3 className="text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="approach" className="scroll-mt-24 pt-0" eyebrow="Approach" title="Review comes before any agreement.">
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map(([step, title, body]) => (
            <li key={step}>
              <p className="font-serif text-sm text-copper">{step}</p>
              <h3 className="mt-3 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="propose" className="scroll-mt-24 pt-0" eyebrow="Inquiry" title="Describe the collaboration.">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          A project inquiry still uses the <a href="/contact" className="text-ink underline decoration-line underline-offset-4">contact form</a>. Use this form for a partnership proposal. It is sent by email and saved when the store is available.
        </p>
        <div className="mt-10">
          <PartnershipForm key={category || "none"} defaultCategory={category} />
        </div>
      </Section>
    </>
  );
}
