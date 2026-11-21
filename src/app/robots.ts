import type { MetadataRoute } from "next";
import { appUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/contributor", "/client", "/internal", "/api"] },
    sitemap: new URL("/sitemap.xml", appUrl()).toString(),
    host: appUrl(),
  };
}
