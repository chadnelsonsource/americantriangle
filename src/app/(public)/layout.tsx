import { SiteHeader } from "@/components/marketing/chrome";
import { SiteFooter } from "@/components/marketing/footer";
import { RevealOnScroll } from "@/components/marketing/reveal-on-scroll";
import { JsonLd, siteGraph } from "@/components/seo/json-ld";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="bg-canvas text-ink">
      <JsonLd data={siteGraph()} />
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
      <RevealOnScroll />
    </div>
  );
}
