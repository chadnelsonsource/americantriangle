import { BlogCard } from "@/components/marketing/cards";
import { PageHero, Section } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { notes, readingMinutes } from "@/content/notes";

export const metadata = pageMetadata(
  "Resources",
  "Method notes on preference feedback, review decisions, and engineering milestones.",
  "/resources",
);

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Notes on how the work is recorded."
        lede="Short explanations of the services. They are product writing, not customer stories and not a newsroom."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Resources" },
        ]}
      />
      <Section>
        <ul className="grid gap-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <BlogCard
                href={`/resources/${note.slug}`}
                category={note.category}
                meta={`${note.published} · ${readingMinutes(note)} min read`}
                title={note.title}
                summary={note.summary}
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
