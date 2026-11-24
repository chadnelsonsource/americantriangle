import type { Metadata } from "next";
import { canonicalUrl, site } from "@/config/site";

type SeoOptions = {
  index?: boolean;
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Americantriangle. The human layer behind reliable AI.",
};

export function articleMetadata(input: {
  title: string;
  description: string;
  path: string;
  publishedOn: string;
  updatedOn: string;
  authorName: string;
}): Metadata {
  const page = pageMetadata(input.title, input.description, input.path);
  const url = canonicalUrl(input.path);
  return {
    ...page,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: "article",
      publishedTime: input.publishedOn,
      modifiedTime: input.updatedOn,
      authors: [input.authorName],
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [shareImage.url],
    },
  };
}

export function pageMetadata(title: string, description: string, path: string, options?: SeoOptions): Metadata {
  const index = options?.index !== false;
  const url = canonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index,
      follow: true,
      googleBot: { index, follow: true },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
