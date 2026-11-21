import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/sections";
import { pageMetadata } from "@/config/seo";
import { noteBySlug, notes, readingMinutes } from "@/content/notes";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) return {};
  return pageMetadata(note.title, note.summary, `/resources/${note.slug}`);
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = noteBySlug(slug);
  if (!note) notFound();
  const others = notes.filter((item) => item.slug !== note.slug);
  return (
    <>
      <PageHero
        eyebrow={note.category}
        title={note.title}
        lede={note.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
          { label: note.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-muted">
          Americantriangle · {note.published} · {readingMinutes(note)} min read
        </p>
        <div className="mt-8 space-y-5 text-base leading-7">
          {note.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-10 text-sm">
          <Link href="/resources" className="underline decoration-copper underline-offset-4">
            All notes
          </Link>
        </p>
        <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/resources/${item.slug}`} className="underline decoration-line underline-offset-4">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
