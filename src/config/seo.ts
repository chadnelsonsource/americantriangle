import type { Metadata } from "next";
import { appUrl } from "@/config/site";

export function articleMetadata(input: {
  title: string;
  description: string;
  path: string;
  publishedOn: string;
  updatedOn: string;
  authorName: string;
}): Metadata {
  const page = pageMetadata(input.title, input.description, input.path);
  return {
    ...page,
    openGraph: {
      title: input.title,
      description: input.description,
      url: new URL(input.path, appUrl()).toString(),
      type: "article",
      publishedTime: input.publishedOn,
      modifiedTime: input.updatedOn,
      authors: [input.authorName],
    },
  };
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: new URL(path, appUrl()).toString(),
      type: "website",
    },
  };
}
