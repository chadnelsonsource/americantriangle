import type { MetadataRoute } from "next";
import { canonicalUrl, siteOrigin } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/contributor",
        "/client",
        "/internal",
        "/account",
        "/login",
        "/register",
        "/forgot-password",
        "/account-recovery",
        "/unauthorized",
        "/insights/search",
      ],
    },
    sitemap: canonicalUrl("/sitemap.xml"),
    host: siteOrigin,
  };
}
