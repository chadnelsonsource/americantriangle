import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { canonicalUrl, indexablePublicRoutes, publicRoutes, siteOrigin } from "@/config/site";

describe("public SEO URLs", () => {
  it("uses the public origin without a www host", () => {
    expect(siteOrigin).toBe("https://americantriangle.com");
    expect(canonicalUrl("/")).toBe("https://americantriangle.com");
    expect(canonicalUrl("/services/data/annotation")).toBe("https://americantriangle.com/services/data/annotation");
    expect(canonicalUrl("contact")).toBe("https://americantriangle.com/contact");
    expect(canonicalUrl("/about")).not.toContain("www.");
    expect(canonicalUrl("/about")).not.toContain("localhost");
  });

  it("keeps the search page out of the sitemap and lists each public page once", () => {
    expect(publicRoutes).toContain("/insights/search");
    expect(indexablePublicRoutes).not.toContain("/insights/search");
    expect(new Set(indexablePublicRoutes).size).toBe(indexablePublicRoutes.length);
    expect(indexablePublicRoutes).toContain("/");
    expect(indexablePublicRoutes).toContain("/services/engineering/agents");
  });

  it("leaves search and empty insight categories out of the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://americantriangle.com/insights");
    expect(urls.some((url) => url.includes("/insights/search"))).toBe(false);
    expect(urls.some((url) => url.includes("/insights/category/"))).toBe(false);
    expect(urls.some((url) => url.includes("localhost") || url.includes("www."))).toBe(false);
  });
});
