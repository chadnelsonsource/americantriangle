import { SiteHeader } from "@/components/marketing/chrome";
import { SiteFooter } from "@/components/marketing/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}
