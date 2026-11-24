import { canonicalUrl, site, siteOrigin } from "@/config/site";
import { brandLine } from "@/config/brand";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function siteGraph() {
  const organizationId = `${siteOrigin}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: siteOrigin,
        logo: `${siteOrigin}/images/logo2.png`,
        description: site.description,
        slogan: brandLine,
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        name: site.name,
        url: siteOrigin,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function ServiceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: name.replace(/\.$/, ""),
        description,
        url: canonicalUrl(path),
        provider: { "@id": `${siteOrigin}/#organization` },
      }}
    />
  );
}
